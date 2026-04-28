<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");


$host = 'localhost';
$dbname = 'adatb'; 
$user = 'adatbf';  
$pass = '****';    

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    die(json_encode(["error" => $e->getMessage()]));
}

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM pizzak");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;
    case 'POST':
        $stmt = $pdo->prepare("INSERT INTO pizzak (nev, ar) VALUES (?, ?)");
        $stmt->execute([$input['nev'], $input['ar']]);
        echo json_encode(["status" => "success"]);
        break;
    case 'PUT':
        $stmt = $pdo->prepare("UPDATE pizzak SET nev = ?, ar = ? WHERE id = ?");
        $stmt->execute([$input['nev'], $input['ar'], $input['id']]);
        echo json_encode(["status" => "updated"]);
        break;
    case 'DELETE':
        $id = $_GET['id'];
        $stmt = $pdo->prepare("DELETE FROM pizzak WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "deleted"]);
        break;
}
?>