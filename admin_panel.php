<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A layout example that shows off a responsive email layout.">
    <title>HEAD</title>

    <script src="https://code.jquery.com/jquery-1.12.0.js"></script>
    <link rel="stylesheet" href="css/admin.css">
    <!--<![endif]-->
</head>
<body>
    <div id="head_block">
        <div><p>PERSONAL DATABASE</p></div>
        <div><p>ADMINISTRATOR</p></div>
        <div id="exit"><p id="shadow">EXIT</p></div>
    </div>
    <div id="center_block">
        <div id="get_uk"><p id="shadow">Ukrainian</p></div>
        <div id="get_other"><p id="shadow">Foreginers</p></div>
        <div id="get_all"><p id="shadow">All</p></div>
    </div>
    <div id = "change_block_file">
        <p> Change file of user </p>
        <div id="list_data_change">
            <?php
            // Устанавливаем соединение с базой данных
            require_once('connect.php');
            $sql = "SELECT * FROM persons";
            $com = mysqli_query($link,$sql);
            echo "<select id='user'>";
            echo "<option value='0'>Change User</option>";
            //echo $link;
            while($catalog = mysqli_fetch_object($com)) {
                echo "<option value='{$catalog->login}'>{$catalog->full_name}</option>";
            }
            echo "</select>";
            ?>

            <select id="documents">
                <option value="0">Виберіть документ</option>
                <option value="accept_file">Згода на обробку</option>
                <option value="zno_file">Сертифікат ЗНО</option>
                <option value="car_doc_file">Водійські права</option>
                <option value="passport_file">Паспорт</option>
                <option value="inn_file">ІНН</option>
            </select>
        </div>
        <div id="file_block"><p>додайте новий файл</p>
            <input type="file" id="new_file" placeholder="Add document" name="document">
            <input type="submit" id="enter_file" placeholder="Add document" name="document">
        </div>
    </div>

    <div id="button_block">

    </div>
</body>
<script>

    $('#get_uk').click(
        function() {
            $.ajax({
                url: "http://reznik/back_end.php?param=get_uk"
            })
                .done(function(data){
                    console.log(data);
                    $("#button_block").html(data);
                });
        });
    $('#get_other').click(
        function() {
            $.ajax({
                url: "http://reznik/back_end.php?param=get_other"
            })
                .done(function(data){
                    console.log(data);
                    $("#button_block").html(data);
                });
        });
    $('#get_all').click(
        function() {
            $.ajax({
                url: "http://reznik/back_end.php?param=get_all"
            })
                .done(function(data){
                    console.log(data);
                    $("#button_block").html(data);
                });
        });
    $('#exit').click(
        function() {
            window.location.replace("http://reznik/");
        });
    $('#enter_file').click(
        function() {
            var $file = $("#new_file");
            var fd = new FormData;
            fd.append($('#documents').val()   , $file.prop('files')[0]);

            // console.log($('#user').val());
            $.ajax({
                url: "http://reznik/back_end.php?param=change_file&login="+$('#user').val(),
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
