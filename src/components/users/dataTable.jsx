import React, { useState, useMemo, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid, esES, GridToolbar } from '@mui/x-data-grid';
import useSWR from 'swr';

import { Get } from '../dataGrid/get';
import SkeletonTable from '../skelholder/skelethonTable';
import AppContext from '../../contexts/ServiceContext';
import { NavLink } from 'react-router-dom';
import { Search } from '@mui/icons-material';

//'startDate', 'endDate', 'price', 'format'

function DataTable({ url, columns1, sx, VISIBLE_FIELDS }) {
  const { AxiosConfigsToken } = React.useContext(AppContext);
  const [search, setSearch] = useState('');

  const { data, isLoading } = useSWR(url, () => Get(AxiosConfigsToken, url), {});

  const columns = React.useMemo(
    () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [columns1]
  );

  if (isLoading) return <SkeletonTable />;

  const filteredRows = data?.response?.docs?.filter((row) => {
    return (
      row.fullname.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase()) ||
      row.phone.toString().includes(search) // en age hacemos toString()
    );
  });

  return (
    <>
      <FormControl sx={{ marginBlock: 3, width: '100%' }}>
        <TextField
          label="Buscar en todas las columnas"
          variant="outlined"
          size="small"
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#212121', // color del borde normal
                borderWidth: 2, // grosor del borde
                borderRadius: 2, // esquinas redondeadas
              },
              '&:hover fieldset': {
                borderColor: '#212121', // al pasar el mouse
              },
              '&.Mui-focused fieldset': {
                borderColor: '#ff6f00', // cuando el input está enfocado
              },
            },
            '& .MuiInputLabel-root': {
              color: 'gray', // normal
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'gray', // cuando está enfocado
            },
            mb: 2,
            backgroundColor: '#fff',
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      <Box
        sx={{
          height: 'auto',
          width: '100%',
          border: '2px solid #212121',
          borderRadius: 2,
          bgcolor: '#FFFFFF',
        }}
      >
        <DataGrid
          rows={filteredRows || []}
          getRowId={(row) => row._id}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          disableRowSelectionOnClick
          autoHeight
          //rowHeight={100}
          slotProps={{
            toolbar: {
              showQuickFilter: false,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          options={{
            responsive: 'scroll',
          }}
          onRowClick={(params) => {}}
          getRowHeight={() => 'auto'} // filas con altura dinámica según contenido
          sx={sx}
          initialState={{
            columns: {
              columnVisibilityModel: {
                // Hide columns status and traderName, the other columns will remain visible
                createdAt: false,
                fechaA: false,
              },
            },
            pagination: { paginationModel: { pageSize: 8 } },
          }}
          pagination={true}
        />
      </Box>
    </>
  );
}

export default DataTable;
