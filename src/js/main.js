var globalState = {
  "page-1": "index.html",
  "page-2": "tours.html"
};
$(window).on('load', function() {


});

function loadPage (href) {
  $.ajax({
    type: "GET",
    url: "tours.tmp.html",
    data: {},
    success: function(response) {
      $("#pt-main").append('<div class="pt-page">'+ response +'</div>');
      PageTransitions.init();
      PageTransitions.nextPage({animation: 3, showPage: 1})
    }
  })
}
