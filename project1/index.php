<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <title>TI</title>
  <meta name="description" content="TI">
  <meta name="author" content="Anna Szumilas">
  <link rel="stylesheet" href="style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@200;400;700&display=swap" rel="stylesheet"> 
</head>

<body>
  <div id="container">
    <nav>
      <a href="index.php?page=home">Strona główna</a> 
      <a href="index.php?page=animation">Animacja</a> 
    </nav>

<?php
if (isset($_GET['page'])) {
  $page = $_GET['page'];
} 
else {
  $page = 'home';
}
if (preg_match('/^[a-z0-9\-]+$/', $page)) {
  $content = file_get_contents('subpages/' . $page . '.html');
  if (!$content) {
    echo('Requested page was not found.');
  } else {
    echo $content;
  }
}
?>

<footer>
&copy Anna Szumilas 2021
</footer>
</div>

