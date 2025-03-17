import * as React from 'react';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Box, Button, IconButton, Pagination, Stack, Typography, TablePagination, Paper, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { Add, Delete, Edit, Search, Visibility } from '@mui/icons-material';
//import { DataGridPro, GridToolbar, esES, useGridApiRef, useKeepGroupedColumnsHidden } from '@mui/x-data-grid-pro';
import useSWR from "swr"
import SkeletonTable from '../../skelholder/skelethonTable';
import { NavLink } from 'react-router-dom';
import AppContext from '../../../contexts/ServiceContext';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import { GetEnviosCajaMaster } from './getEnvios';
import FormUpdateEnvio from './formUpdateEnvio';
import FormDeleteEnvio from './formDeleteEnvio';
import VerFactura from './verFactura';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale'
import { LoadingButton } from '@mui/lab';
import axiosConfigs from '../../axiosConfig';
import ExportExcel from "react-export-excel"
import { DataGrid, GridToolbar, esES, useGridApiRef } from '@mui/x-data-grid';


const ExcelFile = ExportExcel.ExcelFile
const ExcelSheet = ExportExcel.ExcelSheet
const ExcelColumn = ExportExcel.ExcelColumn


const VISIBLE_FIELDS = ['nameSend', 'phoneSend', 'Fecha', 'comision', 'adressAdmin', 'verifyRecp', 'quantSend', 'interesSocio', 'interesGlobal', 'nameRecep', 'phoneRecep', 'adressRecep', 'nameAdmin', , 'fechaA', 'createdAt', 'phoneAdmin', 'acciones', 'Acciones'];
let total = 0


const arrayMaster = ['Master_GNOB']

