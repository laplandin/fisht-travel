const PageTransitions = require("./pageTrasitions/js/pagetransitions");
const List = require("./libs/List");

class Router {

  constructor () {
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
      let state = History.getState();
      let requestedUrl = state.hash;
      console.log(self.urlList, requestedUrl);
      if (self.urlList.find(requestedUrl) < 0) {console.log("not found"); return;}
      if (self.urlList.find(requestedUrl)  < self.urlList.pos) {
        self.prevPage();
      } else {
        self.forwardPage();
      }

    });
    this._setHandlers();
  }

  _setHandlers (historyUrl) {
    let self = this;
    let url = historyUrl || window.location.pathname;
    url = (/^\/$/.test(url)) ? url : `/${url}`;
    /**
     * @define History.pushState
     * @param data {Object}
     * @param title "String"
     * @param url "String"
     */
    History.pushState({}, null, url);
    this.urlList.append(url)
      .next();
    console.log(this.urlList);

    $("a[router-link]").click(function(e) {
      e.preventDefault();
      let url = $(this).attr("href");
      console.log('PATH', window.location.href, url);
      if (`/${url}` === `${window.location.pathname}.html` || url === window.location.pathname) {console.log('fired'); return;}
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
    let historyUrl = `${href}.html`;
    console.log(historyUrl);
    $.ajax({
      type: "GET",
      url: url,
      data: {},
      success: (response) => {
        self._setHandlers(historyUrl);
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
    $("#pt-main").append(`<div class="pt-page pt-page-${this.urlList.pos}">${view}</div>`);
    PageTransitions.update();
    PageTransitions.nextPage({animation: 9, showPage: this.urlList.pos})
  }

  showPreloader () {
    console.log("preloader");
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
