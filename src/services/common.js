import request from '@/utils/request';

const BASE = '/common'

export function geToken() {
  return request(`${BASE}/getQiniuToken`);
}
