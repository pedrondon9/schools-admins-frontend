import React, { useContext, useEffect, useState } from 'react'
import InfoPerfil from '../../components/infoStudent/info/infoPerfil'
import { useParams } from 'react-router-dom'
import AppContext from '../../contexts/ServiceContext'
import { Get } from './get'
import useSWR from 'swr'
import SkeletonTable from '../../components/skelholder/skelethonTable'
import NavTab from '../../components/infoStudent/navTab/navTab'

export const InfoStudent = () => {
    const { id } = useParams()


    const { AxiosConfigsToken } = useContext(AppContext)

    const [student, setStudent] = useState([])
    const { data, error, isLoading, } = useSWR("getStudentId", () => Get(AxiosConfigsToken, id), {})




    useEffect(() => {
        //getStudent()
    }, [])


    if (isLoading) return <SkeletonTable />

    if (error) return <></>

    return (
        <>
            <InfoPerfil data={data} />
            <NavTab/>
        </>
    )

}
