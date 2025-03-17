import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Box, Button, IconButton, Stack } from '@mui/material'
import { Add, Delete, Edit } from '@mui/icons-material';
import useSWR from "swr"
import {
    useQuery
} from '@tanstack/react-query'

import AppContext from '../../../../contexts/ServiceContext';
import { DataGridPro ,GridToolbar,esES,useGridApiRef,useKeepGroupedColumnsHidden} from '@mui/x-data-grid-pro';
import { GetRecepcionesCajaMaster } from './getRecepcionesDeUnCajaMaster';
import SkeletonTable from '../../../skelholder/skelethonTable';


const VISIBLE_FIELDS = ['nameSend', 'phoneSend', 'adressAdmin', 'quantSend', 'interesSocio', 'interesGlobal', 'iva', 'nameRecep', 'phoneRecep', 'adressRecep','nameAdminSend','phoneAdminSend', 'nameAdminRecep', 'phoneAdminRecep', 'fechaA', 'createdAt', 'acciones', 'Acciones'];



const columns1 = [
    {
        field: 'nameSend',
        headerName: 'Nombre del remitente',
        width: 130,
        editable: false,
    },
    {
        field: 'phoneSend',
        headerName: 'Telefono del remitente',
        width: 180,
        editable: false,
    },
    {
        field: 'adressAdmin',
        headerName: 'Enviado en',
        width: 140,
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
        field: 'interesSocio',
        headerName: 'Interes del socio',
        width: 140,
        editable: false,
    },
    {
        field: 'interesGlobal',
        headerName: 'Interes de GNOB',
        width: 140,
        editable: false,
    },
    {
        field: 'iva',
        headerName: 'Iva',
        width: 140,
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
        width: 220,
        editable: false,
    },
    {
        field: 'adressRecep',
        headerName: 'Ciudad de recepcion',
        width: 140,
        editable: false,
    },
    {
        field: 'nameAdminSend',
        headerName: 'Nom.. caja env.',
        width: 140,
        editable: false,
    },
    {
        field: 'phoneAdminSend',
        headerName: 'Tel.. caja env.',
        width: 140,
        editable: false,
    },
    {
        field: 'nameAdminRecep',
        headerName: 'Nom.. caja recep.',
        width: 140,
        editable: false,
    },
    {
        field: 'phoneAdminRecep',
        headerName: 'Tel.. caja recep.',
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

function DataTableRecepcionesCajaMaster() {
    const { userId, typeUser,AxiosConfigsToken } = useContext(AppContext)

    const [dataMaster, setDataMaster] = useState([])

    const columns = useMemo(
        () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns1],
    );

    const { data, error, isLoading, } = useSWR(["obtenerRecepcionesCajaMaster", userId], () => GetRecepcionesCajaMaster(userId,AxiosConfigsToken), {})

    if (isLoading) return <SkeletonTable />
    if (error) return <></>
    return (
        <>
           
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGridPro
                    rows={data}
                    getRowId={(row) => row._id}
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
                />
            </Box>
        </>
    )

}

export default DataTableRecepcionesCajaMaster

