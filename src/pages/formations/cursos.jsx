import * as React from 'react';
import ModalAdd from '../../components/cursos/modalAdd';
import { GetRoles } from '../../components/profil/getRoles';
import AppContext from '../../contexts/ServiceContext';
import DataCard from '../../components/cursos/dataCard';
import { Title } from '../../components/textTitle/title';
import DataTable from '../../components/cursos/dataTable';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Get } from '../../components/cursos/get';
import { TYPE_USER_SELECTED } from '../../contexts/constantesVar';

export const Cursos = () => {
  const { AxiosConfigsToken,dispatch } = React.useContext(AppContext);
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


  React.useEffect(() => {
    getRoles()
  }, [])
  return (
    <div>
      <Title title="Cursos" />

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
            dispatch({
              type:TYPE_USER_SELECTED,
              payload:e.target.value
            })
          }
          }
        >
          {roles.map((role) =>
            <MenuItem key={role.name} value={role.name}>{role.name}</MenuItem>
          )}
        </Select>
      </FormControl>
      <DataTable typeUserSelected={selected} />
    </div>
  );
};
