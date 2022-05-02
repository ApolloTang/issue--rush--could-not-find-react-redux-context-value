import yn from 'yn';

interface EnvConfig {
  DEBUG: boolean;
  PRODUCTION: boolean;
  ENABLE_REDUX_LOGGER: boolean;

  LOCAL_LOGIN_ENABLED: boolean;
  ALLOW_UNAUTHENTICATED_USERS: boolean;
  USE_MOCK_LOGIN: boolean;

  API_BASE_URL: string;

  GIGYA_BASE_URL: string;
  GIGYA_API_TOKEN: string;
  GIGYA_CLIENT_ID: string;

  LOGOUT_REDIRECT_URL: string;
}

type ServerWindow = Window &
  typeof globalThis & {
    __env__: EnvConfig;
  };

/**
 * Get the given environment variable from the `window.__env__` object.
 *
 * @param name Environment variable name
 */
const getWindowEnv = name => (window as ServerWindow)?.__env__?.[name];

// TODO: the `Dotenv` Webpack plugin does an inline replace of `process.env.<VARNAME>`,
// so there's no good way to streamline this using dotenv.

/** Application debug */
export const DEBUG = yn(getWindowEnv('DEBUG') ?? process.env.DEBUG) ?? false;

/** Production environment */
export const PRODUCTION =
  yn(getWindowEnv('PRODUCTION') ?? process.env.PRODUCTION) ?? false;

/** Enable Redux logger */
export const ENABLE_REDUX_LOGGER =
  yn(getWindowEnv('ENABLE_REDUX_LOGGER') ?? process.env.ENABLE_REDUX_LOGGER) ??
  true;

/** Local login */
export const LOCAL_LOGIN_ENABLED =
  yn(getWindowEnv('LOCAL_LOGIN_ENABLED') ?? process.env.LOCAL_LOGIN_ENABLED) ??
  false;

/** Allow unauthenticated users */
export const ALLOW_UNAUTHENTICATED_USERS =
  yn(
    getWindowEnv('ALLOW_UNAUTHENTICATED_USERS') ??
      process.env.ALLOW_UNAUTHENTICATED_USERS
  ) ?? false;

/** Use mock login process */
export const USE_MOCK_LOGIN =
  yn(getWindowEnv('USE_MOCK_LOGIN') ?? process.env.USE_MOCK_LOGIN) ?? false;

export const API_BASE_URL =
  getWindowEnv('API_BASE_URL') ??
  process.env.API_BASE_URL ??
  'http://localhost:3000/api';

/** Gigya base URL */
export const GIGYA_BASE_URL =
  getWindowEnv('GIGYA_BASE_URL') ??
  process.env.GIGYA_BASE_URL ??
  'GIGYA_BASE_URL_FIXME';

/** Gigya API token */
export const GIGYA_API_TOKEN =
  getWindowEnv('GIGYA_API_TOKEN') ??
  process.env.GIGYA_API_TOKEN ??
  'GIGYA_API_TOKEN_FIXME';

/** Gigya client ID */
export const GIGYA_CLIENT_ID =
  getWindowEnv('GIGYA_CLIENT_ID') ??
  process.env.GIGYA_CLIENT_ID ??
  'GIGYA_CLIENT_ID_FIXME';

/** Logout redirect URL */
export const LOGOUT_REDIRECT_URL =
  getWindowEnv('LOGOUT_REDIRECT_URL') ?? process.env.LOGOUT_REDIRECT_URL ?? '/';

/** Analytic environments */
export const ANALYTIC_LAUNCH_URL =
  getWindowEnv('ANALYTIC_LAUNCH_URL') ??
  process.env.ANALYTIC_LAUNCH_URL ??
  'ANALYTIC_LAUNCH_URL_UNDEFINED';

/** Analytic environments */
export const BUILD_VERSION =
  getWindowEnv('BUILD_VERSION') ??
  process.env.BUILD_VERSION ??
  'build version not available';

export const BUILD_DATE =
  getWindowEnv('BUILD_DATE') ??
  process.env.BUILD_DATE ??
  'build date not available';

/** App environment configuration */
export default {
  DEBUG,
  PRODUCTION,
  ENABLE_REDUX_LOGGER,

  LOCAL_LOGIN_ENABLED,
  ALLOW_UNAUTHENTICATED_USERS,
  USE_MOCK_LOGIN,

  API_BASE_URL,

  GIGYA_BASE_URL,
  GIGYA_API_TOKEN,
  GIGYA_CLIENT_ID,

  LOGOUT_REDIRECT_URL,
};
