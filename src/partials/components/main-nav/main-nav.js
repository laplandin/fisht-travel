var
  myMainNav = document.querySelector(".headroom"),
  headroom  = new Headroom(myMainNav, {offset: 200, tolerance: 5});
headroom.init();
