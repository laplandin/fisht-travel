$(window).on('load', function() {
  const Stack = require("./libs/Stack.js");
  const PageTransitions = require("./pageTrasitions/js/pagetransitions");

  var globalState = new Stack();

  function loadPage (href) {
    $.ajax({
      type: "GET",
      url: "tours.tmp.html",
      data: {},
      success: function(response) {
        $("#pt-main").append('<div class="pt-page">'+ response +'</div>');
        PageTransitions.init();
        PageTransitions.nextPage({animation: 9, showPage: 1})
      }
    })
  }

  setTimeout(loadPage, 2000);

});
