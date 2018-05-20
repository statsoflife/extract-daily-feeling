require('dotenv').load();

const util = require('util');
const fs = require('fs-extra');
const _ = require('lodash');
const moment = require('moment');
const GoogleSpreadsheet = require('google-spreadsheet');

const creds = require('./google-generated-creds.json');
const sheetKey = process.env.SHEET_KEY;

const statuses = {
  good_day: +1,
  neutral_day: 0,
  bad_day: -1
};

async function getRows(doc) {
  const info = await util.promisify(doc.getInfo)();
  const sheet = info.worksheets[0];
  const getRows = util.promisify(sheet.getRows);

  let allRows = [];
  let i = 0;
  while(i <= 100) {
    console.log(` - Page ${i + 1}`);
    const offset = i === 0 ? 0 : i * 50 + 1;
    const paginatedRows = await getRows({ offset, limit: 50 });
    if (paginatedRows.length === 0) break;
    allRows = allRows.concat(paginatedRows);
    i++;
  }

  return allRows;
}

async function run() {
  console.log("Authenticating with Google...");
  const doc = new GoogleSpreadsheet(sheetKey);
  await util.promisify(doc.useServiceAccountAuth)(creds);

  console.log("Grabbing row data from spreadsheet...");
  const rows = await getRows(doc);

  const updatedRows = _.map(rows, function(row) {
    return _.extend({}, row, {
      timestamp: moment(row.date, "MMMM D, YYYY [at] hh:mmA").valueOf(),
      status: statuses[row.feeling]
    })
  });

  await fs.outputJson('./output/data/daily-feeling.json', updatedRows, { spaces: 4 });
  console.log("\nDaily feeling data retrived. Please see the output directory");
}

run();
