<?php
session_start();

$pseudo = $_SESSION['pseudo'];

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

include 'fonction_bdd.php';

$dbh = get_pdo();

$query =<<<SQL
	SELECT * 
	FROM user
	WHERE pseudo = :pseudo
SQL;

$req = $dbh->prepare($query);
$req->execute(array(
	'pseudo' => $_SESSION['pseudo']
));
$data = array();
foreach ($req as $row) {
	$data['id_user'] = $row['id_user'];
	$data['pseudo'] = $row['pseudo'];
	$data['email'] = $row['email'];
	$data['nom'] = $row['nom'];
	$data['prenom'] = $row['prenom'];
}

echo json_encode($data);