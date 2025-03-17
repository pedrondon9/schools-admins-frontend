


//export const URL_SERVER = process.env.NODE_ENV = 'production'?process.env.REACT_APP_API_URL:process.env.REACT_APP_API_LOCAL_URL
export const URL_SERVER = 'https://eseg.mxmxlogin.xyz' //process.env.REACT_APP_API_URL01
export const YOOMEE = process.env.REACT_APP_SERVICE_ID_YOOMEE
export const M2U = process.env.REACT_APP_SERVICE_ID_M2U
export const MTN = process.env.REACT_APP_SERVICE_ID_MTN
export const MCMPART2 = process.env.REACT_APP_SERVICE_ID_MCMPART2
//export const URL_SERVER = process.env.REACT_APP_API_LOCAL_URL
//export const URL_SERVER = 'https://lobster-app-ly4wv.ondigitalocean.app/'

//export const KEY_UI = process.env.REACT_APP_KEY_UI
export const VALIDE_USER = "valideLogin"
export const NAME_USER = "userName"
export const ID_USER = "userId"
export const PHONE_USER = "userPhone"
export const CODE_USER = "userCode"
export const LOGIN_SPINNER = "loginSpinner"
export const RESP_ERROR_LOGIN = "errorResponseLogin"
export const ERROR_USER = "userError"
export const TYPE_USER = "typeUser"
export const ACCIONES = "acciones"
export const TITLEPAGE = "titlePage"
export const PORCENTAGE = "porcentage"
export const TOKEN = "token"

export const paises = [

  { moneda: "EUR", code: 'ES', code3: 'ESP', label: 'España', phone: '34' },
  { moneda: "CHF", code: 'CH', code3: 'CHE', label: 'Suiza', phone: '41' },
  { moneda: "EUR", code: 'IT', code3: 'ITA', label: 'Italia', phone: '39' },

];

export const SERVICIOS_INTOUCH = [
  { servicio: "CM_CASHIN_MOOV_GIMAC_TD", pais: 'chad', tipo: 'Movil', operador: 'MOOV MONEY' },
  { servicio: "CM_CASHIN_AIRTEL_GIMAC_TD", pais: 'chad', tipo: 'Movil', operador: 'AIRTEL MONEY' },
  { servicio: "CM_CASHIN_OM_GIMAC_CF", pais: 'rca', tipo: 'Movil', operador: 'ORANGE MONEY' },
  { servicio: "CM_CASHIN_MOOV_GIMAC_GA", pais: 'gabon', tipo: 'Movil', operador: 'MOOV MONEY' },
  { servicio: "CM_CASHIN_AIRTEL_GIMAC_GA", pais: 'gabon', tipo: 'Movil', operador: 'AIRTEL MONEY' },
  { servicio: "CM_CASHIN_MTN_GIMAC_CG", pais: 'congo', tipo: 'Movil', operador: 'MTN MONEY' },
  { servicio: "CM_CASHIN_AIRTEL_GIMAC_CG", pais: 'congo', tipo: 'Movil', operador: 'AIRTEL MONEY' },
  { servicio: "CM_CASHIN_EU_GIMAC_CM", pais: 'camerun', tipo: 'Banco', operador: 'EXPRESION UNION' },
  { servicio: "CASHINOMCMPART2", pais: 'camerun', tipo: 'Movil', operador: 'ORANGE MONEY' },
  { servicio: "CASHINMTNCMPART", pais: 'camerun', tipo: 'Movil', operador: 'MTN MONEY' },
  { servicio: "CM_CASHIN_BICEC_GIMAC_CM", pais: 'camerun', tipo: 'Banco', operador: 'BICEC' },
  { servicio: "CM_CASHIN_CBC_GIMAC_CM", pais: 'camerun', tipo: 'Banco', operador: 'CBC' },
  { servicio: "CM_CASHIN_CCA_GIMAC_CM", pais: 'camerun', tipo: 'Banco', operador: 'CCA' },
  { servicio: "CM_CASHIN_LAREGI_GIMAC_CM", pais: 'camerun', tipo: 'Banco', operador: 'LA REGIONAL' },
  { servicio: "CM_CASHIN_UBC_GIMAC_CM", pais: 'camerun', tipo: 'Banco', operador: 'UBC' },
  { servicio: "CM_CASHIN_BGFI_GIMAC_CG", pais: 'congo', tipo: 'Banco', operador: 'BGFI' },
  { servicio: "CM_CASHIN_BCI_GIMAC_CG", pais: 'congo', tipo: 'Banco', operador: 'BCI' },
  { servicio: "CM_CASHIN_BGFI_GIMAC_GA", pais: 'gabon', tipo: 'Banco', operador: 'BGFI' },
];




export const SERVICIOS_INTOUCH_CHAD = [
  { servicio: "CM_CASHIN_MOOV_GIMAC_TD", pais: 'chad', tipo: 'Movil', operador: 'MOOV MONEY' },
  { servicio: "CM_CASHIN_AIRTEL_GIMAC_TD", pais: 'chad', tipo: 'Movil', operador: 'AIRTEL MONEY' },

];

