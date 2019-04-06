/* Production Environment */
let env = {
    apiUrl: 'https://tempus-laticrete-app-admin.azurewebsites.net/',
    storeUrl: 'https://tempushomologacao.blob.core.windows.net/homologacao/'
};
let win = window;
win.__env = env;
