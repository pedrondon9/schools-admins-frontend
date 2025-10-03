import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Toolbar from '@mui/material/Toolbar';

import { NavLink, useLocation, matchPath } from 'react-router-dom';
import { Box, Button, Divider, ListItemIcon, Typography } from '@mui/material';
import { DATA_USER } from '../../contexts/constantesVar';
import AppContext from '../../contexts/ServiceContext';
import { Book, Business, Dashboard, Event, Logout, Person, School } from '@mui/icons-material';

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
    { text: "Dashboard", icon: <Dashboard />, link: '/' },
    { text: "Usuario", icon: <Person />, link: '/users' },
    { text: "Cursos", icon: <School />, link: '/cursos' },
    { text: "Especialidades", icon: <Book />, link: '/especialidades' },
    { text: "Eventos", icon: <Event />, link: '/eventos' },
    { text: "Institución", icon: <Business />, link: '/school' },
  ]

  const currentSegment = '/' + location.pathname.split('/')[1];



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
              display: "none"
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
                      display: 'none',
                    }}
                  />
                }
              </div>
            </Box>
          </Toolbar>

          <Toolbar />
          <Divider />

          <List>
            {listePath.map((menu, index) => (
              <ListItem
                key={menu.text}
                disablePadding
              //disableGutters={true}
              >
                <ListItemButton
                  sx={{
                    fontWeight: "9000 !important",  
                    color:
                      currentSegment === '/' + menu.link.split('/')[1] ? '#1976d2' : '',
                  }}
                  component={NavLink}
                  to={menu.link}
                  onClick={toggleDrawer}
                >
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.text} />
                </ListItemButton>
              </ListItem>


            ))}
          </List>
          <Divider />

          <List>
            <ListItem
              disablePadding
            >
              <ListItemButton
                onClick={() => {
                  CloseSesion();
                }}
              >
                <ListItemIcon><Logout /></ListItemIcon>
                <ListItemText primary="Salir" />
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
