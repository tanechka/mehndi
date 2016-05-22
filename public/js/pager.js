//создаём конструктор пейджера
function Pager(tableName, pagerSection, itemsPerPage) {
    this.tableName = tableName;
    this.itemsPerPage = itemsPerPage;
    this.pagerSection = pagerSection;
    this.currentPage = 1;
    this.pages = 0;
    this.inited = false;
  }

  //перебираем массив, показывая нужные элементы в качестве параметров с какого по какой блок показываем
  Pager.prototype.showRecords = function(from, to) {
      var rows = document.getElementById(this.tableName).children;
      for (var i = 1; i < rows.length; i++) {
          if (i < from || i > to)
              rows[i].style.display = 'none';
          else
              rows[i].style.display = '';
      }
  }


  Pager.prototype.showPage = function(pageNumber) {
   if (! this.inited) {
    alert("not inited");
    return;
   }
      var oldPageAnchor = document.getElementById('pg'+ this.currentPage);
      oldPageAnchor.className = 'pg-normal';

      this.currentPage = pageNumber;
      var newPageAnchor = document.getElementById('pg' + this.currentPage);
      newPageAnchor.className = 'pg-selected';

      var from = (pageNumber - 1) * this.itemsPerPage + 1;
      var to = from + this.itemsPerPage - 1;
      this.showRecords(from, to);
  }

  Pager.prototype.prev = function() {
      if (this.currentPage > 1)
          this.showPage(this.currentPage - 1);
  }

  Pager.prototype.next = function() {
      if (this.currentPage < this.pages) {
          this.showPage(this.currentPage + 1);
      }
  }

  Pager.prototype.init = function() {
      var rows = document.getElementById(this.tableName).children;
      var records = (rows.length - 1);
      //Math.ceil - возвращает наименьшее целое число, большее, либо равное указанному числу.
      //this.pages - вычисляем количество страниц
      this.pages = Math.ceil(records / this.itemsPerPage);
      this.inited = true;
  }
  Pager.prototype.showPageNav = function(pagerName) {
   if (! this.inited) {
    alert("not inited");
    return;
   }
   var element = document.getElementById(this.pagerSection);

   var pagerHtml = '<li onclick="' + pagerName + '.prev();" class="pg-normal"><a> << </a></li> ';
      for (var page = 1; page <= this.pages; page++)
          pagerHtml += '<li id="pg' + page + '" class="pg-normal" onclick="' + pagerName + '.showPage(' + page + ');"><a>' + page + '</a></li>';
      pagerHtml += '<li onclick="'+ pagerName+'.next();" class="pg-normal"><a> >> </a></li>';

      element.innerHTML = pagerHtml;
  }

function Filter() {
  Pager.apply(this, arguments); // вызываем конструктор суперкласса
  this.portfolioFilter = arguments[2];
}
Filter.prototype = Object.create(Pager.prototype);
Filter.prototype.constructor = Filter;

Filter.prototype.setFilter = function(itemFilter){
  var rows = document.getElementById(this.tableName).children;
  var pagerBlock = document.getElementById(this.pagerSection);
  var current = document.getElementById(itemFilter);
  var ulList = document.getElementById(this.portfolioFilter).children;

  for(var i=0;i< ulList.length; i++)
    ulList[i].className = '';

  current.parentNode.className = 'selected';
  for (var i = 1; i < rows.length; i++) {
      if (itemFilter == 'all'){
        rows[i].style.display = '';
        pagerBlock.style.display = '';
        pagerBlock.children[1].click();
        return;
      }
      if (rows[i].classList.contains(itemFilter)){
        rows[i].style.display = '';
      }else{
        rows[i].style.display = 'none';
      }
      pagerBlock.style.display = 'none';
  }
}
