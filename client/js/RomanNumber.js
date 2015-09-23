define([], function(){
	"use strict";
	var ARRAY_NUM = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000];
	var ARRAY_LETTER = ['I', 'V', 'X', 'L', 'C', 'D', 'M', 'v', 'x', 'l', 'c', 'd', 'm'];
	var NUM_MIN = 1;
	var NUM_MAX = ARRAY_NUM[ARRAY_NUM.length-1]*4-1;

	var RomanNumber = {};
	RomanNumber.str2num = function(inputStr) {
		var num = 0, index=0, sameLetter=0, 
			currentChar, nextChar, currentCharPosition, 
			nextCharPosition, temp, str, errorInfo;

		str = inputStr.trim();

		if (str.length <= 0) {
			throw 'empty is invalid'
		}

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
						throw 'the left subtractive number should not more than one time, for example: IIV is invalid';
					}
					//small left just could be I X C
					if (isOdd(charPosition(currentChar))) {
						errorInfo = 'the left subtractive number just could be '
						for (var i=0; i<ARRAY_LETTER.length; i+=2) {
							errorInfo += ARRAY_LETTER[i];
						}
						errorInfo += ', for example: VX is invalid';
						throw errorInfo;
					}
					//99 is not IC, is XCIX
					if (nextCharPosition > (currentCharPosition+2)) {
						throw 'the subtractive number just could be IX or IV style, for example: 99 is not IC, is XCIX';
					}
					//for big roman number left
					if (index+2<str.length) {
						temp = charPosition(str.charAt(index+2));
						if (temp>=nextCharPosition) 
							throw 'big roman number should be left, for example: CMM is invalid';
					}
					if (index+3<str.length) {
						temp = charPosition(str.charAt(index+3));
						if (temp>=nextCharPosition) 
							throw 'big roman number should be left, for example: CMM is invalid';
					}

					num += char2num(nextChar) - char2num(currentChar);
					index++;
					sameLetter=0
				} else if (nextCharPosition === currentCharPosition) {
					// V L D can not have more than one
					if (isOdd(charPosition(currentChar))) {
						errorInfo = 'should not repeat ';
						for (var i=1; i<ARRAY_LETTER.length; i+=2) {
							errorInfo += ARRAY_LETTER[i];
						}
						errorInfo += ' letter';
						throw errorInfo;
					}
					//for VIIII
					if (sameLetter >= 2) {
						errorInfo = 'should not repeat ';
						for (var i=0; i<ARRAY_LETTER.length; i+=2) {
							errorInfo += ARRAY_LETTER[i];
						}
						errorInfo += ' more than 3 times';
						throw errorInfo;
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
		if (num<NUM_MIN || num>NUM_MAX) {
			throw 'number exceed scope ['+NUM_MIN+','+NUM_MAX+']';
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
			//letter is M C X
			if (!isOdd(i) && i!==0) {
				if (num >= Math.floor(ARRAY_NUM[i]*0.9)) {
					str += ARRAY_LETTER[i-2] + ARRAY_LETTER[i];
					num -= Math.floor(ARRAY_NUM[i]*9/10);
				}	
			}
		}
		return str;
	}

	function charPosition(c) {
		var errorInfo, index = ARRAY_LETTER.indexOf(c);
		if (index < 0) {
			errorInfo = 'valid letter just could be ';
			for (var i=0; i<ARRAY_LETTER.length; i++) {
				errorInfo += ARRAY_LETTER[i];
			}
			throw errorInfo;
		}
		return index;
	}
	function char2num(c) {
		return ARRAY_NUM[charPosition(c)];
	}
	function isOdd(num) { 
		return num % 2;
	}
	return RomanNumber;
});