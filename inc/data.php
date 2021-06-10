<?php
//database connection
$con = new mysqli('127.0.0.1', 'root', '', 'sample_data');

//bind data
$bind_data = json_decode(file_get_contents('php://input'));


//action get 
if (isset($_GET['action'])) {
    $action = $_GET['action'];
}

// show all data
if ($action == 'show') {
    $data = $con->query("SELECT * FROM people ORDER by id DESC");

    $all_users = [];

    while ($user = $data->fetch_assoc()) {
        array_push($all_users, $user);
    };

    echo json_encode($all_users);
}


//delete data
if ($action == 'delete') {
    $id = $_GET['id'];
    $data = $con->query("DELETE FROM people WHERE id='$id'");
}

//add data 
if ($action == 'add') {

    $file_name = $_FILES['photo']['name'];
    $file_tmp_name = $_FILES['photo']['tmp_name'];


    move_uploaded_file($file_tmp_name, '../photos/' . $file_name);

    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $gender = $_POST['gender'];
    $address = $_POST['address'];
    $age = $_POST['age'];


    $data = $con->query("INSERT INTO people (name,email,phone,gender,age,address,photo) VALUES ('$name', '$email','$phone', '$gender',$age, '$address','$file_name')");
}

//search data
if ($action == 'search') {

    $search = $bind_data->search;
    $gender = $bind_data->gender;
    $location = $bind_data->location;
    $age_min = $bind_data->age_min;
    $age_max = $bind_data->age_max;



    $data = $con->query("SELECT * FROM people WHERE name LIKE '%$search%' AND gender LIKE '%$gender%' AND address LIKE '%$location%' AND (age >= $age_min AND age <= $age_max)");

    $all_users = [];

    while ($user = $data->fetch_assoc()) {
        array_push($all_users, $user);
    };

    echo json_encode($all_users);
}

// single user 
if ($action == 'singleShow') {
    $id = $_GET['id'];
    $data = $con->query("SELECT * FROM people WHERE id ='$id'");

    $all_users = [];

    while ($user = $data->fetch_assoc()) {
        array_push($all_users, $user);
    };

    echo json_encode($all_users);
}

// data update
if ($action == 'update') {

    //process file 
    if (isset($_FILES['photo'])) {

        $file_name = $_FILES['photo']['name'];
        $file_tmp_name = $_FILES['photo']['tmp_name'];

        move_uploaded_file($file_tmp_name, '../photos/' . $file_name);
    } else {

        $file_name = $_POST['photo_old'];
    }

    //get input fild data   
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $gender = $_POST['gender'];
    $address = $_POST['address'];
    $age = $_POST['age'];
    $id = $_GET['id'];

    $data = $con->query("UPDATE people SET name='$name',email='$email',phone='$phone',gender='$gender',age='$age',address='$address',photo='$file_name' WHERE id ='$id'");
    echo $id;
}
