define([], function(){
	"use strict";

	function RomanNumber2() {
		this.lookup = {I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
		this.numeralCodes = [["","I","II","III","IV","V","VI","VII","VIII","IX"],         // Ones
                    		 ["","X","XX","XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],   // Tens
                    		 ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"],		  // Hundreds
                    		 ["","M","MM","MMM"]];        // Thousands
        this.NUM_MIN = 1;
		this.NUM_MAX = 3999;
	}

	RomanNumber2.prototype.str2num = function(romanStr) {
		var arabic = 0, temp, roman = romanStr.trim(), i = roman.length;
		while (i--) {
		    if ( roman[i+1] &&
		    	 this._char2num(roman[i]) < this._char2num(roman[i+1]) ) {
		        arabic -= this._char2num(roman[i]);
		    } else {
		        arabic += this._char2num(roman[i]);
		    }
		}

		temp = this.num2str(arabic);
		if (temp !== roman) {
		  	throw 'non-standard Roman Number';
		}

		return arabic;
	};

	RomanNumber2.prototype.num2str = function(num) {
	  	var numeral = "", digits;

		if (num<this.NUM_MIN || num>this.NUM_MAX) {
			throw 'number exceed scope ['+this.NUM_MIN+','+this.NUM_MAX+']';
		}

		digits = num.toString().split('')

	  	for (var i=0; i < digits.length; i++){
	    	numeral += this.numeralCodes[digits.length-1-i][parseInt(digits[i])];
	  	}
	  	return numeral;
	};

	RomanNumber2.prototype._char2num = function(c) {
		var errorInfo;
		if (this.lookup[c] === undefined) {
			errorInfo = 'valid letter just could be ';
			for (var key in this.lookup) {
			    if (this.lookup.hasOwnProperty(key)) {
			        errorInfo += key;
			    }
			}
			throw errorInfo;
		}
		return this.lookup[c];
	};

	return RomanNumber2;
});