<?php
//Initializing connection variable with server_name, user_name, password.
//$con = mysqli_connect("localhost", "username", "password");
//Selecting Database
//$db = mysqli_select_db("database_name", $con);
//Fetching values from url and storing it in PHP variables.
$name=$_POST['name'];
$email=$_POST['email'];
$mobile=$_POST['priority'];
$address=$_POST['color'];
if(($_POST['name']=='')
    ||($_POST['email']=='')
    ||($_POST['priority']=='')
    ||($_POST['color']==''))
{
    echo "Please fill all fields....." ;
} else{
// My-SQL query for inserting PHP variable values in table of selected database.
//    $query=mysqli_query("insert into table_name (column1, column2, column3, column4) values ('$name','$email','$mobile','$address')");
//    if($query){
//        echo "Form Submitted Successfully....";
//    }else{
//        echo "Error...!!" ;
//    }
}
//mysqli_close($con); // Closing Connection with server
?>