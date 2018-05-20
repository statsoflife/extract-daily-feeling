# Daily feeling extractor

Extract your daily feeling data from Google sheets.

## Data format

The extractor expects a Google Sheet containing two columns, the first being the date and the second being the feeling. The first row is expected to be the column names, with the first column named "date" and the second column named "feeling". Dates in the first column should be in the format "`February 10, 2018 at 09:00PM`". Values in the second column should be one of these values; `good_day`, `neutral_day` or `bad_day`.

## Steps

Before you start, don't forget to install dependencies with `npm install`

1. Go to https://developers.google.com/sheets/api/quickstart/nodejs
2. Follow some of the instructions, but look to create a "service account" set of credentials, as detailed in these out of date instructions https://www.npmjs.com/package/google-spreadsheet#service-account-recommended-method
3. Move the downloaded JSON file of credentials into this directory and rename to `google-generated-creds.json`
4. Create a `.env` file with the ID of the sheet (the long part of the URL when viewing the sheet), under the variable name `SHEET_KEY`
5. Time to get some data - use `npm start` to kick off the script
6. If it's all working, you'll get an `output` directory created with a single JSON file containing the data for each row
