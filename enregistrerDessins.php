<?php
session_start();

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

include 'fonction_bdd.php';

$url = htmlspecialchars($_POST['url']);
$titre = htmlspecialchars($_POST['titre']);
$comm = htmlspecialchars($_POST['comm']);

if (empty($url)) {
	$data = array("success" => false, "message" => "L'url du formulaire est vide");
	echo json_encode($data);
	die();
}

if (filter_var($url, FILTER_VALIDATE_URL) == false) {
	$data = array("success" => false, "message" => "Ce n'est pas un url");
	echo json_encode($data);
	die();
} 

list(,, $type) = getimagesize($url);

if (!in_array($type, array(IMAGETYPE_JPEG, IMAGETYPE_PNG))) {
	$data = array("success" => false, "message" => "Fichier non supporté l'URL n'est peut être pas une image");
	echo json_encode($data);
	die();
}

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

$query =<<<SQL
	INSERT INTO dessins (id_dessins, url, titre, comm, id_user, date_dessins)
	VALUES (DEFAULT, :url, :titre, :comm, :id_user, :date_dessins)
SQL;

$date = date("Y/m/d");
$req = $dbh->prepare($query);
$req->execute(array(
	'url' => $url,
	'titre' => $titre,
	'comm' => $comm,
	'id_user' => $id_user,
	'date_dessins' => $date
));

$data = array("success" => true, "message" => "Votre dessin a bien été posté");
echo json_encode($data);
