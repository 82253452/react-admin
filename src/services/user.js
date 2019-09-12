import request from '@/utils/request';
const BASE = '/user'

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}

export function list(params) {
  return request(`${BASE}/list`, { params });
}

export function deleteById(id) {
  return request(`${BASE}/delete/${id}`);
}

export function saveOrUpdate(data) {
  return request(`${BASE}/saveOrUpdate`, { method: 'post', data });
}
