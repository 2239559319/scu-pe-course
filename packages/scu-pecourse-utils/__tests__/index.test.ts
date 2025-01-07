import { jwt_secret, app_key, app_secret, createScuPeJWT } from '../src';

describe('test constants', () => {

  it('test jwt_secret', () => {
    expect(jwt_secret).toBe('098f6bcd4621d373cade4e832627b4f6');
  });

  it('test app_key', () => {
    expect(app_key).toBe('eb8c68399de7483abb2d8abaea0d039f');
  });

  it('test app_secret', () => {
    expect(app_secret).toBe('7cd476ab866b49d7a9788ad9f4789495');
  });

});

describe('test jwt', () => {
  it('test jwt1', () => {
    const id = '0000000000000';
    const exp = 1736401436;
    const nbf = 1736228636;

    const jwtToken = createScuPeJWT({ id, exp, nbf });

    const rightToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiMSIsIm5hbWUiOiIwMDAwMDAwMDAwMDAwIiwidXNlcmlkIjoiMDAwMDAwMDAwMDAwMCIsImlzcyI6InJlc3RhcGl1c2VyIiwiYXVkIjoiMDk4ZjZiY2Q0NjIxZDM3M2NhZGU0ZTgzMjYyN2I0ZjYiLCJleHAiOjE3MzY0MDE0MzYsIm5iZiI6MTczNjIyODYzNn0.mPK2ciBvEaKn2yA0MkT7hKNYkwCzfTO2wD0hSqh7U_4';

    expect(jwtToken).toBe(rightToken);
  });

  it('test jwt2', () => {
    const id = '1111111111111';
    const exp = 1736401436;
    const nbf = 1736228636;

    const jwtToken = createScuPeJWT({ id, exp, nbf });

    const rightToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiMSIsIm5hbWUiOiIxMTExMTExMTExMTExIiwidXNlcmlkIjoiMTExMTExMTExMTExMSIsImlzcyI6InJlc3RhcGl1c2VyIiwiYXVkIjoiMDk4ZjZiY2Q0NjIxZDM3M2NhZGU0ZTgzMjYyN2I0ZjYiLCJleHAiOjE3MzY0MDE0MzYsIm5iZiI6MTczNjIyODYzNn0.KFiRFmnuVXGZFS8Xia5cpe1xolVQUldpTWxlORLY2HU';

    expect(jwtToken).toBe(rightToken);
  });
});
