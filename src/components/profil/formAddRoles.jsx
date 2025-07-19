import * as React from 'react';

import FormControl from '@mui/material/FormControl';
import { Alert, Box, Button, Grid, Modal, Snackbar, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Add } from '@mui/icons-material';
import { useSWRConfig } from 'swr';
import toast, { Toaster } from 'react-hot-toast';
import AppContext from '../../contexts/ServiceContext';
import { useForm } from 'react-hook-form';
import { GetRoles } from './getRoles';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '70%', md: '500px' },
  bgcolor: 'background.paper',
  boxShadow: 24,
  pb: 4,
  pt: 4,
};

export default function FormAddRoles() {
  const { AxiosConfigsToken, userId, typeUser } = React.useContext(AppContext);

  const { mutate } = useSWRConfig();

  //habrir y cerrar el modal
  const [openM, setOpenM] = React.useState(false);
  const handleOpenM = () => setOpenM(true);
  const handleCloseM = () => setOpenM(false);
  /*********************************** */

  /*activar el spinner del botton submit******/
  const [load, setLoad] = React.useState(false); //estado para activar el spinner del boton submit
  /*********************************** */

  /* abrir , cerrar y mensage de alerta *****/
  const [snackMessage, setsnackMessage] = React.useState(''); //mensage del alerta
  const [pefils, setPerfils] = React.useState(''); //mensage del alerta
  const [open, setOpen] = React.useState(false); //abrir el alerta
  const [alertType, setAlertType] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  /********************************** */

  const getRole = async () => {
    try {
      const res = await GetRoles(AxiosConfigsToken);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(getRole(), 'adddd');

  //el useForm de react form hook
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  //para enviar datos en el servidor
  const onSubmit = async (data) => {
    data.userId = userId;

    try {
      setLoad(true);
      const sendData = await AxiosConfigsToken({
        url: `/crear_roles`,
        method: 'post',
        data,
      });
      if (sendData.data.verificar) {
        setLoad(false);
        mutate('getRoles');
        toast.success(`${sendData.data.mens}`);
        setAlertType(true);
        handleClick();
        handleCloseM();
      } else {
        setLoad(false);
        toast.error(`${sendData.data.mens}`);
        setAlertType(false);
        handleClick();
      }
    } catch (error) {
      setLoad(false);
      toast.error('Hay un problema 1 !');

      setAlertType(false);
      handleClick();
    }
  };

  React.useEffect(() => {}, []);

  return (
    <>
      <Box
        sx={{
          height: 'auto',
          width: '100%',
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        {/* botton para abrir el modal */}
        <Button variant="contained" onClick={handleOpenM} size="small">
          <Add />
        </Button>
        {/* modal que contiene el formulario */}
        <Modal
          open={openM}
          onClose={handleCloseM}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
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
              Agregar perfil
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
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <FormControl sx={{ mb: 1, width: '95%' }}>
                      <TextField
                        id="outlined-basic"
                        label="Perfil"
                        variant="outlined"
                        {...register('role', {
                          required: 'Campo requerido',
                          minLength: 1,
                        })}
                        error={!!errors?.role}
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
                    <FormControl sx={{ mb: 1, width: '95%' }}>
                      <TextField
                        id="outlined-basic"
                        label="Descripcion del perfil"
                        variant="outlined"
                        size="medium"
                        {...register('description', {
                          required: 'Campo requerido',
                        })}
                        error={!!errors?.description}
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
    </>
  );
}
