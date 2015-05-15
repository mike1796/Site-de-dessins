<?php
include 'fonction_bdd.php';

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');


$query =<<<SQL
	SELECT *
	FROM dessins, user
	WHERE dessins.id_user = user.id_user
	ORDER BY date_dessins DESC
SQL;

$dbh = get_pdo();


$req = $dbh->prepare($query);
$req->execute();
$data = array();
foreach ($req as $row) {
	$triche = array();
	$triche['url'] = $row['url'];
	$triche['titre'] = $row['titre'];
	$triche['id_dessins'] = $row['id_dessins'];
	$triche['comm'] = $row['comm'];
	$triche['pseudo'] = $row['pseudo'];
	array_push($data, $triche);
}
echo json_encode($data); 
