import React from 'react';
import Auth from './contexts/Auth';
import './App.css';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Login from './pages/login/login';
import { ThemeProvider } from '@mui/material/styles';
import { TemaGlobal } from './components/temaGlobal';
import Protected from './components/protectedRoute';
import RedirectUser from './components/redirectUser';
import { Toaster } from 'react-hot-toast';

import MenuAppBars from './components/appBar/appBarr';
import Homes from './pages/home/home';

import { Users } from './pages/users/users';
import Registre from './pages/registre/registre';
import UpdatePassword from './pages/updatePassword/updatePassword';
import RegisterUsers from './pages/users/register.users';
import { Cursos } from './pages/formations/cursos';
import EditCourse from './pages/editCourse/editCourse';
import { Especialidades } from './pages/especialidades/especialidades';
import NavTab from './components/especialidades/navTab/navTab';
import EditEspecialities from './pages/editEspecialities/editEspecialities';
import { Eventos } from './pages/eventos/eventos';
import EventId from './pages/eventId/eventId';
import { Schools } from './pages/school/school';

function App() {
  return (
    <Auth>
      <ThemeProvider theme={TemaGlobal}>
        <HashRouter>
          <MenuAppBars>
            <Toaster
              toastOptions={{
                className: '',
                duration: 10000,
              }}
            />
            <Routes>
              <Route exact path="/updatepass" element={<UpdatePassword />} />

              <Route
                exact
                path="/signIn"
                element={
                  <RedirectUser>
                    <Login />
                  </RedirectUser>
                }
              />

              <Route
                exact
                path="/signUp"
                element={
                  <RedirectUser>
                    <Registre />
                  </RedirectUser>
                }
              />

              <Route
                exact
                path="/"
                element={
                  <Protected>
                    <Homes />
                  </Protected>
                }
              />
              <Route
                exact
                path="/school"
                element={
                  <Protected>
                    <Schools />
                  </Protected>
                }
              />

              <Route
                exact
                path="/cursos/:id"
                element={
                  <Protected>
                    <EditCourse />
                  </Protected>
                }
              />
              <Route
                exact
                path="/especialidades"
                element={
                  <Protected>
                    <Especialidades />
                  </Protected>
                }
              />
              <Route
                exact
                path="/eventos"
                element={
                  <Protected>
                    <Eventos />
                  </Protected>
                }
              />
              <Route
                exact
                path="/eventos/:id"
                element={
                  <Protected>
                    <EventId />
                  </Protected>
                }
              />
              <Route
                exact
                path="/especialidades/:id"
                element={
                  <Protected>
                    <EditEspecialities />
                  </Protected>
                }
              />

              <Route
                exact
                path="/users"
                element={
                  <Protected>
                    <Users />
                  </Protected>
                }
              />
              <Route
                exact
                path="/register-users"
                element={
                  <Protected>
                    <RegisterUsers />
                  </Protected>
                }
              />

             

             
              <Route
                exact
                path="/cursos"
                element={
                  <Protected>
                    <Cursos />
                  </Protected>
                }
              />
             
            
              <Route
                exact
                path="/info_event/:id"
                element={
                  <Protected>
                    <EventId />
                  </Protected>
                }
              />
             
              
            </Routes>
          </MenuAppBars>
        </HashRouter>
      </ThemeProvider>
    </Auth>
  );
}

export default App;
