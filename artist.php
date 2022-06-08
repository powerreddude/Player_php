<?php
require 'lib/mustache.php-2.14.1/src/Mustache/Autoloader.php';
Mustache_Autoloader::register();
$m = new Mustache_Engine(array('entity_flags' => ENT_QUOTES));

$template = file_get_contents("templates/artist.html");



$url = urldecode($_SERVER["REQUEST_URI"]);

parse_str(parse_url($url, PHP_URL_QUERY), $url_querys);

$artist = $url_querys["artist"];

$album_dirs = glob("/mnt/music/$artist/*", GLOB_ONLYDIR);

$context = [
    "artist" => $artist,
    "albums" => []
];


foreach($album_dirs as $album) {
    $album = basename($album);

    array_push($context["albums"], ["name" => $album]);
}

echo $m->render($template, $context); 