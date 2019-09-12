import request from '@/utils/request';

const BASE = '/wexin'

export function getTeacher() {
  return request(`${BASE}/getTeacher`);
}
export function setTeacher(data) {
  return request(`${BASE}/setTeacher`, { method: 'post', data });
}
