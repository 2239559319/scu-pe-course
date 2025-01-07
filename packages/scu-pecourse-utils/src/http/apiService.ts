import { app_key, getSign, app_secret, getTimestamp } from '../utils';

export class ApiService {
  url = 'http://211.83.159.5:8086';
  headers: Record<string, string> = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0 WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
    Origin: 'http://211.83.159.5:81',
    Referer: 'http://211.83.159.5:81/',
  };
  constructor(token?: string) {
    if (token) {
      this.initAuth(token);
    }
  }

  initAuth(token: string) {
    this.headers.Authorization = `bearer ${token}`;
  }

  async get({ path, params }: { path: string; params?: any }) {
    const url = `${this.url}${path}`;
    const timestamp = getTimestamp();
    const query = {
      app_key,
      timestamp,
      sign: getSign({
        path,
        appsecret: app_secret,
        timestamp,
      }),
      ...params,
    };

    const qs = new URLSearchParams(query).toString();

    const req = await fetch(`${url}?${qs}`, {
      method: 'GET',
      headers: {
        ...this.headers,
      },
    });
    return req.json();
  }

  async post({
    path,
    params,
    data,
  }: {
    path: string;
    params?: any;
    data: any;
  }) {
    const url = `${this.url}${path}`;
    const timestamp = getTimestamp();
    const query = {
      app_key,
      timestamp,
      sign: getSign({
        path,
        appsecret: app_secret,
        timestamp,
        data,
      }),
      ...params,
    };

    const req = await fetch(`${url}`, {
      headers: {
        ...this.headers,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      body: new URLSearchParams(query).toString(),
    });
    return req.json();
  }
}

export const apiService = new ApiService();
