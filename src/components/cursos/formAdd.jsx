import * as React from 'react';
import { Box, Button, Modal } from '@mui/material';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Add } from '@mui/icons-material';
import AppContext from '../../contexts/ServiceContext';
import RegistreForm from '../form_components/form/RegistreForm';
import { Get } from './get';
import { mutate } from 'swr';
import { COURSE_CATEGORY } from '../../contexts/constantesVar';


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
  height: '600px',
  borderRadius: '4px',
};

export default function FormAdd({ typeUserSelected }) {
  const { AxiosConfigsToken, dataUser,dispatch } = React.useContext(AppContext);
  const [categories, setCategories] = React.useState([]);

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
    setLoad(true);
    if (false) {
      return
    }
    try {
      const fs = new FormData();

      fs.append('arrayFiles', arrayFiles ? arrayFiles:'');
      fs.append('title', data.title);
      fs.append('category', data.category);
      fs.append('startDate', data.startDate);
      fs.append('endDate', data.endDate);
      fs.append('price', data.price);
      fs.append('format', data.format);

      const sendData = await AxiosConfigsToken({
        url: `/course/post`,
        method: 'post',
        data:fs,
        headers: { 'Content-Type': 'multipart/form-data' },

      });
      if (sendData.data.success) {
        toast.success(`${sendData.data.message}`);
        reset()
        await mutate(`course/get`)
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


  const GetSelect = async () => {
    try {
      const response = await Get(AxiosConfigsToken, `categories/get`);
      console.log(response)
      if (response.success) {
        setCategories(response?.response)
        dispatch({
          type: COURSE_CATEGORY,
          payload: response?.response
        })

      } else {
        setCategories([])
        dispatch({
          type: COURSE_CATEGORY,
          payload: null
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
    }
  }


  const fieldCreateUsers = [
    {
      name: 'title',
      label: 'Titulo del curso',
      type: 'text',
      validation: { required: true },
      startIcon: null,
    },
    {
      name: 'category',
      label: 'Elige la categoria del curso',
      type: 'select',
      validation: { required: 'Selecciona una categoria' },
      options: categories?.map((opt) => ({
        label: opt.name,
        value: opt._id
      }))
    },
    {
      name: 'startDate',
      label: 'Fecha de inicio',
      type: 'date',
      validation: { required: true },
      startIcon: null,
    },
    {
      name: 'endDate',
      label: 'Fecha a',
      type: 'date',
      validation: { required: true },
      startIcon: null,
    },
    
    {
      name: 'price',
      label: 'Precio del curso',
      type: 'Number',
      validation: { required: true },
      startIcon: null
    },
    {
      name: 'format',
      label: 'Elige el formato',
      type: 'select',
      validation: { required: 'Selecciona el formato' },
      options: [
        {
          label: 'online',
          value: 'online'
        },
        {
          label: 'presencial',
          value: 'presencial'
        },
        {
          label: 'mixto',
          value: 'mixto'
        }
      ]
    },
    {
      name: 'imagen1',
      label: 'El logo del centro',
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
    GetSelect()
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
              text='Crear curso'

            />
          }
        </Box>






      </Modal>
    </Box>
  );
}
