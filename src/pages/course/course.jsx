import * as React from 'react'
import AppContext from '../../contexts/ServiceContext'
import ModalAdd from '../../components/course/modalAdd'
import { Title } from '../../components/textTitle/title'
import DataCard from '../../components/course/dataCard'

export const Course = () => {

    const { AxiosConfigsToken} = React.useContext(AppContext)
    
    return (
        <div>
            <Title title = 'Cursos'/>
            <ModalAdd  />
            <DataCard/>
        </div>
    )
  
}
