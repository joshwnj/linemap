var calcLineOffsets = require('line-offsets');

/*

LineMap: object to make conversions between character offsets and line numbers.

*/
function LineMap (src) {
  this.src = src;
  this.lineOffsets = calcLineOffsets(src);
}

/*

Given a line number, get the character offset for the beginning of that line.

*/
LineMap.prototype.getOffsetForLine = function (lineNumber) {
  // line 1 will always begin at offset 0
  if (lineNumber <= 1) { return 0; }

  var index = lineNumber - 1;
  var maxIndex = this.lineOffsets.length - 1;

  // clamp to maximum
  if (index > maxIndex) { index = maxIndex; }

  return this.lineOffsets[index];
};

/*

Given a character offset, get the line number it is located on

*/
LineMap.prototype.getLineForOffset = function (offset) {
  var lineIndex = 0;
  this.lineOffsets.every(function (lineOffset, i) {
    // exact match
    if (offset === lineOffset) {
      lineIndex = i;
      return false;
    }
    // if we've gone beyond, the character was on the previous line
    else if (lineOffset > offset) {
      lineIndex = i - 1;
      return false;
    }
    // keep looking
    else {
      return true;
    }
  });

  // add 1 to convert line index to line number
  return lineIndex + 1;
};

module.exports = LineMap;
