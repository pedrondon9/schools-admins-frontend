import React, { useState, useMemo, useEffect } from 'react';
import { Avatar, Box, Button, Card, CardContent, FormControl, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { DataGrid, esES, GridToolbar } from '@mui/x-data-grid';
import useSWR from 'swr';

import { Get } from './get';
import SkeletonTable from '../skelholder/skelethonTable';
import AppContext from '../../contexts/ServiceContext';
import { NavLink } from 'react-router-dom';
import { CardEvents } from '../cardEvents';
import { Search } from '@mui/icons-material';


//'startDate', 'endDate', 'price', 'format'

function DataTable({ url, columns1, sx, VISIBLE_FIELDS }) {
  const { AxiosConfigsToken } = React.useContext(AppContext);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useSWR(url, () => Get(AxiosConfigsToken, url), {});

  console.log('data en datatable:', data);



  const columns = React.useMemo(
    () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [columns1]
  );



  if (isLoading) return <SkeletonTable />;


  const filteredRows = data?.response?.docs?.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );
  return (
    <>
      <FormControl sx={{ marginBlock: 3, width: '100%' }}>

        <TextField
          label="Buscar en todas las columnas"
          variant="outlined"
          size="small"
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#212121",   // color del borde normal
                borderWidth: 2,         // grosor del borde
                borderRadius: 2,        // esquinas redondeadas
              },
              "&:hover fieldset": {
                borderColor: "#212121",  // al pasar el mouse
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ff6f00",    // cuando el input está enfocado
              },
            },
            "& .MuiInputLabel-root": {
              color: "gray", // normal
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "gray", // cuando está enfocado
            },
            mb: 2,
            backgroundColor: "#fff",
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid
          spacing={2}
          //bgcolor="backgroundColorPage"
          container
          sx={{ justifyContent: 'center', maxWidth: '1000px' }}
        >
          {filteredRows ? (
            <>
              {filteredRows?.map((x, y) => (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                  <CardEvents x={x} modal={<Box></Box>} />
                </Grid>
              ))}
            </>
          ) : (
            <></>
          )}
        </Grid>
      </div>
    </>
  );
}

export default DataTable;
