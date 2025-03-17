import React, { useState, useContext, useEffect } from 'react'
import { Grid, Tab, Tabs, Box, InputAdornment, TextField, Autocomplete, Typography, FormControl, InputLabel, Select, MenuItem, Button, Card, CardContent } from '@mui/material';
import { LoadingButton, TabContext, TabPanel } from '@mui/lab';
import AppContext from '../../../contexts/ServiceContext';
import { useForm } from 'react-hook-form';
import { AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { jsPDF } from "jspdf";
import LinearProgress from '@mui/material/LinearProgress';
import { useSWRConfig } from 'swr';
import { Comisiones } from './comisiones';
import CardStadoSaldo from '../../cardStadoSaldo';
import { TITLEPAGE, M2U, MCMPART2, MTN, YOOMEE, SERVICIOS_INTOUCH, SERVICIOS_INTOUCH_CAMERUN, SERVICIOS_INTOUCH_GABON, SERVICIOS_INTOUCH_RCA, SERVICIOS_INTOUCH_CONGO, SERVICIOS_INTOUCH_CI, SERVICIOS_INTOUCH_SENEGAL } from '../../../contexts/constantesVar';


function FormEnviarInternINTOUCH() {
    const { typeUser, valideLogin, userId, userName, userCode, userPhone, dispatch, acciones, porcentage, AxiosConfigsToken } = useContext(AppContext)
    const { mutate } = useSWRConfig()

    const [serviciosSelect, setServiciosSelect] = useState([]);
    const [operador, setOperador] = useState('');
    const [cargaEnvio2, setCargaEnvio2] = useState(false);
    const [load, setLoad] = useState(false);
    const [nameSend, setNameSend] = useState('');
    const [nameSendBB, setNameSendBB] = useState(true);
    const [phoneSend, setPhoneSend] = useState('');
    const [phoneSendBB, setPhoneSendBB] = useState(true);
    const [llaveSecreta, setLlaveSecreta] = useState('')
    const [llaveSecretaB, setLlaveSecretaB] = useState(true)
    const [quantSend, setQuantSend] = useState('');
    const [quantSendBB, setQuantSendBB] = useState(true);
    const [dipSend, setDipSend] = useState('');
    const [dipSendBB, setDipSendBB] = useState(true);
    const [phoneRecep, setPhoneRecep] = useState('');
    const [phoneRecepBB, setPhoneRecepBB] = useState(true);
    const [adressRecep, setAdressRecep] = useState('');
    const [servicio, setServicio] = useState('');
    const [servicioOperador, setServicioOperador] = useState('');
    const [servicioB, setServicioB] = useState(true);
    const [adressRecepBB, setAdressRecepBB] = useState(true);
    const [nameRecep, setNameRecep] = useState('');
    const [nameRecepBB, setNameRecepBB] = useState(true);
    const [numberSearch1, setNumberSearch1] = useState('');
    const [numberSearch1BB, setNumberSearch1BB] = useState(true);
    const [numberSearch2, setNumberSearch2] = useState('');
    const [numberSearch2BB, setNumberSearch2BB] = useState(true);
    const [totalCobrar, setTotalCobrar] = useState(0);
    const [totalPagar, setTotalPagar] = useState(0);
    const [totalComision, setTotalComision] = useState(0);




    const doc = new jsPDF("p", "pt", "b6");

    const GenerarPdf = async () => {
        //console.log("first")
        var content = document.querySelector("#facturaSend")
        await doc.html(content, {
            callback: (pdf) => {
                pdf.save("factura.pdf")
            }
        });
    }

    //el useForm de react form hook
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors }
    } = useForm();

    //Funcion que se llama despues dpulsar el boton submit
    const HacerEnvio = async () => {
        let data = {}

        data.idAdmin = userId
        data.phoneAdmin = userPhone
        data.nameAdmin = userName
        data.adressRecep = adressRecep
        data.nameSend = nameSend
        data.phoneSend = numberSearch1
        data.dipSend = dipSend
        data.quantSend = quantSend
        data.phoneRecep = numberSearch2
        data.nameRecep = nameRecep
        data.llave = llaveSecreta
        data.services = "INTOUCH"
        data.servicioId = servicio
        data.typeUser = typeUser
        data.operador = servicioOperador

        const phoneCode1 = numberSearch1.slice(0, 3) === "222" || numberSearch1.slice(0, 3) === "333" || numberSearch1.slice(0, 3) === "555" || numberSearch1.slice(0, 3) === "551" || numberSearch1.slice(0, 3) === "666" || numberSearch1.slice(0, 3) === "550"
        const phoneLengNumber1 = numberSearch1.length === 9 && Number(numberSearch1)
        const phoneLengNumber2 = Number(numberSearch2)
        const quantLengNumber = quantSend.length >= 3 && Number(quantSend)  


        const validar = data.servicioId && data.nameRecep && data.phoneRecep && quantLengNumber && data.dipSend && data.phoneSend && data.nameSend && data.adressRecep && data.nameAdmin && data.phoneAdmin && data.idAdmin && llaveSecreta

        if (true) {
            if (validar && phoneCode1 && phoneLengNumber1 && phoneLengNumber2) {


                confirmAlert({
                    customUI: ({ onClose }) => {
                        return (
    
                            <div className='container-dialog-confirm' >
                                <div id='' >
                                    <Typography sx={{ color: "textColorTitle", textAlign: "center" }} variant='h3'>
                                        Porfavor revisa !
                                    </Typography>
                                    <p><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }} >Nombre del remitente:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}> {nameSend}</span></p>
                                    <p><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }} >Telefono del remitente:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}> {numberSearch1}</span></p>
                                    <p><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }} >DIP/Pasaporte del remitente:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}> {dipSend}</span></p>
                                    <p><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }} >Cantidad enviado:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}> {Number(quantSend).toLocaleString("es-GQ")} XAF</span></p>
                                    <p><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }} >Pais del receptor:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}> {adressRecep}</span></p>
                                    <p><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }} >Operador seleccionado:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}> {servicioOperador}</span></p>
                                    <p><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }} >Nombre del receptor:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}> {nameRecep}</span></p>
                                    <p><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }} >Telefono del receptor:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}> {numberSearch2}</span></p>
                                </div>
                                <div className='container-dialog-confirm-button'>
                                    <Button size='small' variant="contained" className='btn-small cancell-button' onClick={onClose}>Cancelar</Button>
                                    <Button
                                        size='small'
                                        variant="contained"
                                        sx={{ marginLeft: 3 }}
                                        onClick={async () => {
    
                                            onClose()
    
                                            try {
                                                setLoad(true)
                                                const envio = await AxiosConfigsToken({ url: `/enviarINTOUCH`, method: "post", data })
    
    
                                                if (envio.data.verificar) {
    
                                                    setLoad(false)
    
                                                    mutate(["getDataHomeCajaStado", userId])
    
                                                    confirmAlert({
                                                        customUI: ({ onClose }) => {
                                                            const mes = Number(new Date(envio.data.result.fechaA).getMonth()) + 1;
                                                            const dia = Number(new Date(envio.data.result.fechaA).getDate());
                                                            const agno = Number(new Date(envio.data.result.fechaA).getFullYear());
                                                            const hora = new Date(envio.data.result.fechaA).getHours();
                                                            const min = new Date(envio.data.result.fechaA).getMinutes();
    
                                                            const datos = envio.data.result
    
                                                            const fecha = dia + '/' + mes + '/' + agno + '  ' + hora + ':' + min;
                                                            return (
    
                                                                <div className='container-dialog-confirm' >
                                                                <div id='facturaSend' style={{ marginLeft: 10, marginTop: 0 }} >
                                                                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", width: "100%", marginBottom: 10 }}>
                                                                        <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: -20 }}>
                                                                            <img
                                                                                src={'https://res.cloudinary.com/mumbex/image/upload/v1713776354/fajifknettbou2p6liii.png'}
                                                                                alt={"global2a"}
                                                                                loading="lazy"
                                                                                style={{}}
                                                                                width={140}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <h3 style={{ marginBlock: -5 }}>FACTURA DE ENVIO INTERN.</h3>
                                                                    <p style={{ marginBlock: 0.5 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Fecha de envio:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{fecha}</span></p>
                                                                    <p style={{ marginBlock: 0.5 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Ciudad de envio:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{datos.adressAdmin}</span></p>
                                                                    <p style={{ marginBlock: 0.5 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Punto de envio:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{datos.adressGettoSend}</span></p>
                                                                    <p style={{ marginBlock: 0.5 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Tel.. del Agente:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{datos.phoneAdmin}</span></p>
                                                                    <h4 style={{ marginBlock: -6, marginTop: 3, color: '#000000' }}>DATOS DEL REMITENTE</h4>
                                        
                                                                    <p style={{ marginBlock: 0.5 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Nombre del remitente:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{datos.nameSend}</span></p>
                                                                    <p style={{ marginBlock: 0.5 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Tel. del remitente:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{datos.phoneSend}</span></p>
                                                                    <p style={{ marginBlock: 0.5 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>DIP/Pass del remitente:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{datos.dipSend}</span></p>
                                                                    <p style={{ marginBlock: 0.5 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Cantidad enviada:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{Number(datos.quantSend).toLocaleString("es-GQ")} XAF</span></p>
                                                                    <h4 style={{ marginBlock: -6, marginTop: 3, color: '#000000' }}>DATOS DEL BENEFICIARIO</h4>
                                        
                                                                    <p style={{ marginBlock: 0.5 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Ciudad de recepcion:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{datos.adressRecep}</span></p>
                                                                    <p style={{ marginBlock: 0.5 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Nombre del receptor:</span> <span style={{ fontWeight: "700", fontSize: 12 }}>{datos.nameRecep}</span></p>
                                                                    <p style={{ marginBlock: 0.5 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Tel. del receptor:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{datos.phoneRecep}</span></p>
                                                                    <p style={{ marginBlock: 0.5 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Codigo de recepcion:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{datos.codeRecp}</span></p>
                                                                </div>
                                                                <div style={{ marginLeft: 10, marginTop: 10 }} >
                                        
                                                                    <Button
                                                                        size='small'
                                                                        variant="contained"
                                                                        color='error'
                                                                        onClick={onClose}>Cerrar</Button>
                                                                    <Button
                                                                        size='small'
                                                                        variant="contained"
                                                                        sx={{ marginLeft: 3 }}
                                                                        onClick={async () => {
                                                                            GenerarPdf()
                                                                        }}
                                                                    >
                                                                        Descargar pdf
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            );
                                                        },
    
                                                    });
                                                    setAdressRecep(``)
                                                    setNameSend(``)
                                                    setPhoneSend(``)
                                                    setDipSend(``)
                                                    setQuantSend(``)
                                                    setPhoneRecep(``)
                                                    setNameRecep(``)
                                                    setLlaveSecreta('')
                                                    setNumberSearch1('')
                                                    setNumberSearch2('')
                                                    setServicioOperador('')
                                                    setServicio('')
                                                    //setEnviosBuscados([])
                                                    toast.success(`${envio.data.mens}`)
    
                                                } else {
                                                    setLoad(false)
                                                    toast.error(`${envio.data.mens}`)
    
                                                }
    
                                            } catch (error) {
                                                setLoad(false)
                                                toast.error(`Hay un problema`)
    
                                            }
    
                                        }}
                                    >
                                        Realizar el envio
                                    </Button>
                                </div>
                            </div>
                        );
                    },
    
                });
    
            } else {
                if (!servicio) {
                    setServicioB(false)
                } else {
                    setServicioB(true)
                }
                if (!dipSend) {
                    setDipSendBB(false)
                } else {
                    setDipSendBB(true)
                }
                if (!nameRecep) {
                    setNameRecepBB(false)
                } else {
                    setNameRecepBB(true)
                }
                if (!nameSend) {
                    setNameSendBB(false)
                } else {
                    setNameSendBB(true)
                }
                if (!llaveSecreta) {
                    setLlaveSecretaB(false)
                } else {
                    setLlaveSecretaB(true)
                }
                if (!((phoneLengNumber1) && (phoneCode1))) {
    
                    setNumberSearch1BB(false)
                } else {
                    setNumberSearch1BB(true)
                }
                if (!((phoneLengNumber2))) {
                    setNumberSearch2BB(false)
                } else {
                    setNumberSearch2BB(true)
                }
                if (!quantLengNumber) {
                    setQuantSendBB(false)
                } else {
                    setQuantSendBB(true)
                }
                if (!adressRecep) {
                    setAdressRecepBB(false)
                } else {
                    setAdressRecepBB(true)
                }
    
    
            }
        }else{
            setLoad(false)
            toast.error(`Prueba mas tarde trabajamos en ello`)
        }



    }



    const LimpiarForm = () => {
        setNumberSearch1('')
        setNumberSearch2('')
        setPhoneRecep('')
        setNameRecep('')
        setNameSend('')
        setPhoneSend('')
        setAdressRecep('')
        setDipSend('')
        setLlaveSecreta('')
        setServicioOperador('')
        setTotalCobrar(0)
        setTotalComision(0)
        setTotalPagar(0)
        setServicio('')

    }
    const SearchOffice = async (servicio) => {
        console.log(servicio)
        //setAdressRecep(servicio.pais)
        setServicio(servicio.servicio)
        setOperador(servicio.operador)
        setServicioOperador(servicio.operador + ' ' + '(' + servicio.tipo + ')')

    }


    useEffect(() => {

        if (JSON.parse(window.localStorage.getItem("enableTAdmins"))) {
        } else {
            window.localStorage.setItem("enableTAdmins", JSON.stringify({ valor: false, valorI: "", nameI: '', typeI: '', phoneI: '' }))
        }
        dispatch({
            type: TITLEPAGE,
            payload: "Enviar a nivel internacional"
        })
    }, [])
    return (
        <>
            {valideLogin ?
                <>

                    <form style={{ marginTop: "20px" }}>
                        <Grid
                            spacing={1}
                            bgcolor="backgroundColorPage"

                            container
                        >

                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}  >
                                <Box>
                                    <Typography sx={{ color: "textColorTitle", textAlign: "center", marginTop: { xs: "12px", sm: "12px", xl: "0px" } }} variant='h5'>
                                        Datos del remitente
                                    </Typography>
                                </Box>
                                <div style={{ width: '100%', marginTop: 15, display: 'none' }}>
                                    <FormControl sx={{ width: "100%" }}>
                                        <InputLabel id="demo-simple-select-label-ser">Elige el servicio</InputLabel>
                                        <Select
                                            id="demo-simple-select-adress-ser"
                                            label="Elige el servicio"
                                            //{...register("adressRecep", { required: true })}
                                            //error={!!errors?.adressRecep}
                                            onChange={(e) => { setServicio(e.target.value) }}
                                            value={servicio}
                                            error={servicioB ? false : true}
                                        >
                                            <MenuItem value={MCMPART2} >Orange money</MenuItem>
                                            <MenuItem value={MTN} >MTN money</MenuItem>
                                            <MenuItem value={YOOMEE} >Yoomee Money</MenuItem>
                                            <MenuItem value={M2U} >M2U</MenuItem>

                                        </Select>
                                    </FormControl>
                                </div>
                                <div style={{ width: '100%', marginTop: 15 }}>
                                    <TextField
                                        label="Telefono del remitente"
                                        id="outlined-size-small"
                                        size="medium"
                                        value={numberSearch1}
                                        onChange={(e) => { setNumberSearch1(e.target.value) }}
                                        sx={{ width: "100%" }}
                                        //{...register("phoneSend", { required: "Campo requerido", minLength: 9, maxLength: 9 })}
                                        //error={!!errors?.phoneSend}
                                        error={numberSearch1BB ? false : true}
                                    />

                                </div>
                                <div style={{ width: '100%', marginTop: 15 }}>
                                    <TextField
                                        label="Nombre del remitente"
                                        id="outlined-size-small-name-s"
                                        size="medium"
                                        sx={{ width: "100%" }}
                                        value={nameSend}
                                        onChange={(e) => { setNameSend(e.target.value) }}

                                        //{...register("nameSend", { required: "Campo requerido", minLength: 4 })}
                                        //error = {!!errors?.nameSend}
                                        error={nameSendBB ? false : true}

                                    />
                                </div>

                                <div style={{ width: '100%', marginTop: 15 }}>
                                    <TextField
                                        label="El DIP/Pasaporte del remitente"
                                        id="outlined-size-small"
                                        size="medium"
                                        value={dipSend}
                                        onChange={(e) => { setDipSend(e.target.value) }}
                                        sx={{ width: "100%" }}
                                        //{...register("dipSend", { required: "Campo requerido", minLength: 4 })}
                                        //error={!!errors?.dipSend}
                                        error={dipSendBB ? false : true}


                                    />
                                </div>
                                <div style={{ width: '100%', marginTop: 15 }}>
                                    <TextField
                                        label="El monto a enviar"
                                        id="outlined-size-small"
                                        size="medium"
                                        value={quantSend}
                                        onChange={(e) => {
                                            if (Number(e.target.value)) {
                                                setQuantSend(e.target.value);

                                            } else {
                                                setQuantSend("");
                                            }
                                        }}
                                        sx={{ width: "100%" }}
                                        //{...register("quantSend", { required: "Campo requerido", minLength: 1, min: 1000 })}
                                        error={quantSendBB ? false : true}

                                    />
                                </div>




                            </Grid>
                            <Grid item xs={12} sm={12} md={6} xl={6}  >
                                <Box>
                                    <Typography sx={{ color: "textColorTitle", textAlign: "center", marginTop: { xs: "12px", sm: "12px", xl: "0px" } }} variant='h5'>
                                        Datos del beneficiario
                                    </Typography>
                                </Box>


                                <div style={{ width: '100%', marginTop: 15 }}>
                                    <TextField
                                        label="Telefono del beneficiario"
                                        id="outlined-size-small"
                                        size="medium"
                                        value={numberSearch2}
                                        onChange={(e) => { setNumberSearch2(e.target.value) }}
                                        sx={{ width: "100%" }}
                                        //{...register("phoneSend", { required: "Campo requerido", minLength: 9, maxLength: 9 })}
                                        //error={!!errors?.phoneSend}
                                        error={numberSearch2BB ? false : true}

                                    />

                                </div>
                                <div style={{ width: '100%', marginTop: 15 }}>
                                    <TextField
                                        label="Nombre del beneficiario"
                                        id="outlined-size-small"
                                        onChange={(e) => { setNameRecep(e.target.value) }}
                                        value={nameRecep}
                                        size="medium"
                                        sx={{ width: "100%" }}
                                        //{...register("nameRecep", { required: "Campo requerido", minLength: 4 })}
                                        //error={!!errors?.nameRecep}
                                        error={nameRecepBB ? false : true}


                                    />
                                </div>

                                <div style={{ width: '100%', marginTop: 15 }}>
                                    <FormControl sx={{ width: "100%" }}>
                                        <InputLabel id="demo-simple-select-label-d">Pais del receptor</InputLabel>
                                        <Select
                                            id="demo-simple-select-adress-r"
                                            label="Ciudad del receptor"
                                            //{...register("adressRecep", { required: true })}
                                            //error={!!errors?.adressRecep}
                                            onChange={(e) => {
                                                setServiciosSelect([])
                                                setAdressRecep(e.target.value)
                                                setOperador('')
                                                setServicio('')
                                                if (e.target.value === 'Camerun') {
                                                    setServiciosSelect(SERVICIOS_INTOUCH_CAMERUN)
                                                }
                                                if (e.target.value === 'Gabon') {
                                                    setServiciosSelect(SERVICIOS_INTOUCH_GABON)
                                                }
                                                if (e.target.value === 'Republica_Centroafricana') {
                                                    setServiciosSelect(SERVICIOS_INTOUCH_RCA)
                                                }
                                                if (e.target.value === 'Republica_del_Congo') {
                                                    setServiciosSelect(SERVICIOS_INTOUCH_CONGO)
                                                }
                                                if (e.target.value === 'Chad') {
                                                    setServiciosSelect(SERVICIOS_INTOUCH_CONGO)
                                                }
                                                if (e.target.value === 'Costa_de_Marfil') {
                                                    setServiciosSelect(SERVICIOS_INTOUCH_CI)
                                                }
                                                if (e.target.value === 'Senegal') {
                                                    setServiciosSelect(SERVICIOS_INTOUCH_SENEGAL)
                                                }
                                                if (e.target.value === 'Mali') {
                                                    //setServiciosSelect(SERVICIOS_INTOUCH_SENEGAL)
                                                }
                                            }}
                                            value={adressRecep}
                                            error={adressRecepBB ? false : true}
                                        >

                                            <MenuItem value="Camerun" > Camerún</MenuItem>
                                            <MenuItem value="Gabon" >Gabon</MenuItem>
                                            <MenuItem value="Ruanda" >Ruanda</MenuItem>
                                            <MenuItem value="Senegal" >Senegal</MenuItem>
                                            <MenuItem value="Costa_de_Marfil" >Costa de Marfil</MenuItem>
                                            <MenuItem value="Republica_Centroafricana" > República Centroafricana</MenuItem>
                                            <MenuItem value="Chad" >Chad</MenuItem>
                                            <MenuItem value="Mali" >Mali</MenuItem>
                                            <MenuItem value="RDC" >República D. del Congo (RDC)</MenuItem>
                                            <MenuItem value="Republica_del_Congo" >República del Congo</MenuItem>
                                            <MenuItem value="Santo_Tome_y_Principe" > Santo Tomé y Príncipe</MenuItem>
                                            <MenuItem value="Burundi" > Burundi</MenuItem>
                                            <MenuItem value="Ruanda" > Ruanda</MenuItem>

                                        </Select>

                                    </FormControl>
                                </div>

                                {false ?
                                    <div style={{ width: '100%', marginTop: 15, display: "none" }}>
                                        <FormControl
                                            sx={{ width: "100%" }}

                                        >
                                            <Autocomplete

                                                //  { servicio: "CM_CASHIN_MOOV_GIMAC_TD", pais: 'Chad', tipo: 'Movil', operador: 'MOOV MONEY' },

                                                id="country-select-demo"
                                                sx={{ width: '100%' }}
                                                options={serviciosSelect}
                                                autoHighlight
                                                getOptionLabel={(option) => option.operador}
                                                onChange={(e, v) => { SearchOffice(v) }}
                                                renderOption={(props, option) => (
                                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                        {option.pais} {option.operador} ({option.tipo})
                                                    </Box>
                                                )}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        sx={{ width: "100%" }}
                                                        label="Pais del beneficiario y servicio"
                                                        inputProps={{
                                                            ...params.inputProps,
                                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                                        }}
                                                    />
                                                )}
                                            />
                                        </FormControl>

                                    </div>
                                    :
                                    <></>

                                }

                                {adressRecep ?
                                    <div style={{ width: '100%', marginTop: 15 }}>
                                        <FormControl sx={{ width: "100%" }}>
                                            <InputLabel id="demo-simple-select-label-d">Selecciona el servicio</InputLabel>
                                            <Select
                                                id="demo-simple-select-adress-r"
                                                label="Selecciona el servicio"
                                                //{...register("adressRecep", { required: true })}
                                                //error={!!errors?.adressRecep}
                                                onChange={(e) => {
                                                    //console.log(serviciosSelect[Number(e.target.value)])
                                                    for (let x in serviciosSelect) {

                                                        if (serviciosSelect[x].operador === e.target.value) {
                                                            SearchOffice(serviciosSelect[x])
                                                        }
                                        
                                                    }

                                                }}
                                                value={operador}
                                                error={servicioB ? false : true}
                                            >
                                                {serviciosSelect.map((x, y) =>
                                                    <MenuItem value={x.operador} >{x.operador}</MenuItem>
                                                )}

                                            </Select>

                                        </FormControl>
                                    </div>
                                    :
                                    <></>
                                }


                               


                                <div style={{ width: '100%', marginTop: 15, display: "none" }}>
                                    <TextField
                                        label="Operador seleccionado"
                                        id="outlined-size-small"
                                        value={servicioOperador}
                                        size="medium"
                                        sx={{ width: "100%" }}
                                    //{...register("nameRecep", { required: "Campo requerido", minLength: 4 })}
                                    //error={!!errors?.nameRecep}
                                    //error={servicioOperador ? false : true}

                                    />
                                </div>
                                <Card sx={{ width: "100%", marginTop: 1, backgroundColor: '#e0e0e0', display: 'none' }}>
                                    <CardContent>
                                        <div style={{ fontSize: 14, display: "flex", flexDirection: "row", alignItems: "center" }}>
                                            <Typography color="text.secondary" >
                                                Total a cobrar:
                                            </Typography>
                                            <Typography color="#212121" sx={{ marginLeft: 0.5 }} variant='h5' >
                                                {Number(totalPagar).toLocaleString("es-GQ")} XAF
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div style={{ width: "100%", marginTop: 15 }}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Llave secreta"
                                        variant="outlined"
                                        value={llaveSecreta}
                                        sx={{ width: "100%" }}
                                        //{...register("llave", { required: "Campo requerido", minLength: 1 })}
                                        onChange={(e) => { setLlaveSecreta(e.target.value) }}
                                        error={llaveSecretaB ? false : true}
                                    />
                                </div>

                            </Grid>
                            <Grid item xs={12} sm={12} sx={{}} >
                                <Box sx={{ width: { sm: '100%', md: '100%', lg: '100%' }, display: 'flex', flexDirection: 'row', marginBottom: 2, justifyContent: 'center' }}>
                                    <div style={{ width: '50%', marginTop: 20, justifyContent: 'space-around', display: 'none' }}>
                                        <Button
                                            onClick={() => { LimpiarForm() }}

                                            variant="contained"
                                            color="error"
                                            sx={{ width: "99%", marginRight: 1 }}
                                            size="large"
                                        >
                                            Cancelar
                                        </Button>
                                    </div>
                                    <div style={{ width: '100%', marginTop: 20, justifyContent: 'space-around', display: 'flex' }}>
                                        <LoadingButton
                                            onClick={() => HacerEnvio()}
                                            loading={load}
                                            variant="contained"
                                            //color="success"
                                            sx={{ width: "100%" }}
                                            size="large"
                                        >
                                            <span>Enviar</span>
                                        </LoadingButton>

                                    </div>
                                </Box>

                            </Grid>
                        </Grid>
                    </form>
                </>
                :
                <></>
            }

        </>
    )
}


export default FormEnviarInternINTOUCH