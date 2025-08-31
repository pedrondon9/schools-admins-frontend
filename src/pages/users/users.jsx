import * as React from 'react';
import AppContext from '../../contexts/ServiceContext';
import { Title } from '../../components/textTitle/title';
import DataTable from '../../components/dataGrid/dataTable';
import FormAdd from '../../components/users/formAdd';
import { Avatar, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
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
      field: 'linkPhoto',
      headerName: 'Foto',
      width: 110,
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
      field: 'email',
      headerName: 'Email',
      width: 180,
      editable: false,
    },
    {
      field: 'phone',
      headerName: 'Telefono',
      width: 150,
      editable: false,
    },
    {
      field: 'fullname',
      headerName: 'Nombre completo',
      width: 200,
      editable: false,
    },
    {
      field: 'roles',
      headerName: 'Role',
      width: 100,
      editable: false,
      valueGetter: (params) => {
        return params.row.roles?.map((role) => role.name).join(', ');
      },
    },


    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 130,
      editable: false,

      renderCell: (params) => {

        const currentRow = params.row;

        return (
          <>
            {
              <>

                <FormUpdate typeUserSelected={selected}  dataUserSelected={currentRow} url={`users/get`} />

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

      <FormAdd typeUserSelected={selected} url={`users/get/${selected}`} />
      <FormControl sx={{ mb: 2, width: '100%',display:"none" }}>
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
      <DataTable typeUserSelected={selected} VISIBLE_FIELDS={VISIBLE_FIELDS} columns1={columns1} url={`users/get`}
        sx={{
          '& .MuiDataGrid-row': {
            fontWeight: 600,   //  hace todas las filas bold
            fontFamily: 'sans-serif',
            bgcolor: 'rgba(255, 255, 255, 0.38)',
            height: 80,
          },
        }} />
    </div>
  );
};
