import * as React from 'react';
import AppContext from '../../contexts/ServiceContext';
import { Title } from '../../components/textTitle/title';
import FormAdd from '../../components/users/formAdd';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from '@mui/material';
import { Get } from '../../components/users/get';
import { TYPE_USER_SELECTED } from '../../contexts/constantesVar';
import FormUpdate from '../../components/users/formUpdate';
import { render } from '@testing-library/react';
import DataTable from '../../components/users/dataTable';
import { NavLink } from 'react-router-dom';
import { Visibility } from '@mui/icons-material';

export const Users = () => {
  const { AxiosConfigsToken, dispatch } = React.useContext(AppContext);
  const [selected, setSelected] = React.useState('');
  const [roles, setRoles] = React.useState([]);

  const getRoles = async () => {
    try {
      const response = await Get(AxiosConfigsToken, `roles/get`);
      if (response.success) {
        setRoles(response.response);
      } else {
        setRoles([]);
      }
    } catch (error) {
    } finally {
    }
  };
  const VISIBLE_FIELDS = ['photo', 'acciones', 'name'];

  const columns1 = [
    {
      field: "photo",
      headerName: "Foto",
      width: 100,
      renderCell: (params) => (


        <Avatar
          sx={{ bgcolor: "#1976d2" }}
          alt="Foto"
          src={params.row.linkPhoto}
        />
      ),
    },
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Typography fontWeight="bold">{params.row.name}</Typography>
          <Typography sx={{fontWeight:500}} variant="body2" color="text.secondary">
            {params.row.fullname}
          </Typography>
        </Box>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Typography fontWeight="bold">{params.row.name}</Typography>
          <Typography sx={{fontWeight:500}} variant="body2" color="text.secondary">
            {params.row.email}
          </Typography>
        </Box>
      ),
    },
    {
      field: "role",
      headerName: "Roles",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Typography fontWeight="bold">{params.row.name}</Typography>
          <Typography sx={{fontWeight:500}} variant="body2" color="text.secondary">
            {params.row.roles?.map((role) => role.name).join(", ")}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 100,
      editable: false,

      renderCell: (params) => {
        const currentRow = params.row;

        return (
          <>
            {
              <>
                <IconButton
                  component={NavLink}
                  to={`/users/info/${params.row._id}`}
                  color="primary"
                >
                  <Visibility />
                </IconButton>
              </>
            }
          </>
        );
      },
    },
  ];


  React.useEffect(() => {
    getRoles();
  }, []);
  return (
    <div style={{maxWidth:"1200px", margin:"auto"}}>
      <Toolbar />
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Usuarios
      </Typography>
      <FormAdd typeUserSelected={selected} url={`users/get/${selected}`} />
      <FormControl sx={{ mb: 2, width: '100%', display: 'none' }}>
        <InputLabel size="small" id="demo-simple-select-label">
          Elige el perfil
        </InputLabel>
        <Select
          value={selected}
          sx={{ bgcolor: '#fff' }}
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Estado del curso"
          onChange={(e) => {
            setSelected(e.target.value);
            dispatch({
              type: TYPE_USER_SELECTED,
              payload: e.target.value,
            });
          }}
        >
          {roles.map((role) => (
            <MenuItem key={role.name} value={role.name}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <DataTable
        typeUserSelected={selected}
        VISIBLE_FIELDS={VISIBLE_FIELDS}
        columns1={columns1}
        url={`users/get`}
        sx={{
          '& .MuiDataGrid-row': {
            fontWeight: 600, //  hace todas las filas bold
            fontFamily: 'sans-serif',
            bgcolor: '#FFFFFF',
            height: 'auto',
          },
        }}
      />
    </div>
  );
};
