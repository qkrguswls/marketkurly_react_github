<?
    include_once('./header.php');

    $id = $_POST['id'];
    $pw = $_POST['pw'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $hp = $_POST['hp'];
    $addr = $_POST['addr'];
    $gender = $_POST['gender'];
    $birth = $_POST['birth'];
    $chooga = $_POST['chooga'];
    $service = $_POST['service'];

    $sql = "insert into week8_kurly_table(id, pw, name, email, hp, addr, gender, birth, chooga, service) 
    values('$id', '$pw', '$name', '$email', '$hp', '$addr', '$gender', '$birth', '$chooga', '$service')";
    $result = mysqli_query($conn, $sql);

    if (!$result) {
        echo "데이터 저장 실패";
    } else {
        echo "데이터 저장 성공";
    }
?>