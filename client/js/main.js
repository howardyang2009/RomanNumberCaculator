define(['RomanNumber', 'RomanNumberEx', 'RomanNumber2', 'RomanNumber3'], function(romanNumber, romanNumberEx, romanNumber2, romanNumber3){
	"use strict";
	var main = {};
	main.compute = function() {
		// alert("test");
		var str1, str2, num1=-1, num2=-1, sum, sumStr, caculator, calcValue;

		calcValue = $('input[name=Caculator]:checked').val();
		if (calcValue === 'RomanNumber') {
			caculator = new romanNumber;
		} else if (calcValue === 'RomanNumber2') {
			caculator = new romanNumber2;
		} else if (calcValue === 'RomanNumber3'){
			caculator = new romanNumber3;
		} else {
			caculator = new romanNumberEx;
		}

		$('#firstNum').removeClass('invalid');
		$('#secondNum').removeClass('invalid');
		$('#sum').removeClass('invalid');

		str1 = $('#firstNum').val();
		str2 = $('#secondNum').val();

		try {
			num1 = caculator.str2num(str1);
		} catch (err) {
			$('#error1').html(err);
			$('#firstNum').addClass('invalid');
		}
		try {
			num2 = caculator.str2num(str2);
		} catch (err) {
			$('#error2').html(err);
			$('#secondNum').addClass('invalid');
		}

		$("#sum").val('');
		if ((num1 !== -1) && (num2 !== -1)) {
			sum= num1 + num2;
			try {
				sumStr = caculator.num2str(sum);
				$("#sum").val(sumStr);
			} catch (err) {
				$('#error3').html(err);
				$('#sum').addClass('invalid');
			}
		}
	};
	return main;
});