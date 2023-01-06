define([], function(){
	"use strict";

	function RomanNumber3() {
		this.ARRAY_NUM = [1, 5, 10, 50, 100, 500, 1000];
		this.ARRAY_LETTER = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
		this.init();
	};
	RomanNumber3.prototype.init = function() {
		this.NUM_MIN = 1;
		this.NUM_MAX = this.ARRAY_NUM[this.ARRAY_NUM.length-1]*4-1; //3999
	};
	RomanNumber3.prototype.str2num = function(inputStr) {
		var num, i, currentChar, nextChar, currentCharIndex, nextCharIndex, str, temp;

		str = inputStr.trim();

		if (str.length <= 0) {
			throw 'empty is invalid'
		}

		num=0;
		i=0;
		nextCharIndex=-1;
		while (i < str.length) {
			currentChar = str.charAt(i);
			currentCharIndex = this._charIndex(currentChar);
			if (i < str.length-1) {
				nextChar = str.charAt(i+1);
				nextCharIndex = this._charIndex(nextChar);
			}

			if (currentCharIndex < nextCharIndex) {
				num -= this._char2num(currentChar);
			} else {
				num += this._char2num(currentChar);
			}
			
			i++;
			nextCharIndex=-1;
		}

		temp = this.num2str(num);
		if (temp !== str) {
			throw 'non-standard Roman Number';
		}

		return num;
	};

	RomanNumber3.prototype.num2str = function(num) {
		var str = '', times;
		if (num<this.NUM_MIN || num>this.NUM_MAX) {
			throw 'number exceed scope ['+this.NUM_MIN+','+this.NUM_MAX+']';
		}
		for (var i=this.ARRAY_NUM.length-1; i>=0; i--) {
			times = Math.floor(num/this.ARRAY_NUM[i]);
			if (times === 4) {
				// for IV XL CD 4 40 400
				str += this.ARRAY_LETTER[i] + this.ARRAY_LETTER[i+1];
			} else {
				for (var j=0; j<times; j++) {
					str += this.ARRAY_LETTER[i];
				}
			}
			num -= times * this.ARRAY_NUM[i];
			//for IX VL CM 9 90 900
			if (!this._isOdd(i) && i!==0) {
				if (num >= Math.floor(this.ARRAY_NUM[i]*0.9)) {
					str += this.ARRAY_LETTER[i-2] + this.ARRAY_LETTER[i];
					num -= Math.floor(this.ARRAY_NUM[i]*0.9);
				}	
			}
		}
		return str;
	}

	RomanNumber3.prototype._charIndex = function(c) {
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
	RomanNumber3.prototype._char2num = function(c) {
		return this.ARRAY_NUM[this._charIndex(c)];
	}
	RomanNumber3.prototype._isOdd = function(num) { 
		return num % 2;
	}
	return RomanNumber3;
});