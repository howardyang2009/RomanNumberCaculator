define([], function(){
	"use strict";

	function RomanNumber() {
		this.ARRAY_NUM = [1, 5, 10, 50, 100, 500, 1000];
		this.ARRAY_LETTER = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
		this.init();
	};
	RomanNumber.prototype.init = function() {
		this.NUM_MIN = 1;
		this.NUM_MAX = this.ARRAY_NUM[this.ARRAY_NUM.length-1]*4-1;
	};
	RomanNumber.prototype.str2num = function(inputStr) {
		var num = 0, index=0, sameLetter=0, 
			currentChar, nextChar, currentCharPosition, 
			nextCharPosition, temp, str, errorInfo;

		str = inputStr.trim();

		if (str.length <= 0) {
			throw 'empty is invalid'
		}

		while (index < str.length) {
			currentChar = str.charAt(index);
			currentCharPosition = this._charPosition(currentChar);			
			if (index === str.length-1) {
				num += this._char2num(currentChar) * (sameLetter+1);
			} else {
				nextChar = str.charAt(index+1);
				nextCharPosition = this._charPosition(nextChar);
				if (nextCharPosition < currentCharPosition) {
					num += this._char2num(currentChar) * (sameLetter+1);
					sameLetter=0
				} else if (nextCharPosition > currentCharPosition) {
					//for IIV
					if (sameLetter >= 1) {
						throw 'the left subtractive number should not more than one time, for example: IIV is invalid';
					}
					//small left just could be I X C
					if (this._isOdd(this._charPosition(currentChar))) {
						errorInfo = 'the left subtractive number just could be '
						for (var i=0; i<this.ARRAY_LETTER.length; i+=2) {
							errorInfo += this.ARRAY_LETTER[i];
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
						temp = this._charPosition(str.charAt(index+2));
						if (temp>=nextCharPosition) 
							throw 'big roman number should be left, for example: CMM is invalid';
					}
					if (index+3<str.length) {
						temp = this._charPosition(str.charAt(index+3));
						if (temp>=nextCharPosition) 
							throw 'big roman number should be left, for example: CMM is invalid';
					}

					num += this._char2num(nextChar) - this._char2num(currentChar);
					index++;
					sameLetter=0
				} else if (nextCharPosition === currentCharPosition) {
					// V L D can not have more than one
					if (this._isOdd(this._charPosition(currentChar))) {
						errorInfo = 'should not repeat ';
						for (var i=1; i<this.ARRAY_LETTER.length; i+=2) {
							errorInfo += this.ARRAY_LETTER[i];
						}
						errorInfo += ' letter';
						throw errorInfo;
					}
					//for VIIII
					if (sameLetter >= 2) {
						errorInfo = 'should not repeat ';
						for (var i=0; i<this.ARRAY_LETTER.length; i+=2) {
							errorInfo += this.ARRAY_LETTER[i];
						}
						errorInfo += ' more than 3 times';
						throw errorInfo;
					}
					sameLetter++;
				}
			}
			index++;
		}

		temp = this.num2str(num);
		if (temp !== str) {
			throw 'non-standard Roman Number';
		}

		return num;
	};
	RomanNumber.prototype.num2str = function(num) {
		var str = '', times;
		if (num<this.NUM_MIN || num>this.NUM_MAX) {
			throw 'number exceed scope ['+this.NUM_MIN+','+this.NUM_MAX+']';
		}
		for (var i=this.ARRAY_NUM.length-1; i>=0; i--) {
			times = Math.floor(num/this.ARRAY_NUM[i]);
			if (times === 4) {
				str += this.ARRAY_LETTER[i] + this.ARRAY_LETTER[i+1];
			} else {
				for (var j=0; j<times; j++) {
					str += this.ARRAY_LETTER[i];
				}
			}
			num -= times * this.ARRAY_NUM[i];
			//letter is M C X
			if (!this._isOdd(i) && i!==0) {
				if (num >= Math.floor(this.ARRAY_NUM[i]*0.9)) {
					str += this.ARRAY_LETTER[i-2] + this.ARRAY_LETTER[i];
					num -= Math.floor(this.ARRAY_NUM[i]*9/10);
				}	
			}
		}
		return str;
	}

	RomanNumber.prototype._charPosition = function(c) {
		var errorInfo, index = this.ARRAY_LETTER.indexOf(c);
		if (index < 0) {
			errorInfo = 'valid letter just could be ';
			for (var i=0; i<this.ARRAY_LETTER.length; i++) {
				errorInfo += this.ARRAY_LETTER[i];
			}
			throw errorInfo;
		}
		return index;
	}
	RomanNumber.prototype._char2num = function(c) {
		return this.ARRAY_NUM[this._charPosition(c)];
	}
	RomanNumber.prototype._isOdd = function(num) { 
		return num % 2;
	}
	return RomanNumber;
});