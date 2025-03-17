import React, { useEffect, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../contexts/ServiceContext';

import { Box, Grid } from '@mui/material';
import CardHome from './cardHome';
import SkelethonCard from './skelholder/skelethonCardHome';
import useSWR from "swr"
import { GetDataHome, GetDataHomeMaster } from '../pages/home/getDataHome';


function CardStadoSaldo({ select }) {
  const arrayMaster = ['Master_GNOB']

  const { userId, AxiosConfigsToken } = useContext(AppContext)

  const { data, error, isLoading, } = useSWR(["getDataHomeCajaStado", userId], () => GetDataHomeMaster(userId, AxiosConfigsToken), {})

  return (
    <>
      {true ?
        <Grid

          spacing={1}
          bgcolor="backgroundColorPage"

          container
        >
          {select == 'nacio' ?
            <>
              {isLoading ?
                <>
                  {
                    error ?
                      <></>
                      :
                      <SkelethonCard />

                  }
                </>
                :
                <>
                  {data ?
                    <CardHome IconHome={""} colors='#64ffda' colorText='#212121' cantidad={data.quantSolde ? Number(data.quantSolde).toLocaleString("es-GQ") + ' ' + 'XAF' : 0} colorIcon='#e65100' titleCard="Total Saldo" />

                    :
                    <></>
                  }
                </>
              }
            </>
            :
            <></>
          }


          {select == 'inter' ?
            <>
              {isLoading ?
                <>
                  {
                    error ?
                      <></>
                      :
                      <SkelethonCard />

                  }
                </>
                :
                <>
                  {data ?
                    <CardHome IconHome={''} colors='#eeeeee' colorText='#212121' cantidad={data.saldoInter ? Number(data.saldoInter).toLocaleString("es-GQ") + ' ' + 'XAF' : 0} colorIcon='#e65100' titleCard="Total Internacional" />

                    :
                    <></>
                  }
                </>
              }
            </>
            :
            <></>
          }


          {isLoading ?
            <>
              {
                error ?
                  <></>
                  :
                  <SkelethonCard />

              }
            </>
            :
            <>
              {data ?
                <CardHome IconHome={""} colors='#fffde7' colorText='#212121' cantidad={data.interesSocio ? Number(data.interesSocio).toLocaleString("es-GQ") + ' ' + 'XAF' : 0} colorIcon='#e65100' titleCard="Total Interes" />

                :
                <></>
              }
            </>
          }

        </Grid>
        :
        <></>
      }


    </>
  )

}

export default CardStadoSaldo