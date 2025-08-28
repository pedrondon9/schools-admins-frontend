import { TabContext, TabPanel } from '@mui/lab';
import { Box, Grid, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FormUpdate from '../formUpdate';
import MyEditor from '../textEditor/editorText';

const NavTab = ({id,courseId}) => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
      <Grid
        spacing={2}
        //bgcolor="backgroundColorPage"
        container
        sx={{ justifyContent: 'center', width:{ xs: '100%'} }}
      >
        <TabContext value={`${value}`}>
          <Box sx={{}}>
            <Tabs
              value={`${value}`}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab value={'1'} component={NavLink} to="" label="Contenido de la publicacion" />
              <Tab value={'2'} component={NavLink} to="" label="Actualizar datos" />
              <Tab value={'3'} disabled component={NavLink} to="" label="" />
            </Tabs>
          </Box>
          <TabPanel value={'1'} sx={{ paddingInline: '0px' }}><MyEditor id = {id} courseId ={courseId}/></TabPanel>
          <TabPanel value={'2'} sx={{ paddingInline: '0px' }}><FormUpdate id = {id} courseId ={courseId}/></TabPanel>

        </TabContext>
      </Grid>
    </div>
  );
};

export default NavTab;
