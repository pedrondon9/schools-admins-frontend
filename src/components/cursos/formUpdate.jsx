import * as React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextareaAutosize, TextField, Typography } from '@mui/material';
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
  width: { xs: '90%', sm: '70%', md: '500px' },
  bgcolor: 'background.paper',
  pb: 4,
  pt: 4,
  overflowY: 'scroll',
  height: 'auto',
};

export default function FormUpdate({ dataUserSelected, mutateLocal }) {
  const { AxiosConfigsToken, typeUserSelected } = React.useContext(AppContext);

  const [roles, setRoles] = React.useState([]);

  const [errorInit, setErrorInit] = React.useState(false);
  const [errorInitMessage, setErrorInitMessage] = React.useState('');
  const [userTypeSelected, setUserTypeSelected] = React.useState('');
  const [arrayFiles, setArrayFiles] = React.useState('');

  const [loading, setLoad] = React.useState(false); //estado para activar el spinner del boton submit

  const [typeUser, setTypeUser] = React.useState('');
  const [previImageUsers, setPreviImageUsers] = React.useState(null);


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

    console.log(data, 'data')
    console.log(dataUserSelected, 'dataSelected')
    console.log(arrayFiles, 'files')
    console.log(data.roles ? [data.roles] : [dataUserSelected.role._id], 'roles')

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
      fs.append('roles', data.roles ? [data.roles] : [dataUserSelected.role._id]);
      fs.append('dni', data.dni);

      const sendData = await AxiosConfigsToken({
        url: `/users/put`,
        method: 'put',
        data: fs,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (sendData.data.success) {
        toast.success(`${sendData.data.message}`);
        await mutateLocal()
        handleCloseM();
      } else {
        toast.error(`${sendData.data.message}`);
      }
    } catch (error) {
      console.log(error)
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




  const onChangeTypeUser = (id) => {
    const roleSelected = roles.filter(role => role.name === id);

    console.log(roleSelected)

    setTypeUser(roleSelected)
    setUserTypeSelected(roleSelected[0].name)

  }


  React.useEffect(() => {
    //setImagen(null)
    //setPreviImage(null)
    getRoles()
    setPreviImageUsers(dataUserSelected?.linkPhoto)
  }, []);

  React.useEffect(() => {
    if (typerUsers?.roles) {
      onChangeTypeUser(typerUsers?.roles)
      console.log(typerUsers?.roles)
    }
    setUserTypeSelected(dataUserSelected?.role?.name)


  }, [typerUsers?.roles]);

  return (
    <Box
      sx={{
        height: 'auto',
        width: '100%',
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'start',
      }}
    >

      <Box sx={style}>

        {!dataUserSelected ?
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
              Actulizar los datos del curso
            </Typography>


            <Box sx={{ width: '95%', mt: 2 }}>
              <FormControl fullWidth error={!!errors.title} sx={{ mb: 3, }}>
                <TextField
                  name='title'
                  size="small"
                  defaultValue={dataUserSelected?.title}
                  type='text'
                  id="outlined-basic"
                  label="Modificar nombre del curso"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true, // Mantiene el label arriba
                  }}
                  {...register('title', {
                    required: false,
                    minLength: 1,
                  })}
                />
              </FormControl>
              <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                <InputLabel id="roles-label">Elige la categoria del curso</InputLabel>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: false }}

                  render={({ field }) => (
                    <Select
                      defaultValue={dataUserSelected?.role?._id}

                      label={'Modifica la categoria del curso'}
                      labelId="categories-label"
                      {...field}   // incluye value + onChange de RHF
                    >

                      {roles.map((opt) => (
                        <MenuItem key={opt._id} value={opt._id}>
                          {opt.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <FormControl error={!!errors.startDate} fullWidth sx={{ mb: 3 }}>
                <TextField
                  name='startDate'
                  //defaultValue={new Date(dataUserSelected?.birthdate).toISOString().split("T")[0]}
                  InputLabelProps={{
                    shrink: true, // Mantiene el label arriba
                  }}
                  type='date'
                  size="small"
                  id="outlined-basic"
                  label="Modificar fecha de Inicio"
                  variant="outlined"
                  {...register('startDate', {
                    required: 'Campo requerido',
                    minLength: 1,
                  })}
                />
              </FormControl>
              <FormControl error={!!errors.endDate} fullWidth sx={{ mb: 3 }}>
                <TextField
                  name='endDate'
                  //defaultValue={new Date(dataUserSelected?.birthdate).toISOString().split("T")[0]}
                  InputLabelProps={{
                    shrink: true, // Mantiene el label arriba
                  }}
                  type='date'
                  size="small"
                  id="outlined-basic"
                  label="Modificar fecha de finalizacion"
                  variant="outlined"
                  {...register('endDate', {
                    required: 'Campo requerido',
                    minLength: 1,
                  })}
                />
              </FormControl>
              <FormControl error={!!errors.price} fullWidth sx={{ mb: 3, }}>
                <TextField
                  name='price'
                  defaultValue={dataUserSelected?.price}
                  type='email'
                  size="small"
                  id="outlined-basic"
                  InputLabelProps={{
                    shrink: true, // Mantiene el label arriba
                  }}
                  label="Modifica el precio del curso"
                  variant="outlined"
                  {...register('price', {
                    required: false,
                    minLength: 1,
                  })}
                />
              </FormControl>
              <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                <InputLabel id="roles-label">Elige la categoria del curso</InputLabel>
                <Controller
                  name="format"
                  control={control}
                  rules={{ required: false }}

                  render={({ field }) => (
                    <Select
                      defaultValue={dataUserSelected?.role?._id}

                      label={'Modifica el formato del curso'}
                      labelId="format-label"
                      {...field}   // incluye value + onChange de RHF
                    >

                        <MenuItem  value={'online'}>online</MenuItem>
                        <MenuItem  value={'presencial'}>presencial</MenuItem>
                        <MenuItem  value={'mixto'}>mixto</MenuItem>
                      
                    </Select>
                  )}
                />
              </FormControl>
            

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
                size="small"
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
