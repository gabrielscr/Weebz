const fs = require('fs');

fs.copyFile('.\\src\\env\\env-prod.ts', '.\\src\\env\\index.ts', (err) => {
  if (err) throw err;
});
