<?php
require 'lib/mustache.php-2.14.1/src/Mustache/Autoloader.php';
Mustache_Autoloader::register();
$m = new Mustache_Engine(array('entity_flags' => ENT_QUOTES));

$template = file_get_contents("templates/album.html");



$url = urldecode($_SERVER["REQUEST_URI"]);

parse_str(parse_url($url, PHP_URL_QUERY), $url_querys);

$artist = $url_querys["artist"];
$album = $url_querys["album"];

$song_dirs = glob("/mnt/music/$artist/$album/*.{mp3,flac}", GLOB_BRACE);

$songs = [];

// TODO: add song lengths
foreach($song_dirs as $song) {
    $song = basename($song);

    $title = explode(' - ', $song, 2)[1];

    $title = implode('.', explode('.', $title, -1));

    array_push($songs, ["title" => $title, "filename" => $song]);
}

$context = ["artist" => $artist, "album" => $album, "songs" => $songs];

echo $m->render($template, $context); 