import React from 'react';
import { Title } from '../../components/textTitle/title';
import ModalAdd from '../../components/students/modalAdd';
import DataCard from '../../components/students/dataCard';

export const Students = () => {
  return (
    <div>
      <Title title="Estudiantes" />

      <ModalAdd />
      <DataCard />
    </div>
  );
};
