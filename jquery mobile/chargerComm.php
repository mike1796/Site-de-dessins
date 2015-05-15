<?php

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

include 'fonction_bdd.php'; 

$id_dessins = $_GET['id_dessins'];

$query =<<<SQL
	SELECT *
	FROM comm, user
	WHERE id_dessins = :id_dessins
	AND comm.id_user = user.id_user
	ORDER BY id_comm
SQL;

$dbh = get_pdo();


$req = $dbh->prepare($query);
$req->execute(array(
	'id_dessins' => $id_dessins
));

$data = array();
foreach ($req as $row) {
	$triche = array();
	$triche['comm'] = $row['comm'];
	$triche['pseudo'] = $row['pseudo'];
	array_push($data, $triche);
}

echo json_encode($data);