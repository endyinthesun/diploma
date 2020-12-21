<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A layout example that shows off a responsive email layout.">
    <title>User</title>

    <script src="https://code.jquery.com/jquery-1.12.0.js"></script>
    <link rel="stylesheet" href="css/user.css">
    <!--<![endif]-->
</head>
<body>
<div id="head_block">
    <div><p>PERSONAL DATABASE</p></div>
    <div id="name"></div>
    <div id="exit"><p id="shadow">EXIT</p></div>
</div>
<div id="center_block">
    <div id="user_image">
    </div>
    <select id="documents">
        <option value="0">Виберіть документ</option>
        <option value="accept_file">Згода на обробку</option>
        <option value="zno_file">Сертифікат ЗНО</option>
        <option value="car_doc_file">Водійські права</option>
        <option value="passport_file">Паспорт</option>
        <option value="inn_file">ІНН</option>
    </select>
    <form id="person_data">
        <div><p>Login</p> <input type="text" id="login" placeholder="Login" name="login"></div>
        <div><p>Full name</p> <input type="text" id="name_data" placeholder="Full name" name="name"></div>
        <div><p>Nationality</p> <input type="text" id="citizenship" placeholder="citizenship" name="citizenship"></div>
        <div><p>Address</p> <input type="text" id="address" placeholder="address" name="address"></div>
        <div><p>Phone</p> <input type="text" id="phone" placeholder="mobile phone" name="phone"></div>
        <!--        <p>Add document</p><input type="file" id="file" placeholder="Add document" name="document">-->
        <input type="submit"  id="enter_btn" name="enter" value="Change">
        <input type="submit"  id="enter_btn" name="enter" value="Delete">
    </form>

</div>
<div id="button_block">

</div>
</body>
<script>
    $(document).ready(function(e) {
        $("#person_data").on('submit', function (e) {
            e.preventDefault();
        });
        $.ajax({
            url: "http://reznik/back_end.php?param=get_user&id="+ id
        })
            .done(function(data){

                data = JSON.parse(data);
                console.log(data);
                $('#phone').val(data.phone);
                $('#login').val(data.login);
                $('#number_id').val(data.number_id);
                $('#address').val(data.address);
                $('#citizenship').val(data.citizenship);
                $('#name_data').val(data.full_name);
                $("#user_image").html("<img src='"+data.documents+"'>");
            });
    });
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const name_user = urlParams.get('name');
    $("#name").html("<p>" + name_user + "</p>");

    $('#exit').click(
        function() {
            window.location.replace("http://reznik/");
        });

    $('#enter_btn').click(
        function() {

            // var $file             = $("#file");
            var phone             = $('#phone').val();
            var login             = $('#login').val();
            var number_id         = $('#number_id').val();
            var address           = $('#address').val();
            var citizenship       = $('#citizenship').val();
            var name              = $('#name_data').val();
            // var password           = $('#password').val();
            var fd = new FormData;

            // fd.append('c_file'           , $file[0].dropzone.files[0]);
            // fd.append('file'             , $file.prop('files')[0]);
            fd.append('phone'           , phone);
            fd.append('number_id'    , number_id);
            fd.append('address'        , address);
            fd.append('citizenship'     , citizenship);
            fd.append('full_name'       , name);
            fd.append('id'              , id);
            fd.append('login'            , login);

            $.ajax({
                url: "http://reznik/back_end.php?param=update_user",
                data: fd,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function (data) {
                    console.log(data);
                }
            });
        });

    $(function(){
        $("#documents").on("change", function(){
            // AJAX-запросcon
            $.ajax({
                url: "http://reznik/back_end.php?param=get_file&name=" + $('#documents').val()+"&id="+id
            }).done(function(data){
                // console.log(data);
                $('#user_image').html("<img src='"+data+"'>");
            });
        });
    });

    </script>
    </html>

