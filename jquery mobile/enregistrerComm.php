<?php
session_start();

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

include 'fonction_bdd.php';

$id_dessin = htmlspecialchars($_POST['iddes']);
$comm = htmlspecialchars($_POST['comm']);
$pseudo = $_SESSION['pseudo'];
try {
	$dbh = get_pdo();

	$query =<<<SQL
		SELECT id_user
		FROM user
		WHERE pseudo = :pseudo
SQL;

	$req = $dbh->prepare($query);
	$req->execute(array(
		'pseudo' => $_SESSION['pseudo']
	));
	$id_user;
	foreach ($req as $row) {
		$id_user = $row['id_user'];
	}

	$requete =<<<SQL
		INSERT INTO `comm`(`id_comm`, `id_dessins`, `id_user`, `comm`) 
		VALUES (DEFAULT,:iddes,:iduser,:comm)
SQL;

	$req = $dbh->prepare($requete);
	$req->execute(array(
		'iddes' => $id_dessin,
		'iduser' => $id_user,
		'comm' => $comm
	));
} catch (PDOException $e) {
	echo $e;
}

$data = true;
echo json_encode($data);