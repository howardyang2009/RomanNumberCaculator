define(['client/js/RomanNumber'], function(romanNumber) {
    'use strict';

    describe("RomanNumber.js", function() {

        beforeEach(function() {});

        afterEach(function() {});

        it ('str2num function', function() {
        	// expect(romanNumber.str2num('')).toEqual(0);
        	expect(romanNumber.str2num('I')).toEqual(1);
            expect(romanNumber.str2num('II')).toEqual(2);
            expect(romanNumber.str2num('III')).toEqual(3);
            expect(romanNumber.str2num('IV')).toEqual(4);
        	expect(romanNumber.str2num('V')).toEqual(5);
        	expect(romanNumber.str2num('VI')).toEqual(6);
            expect(romanNumber.str2num('VII')).toEqual(7);
            expect(romanNumber.str2num('VIII')).toEqual(8);
        	expect(romanNumber.str2num('IX')).toEqual(9);
        	expect(romanNumber.str2num('LXXIV')).toEqual(74);
            expect(romanNumber.str2num('XCIX')).toEqual(99);
        	expect(romanNumber.str2num('DII')).toEqual(502);
            expect(romanNumber.str2num('DXV')).toEqual(515);
        	expect(romanNumber.str2num('DLXXVI')).toEqual(576);
            expect(romanNumber.str2num('CM')).toEqual(900);
            expect(romanNumber.str2num('MCLI')).toEqual(1151);
            expect(romanNumber.str2num('MDCLXVI')).toEqual(1666);
        	expect(romanNumber.str2num('MMMIII')).toEqual(3003);
        	expect(romanNumber.str2num('MMMCMXCIX')).toEqual(3999);
            expect(romanNumber.str2num('mmmcmxcMxCMXCIX')).toEqual(3999999);
        });

        it ('str2num function invalid', function() {
            expect(function(){romanNumber.str2num('')}).toThrow();
            expect(function(){romanNumber.str2num('IIV')}).toThrow();
            expect(function(){romanNumber.str2num('VX')}).toThrow();
            expect(function(){romanNumber.str2num('VB')}).toThrow();
            expect(function(){romanNumber.str2num('IL')}).toThrow();
            expect(function(){romanNumber.str2num('CMM')}).toThrow();
            expect(function(){romanNumber.str2num('VV')}).toThrow();
            expect(function(){romanNumber.str2num('VIIII')}).toThrow();
            expect(function(){romanNumber.str2num('IVI')}).toThrow();
        });

        it ('num2str function', function() {
        	// expect(romanNumber.num2str(0)).toEqual('');
        	expect(romanNumber.num2str(1)).toEqual('I');
            expect(romanNumber.num2str(2)).toEqual('II');
            expect(romanNumber.num2str(3)).toEqual('III');
            expect(romanNumber.num2str(4)).toEqual('IV');
        	expect(romanNumber.num2str(5)).toEqual('V');
        	expect(romanNumber.num2str(6)).toEqual('VI');
            expect(romanNumber.num2str(7)).toEqual('VII');
            expect(romanNumber.num2str(8)).toEqual('VIII');
        	expect(romanNumber.num2str(9)).toEqual('IX');
        	expect(romanNumber.num2str(74)).toEqual('LXXIV');
            expect(romanNumber.num2str(99)).toEqual('XCIX');
        	expect(romanNumber.num2str(502)).toEqual('DII');
            expect(romanNumber.num2str(515)).toEqual('DXV');
            expect(romanNumber.num2str(576)).toEqual('DLXXVI');
            expect(romanNumber.num2str(900)).toEqual('CM');
            expect(romanNumber.num2str(1151)).toEqual('MCLI');
            expect(romanNumber.num2str(1666)).toEqual('MDCLXVI');
        	expect(romanNumber.num2str(3003)).toEqual('MMMIII');
        	expect(romanNumber.num2str(3999)).toEqual('MMMCMXCIX');
            expect(romanNumber.num2str(3999999)).toEqual('mmmcmxcMxCMXCIX');
        });

        it ('num2str function invalid', function() {
            expect(function(){romanNumber.num2str(0)}).toThrow();
            expect(function(){romanNumber.num2str(4000000)}).toThrow();
        });
    });
});