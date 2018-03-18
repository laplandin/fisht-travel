(function() {
  $(document).ready(function(){
    $('.reviews__carousel').slick({
      accessibility: false,
      adaptiveHeight: true,
      autoplay: false,
      autoplaySpeed: 8000,
      arrows: true,
      dots: true,
      pauseOnHover: true,
      prevArrow: '.reviews__toggler--prev',
      nextArrow: '.reviews__toggler--next'
    });
  });
}())
