define(['client/js/RomanNumber'], function(romanNumber) {
    'use strict';

    describe("RomaNumber.js", function() {

        beforeEach(function() {});

        afterEach(function() {});

        it ('str2num function', function() {
        	expect(romanNumber.str2num('')).toEqual(0);
        	expect(romanNumber.str2num('I')).toEqual(1);
        	expect(romanNumber.str2num('V')).toEqual(5);
        	expect(romanNumber.str2num('VI')).toEqual(6);
        	expect(romanNumber.str2num('IX')).toEqual(9);
        	expect(romanNumber.str2num('CM')).toEqual(900);
            expect(romanNumber.str2num('XCIX')).toEqual(99);
        	expect(romanNumber.str2num('MCLI')).toEqual(1151);
        	expect(romanNumber.str2num('DXV')).toEqual(515);
        	expect(romanNumber.str2num('MDCLXVI')).toEqual(1666);
        	expect(romanNumber.str2num('LXXIV')).toEqual(74);
        	expect(romanNumber.str2num('DII')).toEqual(502);
        	expect(romanNumber.str2num('DLXXVI')).toEqual(576);
        	expect(romanNumber.str2num('MMMIII')).toEqual(3003);
        	expect(romanNumber.str2num('MMMCMXCIX')).toEqual(3999);
        });

        it ('num2str function', function() {
        	expect(romanNumber.num2str(0)).toEqual('');
        	expect(romanNumber.num2str(1)).toEqual('I');
        	expect(romanNumber.num2str(5)).toEqual('V');
        	expect(romanNumber.num2str(6)).toEqual('VI');
        	expect(romanNumber.num2str(9)).toEqual('IX');
        	expect(romanNumber.num2str(900)).toEqual('CM');
            expect(romanNumber.num2str(99)).toEqual('XCIX');
        	expect(romanNumber.num2str(1151)).toEqual('MCLI');
        	expect(romanNumber.num2str(515)).toEqual('DXV');
        	expect(romanNumber.num2str(1666)).toEqual('MDCLXVI');
        	expect(romanNumber.num2str(74)).toEqual('LXXIV');
        	expect(romanNumber.num2str(502)).toEqual('DII');
            expect(romanNumber.num2str(576)).toEqual('DLXXVI');
        	expect(romanNumber.num2str(3003)).toEqual('MMMIII');
        	expect(romanNumber.num2str(3999)).toEqual('MMMCMXCIX');
        });
    });
});