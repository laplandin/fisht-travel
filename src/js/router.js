const PageTransitions = require("./pageTrasitions/js/pagetransitions");
const List = require("./libs/List");

class Router {

  constructor () {
    this.historyUrl = '';
    this.urlList = new List();
    this.pending = false;
  }

  init () {
    let self = this;
    if (!History.enabled) {
     $("a[router-link]").each((index, link) => {
       let fallbackHref = $(link).attr("href") + ".html";
       $(link).attr("href", fallbackHref);
     })
    }
    History.Adapter.bind(window, "statechange", function() {
      let state = History.getState();
      let requestedUrl = state.hash;
      if (self.urlList.find(requestedUrl) < 0) {
        if (self.pending) return; // branch for navigation via router-link attribute
        window.location.reload();
      }
      if (self.urlList.find(requestedUrl)  < self.urlList.pos && self.urlList.find(requestedUrl) >= 0) { // handle back and forward navigation
        if (!self.urlList.length) document.location.reload();
        self.prevPage();
      } else {
        self.forwardPage();
      }
    });
    this._setHistory();
    this._setHandlers();
  }

  _setHandlers () {
    let links = $("a[router-link]");
    let self = this;
    let currentUrl = self.historyUrl || window.location.pathname;
    currentUrl = (/^\/$/.test(currentUrl)) ? currentUrl : `/${currentUrl}`;

    links.removeClass('main-nav__link--active');
    let re = /\//gi;
    let matchedHref = currentUrl.replace(re, '').replace('.html', '');
    let selector = `.pt-page-current a[router-link][href='${matchedHref}']`;
    $(selector).addClass('main-nav__link--active');

    links.mousedown(function(e){
      switch(e.which)
      {
        case 1:
          e.preventDefault();
          self.pending = true;
          let url = $(this).attr("href");
          if (`${currentUrl}` === `/${url}.html`) return; // Handle click for same route
          self._loadPage(url);
          break;
        case 2:
          e.preventDefault();
          window.open(`${window.location.origin}/${$(this).attr('href')}.html`, '_blank');
          break;
        case 3:
          break;
      }
      return true
    });
  }

  /**
   *
   * @param href "String"
   * @private
   */
  _loadPage (href) {
    let self = this;
    let url = `${href}.tmp.html`;
    self.historyUrl = `${href}.html`;
    $.ajax({
      type: "GET",
      url: url,
      data: {},
      success: (response) => {
        self._render(response);
      }
    })
  }

  /**
   *
   * @param view "String" - valid HTML
   * @private
   */
  _render (view) {
    this._setHistory();
    const wrapper = $('#pt-main');
    if (!wrapper.find(`.pt-page-${this.urlList.pos}`).length) {
      $("#pt-main").append(`<div class="pt-page pt-page-${this.urlList.pos}">${view}</div>`);
    }
    $('body').trigger('router-view-finish');
    this.toPage ();
    this.pending = false;
  }

  _setHistory () {
    let self = this;
    let currentUrl = self.historyUrl || window.location.pathname;
    currentUrl = (/^\/$/.test(currentUrl)) ? currentUrl : `/${currentUrl}`;
    /**
     * @define History.pushState
     * @param data {Object}
     * @param title "String"
     * @param url "String"
     */
    currentUrl.replace('//', '/');
    History.pushState({}, null, currentUrl);
    this.urlList.append(currentUrl)
      .next();
  }

  showPreloader () {
    console.log("preloader");
  }

  toPage() {
    PageTransitions.update();
    PageTransitions.nextPage({animation: 9, showPage: this.urlList.pos});
    this._setHandlers();
  }

  prevPage () {
    PageTransitions.update();
    const page = --this.urlList.pos;
    PageTransitions.nextPage({animation: 10, showPage: page});
    this._setHandlers();
  }

  forwardPage () {
    PageTransitions.update();
    PageTransitions.nextPage({animation: 9, showPage: ++this.urlList.pos});
    this._setHandlers();
  }
}

module.exports = new Router();
