define([], function(){
	"use strict";
	var ARRAY_NUM = [1, 5, 10, 50, 100, 500, 1000];
	var ARRAY_LETTER = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];

	var RomanNumber = {};
	RomanNumber.str2num = function(str) {
		var num = 0, index=0, sameLetter=0, 
			currentChar, nextChar, currentCharPosition, 
			nextCharPosition, temp;

		while (index < str.length) {
			currentChar = str.charAt(index);
			currentCharPosition = charPosition(currentChar);			
			if (index === str.length-1) {
				num += char2num(currentChar) * (sameLetter+1);
			} else {
				nextChar = str.charAt(index+1);
				nextCharPosition = charPosition(nextChar);
				if (nextCharPosition < currentCharPosition) {
					num += char2num(currentChar) * (sameLetter+1);
					sameLetter=0
				} else if (nextCharPosition > currentCharPosition) {
					//for IIV
					if (sameLetter >= 1) {
						throw 'invalid';
					}
					//small left just could be I X C
					if ((currentChar !== 'I') &&
						(currentChar !== 'X') &&
						(currentChar !== 'C')) {
						throw 'invalid';
					}
					//99 is not IC, is XCIX
					if (nextCharPosition > (currentCharPosition+2)) {
						throw 'invalid';
					}
					//for big roman number left
					if (index+2<str.length) {
						temp = charPosition(str.charAt(index+2));
						if (temp>=nextCharPosition) throw 'invalid';
					}
					if (index+3<str.length) {
						temp = charPosition(str.charAt(index+3));
						if (temp>=nextCharPosition) throw 'invalid';
					}

					num += char2num(nextChar) - char2num(currentChar);
					index++;
					sameLetter=0
				} else if (nextCharPosition === currentCharPosition) {
					switch (currentChar) {
						case 'V':
						case 'L':
						case 'D':
							// V L D can not have more than one
							throw 'invalid';
							break;
						case 'I':
						case 'X':
						case 'C':
						case 'M':
							//for VIIII
							if (sameLetter >= 2) {
								throw 'invalid';
							}
							break;
						default:
							throw 'invalid';
							break;
					}
					sameLetter++;
				}
			}
			index++;
		}
		return num;
	};
	RomanNumber.num2str = function(num) {
		var str = '', times;
		if (num<0 || num>4000) {
			throw 'invalid';
		}
		for (var i=ARRAY_NUM.length-1; i>=0; i--) {
			times = Math.floor(num/ARRAY_NUM[i]);
			if (times === 4) {
				str += ARRAY_LETTER[i] + ARRAY_LETTER[i+1];
			} else {
				for (var j=0; j<times; j++) {
					str += ARRAY_LETTER[i];
				}
			}
			num -= times * ARRAY_NUM[i];
			if ((ARRAY_LETTER[i] === 'M') || 
				(ARRAY_LETTER[i] === 'C') ||
				(ARRAY_LETTER[i] === 'X')) {
				if (num >= Math.floor(ARRAY_NUM[i]*0.9)) {
					str += ARRAY_LETTER[i-2] + ARRAY_LETTER[i];
					num -= Math.floor(ARRAY_NUM[i]*9/10);
				}	
			}
		}
		return str;
	}

	function charPosition(c) {
		var index = ARRAY_LETTER.indexOf(c);
		if (index < 0) {
			throw 'invalid';
		}
		return index;
	}
	function char2num(c) {
		return ARRAY_NUM[charPosition(c)];
	}
	return RomanNumber;
});