 
 $(document).ready(function(){
  $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
        $('#back-to-top').fadeIn();
      } else {
        $('#back-to-top').fadeOut();
      }
    });
    $('#back-to-top').click(function () {
      $('body,html').animate({ scrollTop: 0 }, 400);

      return false;
    });
});

$(document).ready(function(){
  $('.ubt').popover('hide');

})



