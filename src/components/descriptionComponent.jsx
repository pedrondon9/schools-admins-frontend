import { TabContext, TabPanel } from '@mui/lab';
import { Box, Grid, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Title } from './textTitle/title';
import AppContext from '../contexts/ServiceContext';

const DescriptionComponent = ({dataId,description}) => {
    const [value, setValue] = useState('1');
    const [expanded, setExpanded] = useState(false);

    const { AxiosConfigsToken, dataUser, dataEditUser, dispatch, editCourseId, getCourseId, getWithId } = React.useContext(AppContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <Box sx={{ display: 'flex', }}>
            <Box sx={{ width: { xs: '100%' }, justifyContent: "center" }}>
                <Box sx={{ mt: -4, mb: 2 }}>
                    <Title title={dataId?.title} />
                </Box>

                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: { xs: '100%', md: '870px' }, }}>
                        <div
                            style={{
                                backgroundColor: '#FFFFFF',
                                padding: '5px',
                                borderRadius: '5px',
                                border:"0.5px solid #212121"
                            }}

                            dangerouslySetInnerHTML={expanded ? { __html: description } : { __html:description.substring(0, 120) }}
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


    )
};

export default DescriptionComponent;