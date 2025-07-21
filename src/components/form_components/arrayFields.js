import { Email } from '@mui/icons-material';
import KeyIcon from '@mui/icons-material/Key';

export const fields = [
  {
    name: 'email',
    label: 'Correo',
    type: 'email',
    validation: { required: true },
    startIcon: <Email />,
  },

  {
    name: 'password',
    label: 'Contraseña',
    type: 'password',
    validation: { required: true },
    startIcon: <KeyIcon />,
  },

  {
    name: 'password2',
    label: 'Repite la Contraseña',
    type: 'password',
    validation: { required: true },
    startIcon: <KeyIcon />,
  },
];

export const fieldCreate = [
  {
    name: 'name',
    label: 'Nombre del centro',
    type: 'text',
    validation: { required: true },
    startIcon: null,
  },
  {
    name: 'email',
    label: 'Correo del centro',
    type: 'email',
    validation: { required: true },
    startIcon: null,
  },
  {
    name: 'phone',
    label: 'Telefono del centro',
    type: 'text',
    validation: { required: true },
    startIcon: null,
  },
  {
    name: 'imagen1',
    label: 'El logo del centro',
    type: 'file',
    validation: { required: true },
    startIcon: null,
  },
  {
    name: 'country',
    label: 'Pais',
    type: 'select',
    validation: { required: 'Selecciona un rol' },
    options: [
      { label: 'Guinea Ecuatorial', value: 'Guinea Ecuatorial' },
      { label: 'Senegal', value: 'Senegal' },
    ],
  },
  {
    name: 'city',
    label: 'Ciudad',
    type: 'text',
    validation: { required: true },
    startIcon: null,
  },

  {
    name: 'address',
    label: 'Direccion',
    type: 'text',
    validation: { required: true },
    startIcon: null,
  },
];

export const fieldEmail = [
  {
    name: 'email',
    label: 'Correo',
    type: 'email',
    validation: { required: true },
    startIcon: null,
  },
];

export const fieldUpdatePassword = [
  {
    name: 'password',
    label: 'Contraseña',
    type: 'password',
    validation: { required: true },
    startIcon: <KeyIcon />,
  },

  {
    name: 'password2',
    label: 'Repite la Contraseña',
    type: 'password',
    validation: { required: true },
    startIcon: <KeyIcon />,
  },
];
