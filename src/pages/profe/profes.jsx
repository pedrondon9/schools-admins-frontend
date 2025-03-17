import * as React from 'react'
import { GetRoles } from '../../components/profil/getRoles'
import AppContext from '../../contexts/ServiceContext'
import { Title } from '../../components/textTitle/title'
import DataCard from '../../components/profes/dataCard'
import ModalAdd from '../../components/profes/modalAdd'


export const Profes = () => {
    const { AxiosConfigsToken } = React.useContext(AppContext)



    return (
        <div>
            <Title title='Profesores' />

            <ModalAdd />
            <DataCard />
        </div>
    )
}

