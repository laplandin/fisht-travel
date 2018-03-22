(function() {
  var dayPhotosSlick = function () {
    $('.day-photos').slick({
      accessibility: false,
      autoplay: true,
      autoplaySpeed: 8000,
      arrows: false,
      dots: true,
      pauseOnHover: true,
      lazyLoad: 'progressive'
    });
  };

  $(document).ready(function(){
    dayPhotosSlick();
  });

  $('body').on('router-view-finish', function() {
    dayPhotosSlick();
  });
}());
