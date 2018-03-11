var form = $('#feedback-form--tours');
var submitBtn = $('#feedback-submit');

submitBtn.on('click', function(e) {
    e.preventDefault();
    form.trigger('submit');
    form[0].reset();
});

submitBtn.click(function (){
    if($('#feedback-phone').val() === "" || ($('#feedback-name').val() === "")) {
        $.confirm({
          animation: 'scale',
          closeAnimation: 'scale',
          title: 'Внимание!',
          content: 'Поля Имя и Номер телефона обязательны для заполнения',
          type: 'orange',
          buttons: {
            cancel: {
              text: 'Закрыть',
              action() {}
            }
          }
        });
        return;
    }
    $.ajax({
        type: 'post',
        url:'post_callback.php',
        data:{
            date: $('#arrival-date').val(),
            name: $('#feedback-name').val(),
            phone: $('#feedback-phone').val(),
            email: $('#feedback-email').val(),
            comment: $('#feedback-comment').val(),
        },
        success : function(mes){
            $.confirm({
              animation: 'scale',
              closeAnimation: 'scale',
              title: 'Успешно!',
              content: 'Ваши данные получены. Наш менеджер вам перезвонит',
              type: 'green',
              buttons: {
                cancel: {
                  text: 'Закрыть',
                  action() {}
                }
              }
            });
            $('#arrival-date').val(""),
            $('#feedback-name').val(""),
            $('#feedback-phone').val(""),
            $('#feedback-email').val(""),
            $('#feedback-comment').val("")
        },
        error: function(err) {
          $.confirm({
            animation: 'scale',
            closeAnimation: 'scale',
            title: 'Произошла ошибка',
            type: 'red',
            content: 'Произошла ошибка, попробуйте повторить запрос позднее',
            buttons: {
              cancel: {
                text: 'Ok',
                action() {}
              }
            }
          });
        }
    });
});
