import { TabContext, TabPanel } from '@mui/lab';
import { Box, Grid, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FormUpdate from '../formUpdate';
import MyEditor from '../../textEditor/editorText';
import AppContext from '../../../contexts/ServiceContext';
import DescriptionComponent from '../../descriptionComponent';

const NavTab = ({ id, courseId }) => {
  const { AxiosConfigsToken, dataUser, dataEditUser, dispatch, editEventId, getCourseId, getWithId } = React.useContext(AppContext);
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>

      <Grid
        //bgcolor="backgroundColorPage"
        sx={{ justifyContent: 'center', width: { xs: '100%' } }}
      >

        <DescriptionComponent dataId={editEventId} description={editEventId.content} />

        <TabContext value={`${value}`}>
          <Box sx={{}}>
            <Tabs
              value={`${value}`}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              sx={{
                "& .MuiTab-root": {
                  color: "#000000", // color por defecto
                },
                "& .Mui-selected": {
                  color: "#000000", // color cuando está seleccionado
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#212121", // color del indicador
                },
              }}
            >
              <Tab value={'1'} component={NavLink} to="" label="Contenido de la publicacion" />
              <Tab value={'2'} component={NavLink} to="" label="Actualizar datos" />
              <Tab value={'3'} disabled component={NavLink} to="" label="" />
            </Tabs>
          </Box>
          <TabPanel value={'1'} sx={{ paddingInline: '0px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <MyEditor url={`events/get/${id}`} selected={'events'} id={id} courseId={editEventId} description={editEventId.content} />
            </Box>
          </TabPanel>
          <TabPanel value={'2'} sx={{ paddingInline: '0px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <FormUpdate id={id} courseId={courseId} />
            </Box>

          </TabPanel>

        </TabContext>
      </Grid>
    </div>
  );
};

export default NavTab;
