var
  myMainNav = document.querySelector(".main-nav"),
  headroom  = new Headroom(myMainNav, {offset: 200, tolerance: 5});
headroom.init();
