const LIMIT_RENDER_NUMBER = 20;

export class Table {
  constructor(maxRows) {
    maxRows = maxRows || 10;
    this.data = this.generateData(maxRows);
  }

  generateData(maxRows) {
    const output = Array(maxRows).fill(null).map((val, index) => {
      const randomOne = Number(Math.random().toFixed(2));
      const randomTen = Math.floor(Math.random() * 10);
      const randomHundred = Math.floor(Math.random() * 100);
      const randomNegTen = Math.floor(Math.random() * 21) - 10;
      const randomNegHundred = Math.floor(Math.random() * 201) - 100;
      return [randomOne, randomTen, randomHundred, randomNegTen, randomNegHundred];
    });
    return output;
  }

  buildHtml(limitRender) {
    const data = this.data.slice(0, limitRender ? LIMIT_RENDER_NUMBER : this.data.length);
    const htmlRows = data.map((val) => {
      const htmlElements = val.map(randomValue => {
        return `<div>${randomValue}</div>`
      });
      return `<article class="table-row">${htmlElements.join('')}</article>`
    });
    return htmlRows.join('');
  }
}

export function calculateTotal(tableData) {
  const initialSumArr = Array(tableData[0].length).fill(0);
  const sumData = tableData.reduce((acc, val) => {
    return val.map((value, index) => {
      return value + acc[index];
    })
  }, initialSumArr);
  return sumData.map((val) => Math.round(val));
}