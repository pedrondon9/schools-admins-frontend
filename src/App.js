
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
import Registre from './pages/registre/registre';
import UpdatePassword from './pages/updatePassword/updatePassword';

const queryClient = new QueryClient()









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


              <Route exact path="/updatepass" element={
                  <UpdatePassword />
              } />


              <Route exact path="/signIn" element={
                <RedirectUser>
                  <Loginn />
                </RedirectUser>

              } />

              <Route exact path="/signUp" element={
                <RedirectUser>
                  <Registre />
                </RedirectUser>
              } />




              <Route exact path="/" element={
                <Protected >
                  <Homes />
                </Protected>
              }

              />

              <Route exact path="/setting" element={
                <Protected >
                  <Setting />
                </Protected>
              }

              />

              <Route exact path="/users" element={
                <Protected >
                  <Users />
                </Protected>
              }

              />

              <Route exact path="/profil" element={
                <Protected >
                  <Profil />
                </Protected>
              }
              />

              <Route exact path="/students" element={
                <Protected >
                  <Students />
                </Protected>
              }

              />
              <Route exact path="/course" element={
                <Protected >
                  <Course />
                </Protected>
              }
              />
              <Route exact path="/info_student/:id" element={
                <Protected >
                  <InfoStudent />
                </Protected>
              }
              />
              <Route exact path="/profes" element={
                <Protected >
                  <Profes />
                </Protected>
              }
              />
              <Route exact path="/info_event/:id" element={
                <Protected >
                  <EventId />
                </Protected>
              }
              />
              <Route exact path="/course/:id" element={
                <Protected >
                  <CourseInfo />
                </Protected>
              }
              />
              <Route exact path="/events" element={
                <Protected >
                  <Events />
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
