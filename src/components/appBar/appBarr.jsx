import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import DrawerListt from './drawerListt';
import AppContext from '../../contexts/ServiceContext';
import { Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
const drawerWidth = 140;

function MenuAppBars(props) {
  const { titlePage, dataUser } = React.useContext(AppContext);
  let userId = dataUser.loginName;
  let userName = dataUser.loginId;
  let valideLogin = dataUser.login;
  const pages = [
    { name: 'Inicio', link: '/' },
    { name: 'Usuario', link: '/users' },
    { name: 'Cursos', link: '/course' },
    { name: 'Eventos', link: '/events' },
    { name: 'Perfiles', link: '/profil' },
    { name: 'Configuracion', link: '/setting' },
    //{ text: 'Cambiar contrasena', link: "/cambiar_password" },
  ];

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerToggle = <DrawerListt toggleDrawer={handleDrawerToggle} />;
  const drawerStatic = <DrawerListt toggleDrawer={() => { }} />;
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      {valideLogin ? (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
              boxShadow: 0,
              backgroundColor: '#ffffff',
            }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: '#212121',
                  textDecoration: 'none',
                }}
              >
                ESEG
              </Typography>
              <IconButton

                color="primary"
                aria-label="open drawer"

                edge="end"

                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' }, color: '#212121',bgcolor:"#e0e0e0" }}
              >
                <MenuIcon />
              </IconButton>

              
            </Toolbar>


          </AppBar>

          <Box
            component="nav"
            sx={{
              width: { sm: drawerWidth },
              flexShrink: { sm: 0 },
              backgroundColor: '#fafafa',
            }}
            aria-label="mailbox folders"
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                  backgroundColor: '#6200ea',
                },
              }}
            >
              {drawerToggle}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                  backgroundColor: '#eee',
                },
              }}
              open
            >
              {drawerStatic}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              minHeight: '100vh',
              paddingInline: '5px',
              paddingTop: '10px',
              width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
              backgroundColor: 'backgroundColorPage',
            }}
          >
            <Toolbar />
            {props.children}
          </Box>
        </Box>
      ) : (
        <>{props.children}</>
      )}
    </div>
  );
}

MenuAppBars.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default MenuAppBars;
