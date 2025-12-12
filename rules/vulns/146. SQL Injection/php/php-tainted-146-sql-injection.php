<?php
  function example_1(){
    $id_usuario = base64_decode(base64_decode($_GET['u']));
    $id_examen = base64_decode(base64_decode($_GET['e']));
    $despacho = [26,28,31,39,5];
    // ruleid: php-tainted-000-sql-injection
    $sql = "SELECT foo FROM fooler WHERE id_exam = " . $id_examen . " AND u.identificacion = '" . $id_usuario . "'";
  }

  function example_2(){
    $query = "SELECT foo FROM fooler WHERE id_exam = ";
    // ruleid: php-tainted-000-sql-injection
    $query .= $_GET['u'];
    $query .= ";";
    return $query;
  }

  function example_3(){
    $id_exam = $_GET['u'];
    // ruleid: php-tainted-000-sql-injection
    return "SELECT foo FROM fooler WHERE id_exam = $id_exam";
  }

  function example_4(){
    $id_exam = $_GET['u'];
    // ruleid: php-tainted-000-sql-injection
    return "SELECT foo FROM fooler WHERE id_exam = $id_exam AND 1=1";
  }

  function example_5(){
    $id_exam = $_GET['u'];
    // ruleid: php-tainted-000-sql-injection
    return "SELECT foo FROM fooler WHERE id_exam = {$id_exam}";
  }

  function example_6() {
    // ruleid: php-tainted-000-sql-injection
    return sprintf("SELECT foo FROM fooler WHERE id_exam = %s", $_GET['u']);
  }

  function example_7() {
    // ruleid: php-tainted-000-sql-injection
    return implode("SELECT foo FROM fooler WHERE id_exam = %s", $_GET['u']);
  }

?>