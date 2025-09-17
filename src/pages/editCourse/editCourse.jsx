import * as React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
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
import {
  Add,
  ArrowBack,
  AssignmentReturned,
  AssignmentReturnSharp,
  Edit,
  KeyboardReturnOutlined,
} from '@mui/icons-material';
import AppContext from '../../contexts/ServiceContext';
import RegistreForm from '../../components/form_components/form/RegistreForm';
import { Get } from '../../components/users/get';
import { mutate } from 'swr';
import FormImage from '../../components/form_components/FormImage';
import FieldImageInput from '../../components/form_components/fieldImage';
import FormAlert from '../../components/form_components/FormAlert';
import { LoadingButton } from '@mui/lab';
import { DATA_EDIT_COURSE, DATA_EDIT_USER } from '../../contexts/constantesVar';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Title } from '../../components/textTitle/title';
import SkeletonTable from '../../components/skelholder/skelethonTable';
import NavTab from '../../components/cursos/navTab/navTab';

const style = {
  width: { xs: '100%', sm: '70%', md: '80%' },
  bgcolor: 'background.paper',
  //boxShadow: 24,
  pb: 4,
  pt: 4,
  height: 'auto',
};

export default function EditCourse({}) {
  const {
    AxiosConfigsToken,
    dataUser,
    dataEditUser,
    dispatch,
    editCourseId,
    getCourseId,
    getWithId,
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
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    //setImagen(null)
    //setPreviImage(null)
    //getCourseId(id)
    getWithId(`course/get/${id}`, 'course');
    setPreviImageUsers(dataUserSelected?.linkPhoto);
  }, []);

  return (
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
      {editCourseId ? (
        <>
          <NavTab id={id} courseId={editCourseId} />
        </>
      ) : (
        <Box sx={{ marginTop: '20px' }}>
          <SkeletonTable />
        </Box>
      )}
    </Box>
  );
}
