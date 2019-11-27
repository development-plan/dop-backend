import { expect } from 'chai';
import supertest from 'supertest';
import app from '../src/app';

const testUser = {
  email: 'test@example.com',
  image: 'https://github.com/junhoyeo.png',
  name: '여준호',
  nickname: '주노',
  password: 'pa$$w0Rd',
  tel: '01012345678',
};

describe('auth.test', () => {
  const req = supertest(app);

  it('POST /auth/join', async () => {
    const res = await req
      .post('/auth/join')
      .send(testUser)
      .expect(200);
    expect(res.body.id).to.be.a('string');
  });

  it('POST /auth/login', async () => {
    const { email, password } = testUser;
    const res = await req
      .post('/auth/login')
      .send({ email, password })
      .expect(200);
    expect(res.body.token).to.be.a('string');
  });
});
