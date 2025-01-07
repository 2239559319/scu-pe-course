import * as CryptoJS from 'crypto-js';
import { jwt_secret } from './constants';

export function createJWT(
  header: any,
  payload: Record<string, string | number>,
  secret: string
) {
  const encodedHeader = CryptoJS.enc.Base64url.stringify(
    CryptoJS.enc.Utf8.parse(JSON.stringify(header))
  );
  const encodedPayload = CryptoJS.enc.Base64url.stringify(
    CryptoJS.enc.Utf8.parse(JSON.stringify(payload))
  );
  const signatureBase = `${encodedHeader}.${encodedPayload}`;

  const signature = CryptoJS.HmacSHA256(signatureBase, secret);
  const encodedSignature = CryptoJS.enc.Base64url.stringify(signature);

  return `${signatureBase}.${encodedSignature}`;
}

export function createNBFAndExp() {
  const nbf = Math.floor(new Date().getTime() / 1000);
  const exp = nbf + 172800;
  return {
    nbf,
    exp,
  };
}

export function createScuPeJWT({
  id,
  exp,
  nbf,
}: {
  id: string;
  exp: number;
  nbf: number;
}) {
  const header = {
    typ: 'JWT',
    alg: 'HS256',
  };
  const secret = jwt_secret;
  const payload = {
    role: '1',
    name: id,
    userid: id,
    iss: 'restapiuser',
    aud: secret,
    exp,
    nbf,
  };

  return createJWT(header, payload, secret);
}
