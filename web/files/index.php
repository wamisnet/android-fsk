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

Header('X-Powered-By:0xBADCAB1E');

?><!DOCTYPE html>
<html>
<head>
</head>
<body><?php

if($handle = opendir('.'))
  {
    while (false !== ($file = readdir($handle)))
      {
        if ($file != "." && $file != ".." && $file != "index.php")
          {
            echo '<a href="./'.$file.'" >'.$file.'</a><br>'."\n";
          }
      }
    closedir($handle);
  }

?>
</body></html>
