<?php
require 'lib/mustache.php-2.14.1/src/Mustache/Autoloader.php';
Mustache_Autoloader::register();
$m = new Mustache_Engine(array('entity_flags' => ENT_QUOTES));

$template = file_get_contents("templates/collection.html");



$context = ["letters" => []];

$artist_dirs = glob('/mnt/music/*', GLOB_ONLYDIR);
usort($artist_dirs, 'strnatcasecmp');


foreach(range("A", "Z") as $letter) {
    $context["letters"][$letter] = [
        "letter" => $letter,
        "artists" => []
    ];
}

$context["letters"]["etc"] = [
    "letter" => "etc",
    "artists" => []
];

//might change this to take the first letter of an artist check if it exists and then add if it doesn't and add aritst if it does
foreach($artist_dirs as $artist) {
    $artist = basename($artist);
    $first = strtoupper(substr($artist, 0, 1));

    if(!array_key_exists($first, $context["letters"])) {
        $first = "etc";
    }

    array_push($context["letters"][$first]["artists"], ["name" => $artist]);
}

$new_context = ["letters" => []];

foreach($context["letters"] as $array) {
    array_push($new_context["letters"], $array);
}

$context = $new_context;

echo $m->render($template, $context); 