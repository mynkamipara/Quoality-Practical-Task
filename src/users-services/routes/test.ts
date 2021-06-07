import { Router, Request, Response } from 'express';

import { ITestApi } from '../interfaces/ITestApi';
import Logger from '../../common/loaders/logger';
import status_code from '../../common/utils/statusCode';
import * as l10n from 'jm-ez-l10n';

const route = Router();

export default (app: Router) => {
	app.use('/test', route);

	//all Routes of '/countries'
	route.get('/', getUserList);
};

async function getUserList(req: Request, res: Response) {
	ITestApi.getUserList()
		.then(response => {
			res.status(response.status).json(response);
		})
		.catch(e => {
			Logger.errorAndMail(e);
			res.status(status_code.INTERNAL_SERVER_ERROR).json({ status: status_code.INTERNAL_SERVER_ERROR, message:l10n.t('SOMETHING_WENT_WRONG') });
		});
}