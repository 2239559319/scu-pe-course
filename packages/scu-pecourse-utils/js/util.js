import CryptoJS from 'crypto-js';

/**
 * generate timestamp
 * @return {string}
 */
export function getTimestamp() {
  return Date.parse(new Date().toString()).toString();
}

/**
 * to base64
 * @param str
 */
function base64(str) {
  return CryptoJS.enc.Base64.parse(str).toString(CryptoJS.enc.Hex);
}
/**
 * get app_key
 * constant js is in line 12204 in app.js
 * @return {string}
 */
export function getAppKey() {
  const jt = ['==wn', 'D0g6', '6qYL7', 'qDSn3', 'ZOox4', '6'].join('');
  return base64(jt.split('').reverse().join(''));
}
/**
 * get app_secret
 * @return {string}
 */
export function getAppSecret() {
  const xt = ['fNR', '2q4Z', 'rSde', 'peIr', 'Z9H', 'iUlQ', '=', '='].join('');
  return base64(xt);
}

/**
 * md5 crypto a string to hex
 * @param {string} str
 * @return {string}
 */
function md5(str) {
  return CryptoJS.MD5(str).toString(CryptoJS.enc.Hex);
}
/**
 * generate sign
 * @param {string} path
 * @param {string} appsecret
 * @param {string} timestamp
 * @param {Object} data
 */
export function getSign(path, appsecret, timestamp, data) {
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

export const app_key = getAppKey();
export const app_secret = getAppSecret();
