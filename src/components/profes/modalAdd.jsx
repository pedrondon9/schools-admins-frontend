import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Add } from '@mui/icons-material';
import FormAdd from './formAdd';
import { Grid } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '70%', md: '500px' },
  bgcolor: '#e0e0e0', //'background.paper',
  boxShadow: 24,
  pb: 4,
  pt: 4,
};

export default function ModalAdd() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return <FormAdd />;
}



