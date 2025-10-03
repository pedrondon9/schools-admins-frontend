import * as React from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
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

export default function FormUpdate({ courseId, id }) {
  const {
    AxiosConfigsToken,
    typeUserSelected,
    editCourseId,
    getCourseId,
    courseCategory,
    getWithId,
  } = React.useContext(AppContext);

  const [errorInit, setErrorInit] = React.useState(false);
  const [errorInitMessage, setErrorInitMessage] = React.useState('');
  const [userTypeSelected, setUserTypeSelected] = React.useState('');
  const [arrayFiles, setArrayFiles] = React.useState('');
  const [categories, setCategories] = React.useState([]);

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
  } = useForm();

  let typerUsers = watch();

  //para enviar datos en el servidor

  const onSubmit = async (data) => {
    data.id = id;

    if (false) {
      return;
    }

    try {
      setLoad(true);
      const fs = new FormData();

      fs.append('arrayFiles', arrayFiles ? arrayFiles : editCourseId?.courseImg);
      fs.append('title', data.title);
      fs.append('category', data.category);
      fs.append('startDate', data.startDate);
      fs.append('endDate', data.endDate);
      fs.append('price', data.price);
      fs.append('brief_description', data.brief_description);
      fs.append('format', data.format);
      fs.append('id', id);
      const sendData = await AxiosConfigsToken({
        url: `/course/put`,
        method: 'put',
        data: fs,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (sendData.data.success) {
        toast.success(`${sendData.data.message}`);
        //await getCourseId(id)
        await getWithId(`course/get/${id}`, 'course');
      } else {
        toast.error(`${sendData.data.message}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoad(false);
    }
  };

  // Obtener categorias de los curso
  const GetSelect = async () => {
    try {
      const response = await Get(AxiosConfigsToken, `categories/get`);
      if (response.success) {
        setCategories(response?.response);
      } else {
        setCategories([]);
      }
    } catch (error) {
    } finally {
    }
  };

  React.useEffect(() => {
    //setImagen(null)
    //setPreviImage(null)
    GetSelect();
    setPreviImageUsers(editCourseId?.courseImg);

    //setPreviImageUsers(dataUserSelected?.linkPhoto)
  }, []);

  return (
    <Box
      sx={{
        height: 'auto',
        width: '100%',
        marginBottom: '10px',
        display: 'flex',
      }}
    >
      <Box sx={style}>
        {editCourseId ? (
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
              <FormControl fullWidth error={!!errors.title} sx={{ mb: 3 }}>
                <TextField
                  name="title"
                  size="large"
                  defaultValue={editCourseId?.title}
                  type="text"
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
              <FormControl fullWidth size="large" sx={{ mb: 3 }}>
                <InputLabel id="roles-label">Elige la categoria del curso</InputLabel>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: false }}
                  defaultValue={editCourseId?.category?._id || ''}
                  render={({ field }) => (
                    <Select
                      label={'Modifica la categoria del curso'}
                      labelId="categories-label"
                      {...field} // incluye value + onChange de RHF
                    >
                      {categories.map((opt) => (
                        <MenuItem key={opt._id} value={opt._id}>
                          {opt.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <FormControl fullWidth error={!!errors.brief_description} sx={{ mb: 3 }}>
                <TextareaAutosize
                  placeholder="Breve descripcion del curso"
                  name={'brief_description'}
                  defaultValue={editCourseId?.brief_description}
                  style={{
                    width: '100%',
                    padding: '8px',
                    fontSize: '14px',
                    marginBlock: '5px',
                    height: '50px',
                  }}
                  {...register('brief_description', {
                    required: false,
                    minLength: 1,
                  })}
                />
              </FormControl>
              <FormControl error={!!errors.startDate} fullWidth sx={{ mb: 3, display: 'none' }}>
                <TextField
                  name="startDate"
                  defaultValue={new Date(editCourseId?.startDate).toISOString().split('T')[0]}
                  InputLabelProps={{
                    shrink: true, // Mantiene el label arriba
                  }}
                  type="date"
                  size="large"
                  id="outlined-basic"
                  label="Modificar fecha de Inicio"
                  variant="outlined"
                  {...register('startDate', {
                    required: 'Campo requerido',
                    minLength: 1,
                  })}
                />
              </FormControl>
              <FormControl error={!!errors.endDate} fullWidth sx={{ mb: 3, display: 'none' }}>
                <TextField
                  name="endDate"
                  defaultValue={new Date(editCourseId?.endDate).toISOString().split('T')[0]}
                  InputLabelProps={{
                    shrink: true, // Mantiene el label arriba
                  }}
                  type="date"
                  size="large"
                  id="outlined-basic"
                  label="Modificar fecha de finalizacion"
                  variant="outlined"
                  {...register('endDate', {
                    required: 'Campo requerido',
                    minLength: 1,
                  })}
                />
              </FormControl>
              <FormControl error={!!errors.price} fullWidth sx={{ mb: 3 }}>
                <TextField
                  name="price"
                  defaultValue={editCourseId?.price}
                  type="number"
                  size="large"
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
              <FormControl fullWidth size="large" sx={{ mb: 3 }}>
                <InputLabel id="roles-label">Modifica el formato del curso</InputLabel>
                <Controller
                  name="format"
                  control={control}
                  rules={{ required: false }}
                  defaultValue={editCourseId?.format || ''}
                  render={({ field }) => (
                    <Select
                      label={'Modifica el formato del curso'}
                      labelId="format-label"
                      {...field} // incluye value + onChange de RHF
                    >
                      <MenuItem value={'online'}>online</MenuItem>
                      <MenuItem value={'presencial'}>presencial</MenuItem>
                      <MenuItem value={'mixto'}>mixto</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>

              <Controller
                name="imagen1"
                control={control}
                render={({}) => (
                  <FieldImageInput
                    label={'Foto del usuario'}
                    onFileChange={(file) => {
                      setArrayFiles(file);
                    }}
                  />
                )}
              />

              {!arrayFiles ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <FormControl sx={{ mt: 1, width: '20%', justifyItems: 'center' }} size="small">
                    <img src={previImageUsers} alt="" />
                  </FormControl>
                </div>
              ) : (
                <></>
              )}

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
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}
