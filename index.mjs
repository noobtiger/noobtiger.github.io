import { Table } from './table.mjs';

class Index {
  constructor() {
    this.main();
    this.tableInstance = null;
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
      this.addTableResuls(endTime - startTime, 'Build table');
    });

    const sumTotalsBtn = document.getElementById('calculate-totals');
    sumTotalsBtn.addEventListener('click', (evt) => {
      const startTime = window.performance.now();
      const sumData = this.generateSumUsingJS();
      this.addSumToBody(sumData);
      const endTime = window.performance.now();
      this.addTableResuls(endTime - startTime, 'Calculate Totals');
    });

    const sortBtn = document.getElementById('sort-column');
    sortBtn.addEventListener('click', (evt) => {
      const startTime = window.performance.now();
      if(sortBtn.value.includes('ASC')) {
        sortBtn.value = sortBtn.value.replace('ASC', 'DSC');
        this.sortDataUsingJs(true);
      } else {
        sortBtn.value = sortBtn.value.replace('DSC', 'ASC');
        this.sortDataUsingJs(false);
      }
      const tableHtml = this.generateTableHtmlUsingJs();
      this.addToTableBody(tableHtml);
      const endTime = window.performance.now();
      this.addTableResuls(endTime - startTime, 'Sort and rebuild table');
    });

    const totalRowsInput = document.getElementById('total-rows-input');
    totalRowsInput.addEventListener('change', (evt) => {
      this.tableInstance = null;
    });
  }

  generateTableHtmlUsingJs() {
    const totalRowsInput = document.getElementById('total-rows-input'); 
    const limitRenderInput = document.getElementById('limit-table');
    if(!this.tableInstance) {
      this.tableInstance = new Table(Number(totalRowsInput.value) || 10);
    }
    return this.tableInstance.buildHtml(limitRenderInput.checked);
  }

  addToTableBody(tableHtml) {
    const mainTableBody = document.getElementById('table-body');
    mainTableBody.innerHTML = tableHtml;
  }

  generateSumUsingJS() {
    return this.tableInstance.calculateTotal();
  }

  sortDataUsingJs(isAscending) {
    this.tableInstance.sortData(isAscending);
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

  addTableResuls(time, type) {
    const tableResultsDiv = document.getElementById('build-table-results');
    const totalRowsInput = document.getElementById('total-rows-input'); 
    const tableRes = document.createElement('div');
    const length = tableResultsDiv.childElementCount;
    tableRes.textContent = `#${length+1} ${type}  (Rows: ${totalRowsInput.value || 10}) Time: ${time}ms `;
    tableResultsDiv.appendChild(tableRes);
  }
}

new Index();