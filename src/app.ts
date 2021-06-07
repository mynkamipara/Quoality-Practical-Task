import config from './common/config';
import express from 'express';
import 'reflect-metadata';
import * as path from 'path';
import LoggerInstance from './common/loaders/logger';
import * as l10n from 'jm-ez-l10n';

async function startServer() {
	const app = express();

	/**
	 * A little hack here
	 * Import/Export can only be used in 'top-level code'
	 * Well, at least in node 10 without babel and at the time of writing
	 * So we are using good old require.
	 **/

	 l10n.setTranslationsFile('en', __dirname+'/common/language/translation.en.json');
	 app.use(l10n.enableL10NExpress);
	 
	await require('./common/loaders').default({ expressApp: app });
	app.use(express.static(path.join(__dirname, 'public')));

	app.listen(config.port, config.api_url, (err?:any) => {
		if (err) {
			LoggerInstance.info(err);
			process.exit(1);
			return;
		}
		LoggerInstance.info(`
      ################################################
      🛡️  Server listening on port: ${config.port}   🛡️
      ################################################
    `);
	});
}

startServer();

