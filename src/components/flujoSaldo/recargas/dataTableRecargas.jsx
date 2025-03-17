import * as React from 'react';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Box, Button, IconButton, Pagination, Stack, Typography, TablePagination, Paper, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { Add, Delete, Edit, Search, Visibility } from '@mui/icons-material';
import useSWR from "swr"
import SkeletonTable from '../../skelholder/skelethonTable';
import { NavLink } from 'react-router-dom';
import { GetRecargasCaja } from './getRecargas'
import AppContext from '../../../contexts/ServiceContext';
//import { DataGridPro, GridToolbar, esES, useGridApiRef, useKeepGroupedColumnsHidden } from '@mui/x-data-grid-pro';
import { DataGrid, GridToolbar, esES, useGridApiRef } from '@mui/x-data-grid';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale'
import { LoadingButton } from '@mui/lab';
import axiosConfigs from '../../axiosConfig';
import ExportExcel from "react-export-excel"


const ExcelFile = ExportExcel.ExcelFile
const ExcelSheet = ExportExcel.ExcelSheet
const ExcelColumn = ExportExcel.ExcelColumn

const VISIBLE_FIELDS = ['nameAdmin', 'phoneAdmin', 'typeUser', 'Fecha', 'quantSolde', 'quantSoldeCount', 'nameConfSist', 'phoneConfSist', 'fechaA', 'createdAt', 'Acciones'];

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
        field: 'nameAdmin',
        headerName: 'Nombre de la caja',
        width: 150,
        editable: false,
    },
    {
        field: 'phoneAdmin',
        headerName: 'Telefono de la caja',
        type: 'phone',
        width: 110,
        editable: false,
    },
    {
        field: 'quantSoldeCount',
        headerName: 'Cantidad antes de recargar',
        width: 140,
        editable: false,
    },
    {
        field: 'quantSolde',
        headerName: 'Cantidad recargado',
        width: 140,
        editable: false,
    },
    {
        field: 'nameConfSist',
        headerName: 'Master',
        width: 140,
        editable: false,
    },
    {
        field: 'phoneConfSist',
        headerName: 'Telefono Master',
        width: 130,
        editable: false,
    },



];

const arrayMaster = ['Master_GNOB']

export default function DataTableRecargas() {

    const { userId, typeUser,AxiosConfigsToken } = React.useContext(AppContext)

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

    const columns = React.useMemo(
        () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns1],
    );

    //const { data, error, isLoading, } = useSWR(["obtenerRecargasMasterOOO", userId], () => GetRecargasCaja(userId), {})

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
                if (cesta[x]["quantSolde"]) {
                    total += cesta[x]["quantSolde"]

                } else {

                }
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
                    const result = await axiosConfigs({
                        url: `/envios_filtrados_caja`,
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
            const res = await AxiosConfigsToken.get(`/obtener_recargas_por_id_caja/${userId}`)
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
    //if (error) return <></>
    return (
        <>
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
                            onClick={() => { Buscar('filtrar_recargas_caja_master') }}
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
            <Box sx={{ height: "100%", width: '100%' }}>
                <DataGrid
                    rows={dataArray}
                    getRowId={(row) => row._id}
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    columns={columns}
                    slots={{ toolbar: GridToolbar }}
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
                        pagination: { paginationModel: { pageSize: 50 } }
                    }}
                    pagination={true}
                />
            </Box>
            <Box >
                <Paper sx={{ display: 'flex', height: '80px', paddingBlock: 1, flexDirection: 'column' }}>
                    <Typography variant='p' sx={{ marginBlock: '3px',fontWeight:'700', marginLeft: 1 }}><span style={{ color: '#212121', fontSize: '13px' }}>Total operaciones : </span><span style={{ color: "#000000", fontSize: '16px' }}>{Number(totalData).toLocaleString("es-GQ")}</span></Typography>
                    <Typography variant='p' sx={{ marginBlock: '3px',fontWeight:'700', marginLeft: 1 }}><span style={{ color: '#212121', fontSize: '13px' }}>Total saldo recargado : </span><span style={{ color: "#000000", fontSize: '16px' }}>{Number(totalSaldo).toLocaleString("es-GQ")} XAF</span></Typography>
                </Paper>
            </Box>
        </>
    )
}

