(function() {
  $(document).ready(function(){
    $('.day-photos').slick({
      accessibility: false,
      autoplay: true,
      autoplaySpeed: 8000,
      arrows: false,
      dots: true,
      pauseOnHover: true
    });
  });
  $('body').on('router-view-finish', function() {
    $('.day-photos').slick({
      accessibility: false,
      autoplay: true,
      autoplaySpeed: 8000,
      arrows: false,
      dots: true,
      pauseOnHover: true
    });
  });
}());
