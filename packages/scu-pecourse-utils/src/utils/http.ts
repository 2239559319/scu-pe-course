import * as CryptoJS from 'crypto-js';

function md5(str) {
  return CryptoJS.MD5(str).toString(CryptoJS.enc.Hex);
}

export function getSign({
  path,
  appsecret,
  timestamp,
  data,
}: {
  path: string;
  appsecret: string;
  timestamp: string;
  data?: any;
}) {
  const i = [];
  let str = appsecret + path;
  if (data) {
    for (const key in data) i.push(key);
    i.sort();
    for (const key of i) str += key + data[key];
  }
  str += timestamp + ' ' + appsecret;
  return md5(str);
}
