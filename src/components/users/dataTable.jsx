import React, { useState, useMemo, useEffect } from 'react';
import { Avatar, Box, Button, IconButton, Stack } from '@mui/material';
import { DataGrid, esES, GridToolbar } from '@mui/x-data-grid';
import useSWR from 'swr';

import { Get } from './get';
import ModalAddFormUpdateRoles from './modalUpdate';
import SkeletonTable from '../skelholder/skelethonTable';
import AppContext from '../../contexts/ServiceContext';
import FormUpdate from './formUpdate';
import { DATA_EDIT_USER } from '../../contexts/constantesVar';

const VISIBLE_FIELDS = ['email', 'roles', 'fullname', 'linkPhoto', 'phone', 'acciones'];



function DataTable({ typeUserSelected }) {
  const { userId, typeUser, acciones, AxiosConfigsToken, loginToken,dispatch } = React.useContext(AppContext);

  //SWR para hacer peticiones

  const [openFormUpdate, setOpenFormUpdate] = React.useState(false);
  const [load, setLoad] = React.useState(false); //estado para activar el spinner del boton submit
  const [datas, setData] = React.useState(false);

 



  //const { data, error, isLoading } = useSWR('users/get/typeUser', () => Get(AxiosConfigsToken,`users/get/${typeUserSelected}`), {});

  const { data, error, isLoading,mutate } = useSWR(
    typeUserSelected ? `users/get/${typeUserSelected}` : null,
    (url) => Get(AxiosConfigsToken, `users/get/${typeUserSelected}`),
    {}
  );

  const columns1 = [
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      editable: false,
    },
    {
      field: 'phone',
      headerName: 'Telefono',
      width: 200,
      editable: false,
    },
    {
      field: 'fullname',
      headerName: 'Nombre completo',
      width: 250,
      editable: false,
    },
    {
      field: 'roles',
      headerName: 'Role',
      width: 100,
      editable: false,
      valueGetter: (params) => {
        return params.row.role.name;
      },
    },
  
    {
      field: 'linkPhoto',
      headerName: 'La foto del usuario',
      width: 100,
      editable: false,
      renderCell: (params) => (
        <Avatar
          alt="Foto"
          src={params.row.linkPhoto}
          sx={{ width: 40, height: 40 }}
        />
      ),
    },
  
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 180,
      editable: false,
  
      renderCell: (params) => {

        const currentRow = params.row;
        
        return (
          <>
            {
              <>
  
                <FormUpdate typeUserSelected={typeUserSelected} mutateLocal = {mutate}  dataUserSelected={currentRow} />
  
              </>
            }
          </>
        );
      },
    },
  
  ];
  const columns = React.useMemo(
    () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [columns1]
  );

  useEffect(() => {
    if (typeUserSelected) {
      //getUsers()

    }
    //console.log(typeUserSelected, 'typeUserSelected');

  }, [typeUserSelected])

  if (isLoading) return <SkeletonTable />;

  return (
    <>
      <Box sx={{ height: 600, width: '100%' }}>
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
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          options={{
            responsive: 'scroll',
          }}
          sx={{
            '& .MuiDataGrid-row': {
              fontWeight: 'bold',   //  hace todas las filas bold
              bgcolor:'rgba(255, 255, 255, 0.38)'
            },
          }}
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
