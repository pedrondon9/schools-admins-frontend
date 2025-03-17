import * as React from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import InfoIcon from '@mui/icons-material/Info';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Add, Home, PersonAddAlt1 } from '@mui/icons-material';
import { PeopleAlt } from '@mui/icons-material';
import { Sort } from '@mui/icons-material';
import { Sync } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import { HouseSharp } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import FeedIcon from '@mui/icons-material/Feed';
import { Box, Button } from '@mui/material';
import { ID_USER, NAME_USER, PHONE_USER, TYPE_USER, VALIDE_USER } from '../../contexts/constantesVar';
import AppContext from '../../contexts/ServiceContext';

const drawerWidth = 200;

const listIconStyle = {
    color: "textColorTitle2",
    fontSize: '27px',
    fontWeight: "600px"
}

const listTextStyle = {
    fontWeight: "900",
    color: "textColorTitle2"
}



function DrawerListt({ toggleDrawer }) {
    const { userId, dispatch, typeUser, valideLogin, userName } = React.useContext(AppContext)

    const CloseSesion = () => {
        window.localStorage.setItem("enableTAdmins", JSON.stringify({ valor: false, valorI: "", nameI: '', typeI: '', phoneI: '', accI: [] }))

        dispatch({
            type: VALIDE_USER,
            payload: false
        })
        dispatch({
            type: NAME_USER,
            payload: ""
        })

        dispatch({
            type: ID_USER,
            payload: ""
        })


        dispatch({
            type: TYPE_USER,
            payload: ""
        })
        dispatch({
            type: PHONE_USER,
            payload: ""
        })

        window.localStorage.setItem("tokenGnop", "")
        window.localStorage.setItem("qsaw", "")

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
                                                display:"flex",
                                                justifyContent:"center"
                                            }}
                     >
                        <Box 

                        >
                            <div style={{ display: 'flex', justifyContent:"center"}}
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