/*
 *
 * FSK  Serial  Generator
 *     in  JavaScript    
 *  for SoftModem board! 
 *
 * Demo: http://cdn.simon.waldherr.eu/projects/fsk/
 * Repo: https://github.com/SimonWaldherr/FSK-Encoder.js
 * Version: 0.7
 * License: MIT https://github.com/SimonWaldherr/FSK-Encoder.js/blob/master/LICENSE.md
 *
 */

/*jslint browser: true, bitwise: true, indent: 2, plusplus: true */
/*global alert, Audio */

//function to select Elements By Id
function $(name) {
  "use strict";
  return document.getElementById(name);
}

//converts an int to a maximal 4 char long string
function chr8() {
  "use strict";
  return Array.prototype.map.call(arguments, function (a) {
    return String.fromCharCode(a & 0xff);
  }).join('');
}

//converts an int to a maximal 4 char long string
function chr16() {
  "use strict";
  return Array.prototype.map.call(arguments, function (a) {
    return String.fromCharCode(a & 0xff, (a >> 8) & 0xff);
  }).join('');
}

//converts an int to a maximal 4 char long string
function chr32() {
  "use strict";
  return Array.prototype.map.call(arguments, function (a) {
    return String.fromCharCode(a & 0xff, (a >> 8) & 0xff, (a >> 16) & 0xff, (a >> 24) & 0xff);
  }).join('');
}

//converts a string char by char to int (UTF8-Value)
function toUTF8(str) {
  "use strict";
  var utf8 = [],
    idx = 0,
    i,
    c,
    j;
  for (i = 0; i < str.length; i++) {
    c = str.charCodeAt(i);
    if (c <= 0x7f) {
      utf8.push(c);
    } else if (c <= 0x7ff) {
      utf8.push(0xc0 | (c >>> 6));
      utf8.push(0x80 | (c & 0x3f));
    } else if (c <= 0xffff) {
      utf8.push(0xe0 | (c >>> 12));
      utf8.push(0x80 | ((c >>> 6) & 0x3f));
      utf8.push(0x80 | (c & 0x3f));
    } else {
      j = 4;
      while (c >>> (6 * j)) {
        j++;
      }
      utf8.push(((0xff00 >>> j) & 0xff) | (c >>> (6 * --j)));
      while (j--) {
        utf8[idx++] = 0x80 | ((c >>> (6 * j)) & 0x3f);
      }
    }
  }
  return utf8;
}

//converts a string to a FSK WAV encoded dataURI
function encodeFSK(str) {
  "use strict";
  if (str.length === 0) {
    return;
  }
  var utf8 = toUTF8(str),
    sampleRate = 29400,
    baud = 1225,
    freqHigh = 7350,
    freqLow = 4900,
    spb = sampleRate / baud,
    preCarrierBits = Math.ceil(sampleRate * 40 / 1000 / spb),
    postCarrierBits = Math.ceil(sampleRate * 5 / 1000 / spb),
    size = (preCarrierBits + postCarrierBits + 10 * utf8.length) * spb,
    data = "RIFF" + chr32(size + 36) + "WAVE" + "fmt " + chr32(16, 0x00010001, sampleRate, sampleRate, 0x00080001) + "data" + chr32(size),
    dataURI = '',
    i,
    iPD,
    v,
    x,
    c;

  function pushData(freq, samples) {
    for (iPD = 0; iPD < samples; iPD++) {
      v = 128 + 127 * Math.sin((2 * Math.PI) * (iPD / sampleRate) * freq);
      data += chr8(v);
    }
  }

  pushData(freqHigh, preCarrierBits * spb);
  for (x in utf8) {
    if (utf8[x] !== undefined) {
      c = (utf8[x] << 1) | 0x200;
      for (i = 0; i < 10; i++, c >>>= 1) {
        if (c & 1) {
          pushData(freqHigh, spb);
        } else {
          pushData(freqLow, spb);
        }
        //pushData((c & 1) ? freqHigh : freqLow, spb);
      }
    }
  }
  pushData(freqHigh, postCarrierBits * spb);
  if ((parseInt(size, 10) + 44) !== data.length) {
    alert("wrong size: " + (parseInt(size, 10) + 44) + " !== " + data.length);
  }
  dataURI = "data:audio/wav;base64," + window.escape(window.btoa(data));
  return dataURI;
}
