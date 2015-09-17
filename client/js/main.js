define(['RomanNumber'], function(romanNumber){
	"use strict";
	var main = function(){
	};
	main.prototype.compute = function() {
		// alert("test");
		var str1, str2, num1=-1, num2=-1, sum, sumStr;

		$('#firstNum').removeClass('invalid');
		$('#secondNum').removeClass('invalid');
		$('#sum').removeClass('invalid');

		str1 = $('#firstNum').val();
		str2 = $('#secondNum').val();

		try {
			num1 = romanNumber.str2num(str1);
		} catch (err) {
			$('#firstNum').addClass('invalid');
		}
		try {
			num2 = romanNumber.str2num(str2);
		} catch (err) {
			$('#secondNum').addClass('invalid');
		}

		$("#sum").val('');
		if ((num1 !== -1) && (num2 !== -1)) {
			sum= num1 + num2;
			try {
				sumStr = romanNumber.num2str(sum);
				$("#sum").val(sumStr);
			} catch (err) {
				$('#sum').addClass('invalid');
			}
		}
	};
	return main;
});