export default function DataTableEnviosInter() {
    //COLUMNAS DE LA TABLA
    const columns1 = [
        {
            field: 'fechaA',
            headerName: 'Desde',
            type: "date",
            width: 140,
            Visibility: false,
            editable: false,
            valueGetter: (params) => new Date(params.row.fechaA),
            renderCell: (params) => {
                const mes = Number(new Date(params.row.fechaA).getMonth()) + 1;
                const dia = Number(new Date(params.row.fechaA).getDate());
                const agno = Number(new Date(params.row.fechaA).getFullYear());
                const hora = new Date(params.row.fechaA).getHours();
                const min = new Date(params.row.fechaA).getMinutes();

                return (dia + '/' + mes + '/' + agno + '  ' + hora + ':' + min);
            },

        },
        {
            field: 'createdAt',
            headerName: 'Hasta',
            type: "date",
            width: 140,
            editable: false,
            valueGetter: (params) => new Date(params.row.createdAt),
            renderCell: (params) => {
                const mes = Number(new Date(params.row.createdAt).getMonth()) + 1;
                const dia = Number(new Date(params.row.createdAt).getDate());
                const agno = Number(new Date(params.row.createdAt).getFullYear());
                const hora = new Date(params.row.createdAt).getHours();
                const min = new Date(params.row.createdAt).getMinutes();

                return (dia + '/' + mes + '/' + agno + '  ' + hora + ':' + min);
            },
        },



        {
            field: 'Fecha',
            headerName: 'Fecha',
            type: "date",
            width: 140,
            editable: false,
            valueGetter: (params) => new Date(params.row.createdAt),
            renderCell: (params) => {
                const mes = Number(new Date(params.row.createdAt).getMonth()) + 1;
                const dia = Number(new Date(params.row.createdAt).getDate());
                const agno = Number(new Date(params.row.createdAt).getFullYear());
                const hora = new Date(params.row.createdAt).getHours();
                const min = new Date(params.row.createdAt).getMinutes();

                return (dia + '/' + mes + '/' + agno + '  ' + hora + ':' + min);
            },
        },
        {
            field: 'nameSend',
            headerName: 'Nombre del remitente',
            width: 140,
            editable: false,
        },
        {
            field: 'phoneSend',
            headerName: 'Telefono del remitente',
            width: 120,
            editable: false,
        },
        {
            field: 'nameRecep',
            headerName: 'Nombre del receptor',
            width: 140,
            editable: false,
        },

        {
            field: 'phoneRecep',
            headerName: 'Telefono del receptor',
            width: 120,
            editable: false,
        },
        {
            field: 'adressAdmin',
            headerName: 'Enviado en',
            width: 120,
            editable: false,
        },
        {
            field: 'adressRecep',
            headerName: 'Pais de recepcion',
            width: 120,
            editable: false,
        },
        {
            field: 'quantSend',
            headerName: 'Cantidad enviado',
            type: 'number',
            width: 140,
            editable: false,
            renderCell: (params) => {

                return (Number(params.row.quantSend).toLocaleString("es-GQ") + ' ' + 'XAF');
            },
        },
        {
            field: 'comision',
            headerName: 'Comision cobrada',
            type: 'number',
            width: 100,
            editable: false,
            renderCell: (params) => {

                return (Number(params.row.comision).toLocaleString("es-GQ") + ' ' + 'XAF');
            },
        },
        {
            field: 'interesSocio',
            headerName: 'Interes del socio',
            width: 100,
            editable: false,
            renderCell: (params) => {

                return (Number(params.row.interesSocio).toLocaleString("es-GQ") + ' ' + 'XAF');
            },
        },

        {
            field: "verifyRecp",
            headerName: 'Estado',
            width: 100,
            editable: false,
            renderCell: (params) => {
                const currentRow = params.row;

                return (
                    <>

                        <Box>
                            <Typography sx={{ color: "#4caf50", textAlign: "center", marginTop: '10px' }} variant='p'>
                                Cobrado
                            </Typography>
                        </Box>

                    </>
                );
            },
        },
        {
            field: "Acciones",
            headerName: 'Acciones',
            width: 300,
            editable: false,
            renderCell: (params) => {
                const currentRow = params.row;
                const id = params.row._id;
                const verificars = params.row.verifyRecp;



                return (
                    <>

                        <VerFactura datos={currentRow} />

                    </>
                );
            },
        },

    ];

    const { userId, typeUser, AxiosConfigsToken } = React.useContext(AppContext)
    const [dataArray, setDataArray] = React.useState([])
    const [spinnerArray, setSpinnerArray] = React.useState(false)
    const [desde, setDesde] = React.useState('')
    const [hasta, setHasta] = React.useState('')
    const [texto, setTexto] = React.useState('')
    const [ciudad, setCiudad] = React.useState('')
    const [buscar, setBuscar] = React.useState(false)


    const [totalSaldo, setTotalSaldo] = React.useState("")
    const [totalIG, setTotalIG] = React.useState("")
    const [totalIS, setTotalIS] = React.useState("")
    const [totalIva, setTotalIva] = React.useState("")
    const [totalData, setTotalData] = React.useState("")

    const apiRef = useGridApiRef();

    const columns = React.useMemo(
        () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns1],
    );

    //const { data, error, isLoading, } = useSWR(["obtenerEnviosMaster", userId], () => GetEnviosCajaMaster(userId), {})

    const SumaTotalData = (lista) => {
        if (lista) {
            var total = 0
            var cesta = lista
            for (let x in cesta) {
                total += 1
            }
            setTotalData(total)
        }

    }


    const SumaTotalSaldo = (lista) => {
        if (lista) {
            var total = 0
            var cesta = lista
            for (let x in cesta) {
                total += cesta[x]["quantSend"]
            }
            setTotalSaldo(total)
        }

    }
    const SumaTotalIG = (lista) => {
        if (lista) {
            var total = 0
            var cesta = lista
            for (let x in cesta) {
                total += cesta[x]["interesGlobal"]
            }
            setTotalIG(total)
        }

    }
    const SumaTotalIS = (lista) => {
        if (lista) {
            var total = 0
            var cesta = lista
            for (let x in cesta) {
                total += cesta[x]["interesSocio"]
            }
            setTotalIS(total)
        }

    }

    const SumaTotalIva = (lista) => {
        if (lista) {
            var total = 0
            var cesta = lista
            for (let x in cesta) {
                if (cesta[x]["comision"]) {
                    total += cesta[x]["comision"]
                }

            }
            setTotalIva(total)
        }

    }

    const Buscar = async () => {
        try {
            if (ciudad === "Todo" && texto === "" && desde === "" && hasta === "") {
                GetEnviosCajaMasters(userId)
            } else {
                if (((desde && hasta) || texto || ciudad) && userId) {
                    setBuscar(true)
                    const result = await AxiosConfigsToken({
                        url: `/envios_filtrados_caja_inter`,
                        method: "post",
                        data: {
                            texto: texto, ciudad: ciudad, desde: desde, hasta: hasta, userId: userId
                        }
                    })

                    if (result.data.verificar) {
                        //console.log(result)
                        setDataArray(result.data.data.docs)

                        SumaTotalData(result.data.data.docs)
                        SumaTotalSaldo(result.data.data.docs)
                        SumaTotalIG(result.data.data.docs)
                        SumaTotalIS(result.data.data.docs)
                        SumaTotalIva(result.data.data.docs)
                        setBuscar(false)

                    } else {
                        //console.log(result)
                        setDataArray([])
                        setBuscar(false)
                    }

                } else {

                }
            }
        } catch (error) {
            setDataArray([])
            setBuscar(false)
        }


    }


    const GetEnviosCajaMasters = async (userId) => {
        setSpinnerArray(true)
        try {
            const res = await AxiosConfigsToken.get(`/obtener_envios_caja_master_inter/${userId}`)
            if (res.data.data.docs) {
                const datos = res.data.data.docs
                setDataArray(datos)

                SumaTotalData(datos)
                SumaTotalSaldo(datos)
                SumaTotalIG(datos)
                SumaTotalIS(datos)
                SumaTotalIva(datos)
                setSpinnerArray(false)
            } else {
                setDataArray([])
                setSpinnerArray(false)

            }
        } catch (error) {
            setDataArray([])
            setSpinnerArray(false)

        }


    }





    React.useEffect(() => {
        GetEnviosCajaMasters(userId)

    }, [])

    if (spinnerArray) return <SkeletonTable />
    return (
        <div >
            <p>Master</p>

            <Grid

                spacing={1}
                bgcolor="backgroundColorPage"
                container
                sx={{ marginBottom: 1 }}
            >
                <Grid item xs={12} sm={12} md={6} lg={2} xl={2}  >
                    <Box sx={{ width: '100%', }}>
                        <TextField
                            label="Texto"
                            id="outlined-size-small-name-s"
                            size="medium"
                            sx={{ width: "100%" }}
                            value={texto}

                            onChange={(e) => { setTexto(e.target.value) }}

                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={2} xl={2}  >
                    <Box sx={{ width: '100%', }}>
                        <FormControl size='medium' sx={{ width: "100%" }}>
                            <InputLabel id="demo-simple-select-label">Pais</InputLabel>
                            <Select
                                id="demo-simple-select-adress-r"
                                label="Pais"
                                //{...register("adressRecep", { required: true })}
                                //error={!!errors?.adressRecep}
                                onChange={(e) => { setCiudad(e.target.value) }}
                                value={ciudad}

                            >

                                <MenuItem value="Todo" >Todo</MenuItem>
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
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={2} xl={2}  >
                    <Box sx={{ width: '100%' }}>
                        <LocalizationProvider locale={es} dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Desde"
                                slotProps={{
                                    textField: { size: 'medium' },
                                    actionBar: { actions: ['clear'] },
                                }}

                                //views={["year", "month", "day"]}
                                format="DD-MM-YYYY"
                                sx={{ width: '100%' }}
                                onChange={(e) => {
                                    try {
                                        if (e.$d) {
                                            setDesde(e.$d)
                                        } else {
                                            setDesde('')
                                        }
                                    } catch (error) {
                                        setDesde('')

                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={2} xl={2}  >
                    <Box sx={{ width: '100%' }}>
                        <LocalizationProvider locale={es} dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Hasta"
                                slotProps={{
                                    textField: { size: 'medium' },
                                    actionBar: { actions: ['clear'] }
                                }}
                                //views={["year", "month", "day"]}
                                format="DD-MM-YYYY"
                                sx={{ width: '100%' }}
                                onChange={(e) => {
                                    try {
                                        if (e.$d) {
                                            setHasta(e.$d)
                                        } else {
                                            setHasta('')
                                        }
                                    } catch (error) {
                                        setHasta('')

                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={2} xl={2}  >
                    <Box sx={{ width: '100%' }}>

                        <LoadingButton
                            onClick={() => { Buscar() }}
                            loading={buscar}
                            variant="contained"
                            color="primary"
                            sx={{ width: "100%" }}
                            size="large"
                            endIcon={<Search />}
                        >
                            <span>Buscar</span>
                        </LoadingButton>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ height: '100%', width: '100%' }}>
                <DataGrid
                    rows={dataArray ? dataArray : []}
                    getRowId={(row) => row._id}
                    apiRef={apiRef}
                    onStateChange={(e) => {
                        //console.log(e.pagination.rowCount,"ddddddddddd")
                        //console.log(e, "5555555555555555")
                    }}

                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    columns={columns}
                    slots={{
                        toolbar: GridToolbar,

                    }}

                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    disableRowSelectionOnClick
                    slotProps={{
                        toolbar: {
                            showQuickFilter: false,
                            quickFilterProps: { debounceMs: 500 },
                        },

                    }}

                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                // Hide columns status and traderName, the other columns will remain visible
                                createdAt: false,
                                fechaA: false

                            },
                        },
                        pagination: { paginationModel: { pageSize: 50 } },
                        aggregation: {
                            model: {
                                quantSend: 'sum',
                            },
                        },
                    }}
                    pagination={true}
                />
            </Box>

            <Box >
                <Paper sx={{ display: 'flex', height: '180px', paddingBlock: 1, flexDirection: 'column' }}>
                    <ExcelFile element={<Button sx={{ marginLeft: 1, marginBottom: 1 }} color='inherit' variant='contained' size='small'>Excel</Button>} filename={`transferencias`}>
                        <ExcelSheet data={dataArray} name="transferencia">

                            <ExcelColumn label="Nombre del remitente" value="nameSend" />
                            <ExcelColumn label="Nombre del receptor" value="nameRecep" />
                            <ExcelColumn label="Numero enviado" value="phoneSend" />
                            <ExcelColumn label="Numero retirado" value="phoneRecep" />


                            <ExcelColumn label="Cantidad enviado" value="quantSend" />


                            <ExcelColumn label="Comision" value="comision" />


                            <ExcelColumn label="Interes Socio" value="interesSocio" />

                            <ExcelColumn label="Enviado en" value="adressAdmin" />

                            <ExcelColumn label="Recibido en" value="adressRecep" />


                            <ExcelColumn label="Operacion hecha por" value="nameAdmin" />

                            <ExcelColumn label="Fecha" value="createdAt" />

                        </ExcelSheet>
                    </ExcelFile>
                    <Typography variant='p' sx={{ marginBlock: '3px', fontWeight: '700', marginLeft: 1 }}><span style={{ color: '#212121', fontSize: '13px' }}>Total operaciones : </span><span style={{ color: "#000000", fontSize: '16px' }}>{Number(totalData).toLocaleString("es-GQ")}</span></Typography>
                    <Typography variant='p' sx={{ marginBlock: '3px', fontWeight: '700', marginLeft: 1 }}><span style={{ color: '#212121', fontSize: '13px' }}>Total saldo enviado : </span><span style={{ color: "#000000", fontSize: '16px' }}>{Number(totalSaldo).toLocaleString("es-GQ")} XAF</span></Typography>
                    <Typography variant='p' sx={{ marginBlock: '3px', fontWeight: '700', marginLeft: 1 }}><span style={{ color: '#212121', fontSize: '13px' }}>Total comisiones:</span><span style={{ color: "#000000", fontSize: '16px' }}>{Number(totalIva).toLocaleString("es-GQ")} XAF</span></Typography>
                    <Typography variant='p' sx={{ marginBlock: '3px', fontWeight: '700', marginLeft: 1 }}><span style={{ color: '#212121', fontSize: '13px' }}>Total int. de socios : </span><span style={{ color: "#000000", fontSize: '16px' }}>{Number(totalIS).toLocaleString("es-GQ")} XAF</span> </Typography>
                </Paper>
            </Box>

        </div>

    )
}


/*
    {
        field: 'nameAdmin',
        headerName: 'Nombre de la caja',
        width: 140,
        editable: false,
    },
    {
        field: 'phoneAdmin',
        headerName: 'Telefono de la caja',
        width: 140,
        editable: false,
    },


    */