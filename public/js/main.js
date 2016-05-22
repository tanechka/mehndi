//инициализация пейджера
 var pager = new Pager('portfolio-items', 'portfolio-filter-nav', 7);
 pager.init();
 pager.showPageNav('pager');
 pager.showPage(1);

//инициализация фильтров
var filter = new Filter('portfolio-items', 'portfolio-filter-nav', 'portfolio-filter');

//скроллинг меню
var linkNav = document.querySelectorAll('[href^="#nav"]'),
    V = 0.5;  // скорость
for (var i = 0; i < linkNav.length; i++) {
  linkNav[i].onclick = function(){
    var w = window.pageYOffset,
        hash = this.href.replace(/[^#]*(.*)/, '$1');
        t = document.querySelector(hash).getBoundingClientRect().top,
        start = null;
    requestAnimationFrame(step);
    function step(time) {
      if (start === null) start = time;
      var progress = time - start,
          r = (t < 0 ? Math.max(w - progress/V, w + t ) : Math.min(w + progress/V, w + t));
      window.scrollTo(0, r);
      if (r !== w + t) { requestAnimationFrame(step) } else { location.hash = hash }
    }
    return false;
  }
}

//добавить меню эффект
window.onscroll = function() {
  setActiveClass();
}

function setActiveClass(){
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  scrolled > 80 ? document.getElementsByTagName("html")[0].className = 'active': document.getElementsByTagName("html")[0].className = '';
}
setActiveClass();
