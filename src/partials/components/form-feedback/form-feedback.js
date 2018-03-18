(function () {

  var form = $('.feedback__form');
  var arrivalDates = $('#arrival-date');
  var nameInput = $('#feedback-name');
  var phoneInput = $('#feedback-phone');
  var emailInput = $('#feedback-email');
  var commentInput = $('#feedback-comment');

    function formSubmit () {
      // if (arrivalDates === undefind) {
      //   arrivalDates.val() = "";
      // } else {
      //   arrivalDates.val();
      // };
      // if (phoneInput === undefind) {
      //   phoneInput.val() = "";
      // } else {
      //   phoneInput.val();
      // };
      // if (commentInput === undefind) {
      //   commentInput.val() = "";
      // } else {
      //   commentInput.val();
      // };
      var data = {
        date: arrivalDates.val(),
        username: nameInput.val(),
        phone: phoneInput.val(),
        email: emailInput.val(),
        comment: commentInput.val()
      }
      var url = 'post_callback.php';

      $.ajax({
          type: 'post',
          url: url,
          data: data,
          success : function(mes){
            $.confirm({
              theme: 'fisht',
              type: 'green',
              title: 'Отлично!',
              content: 'Спасибо за заявку, наш менеджер скоро свяжется с вами',
              animation: 'opacity',
              animationSpeed: 500,
              boxWidth: '600px',
              useBootstrap: false,
              escapeKey: true,
              backgroundDismiss: true,
              buttons: {
                ok: {
                    text: 'OK', // text for button
                    btnClass: 'btn-blue', // class for the button
                    keys: ['enter'], // keyboard event for button
                    isHidden: false, // initially not hidden
                    isDisabled: false, // initially not disabled
                    action: function(){}
                },
            }
            });
            form[0].reset();
          },
          error: function(err) {
            $.confirm({
              theme: 'fisht',
              type: 'red',
              title: 'Ой, что-то пошло не так',
              content: 'Попробуйте отправить заявку позже',
              animation: 'opacity',
              animationSpeed: 500,
              boxWidth: '600px',
              useBootstrap: false,
              escapeKey: true,
              backgroundDismiss: true,
              buttons: {
                ok: {
                    text: 'OK', // text for button
                    btnClass: 'btn', // class for the button
                    keys: ['enter'], // keyboard event for button
                    isHidden: false, // initially not hidden
                    isDisabled: false, // initially not disabled
                    action: function(heyThereButton){}
                },
            }
            });
          }
      });
    };

    var submitBtn = $('#feedback-submit');

    submitBtn.click(function(e) {
      e.preventDefault();
    });

    submitBtn.click(formSubmit);

    $('body').on('router-view-finish', function() {
      var submitBtn = $('.pt-page-current #feedback-submit');
      submitBtn.click(function(e) {
        e.preventDefault();
      });

      submitBtn.click(formSubmit);
    });
}());
