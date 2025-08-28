import * as React from 'react';
import ModalAdd from '../../components/users/modalAdd';
import { GetRoles } from '../../components/profil/getRoles';
import AppContext from '../../contexts/ServiceContext';
import DataCard from '../../components/users/dataCard';
import { Title } from '../../components/textTitle/title';
import DataTable from '../../components/dataGrid/dataTable';
import FormAdd from '../../components/profes/formAdd';
import { fieldCreate } from '../../components/form_components/arrayFields';
import { Avatar, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Get } from '../../components/users/get';
import { TYPE_USER_SELECTED } from '../../contexts/constantesVar';
import FormUpdate from '../../components/users/formUpdate';

export const Users = () => {
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
  const VISIBLE_FIELDS = ['email', 'roles', 'fullname', 'linkPhoto', 'phone', 'acciones'];

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

                <FormUpdate typeUserSelected={selected}  dataUserSelected={currentRow} />

              </>
            }
          </>
        );
      },
    },

  ];

  React.useEffect(() => {
    getRoles()
  }, [])
  return (
    <div>
      <Title title="Usuarios" />

      <ModalAdd typeUserSelected={selected} />
      <FormControl sx={{ mb: 2, width: '100%' }}>
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
      <DataTable typeUserSelected={selected} VISIBLE_FIELDS={VISIBLE_FIELDS} columns1={columns1} url={`users/get/${selected}`}
        sx={{
          '& .MuiDataGrid-row': {
            fontWeight: 'bold',   //  hace todas las filas bold
            bgcolor: 'rgba(255, 255, 255, 0.38)',
            height: 50,
          },
        }} />
    </div>
  );
};
