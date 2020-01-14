// import React, { useState } from 'react'
// import { createContainer } from 'unstated-next'
// import { queryAll } from '../services/tag'
//
// function useData() {
//   return useState({
//     list: [],
//   })
// }
//
// const Data = createContainer(useData)
//
// export function useTag() {
//   const [state, setState] = Data.useContainer()
//   const fetch = param => {
//     queryAll(param).then(res => setState({ ...state, list: res.data.list }))
//   }
//   return { state, fetch }
// }

import { queryAll, queryById, deleteById, update, save } from '@/services/book';
import { useState } from 'react';
import { createContainer } from 'unstated-next';

const UserModel = {
  namespace: 'tagsd',
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
