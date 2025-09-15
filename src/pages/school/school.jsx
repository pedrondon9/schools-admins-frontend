import * as React from 'react';
import AppContext from '../../contexts/ServiceContext';
import { Title } from '../../components/textTitle/title';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import FieldImageInput from '../../components/form_components/fieldImage';
import { DATA_USER } from '../../contexts/constantesVar';
const style = {
    //position: 'absolute',
    width: { xs: '100%', sm: '70%', md: '500px' },
    bgcolor: 'background.paper',
    pb: 4,
    pt: 4,
    overflowY: 'scroll',
    height: 'auto',
    marginTop: "30px",
    border: '2px solid rgb(63, 63, 63)',
    borderRadius: "8px"

};
export const Schools = () => {
    const { AxiosConfigsToken, typeUserSelected, editCourseId, getCourseId, courseCategory, getWithId, dataUser, dispatch } = React.useContext(AppContext);

    const [errorInit, setErrorInit] = React.useState(false);
    const [spinner, setSpinner] = React.useState(false);
    const [errorInitMessage, setErrorInitMessage] = React.useState('');
    const [arrayFiles, setArrayFiles] = React.useState('');
    const [schoolData, setSchoolData] = React.useState(null);
    const [viewForm, setViewForm] = React.useState(false);

    const [loading, setLoad] = React.useState(false); //estado para activar el spinner del boton submit

    const [previImageUsers, setPreviImageUsers] = React.useState(null);

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

        console.log('data', data, dataUser);


        if (false) {
            return
        }

        try {
            setLoad(true);
            const fs = new FormData();

            fs.append('arrayFiles', arrayFiles ? arrayFiles : schoolData?.logo);
            fs.append('name', data.name);
            fs.append('email', data.email);
            fs.append('phone', data.phone);
            fs.append('country', data.country);
            fs.append('city', data.city);
            fs.append('brief_description', data.brief_description);
            fs.append('address', data.address);
            fs.append('id', dataUser.loginId);
            fs.append('schoolId', dataUser?.schoolTenant ? dataUser?.schoolTenant : '');

            const sendData = await AxiosConfigsToken({
                url: dataUser.schoolId ? `/school/put` : `/school/post`,
                method: dataUser.schoolId ? 'put' : 'post',
                data: fs,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (sendData.data.success) {

                toast.success(`${sendData.data.message}`);

                let dataUsers = {
                    schoolId: sendData.data.response?._id,
                    schoolTenant: sendData.data.response?._id,
                    schoolName: sendData.data.response?.name,
                    schoolLogo: sendData.data.response?.logo,
                };

                window.localStorage.setItem('enableTAdmins', JSON.stringify({ ...dataUser, ...dataUsers }));

                setLoad(false);

                dispatch({
                    type: DATA_USER,
                    payload: dataUsers,
                });

                getSchool()

            } else {
                toast.error(`${sendData.data.message}`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoad(false);
        }


    };

    const getSchool = async () => {
        try {
            setSpinner(true)
            const response = await AxiosConfigsToken({
                url: `/school/get/${dataUser?.schoolTenant}`,
                method: 'get',
            });

            console.log('response', response.data.response?.docs?.[0]);
            if (response.data.success) {
                setSchoolData(response.data.response.docs[0]);
                setPreviImageUsers(response.data.response?.docs?.[0]?.logo);

            } else {
                setSchoolData(null);
            }
        } catch (error) {
            setSchoolData(null);
        } finally {
            setSpinner(false)

        }
    }


    React.useEffect(() => {
        getSchool()
    }, [])
    return (
        <div>
            <Title title="Registra o actualiza" />
            <Box
                sx={{
                    height: 'auto',
                    width: '100%',
                    marginBottom: '10px',
                    display: "flex",
                    justifyContent: "center"
                }}
            >

                <Box sx={style}>

                    {schoolData || viewForm ?
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
                                variant="h4"
                                component="h4"
                            >
                                Registra o actualiza
                            </Typography>


                            <Box sx={{ width: '95%', mt: 5 }}>
                                <FormControl fullWidth error={!!errors.name} sx={{ mb: 3, }}>
                                    <TextField
                                        name='name'
                                        size="large"
                                        defaultValue={schoolData?.name}
                                        type='text'
                                        id="outlined-basic"
                                        label="Nombre del centro"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true, // Mantiene el label arriba
                                        }}
                                        {...register('name', {
                                            required: false,
                                            minLength: 1,
                                        })}
                                    />
                                </FormControl>
                                <FormControl fullWidth error={!!errors.email} sx={{ mb: 3, }}>
                                    <TextField
                                        name='email'
                                        size="large"
                                        defaultValue={schoolData?.email}
                                        type='email'
                                        id="outlined-basic"
                                        label="Correo del centro"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true, // Mantiene el label arriba
                                        }}
                                        {...register('email', {
                                            required: false,
                                            minLength: 1,
                                        })}
                                    />
                                </FormControl>
                                <FormControl fullWidth error={!!errors.phone} sx={{ mb: 3, }}>
                                    <TextField
                                        name='phone'
                                        size="large"
                                        defaultValue={schoolData?.phone}
                                        type='text'
                                        id="outlined-basic"
                                        label="Telefono del centro"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true, // Mantiene el label arriba
                                        }}
                                        {...register('phone', {
                                            required: false,
                                            minLength: 1,
                                        })}
                                    />
                                </FormControl>
                                <FormControl fullWidth size="large" sx={{ mb: 3 }}>
                                    <InputLabel id="roles-label">Pais</InputLabel>
                                    <Controller
                                        name="country"
                                        control={control}
                                        rules={{ required: false }}
                                        defaultValue={schoolData?.country || ""}

                                        render={({ field }) => (
                                            <Select

                                                label={'Pais'}
                                                labelId="format-label"
                                                {...field}   // incluye value + onChange de RHF
                                            >
                                                <MenuItem value={'Guinea Ecuatorial'}>Guinea Ecuatorial</MenuItem>
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                                <FormControl fullWidth error={!!errors.city} sx={{ mb: 3, }}>
                                    <TextField
                                        name='city'
                                        size="large"
                                        defaultValue={schoolData?.city}
                                        type='text'
                                        id="outlined-basic"
                                        label="Ciudad"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true, // Mantiene el label arriba
                                        }}
                                        {...register('city', {
                                            required: false,
                                            minLength: 1,
                                        })}
                                    />
                                </FormControl>
                                <FormControl fullWidth error={!!errors.address} sx={{ mb: 3, }}>
                                    <TextField
                                        name='address'
                                        size="large"
                                        defaultValue={schoolData?.address}
                                        type='text'
                                        id="outlined-basic"
                                        label="Direccion"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true, // Mantiene el label arriba
                                        }}
                                        {...register('address', {
                                            required: false,
                                            minLength: 1,
                                        })}
                                    />
                                </FormControl>
                                <FormControl fullWidth error={!!errors.brief_description} sx={{ mb: 3, }}>

                                    <TextareaAutosize
                                        placeholder='Breve descripcion'
                                        name={'brief_description'}
                                        defaultValue={schoolData?.brief_description}

                                        style={{ width: '100%', padding: '8px', fontSize: '14px', marginBlock: '5px', height: '50px' }}
                                        {...register('brief_description', {
                                            required: false,
                                            minLength: 1,
                                        })}

                                    />
                                </FormControl>

                                <Controller
                                    name="imagen1"
                                    control={control}
                                    render={({ }) => (
                                        <FieldImageInput
                                            label={'Logo del usuario (opcional)'}
                                            onFileChange={(file) => {
                                                setArrayFiles(file);
                                            }}
                                        />
                                    )}
                                />

                                {!arrayFiles ?
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <FormControl sx={{ mt: 1, width: '20%', justifyItems: 'center' }} size="small">
                                            <img src={previImageUsers} alt="" />
                                        </FormControl></div> :
                                    <></>
                                }

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
                                    Registrar o actualizar
                                </LoadingButton>
                            </Box>

                        </form>
                        :
                        <></>
                    }

                    {!schoolData ?
                        <Button
                            sx={{ color: '#000000' }}

                            onClick={() => {
                                setViewForm(!viewForm)
                            }}
                        >
                            {!viewForm ? "Ver formulario" : "Ocultar formulario"}
                        </Button>
                        :
                        <></>
                    }




                </Box>


            </Box>
        </div>
    );
};