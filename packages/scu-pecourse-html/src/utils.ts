import { Api, ApiService } from '@xiaochuan-dev/scu-pecourse-utils';

export const apiService = new ApiService();
export const api = new Api(apiService);

export function isLogined() {
  const token = localStorage.getItem('token');

  if (token) {
    apiService.initAuth(token);
    return true;
  }
  return false;
}

export async function login(username, password, callback) {
  const res = await api.login({ username, password, apiService });

  if (res?.token) {
    const { token } = res;
    apiService.initAuth(token);
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    callback(true);
  } else {
    callback(false);
  }
}

export function logout() {
  apiService.initAuth('');
  localStorage.removeItem('token');
  localStorage.removeItem('username');
}
