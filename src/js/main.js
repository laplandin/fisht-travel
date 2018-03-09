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
});

$(document).ready(function() {
  window.sr = ScrollReveal({ reset: true });

  sr.reveal('.reveal', { duration: 200 });
  sr.reveal('.reveal-item', {duration: 300, viewFactor: 0.3}, 50);

  $('.js-scroll').on('click', function(ev) {
    ev.preventDefault();
    var substr = $(this).attr('href').substr(1);
    $('html, body').animate({
      scrollTop: $('[name='+ substr + ']').offset().top
    }, 500);
  });
});
