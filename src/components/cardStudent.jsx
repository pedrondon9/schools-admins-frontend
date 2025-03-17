import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import ModalUpdate from './users/modalUpdate'
//#ede8f7 f3f0f8
export const CardStudent = ({ x, modal }) => {
    return (
        <Box sx={{ width: "100%" }}>
            <Card sx={{ bgcolor: "#e0e0e0" }}>
                <Link to ={`/info_student/${x._id}`} style={{textDecoration:'none' }}>
                    <CardMedia
                        variant='outlined'
                        component="img"
                        sx={{ height: 150, objectFit: "contain", paddingTop: 0.5 }}
                        image={x.imagen1}
                        title={x.name}
                    />
                    <CardContent>
                        <Typography sx={{ mb: 1, fontWeight: "600", fontSize: 12 }} color="#0d47a1" gutterBottom variant="body2" component="div">
                            {x.name?.slice(0, 18)}..
                        </Typography>
                        <Typography variant="p" sx={{ mb: 1, fontWeight: "700", fontSize: 12 }} color="#000">
                            {x.phone?.slice(0,3)} {x.phone?.slice(3,6)} {x.phone?.slice(6,9)}
                        </Typography>
                    </CardContent>
                    <CardActions style={{ display: 'none', justifyContent: 'flex-end' }}>
                        {modal}
                    </CardActions>
                </Link>
            </Card>
        </Box>
    )
}
