<?php
include_once '../config/connect.php';

class Teachers
{
    private $database;

    private $category_type = [
    'one' => '1',
    'two' => '2',
    'three' => '3',
    'four' => '4'
    ];
    public function __construct($db)
    {
        $this->database = $db;
        $this->render();
    }

    private function render()
    {
        header("Access-Control-Allow-Origin: *");
        header('Content-Type: application/json; charset=utf-8');

        if ($_GET['controller'] == 'sign') {
            $this->login();
        }

        if ($_GET['controller'] == 'getUser') {
            $this->getSubscriberById();
        }
        if ($_GET['controller'] == 'countTeacherItem') {
            $this->countTeacherItem();
        }
        if ($_GET['controller'] == 'getItemsBySubscriber') {
            $this->getItemsBySubscriber();
        }
        if ($_GET['controller'] == 'dropItemsFromSubscriber') {
            $this->dropItemsFromSubscriber();
        }

    }

    public function login()
    {
        $select_subject = "SELECT * FROM subscriber WHERE login = '" . $_GET['login'] . "' AND password = '" . $_GET['password'] . "'";

        $result_subject = mysqli_query($this->database->link, $select_subject);
        if ($result_subject->num_rows > 0) {
            $subject = mysqli_fetch_object($result_subject);
            if ($subject->login == "admin") {
                echo "admin";
            } else {
                $data = ['error' => '0', 'data' => $subject];
                echo json_encode($data,JSON_UNESCAPED_UNICODE);
            }
        } else {
            echo json_encode(['error' => '1'],JSON_UNESCAPED_UNICODE);
        }
    }

    public function getItemsBySubscriber()
    {
        $select_subject = "SELECT items  FROM subscriber WHERE id =" . $_GET['id'];
        $result = mysqli_query($this->database->link, $select_subject);

        $value = mysqli_fetch_object($result);
        $value = json_decode($value->items,false, 512, JSON_UNESCAPED_UNICODE);

        foreach ($value->items as $key=> $data_item)
        {
            $data[] = $data_item;
        }
//        var_dump($data);
        $data = ['error' => '0', 'data' => $data];
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }
    public function countTeacherItem()
    {
        $teacher_value = 0;

        $select_subject = "SELECT items  FROM subscriber WHERE id =" . $_GET['id'];
        $result = mysqli_query($this->database->link, $select_subject);

        $value = mysqli_fetch_object($result);
        $value = json_decode($value->items,false, 512, JSON_UNESCAPED_UNICODE);

        foreach ($value->items as $key=>$data_item)
        {
            if($this->category_type['one'] === $data_item->type_of_category || $this->category_type['two'] === $data_item->type_of_category)
            {
                $teacher_value = $teacher_value + (float)$data_item->item_result*0.4;
            }

            if($this->category_type['three'] == $data_item->type_of_category || $this->category_type['four'] == $data_item->type_of_category)
            {
                $teacher_value = $teacher_value + (float)$data_item->item_result*0.1;
            }
        }

        $insert_data = "UPDATE subscriber SET value = '".$teacher_value."' WHERE id = '".$_GET['id']."'";
        $result = mysqli_query($this->database->link,$insert_data);

        echo $result;
    }

    public function dropItemsFromSubscriber()
    {
        $select_subject = "SELECT items  FROM subscriber WHERE id =" . $_POST['id'];

        $result = mysqli_query($this->database->link, $select_subject);

        $value = get_object_vars(mysqli_fetch_object($result));

        $value = json_decode($value['items'],false, 512, JSON_UNESCAPED_UNICODE);
        $item = json_decode($_POST['item'],false, 512, JSON_UNESCAPED_UNICODE);


        foreach ($value->items as $key=>$data_item) {
            if ($data_item->id === $item->id) {
                $drop_value = $data_item->id;
            }
            unset($value->items->{$data_item->id});
        }

        $insert_data = "UPDATE subscriber SET items = '" . json_encode($value,JSON_UNESCAPED_UNICODE) . "' WHERE id = '" . $_POST['id'] . "'";
        $result = mysqli_query($this->database->link, $insert_data);

        echo $result;
    }

    public function getSubscriberById()
    {
        $select_subject = "SELECT * FROM subscriber WHERE id =" . $_GET['id'];
        $result = mysqli_query($this->database->link, $select_subject);

        $value = mysqli_fetch_object($result);

        $data = ['error' => '0', 'data' => $value];
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }
}

$a = new Teachers(new Database());