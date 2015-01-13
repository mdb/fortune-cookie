var fortunes = require('./fortunes')(),
    request = require('request');

module.exports = function (req, res, next) {
  var botPayload = {
        text: '@' + req.body.user_name + '...\n' + getFortune(),
        username: 'Fortune Cookie',
        channel: req.body.channel_id,
        icon_emoji: ':smiley:'
      };

  send(botPayload, function (error, status, body) {
    if (error || req.body.token !== process.env.SLACK_TOKEN) {
      return next(error);
    } else if (status !== 200) {
      return next(new Error('Incoming WebHook: ' + status + ' ' + body));
    } else {
      return res.status(200).end();
    }
  });
};

function getFortune(text) {
  var randomIndex = Math.floor(Math.random() * (fortunes.length - 1));

  return fortunes[randomIndex];
}

function send (payload, callback) {
  var path = process.env.INCOMING_WEBHOOK_PATH,
      uri = 'https://hooks.slack.com/services' + path;

  request({
    uri: uri,
    method: 'POST',
    body: JSON.stringify(payload)
  }, function (error, response, body) {
    if (error) {
      return callback(error);
    }

    callback(null, response.statusCode, body);
  });
}
