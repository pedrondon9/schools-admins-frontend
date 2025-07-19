import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form';
import axiosConfigs from '../axiosConfig';
import toast, { Toaster } from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { Add } from '@mui/icons-material';
import AppContext from '../../contexts/ServiceContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '70%', md: '500px' },
  bgcolor: '#e0e0e0', // 'background.paper',
  boxShadow: 24,
  pb: 4,
  pt: 4,
  overflow: 'auto',
};

export default function FormAdd() {
  const { userId, AxiosConfigsToken } = React.useContext(AppContext);

  const { mutate } = useSWRConfig();

  //habrir y cerrar el modal
  const [openM, setOpenM] = React.useState(false);
  const handleOpenM = () => setOpenM(true);
  const handleCloseM = () => setOpenM(false);
  /*********************************** */

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [tipo, setTipo] = React.useState('');
  const [load, setLoad] = React.useState(false); //estado para activar el spinner del boton submit

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
    data.userId = userId;
    data.nameAdminRegister = '';
    data.phoneAdminRegister = '';

    //console.log(data)

    try {
      setLoad(true);
      const sendData = await axiosConfigs({
        url: `/create_course`,
        method: 'post',
        data,
      });
      if (sendData.data.verificar) {
        toast.success(`${sendData.data.mens}`);
        reset({
          courseName: '',
          courseCode: '',
          description: '',
          open: '',
        });
        setLoad(false);
        mutate('getAdmin');
        handleCloseM();
      } else {
        toast.error(`${sendData.data.mens}`);
        setLoad(false);
      }
    } catch (error) {
      toast.success(`Hay un problema front`);
      setLoad(false);
    }
  };

  React.useEffect(() => {}, []);

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
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              marginBottom: 2,
              color: 'textColorTitle',
            }}
          >
            registrar curso
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
                      size="small"
                      id="outlined-basic"
                      label="Nombre del curso"
                      variant="outlined"
                      {...register('courseName', {
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
                  <FormControl sx={{ mb: 1, width: '95%' }}>
                    <TextField
                      size="small"
                      multiline
                      id="outlined-basic"
                      label="Descripcion del curso"
                      variant="outlined"
                      {...register('description', {
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
                  <FormControl sx={{ mb: 1, width: '95%' }}>
                    <TextField
                      size="small"
                      id="outlined-basic"
                      label="Codigo del curso"
                      variant="outlined"
                      {...register('courseCode', {
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
                  <FormControl sx={{ mb: 1, width: '95%' }}>
                    <InputLabel size="small" id="demo-simple-select-label">
                      Estado del curso
                    </InputLabel>
                    <Select
                      size="small"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Estado del curso"
                      {...register('open', { required: true })}
                      defaultValue=""
                      //onChange={handleChangeTipo}
                    >
                      <MenuItem value={'true'}>Abierto</MenuItem>
                      <MenuItem value={'false'}>Cerrado</MenuItem>
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
