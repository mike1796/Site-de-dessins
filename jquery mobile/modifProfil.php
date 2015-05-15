<?php
session_start();
include 'fonction_bdd.php';

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

$id_user = htmlspecialchars($_POST['id_user']);
$pseudo = htmlspecialchars($_POST['pseudo']);
$email = htmlspecialchars($_POST['email']);
$nom = htmlspecialchars($_POST['nom']);
$prenom = htmlspecialchars($_POST['prenom']);
$mdp = htmlspecialchars($_POST['mdp']);
$mdpConfirm = htmlspecialchars($_POST['mdpConfirm']);

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

if ($req->rowCount() != 0 && $pseudo != $_SESSION['pseudo']) {					
	$data = array("success" => false, "message" => "Il y a déjà un utilisateur possédant ce pseudo");
	echo json_encode($data);
	die();
}

if ($mdpConfirm != $mdp) {
	$data = array('success' => false, 'message' => 'Les mots de passes ne sont pas les mêmes');
	echo json_encode($data);
	die();
}

if (empty($mdp)) {
	$verif = array($pseudo, $email, $nom, $prenom);
	foreach ($verif as $val) {
		if (empty($val)) {
			$data = array('success' => false, 'message' => 'Les mots de passes ne sont pas les mêmes');
			echo json_encode($data);
			die();
		}	
	}
	$query =<<<SQL
	UPDATE `user` 
	SET `pseudo`=:pseudo, `email`= :email, `nom` = :nom, `prenom` = :prenom
	WHERE `id_user`= :id_user
SQL;
	
	$req = $dbh->prepare($query);
	$req->execute(array(
		'id_user' => $id_user,
		'pseudo' => $pseudo,
		'email' => $email,
		'nom' => $nom,
		'prenom' => $prenom

	));
} else {
	$salt = random(4);
	$verif = array ($pseudo, $email, $nom, $prenom, $mdp);
	foreach ($verif as $val) {
		if (empty($val)) {
			$data = array('success' => false, 'message' => 'Les mots de passes ne sont pas les mêmes');
			echo json_encode($data);
			die();
		}	
	}
	$query =<<<SQL
	UPDATE `user` 
	SET `pseudo`=:pseudo, `email`= :email, `mdp` = :mdp, `salt` = :salt, `nom` = :nom, `prenom` = :prenom 
	WHERE `id_user`= :id_user ;
SQL;
	
	$req = $dbh->prepare($query);
	$req->execute(array(
		'id_user' => $id_user,
		'pseudo' => $pseudo,
		'email' => $email,
		'nom' => $nom,
		'prenom' => $prenom,
		'salt' => $salt,
		'mdp' => hash('sha256', $mdp . $salt)
	));
}

$data = array('success' => true, 'message' => 'Votre changement a bien été enregistré');
echo json_encode($data);