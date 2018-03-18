<?php
    // $phone = $_POST['phone'];
    // $date = $_POST['date'];
    $name = $_POST['username'];
    $mail = $_POST['email'];
    // $textarea = $_POST['comment'];
    $sub = "C сайта fisht-travel.ru";
    $address = "ustin89@mail.ru";
    $mes = "Имя: $name\ne-mail: $mail\n\nЗаказ с сайта. fisht-travel";
    // $mes = "Дата: $date\nТелефон: $phone\nИмя: $name\ne-mail: $mail\nКомментарий к заказу: $textarea\nЗаказ с сайта. fisht-travel";
    //echo $mes;
    $send = mail ($address,$sub,$mes,"Content-type:text/plain; charset = UTF-8\r\n");
    if ($send == 'true')
    {   echo "Сообщение отправлено";}
    else {echo "Ошибка, сообщение не отправлено!";}?>
