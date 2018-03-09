(function() {
  $(document).ready(function(){
    $('.slider__list').slick({
      accessibility: false,
      autoplay: true,
      autoplaySpeed: 6000,
      arrows: true,
      dots: false,
      pauseOnHover: false,
      prevArrow: '.slider__toggler--prew',
      nextArrow: '.slider__toggler--next'
    });
  });
}())
