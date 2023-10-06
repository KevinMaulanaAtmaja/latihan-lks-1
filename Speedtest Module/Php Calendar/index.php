<?php
date_default_timezone_set('Asia/jakarta');

if (isset($_GET['ym'])) {
    $ym = $_GET['ym'];
} else {
    $ym = date('Y-m');
}

$timestamp = strtotime($ym);
if ($timestamp === false) {
    $timestamp = time();
}
$today = date('Y-m-j', time());

$htmlTitleYear = date('Y', $timestamp);
$htmlTitleMonth = date('M', $timestamp);

$prev = date('Y-m', mktime(0, 0, 0, date('m', $timestamp) - 1, 1, date('Y', $timestamp)));
$next = date('Y-m', mktime(0, 0, 0, date('m', $timestamp) + 1, 1, date('Y', $timestamp)));

$dayCount = date('t', $timestamp);

$str = date('w', mktime(0, 0, 0, date('m', $timestamp), 1, date('Y', $timestamp)));

$weeks = array();
$week = "";

$week .= str_repeat("<td></td>", $str);

for($day = 1; $day <= $dayCount; $day++, $str++) {  
    $date = $ym.'-'.$day;

    if($today == $date) {
        $week .= "<td class='current-day'>$day</td>";
    } else {
        $week .= "<td>$day</td>";
    }

   

    if($str % 7 == 6 || $day == $dayCount) {
        if($day == $dayCount) {
            $week .= str_repeat("<td></td>", 6 - ($str % 7));
        }
       
        $weeks[] = "<tr>$week</tr>";

        $week = '';
    }

}
if(count($weeks) < 6) {
    $week .= str_repeat("<td></td>", 7);
    $weeks[] = "<tr>$week</tr>";
    $week = '';
}


?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Php Calender</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="container">
        <header>
            <a href="?ym=<?=$prev?>">&#60;</a>
            <p class="current-date"><?=$htmlTitleMonth?><br><span><?=$htmlTitleYear?></span></p>
            <a href="?ym=<?=$next?>">&#62;</a>
        </header>
        <div>
            <table class="">
                <thead>
                    <tr>
                        <th>SUN</th>
                        <th>MON</th>
                        <th>TUE</th>
                        <th>WED</th>
                        <th>THU</th>
                        <th>FRI</th>
                        <th>SAT</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    foreach ($weeks as $week) {
                        echo $week;
                    }
                    
                    ?>
                </tbody>
            </table>
        </div>

    </div>

    <script src="main.js"></script>
</body>

</html>