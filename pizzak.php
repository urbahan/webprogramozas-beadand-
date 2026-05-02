<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$host = 'localhost';
$dbname = 'pizzak'; 
$pass = 'Hanna2317';            

try {
    
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Ha nem sikerül kapcsolódni, hibaüzenet küldése JSON formátumban
    die(json_encode(["error" => "Kapcsolódási hiba: " . $e->getMessage()]));
}


$method = $_SERVER['REQUEST_METHOD'];


$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        
        $stmt = $pdo->query("SELECT nev, kategorianev, vegetarianus FROM pizza");
        $pizzas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($pizzas);
        break;

    case 'POST':
        
        $sql = "INSERT INTO pizza (nev, kategorianev, vegetarianus) VALUES (?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $input['nev'], 
            $input['kategorianev'], 
            $input['vegetarianus']
        ]);
        echo json_encode(["status" => "success", "message" => "Pizza hozzáadva!"]);
        break;

    case 'DELETE':
        
        $sql = "DELETE FROM pizza WHERE nev = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$input['nev']]);
        echo json_encode(["status" => "success", "message" => "Pizza törölve!"]);
        break;

    default:
        echo json_encode(["error" => "Nem támogatott metódus!"]);
        break;
}
?>
