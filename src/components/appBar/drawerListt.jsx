import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Toolbar from '@mui/material/Toolbar';

import { NavLink, useLocation,matchPath } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { DATA_USER } from '../../contexts/constantesVar';
import AppContext from '../../contexts/ServiceContext';

const listTextStyle = {
  fontWeight: 900,
  color: '#eeeeee',
};

function DrawerListt({ toggleDrawer }) {
  const { dispatch, dataUser, userId, userName, valideLogin } = React.useContext(AppContext);
  const location = useLocation();

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
    };

    window.localStorage.setItem('enableTAdmins', JSON.stringify(dataUsers));

    dispatch({
      type: DATA_USER,
      payload: dataUsers,
    });
  };
  const listePath = [
    { text: 'Inicio', link: '/' },
    { text: 'Usuario', link: '/users' },
    { text: 'Cursos', link: '/cursos' },
    { text: 'Especialidades', link: '/especialidades' },
    { text: 'Perfiles', link: '/profil' },
    { text: 'Configuracion', link: '/setting' },
    //{ text: 'Cambiar contrasena', link: "/cambiar_password" },
  ];

  const currentSegment = "/" + location.pathname.split("/")[1];

  return (
    <div>
      {valideLogin ? (
        <div>
          <Toolbar
            title="TITLE"
            sx={{
              //backgroundColor: '#000000',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {
                  <img
                    src={
                      'https://res.cloudinary.com/mumbex/image/upload/v1660494910/logo1_ffq1qu.png'
                    }
                    alt={'globals'}
                    loading="lazy"
                    width={130}
                    style={{
                      filter: 'grayscale(100%)',
                      display: 'none'
                    }}
                  />
                }
              </div>
            </Box>
          </Toolbar>

          <List>
            {listePath.map((menu, index) => (
              <ListItem
                key={menu.text}
                disablePadding
                divider={true}
              //disableGutters={true}


              >
                <ListItemButton sx={{
                  fontWeight: 9000, bgcolor: currentSegment === ("/" + menu.link.split("/")[1])? "#fff" : "#eee"
                }} component={NavLink} to={menu.link} onClick={toggleDrawer}>

                  <Typography
                    variant="p"
                    component="p"
                    sx={{
                      textAlign: 'center',
                      whiteSpace: 'normal',
                      fontSize: 17,
                      color: location.pathname == menu.link ? "#6200ea" : "#212121",
                      fontWeight: 600

                    }}
                  >
                    {menu.text}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List>
            <ListItem
              disablePadding
              divider={true}
              sx={{
                color: '#212121',
                marginTop: 3,
                fontSize: '25px',
                bgcolor: '#eee',

              }}
            >
              <ListItemButton
                onClick={() => {
                  CloseSesion();
                }}
              >
                <ListItemText primary={'Salir'} sx={{ color: '#212121', fontWeight: '1000px', }} />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default DrawerListt;
