process.env.INCOMING_WEBHOOK_PATH = 'fakePath';

var request = require('supertest'),
    nock = require('nock'),
    proxyquire = require('proxyquire'),
    fortuneCookie = proxyquire('../fortune_cookie', { './fortunes' : function() {
      return ['fake fortune'] }
    });

describe('GET /', function() {
  it('returns "Hello world!"', function(done) {
    request(fortuneCookie.app)
      .get('/')
      .expect(200, 'Hello world!', done);
  });
});

describe('POST /integration', function() {
  describe('when the service exists', function() {
    it('returns the properly URL', function(done) {
      var slack = nock('https://hooks.slack.com')
        .post('/services/fakePath', {
          username: 'Fortune Cookie',
          channel: 'channel id',
          icon_emoji: ':smiley:',
          text: '@user...\nfake fortune'
        })
        .reply(200);

      request(fortuneCookie.app)
        .post('/integration')
        .send({
          user_name: 'user',
          channel_id: 'channel id'
        })
        .expect(200, done);
    });
  });
});
