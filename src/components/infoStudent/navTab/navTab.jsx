import { TabContext, TabPanel } from '@mui/lab';
import { Box, Grid, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

const NavTab = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={{ display: "flex", justifyContent: 'center',marginTop:"60px" }}>
            <Grid

                spacing={2}
                //bgcolor="backgroundColorPage"
                container
                sx={{ justifyContent: "center", maxWidth: "1000px" }}
            >
                <TabContext value={`${value}`} >
                    <Box sx={{  }}>
                        <Tabs
                            value={`${value}`}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            <Tab value={'1'} component={NavLink} to='' label="Cursos" />
                            <Tab value={'2'} component={NavLink} to='' label="Notas" />
                            <Tab value={'3'} component={NavLink} to='' label="Pagos" />
                            <Tab value={'4'} component={NavLink} to='' label="Envios cancelados" />
                        </Tabs>
                    </Box>
                    <TabPanel value={'1'} sx={{ paddingInline: "0px" }}></TabPanel>
                    <TabPanel value={'2'} sx={{ paddingInline: "0px" }}></TabPanel>
                    <TabPanel value={'3'} sx={{ paddingInline: "0px" }}></TabPanel>
                    <TabPanel value={'4'} sx={{ paddingInline: "0px" }}></TabPanel>
                </TabContext>
            </Grid>
        </div>
    )
}

export default NavTab
