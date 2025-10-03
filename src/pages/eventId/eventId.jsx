import * as React from 'react';
import { Box, Button, Toolbar } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Add, ArrowBack } from '@mui/icons-material';
import AppContext from '../../contexts/ServiceContext';
import { Get } from '../../components/users/get';

import { DATA_EDIT_COURSE, DATA_EDIT_USER } from '../../contexts/constantesVar';
import { useNavigate, useParams } from 'react-router-dom';
import { Title } from '../../components/textTitle/title';
import SkeletonTable from '../../components/skelholder/skelethonTable';
import NavTab from '../../components/eventos/navTab/navTab';

const style = {
  width: { xs: '100%', sm: '70%', md: '80%' },
  bgcolor: 'background.paper',
  //boxShadow: 24,
  pb: 4,
  pt: 4,
  height: 'auto',
};

export default function EventId({}) {
  const {
    AxiosConfigsToken,
    dataUser,
    dataEditUser,
    dispatch,
    editCourseId,
    getWithId,
    loadingEspecilitiesId,
    editEspecialitiesId,
    editEventId,
  } = React.useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  let dataUserSelected = dataEditUser;

  const [courseId, setCourseId] = React.useState(null);
  const [loadingCourseId, setLoadingCourseId] = React.useState(false);

  const [errorInit, setErrorInit] = React.useState(false);
  const [errorInitMessage, setErrorInitMessage] = React.useState('');
  const [userTypeSelected, setUserTypeSelected] = React.useState('');
  const [arrayFiles, setArrayFiles] = React.useState('');

  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoad] = React.useState(false); //estado para activar el spinner del boton submit

  const [typeUser, setTypeUser] = React.useState('');
  const [previImage, setPreviImage] = React.useState(null);
  const [previImageUsers, setPreviImageUsers] = React.useState(null);
  const [imagen, setImagen] = React.useState(null);

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

  React.useEffect(() => {
    //getEspecialitieseId(id)
    getWithId(`events/get/${id}`, 'events');
  }, []);

  return (
    <div style={{ maxWidth: "1200px", margin: "auto" }}>
      <Toolbar />

    <Box
      sx={{
        height: 'auto',
        width: '100%',
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          height: 'auto',
          width: '100%',
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            navigate(-1);
          }}
          size="small"
        >
          <ArrowBack />
        </Button>
      </Box>
      {editEventId ? (
        <>
          <NavTab id={id} courseId={editEventId} />
        </>
      ) : (
        <SkeletonTable />
      )}
    </Box>
    </div>
  );
}
