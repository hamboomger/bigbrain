import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../src/server';
import User from '../../../../src/server/model/user';
import request from '../../../util/request';

chai.use(chaiHttp);

describe('POST /api/register-local', () => {
  const user = {
    name: 'test name',
    email: 'testEmail',
    password: 'password',
  };
  afterEach(async () => {
    await User.deleteMany({});
  });
  it('should register user', async () => {
    const response = await request.post('/api/register-local')
      .type('form')
      .send(user);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.keys(['_id', 'name', 'email']);
  });
  it('should fail because of fields missing', async () => {
    const response = await chai.request(app)
      .post('/api/register-local')
      .type('form')
      .send({});
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.be.eql({
      error: 'Bad Request',
      errors: [
        'email field is missing',
        'email field should be a string',
        'password field is missing',
        'password field should be a string',
      ],
      message: 'Multiple validation errors',
      success: false,
    });
  });
});
