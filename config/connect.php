<?php

class Database
{
    public $link;
    public function __construct()
    {
        $this->link = mysqli_connect('localhost','root','root','sov');
    }
}