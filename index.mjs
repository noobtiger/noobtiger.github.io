import { Table } from './table.mjs';

class Index {
  constructor() {
    this.main();
    this.tableData = [];
    this.addEventListners = this.addEventListners.bind(this);
  }

  main() {
    console.log('Main initialized.');
    this.addEventListners();
  }

  addEventListners() {
    const buildTblBtn = document.getElementById('build-table');
    buildTblBtn.addEventListener('click', (evt) => {
      const startTime = window.performance.now();
      const tableHtml = this.generateTableHtmlUsingJs();
      this.addToTableBody(tableHtml);
      const endTime = window.performance.now();
      this.addBuildTableResults(endTime - startTime);
    });
    const sumTotalsBtn = document.getElementById('calculate-totals');
    sumTotalsBtn.addEventListener('click', (evt) => {
      const startTime = window.performance.now();
      const sumData = this.generateSumUsingJS();
      this.addSumToBody(sumData);
      const endTime = window.performance.now();
      this.addGenTotalsResults(endTime - startTime);
    });
  }

  generateTableHtmlUsingJs() {
    const totalRowsInput = document.getElementById('total-rows-input'); 
    const limitRenderInput = document.getElementById('limit-table'); 
    const table = new Table(Number(totalRowsInput.value) || 10);
    this.tableData = table.data;
    return table.buildHtml(limitRenderInput.checked);
  }

  addToTableBody(tableHtml) {
    const mainTableBody = document.getElementById('table-body');
    mainTableBody.innerHTML = tableHtml;
  }

  generateSumUsingJS() {
    const initialSumArr = Array(this.tableData[0].length).fill(0);
    const sumData = this.tableData.reduce((acc, val) => {
      return val.map((value, index) => {
        return value + acc[index];
      })
    }, initialSumArr);
    return sumData.map((val) => Math.round(val));
  }

  addSumToBody(sumData) {
    const tableTotals = document.getElementById('totals');
    while(tableTotals.firstChild) {
      tableTotals.removeChild(tableTotals.firstChild);
    }
    const totalsFragment = document.createDocumentFragment();
    sumData.forEach((val) => {
      const totalDiv = document.createElement('div');
      totalDiv.classList.add('header-cell');
      totalDiv.textContent = val;
      totalsFragment.appendChild(totalDiv);
    });
    tableTotals.appendChild(totalsFragment);
  }

  addBuildTableResults(time) {
    const tableResultsDiv = document.getElementById('build-table-results');
    const totalRowsInput = document.getElementById('total-rows-input'); 
    const tableRes = document.createElement('div');
    const length = tableResultsDiv.childElementCount;
    tableRes.textContent = `#${length+1} Build Table  (Rows: ${totalRowsInput.value || 10}) Time: ${time}ms `;
    tableResultsDiv.appendChild(tableRes);
  }

  addGenTotalsResults(time) {
    const tableResultsDiv = document.getElementById('build-table-results');
    const totalRowsInput = document.getElementById('total-rows-input'); 
    const tableRes = document.createElement('div');
    const length = tableResultsDiv.childElementCount;
    tableRes.textContent = `#${length+1} Calculate Totals  (Rows: ${totalRowsInput.value || 10}) Time: ${time}ms `;
    tableResultsDiv.appendChild(tableRes);
  }
}

new Index();