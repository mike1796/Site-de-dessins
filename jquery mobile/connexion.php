<?php
session_start();

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

include 'fonction_bdd.php';

$pseudo = htmlspecialchars($_POST['pseudo']);
$mdp = htmlspecialchars($_POST['mdp']);

$query =<<<SQL
	SELECT mdp, salt
	FROM user
	WHERE pseudo = :pseudo
SQL;

$dbh = get_pdo();

$req = $dbh->prepare($query);
$req->execute(array(
	'pseudo' => $pseudo
));

if ($req->rowCount() == 0) {
	$data = array("success" => false, "message" => "L'assocation utilisateur mot de passe n'est pas bonne");
	echo json_encode($data);
	die();
}
$mdpBD;
$salt;
foreach ($req as $row) {
	$mdpBD = $row['mdp'];
	$salt = $row['salt'];
}
if ($mdpBD == hash('sha256', $mdp . $salt )) {
	$_SESSION["pseudo"] = $pseudo;
	$data = array("success" => true, "message" => $_SESSION["pseudo"]);
	echo json_encode($data);
	die();
} else {
	$data = array("success" => false, "message" => "L'assocation utilisateur mot de passe n'est pas bonne");
	echo json_encode($data);
	die();
}