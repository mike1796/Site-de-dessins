<?php

function get_pdo() {
	$dbh = new PDO('mysql:host=localhost;dbname=Dessins-Dons', 'root', '', array (PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''));
	return $dbh;
}