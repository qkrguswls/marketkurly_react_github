<?
    include_once('./header.php');

    $id = $_POST['id'];
    $sql = "select * from week8_kurly_table where id='$id'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) >= 1) {
        echo 1;
    } else {
        echo -1;
    }
?>