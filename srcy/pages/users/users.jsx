import * as React from 'react';
import ModalAdd from '../../components/users/modalAdd';
import { GetRoles } from '../../components/profil/getRoles';
import AppContext from '../../contexts/ServiceContext';
import DataCard from '../../components/users/dataCard';
import { Title } from '../../components/textTitle/title';

export const Users = () => {
  const { AxiosConfigsToken } = React.useContext(AppContext);

  return (
    <div>
      <Title title="Administracion" />

      <ModalAdd />
      <DataCard />
    </div>
  );
};
