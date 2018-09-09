/***
 * application的启动入口文件
 */
const express = require('express');
const engine = require('./utils/engine');
const routes = require('./routes/config');
const database = require('./utils/database');
const middleware = require('./utils/middleware');
const app = express();

// 配置静态文件请求.
app.use('/public', express.static(__dirname + '/public'))

// 配置模板引擎.
engine.config(app);

// 配置中间件
middleware.config(app);

// 配置路由.
routes.config(app);

// 配置数据库.
database.config().then(() => {
	// 监听http请求.
	app.listen(80);
});