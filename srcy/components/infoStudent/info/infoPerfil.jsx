import { Grid } from '@mui/material';
import React from 'react';
import Photo from './photo';
import InfoP from './info';
import FormUpdate from './formUpdate';

const InfoPerfil = ({ data }) => {
  //console.log(data)
  return (
    <>
      <Photo data={data} />
      <InfoP data={data} />
      <FormUpdate dataUp={data} />
    </>
  );
};

export default InfoPerfil;
