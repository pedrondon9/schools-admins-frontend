export const InitialState = {
  dataUser: JSON.parse(window.localStorage.getItem('enableTAdmins'))
    ? JSON.parse(window.localStorage.getItem('enableTAdmins'))
    : {
        login: false,
        loginId: '',
        logo: '',
        loginName: '',
        loginToken: '',
        titlePage: '',
        schoolTenant: '',
        schoolName: '',
        schoolLogo: '',
        schoolId: '',
        schoolCode: '',
        schoolPhone: '',
        schoolEmail: '',
        schoolAddress: '',
        schoolCity: '',
        schoolCountry: '',
      },
  dataEditUser: {},
  typeUserSelected: '',
  editCourseId: null,
  editEspecialitiesId: null,
  editEventId: null,
  dataUserSelected: null,
  courseCategory: null,
};
