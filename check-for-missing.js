const data = require('./output/data/daily-feeling.json');

const firstDate = data[0].timestamp;
const oneDay = 24*60*60*1000;
const missing = [];
data.forEach(function (datum, index) {
  const expectedDate = new Date(firstDate + index * oneDay).toISOString().split('T')[0];
  const receivedDate = new Date(datum.timestamp).toISOString().split('T')[0]
  if (expectedDate !== receivedDate) {
    missing.push(datum);
  }
});
console.log(missing);
