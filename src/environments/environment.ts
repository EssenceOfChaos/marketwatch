// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  SANDBOX_API: 'https://sandbox.iexapis.com/stable',
  IEX_BASE_URL: 'https://cloud.iexapis.com/stable',
  PORTFOLIO_URI: 'http://localhost:3000/portfolios',
  IEX_TEST_TOKEN: 'Tpk_e370cc9230a611e9958142010a80043c',
  IEX_DEV_TOKEN: 'pk_40c6c71966a445cca7038a5445fd54a0'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
