import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Toolbar from '@mui/material/Toolbar';

import { NavLink } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { DATA_USER } from '../../contexts/constantesVar';
import AppContext from '../../contexts/ServiceContext';


const listTextStyle = {
    fontWeight: "900",
    color: "textColorTitle2"
}



function DrawerListt({ toggleDrawer }) {
    const { dispatch, dataUser,userId,userName,valideLogin } = React.useContext(AppContext)


    const CloseSesion = () => {

        let dataUsers = {
            login: false,
            loginId: '',
            logo: '',
            loginName: '',
            loginToken: '',
            schoolTenant: '',
            schoolName: '',
            schoolLogo: '',
        }

        window.localStorage.setItem("enableTAdmins", JSON.stringify(dataUsers))

        dispatch({
            type: DATA_USER,
            payload: dataUsers
        })


    }
    const listePath = [
        { text: 'Inicio', link: "/" },
        { text: 'Personal', link: "/users" },
        { text: 'Profesores', link: "/profes" },
        { text: 'Alumnos', link: "/students" },
        { text: 'Cursos', link: "/course" },
        { text: 'Eventos', link: "/events" },
        { text: 'Perfiles', link: "/profil" },
        { text: 'Configuracion', link: "/setting" },
        //{ text: 'Cambiar contrasena', link: "/cambiar_password" },
    ]
    return (
        <div>
            {valideLogin ?
                <div>
                    <Toolbar title="TITLE"
                        sx={{
                            backgroundColor: '#000000',
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <Box

                        >
                            <div style={{ display: 'flex', justifyContent: "center" }}
                            >
                                {

                                    <img
                                        src={'https://res.cloudinary.com/mumbex/image/upload/v1670484249/logo_zlwjaf.jpg'}
                                        alt={"globals"}
                                        loading="lazy"
                                        width={130}

                                    />
                                }
                            </div>


                        </Box>


                    </Toolbar>

                    <List>
                        {listePath.map((menu, index) => (
                            <ListItem key={menu.text} disablePadding divider={true} sx={{ color: "#212121", fontSize: '25px', fontWeight: "700px" }}>
                                <ListItemButton component={NavLink} to={menu.link} onClick={toggleDrawer} >

                                    <ListItemText primary={menu.text} sx={listTextStyle} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <List>
                        <ListItem disablePadding divider={true} sx={{ color: "#212121", marginTop: 3, fontSize: '25px', bgcolor: "#eee", fontWeight: "700px" }}>
                            <ListItemButton onClick={() => {
                                CloseSesion()
                            }} >

                                <ListItemText primary={'Salir'} sx={{ color: '#212121' }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </div>
                :
                <div></div>
            }
        </div>
    )
}

export default DrawerListt