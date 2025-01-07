import axios from 'axios';

const http = axios.create({
  baseURL: 'http://211.83.159.5:8086',
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0 WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
  },
});

http.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
export default http;
