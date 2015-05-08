var koa    = require('koa');
var router = require('koa-router');
var app    = koa();

app.use(router(app));

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

// logger
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.get('/ping', function *(next) {
	this.body = 'HEALTHY';
	this.status = 200;
	yield next;
});

console.log('## Listening on port 3000');

app.listen(3000);