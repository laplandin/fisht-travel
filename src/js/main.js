$(window).on('load', function() {
  const PageTransitions = require("./pageTrasitions/js/pagetransitions");
  const router = require("./router");

  router.init();
  PageTransitions.init();

  function loadPage (href) {
    let url = `${href}.tmp.html`;
    $.ajax({
      type: "GET",
      url: url,
      data: {},
      success: function(response) {
        $("#pt-main").append(`<div class="pt-page">${response}</div>`);
        PageTransitions.init();
        PageTransitions.nextPage({animation: 9, showPage: 1})
      }
    })
  }

  // setTimeout(loadPage, 2000);
});
