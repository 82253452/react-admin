import { queryAll, queryById, deleteById, update, save } from '@/services/book';

const UserModel = {
  namespace: 'book',
  state: {
    list: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryAll);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *query({ payload }, { call, put }) {
      const response = yield call(queryById(payload));
      return response.data;
    },

    *delete({ payload }, { call, put }) {
      yield call(deleteById(payload));
    },

    *save({ payload }, { call, put }) {
      yield call(save(payload));
    },

    *update({ payload }, { call, put }) {
      yield call(update(payload));
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, list: action.payload.data.list || [] };
    },
  },
};
export default UserModel;
