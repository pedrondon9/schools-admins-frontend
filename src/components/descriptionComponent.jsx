import { TabContext, TabPanel } from '@mui/lab';
import { Box, Button, Grid, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Title } from './textTitle/title';
import AppContext from '../contexts/ServiceContext';

const DescriptionComponent = ({ dataId, description }) => {
  const [value, setValue] = useState('1');
  const [expanded, setExpanded] = useState(false);

  const {
    AxiosConfigsToken,
    dataUser,
    dataEditUser,
    dispatch,
    editCourseId,
    getCourseId,
    getWithId,
  } = React.useContext(AppContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: { xs: '100%' }, justifyContent: 'center' }}>
        
        <Typography variant="h4" sx={{ marginBlock: 3 }} gutterBottom fontWeight="bold">
          {dataId?.title}
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: { xs: '100%', md: '870px' }, mb: 4 }}>
            <Typography
              sx={{
                fontFamily: 'sans-serif',
                //fontSize: '14px',
                //color: "#3e2723",

                fontSize: { xs: '1.1rem', md: '1.1rem' },
                fontWeight: '600',
              }}
              variant="p"
              component="p"
            >
              {dataId?.brief_description}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: { xs: '100%', md: '870px' }, mb: 1 }}>
            <Typography
              sx={{
                fontFamily: 'sans-serif',
                //fontSize: '14px',
                //color: "#3e2723",

                //fontSize: { xs: "1.1rem", md: "1.1rem" },
                fontWeight: '600',
              }}
              variant="h5"
              component="h5"
            >
              Contenido
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: { xs: '100%', md: '870px' } }}>
            {description && description.length > 0 ? (
              <div
                style={{
                  backgroundColor: '#fff3e0',
                  padding: '5px',
                  borderRadius: '5px',
                  border: '2px solid rgb(79, 79, 79)',
                }}
                dangerouslySetInnerHTML={
                  expanded ? { __html: description } : { __html: description.substring(0, 120) }
                }
              />
            ) : (
              <p>No hay descripción disponible.</p>
            )}
            <Button
              variant="text"
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-blue-500 hover:underline"
              sx={{ color: 'blue' }}
            >
              {expanded ? 'Leer menos' : 'Leer todo'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DescriptionComponent;
