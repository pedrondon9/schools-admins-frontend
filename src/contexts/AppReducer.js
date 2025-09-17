/**
 * Reducer para manejar el estado de la aplicación.
 *
 * @param {Object} state - El estado actual de la aplicación.
 * @param {Object} action - La acción que se va a procesar.
 * @param {string} action.type - El tipo de acción a ejecutar.
 * @param {any} action.payload - Los datos asociados a la acción.
 * @returns {Object} - El nuevo estado de la aplicación.
 *
 * Casos manejados:
 * - USER_SELECTED: Actualiza el usuario seleccionado.
 * - TITLEPAGE: Actualiza el título de la página.
 * - DATA_EDIT_USER: Actualiza los datos del usuario en edición.
 * - TYPE_USER_SELECTED: Actualiza el tipo de usuario seleccionado.
 * - DATA_USER: Actualiza los datos del usuario.
 * - DATA_EDIT_COURSE: Actualiza el ID del curso en edición.
 * - COURSE_CATEGORY: Actualiza la categoría del curso.
 * - EVENT_EDIT_ID: Actualiza el ID del evento en edición.
 * - ESPECILITIES_EDIT_ID: Actualiza el ID de las especialidades en edición.
 * - default: Retorna el estado actual sin cambios.
 */
import {
  TITLEPAGE,
  DATA_USER,
  DATA_EDIT_USER,
  TYPE_USER_SELECTED,
  DATA_EDIT_COURSE,
  COURSE_CATEGORY,
  ESPECILITIES_EDIT_ID,
  EVENT_EDIT_ID,
  EDIT_STUDENT,
  USER_SELECTED,
} from './constantesVar';

const AppReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case USER_SELECTED:
      return {
        ...state,
        dataUserSelected: payload,
      };
    case TITLEPAGE:
      return {
        ...state,
        titlePage: payload,
      };
    case DATA_EDIT_USER:
      return {
        ...state,
        dataEditUser: payload,
      };
    case TYPE_USER_SELECTED:
      return {
        ...state,
        typeUserSelected: payload,
      };
    case DATA_USER:
      return {
        ...state,
        dataUser: {
          ...state.dataUser,
          ...payload,
        },
      };
    case DATA_EDIT_COURSE:
      return {
        ...state,
        editCourseId: payload,
      };
    case COURSE_CATEGORY:
      return {
        ...state,
        courseCategory: payload,
      };
    case EVENT_EDIT_ID:
      return {
        ...state,
        editEventId: payload,
      };
    case ESPECILITIES_EDIT_ID:
      return {
        ...state,
        editEspecialitiesId: payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
