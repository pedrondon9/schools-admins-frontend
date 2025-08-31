import { TabContext, TabPanel } from '@mui/lab';
import { Box, Grid, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FormUpdate from '../formUpdate';
import { Title } from '../../textTitle/title';
import AppContext from '../../../contexts/ServiceContext';
import DescriptionComponent from '../../descriptionComponent';
import MyEditor from '../../textEditor/editorText';

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

          <DescriptionComponent dataId = {editCourseId} description = {editCourseId?.description}/>
        
        <TabContext value={`${value}`}>
          <Box sx={{}}>
            <Tabs
              value={`${value}`}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              backgroundColor={"#1976d2"}
            >
              <Tab  value={'1'} component={NavLink} to="" label="Descripcion del curso" />
              <Tab  value={'2'} component={NavLink} to="" label="Actualizar datos del curso" />
              <Tab  value={'3'} component={NavLink} to="" label="Configurar modulos del curso" />
              <Tab  value={'4'} component={NavLink} to="" label="Alumnos" />
              <Tab  value={'5'} component={NavLink} to="" label="Profesores" />
            </Tabs>
          </Box>
          <TabPanel value={'1'} sx={{ paddingInline: '0px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginLeft: "16px" }}>
              <Box sx={{ width: { xs: '100%' } }}>
                <MyEditor id={id} dataId={editCourseId} description = {editCourseId?.description} url = {`course/get/${id}`} selected={ 'course'} />
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={'2'} sx={{ paddingInline: '0px' }}><FormUpdate id={id}  courseId={editCourseId} description = {editCourseId?.description} /></TabPanel>
          <TabPanel value={'3'} sx={{ paddingInline: '0px' }}></TabPanel>
          <TabPanel value={'4'} sx={{ paddingInline: '0px' }}></TabPanel>
          <TabPanel value={'5'} sx={{ paddingInline: '0px' }}></TabPanel>

        </TabContext>
      </Grid>
    </div>
  );
};

export default NavTab;
