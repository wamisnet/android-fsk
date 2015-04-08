/* ##############################

FSK  Serial  Generator
    in  JavaScript    
 for SoftModem board! 

Demo: http://cdn.simon.waldherr.eu/projects/fsk/
Repo: https://github.com/SimonWaldherr/FSK-Encoder.js
Version: 0.7
License: MIT https://github.com/SimonWaldherr/FSK-Encoder.js/blob/master/LICENSE.md

############################## */

function dlaudio() {
  var jetzt = Date.now().toString();
  majaX(
    {
      url:'./download/',
      method:'POST',
      type:'plain',
      data:{
        data: $('audiodata').innerHTML,
        time: jetzt
      }
    },
    function (resp) {
      if(resp.substr(0, 5) !== 'Error') {
        window.location.href = resp;
      } else {
        alert(resp);
      }
    });
}


//unimportant

var dataURI;

function generate(str) {
  "use strict";
  if (str.length === 0) {
    return;
  }
  var audio,
    loadandplay;
  dataURI = encodeFSK(str);

  $('audiodata').innerHTML = dataURI;
  audio = new Audio();
  audio.src = dataURI;
  audio.play();
  $('jmp').removeAttribute('disabled');
  $('dl').removeAttribute('disabled');
  loadandplay = window.setTimeout("baf_changeloadingmode($('send'));", 800);
  return loadandplay;
}
