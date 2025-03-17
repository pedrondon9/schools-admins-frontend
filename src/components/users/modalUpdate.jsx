import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Add } from '@mui/icons-material';
import { Grid } from '@mui/material';
import FormUpdate from './formUpdate';



export default function ModalUpdate({dataUp}) {


    return (
        <FormUpdate dataUp={dataUp}/>
    );
}