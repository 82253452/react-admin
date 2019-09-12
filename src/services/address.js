import request from '@/utils/request';

const BASE = '/address'

export function queryAll(data) {
  return request(`${BASE}/list/tree`, { params: data });
}

export function deleteById(id) {
  return request(`${BASE}/delete/${id}`);
}

export function saveOrUpdate(data) {
  return request(`${BASE}/saveOrUpdate`, { method: 'post', data });
}
