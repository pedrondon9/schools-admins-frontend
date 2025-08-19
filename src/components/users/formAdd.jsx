import * as React from 'react';
import { Box, Button, Modal } from '@mui/material';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Add } from '@mui/icons-material';
import AppContext from '../../contexts/ServiceContext';
import RegistreForm from '../form_components/form/RegistreForm';
import { Get } from './get';
import { mutate } from 'swr';


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

export default function FormAdd({ typeUserSelected }) {
  const { AxiosConfigsToken, dataUser } = React.useContext(AppContext);
  const [roles, setRoles] = React.useState([]);

  const [errorInit, setErrorInit] = React.useState(false);
  const [errorInitMessage, setErrorInitMessage] = React.useState('');
  const [arrayFiles, setArrayFiles] = React.useState('');

  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoad] = React.useState(false); //estado para activar el spinner del boton submit

  const [typeUser, setTypeUser] = React.useState('');
  const [previImage, setPreviImage] = React.useState(null);


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

    try {

      setLoad(true);
      const fs = new FormData();
      fs.append('fullname', data.fullname);
      fs.append('sex', data.sex);
      fs.append('dni', data.dni);
      fs.append('phone', data.phone);
      fs.append('posGalery', data.posGalery ? Number(data.posGalery) : 0);
      fs.append('email', data.email);
      fs.append('roles', data.roles);
      fs.append('isActive', true);
      fs.append('isVerified', true);
      fs.append('school', [dataUser.schoolTenant]);
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
        reset()
        mutate(`users/get/typeUser`)
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


          {
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
