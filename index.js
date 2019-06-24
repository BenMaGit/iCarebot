const linebot = require('linebot');

const bot = linebot({
    channelId: '1591861988',
    channelSecret: '760b25e4be02883716fa8608803220d6',
    channelAccessToken: 'zr2GguG/HT18L9uoCoQkGoMXx8nVG4zXI4gFnRZEfMw5S1VRL0L8Lg4mwpNWEvZeirwXWMaItTHSCNIPVraMwxA4UCeLBqWJ4nf3G2AawST0rq4sJGA5JycW8CAVmzBQPaBeDUMudsGoGwIqCYtUowdB04t89/1O/w1cDnyilFU='
})

bot.on('message', function (event) {
    // event.message.text是使用者傳給bot的訊息
    // 使用event.reply(要回傳的訊息)方法可將訊息回傳給使用者
    event.reply(event.message.text).then(function (data) {
      // 當訊息成功回傳後的處理
    }).catch(function (error) {
      // 當訊息回傳失敗後的處理
    });
  });

  bot.listen('/linewebhook', 3000, function () {
    console.log('[BOT已準備就緒]');
});