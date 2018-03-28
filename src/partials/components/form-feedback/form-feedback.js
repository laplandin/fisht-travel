(function () {
    function formSubmit (fields) {

      var dates = $('.pt-page .arrival-date');
      var name = $('.pt-page .feedback-name');
      var phone = $('.pt-page .feedback-phone');
      var email = $('.pt-page .feedback-email');
      var comment = $('.pt-page .feedback-comment');

      var data = {
        dates: dates.val(),
        username: name.val(),
        phone: phone.val(),
        email: email.val(),
        comment: comment.val()
      };

      // if (fields.dates === undefined) {
      //   console.log(fields.dates);
      //   data.dates = '';
      //   return;
      // }

      // if (fields.phone === undefined) {
      //   fields.phone.val() = "";
      //   return;
      // }
      //
      // if (fields.comment === undefined) {
      //   fields.comment.val() = "";
      //   return;
      // }


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
                    btnClass: 'btn feedback-submit', // class for the button
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

    $(document).ready(function(){
      var submitBtn = $('.pt-page .feedback-submit');
      var form = $('.pt-page .feedback__form');
      var fields = {};

      submitBtn.off('click', formSubmit);

      submitBtn.click(function(e) {
        e.preventDefault();
      });

      submitBtn.on('click', formSubmit);

      // fields = {
      //   dates: $('.pt-page .arrival-date'),
      //   name: $('.pt-page .feedback-name'),
      //   phone: $('.pt-page .feedback-phone'),
      //   email: $('.pt-page .feedback-email'),
      //   comment: $('.pt-page .feedback-comment')
      // };

      return fields;
    });

    $('body').on('router-view-finish', function() {
      var submitBtn = $('.pt-page .feedback-submit');
      console.log(submitBtn);

      submitBtn.off('click', formSubmit);

      submitBtn.click(function(e) {
        e.preventDefault();
      });

      submitBtn.on('click', formSubmit);
    });
}());
