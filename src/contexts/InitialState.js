
export const InitialState = {
    dataUser: JSON.parse(window.localStorage.getItem("enableTAdmins")) ? JSON.parse(window.localStorage.getItem("enableTAdmins")) : {
        login: false,
        loginId: "",
        logo: "",
        loginName: "",
        loginToken: "",
    },
    valideLogin: JSON.parse(window.localStorage.getItem("enableTAdmins")) ? JSON.parse(window.localStorage.getItem("enableTAdmins")).valor : false,
    userId: JSON.parse(window.localStorage.getItem("enableTAdmins")) ? JSON.parse(window.localStorage.getItem("enableTAdmins")).valorI : '',
    token: JSON.parse(window.localStorage.getItem("enableTAdmins")) ? JSON.parse(window.localStorage.getItem("enableTAdmins")).tokI : '',
    userName: JSON.parse(window.localStorage.getItem("enableTAdmins")) ? JSON.parse(window.localStorage.getItem("enableTAdmins")).nameI : '',
    userCode: "",
    userPhone: JSON.parse(window.localStorage.getItem("enableTAdmins")) ? JSON.parse(window.localStorage.getItem("enableTAdmins")).phoneI : '',
    loginSpinner: false,
    errorResponseLogin: "",
    userError: false,
    typeUser: JSON.parse(window.localStorage.getItem("enableTAdmins")) ? JSON.parse(window.localStorage.getItem("enableTAdmins")).typeI : '',
    titlePage: "",
    porcentage: JSON.parse(window.localStorage.getItem("enableTAdmins")) ? JSON.parse(window.localStorage.getItem("enableTAdmins")).porceI : null,
    acciones: JSON.parse(window.localStorage.getItem("enableTAdmins")) ? JSON.parse(window.localStorage.getItem("enableTAdmins")).accI : []
}

