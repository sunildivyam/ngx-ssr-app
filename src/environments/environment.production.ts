import { appConfig } from '../app/constants/app.config.production';
import { dashboardConfig } from '../app/constants/dashboard.config.production';
import { firebaseConfig } from '../app/constants/firebase.config.production';
import { openaiConfig } from '../app/constants/openai.config.production';
import { production as keyConf } from '../../.secrets/secrets';

firebaseConfig.app.apiKey = keyConf.firebaseKey;
openaiConfig.apiKey = keyConf.openAIOrg;
openaiConfig.organization = keyConf.openAIOrg;

const config = {
  ...appConfig,
  firebase: firebaseConfig,
  openai: openaiConfig,
  dashboard: dashboardConfig
};

export const environment = {
  development: false,
  staging: false,
  production: true,
  envConfiguration: 'production Configuration',
  appConfig: config
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
