import React, { useState, useMemo, useEffect } from 'react';
import { Avatar, Box, Button, Card, CardContent, IconButton, Stack, Typography } from '@mui/material';
import { DataGrid, esES, GridToolbar } from '@mui/x-data-grid';
import useSWR from 'swr';

import { Get } from './get';
import SkeletonTable from '../skelholder/skelethonTable';
import AppContext from '../../contexts/ServiceContext';
import { NavLink } from 'react-router-dom';


//'startDate', 'endDate', 'price', 'format'

function DataTable({url,columns1,sx,VISIBLE_FIELDS }) {
  const {  AxiosConfigsToken } = React.useContext(AppContext);


  const { data, isLoading } = useSWR(url, () => Get(AxiosConfigsToken, url), {});

  console.log('data en datatable:', data);



  const columns = React.useMemo(
    () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [columns1]
  );



  if (isLoading) return <SkeletonTable />;

  return (
    <>


      <Box sx={{ height: 'auto', width: '100%',border:"0.5px solid rgba(0, 0, 0, 0.05)",borderRadius:2,bgcolor:"rgba(255, 255, 255, 0.38)" }}>
        <DataGrid
          rows={data ? data.response.docs : []}
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
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          options={{
            responsive: 'scroll',
          }}
          onRowClick={(params) => {
            console.log('Fila clickeada:', params.row);
          }}
          
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
