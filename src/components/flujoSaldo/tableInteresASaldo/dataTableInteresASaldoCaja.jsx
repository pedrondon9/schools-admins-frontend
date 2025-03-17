import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Box, Button, IconButton, Pagination, Stack, Typography, TablePagination, Paper, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { Add, Delete, Edit, Search, Visibility } from '@mui/icons-material';
import useSWR from "swr"
import {
    useQuery
} from '@tanstack/react-query'

//import { DataGridPro, GridToolbar, esES, useGridApiRef, useKeepGroupedColumnsHidden } from '@mui/x-data-grid-pro';
import { DataGrid, GridToolbar, esES, useGridApiRef } from '@mui/x-data-grid';
import { GetCajaInteresASaldo } from './getCajaInteresASaldo';
import SkeletonTable from '../../skelholder/skelethonTable';
import AppContext from '../../../contexts/ServiceContext';


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



const VISIBLE_FIELDS = ['nameAdmin', 'phoneAdmin', 'typeUser', 'Fecha', 'cantidad', 'cantidadSaldo', 'nameConfSist', 'phoneConfSist', 'fechaA', 'createdAt', 'Acciones'];

const columns1 = [
    {
        field: 'fechaA',
        headerName: 'Desde',
        type: "date",
        width: 140,
        editable: false,
        valueGetter: (params) => new Date(params.row.fechaA)

    },
    {
        field: 'createdAt',
        headerName: 'Hasta',
        type: "date",
        width: 140,
        editable: false,
        valueGetter: (params) => new Date(params.row.createdAt)

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
        headerName: 'Usuario recargado',
        width: 150,
        editable: false,
    },
    {
        field: 'phoneAdmin',
        headerName: 'Telefono',
        type: 'phone',
        width: 110,
        editable: false,
    },
    {
        field: 'typeUser',
        headerName: 'Tipo o Role',
        width: 110,
        editable: false,
    },
    {
        field: 'cantidad',
        headerName: 'Cantidad',
        width: 140,
        editable: false,
    },
    {
        field: 'cantidadSaldo',
        headerName: 'Cantidad existente',
        width: 140,
        editable: false,
    },

    {
        field: 'phoneConfSist',
        headerName: 'Telefono Agente',
        width: 130,
        editable: false,
    },



];

const arrayMaster = ['Master_GNOB']

function DataTableInteresASaldoCaja({ id }) {
    const { userId, typeUser , AxiosConfigsToken } = useContext(AppContext)

    const [dataMaster, setDataMaster] = useState([])

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

    const columns = useMemo(
        () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns1],
    );

    //const { data, error, isLoading, } = useSWR(["obtenerInteresASaldoCaja", userId], () => GetCajaInteresASaldo(userId), {})

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
                total += cesta[x]["cantidad"]
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
            const res = await AxiosConfigsToken.get(`/obtener_interes_a_saldo_caja/${userId}`)
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
                            onClick={() => { Buscar('filtrar_interes_a_saldo_caja_master') }}
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

export default DataTableInteresASaldoCaja