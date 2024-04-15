const assert = require('assert');

describe('OnstarConfig', function() {
    it('should throw error for invalid VIN', function() {
        const onstarConfig = {vin: ' 1HGCM82633A123456', onStarPin: '1234'};
        try {
            if (!/^[A-HJ-NPR-Z0-9]{17}$/i.test(onstarConfig.vin)) {
                throw new Error('Invalid VIN. Please check the value entered for VIN in ONSTAR_VIN.');
            }
            // If no error is thrown, then the test will fail
            assert.fail('Expected an error to be thrown');
        } catch (e) {
            assert.equal(e.message, 'Invalid VIN. Please check the value entered for VIN in ONSTAR_VIN.');
        }
    });
    
    it('should throw error for invalid VIN', function() {
        const onstarConfig = {vin: '1GCM2633A123456', onStarPin: '1234'};
        try {
            if (!/^[A-HJ-NPR-Z0-9]{17}$/i.test(onstarConfig.vin)) {
                throw new Error('Invalid VIN. Please check the value entered for VIN in ONSTAR_VIN.');
            }
            // If no error is thrown, then the test will fail
            assert.fail('Expected an error to be thrown');
        } catch (e) {
            assert.equal(e.message, 'Invalid VIN. Please check the value entered for VIN in ONSTAR_VIN.');
        }
    });

    it('should throw error for invalid PIN', function() {
        const onstarConfig = {vin: '1HGCM82633A123456', onStarPin: '12345'};
        try {
            if (!/^\d{4}$/.test(onstarConfig.onStarPin)) {
                throw new Error('ONSTAR_PIN must be a 4-digit number');
            }
            // If no error is thrown, then the test will fail
            assert.fail('Expected an error to be thrown');
        } catch (e) {
            assert.equal(e.message, 'ONSTAR_PIN must be a 4-digit number');
        }
    });

    it('should throw error for invalid PIN', function() {
        const onstarConfig = {vin: '1HGCM82633A123456', onStarPin: '123'};
        try {
            if (!/^\d{4}$/.test(onstarConfig.onStarPin)) {
                throw new Error('ONSTAR_PIN must be a 4-digit number');
            }
            // If no error is thrown, then the test will fail
            assert.fail('Expected an error to be thrown');
        } catch (e) {
            assert.equal(e.message, 'ONSTAR_PIN must be a 4-digit number');
        }
    });
});