import * as React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Add } from '@mui/icons-material';
import AppContext from '../../contexts/ServiceContext';
import RegistreForm from '../form_components/form/RegistreForm';
import { Get } from './get';
import { mutate } from 'swr';
import { LoadingButton } from '@mui/lab';
import FormAlert from '../form_components/FormAlert';
import FieldImageInput from '../form_components/fieldImage';
import { useTheme } from '@mui/material/styles';
import { OutlinedInput, Chip } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '70%', md: '400px' },
  bgcolor: 'background.paper',
  boxShadow: 24,
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

export default function FormAdd({ typeUserSelected, url }) {
  const theme = useTheme();

  const { AxiosConfigsToken, dataUser } = React.useContext(AppContext);
  const [roles, setRoles] = React.useState([]);

  const [errorInit, setErrorInit] = React.useState(false);
  const [errorInitMessage, setErrorInitMessage] = React.useState('');
  const [arrayFiles, setArrayFiles] = React.useState('');

  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoad] = React.useState(false); //estado para activar el spinner del boton submit

  const [typeUser, setTypeUser] = React.useState('');
  const [previImage, setPreviImage] = React.useState(null);


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
    control,
    formState: { errors },
  } = useForm();

  let typerUsers = watch()



  //para enviar datos en el servidor
  const onSubmit = async (data) => {
    data.roles = [data.roles]

    let rolesSelected = personName.map(n => roles.find(r => r.name === n)?._id)

    //console.log(Array.from(rolesSelected), 'data')

    try {
      if (false) {
        return
      }
      setLoad(true);
      const fs = new FormData();
      fs.append('fullname', data.fullname);
      fs.append('sex', data.sex);
      fs.append('dni', data.dni);
      fs.append('phone', data.phone);
      fs.append('posGalery', data.posGalery ? Number(data.posGalery) : 0);
      fs.append('email', data.email);
      fs.append('roles', JSON.stringify(rolesSelected));
      fs.append('isActive', true);
      fs.append('isVerified', true);
      fs.append('school', dataUser.schoolTenant);
      fs.append('arrayFiles', arrayFiles);
      fs.append('birthdate', data.birthdate);
      fs.append('info', data.info);

      const sendData = await AxiosConfigsToken({
        url: `/users/post`,
        method: 'post',
        data: fs,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (sendData.data.success) {
        toast.success(`${sendData.data.message}`);
        setPreviImage(null);
        setArrayFiles([])
        //reset()
        await mutate('users/get');
        handleCloseM();
      } else {
        toast.error(`${sendData.data.message}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoad(false);
    }


  };


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


  const fieldCreateUsers = [
    {
      name: 'fullname',
      label: 'Nombre completo',
      type: 'text',
      validation: { required: true },
      startIcon: null,
    },
    {
      name: 'email',
      label: 'Correo ',
      type: 'email',
      validation: { required: true },
      startIcon: null,
    },
    {
      name: 'phone',
      label: 'Telefono',
      type: 'text',
      validation: { required: true },
      startIcon: null,
    },
    {
      name: 'dni',
      label: 'Identidad o pasaporte',
      type: 'text',
      validation: { required: true },
      startIcon: null
    },
    {
      name: 'sex',
      label: 'Genero',
      type: 'select',
      validation: { required: 'Selecciona el genero' },
      options: [
        {
          label: 'Hombre',
          value: 'hombre'
        },
        {
          label: 'Mujer',
          value: 'mujer'
        }
      ]
    },
    {
      name: 'birthdate',
      label: 'Fecha de nacimiento',
      type: 'date',
      validation: { required: true },
      startIcon: null
    },
    {
      name: 'roles',
      label: 'Tipo de usuario',
      type: 'select',
      validation: { required: 'Selecciona un role' },
      options: roles?.map((opt) => ({
        label: opt.name,
        value: opt._id
      }))
    },
    ...(typeUser[0]?.name === 'admin'
      ? [

        {
          name: 'posGalery',
          label: 'Posicion en la galeria',
          type: 'number',
          validation: { required: true },
          startIcon: null
        }
      ]
      : []),
    {
      name: 'imagen1',
      label: 'La foto del usuario',
      type: 'file',
      validation: { required: true },
      startIcon: null,
    },

  ];


  const onChangeTypeUser = (id) => {
    const roleSelected = roles.filter(role => role._id === id);

    setTypeUser(roleSelected)

    console.log(roleSelected, 'dd dd  dd  dd ')
  }




  React.useEffect(() => {
    //setImagen(null)
    //setPreviImage(null)
    getRoles()
  }, []);

  React.useEffect(() => {
    if (typerUsers?.roles) {
      onChangeTypeUser(typerUsers.roles)
    }
  }, [typerUsers?.roles]);

  return (
    <Box
      sx={{
        height: 'auto',
        width: '100%',
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'end',
      }}
    >
      <Button variant="contained" onClick={handleOpenM} size="small">
        <Add />
      </Button>
      <Modal
        open={openM}
        onClose={handleCloseM}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <Box sx={style}>
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
              Actulizar
            </Typography>


            <Box sx={{ width: '95%', mt: 2 }}>
              <FormControl fullWidth sx={{ mb: 2, }}>
                <TextField
                  error={!!errors.fullname}
                  name='fullname'
                  size="small"
                  type='text'
                  id="outlined-basic"
                  label="Nombre completo"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true, // Mantiene el label arriba
                  }}
                  {...register('fullname', {
                    required: true,
                    minLength: 1,
                  })}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2, }}>
                <TextField
                  error={!!errors.email}
                  name='email'
                  type='email'
                  size="small"
                  id="outlined-basic"
                  InputLabelProps={{
                    shrink: true, // Mantiene el label arriba
                  }}
                  label="Correo"
                  variant="outlined"
                  {...register('email', {
                    required: true,
                    minLength: 1,
                  })}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2, }}>
                <TextField
                  error={!!errors.phone}
                  name='phone'
                  type='phone'
                  size="small"
                  id="outlined-basic"
                  label="Telefono"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true, // Mantiene el label arriba
                  }}
                  {...register('phone', {
                    required: true,
                    minLength: 1,
                  })}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2, }}>
                <TextField
                  error={!!errors.dni}
                  name='dni'
                  type='text'
                  size="small"
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


              <FormControl fullWidth sx={{ mb: 2, }}>
                <TextField
                  name='birthdate'
                  InputLabelProps={{
                    shrink: true, // Mantiene el label arriba
                  }}
                  error={!!errors.birthdate}
                  type='date'
                  size="small"
                  id="outlined-basic"
                  label="Fecha de nacimiento"
                  variant="outlined"
                  {...register('birthdate', {
                    required: 'Campo requerido',
                    minLength: 1,
                  })}
                />
              </FormControl>


              <FormControl fullWidth size="small" sx={{ mt: 2.5 }}>
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


              {typeUser[0]?.name === 'admin' ?
                <FormControl fullWidth sx={{ mt: 2, }}>
                  <TextField
                    name='posGalery'
                    error={!!errors.posGalery}
                    type='number'
                    size="small"
                    id="outlined-basic"
                    InputLabelProps={{
                      shrink: true, // Mantiene el label arriba
                    }}
                    label="Posicion en la galeria"
                    variant="outlined"
                    {...register('posGalery', {
                      required: false,
                      minLength: 1,
                    })}
                  />
                </FormControl>
                :
                <></>
              }
              <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                <InputLabel id="roles-label">Genero del usuario</InputLabel>
                <Controller
                  name="sex"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      error={!!errors.sex}
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
              <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>

                <TextareaAutosize
                  error={!!errors.info}
                  name={'info'} placeholder={''}
                  style={{ width: '100%', padding: '8px', fontSize: '14px', marginBlock: '5px', height: '50px' }}
                  {...register('info', { required: true })}

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

              {errorInit && (
                <Box sx={{ width: '95%', mt: 2 }}>
                  <FormAlert message={errorInitMessage} />
                </Box>
              )}

              <Box sx={{ width: '95%', mt: 2 }}>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  size="small"
                >
                  Actualizar
                </LoadingButton>
              </Box>
            </Box>




          </form>

          {false &&
            <RegistreForm
              setArrayFiles={setArrayFiles}
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              register={register}
              errors={errors}
              fields={fieldCreateUsers}
              showPassword={showPassword}
              togglePasswordVisibility={() => setShowPassword(!showPassword)}
              errorInit={errorInit}
              errorInitMessage={errorInitMessage}
              loading={loading}
              buttonLabel="Registrar"
              imageUrl=""
              imageAlt="Global2a"
              linkUrl=""
              linkText=""
              text='Registrar usuario'

            />
          }
        </Box>






      </Modal>
    </Box>
  );
}
