import * as React from 'react';
import ModalAdd from '../../components/users/modalAdd';
import { GetRoles } from '../../components/profil/getRoles';
import AppContext from '../../contexts/ServiceContext';
import DataCard from '../../components/users/dataCard';
import { Title } from '../../components/textTitle/title';
import DataTable from '../../components/users/dataTable';
import FormAdd from '../../components/profes/formAdd';
import { fieldCreate } from '../../components/form_components/arrayFields';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Get } from '../../components/users/get';

export const Users = () => {
  const { AxiosConfigsToken } = React.useContext(AppContext);
  const [selected, setSelected] = React.useState('');
  const [roles, setRoles] = React.useState([]);


  const getRoles = async () => {
    try {
      const response = await Get(AxiosConfigsToken, `roles/get`);
      console.log(response.response, 'rolessssssss')
      if (response.success) {
        setRoles(response.response)

      } else {
        setRoles([])
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
    }
  }


  React.useEffect(() => {
    getRoles()
  }, [])
  return (
    <div>
      <Title title="Usuarios" />

      <ModalAdd typeUserSelected={selected}/>
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
          }
          }
        >
          {roles.map((role) =>
            <MenuItem value={role.name}>{role.name}</MenuItem>
          )}
        </Select>
      </FormControl>
      <DataTable typeUserSelected={selected} />
    </div>
  );
};
