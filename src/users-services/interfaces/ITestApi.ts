import { Container } from 'typedi';
import Logger from '../../common/loaders/logger';
import status_code from '../../common/utils/statusCode';
import * as l10n from 'jm-ez-l10n';

export class ITestApi {
	static async getUserList() {
		try {
			
			return { status: status_code.OK, message: l10n.t('GET_SUCCESS', { key: '' }) };
		} catch (error) {
			Logger.errorAndMail(error);
			return { status: status_code.INTERNAL_SERVER_ERROR, message: l10n.t('SOMETHING_WENT_WRONG') };
		}
	}

	

	
}
