const PageTransitions = require("./pageTrasitions/js/pagetransitions");
const List = require("./libs/List");

class Router {

  constructor () {
    this.historyUrl = '';
    this.urlList = new List();
    this.pending = false;
    this.links = $("a[router-link]");
    this.currentUrl = window.location.pathname;
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
      if (self.urlList.find(requestedUrl) < self.urlList.pos && self.urlList.find(requestedUrl) >= 0) { // handle back and forward navigation
        if (!self.urlList.length) document.location.reload();
        self.prevPage();
      } else {
        self.forwardPage();
      }
      // console.log(self.urlList, self.urlList.pos);
    });
    this._setHistory();
    this._setHandlers();
  }

  _setHandlers () {
    let self = this;
    let loadedView = $('.pt-page-temp');
    if (loadedView.length) {
      this.links =  loadedView.find('a[router-link]');
      loadedView.removeClass('pt-page-temp');
    }

    // let currentUrl = self.historyUrl || window.location.pathname;
    // console.log('url', this.currentUrl);
    this.currentUrl = (/^\/$/.test(this.currentUrl)) ? this.currentUrl : `/${this.currentUrl}`;

    this.links.removeClass('main-nav__link--active');
    let re = /\//gi;
    let matchedHref = this.currentUrl.replace(re, '').replace('.html', '');
    let selector = `.pt-page-current a[router-link][href='${matchedHref}']`;
    $(selector).addClass('main-nav__link--active');

    this.links.click(function(e) { e.preventDefault(); });
    this.links.on('mousedown', this._handler.bind(self));
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
    this.links.off('mousedown', this._handler);
    const wrapper = $('#pt-main');
    if (!wrapper.find(`.pt-page-${this.urlList.pos}`).length) {
      let appended = $("#pt-main").append(`<div class="pt-page pt-page-${this.urlList.pos} pt-page-temp">${view}</div>`);
      appended.find('.pt-page-temp')[0].style.willChange = 'transform, opacity';
      // debugger;
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
    if (this.urlList.pos < this.urlList.length) {
      this.urlList.removeTail();
    }
    this.urlList.append(currentUrl)
      .next();
  }

  showPreloader () {
    // console.log("preloader");
  }

  toPage() {
    PageTransitions.update();
    PageTransitions.nextPage({animation: 19, showPage: this.urlList.pos});
    this._setHandlers();
  }

  prevPage () {
    PageTransitions.update();
    const page = --this.urlList.pos;
    PageTransitions.nextPage({animation: 18, showPage: page});
    this._setHandlers();
  }

  forwardPage () {
    PageTransitions.update();
    PageTransitions.nextPage({animation: 17, showPage: ++this.urlList.pos});
    this._setHandlers();
  }

  _handler(e) {
    // console.log('>>', this);
    const self = this;
    switch(e.which)
    {
      case 1:
        e.preventDefault();
        self.pending = true;
        let url = $(e.target).attr("href");
        if (`${self.currentUrl}` === `/${url}.html`) return; // Handle click for same route
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
  }
}

module.exports = new Router();
