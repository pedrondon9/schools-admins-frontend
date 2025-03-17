import React, { useState, useMemo } from 'react'
import { Box, Button, Card, CardActions, CardContent, Grid, IconButton, Stack, Typography } from '@mui/material'
import { DataGrid, esES, GridToolbar } from '@mui/x-data-grid'
import useSWR from "swr"

import { Get } from './get';
import ModalAddFormUpdateRoles from './modalUpdate';
import SkeletonTable from '../skelholder/skelethonTable';
import AppContext from '../../contexts/ServiceContext';
import { CardCourse } from '../cardCourse';
import ModalUpdate from './modalUpdate';
import { CardAdmin } from '../cardAdmin';
import { Title } from '../textTitle/title';

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

function DataCard() {
    const { userId, typeUser, acciones, AxiosConfigsToken } = React.useContext(AppContext)

    //SWR para hacer peticiones

    const [openFormUpdate, setOpenFormUpdate] = React.useState(false);

    const { data, error, isLoading, } = useSWR("getCourse", () => Get(AxiosConfigsToken), {})

    const columns = React.useMemo(
        () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns1],
    );

    if (isLoading) return <SkeletonTable />

    if (error) return <></>

    return (
        <>
            <div style={{ display: "flex", justifyContent: 'center', }}>
                <Grid

                    spacing={3}
                    //bgcolor="backgroundColorPage"
                    container
                    sx={{ justifyContent: "center", maxWidth: "1000px" }}
                >
                    

                    {data ?
                        <>
                            {data.map((x, y) =>
                                <Grid item xs={12} sm={6} md={4} lg={3.2} xl={3.2}   >
                                    <CardAdmin x={x} modal={<ModalUpdate dataUp={x} />} />
                                </Grid>
                            )}
                        </>

                        :
                        <></>
                    }

                </Grid>
            </div>
        </>
    )
}

export default DataCard