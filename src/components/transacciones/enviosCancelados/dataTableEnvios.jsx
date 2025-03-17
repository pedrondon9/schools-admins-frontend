import * as React from 'react';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Box, Button, IconButton, Stack } from '@mui/material'
//import { DataGridPro, GridToolbar, esES, useGridApiRef, useKeepGroupedColumnsHidden } from '@mui/x-data-grid-pro';
import { Add, Delete, Edit, Visibility } from '@mui/icons-material';
import useSWR from "swr"
import SkeletonTable from '../../skelholder/skelethonTable';
import { NavLink } from 'react-router-dom';
import AppContext from '../../../contexts/ServiceContext';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import { GetEnviosCajaMaster } from './getEnvios';
import FormUpdateEnvio from './formUpdateEnvio';
import FormDeleteEnvio from './formDeleteEnvio';
import { DataGrid, GridToolbar, esES, useGridApiRef } from '@mui/x-data-grid';

const VISIBLE_FIELDS = ['nameSend', 'nameAdminDelete','Fecha', 'description', 'quantSend', 'nameRecep', 'phoneRecep', 'fechaA', 'createdAt'];

const columns1 = [
    {
        field: 'fechaA',
        headerName: 'Desde',
        type: "date",
        width: 140,
        Visibility:false,
        editable: false,
        valueGetter: (params) => new Date(params.row.fechaA) ,
        renderCell: (params) => {
            const mes = Number(new Date(params.row.fechaA).getMonth()) + 1 ; 
            const dia = Number(new Date(params.row.fechaA).getDate())  ; 
            const agno = Number(new Date(params.row.fechaA).getFullYear()) ; 
            const hora = new Date(params.row.fechaA).getHours() ; 
            const min = new Date(params.row.fechaA).getMinutes() ; 

            return ( dia +'/'+ mes +'/'+ agno +'  '+ hora +':'+ min );
        },

    },
    {
        field: 'createdAt',
        headerName: 'Hasta',
        type: "date",
        width: 140,
        editable: false,
        valueGetter: (params) => new Date(params.row.createdAt) ,
        renderCell: (params) => {
            const mes = Number(new Date(params.row.createdAt).getMonth()) + 1 ; 
            const dia = Number(new Date(params.row.createdAt).getDate())  ; 
            const agno = Number(new Date(params.row.createdAt).getFullYear()) ; 
            const hora = new Date(params.row.createdAt).getHours() ; 
            const min = new Date(params.row.createdAt).getMinutes() ; 

            return ( dia +'/'+ mes +'/'+ agno +'  '+ hora +':'+ min );
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
        width: 130,
        editable: false,
    },
    {
        field: 'phoneSend',
        headerName: 'Telefono del remitente',
        width: 130,
        editable: false,
    },
    {
        field: 'quantSend',
        headerName: 'Cantidad enviado',
        type: 'phone',
        width: 100,
        editable: false,
    },
    {
        field: 'nameRecep',
        headerName: 'Nombre del receptor',
        width: 140,
        editable: false,
    },

    {
        field: 'adressRecep',
        headerName: 'Ciudad de recepcion',
        width: 140,
        editable: false,
    },
    {
        field: 'description',
        headerName: 'Motivo',
        width: 300,
        editable: false,
    },
    {
        field: 'nameAdminDelete',
        headerName: 'Cancelado por',
        width: 140,
        editable: false,
    },
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


];

const arrayMaster = ['Master_GNOB']

export default function DataTableEnvios() {

    const { userId, typeUser ,AxiosConfigsToken} = React.useContext(AppContext)
    const apiRef = useGridApiRef();

    const columns = React.useMemo(
        () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns1],
    );

    const { data, error, isLoading, } = useSWR(["obtenerEnviosMasterzzz", userId], () => GetEnviosCajaMaster(userId,AxiosConfigsToken), {})

    if (isLoading) return <SkeletonTable />
    if (error) return <></>
    return (
        <>
            <p>Master</p>
            <Box sx={{ height: '100%', width: '100%' }}>
                <DataGrid
                    rows={data?data:[]}
                    getRowId={(row) => row._id}
                    apiRef={apiRef}
                    //disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    columns={columns}
                    slots={{ toolbar: GridToolbar }}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    disableRowSelectionOnClick
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                        },
                    }}

                    initialState={{
                        columns: {
                          columnVisibilityModel: {
                            // Hide columns status and traderName, the other columns will remain visible
                            createdAt: false,
                            fechaA:false
                            
                          },
                        },
                        pagination: { paginationModel: { pageSize: 50 } }

                    }}
                />
            </Box>
        </>
    )
}