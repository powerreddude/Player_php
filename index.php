<?php
require 'lib/mustache.php-2.14.1/src/Mustache/Autoloader.php';
Mustache_Autoloader::register();
$m = new Mustache_Engine(array('entity_flags' => ENT_QUOTES));

$template = file_get_contents("templates/index.html");

$context = array();

echo $m->render($template, $context); 