const PageTransitions = require("./pageTrasitions/js/pagetransitions");

class Router {

  init () {
    if (!History.enabled) {
     $("a[router-link]").each((index, link) => {
       let fallbackHref = $(link).attr("href") + ".html";
       $(link).attr("href", fallbackHref);
     })
    }
    History.Adapter.bind(window, "statechange", function() {
      let state = History.getState();
      console.log("state changed");
    });
    this._setHandlers();
  }

  _setHandlers (historyUrl) {
    let self = this;
    let url = historyUrl || window.location.href;
    /**
     * @define History.pushState
     * @param data {Object}
     * @param title "String"
     * @param url "String"
     */
    History.pushState({}, null, url);
    $("a[router-link]").click(function(e) {
      e.preventDefault();
      let url = $(this).attr("href");
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
        self._render(response);
        self._setHandlers(historyUrl);
      }
    })
  }

  /**
   *
   * @param view "String" - valid HTML
   * @private
   */
  _render (view) {
    $("#pt-main").append(`<div class="pt-page">${view}</div>`);
    PageTransitions.init();
    PageTransitions.nextPage({animation: 9, showPage: 1})
  }

  showPreloader () {
    console.log("preloader");
  }

  prevPage () {
    
  }
}

module.exports = new Router();
