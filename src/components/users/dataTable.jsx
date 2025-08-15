import React, { useState, useMemo, useEffect } from 'react';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { DataGrid, esES, GridToolbar } from '@mui/x-data-grid';
import useSWR from 'swr';

import { Get } from './get';
import ModalAddFormUpdateRoles from './modalUpdate';
import SkeletonTable from '../skelholder/skelethonTable';
import AppContext from '../../contexts/ServiceContext';

const VISIBLE_FIELDS = ['email', 'roles'];

const columns1 = [
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
    editable: false,
  },

  {
    field: 'roles',
    headerName: 'Role',
    width: 150,
    editable: false,
    valueGetter: (params) => {
      return params.row.roles.map((role) => role.name).join(', ');
    },
  },

];

function DataTable({ typeUserSelected }) {
  const { userId, typeUser, acciones, AxiosConfigsToken, loginToken } = React.useContext(AppContext);

  //SWR para hacer peticiones

  const [openFormUpdate, setOpenFormUpdate] = React.useState(false);
  const [load, setLoad] = React.useState(false); //estado para activar el spinner del boton submit
  const [data, setData] = React.useState(false);



  const getUsers = async () => {
    try {
      setLoad(true)
      const response = await Get(AxiosConfigsToken, `users/get/${typeUserSelected}`);
      if (response.success) {
        setData(response.response.docs)
      }else{
        setData([])
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }finally{
      setLoad(false)
    }
  }




  const columns = React.useMemo(
    () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [columns1]
  );

  useEffect(() => {
    if (typeUserSelected) {
      getUsers()

    }
  //console.log(typeUserSelected, 'typeUserSelected');

  }, [typeUserSelected])

  if (load) return <SkeletonTable />;

  return (
    <>
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={data}
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
