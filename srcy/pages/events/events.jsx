import React from 'react';
import DataCard from '../../components/events/dataCard';
import ModalAdd from '../../components/events/modalAdd';
import { Title } from '../../components/textTitle/title';

export const Events = () => {
  return (
    <div>
      <Title title="Noticias" />
      <ModalAdd />
      <DataCard />
    </div>
  );
};
