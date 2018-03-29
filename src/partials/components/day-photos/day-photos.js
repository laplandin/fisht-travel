(function() {
  var dayPhotosSlick = function () {
    $('.day-photos__list').slick({
      accessibility: false,
      autoplay: false,
      autoplaySpeed: 8000,
      arrows: false,
      dots: true,
      pauseOnHover: true,
      lazyLoad: 'progressive',
      arrows: true
    });
  };

  $(document).ready(function(){
    dayPhotosSlick();
  });

  $('body').on('router-view-finish', function() {
    dayPhotosSlick();
  });
}());
