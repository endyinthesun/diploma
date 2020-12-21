<?php
 require_once("connect.php");

 if ($_GET['param']=='check_user')
 {
     $select_subject = "SELECT * FROM persons WHERE login = '".$_GET['login']."' AND password = '".$_GET['password']."'";

     $result_subject = mysqli_query($link,$select_subject);
//     var_dump($result_subject);
     if ($result_subject->num_rows > 0)
     {
         $subject = mysqli_fetch_object($result_subject);
         if($subject->login == "admin")
         {
             echo "admin";
         }
         else {
            echo json_encode($subject);
         }
     }
     else {
         echo "false";
     }

//     echo json_encode($subject);
 }
 if($_GET['param'] == 'add_user')
 {

     $target_dir = "uploads/".$_POST['login'];
     mkdir($target_dir);
     $sql_query = '';
     $sql_query_select = '';
     while ($value = current($_FILES)) {

         $target_file = $target_dir ."/". basename($value["name"]);
         $sql_query_select[key($_FILES)] = $target_file;

         move_uploaded_file($value["tmp_name"], $target_file);
         next($_FILES);
     }

     $insert_data = "INSERT INTO persons (login,password,full_name,phone,citizenship,address,accept_file,passport_file,car_doc_file,zno_file,inn_file) VALUES('".$_POST['login']."','".$_POST['password']."','".$_POST['full_name']."','".$_POST['phone']."','".$_POST['citizenship']."','".$_POST['address']."','".$sql_query_select['accept_file']."','".$sql_query_select['passport_file']."','".$sql_query_select['car_doc_file']."','".$sql_query_select['zno_file']."','".$sql_query_select['inn_file']."')";
     $result = mysqli_query($link,$insert_data);
    var_dump($result);
 }

if ($_GET['param']=='get_uk') {
    echo "<table>";
    echo "<tr>";

    echo "<th>Login</th>";
    echo "<th>password</th>";
    echo "<th>Full name</th>";
    echo "<th>Nationality</th>";
    echo "<th>Place of birth/residence</th>";
    echo "<th>Number phone</th>";

    echo "</tr>";

    $select_subject = "SELECT * FROM persons WHERE citizenship = 'Ukraine'";
    $result = mysqli_query($link,$select_subject);

    while ($value = mysqli_fetch_object($result))
    {
        echo "<tr>";
        echo "<td>".$value->login."</td>";
        echo "<td>".$value->password."</td>";
        echo "<td>".$value->full_name."</td>";
        echo "<td>".$value->citizenship."</td>";
        echo "<td>".$value->address."</td>";
        echo "<td>".$value->phone."</td>";
        echo "</tr>";
    }
    echo "</table>";
}
if ($_GET['param']=='get_other') {
    echo "<table>";
    echo "<tr>";

    echo "<th>Login</th>";
    echo "<th>password</th>";
    echo "<th>Full name</th>";
    echo "<th>Nationality</th>";
    echo "<th>Place of birth/residence</th>";
    echo "<th>Number phone</th>";

    echo "</tr>";

    $select_subject = "SELECT * FROM persons WHERE citizenship <> 'Ukraine'";
    $result = mysqli_query($link,$select_subject);
    while ($value = mysqli_fetch_object($result))
    {
        echo "<tr>";
        echo "<td>".$value->login."</td>";
        echo "<td>".$value->password."</td>";
        echo "<td>".$value->full_name."</td>";
        echo "<td>".$value->citizenship."</td>";
        echo "<td>".$value->address."</td>";
        echo "<td>".$value->phone."</td>";
        echo "</tr>";
    }
    echo "</table>";
}
if ($_GET['param']=='get_all') {
    echo "<table>";
    echo "<tr>";

        echo "<th>Login</th>";
        echo "<th>password</th>";
        echo "<th>Full name</th>";
        echo "<th>Nationality</th>";
        echo "<th>Place of birth/residence</th>";
        echo "<th>Number phone</th>";

    echo "</tr>";

    $select_subject = "SELECT * FROM persons WHERE login <> 'admin'";
    $result = mysqli_query($link,$select_subject);

    while ($value = mysqli_fetch_object($result))
    {
        echo "<tr>";
        echo "<td>".$value->login."</td>";
        echo "<td>".$value->password."</td>";
        echo "<td>".$value->full_name."</td>";
        echo "<td>".$value->citizenship."</td>";
        echo "<td>".$value->address."</td>";
        echo "<td>".$value->phone."</td>";
        echo "</tr>";
    }
    echo "</table>";
}

if ($_GET['param']=='get_user') {
    $select_subject = "SELECT * FROM persons WHERE id =".$_GET['id'];
    $result = mysqli_query($link,$select_subject);

    $value = mysqli_fetch_object($result);

    echo json_encode($value);
}
if ($_GET['param']=='get_file') {
    $select_subject = "SELECT ".$_GET['name']." FROM persons WHERE id =".$_GET['id'];
    $result = mysqli_query($link,$select_subject);

    $value = mysqli_fetch_object($result);

    echo current($value);
}

if ($_GET['param']=='update_user') {
    var_dump($_POST);
    $insert_data = "UPDATE persons SET login = '".$_POST['login']."', full_name = '".$_POST['full_name']."', citizenship = '".$_POST['citizenship']."', address = '".$_POST['address']."', phone = '".$_POST['phone']."' WHERE id = '".$_POST['id']."'";

    $result = mysqli_query($link,$insert_data);

    echo $result;
}

if ($_GET['param']=='change_file') {

    $target_dir = "uploads/".$_GET['login'];
    $sql_query = '';
    $value = current($_FILES);
        $target_file = $target_dir ."/". basename($value["name"]);
//        var_dump($target_file);
        $sql_query = $sql_query." ".key($_FILES)." = '".$target_file."',";
        move_uploaded_file($value["tmp_name"], $target_file);
//    $sql_query_select = rtrim($sql_query_select, ",");
//
    $select_person_file = "SELECT ".key($_FILES)." FROM persons WHERE login = '".$_GET['login']."'";

    $result = mysqli_query($link,$select_person_file);
//    var_dump($select_person_file);
    if ($result)
    {
        $file_data = mysqli_fetch_object($result);
        foreach ($file_data as $rm_file) if (file_exists($rm_file)) unlink($rm_file);
    }

    $insert_data = "UPDATE persons SET ".key($_FILES)."='".$target_file."' WHERE login = '".$_GET['login']."'";

    var_dump($insert_data);
    $result = mysqli_query($link,$insert_data);

    echo $result;
}