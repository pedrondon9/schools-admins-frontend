import { TabContext, TabPanel } from '@mui/lab';
import { Box, Grid, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FormUpdate from '../formUpdate';
import MyEditor from '../../textEditor/editorText';
import AppContext from '../../../contexts/ServiceContext';
import DescriptionComponent from '../../descriptionComponent';

const NavTab = ({ id, courseId }) => {
  const {
    AxiosConfigsToken,
    dataUser,
    dataEditUser,
    dispatch,
    editEventId,
    getCourseId,
    getWithId,
  } = React.useContext(AppContext);
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{display:"flex",justifyContent:"center"}}>
    <FormUpdate id={id} courseId={courseId} />
    </Box>
  );
};

export default NavTab;
