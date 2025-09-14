import { TITLEPAGE, DATA_USER, DATA_EDIT_USER, TYPE_USER_SELECTED, DATA_EDIT_COURSE, COURSE_CATEGORY, ESPECILITIES_EDIT_ID, EVENT_EDIT_ID } from './constantesVar';

const AppReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
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
