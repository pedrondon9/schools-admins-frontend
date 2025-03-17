
import React, { useContext, useState } from 'react';
import Auth from './contexts/Auth';
import './App.css';
import { Route, BrowserRouter, Routes, Navigate, HashRouter } from 'react-router-dom';
import Loginn from './pages/login/loginn';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { TemaGlobal } from './components/temaGlobal';
import Protected from './components/protectedRoute';
import RedirectUser from './components/redirectUser';
import toast, { Toaster } from 'react-hot-toast';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import MenuAppBars from './components/appBar/appBarr';
import Homes from './pages/home/home';
import axiosConfigs from './components/axiosConfig';
import { VerificarToken } from './components/verificarToken';
import Interceptors from './components/axiosInterceptor';
import AppContext from './contexts/ServiceContext';

import { Events } from './pages/events/events';
import { Students } from './pages/students/students';
import { Users } from './pages/users/users';
import { Profil } from './pages/profil/profil';
import { Course } from './pages/course/course';
import { CourseInfo } from './pages/courseInfo/courseInfo';
import { InfoStudent } from './pages/infoStudent/infoStudent';
import { EventId } from './pages/events/eventId';
import { Profes } from './pages/profe/profes';
import Setting from './pages/setting/setting';

const queryClient = new QueryClient()









function App() {




  const [userData, setUserData] = useState({ permision: ['crear', 'recargar'], name: 'g-nob' })


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

              <Route exact path="/signIn" element={
                <RedirectUser>
                  <Loginn />
                </RedirectUser>

              } />

              <Route exact path="/" element={
                <Protected isAlloweb={!!userData}>
                  <Homes />
                </Protected>
              }

              />

              <Route exact path="/setting" element={
                <Protected isAlloweb={!!userData}>
                  <Setting />
                </Protected>
              }

              />

              <Route exact path="/users" element={
                <Protected isAlloweb={!!userData}>
                  <Users />
                </Protected>
              }

              />

              <Route exact path="/profil" element={
                <Protected isAlloweb={!!userData}>
                  <Profil />
                </Protected>
              }
              />

              <Route exact path="/students" element={
                <Protected isAlloweb={!!userData}>
                  <Students />
                </Protected>
              }

              />
              <Route exact path="/course" element={
                <Protected isAlloweb={!!userData}>
                  <Course />
                </Protected>
              }
              />
              <Route exact path="/info_student/:id" element={
                <Protected isAlloweb={!!userData}>
                  <InfoStudent />
                </Protected>
              }
              />
              <Route exact path="/profes" element={
                <Protected isAlloweb={!!userData}>
                  <Profes />
                </Protected>
              }
              />
              <Route exact path="/info_event/:id" element={
                <Protected isAlloweb={!!userData}>
                  <EventId />
                </Protected>
              }
              />
              <Route exact path="/course/:id" element={
                <Protected isAlloweb={!!userData}>
                  <CourseInfo />
                </Protected>
              }
              />
              <Route exact path="/events" element={
                <Protected isAlloweb={!!userData}>
                  <Events />
                </Protected>
              }

              />
              {/*              
              <Route exact path="/cambiar_password" element={
                <Protected isAlloweb={!!userData}>
                  <CambiarPasswords />
                </Protected>
              }
              />
            */}

            </Routes>
          </MenuAppBars>
        </HashRouter>
      </ThemeProvider>
    </Auth>
  );
}

export default App;
