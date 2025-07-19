import { Email } from '@mui/icons-material';
import KeyIcon from '@mui/icons-material/Key';

export const fields = [
    {
        name: "email",
        label: "Correo",
        type: "email",
        validation: { required: "Campo requerido" },
        startIcon: <Email />,
    },

    {
        name: "password",
        label: "Contraseña",
        type: "password",
        validation: { required: "Campo requerido" },
        startIcon: <KeyIcon />,
    },

    {
        name: "password2",
        label: "Repite la Contraseña",
        type: "password",
        validation: { required: "Campo requerido" },
        startIcon: <KeyIcon />,
    },
];

export const fieldCreate = [
    {
        name: "schoolName",
        label: "Nombre del centro",
        type: "text",
        validation: { required: "Campo requerido" },
        startIcon: null,
    },
    {
        name: "schoolEmail",
        label: "Correo del centro",
        type: "email",
        validation: { required: "Campo requerido" },
        startIcon: null,
    },
    {
        name: "schoolPhone",
        label: "Telefono del centro",
        type: "text",
        validation: { required: "Campo requerido" },
        startIcon: null,
    },
    {
        name: "imagen1",
        label: "El logo del centro",
        type: "file",
        validation: { required: "Campo requerido" },
        startIcon: null,
    },
    {
        name: "schoolCountry",
        label: "Pais",
        type: "select",
        validation: { required: "Selecciona un rol" },
        options: [
            { label: "Guinea Ecuatorial", value: "Guinea Ecuatorial" },
            { label: "Senegal", value: "Senegal" },
        ],
    },
    {
        name: "schoolCity",
        label: "Ciudad",
        type: "text",
        validation: { required: "Campo requerido" },
        startIcon: null,
    },

    {
        name: "schoolAddress",
        label: "Direccion",
        type: "text",
        validation: { required: "Campo requerido" },
        startIcon: null,
    },



];

export const fieldEmail = [

    {
        name: "email",
        label: "Correo",
        type: "email",
        validation: { required: "Campo requerido" },
        startIcon: null,
    },

];

export const fieldUpdatePassword = [

    {
        name: "password",
        label: "Contraseña",
        type: "password",
        validation: { required: "Campo requerido" },
        startIcon: <KeyIcon />,
    },

    {
        name: "password2",
        label: "Repite la Contraseña",
        type: "password",
        validation: { required: "Campo requerido" },
        startIcon: <KeyIcon />,
    },
];