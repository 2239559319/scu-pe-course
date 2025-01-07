import * as CryptoJS from 'crypto-js';

function base64(str) {
  return CryptoJS.enc.Base64.parse(str).toString(CryptoJS.enc.Hex);
}

function getAppKey() {
  const jt = ['==wn', 'D0g6', '6qYL7', 'qDSn3', 'ZOox4', '6'].join('');
  return base64(jt.split('').reverse().join(''));
}

function getAppSecret() {
  const xt = ['fNR', '2q4Z', 'rSde', 'peIr', 'Z9H', 'iUlQ', '=', '='].join('');
  return base64(xt);
}

export const app_key = getAppKey();
export const app_secret = getAppSecret();

export const jwt_secret = '098f6bcd4621d373cade4e832627b4f6';