export const SERVICIOS_INTOUCH_CI = [
  { servicio: "PAIEMENTMARCHANDOMPAYCIDIRECT", pais: 'CI', tipo: 'Movil', operador: 'ORANGE MONEY' },
  { servicio: "PAIEMENTMARCHAND_MTN_CI", pais: 'CI', tipo: 'Movil', operador: 'MTN MONEY' },
  { servicio: "PAIEMENTMARCHAND_MOOV_CI", pais: 'CI', tipo: 'Movil', operador: 'MOOV MONEY' },
  { servicio: "CI_PAIEMENTWAVE_TP", pais: 'CI', tipo: 'Movil', operador: 'WAVE MONEY' },

];
export const SERVICIOS_INTOUCH_SENEGAL = [
  { servicio: "CASHINOMPART", pais: 'Senegal', tipo: 'Movil', operador: 'ORANGE MONEY' },
  { servicio: "SN_CASHIN_EMONEY_PART", pais: 'Senegal', tipo: 'Movil', operador: 'E-MONEY' },
  { servicio: "CASHINTIGOPART", pais: 'Senegal', tipo: 'Movil', operador: 'TIGO MONEY' },
  { servicio: "SN_CASHIN_WAVE", pais: 'Senegal', tipo: 'Movil', operador: 'WAVE MONEY' },

];
export const SERVICIOS_INTOUCH_RCA = [
  { servicio: "CM_CASHIN_OM_GIMAC_CF", pais: 'rca', tipo: 'Movil', operador: 'ORANGE MONEY' },

];


export const SERVICIOS_INTOUCH_GABON = [
  { servicio: "CM_CASHIN_MOOV_GIMAC_GA", pais: 'gabon', tipo: 'Movil', operador: 'MOOV MONEY' },
  { servicio: "CM_CASHIN_AIRTEL_GIMAC_GA", pais: 'gabon', tipo: 'Movil', operador: 'AIRTEL MONEY' },
  { servicio: "CM_CASHIN_BGFI_GIMAC_GA", pais: 'gabon', tipo: 'Banco', operador: 'BGFI' },

];


export const SERVICIOS_INTOUCH_CONGO = [
  { servicio: "CM_CASHIN_MTN_GIMAC_CG", pais: 'congo', tipo: 'Movil', operador: 'MTN MONEY' },
  { servicio: "CM_CASHIN_AIRTEL_GIMAC_CG", pais: 'congo', tipo: 'Movil', operador: 'AIRTEL MONEY' },
  { servicio: "CM_CASHIN_BGFI_GIMAC_CG", pais: 'congo', tipo: 'Banco', operador: 'BGFI' },
  { servicio: "CM_CASHIN_BCI_GIMAC_CG", pais: 'congo', tipo: 'Banco', operador: 'BCI' },
];

export const SERVICIOS_INTOUCH_CAMERUN = [
  { servicio: "CM_CASHIN_EU_GIMAC_CM", pais: 'camerun', tipo: 'Banco', operador: 'EXPRESION UNION' },
  { servicio: "CASHINOMCMPART2", pais: 'camerun', tipo: 'Movil', operador: 'ORANGE MONEY' },
  { servicio: "CASHINMTNCMPART", pais: 'camerun', tipo: 'Movil', operador: 'MTN MONEY' },
  { servicio: "CM_CASHIN_BICEC_GIMAC_CM", pais: 'camerun', tipo: 'Banco', operador: 'BICEC' },
  { servicio: "CM_CASHIN_CBC_GIMAC_CM", pais: 'camerun', tipo: 'Banco', operador: 'CBC' },
  { servicio: "CM_CASHIN_CCA_GIMAC_CM", pais: 'camerun', tipo: 'Banco', operador: 'CCA' },
  { servicio: "CM_CASHIN_LAREGI_GIMAC_CM", pais: 'camerun', tipo: 'Banco', operador: 'LA REGIONAL' },
  { servicio: "CM_CASHIN_UBC_GIMAC_CM", pais: 'camerun', tipo: 'Banco', operador: 'UBC' },
];

export const SERVICIOS_INTOUCH_PAISES = [
  { pais: 'chad' },
  { pais: 'gabon' },
  { pais: 'congo' },
  { pais: 'camerun' },
  { pais: 'rca' },
];


export const SERVICIOS_LOOV = [
  { servicios: [{ 'operador': 'MTN MONEY', 'code': 'mtn-benin' }, { 'operador': 'MOOV MONEY', 'code': 'moov-benin' }], pais: 'Benin', tipo: 'Movil',codePais:"229" },
  { servicios: [{ 'operador': 'ORANGE MONEY', 'code': 'orange-money-cm' }, { 'operador': 'MTN MONEY', 'code': 'mtn-cm' }], pais: 'Camerun', tipo: 'Movil',codePais:"237" },
  {
    servicios: [
      { 'operador': 'ORANGE MONEY', 'code': 'orange-money-senegal' },
      { 'operador': 'EXPRESO MONEY', 'code': 'expresso-senegal' },
      { 'operador': 'FREE MONEY', 'code': 'free-money-senegal' },
      { 'operador': 'WAVE MONEY', 'code': 'wave-senegal' }
    ], pais: 'Senegal', tipo: 'Movil',codePais:"221"
  },

  {
    servicios: [
      { 'operador': 'ORANGE MONEY', 'code': 'orange-money-ml' },
      { 'operador': 'MOOV MONEY', 'code': 'moov-ml' },
    ], pais: 'Mali', tipo: 'Movil',codePais:"223"
  },
  { servicios: [{ 'operador': 'T-MONEY', 'code': 't-money-togo' }], pais: 'Togo', tipo: 'Movil',codePais:"228" },
  {
    servicios: [
      { 'operador': 'MTN MONEY', 'code': 'mtn-ci' },
      { 'operador': 'MOOV MONEY', 'code': 'moov-ci' },
    ], pais: 'Costa_de_Marfil', tipo: 'Movil',codePais:"225"
  },

];







