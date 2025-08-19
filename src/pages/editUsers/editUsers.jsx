import * as React from 'react';
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Add, ArrowBack, AssignmentReturned, AssignmentReturnSharp, Edit, KeyboardReturnOutlined } from '@mui/icons-material';
import AppContext from '../../contexts/ServiceContext';
import RegistreForm from '../../components/form_components/form/RegistreForm';
import { Get } from '../../components/users/get';
import { mutate } from 'swr';
import FormImage from '../../components/form_components/FormImage';
import FieldImageInput from '../../components/form_components/fieldImage';
import FormAlert from '../../components/form_components/FormAlert';
import { LoadingButton } from '@mui/lab';
import { DATA_EDIT_USER } from '../../contexts/constantesVar';
import { NavLink } from 'react-router-dom';


const style = {
    width: { xs: '100%', sm: '70%', md: '800px' },
    bgcolor: 'background.paper',
    //boxShadow: 24,
    pb: 4,
    pt: 4,
    height: 'auto',

};

export default function EditUsers({ }) {
    const { AxiosConfigsToken, dataUser, dataEditUser } = React.useContext(AppContext);
    let dataUserSelected = dataEditUser
    const [roles, setRoles] = React.useState([]);

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

    let typerUsers = watch()



    //para enviar datos en el servidor
    const onSubmit = async (data) => {

        console.log(data,'data')
        console.log(dataUserSelected,'dataSelected')
        console.log(arrayFiles,'files')
        console.log(data.roles?[data.roles]:[dataUserSelected.role._id],'roles')

        if (false) {
            return
        }

        try {
            setLoad(true);
            const fs = new FormData();
            fs.append('arrayFiles', arrayFiles?arrayFiles:dataUserSelected?.linkPhoto);
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
            fs.append('roles', data.roles?[data.roles]:[dataUserSelected.role._id]);
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
            defaultValue: "example@gmail.com",

        },
        {
            name: 'email',
            label: 'Correo ',
            type: 'email',
            validation: { required: true },
            startIcon: null,
            defaultValue: "example@gmail.com",

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
                    label: 'hombre',
                    value: 'hombre'
                },
                {
                    label: 'mujer',
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
            name: 'codeUser',
            label: 'Crea el codigo del estudiante',
            type: 'number',
            validation: { required: true },
            startIcon: null
        },
        {
            name: 'info',
            label: 'Breve descripcion del usuario',
            type: 'textarea',
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

        console.log(roleSelected)

        setTypeUser(roleSelected)
        setUserTypeSelected(roleSelected[0].name)

    }


    React.useEffect(() => {
        //setImagen(null)
        //setPreviImage(null)
        getRoles()
        setPreviImageUsers(dataUserSelected.linkPhoto)
    }, []);

    React.useEffect(() => {
        if (typerUsers?.roles) {
            onChangeTypeUser(typerUsers.roles)
            console.log(typerUsers.roles)
        }
        setUserTypeSelected(dataUserSelected.role.name)


    }, [typerUsers?.roles]);

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
                <Button variant="contained" to='/edit_users' component={NavLink} size="small">
                    <ArrowBack />
                </Button>
            </Box>

            <Box
                sx={{
                    height: 'auto',
                    width: '100%',
                    marginBottom: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                <Box sx={style}>

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
                            variant="h6"
                            component="h6"
                        >
                            Actulizar {dataUserSelected?.fullname}
                        </Typography>


                        <Box sx={{ width: '95%', mt: 2 }}>
                            <FormControl fullWidth error={!!errors.fullname} sx={{ mb: 2, }}>
                                <TextField
                                    name='fullname'
                                    size="small"
                                    defaultValue={dataUserSelected.fullname}
                                    type='text'
                                    id="outlined-basic"
                                    label="Nombre completo"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true, // Mantiene el label arriba
                                      }}
                                    {...register('fullname', {
                                        required: false,
                                        minLength: 1,
                                    })}
                                />
                            </FormControl>
                            <FormControl error={!!errors.email} fullWidth sx={{ mb: 2, }}>
                                <TextField
                                    name='email'
                                    defaultValue={dataUserSelected.email}
                                    type='email'
                                    size="small"
                                    id="outlined-basic"
                                    InputLabelProps={{
                                        shrink: true, // Mantiene el label arriba
                                      }}
                                    label="Correo"
                                    variant="outlined"
                                    {...register('email', {
                                        required: false,
                                        minLength: 1,
                                    })}
                                />
                            </FormControl>
                            <FormControl error={!!errors.phone} fullWidth sx={{ mb: 2, }}>
                                <TextField
                                    name='phone'
                                    defaultValue={dataUserSelected.phone}
                                    type='phone'
                                    size="small"
                                    id="outlined-basic"
                                    label="Telefono"
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

                            <FormControl error={!!errors.dni} fullWidth sx={{ mb: 2, }}>
                                <TextField
                                    name='dni'
                                    defaultValue={dataUserSelected.dni}
                                    type='text'
                                    size="small"
                                    id="outlined-basic"
                                    label="DNI o pasaporte"
                                    InputLabelProps={{
                                        shrink: true, // Mantiene el label arriba
                                      }}
                                    variant="outlined"
                                    {...register('dni', {
                                        required: 'Campo requerido',
                                        minLength: 1,
                                    })}
                                />
                            </FormControl>


                            <FormControl error={!!errors.birthdate} fullWidth sx={{ mb: 2, }}>
                                <TextField
                                    name='birthdate'
                                    defaultValue={new Date(dataUserSelected.birthdate).toISOString().split("T")[0]}
                                    InputLabelProps={{
                                        shrink: true, // Mantiene el label arriba
                                      }}
                                    type='date'
                                    size="small"
                                    id="outlined-basic"
                                    label="Fecha de nacimiento"
                                    variant="outlined"
                                    {...register('birthdate', {
                                        required: 'Campo requerido',
                                        minLength: 1,
                                    })}
                                />
                            </FormControl>

                            <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                                <InputLabel id="roles-label">Tipo de usuario</InputLabel>
                                <Controller
                                    name="roles"
                                    control={control}
                                    rules={{ required: false }}

                                    render={({ field }) => (
                                        <Select
                                            defaultValue={dataUserSelected.role._id}

                                            label={'Tipo de usuario'}
                                            labelId="roles-label"
                                            {...field}   // incluye value + onChange de RHF
                                        >

                                            {roles.map((opt) => (
                                                <MenuItem key={opt._id} value={opt._id}>
                                                    {opt.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </FormControl>


                            {userTypeSelected === 'admin' ?
                                <FormControl error={!!errors.posGalery} fullWidth sx={{ mt: 2, }}>
                                    <TextField
                                        name='posGalery'
                                        defaultValue={dataUserSelected.posGalery}
                                        type='number'
                                        size="small"
                                        id="outlined-basic"
                                        InputLabelProps={{
                                            shrink: true, // Mantiene el label arriba
                                          }}
                                        label="Posicion en la galeria"
                                        variant="outlined"
                                        {...register('posGalery', {
                                            required: false,
                                            minLength: 1,
                                        })}
                                    />
                                </FormControl>
                                :
                                <></>
                            }
                            <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                                <InputLabel id="roles-label">Genero del usuario</InputLabel>
                                <Controller
                                    name="sex"
                                    control={control}
                                    rules={{ required: false }}
                                    render={({ field }) => (
                                        <Select
                                            defaultValue={dataUserSelected.sex}
                                            label={'Genero del usuario'}
                                            labelId="roles-label"
                                            {...field}   // incluye value + onChange de RHF

                                        >
                                            <MenuItem key={'hombre'} value={'hombre'}>
                                                Hombre
                                            </MenuItem>
                                            <MenuItem key={'mujer'} value={'mujer'}>
                                                Mujer
                                            </MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                            <FormControl fullWidth error={!!errors.info} sx={{ mt: 2,mb:2 }}>

                                <TextareaAutosize
                                    defaultValue={dataUserSelected.info}

                                    name={'info'} placeholder={''}
                                    style={{ width: '100%', padding: '8px', fontSize: '14px', marginBlock: '5px', height: '50px' }}
                                    {...register('info', { required: false })}

                                />
                            </FormControl>

                            <Controller
                                name="imagen1"
                                control={control}
                                render={({ }) => (
                                    <FieldImageInput
                                        label={'Foto del usuario'}
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
                                    </FormControl></div> : <></>}
                            {errorInit && (
                                <Box sx={{ width: '95%', mt: 2 }}>
                                    <FormAlert message={errorInitMessage} />
                                </Box>
                            )}

                            <Box sx={{ width: '95%', mt: 2 }}>
                                <LoadingButton
                                    loading={loading}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                    size="small"
                                >
                                    Actualizar
                                </LoadingButton>
                            </Box>
                        </Box>




                    </form>
                </Box>
            </Box>


        </Box>
    );
}
