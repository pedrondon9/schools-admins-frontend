import * as React from 'react';
import { Box, Button, Chip, FormControl, InputLabel, MenuItem, Modal, OutlinedInput, Select, TextareaAutosize, TextField, Typography, useTheme } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Edit } from '@mui/icons-material';
import AppContext from '../../contexts/ServiceContext';
import { Get } from './get';
import { mutate } from 'swr';
import FieldImageInput from '../form_components/fieldImage';
import FormAlert from '../form_components/FormAlert';
import { LoadingButton } from '@mui/lab';


const style = {
  //position: 'absolute',
  width: { xs: '100%', sm: '70%', md: '500px' },
  bgcolor: 'background.paper',
  pb: 4,
  pt: 4,
  overflowY: 'scroll',
  height: 'auto',
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function FormUpdate({ courseId, id }) {
  const theme = useTheme();

  const { AxiosConfigsToken, typeUserSelected, editEventId, getCourseId, courseCategory, getWithId,dataUserSelected } = React.useContext(AppContext);


  const [errorInit, setErrorInit] = React.useState(false);
  const [errorInitMessage, setErrorInitMessage] = React.useState('');
  const [userTypeSelected, setUserTypeSelected] = React.useState('');
  const [arrayFiles, setArrayFiles] = React.useState('');
  const [categories, setCategories] = React.useState([]);
  const [roles, setRoles] = React.useState([]);

  const [loading, setLoad] = React.useState(false); //estado para activar el spinner del boton submit

  const [typeUser, setTypeUser] = React.useState('');
  const [previImageUsers, setPreviImageUsers] = React.useState(null);
  const [personName, setPersonName] = React.useState([]);



  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  //habrir y cerrar el modal
  const [openM, setOpenM] = React.useState(false);
  const handleOpenM = () => setOpenM(true);
  const handleCloseM = () => {
    setOpenM(false);
    //setImagen(null)
    //setPreviImage(null)
  };
  /*********************************** */

  //el useForm de react form hook
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm()

  let typerUsers = watch()



  //para enviar datos en el servidor

  const onSubmit = async (data) => {

    data.id = id
    let rolesSelected = personName.map(n => roles.find(r => r.name === n)?._id)

    if (false) {
      return
    }

    try {
      setLoad(true);

      const fs = new FormData();

      fs.append('arrayFiles', arrayFiles ? arrayFiles : dataUserSelected?.linkPhoto);
      fs.append('fullname', data.fullname);
      fs.append('sex', data.sex);
      fs.append('id', dataUserSelected._id);
      fs.append('phone', data.phone);
      fs.append('posGalery', data.posGalery ? Number(data.posGalery) : 0);
      fs.append('email', data.email);
      fs.append('birthdate', data.birthdate);
      fs.append('info', data.info);
      fs.append('roles', JSON.stringify(rolesSelected));
      fs.append('position', data.position);
      fs.append('dni', data.dni);
      fs.append('brief_description', data.brief_description);


      const sendData = await AxiosConfigsToken({
        url: `/users/put`,
        method: 'put',
        data: fs,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (sendData.data.success) {
        toast.success(`${sendData.data.message}`);
        //await getCourseId(id)
        await getWithId(`users/get/${id}`, 'user')

      } else {
        toast.error(`${sendData.data.message}`);
      }
    } catch (error) {
      co
      toast.error(error.response?.data?.message);
    } finally {
      setLoad(false);
    }



  };








  // Obtener categorias de los curso
  const GetSelect = async () => {
    try {
      const response = await Get(AxiosConfigsToken, `categories/get_evnt_cat`);
      if (response.success) {
        setCategories(response?.response)

      } else {
        setCategories([])
      }
    } catch (error) {
    } finally {
    }
  }



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




  const onChangeTypeUser = (id) => {
    const roleSelected = roles.filter(role => role._id === id);

    console.log(roleSelected)

    setTypeUser(roleSelected)
    setUserTypeSelected(roleSelected[0].name)

  }


  React.useEffect(() => {
    //setImagen(null)
    //setPreviImage(null)
    getRoles()
  }, []);

  React.useEffect(() => {
    if (typerUsers?.roles) {
      onChangeTypeUser(typerUsers.roles)
      console.log(typerUsers.roles)
    }
    //setUserTypeSelected(dataUserSelected.role.name)

  }, [typerUsers?.roles]);

  React.useEffect(() => {
    //setImagen(null)
    //setPreviImage(null)
    GetSelect()
    setPreviImageUsers(dataUserSelected?.linkPhoto)

    //setPreviImageUsers(dataUserSelected?.linkPhoto)
  }, []);



  return (
    <Box
      sx={{
        height: 'auto',
        marginBottom: '10px',

      }}
    >

      <Box sx={style}>

        {dataUserSelected ?
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >


            <Typography
              sx={{
                textAlign: 'center',
                fontFamily: 'sans-serif',
                //fontSize: '14px',
                //color: "#3e2723",
              }}
              variant="h6"
              component="h6"
            >
              Actulizar los datos
            </Typography>


            <Box sx={{ width: '95%', mt: 2 }}>


              <FormControl fullWidth error={!!errors.fullname} sx={{ mb: 2, }}>
                <TextField
                  name='fullname'
                  size="large"
                  defaultValue={dataUserSelected.fullname}
                  type='text'
                  id="outlined-basic"
                  label="Nombre completo"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true, // Mantiene el label arriba
                  }}
                  {...register('fullname', {
                    required: false,
                    minLength: 1,
                  })}
                />
              </FormControl>
              <FormControl error={!!errors.email} fullWidth sx={{ mb: 2, }}>
                <TextField
                  name='email'
                  defaultValue={dataUserSelected.email}
                  type='email'
                  size="large"
                  id="outlined-basic"
                  InputLabelProps={{
                    shrink: true, // Mantiene el label arriba
                  }}
                  label="Correo"
                  variant="outlined"
                  {...register('email', {
                    required: false,
                    minLength: 1,
                  })}
                />
              </FormControl>
              <FormControl error={!!errors.phone} fullWidth sx={{ mb: 2, }}>
                <TextField
                  name='phone'
                  defaultValue={dataUserSelected.phone}
                  type='phone'
                  size="large"
                  id="outlined-basic"
                  label="Telefono"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true, // Mantiene el label arriba
                  }}
                  {...register('phone', {
                    required: false,
                    minLength: 1,
                  })}
                />
              </FormControl>

              <FormControl error={!!errors.dni} fullWidth sx={{ mb: 2, }}>
                <TextField
                  name='dni'
                  defaultValue={dataUserSelected.dni}
                  type='text'
                  size="large"
                  id="outlined-basic"
                  label="DNI o pasaporte"
                  InputLabelProps={{
                    shrink: true, // Mantiene el label arriba
                  }}
                  variant="outlined"
                  {...register('dni', {
                    required: 'Campo requerido',
                    minLength: 1,
                  })}
                />
              </FormControl>

              <FormControl fullWidth error={!!errors.brief_description} sx={{ mb: 3, }}>

                <TextareaAutosize
                  placeholder='Breve descripcion del usuario (Opcional)'
                  name={'brief_description'}
                  defaultValue={dataUserSelected?.brief_description}

                  style={{ width: '100%', padding: '8px', fontSize: '14px', marginBlock: '5px', height: '50px' }}
                  {...register('brief_description', {
                    required: false,
                    minLength: 1,
                  })}

                />
              </FormControl>

              <FormControl error={!!errors.birthdate} fullWidth sx={{ mb: 2, }}>
                <TextField
                  name='birthdate'
                  defaultValue={new Date(dataUserSelected?.birthdate).toISOString().split("T")[0]}
                  InputLabelProps={{
                    shrink: true, // Mantiene el label arriba
                  }}
                  type='date'
                  size="large"
                  id="outlined-basic"
                  label="Fecha de nacimiento"
                  variant="outlined"
                  {...register('birthdate', {
                    required: 'Campo requerido',
                    minLength: 1,
                  })}
                />
              </FormControl>



              <FormControl fullWidth size="large" sx={{ mt: 2.5 }}>
                <InputLabel id="demo-multiple-chip-label">Tipo de usuario</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Tipo de usuario" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {roles.map((role) => (
                    <MenuItem
                      key={role.name}
                      value={role.name}
                      style={getStyles(role, personName, theme)}
                    >
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2, }}>
                <TextField
                  name='position'
                  error={!!errors.position}
                  defaultValue={dataUserSelected?.position}

                  type='text'
                  size="large"
                  id="outlined-basic"
                  InputLabelProps={{
                    shrink: true, // Mantiene el label arriba
                  }}
                  label="Puesto o cargo del usuario (Opcional)"
                  variant="outlined"
                  {...register('position', {
                    required: false,
                    minLength: 1,
                  })}
                />
              </FormControl>
              <FormControl error={!!errors.posGalery} fullWidth sx={{ mt: 2, }}>
                <TextField
                  name='posGalery'
                  defaultValue={dataUserSelected?.posGalery}
                  type='number'
                  size="large"
                  id="outlined-basic"
                  InputLabelProps={{
                    shrink: true, // Mantiene el label arriba
                  }}
                  label="Posicion en la galeria (Opcional)"
                  variant="outlined"
                  {...register('posGalery', {
                    required: false,
                    minLength: 1,
                  })}
                />
              </FormControl>

              <FormControl fullWidth size="large" sx={{ mt: 2, mb: 2 }}>
                <InputLabel id="roles-label">Genero del usuario</InputLabel>
                <Controller
                  name="sex"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Select
                      defaultValue={dataUserSelected.sex}
                      label={'Genero del usuario'}
                      labelId="roles-label"
                      {...field}   // incluye value + onChange de RHF

                    >
                      <MenuItem key={'hombre'} value={'hombre'}>
                        Hombre
                      </MenuItem>
                      <MenuItem key={'mujer'} value={'mujer'}>
                        Mujer
                      </MenuItem>
                    </Select>
                  )}
                />
              </FormControl>

              <Controller
                name="imagen1"
                control={control}
                render={({ }) => (
                  <FieldImageInput
                    label={'Foto del usuario'}
                    onFileChange={(file) => {
                      setArrayFiles(file);
                    }}
                  />
                )}
              />

              {!arrayFiles ?
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <FormControl sx={{ mt: 1, width: '20%', justifyItems: 'center' }} size="small">
                    <img src={previImageUsers} alt="" />
                  </FormControl></div> :
                <></>
              }

              {errorInit && (
                <Box sx={{ width: '95%', mt: 2 }}>
                  <FormAlert message={errorInitMessage} />
                </Box>
              )}

            </Box>

            <Box sx={{ width: '95%', mt: 2 }}>
              <LoadingButton
                loading={loading}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                size="large"
              >
                Actualizar
              </LoadingButton>
            </Box>

          </form>
          :
          <></>
        }


      </Box>


    </Box>
  );
}
