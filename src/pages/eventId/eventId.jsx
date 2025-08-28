import * as React from 'react';
import { Box, Button, } from '@mui/material';
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

export default function EventId({ }) {
    const { AxiosConfigsToken, dataUser, dataEditUser, dispatch, editCourseId, getWithId, loadingEspecilitiesId, editEspecialitiesId,
        editEventId } = React.useContext(AppContext);
    const { id } = useParams();
    const navigate = useNavigate();

    let dataUserSelected = dataEditUser

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
    } = useForm()



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
            fs.append('contact', data.contact);
            fs.append('phone', data.phone);
            fs.append('posGalery', data.posGalery ? Number(data.posGalery) : 0);
            fs.append('email', data.email);
            fs.append('birthdate', data.birthdate);

            fs.append('info', data.info);
            fs.append('codeUser', data.codeUser);
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


    const getCourseIds = async (id) => {
        setLoadingCourseId(true)
        try {
            const response = await Get(AxiosConfigsToken, `course/get/${id}`);
            if (response.success) {
                console.log(response, 'response courseId');
                setCourseId(response.response?.docs[0])
                dispatch({
                    type: DATA_EDIT_COURSE,
                    payload: response.response?.docs[0]
                })

            } else {
                dispatch({
                    type: DATA_EDIT_COURSE,
                    payload: null
                })
            }
        } catch (error) {
            S
            dispatch({
                type: DATA_EDIT_COURSE,
                payload: null
            })
        } finally {
            setLoadingCourseId(false)
        }
    }





    React.useEffect(() => {
        //getEspecialitieseId(id)
        getWithId(`events/get/${id}`, 'events')
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
                <Button variant="contained" onClick={() => {
                    navigate(-1)
                }} size="small">
                    <ArrowBack />
                </Button>
            </Box>
            {editEventId ?
                <>
                    {/* Imagen del curso */}
                    <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: 'auto' }, width: { xs: "100%", }, mt: 2 }}>
                        <Box
                            component="img"
                            src={editEventId?.linkPhoto} // URL de la imagen
                            alt={editEventId.title}
                            sx={{
                                height: { xs: 150, sm: 200, md: 250 },
                                objectFit: "cover", // ajusta la imagen sin deformar
                                borderRadius: 1,    // esquinas redondeadas
                            }}
                        />
                    </Box>
                    <Box sx={{ mt: -2, mb: 4 }}>
                        <Title title={editEventId?.title} />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ width: { xs: '100%' } }}>
                            <div
                                style={{
                                    border: "1px solid #ccc",
                                    paddingInline: "10px",
                                    borderRadius: "8px",
                                    background: "#fafafa",
                                }}
                                dangerouslySetInnerHTML={{ __html: editEventId?.content }}
                            />
                        </Box>
                    </Box>


                    <NavTab id={id} courseId={editEventId} />
                </>
                :
                <SkeletonTable />
            }

        </Box>
    );
}