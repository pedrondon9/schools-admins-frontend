import React, { useState, useMemo, useEffect } from 'react';
import { Avatar, Box, Button, Card, CardContent, IconButton, Stack, Typography } from '@mui/material';
import { DataGrid, esES, GridToolbar } from '@mui/x-data-grid';
import useSWR from 'swr';

import { Get } from './get';
import ModalAddFormUpdateRoles from './modalUpdate';
import SkeletonTable from '../skelholder/skelethonTable';
import AppContext from '../../contexts/ServiceContext';
import FormUpdate from './formUpdate';
import { DATA_EDIT_USER } from '../../contexts/constantesVar';
import { ArrowCircleRight, ArrowCircleRightRounded, ArrowLeft, Edit, EditNote, Shower } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { ArrowRightIcon } from '@mui/x-date-pickers';

const VISIBLE_FIELDS = ['title'];

//'startDate', 'endDate', 'price', 'format'

function DataTable({ }) {
  const { userId, typeUser, acciones, AxiosConfigsToken, loginToken, dispatch } = React.useContext(AppContext);

  //SWR para hacer peticiones

  const [openFormUpdate, setOpenFormUpdate] = React.useState(false);
  const [load, setLoad] = React.useState(false); //estado para activar el spinner del boton submit
  const [datas, setData] = React.useState(false);





  const { data, error, isLoading } = useSWR('especialities/get', () => Get(AxiosConfigsToken, `especialities/get`), {});


  const columns1 = [
    {
      field: 'title',
      headerName: 'Curso de',
      flex: 1,
      editable: false,
      alignItems: "center",

      renderCell: (params) => (


        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", sm: "flex-start" },
            width: "100%",
            flexDirection: { xs: "column", sm: "row" }, // columna en móviles, fila en pantallas ≥sm
            alignItems: { xs: "flex-start", sm: "center" }, // alinear inicio en columna, centrado en fila
            gap: 2, // Espacio entre los elementos
          }}
        >
          {/* Imagen del curso */}
          <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: 'auto' }, width: { xs: "100%", sm: 100 }, paddingBlock: 1 }}>
            <Box
              component="img"
              src={params.row.courseImg ? params.row.courseImg : 'https://res.cloudinary.com/mumbex/image/upload/v1660494910/logo1_ffq1qu.png'} // URL de la imagen
              alt={params.row.title}
              sx={{
                height: 100,
                objectFit: "cover", // ajusta la imagen sin deformar
                borderRadius: 1,    // esquinas redondeadas
              }}
            />
          </Box>

          {/* Título */}
          <Box sx={{ textAlign: { xs: "auto", sm: "auto" }, width: { xs: "100%", sm: "500px" } }}>
            <Box>
              <Typography
                variant="h6"
                component="h6"
                sx={{
                  textAlign: { xs: "center", sm: "left" },
                  whiteSpace: 'normal',
                  fontWeight: 500,
                  wordBreak: 'break-word',
                  flexGrow: 1,  // Ocupa todo el espacio disponible
                }}
              >
                Curso de {params.row.title}
              </Typography>
              <Typography
                variant="p"
                component="p"
                sx={{
                  textAlign: { xs: "center", sm: "left" },
                  whiteSpace: 'normal',
                  color: "red",
                  fontWeight: 600,
                  wordBreak: 'break-word',
                  flexGrow: 1,  // Ocupa todo el espacio disponible
                }}
              >
                Precio: {params.row.price}
              </Typography>
             
              <Typography
                variant="p"
                component="p"
                sx={{
                  textAlign: { xs: "center", sm: "left" },
                  whiteSpace: 'normal',
                  color: "black",
                  fontWeight: 500,
                  wordBreak: 'break-word',
                  flexGrow: 1,  // Ocupa todo el espacio disponible
                }}
              >
                Inicia el {new Date(params.row.startDate).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric'
                })}
              </Typography>
            </Box>
          </Box>
          {/* Botón Edit */}
          <Box sx={{
            display: "flex", justifyContent: "center", width: { xs: "100%", sm: "auto" },
            marginBlock: { xs: "4px", sm: "auto" }
          }}>

            <Button
              sx={{
                display: "flex", justifyContent: "center", width: { xs: "100%", sm: "auto" },
                marginRight: { xs: 0, sm: 0, md: 10, lg: 40 },
              }}
              variant="contained"
              component={NavLink}
              to={`/especialidades/${params.row._id}`}
              size="small"
            >
              ver especialidad
            </Button>
          </Box>
        </Box>


      )
    },
    {
      field: 'startDate',
      headerName: 'Inicio',
      width: 100,
      editable: false,
      valueGetter: (params) => {
        if (!params.value) return 'Sin fecha';
        return new Date(params.value).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        });
      }
    },

    {
      field: 'endDate',
      headerName: 'Finaliza',
      width: 100,
      editable: false,
      valueGetter: (params) => {
        if (!params.value) return 'Sin fecha';
        return new Date(params.value).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        });
      }
    },

    {
      field: 'price',
      headerName: 'Precio',
      width: 80,
      editable: false,
    },

    {
      field: 'format',
      headerName: 'Formato',
      width: 100,
      editable: false,
    },


    {
      field: 'acciones',
      headerName: 'Configurar curso',
      width: 60,
      editable: false,

      renderCell: (params) => {

        const currentRow = params.row;

        return (
          <>
            {
              <>
                <Button variant="contained" component={NavLink} to="/edit_course" size="small" >
                  Ir al curso
                </Button>
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



  if (isLoading) return <SkeletonTable />;

  return (
    <>
      <Box sx={{ height: 'auto', width: '100%' }}>
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
          sx={{
            '& .MuiDataGrid-row:hover': {
              cursor: 'pointer', // Cambia el cursor al pasar el mouse
              //py: 1, // padding vertical para que haya espacio
              alignItems: 'flex-start', // para que el contenido quede arriba si es multilinea

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
