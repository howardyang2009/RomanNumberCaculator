define(['app/RomanNumber'], function(romanNumber) {
    'use strict';
    var romanNumberEx = (function(_super) {
        __extends(romanNumberEx, _super);

        function romanNumberEx() {
            _super.apply(this, arguments);
			this.ARRAY_NUM = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000];
			this.ARRAY_LETTER = ['I', 'V', 'X', 'L', 'C', 'D', 'M', 'v', 'x', 'l', 'c', 'd', 'm'];
            this.init();
        }

        return romanNumberEx;
    })(romanNumber);
    return romanNumberEx;
});