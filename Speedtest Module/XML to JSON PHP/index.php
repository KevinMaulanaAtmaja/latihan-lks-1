<?php
header('Content-Type: application/json; charset=utf-8');
$employees_xml =
'<employees>
    <employee  id="1">
        <firstname>Jack</firstname>
        <lastname>Nesham</lastname>
        <age>22</age>
        <role>Software Engineer</role>
    </employee>
    <employee id="2">
        <firstname>Maxwell</firstname>
        <lastname>Rick</lastname>
        <age>25</age>
        <role>DevOps Engineer</role>
    </employee>
</employees>';
 
 
$xml = simplexml_load_string($employees_xml);
$json = json_encode($xml, JSON_PRETTY_PRINT);

echo $json;
?>

