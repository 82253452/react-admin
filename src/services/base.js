import request from '@/utils/request';

const BASE = '/shop'

export function queryAll(data) {
  return request(`${BASE}/getShopIndex`, { params: data });
}

export function deleteById(id) {
  return request(`${BASE}/delete/${id}`);
}

export function saveOrUpdate(data) {
  return request(`${BASE}/saveOrUpdate`, { method: 'post', data });
}
