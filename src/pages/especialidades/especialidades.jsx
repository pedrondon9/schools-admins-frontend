import * as React from 'react';
import ModalAdd from '../../components/especialidades/modalAdd';
import { GetRoles } from '../../components/profil/getRoles';
import AppContext from '../../contexts/ServiceContext';
import DataCard from '../../components/especialidades/dataCard';
import { Title } from '../../components/textTitle/title';
import DataTable from '../../components/dataGrid/dataTable';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Get } from '../../components/especialidades/get';
import { TYPE_USER_SELECTED } from '../../contexts/constantesVar';
import { NavLink } from 'react-router-dom';

export const Especialidades = () => {
  const { AxiosConfigsToken, dispatch } = React.useContext(AppContext);
  const [selected, setSelected] = React.useState('');
  const [roles, setRoles] = React.useState([]);


  const getRoles = async () => {
    try {
      const response = await Get(AxiosConfigsToken, `roles/get`);
      if (response.success) {
        setRoles(response.response)

      } else {
        setRoles([])
      }
    } catch (error) {
    } finally {
    }
  }

  const VISIBLE_FIELDS = ['title'];

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
          <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: 'auto' }, width: { xs: "100%", sm: 120 }, paddingBlock: 1 }}>
            <Box
              component="img"
              src={params.row.linkPhoto ? params.row.linkPhoto : 'https://res.cloudinary.com/mumbex/image/upload/v1660494910/logo1_ffq1qu.png'} // URL de la imagen
              alt={params.row.title}
              sx={{
                width: 100,
                height: 100,
                objectFit: "cover", // ajusta la imagen sin deformar
                borderRadius: 1,    // esquinas redondeadas
              }}
            />
          </Box>

          {/* Título */}
          <Box sx={{ textAlign: { xs: "auto", sm: "auto" }, width: { xs: "100%", sm: "600px" } }}>
            <Box>
              <Typography
                variant="h6"
                component="h6"
                sx={{
                  textAlign: { xs: "center", sm: "left" },
                  whiteSpace: 'normal',
                  fontWeight: 500,
                  wordBreak: 'break-word',
                  //backgroundColor:"#1976d2",
                  //width: { xs: "100%", sm: "600px" },
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

            width: { xs: "100%", sm: "120px" },
            marginBlock: { xs: "4px", sm: "auto" }
          }}>

            <Button
              sx={{
                width: { xs: "100%", sm: "120px" },
                marginRight: { xs: 0, sm: 0, md: 10, lg: 40 },
              }}
              variant="contained"
              component={NavLink}
              to={`/especialidades/${params.row._id}`}
              size="small"
            >
              Ir al curso
            </Button>
          </Box>
        </Box>


      )
    },

  ];


  React.useEffect(() => {
    getRoles()
  }, [])
  return (
    <div>
      <Title title="Especialidades" />

      <ModalAdd typeUserSelected={selected} />
      <FormControl sx={{ mb: 2, width: '100%' ,display:"none"}}>
        <InputLabel size="small" id="demo-simple-select-label">
          Elige el perfil
        </InputLabel>
        <Select
          value={selected}
          sx={{ bgcolor: "#fff" }}
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Estado del curso"
          onChange={(e) => {
            setSelected(e.target.value);
            dispatch({
              type: TYPE_USER_SELECTED,
              payload: e.target.value
            })
          }
          }
        >
          {roles.map((role) =>
            <MenuItem key={role.name} value={role.name}>{role.name}</MenuItem>
          )}
        </Select>
      </FormControl>
      <DataTable urlId = {`especialidades`} columns1={columns1} VISIBLE_FIELDS={VISIBLE_FIELDS} typeUserSelected={selected} url={`especialities/get`}
        sx={{
          '& .MuiDataGrid-row:hover': {
            cursor: 'pointer', // Cambia el cursor al pasar el mouse
            //py: 1, // padding vertical para que haya espacio
            alignItems: 'flex-start', // para que el contenido quede arriba si es multilinea

          },
          '& .MuiDataGrid-row': {
            fontWeight: 'bold',   //  hace todas las filas bold
            bgcolor: 'rgba(255, 255, 255, 0.38)'
          },
        }} />
    </div>
  );
};
