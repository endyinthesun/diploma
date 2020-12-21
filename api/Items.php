<?php
include_once '../config/connect.php';

class Items
{
    private $database;

    public function __construct($db)
    {
        $this->database = $db;
        $this->render();
    }

    private function render()
    {
        header("Access-Control-Allow-Origin: *");
        header('Content-Type: application/json; charset=utf-8');

        if ($_GET['controller'] == 'addItem') {
            $this->addItem();
        }

        if ($_GET['controller'] == 'getItems') {
            $this->getItems();
        }

        if ($_GET['controller'] == 'addItemsToSubscriber') {
            $this->addItemsToSubscriber();
        }

        if ($_GET['controller'] == 'getRatingBy') {
            $this->getRatingBy();
        }

    }

    public function addItem()
    {
        $insert_data = "INSERT INTO items (item_value,item_name,coefficient,type_of_category) VALUES('" . $_POST['item_value'] . "','" . $_POST['item_name'] . "','" . $_POST['coefficient'] . "','" . $_POST['type_of_category'] . "')";
        $result = mysqli_query($this->database->link, $insert_data);

        $data = ['error' => '0', 'data' => $result];
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }

    public function addItemsToSubscriber()
    {
        $select_subject = "SELECT items  FROM subscriber WHERE id =" . $_POST['id'];
        $result = mysqli_query($this->database->link, $select_subject);

        $value = get_object_vars(mysqli_fetch_object($result));

        $value = json_decode($value['items'],false, 512, JSON_UNESCAPED_UNICODE);
        $item = json_decode($_POST['item'],false, 512, JSON_UNESCAPED_UNICODE);

        $check_value = false;

        foreach ($value as $key) {
            if ($key->id === $item->id) {
                $check_value = !$check_value;
            }
        }
        if ($check_value === false) {
            $value->items->{$item->id} = $item;
        }

        $insert_data = "UPDATE subscriber SET items = '" . json_encode($value,JSON_UNESCAPED_UNICODE) . "' WHERE id = '" . $_POST['id'] . "'";
        $result = mysqli_query($this->database->link, $insert_data);

        echo $result;
    }

    public function getRatingBy()
    {
        $select_subject = "SELECT subscriber.id, subscriber.full_name, subscriber.value, 
                            cafedra.cafedra_name, faculty.faculty_name FROM subscriber 
                            INNER JOIN cafedra ON subscriber.cafedra_id = cafedra.id 
                            INNER JOIN faculty ON subscriber.faculty_id = faculty.id 
                            WHERE rank = '" . $_GET['rank_id'] . "' ORDER BY value DESC";
        $result = mysqli_query($this->database->link, $select_subject);

        while ($value = mysqli_fetch_object($result)) {
            $data[] = get_object_vars($value);
        }

        $data = ['error' => '0', 'data' => $data];
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }



    public function getItems()
    {
        $select_subject = "SELECT * FROM items ORDER BY type_of_category";
        $result = mysqli_query($this->database->link, $select_subject);
        while ($value = mysqli_fetch_object($result)) {
            $value = get_object_vars($value);
            $value['item_result'] = (float)$value['coefficient'] * (float)$value['item_value'];
            $data[] = $value;
        }
        $data = ['error' => '0', 'data' => $data];
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }
}

$a = new Items(new Database());