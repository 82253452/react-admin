import request from '@/utils/request';
import { DELETE, GET, POST, PUT } from '@/utils/const';

const BASE = '/userInfo';

export function queryAll(data) {
  return request(`${BASE}`, { params: data });
}

export function queryById(id) {
  return request(`${BASE}/${id}`, { method: GET });
}

export function deleteById(id) {
  return request(`${BASE}/${id}`, { method: DELETE });
}

export function update(data) {
  return request(`${BASE}`, { method: PUT, data });
}

export function save(data) {
  return request(`${BASE}`, { method: POST, data });
}
export function getUserInfo(data) {
  return request(`${BASE}/token`, { method: GET, data });
}
