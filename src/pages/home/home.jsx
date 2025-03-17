import React, { useEffect, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../../contexts/ServiceContext';
import axios from 'axios';
import { TITLEPAGE, URL_SERVER } from '../../contexts/constantesVar';
import SpinnerAlls from '../../components/spinnerAll/spinnerAlls';
import { PulseLoader } from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';
import axiosConfigs from '../../components/axiosConfig';
import { Box, Grid } from '@mui/material';
import MenuAppBars from '../../components/appBar/appBarr';
import CardHome from '../../components/cardHome';
import { Group, HomeMiniSharp, Payment, Payments, PeopleAlt } from '@mui/icons-material';

import SkelethonCard from '../../components/skelholder/skelethonCardHome';
import useSWR from "swr"
import { GetDataHome, GetDataHomeMaster } from './getDataHome';


function Homes() {
  const arrayMaster = ['Master_GNOB']

  const { typeUser, valideLogin, userId, userName, userCode, userPhone, dispatch, acciones, VerificarToken, AxiosConfigsToken, ObtenervalorMoneda } = useContext(AppContext)

  const navigate = useNavigate();
  const { data, error, isLoading, } = useSWR(["getDataHomeCajass", userId], () => GetDataHomeMaster(userId, AxiosConfigsToken), {})
  const Veri = () => {
    VerificarToken(navigate)
  }
  useEffect(() => {
    ObtenervalorMoneda()
    if (JSON.parse(window.localStorage.getItem("enableTAdmins"))) {
    } else {
      window.localStorage.setItem("enableTAdmins", JSON.stringify({ valor: false, valorI: "", nameI: '', typeI: '', phoneI: '' }))
    }
    dispatch({
      type: TITLEPAGE,
      payload: "INICIO"
    })
    //Veri()
  }, [])



  return (
    <>
      <Grid

        spacing={1}
        bgcolor="backgroundColorPage"

        container
      >

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
              <CardHome IconHome={Payment} colors='#64ffda' colorText='#212121' cantidad={data.quantSolde ? Number(data.quantSolde).toLocaleString("es-GQ") + ' ' + 'XAF' : 0} colorIcon='#e65100' titleCard="Total Nacional" />

              :
              <></>
            }
          </>
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
              <CardHome IconHome={Payment} colors='#eeeeee' colorText='#212121' cantidad={data.saldoInter ? Number(data.saldoInter).toLocaleString("es-GQ") + ' ' + 'XAF' : 0} colorIcon='#e65100' titleCard="Total Internacional" />

              :
              <></>
            }
          </>
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
              <CardHome IconHome={Payments} colors='#fffde7' colorText='#212121' cantidad={data.interesSocio ? Number(data.interesSocio).toLocaleString("es-GQ") + ' ' + 'XAF' : 0} colorIcon='#e65100' titleCard="Total Interes" />

              :
              <></>
            }
          </>
        }

      </Grid>


    </>
  )

}

export default Homes