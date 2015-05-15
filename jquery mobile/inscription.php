<?php
session_start();

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

function random($car) {
	$string = "";
	$chaine = "abcdefghijklmnpqrstuvwxy";
	srand((double)microtime()*1000000);
	for($i=0; $i<$car; $i++) {
		$string .= $chaine[rand()%strlen($chaine)];
	}
	return $string;
}


include 'fonction_bdd.php';

$pseudo = htmlspecialchars($_POST['pseudo']);
$email = htmlspecialchars($_POST['email']);
$mdp = htmlspecialchars($_POST['mdp']);
$confirmMDP = htmlspecialchars($_POST['confirmMDP']);
$nom = htmlspecialchars($_POST['nom']);
$prenom = htmlspecialchars($_POST['prenom']);

if (empty($pseudo) || empty($email) || empty($mdp) || empty($confirmMDP)) {
	$data = array("success" => false, "message" => "Certain champs ne sont pas remplis");
	echo json_encode($data);
	die();
}

if ($confirmMDP != $mdp) {
	$data = array("success" => false, "message" => "Les deux mots de passes ne sont pas correcte");
	echo json_encode($data);
	die();
}

$dbh = get_pdo();

$query =<<<SQL
	SELECT pseudo
	FROM user
	WHERE pseudo = :pseudo
SQL;

$req = $dbh->prepare($query);
$req->execute(array(
	'pseudo' => $pseudo
));

if ($req->rowCount() != 0) {
	$data = array("success" => false, "message" => "Il y a déjà un utilisateur possédant ce pseudo");
	echo json_encode($data);
	die();
}

$salt = random(4);
$query =<<<SQL
	INSERT INTO user (id_user, pseudo, email, mdp, salt, nom, prenom)
	VALUES (DEFAULT, :pseudo, :email, :mdp, :salt, :nom, :prenom)
SQL;

$req = $dbh->prepare($query);
$req->execute(array(
	'pseudo' => $pseudo,
	'email' => $email,
	'mdp' => hash('sha256', $mdp . $salt),
	'salt' => $salt,
	'nom' => $nom,
	'prenom' => $prenom
));


$_SESSION['pseudo'] = $pseudo;
$data = array("success" => true, "message" => $pseudo);
echo json_encode($data);
