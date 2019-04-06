import { Environment } from "../common/base/env-factory";

/* Production Environment */

let env: Environment = {
  apiUrl: 'https://tempus-laticrete-app-admin.azurewebsites.net/',
  storeUrl: 'https://tempushomologacao.blob.core.windows.net/homologacao/'
}

let win = window as any;

win.__env = env;
