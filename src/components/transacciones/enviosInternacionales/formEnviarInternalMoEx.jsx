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
import { TITLEPAGE, M2U, MCMPART2, MTN, YOOMEE, paises } from '../../../contexts/constantesVar';
import { set } from 'date-fns';


function FormEnviarInternMoEx() {

    const { typeUser, valideLogin, userId, userName, userCode, userPhone, dispatch, acciones, porcentage, AxiosConfigsToken, monedaValor,    ObtenervalorMoneda,
    } = useContext(AppContext)
    const { mutate } = useSWRConfig()

    const [enviosBuscados, setEnviosBuscados] = useState([]);
    const [cargaEnvio, setCargaEnvio] = useState(false);
    const [cargaEnvio2, setCargaEnvio2] = useState(false);
    const [load, setLoad] = useState(false);
    const [nameSend, setNameSend] = useState('');
    const [nameSendBB, setNameSendBB] = useState(true);
    const [phoneSend, setPhoneSend] = useState('');
    const [phoneSendBB, setPhoneSendBB] = useState(true);

    const [quantSend, setQuantSend] = useState('');
    const [quantSendBB, setQuantSendBB] = useState(true);
    const [dipSend, setDipSend] = useState('');
    const [dipSendBB, setDipSendBB] = useState(true);
    const [phoneRecep, setPhoneRecep] = useState('');
    const [phoneRecepBB, setPhoneRecepBB] = useState(true);
    const [adressRecep, setAdressRecep] = useState('');
    const [servicio, setServicio] = useState('');
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





    const [receiver, setReceiver] = useState('')
    const [receiverB, setReceiverB] = useState(true)
    const [receiverAddress, setReceiverAddress] = useState('')
    const [receiverAddressB, setReceiverAddressB] = useState(true)
    const [receiverCity, setReceiverCity] = useState('')
    const [receiverCityB, setReceiverCityB] = useState(true)
    const [receiverPhone, setReceiverPhone] = useState('')
    const [receiverPhoneB, setReceiverPhoneB] = useState(true)
    const [receiverCountry, setReceiverCountry] = useState('')
    const [receiverCountryB, setReceiverCountryB] = useState(true)


    const [llaveSecreta, setLlaveSecreta] = useState('')
    const [llaveSecretaB, setLlaveSecretaB] = useState(true)

    const [senderIdDocumentNumber, setSenderIdDocumentNumber] = useState('')
    const [senderIdDocumentNumberB, setSenderIdDocumentNumberB] = useState(true)
    const [senderLastName, setSenderLastName] = useState('')
    const [senderLastNameB, setSenderLastNameB] = useState(true)
    const [senderName, setSenderName] = useState('')
    const [senderNameB, setSenderNameB] = useState(true)

    const [selectTransfType, setSelectTransfType] = useState("")
    const [selectTransfTypeB, setSelectTransfTypeB] = useState(true)
    const [bankAddres, setBankAddres] = useState('')
    const [bankAddresB, setBankAddresB] = useState(true)
    const [bankAccount, setBankAccount] = useState('')
    const [bankAccountB, setBankAccountB] = useState(true)
    const [bankName, setBankName] = useState('')
    const [bankNameB, setBankNameB] = useState(true)

    const [paymentBranchName, setPaymentBranchName] = useState('')
    const [paymentBranchNameB, setPaymentBranchNameB] = useState(true)
    const [paymentBranchAddress, setPaymentBranchAddress] = useState('')
    const [paymentBranchAddressB, setPaymentBranchAddressB] = useState(true)
    const [paymentBranchPhone, setPaymentBranchPhone] = useState('')
    const [paymentBranchPhoneB, setPaymentBranchPhoneB] = useState(true)
    const [paymentBranchId, setPaymentBranchId] = useState('')
    const [paymentBranchIdB, setPaymentBranchIdB] = useState(true)

    const [arrayOffices, setArrayOffices] = useState([])
    const [spinnerCity, setSpinnerCity] = useState(false)

    const [spinnerCalculadora, setSpinnerCalculadora] = useState(false)
    const [amountToPay, setAmountToPay] = useState('')
    const [amountToPayB, setAmountToPayB] = useState(true)
    const [amountSend, setAmountSend] = useState('')
    const [amountSendB, setAmountSendB] = useState(true)
    const [amountXAF, setAmountXAF] = useState('')
    const [amountXAFB, setAmountXAFB] = useState(true)
    const [currencySend, setCurrencySend] = useState('EUR')
    const [currencySendB, setCurrencySendB] = useState('EUR')
    const [currencyToPay, setCurrencyToPay] = useState(0)
    const [currencyToPayB, setCurrencyToPayB] = useState(true)

  



    const handleChangeAutoComplete = (value) => {
        //setAdressRecep(`${value.adressRecep}`)
        setNameSend(`${value.nameSend}`)
        setPhoneSend(`${value.phoneSend}`)
        setDipSend(`${value.dipSend}`)
        //setQuantSend(`${value.quantSend}`)

    }

    const handleChangeAutoComplete02 = (value) => {
        //setQuantSend(`${value.quantSend}`)
        setPhoneRecep(`${value.phoneSend}`)
        setNameRecep(`${value.nameSend}`)
    }


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

    /*********************************************************************************************** */

    //obtener las oficinas disponible en un pais determinado 
    const SearchOffice = async (pais) => {
        const country = pais.code3
        setCurrencyToPay(pais.moneda)
        setAmountSend('')
        setAmountToPay('')

        setSpinnerCity(true)
        try {
            setReceiverCountry(country)
            setArrayOffices([])
            const office = await AxiosConfigsToken({ url: `/me/getActiveBranchesMoEx/${country}`, method: "get" })

            if (office.data.verificar) {

                setSpinnerCity(false)
                setArrayOffices(office.data.data)

            } else {
                setArrayOffices([])

            }
        } catch (error) {
            setSpinnerCity(false)
            setArrayOffices([])


        }

    }

    const CalculadoraMoEx = async (amount) => {
        setAmountToPay(amount)
        setSpinnerCalculadora(true)
        try {
            const calcular = await AxiosConfigsToken({
                url: `me/calculator`, method: "post", data: {
                    "destinationCountry": receiverCountry,
                    "currencyToPay": currencyToPay,
                    "currencySend": "EUR",
                    "amountToPay": amount
                }
            })
            if (calcular.data.verificar) {
                console.log(calcular.data.data)
                setAmountSend(calcular.data.data.output.AmountSent.$value)
                setAmountToPay(calcular.data.data.output.AmountToPay.$value)
                setSpinnerCalculadora(false)

            } else {
                setSpinnerCalculadora(false)

            }

        } catch (error) {
            setSpinnerCalculadora(false)

        }
    }

    const DataOffice = (office) => {
        setPaymentBranchId(office.Id.$value)
        setPaymentBranchPhone(office.Phone.$value)
        setPaymentBranchAddress(office.Address.$value)
        setPaymentBranchName(office.CityName.$value)

    }

    const Enviar = async () => {

        setSenderNameB(true)
        setSenderLastNameB(true)
        setSenderIdDocumentNumberB(true)
        setReceiverB(true)
        setReceiverAddressB(true)
        setReceiverCityB(true)
        setReceiverPhoneB(true)
        setBankAccountB(true)
        setBankNameB(true)
        setBankAddresB(true)
        setPaymentBranchId(true)
        setPaymentBranchNameB(true)
        setPaymentBranchAddressB(true)
        setPaymentBranchPhoneB(true)
        setAmountToPayB(true)
        setCurrencyToPayB(true)
        setCurrencySendB(true)
        setAmountSendB(true)
        setAmountXAFB(true)
        setSelectTransfTypeB(true)
        setLlaveSecretaB(true)

        try {
            const verificar = selectTransfType && senderName && senderLastName && senderIdDocumentNumber && receiver && receiverAddress && receiverCity && receiverCountry && receiverPhone && amountToPay && amountSend && currencySend && currencyToPay && paymentBranchAddress && paymentBranchId && paymentBranchPhone && paymentBranchName

            const bankDeposit = selectTransfType === 'bank' ? true : false

            const verificarBank = bankDeposit === true ? bankName && bankAddres : true

            if (verificar && verificarBank && llaveSecreta) {


                confirmAlert({
                    customUI: ({ onClose }) => {
                        return (

                            <div className='container-dialog-confirm' >
                                <div id='' >
                                    <Typography sx={{ color: "textColorTitle", textAlign: "center" }} variant='h5'>
                                        Porfavor revisa !
                                    </Typography>
                                    <p><span style={{ fontSize: 16, color: "#616161" }}>Nombre del remitente:</span> <span style={{ fontWeight: "700", fontSize: 16 }}> {senderName}</span></p>

                                    <p><span style={{ fontSize: 16, color: "#616161" }}>DIP/Pasaporte del remitente:</span> <span style={{ fontWeight: "700", fontSize: 16 }}> {senderIdDocumentNumber}</span></p>

                                    <p><span style={{ fontSize: 16, color: "#616161" }}>Cantidad enviado EN XAF:</span> <span style={{ fontWeight: "700", fontSize: 16 }}> {Number(amountSend).toLocaleString("es-GQ")} XAF</span></p>

                                    <p><span style={{ fontSize: 16, color: "#616161" }}>Cantidad enviado en {currencyToPay}:</span> <span style={{ fontWeight: "700", fontSize: 16 }}> {Number(amountToPay).toLocaleString("es-GQ")} {currencyToPay}</span></p>

                                    <p><span style={{ fontSize: 16, color: "#616161" }}>Cantidad enviado en {currencySend}:</span> <span style={{ fontWeight: "700", fontSize: 16 }}> {Number(amountSend).toLocaleString("es-GQ")} {currencySend}</span></p>

                                    <p><span style={{ fontSize: 16, color: "#616161" }}>Pais del receptor:</span> <span style={{ fontWeight: "700", fontSize: 16 }}> {receiverCountry}</span></p>

                                    <p><span style={{ fontSize: 16, color: "#616161" }}>Ciudad del receptor:</span> <span style={{ fontWeight: "700", fontSize: 16 }}> {receiverCity}</span></p>
                                    <p><span style={{ fontSize: 16, color: "#616161" }}>Nombre del receptor:</span> <span style={{ fontWeight: "700", fontSize: 16 }}> {receiver}</span></p>
                                    <p><span style={{ fontSize: 16, color: "#616161" }}>Telefono del receptor:</span> <span style={{ fontWeight: "700", fontSize: 16 }}> {receiverPhone}</span></p>

                                    {selectTransfType === 'bank' ?
                                        <>
                                            <p><span style={{ fontSize: 16, color: "#616161" }}>Nombre del banco:</span> <span style={{ fontWeight: "700", fontSize: 16 }}> {bankName}</span></p>
                                            <p><span style={{ fontSize: 16, color: "#616161" }}>Direccion del banco:</span> <span style={{ fontWeight: "700", fontSize: 16 }}> {bankAddres}</span></p>
                                            <p><span style={{ fontSize: 16, color: "#616161" }}>Numero de cuenta:</span> <span style={{ fontWeight: "700", fontSize: 16 }}> {bankAccount}</span></p>
                                        </>
                                        :
                                        <>
                                            <p><span style={{ fontSize: 16, color: "#616161" }}>Tipo de envio</span> <span style={{ fontWeight: "700", fontSize: 16 }}>Normal (No bancaria)</span></p>
                                        </>
                                    }


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
                                                const envio = await AxiosConfigsToken({
                                                    url: `/me/addTransaction`, method: "post", data: {
                                                        "senderName": senderName,
                                                        "senderLastName": senderLastName,
                                                        "senderIdDocumentNumber": senderIdDocumentNumber,
                                                        "receiver": receiver,
                                                        "receiverAddress": receiverAddress,
                                                        "receiverCity": receiverCity,
                                                        "receiverCountry": receiverCountry,
                                                        "receiverPhone": receiverPhone,
                                                        "bankDeposit": bankDeposit,
                                                        "bankName": bankName,
                                                        "bankAccount": bankAccount,
                                                        "bankAddres": bankAddres,
                                                        "amountToPay": amountToPay,
                                                        "currencyToPay": currencyToPay,
                                                        "amountSend": amountSend,
                                                        "currencySend": currencySend,
                                                        "paymentBranchName": paymentBranchName,
                                                        "paymentBranchAddress": paymentBranchAddress,
                                                        "paymentBranchPhone": paymentBranchPhone,
                                                        "paymentBranchId": paymentBranchId,
                                                        "idAdmin": userId,
                                                        "llave": llaveSecreta
                                                    }
                                                })


                                                if (envio.data.verificar) {

                                                    setLoad(false)

                                                    mutate(["getDataHomeCajaStado", userId])

                                                    confirmAlert({
                                                        customUI: ({ onClose }) => {
                                                            const envioData = envio.data.data.output
                                                            const mes = Number(new Date(envioData.TransactionDate.$value).getMonth()) + 1;
                                                            const dia = Number(new Date(envioData.TransactionDate.$value).getDate());
                                                            const agno = Number(new Date(envioData.TransactionDate.$value).getFullYear());
                                                            const hora = new Date(envioData.TransactionDate.$value).getHours();
                                                            const min = new Date(envioData.TransactionDate.$value).getMinutes();

                                                            const fecha = dia + '/' + mes + '/' + agno + '  ' + hora + ':' + min;
                                                            return (
                                                                <div className='container-dialog-confirm' >

                                                                    <div id='facturaSend' style={{ marginLeft: 10, marginTop: 0 }} >

                                                                        <h3 style={{ marginBlock: -7 }}>FACTURA DE ENVIO MoEx</h3>

                                                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Fecha de envio:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{fecha}</span></p>
                                                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>El Id del envio:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{envioData.TransactionId.$value}</span></p>
                                                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Referencia del envio:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{envioData.Reference.$value}</span></p>

                                                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Oficina de pago:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{envioData.PaymentBranchName.$value}</span></p>

                                                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Oficina de pago tel.:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>
                                                                            {envioData.PaymentBranchPhone.$value}</span></p>

                                                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Oficina de pago direc.:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>
                                                                            {envioData.PaymentBranchAddress.$value}</span></p>
                                                                        <h4 style={{ marginBlock: -6, marginTop: 3, color: '#000000' }}>DATOS DEL REMITENTE</h4>

                                                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Nombre del remitente:</span> <span style={{ fontWeight: "700", fontSize: 14, color: '#000000' }}>
                                                                            {envioData.Sender.$value}</span></p>

                                                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>DIP/Pass del remitente:</span> <span style={{ fontWeight: "700", fontSize: 14, color: '#000000' }}>
                                                                            {envioData.SenderIdDocumentNumber.$value}</span></p>
                                                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Cantidad enviada de XAF:</span> <span style={{ fontWeight: "700", fontSize: 14, color: '#000000' }}>
                                                                            {(Number(envioData.AmountSent.$value) * Number(monedaValor)).toLocaleString("es-GQ")} XAF</span></p>
                                                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Cantidad enviada de {envioData.CurrencySent.$value}:</span> <span style={{ fontWeight: "700", fontSize: 14, color: '#000000' }}>
                                                                            {Number(envioData.AmountSent.$value).toLocaleString("es-GQ")} {envioData.CurrencySent.$value}</span></p>
                                                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Cantidad enviada de {envioData.CurrencyToPay.$value}:</span> <span style={{ fontWeight: "700", fontSize: 14, color: '#000000' }}>
                                                                            {Number(envioData.AmountToPay.$value).toLocaleString("es-GQ")} {envioData.CurrencyToPay.$value}</span></p>
                                                                        <h4 style={{ marginBlock: -6, marginTop: 3, color: '#000000' }}>DATOS DEL BENEFICIARIO</h4>
                                                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Pais del receptor:</span> <span style={{ fontWeight: "700", fontSize: 14, color: '#000000' }}>
                                                                            {envioData.ReceiverCountry.$value}</span></p>
                                                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Ciudad de recepcion:</span> <span style={{ fontWeight: "700", fontSize: 14, color: '#000000' }}>
                                                                            {envioData.ReceiverCity.$value}</span></p>
                                                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Nombre del receptor:</span> <span style={{ fontWeight: "700", fontSize: 14, color: '#000000' }}>
                                                                            {envioData.Receiver.$value}</span></p>
                                                                        <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Tel. del receptor:</span> <span style={{ fontWeight: "700", fontSize: 14, color: '#000000' }}>{envioData.ReceiverPhone.$value}</span></p>

                                                                        {envioData.BankDeposit.$value ?
                                                                            <>

                                                                                <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Nombre del banco:</span> <span style={{ fontWeight: "700", fontSize: 14, color: '#000000' }}>{envioData.BankName.$value}</span></p>


                                                                                <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Numero de cuenta:</span> <span style={{ fontWeight: "700", fontSize: 14, color: '#000000' }}>{envioData.BankAccount.$value}</span></p>

                                                                                <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Direccion de cuenta:</span> <span style={{ fontWeight: "700", fontSize: 14, color: '#000000' }}>{envioData.BankAddress.$value}</span></p>


                                                                            </>
                                                                            :
                                                                            <>
                                                                                <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Tipo de transacion:</span> <span style={{ fontWeight: "700", fontSize: 14, color: '#000000' }}>Transaccion normal (No bancaria)</span></p>
                                                                            </>
                                                                        }

                                                                    </div>

                                                                    <div style={{ marginLeft: 10 }} >

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

                                                    setAmountToPay(``)
                                                    setAmountSend(``)
                                                    setSenderName(``)
                                                    setSenderIdDocumentNumber(``)
                                                    setSenderLastName(``)
                                                    setReceiver(``)
                                                    setReceiverCity(``)
                                                    setReceiverCountry('')
                                                    setReceiverAddress('')
                                                    setReceiverPhone('')
                                                    setBankAccount('')
                                                    setBankAddres('')
                                                    setSelectTransfType('')
                                                    setPaymentBranchId('')
                                                    setPaymentBranchName('')
                                                    setPaymentBranchPhone('')

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
                                        Proceder
                                    </Button>
                                </div>
                            </div>
                        );
                    },

                });
            } else {
                if (!senderName) {
                    setSenderNameB(false)
                } else {
                    setSenderNameB(true)
                }
                if (!senderLastName) {
                    setSenderLastNameB(false)
                } else {
                    setSenderLastNameB(true)
                }
                if (!senderIdDocumentNumber) {
                    setSenderIdDocumentNumberB(false)
                } else {
                    setSenderIdDocumentNumberB(true)
                }
                if (!receiver) {
                    setReceiverB(false)
                } else {
                    setReceiverB(true)
                }
                if (!receiverAddress) {
                    setReceiverAddressB(false)
                } else {
                    setReceiverAddressB(true)
                }
                if (!receiverCity) {
                    setReceiverCityB(false)
                } else {
                    setReceiverCityB(true)
                }

                if (!receiverPhone) {
                    setReceiverPhoneB(false)
                } else {
                    setReceiverPhoneB(true)
                }
                if (!bankAccount) {
                    setBankAccountB(false)
                } else {
                    setBankAccountB(true)
                }
                if (!bankName) {
                    setBankNameB(false)
                } else {
                    setBankNameB(true)
                }
                if (!bankAddres) {
                    setBankAddresB(false)
                } else {
                    setBankAddresB(true)
                }

                if (!paymentBranchId) {
                    setPaymentBranchId(false)
                } else {
                    setPaymentBranchId(true)
                }
                if (!paymentBranchName) {
                    setPaymentBranchNameB(false)
                } else {
                    setPaymentBranchNameB(true)
                }
                if (!paymentBranchAddress) {
                    setPaymentBranchAddressB(false)
                } else {
                    setPaymentBranchAddressB(true)
                }
                if (!paymentBranchPhone) {
                    setPaymentBranchPhoneB(false)
                } else {
                    setPaymentBranchPhoneB(true)
                }
                if (!amountToPay) {
                    setAmountToPayB(false)
                } else {
                    setAmountToPayB(true)
                }
                if (!currencyToPay) {
                    setCurrencyToPayB(false)
                } else {
                    setCurrencyToPayB(true)
                }
                if (!currencySend) {
                    setCurrencySendB(false)
                } else {
                    setCurrencySendB(true)
                }
                if (!amountSend) {
                    setAmountSendB(false)
                } else {
                    setAmountSendB(true)
                }
                if (!amountXAF) {
                    setAmountXAFB(false)
                } else {
                    setAmountXAFB(true)
                }
                if (!selectTransfType) {
                    setSelectTransfTypeB(false)
                } else {
                    setSelectTransfTypeB(true)
                }
                if (!llaveSecreta) {
                    setLlaveSecretaB(false)
                } else {
                    setLlaveSecretaB(true)
                }
            }

        } catch (error) {

        }
    }
    /*********************************************************************************************** */



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
        setTotalCobrar(0)
        setTotalComision(0)
        setTotalPagar(0)
    }


    useEffect(() => {

        ObtenervalorMoneda()
        console.log(monedaValor)

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



                                <div style={{ width: '100%', marginTop: 15 }}>
                                    <TextField
                                        label="Nombre del remitente"
                                        id="outlined-size-small-name-s"
                                        size="medium"
                                        sx={{ width: "100%" }}
                                        value={senderName}
                                        onChange={(e) => { setSenderName(e.target.value) }}

                                        //{...register("nameSend", { required: "Campo requerido", minLength: 4 })}
                                        //error = {!!errors?.nameSend}
                                        error={senderNameB ? false : true}

                                    />
                                </div>

                                <div style={{ width: '100%', marginTop: 15 }}>
                                    <TextField
                                        label="Apellidos del remitente"
                                        id="outlined-size-small"
                                        size="medium"
                                        value={senderLastName}
                                        onChange={(e) => { setSenderLastName(e.target.value) }}
                                        sx={{ width: "100%" }}
                                        //{...register("dipSend", { required: "Campo requerido", minLength: 4 })}
                                        //error={!!errors?.dipSend}
                                        error={senderLastNameB ? false : true}


                                    />
                                </div>


                                <div style={{ width: '100%', marginTop: 15 }}>
                                    <TextField
                                        label="DIP/PASAPORTE del remitente"
                                        id="outlined-size-small"
                                        size="medium"
                                        value={senderIdDocumentNumber}
                                        onChange={(e) => { setSenderIdDocumentNumber(e.target.value) }}
                                        sx={{ width: "100%" }}
                                        //{...register("dipSend", { required: "Campo requerido", minLength: 4 })}
                                        //error={!!errors?.dipSend}
                                        error={senderIdDocumentNumberB ? false : true}


                                    />
                                </div>

                                <div style={{ width: '100%', marginTop: 15 }}>
                                    <FormControl sx={{ width: "100%" }}>
                                        <InputLabel id="demo-simple-select-label-ser">Elige el tipo de transferencia</InputLabel>
                                        <Select
                                            id="demo-simple-select-adress-ser"
                                            label="Elige el tipo de transferencia"
                                            //{...register("adressRecep", { required: true })}
                                            //error={!!errors?.adressRecep}
                                            onChange={(e) => { setSelectTransfType(e.target.value) }}
                                            value={selectTransfType}
                                            error={selectTransfTypeB ? false : true}
                                        >
                                            <MenuItem value={"bank"} >Bancaria</MenuItem>
                                            <MenuItem value={"normal"} >Normal</MenuItem>

                                        </Select>
                                    </FormControl>
                                </div>
                                <>
                                    {selectTransfType === "bank" ?
                                        <>
                                            <div style={{ width: '100%', marginTop: 15 }}>
                                                <TextField
                                                    label="Nombre del banco"
                                                    id="outlined-size-small-name-s"
                                                    size="medium"
                                                    sx={{ width: "100%" }}
                                                    value={bankName}
                                                    onChange={(e) => { setBankName(e.target.value) }}

                                                    //{...register("nameSend", { required: "Campo requerido", minLength: 4 })}
                                                    //error = {!!errors?.nameSend}
                                                    error={bankNameB ? false : true}

                                                />
                                            </div>

                                            <div style={{ width: '100%', marginTop: 15 }}>
                                                <TextField
                                                    label="Numero de cuenta"
                                                    id="outlined-size-small"
                                                    size="medium"
                                                    value={bankAccount}
                                                    onChange={(e) => { setBankAccount(e.target.value) }}
                                                    sx={{ width: "100%" }}
                                                    //{...register("dipSend", { required: "Campo requerido", minLength: 4 })}
                                                    //error={!!errors?.dipSend}
                                                    error={bankAccountB ? false : true}


                                                />
                                            </div>


                                            <div style={{ width: '100%', marginTop: 15 }}>
                                                <TextField
                                                    label="Direccion del banco"
                                                    id="outlined-size-small"
                                                    size="medium"
                                                    value={bankAddres}
                                                    onChange={(e) => { setBankAddres(e.target.value) }}
                                                    sx={{ width: "100%" }}
                                                    //{...register("dipSend", { required: "Campo requerido", minLength: 4 })}
                                                    //error={!!errors?.dipSend}
                                                    error={bankAddresB ? false : true}


                                                />
                                            </div>
                                        </>
                                        :
                                        <></>
                                    }
                                </>
                                <Box
                                    sx={{
                                        height: "90px",
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        bgcolor: "#fff",
                                        marginTop: 1,
                                        display: 'none'
                                    }}
                                >

                                    <Card sx={{ width: "100%", marginTop: 1, backgroundColor: '#e0e0e0', }}>
                                        <CardContent>
                                            <div style={{ fontSize: 14, display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                <Typography color="text.secondary" >
                                                    Total comision :
                                                </Typography>
                                                <Typography color="#212121" sx={{ marginLeft: 0.5 }} variant='h5' >
                                                    {Number(totalComision).toLocaleString("es-GQ")} XAF
                                                </Typography>
                                            </div>


                                            <div style={{ fontSize: 14, display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                <Typography color="text.secondary" >
                                                    Total a pagar:
                                                </Typography>
                                                <Typography color="#212121" sx={{ marginLeft: 0.5 }} variant='h5' >
                                                    {Number(totalCobrar).toLocaleString("es-GQ")} XAF
                                                </Typography>
                                            </div>



                                        </CardContent>
                                    </Card>

                                </Box>

                            </Grid>
                            <Grid item xs={12} sm={12} md={6} xl={6}  >
                                <Box>
                                    <Typography sx={{ color: "textColorTitle", textAlign: "center", marginTop: { xs: "12px", sm: "12px", xl: "0px" } }} variant='h5'>
                                        Datos del beneficiario
                                    </Typography>
                                </Box>

                                <div style={{ width: '100%', marginTop: 15 }}>
                                    <FormControl
                                        sx={{ width: "100%" }}

                                    >
                                        <Autocomplete
                                            id="country-select-demo"
                                            sx={{ width: '100%' }}
                                            options={paises}
                                            autoHighlight
                                            getOptionLabel={(option) => option.label}
                                            onChange={(e, v) => { SearchOffice(v) }}
                                            renderOption={(props, option) => (
                                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                    <img
                                                        loading="lazy"
                                                        width="20"
                                                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                        alt=""
                                                    />
                                                    {option.label} ({option.code}) +{option.phone}
                                                </Box>
                                            )}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    sx={{ width: "100%" }}
                                                    label="Pais del beneficiario"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                                    }}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                    {spinnerCity ?
                                        <Box sx={{ width: '100%' }}>
                                            <LinearProgress />
                                        </Box>
                                        :
                                        <></>
                                    }
                                </div>

                                <div style={{ width: '100%', marginTop: 15 }}>
                                    <FormControl
                                        sx={{ width: "100%" }}
                                    >
                                        <Autocomplete
                                            id="country-select-demo"
                                            options={arrayOffices}
                                            autoHighlight
                                            getOptionLabel={(option) => option.CityName.$value}
                                            onChange={(e, v) => {DataOffice(v) }}
                                            renderOption={(props, option) => (
                                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>

                                                    {option.CityName.$value} {option.Address.$value} - {option.AllowBankDeposit.$value?"perm. op. bancaria":"no perm. op. bancaria"}
                                                </Box>
                                            )}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    sx={{ width: "100%" }}
                                                    label="Elige la ofina o ciudad"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                                    }}
                                                />
                                            )}
                                        />
                                    </FormControl>

                                </div>
                                <div style={{ width: '100%', marginTop: 15 }}>
                                    <TextField
                                        label={`Cantidad en enviado en ${currencyToPay}`}
                                        id="outlined-size-small"
                                        onChange={(e) => { CalculadoraMoEx(e.target.value) }}
                                        value={amountToPay}
                                        size="medium"
                                        sx={{ width: "100%" }}
                                        //{...register("nameRecep", { required: "Campo requerido", minLength: 4 })}
                                        //error={!!errors?.nameRecep}
                                        error={amountToPayB ? false : true}


                                    />
                                    {spinnerCalculadora ?
                                        <Box sx={{ width: '100%' }}>
                                            <LinearProgress />
                                        </Box>
                                        :
                                        <></>
                                    }
                                </div>
                                {currencyToPay ?
                                    <>
                                        <div style={{ width: '100%', marginTop: 15 }}>
                                            <TextField
                                                label={`Cantidad en enviado en EUR`}
                                                id="outlined-size-small"
                                                onChange={(e) => { }}
                                                value={amountSend.toLocaleString("es-GQ")}
                                                size="medium"
                                                sx={{ width: "100%" }}
                                                //{...register("nameRecep", { required: "Campo requerido", minLength: 4 })}
                                                //error={!!errors?.nameRecep}
                                                error={amountSendB ? false : true}


                                            />
                                        </div>
                                        <div style={{ width: '100%', marginTop: 15 }}>
                                            <TextField
                                                label="Cantidad en enviado en XAF"
                                                id="outlined-size-small"
                                                onChange={(e) => { }}
                                                value={(amountSend * Number(monedaValor)).toLocaleString("es-GQ")}
                                                size="medium"
                                                sx={{ width: "100%" }}
                                                //{...register("nameRecep", { required: "Campo requerido", minLength: 4 })}
                                                //error={!!errors?.nameRecep}
                                                error={amountSendB ? false : true} 


                                            />
                                        </div>
                                    </>
                                    :
                                    <></>
                                }
                                <div style={{ width: '100%', marginTop: 15 }}>
                                    <TextField
                                        label="Nombre del beneficiario"
                                        id="outlined-size-small"
                                        onChange={(e) => { setReceiver(e.target.value) }}
                                        value={receiver}
                                        size="medium"
                                        sx={{ width: "100%" }}
                                        //{...register("nameRecep", { required: "Campo requerido", minLength: 4 })}
                                        //error={!!errors?.nameRecep}
                                        error={receiverB ? false : true}


                                    />
                                </div>

                                <div style={{ width: '100%', marginTop: 15 }}>
                                    <TextField
                                        label="Telefono del beneficiario"
                                        id="outlined-size-small"
                                        onChange={(e) => { setReceiverPhone(e.target.value) }}
                                        value={receiverPhone}
                                        size="medium"
                                        sx={{ width: "100%" }}
                                        //{...register("nameRecep", { required: "Campo requerido", minLength: 4 })}
                                        //error={!!errors?.nameRecep}
                                        error={receiverPhoneB ? false : true}


                                    />
                                </div>


                                <div style={{ width: '100%', marginTop: 15 }}>
                                    <TextField
                                        label="La ciudad del beneficiario"
                                        id="outlined-size-small"
                                        onChange={(e) => { setReceiverCity(e.target.value) }}
                                        value={receiverCity}
                                        size="medium"
                                        sx={{ width: "100%" }}
                                        //{...register("nameRecep", { required: "Campo requerido", minLength: 4 })}
                                        //error={!!errors?.nameRecep}
                                        error={receiverCityB ? false : true}


                                    />
                                </div>


                                <div style={{ width: '100%', marginTop: 15 }}>
                                    <TextField
                                        label="La direccion del beneficiario"
                                        id="outlined-size-small"
                                        onChange={(e) => { setReceiverAddress(e.target.value) }}
                                        value={receiverAddress}
                                        size="medium"
                                        sx={{ width: "100%" }}
                                        //{...register("nameRecep", { required: "Campo requerido", minLength: 4 })}
                                        //error={!!errors?.nameRecep}
                                        error={receiverAddressB ? false : true}


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
                                            onClick={() => Enviar()}
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


export default FormEnviarInternMoEx