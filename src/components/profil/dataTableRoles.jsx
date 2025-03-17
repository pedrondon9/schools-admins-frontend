import React, { useState, useMemo } from 'react'
import { Box, Button, Grid, IconButton, Stack } from '@mui/material'
import { DataGrid, esES, GridToolbar } from '@mui/x-data-grid'
import useSWR from "swr"

import { GetRoles } from './getRoles';
import ModalAddRoles from './modalAddRoles';
import ModalAddFormUpdateRoles from './modalFormUpdateRoles';
import SkeletonTable from '../skelholder/skelethonTable';
import AppContext from '../../contexts/ServiceContext';

const VISIBLE_FIELDS = ['name', "Acciones", "description", "porcentageIntern"];

const columns1 = [
    {
        field: 'name',
        headerName: 'Perfil',
        width: 100,
        editable: false,
    },
    {
        field: 'description',
        headerName: 'Descripcion del perfil',
        width: 250,
        editable: false,
    },
    {
        field: "Acciones",
        headerName: 'Acciones',
        width: 180,
        editable: false,
        renderCell: (params) => {
            const currentRow = params.row;

            return (
                <>
                    {
                        <>
                            {params.row.name === 'super_admin' || params.row.name === 'Cajero' ?
                                <></>
                                :
                                <ModalAddFormUpdateRoles dataUser={currentRow} />
                            }
                            {/*<ModalDeleteUser dataUser={currentRow} />*/}
                        </>
                    }

                </>
            );
        },
    },

];

function DataTableRoles() {
    const { userId, typeUser, acciones, AxiosConfigsToken } = React.useContext(AppContext)

    //SWR para hacer peticiones

    const [openFormUpdate, setOpenFormUpdate] = React.useState(false);

    const { data, error, isLoading, } = useSWR("getRoles", () => GetRoles(AxiosConfigsToken), {})

    const columns = React.useMemo(
        () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns1],
    );

    if (isLoading) return <SkeletonTable />

    if (error) return <></>

    return (
        <>

            <ModalAddRoles />
            <div style={{ display: "flex", justifyContent: 'center', }}>
                <Grid

                    spacing={3}
                    //bgcolor="backgroundColorPage"
                    container
                    sx={{ justifyContent: "center", maxWidth: "600px" }}
                >
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}   >
                        <Box sx={{ height: "auto", width: '100%', bgcolor: "#e0e0e0" }}>
                            <DataGrid
                                rows={data}
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
                                        showQuickFilter: true,
                                        quickFilterProps: { debounceMs: 500 },
                                    },
                                }}
                                options={{
                                    responsive: "scroll",
                                }}
                                initialState={{
                                    columns: {
                                        columnVisibilityModel: {
                                            // Hide columns status and traderName, the other columns will remain visible
                                            createdAt: false,
                                            fechaA: false

                                        },
                                    },
                                    pagination: { paginationModel: { pageSize: 8 } }
                                }}
                                pagination={true}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default DataTableRoles