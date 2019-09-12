import request from '@/utils/request';

const BASE = '/privilege'

export function queryAll() {
  return request(`${BASE}/info`);
}
