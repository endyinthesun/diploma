<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A layout example that shows off a responsive email layout.">
    <title>HEAD</title>

    <script src="https://code.jquery.com/jquery-1.12.0.js"></script>
    <link rel="stylesheet" href="css/style.css">
    <!--<![endif]-->
</head>
<body>
    <form id="registration_data">
        <input type="text" id="login" placeholder="Login" name="login">
        <input type="password" id="password" placeholder="password"  name="password">
        <input type="text" id="name" placeholder="Full name" name="name">
        <input type="text" id="citizenship" placeholder="citizenship" name="citizenship">
        <input type="text" id="address" placeholder="address" name="address">
<!--        <input type="text" id="number_id" placeholder="identification number" name="number_id">-->
        <input type="text" id="phone" placeholder="mobile phone" name="phone">
        <div id="file_block"><p>Згода на обробку</p><input type="file" id="accept_file" placeholder="Add document" name="document"></div>
        <div id="file_block"><p>Сертифікат ЗНО</p><input type="file" id="zno_file" placeholder="Add document" name="document"></div>
        <div id="file_block"><p>ІНН</p><input type="file" id="inn_file" placeholder="Add document" name="document"></div>
        <div id="file_block"><p>Паспорт/Passport</p><input type="file" id="passport_file" placeholder="Add document" name="document"></div>
        <div id="file_block"><p>Driver_lisence</p><input type="file" id="car_doc_file" placeholder="Add document" name="document"></div>


        <input type="submit"  id="enter_btn" name="enter">
    </form>
</body>
<script>
$(document).ready(function(e) {
    $("#registration_data").on('submit', function (e) {
        e.preventDefault();
    });
});

    $('#enter_btn').click(
        function() {

            var $accept_file       = $("#accept_file");
            var $zno_file          = $("#zno_file");
            var $passport_file     = $("#passport_file");
            var $car_doc_file      = $("#car_doc_file");
            var $inn_file          = $("#inn_file");
            var phone              = $('#phone').val();
            var login              = $('#login').val();
            // var number_id         = $('#number_id').val();
            var address            = $('#address').val();
            var citizenship        = $('#citizenship').val();
            var name               = $('#name').val();
            var password           = $('#password').val();
            var fd = new FormData;

            // fd.append('c_file'           , $file[0].dropzone.files[0]);
            fd.append('accept_file'   , $accept_file.prop('files')[0]);
            fd.append('passport_file' , $passport_file.prop('files')[0]);
            fd.append('car_doc_file'  , $car_doc_file.prop('files')[0]);
            fd.append('zno_file'      , $zno_file.prop('files')[0]);
            fd.append('inn_file'      , $inn_file.prop('files')[0]);
            // fd.append('c_name'           , title);
            fd.append('phone'         , phone);
            fd.append('address'       , address);
            fd.append('citizenship'   , citizenship);
            fd.append('full_name'     , name);
            fd.append('password'      , password);
            fd.append('login'         , login);

            $.ajax({
                url: "http://reznik/back_end.php?param=add_user",
                data: fd,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function (data) {
                    console.log(data);
                }
            });
        });

</script>
</html>
