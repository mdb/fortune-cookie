var fortunes = require('./fortunes')(),
    Integrator = require('slack-integrator');

var fortuneCookie = new Integrator({
  payload: function (req, callback) {
    callback({
      text: '@' + req.body.user_name + '...\n' + getFortune(),
      username: 'Fortune Cookie',
      channel: req.body.channel_id,
      icon_emoji: ':smiley:'
    });
  },

  hookPath: process.env.INCOMING_WEBHOOK_PATH
});

function getFortune(text) {
  var randomIndex = Math.floor(Math.random() * (fortunes.length - 1));

  return fortunes[randomIndex];
}

module.exports = fortuneCookie;
