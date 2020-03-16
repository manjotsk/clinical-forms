import { fetchAllFormFields, createFormField } from './service.js';

const FormFieldsModel = {
  namespace: 'formFields',
  state: {
    currentUser: {},
  },
  effects: {
    *fetchAllFormFields(_, { call, put }) {
      const response = yield call(fetchAllFormFields);
      yield put({
        type: 'setAvailableFormFields',
        payload: response,
      });
    },
    *createFormField({ payload }, { call, put }) {
      const response = yield call(createFormField,payload);
      yield put({
        type: 'fetchAllFormFields',
        payload: response,
      });
    },
  },
  reducers: {
    setAvailableFormFields(state, action) {
      return { ...state, availableFormFields: action.payload };
    },
  },
};
export default FormFieldsModel;
