<?php

/* ##############################

FSK  Serial  Generator
    in  JavaScript    
 for SoftModem board! 

Demo: http://cdn.simon.waldherr.eu/projects/fsk/
Repo: https://github.com/SimonWaldherr/FSK-Encoder.js
Version: 0.6
License: MIT https://github.com/SimonWaldherr/FSK-Encoder.js/blob/master/LICENSE.md

############################## */

$data = $_POST['data'];
$clienttime = $_POST['time'];

if(($data == '')||($clienttime == ''))
  {
    print "Error 1";
    exit;
  }

if(!$data = file_get_contents($data))
  {
    print "Error 2";
    exit;
  }

$filename = './files/'.hash("SHA256", $data).'.fsk.wav';

if(!$handle = fopen('./../'.$filename, "w"))
  {
    print "Error 3";
    exit;
  }
else
  {
    if(!fwrite($handle, $data))
      {
        print "Error 4";
        exit;
      }
    
    fclose($handle);
    echo $filename;
  }

?>
