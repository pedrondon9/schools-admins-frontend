import { TabContext, TabPanel } from '@mui/lab';
import { Box, Grid, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FormUpdate from '../formUpdate';
import MyEditor from '../textEditor/editorText';
import { Title } from '../../textTitle/title';
import AppContext from '../../../contexts/ServiceContext';

const NavTab = ({ id, courseId }) => {
  const [value, setValue] = useState('1');
  const [expanded, setExpanded] = useState(false);

  const { AxiosConfigsToken, dataUser, dataEditUser, dispatch, editCourseId, getCourseId, getWithId } = React.useContext(AppContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>

      <Grid
        spacing={2}
        //bgcolor="backgroundColorPage"
        container
        sx={{ justifyContent: 'center', width: { xs: '100%' } }}
      >

        {editCourseId.description &&
          <Box sx={{ display: 'flex', }}>
            <Box sx={{ width: { xs: '100%' },justifyContent:"center"}}>
              <Box sx={{ mt: -4, mb: 2 }}>
                <Title title={editCourseId?.title} />
              </Box>

              <Box sx={{ display: 'flex'}}>
                <Box sx={{ width: { xs: '100%',md: '870px' }, }}>
                  <div
                    style={{
                      backgroundColor: '#f5f5f5',
                      padding: '5px',
                      borderRadius: '5px',
                    }}

                    dangerouslySetInnerHTML={expanded ? { __html: editCourseId?.description } : { __html: editCourseId?.description.substring(0, 120) + "..."  }}
                  />
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-2 text-blue-500 hover:underline"
                  >
                    {expanded ? "Leer menos" : "Leer todo"}
                  </button>
                </Box>
              </Box>

            </Box>
          </Box>
        }
        <TabContext value={`${value}`}>
          <Box sx={{}}>
            <Tabs
              value={`${value}`}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab value={'1'} component={NavLink} to="" label="Descripcion del curso" />
              <Tab value={'2'} component={NavLink} to="" label="Actualizar datos del curso" />
              <Tab value={'3'} component={NavLink} to="" label="Configurar modulos del curso" />
              <Tab value={'4'} component={NavLink} to="" label="Alumnos" />
              <Tab value={'5'} component={NavLink} to="" label="Profesores" />
            </Tabs>
          </Box>
          <TabPanel value={'1'} sx={{ paddingInline: '0px' }}>
            {/* Imagen del curso */}
            <Box sx={{ display: "flex", display: "none", justifyContent: { xs: "center", sm: 'auto' }, width: { xs: "100%", }, mt: 2 }}>
              <Box
                component="img"
                src={courseId?.courseImg} // URL de la imagen
                alt={courseId.title}
                sx={{
                  height: { xs: 100, sm: 150, md: 150 },
                  objectFit: "cover", // ajusta la imagen sin deformar
                  borderRadius: 1,    // esquinas redondeadas
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginLeft: "16px" }}>
              <Box sx={{ width: { xs: '100%' } }}>
                <MyEditor id={id} courseId={editCourseId} />
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={'2'} sx={{ paddingInline: '0px' }}><FormUpdate id={id} courseId={editCourseId} /></TabPanel>
          <TabPanel value={'3'} sx={{ paddingInline: '0px' }}></TabPanel>
          <TabPanel value={'4'} sx={{ paddingInline: '0px' }}></TabPanel>
          <TabPanel value={'5'} sx={{ paddingInline: '0px' }}></TabPanel>

        </TabContext>
      </Grid>
    </div>
  );
};

export default NavTab;
