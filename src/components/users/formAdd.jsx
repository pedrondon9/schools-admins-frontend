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
import { Add, CloudUpload, UploadFile, UploadSharp } from '@mui/icons-material';
import AppContext from '../../contexts/ServiceContext';
import RegistreForm from '../form_components/form/RegistreForm';
import { fieldCreate } from '../form_components/arrayFields';
import { NavLink } from 'react-router-dom';
import RegistreForm2 from '../form_components/form/RegistreForm2';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

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

export default function FormAdd() {
  const { userId, AxiosConfigsToken } = React.useContext(AppContext);

  const [errorInit, setErrorInit] = React.useState(false);
  const [errorInitMessage, setErrorInitMessage] = React.useState('');
  const [arrayFiles, setArrayFiles] = React.useState('');

  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoads] = React.useState(false); //estado para activar el spinner del boton submit
  const [load, setLoad] = React.useState(false); //estado para activar el spinner del boton submit


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
    //setImagen(null)
    //setPreviImage(null)
  };
  /*********************************** */

  const theme = useTheme();
  const [perfils, setPerfils] = React.useState('');
  const [previImage, setPreviImage] = React.useState(null);
  const [imagen, setImagen] = React.useState(null);
  const [active, setActive] = React.useState(false);

  //el useForm de react form hook
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  //para enviar datos en el servidor
  const onSubmit = async (data) => {
    for (let x in perfils) {
      if (perfils[x].name === data.puesto) {
        data.roles = [perfils[x]._id];
      }
    }

    console.log(data);

    if (data.password == data.password1) {
      try {
        setLoad(true);
        const fs = new FormData();
        fs.append('imagen1', imagen);
        fs.append('puesto', data.puesto);
        fs.append('sex', data.sex);
        fs.append('educacion', data.educacion);
        fs.append('contact', data.contact);
        fs.append('posGalery', data.posGalery);
        fs.append('email', data.email);
        fs.append('nombre', data.nombre);
        fs.append('username', data.username);
        fs.append('password', data.password);
        fs.append('active', active);
        fs.append('userId', userId);
        fs.append('nameAdminRegister', '');
        fs.append('phoneAdminRegister', '');
        fs.append('roles', data.roles);
        fs.append('tipo', '');

        const sendData = await axiosConfigs({
          url: `/create_admin`,
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
          mutate('getAdminn');
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
    } else {
      toast.error(`La contrasena no coinside`);
    }
  };

  const getPerfil = async () => {
    try {
      const res = await AxiosConfigsToken.get('/obtener_roles');
      const data = res.data.data.docs;

      setPerfils(data);
    } catch (error) { }
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
    //setImagen(null)
    //setPreviImage(null)
  }, []);

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
      <Button variant="contained"  onClick={handleOpenM} size="small">
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
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              marginBottom: 2,
              color: 'textColorTitle',
            }}
          >
            Registrar usuario
          </Typography>
          
          {
            <RegistreForm2
              onSubmit={onSubmit}
              setArrayFiles={setArrayFiles}
              handleSubmit={handleSubmit}
              register={register}
              errors={errors}
              fields={fieldCreate}
              showPassword={showPassword}
              togglePasswordVisibility={() => setShowPassword(!showPassword)}
              errorInit={errorInit}
              errorInitMessage={errorInitMessage}
              loading={loading}
              buttonLabel="Registrar tu institución"
              imageUrl=""
              imageAlt="Global2a"
              linkUrl=""
              linkText=""
            />
            }          
        </Box>


        

      
        
      </Modal>
    </Box>
  );
}
