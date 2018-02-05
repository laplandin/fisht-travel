const PageTransitions = require("./pageTrasitions/js/pagetransitions");
const List = require("./libs/List");

class Router {

  constructor () {
    this.historyUrl = '';
    this.urlList = new List();
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
      console.log('STATE_CHANGE');
      let state = History.getState();
      let requestedUrl = state.hash;
      if (self.urlList.find(requestedUrl) < 0) {
        return; // branch for navigation via router-link atttribute
      }
      if (self.urlList.find(requestedUrl)  < self.urlList.pos) { // handle back and forward navigation
        self.prevPage();
      } else {
        self.forwardPage();
      }
    });
    this._setHistory();
    this._setHandlers();
  }

  _setHandlers () {
    let self = this;
    let currentUrl = self.historyUrl || window.location.pathname;
    currentUrl = (/^\/$/.test(currentUrl)) ? currentUrl : `/${currentUrl}`;

    $("a[router-link]").click(function(e) {
      e.preventDefault();
      let url = $(this).attr("href");
      console.log('PATH', currentUrl, url);
      if (`/${url}` === currentUrl) {console.log('fired'); return;}
      self._loadPage(url);
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
    $("#pt-main").append(`<div class="pt-page pt-page-${this.urlList.pos}">${view}</div>`);
    this.toPage ();
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
    History.pushState({}, null, currentUrl);
    this.urlList.append(currentUrl)
      .next();
  }

  showPreloader () {
    console.log("preloader");
  }

  toPage() {
    PageTransitions.update();
    PageTransitions.nextPage({animation: 9, showPage: this.urlList.pos})
    this._setHandlers();
  }

  prevPage () {
    PageTransitions.update();
    PageTransitions.nextPage({animation: 10, showPage: --this.urlList.pos});
    this._setHandlers();
  }

  forwardPage () {
    PageTransitions.update();
    PageTransitions.nextPage({animation: 9, showPage: ++this.urlList.pos});
    this._setHandlers();
  }
}

module.exports = new Router();
