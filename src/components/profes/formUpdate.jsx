import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Button, Grid, Modal, styled, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form';
import axiosConfigs from '../axiosConfig';
import toast, { Toaster } from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { Add, CloudUpload, Edit, UploadFile, UploadSharp } from '@mui/icons-material';
import AppContext from '../../contexts/ServiceContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '70%', md: '500px' },
  bgcolor: '#e0e0e0', //'background.paper',
  boxShadow: 24,
  pb: 4,
  pt: 4,
  overflowY: 'scroll',
  height: '500px',
};

export default function FormUpdate({ dataUp }) {
  const { userId, AxiosConfigsToken } = React.useContext(AppContext);

  const { mutate } = useSWRConfig();

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  //habrir y cerrar el modal
  const [openM, setOpenM] = React.useState(false);
  const handleOpenM = () => setOpenM(true);
  const handleCloseM = () => {
    setOpenM(false);
    setImagen(null);
    setPreviImage(null);
  };
  /*********************************** */

  const theme = useTheme();
  const [perfils, setPerfils] = React.useState('');
  const [previImage, setPreviImage] = React.useState(null);
  const [imagen, setImagen] = React.useState(null);
  const [load, setLoad] = React.useState(false); //estado para activar el spinner del boton submit
  const [defautValues, setDefautValues] = React.useState({});

  //el useForm de react form hook
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      roles: "admin",
    },
  });

  //para enviar datos en el servidor
  const onSubmit = async (data) => {
    for (let x in perfils) {
      if (perfils[x].name === data.puesto) {
        data.roles = [perfils[x]._id];
      }
    }

    console.log(data);

    try {
      setLoad(true);
      const fs = new FormData();
      fs.append('imagen1', imagen ? imagen : dataUp.imagen1);
      fs.append('puesto', data.puesto);
      fs.append('sex', data.sex);
      fs.append('contact', data.contact);
      fs.append('info', data.educacion);
      fs.append('email', data.email);
      fs.append('nombre', data.nombre);
      fs.append('userId', userId);
      fs.append('nameAdminRegister', '');
      fs.append('phoneAdminRegister', '');
      fs.append('roles', data.roles[0] !== dataUp.roles[0] ? data.roles[0] : dataUp.roles[0]);
      fs.append('id', dataUp._id);
      fs.append('tipo', '');

      const sendData = await axiosConfigs({
        url: `/update_profes`,
        method: 'post',
        data: fs,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (sendData.data.verificar) {
        toast.success(`${sendData.data.mens}`);
        reset({
          courseName: '',
          courseCode: '',
          description: '',
          open: '',
          posGalery: '',
        });
        setImagen(null);
        setPreviImage(null);
        setLoad(false);
        mutate('getProfes');
        handleCloseM();
      } else {
        toast.error(`${sendData.data.mens}`);
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Hay un problema front`);
      setLoad(false);
    }
  };

  const getPerfil = async () => {
    try {
      const res = await AxiosConfigsToken.get('/obtener_roles');
      const data = res.data.data.docs;

      setPerfils(data);
    } catch (error) {}
  };

  const getImgUser = (e) => {
    const arrayImg = ['jpg', 'png', 'jpeg', 'JPG', 'PNG', 'JPEG'];
    const WIDTH = 300;

    if (e[0]) {
      const imgExtension = e[0].name.split('.')[e[0].name.split('.').length - 1];

      if (arrayImg.includes(imgExtension)) {
        const reader = new FileReader();
        reader.readAsDataURL(e[0]);
        reader.onload = (event) => {
          let img_url = event.target.result;
          //console.log(img_url)
          let image = document.createElement('img');
          image.src = img_url;
          image.onload = async (e) => {
            //COMENZANDO CON LA REDUCCION DEL TAMAÑO DEL IMAGEN
            let canvas = document.createElement('canvas');
            let ratio = WIDTH / e.target.width;
            canvas.width = WIDTH;
            canvas.height = e.target.height * ratio;
            //crear objeto canvas
            const context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            let new_img_url = context.canvas.toDataURL('image/png', 100); //obtencion del imagen en base64
            setPreviImage(new_img_url);
            console.log(new_img_url);

            //VOLVER A CONVERTIR LA IMAGEN EN FORMATO BLOB ES DECIR PASMOS DE "base64 ----> blob"
            const img_fetch = await fetch(`data:image/png;base64,${new_img_url.split(',')[1]}`);
            const img_convert_to_blob = await img_fetch.blob('image/png');

            setImagen(img_convert_to_blob);
            console.log(img_convert_to_blob);
          };
        };
      } else {
        setImagen(null);
      }
    } else {
      setImagen(null);
    }
  };

  React.useEffect(() => {
    getPerfil();
    setDefautValues(dataUp);
    //setPreviImage(dataUp.imagen1)
  }, []);

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
      <Button variant="text" onClick={handleOpenM} size="small">
        <Edit />
      </Button>
      <Modal
        open={openM}
        onClose={handleCloseM}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <Box sx={style}>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              marginBottom: 2,
              color: 'textColorTitle',
            }}
          >
            actualizar profesor
          </Typography>
          <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                {perfils ? (
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <FormControl sx={{ mb: 2, width: '95%' }}>
                      <InputLabel size="small" id="demo-simple-select-label">
                        Elige el perfil
                      </InputLabel>
                      <Select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Estado del curso"
                        defaultValue={dataUp.roles[0]?.name}
                        {...register('puesto', { required: true })}
                      >
                        {perfils.map((x) => (
                          <MenuItem value={x.name}>{x.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                ) : (
                  <></>
                )}

                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <FormControl sx={{ mb: 2, width: '95%' }}>
                    <TextField
                      size="small"
                      id="outlined-basic"
                      label="Nombre completo"
                      defaultValue={dataUp.nombre}
                      variant="outlined"
                      {...register('nombre', {
                        required: 'Campo requerido',
                        minLength: 1,
                      })}
                    />
                  </FormControl>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <FormControl sx={{ mb: 2, width: '95%' }}>
                    <TextField
                      size="small"
                      multiline
                      id="outlined-basic"
                      label="Estudios realizados"
                      defaultValue={dataUp.info}
                      variant="outlined"
                      {...register('info', {
                        required: 'Campo requerido',
                        minLength: 1,
                      })}
                    />
                  </FormControl>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <FormControl sx={{ mb: 2, width: '95%' }}>
                    <TextField
                      size="small"
                      id="outlined-basic"
                      label="Telefono"
                      defaultValue={dataUp.contact}
                      variant="outlined"
                      {...register('contact', {
                        required: 'Campo requerido',
                        minLength: 1,
                      })}
                    />
                  </FormControl>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <FormControl sx={{ mb: 2, width: '95%' }}>
                    <TextField
                      size="small"
                      id="outlined-basic"
                      label="Correo"
                      variant="outlined"
                      defaultValue={dataUp.email}
                      {...register('email', {
                        required: 'Campo requerido',
                        minLength: 1,
                      })}
                    />
                  </FormControl>
                </div>

                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <FormControl sx={{ mb: 2, width: '95%' }}>
                    <InputLabel size="small" id="demo-simple-select-label">
                      Elige el sexo
                    </InputLabel>
                    <Select
                      size="small"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Elige el sexo"
                      defaultValue={dataUp.sex}
                      {...register('sex', { required: true })}
                    >
                      <MenuItem value="Hombre">Hombre</MenuItem>
                      <MenuItem value="Mujer">Mujer</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <FormControl sx={{ mb: 2, width: '95%' }}>
                    <Button
                      component="label"
                      role={undefined}
                      variant="outlined"
                      tabIndex={-1}
                      startIcon={<CloudUpload />}
                    >
                      Elegir foto de perfil
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => getImgUser(e.target.files)}
                      />
                    </Button>
                  </FormControl>
                </div>

                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  
                  <FormControl sx={{ mb: 2, width: '40%' }}>
                    {previImage || dataUp.imagen1 ? (
                      <img src={previImage ? previImage : dataUp.imagen1} alt="" />
                    ) : (
                      <></>
                    )}
                  </FormControl>
                </div>

                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <FormControl sx={{ mb: 1, width: '95%' }}>
                    <LoadingButton
                      loading={load}
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{ width: '100%' }}
                      size="large"
                    >
                      <span>Registrar</span>
                    </LoadingButton>
                  </FormControl>
                </div>
              </Box>
            </form>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
