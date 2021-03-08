const SSE = require('sse');
// const { processing } = require('./apis/Converter');
module.exports = server => {
  const sse = new SSE(server);
  sse.on('connection', client => {
    setInterval(() => {
      if(typeof global.processing === 'number')
        client.send(global.processing.toString());
      else {
        client.send(global.processing);
        global.processing = 0;
      }
    }, 500);
  });
}