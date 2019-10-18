import { validate } from 'class-validator';

import { User } from '../../../src/api/models/User';

describe('UserValidations', () => {

    test('User should always have a first name', async (done) => {
        const user = new User();
        const errorsOne = await validate(user);
        user.name = 'TestName';
        const errorsTwo = await validate(user);
        expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
        done();
    });

    test('User should always have a last name', async (done) => {
        const user = new User();
        const errorsOne = await validate(user);
        user.name = 'TestName';
        const errorsTwo = await validate(user);
        expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
        done();
    });

    test('User should always have a email', async (done) => {
        const user = new User();
        const errorsOne = await validate(user);
        user.email = 'test@test.com';
        const errorsTwo = await validate(user);
        expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
        done();
    });

    test('User validation should succeed with all required fields', async (done) => {
        const user = new User();
        user.name = 'TestName';
        user.email = 'test@test.com';
        user.password = '1234';
        user.bothDt = new Date(Date.now());
        user.enName = 'TestEnName';
        const errors = await validate(user);
        expect(errors.length).toEqual(0);
        done();
    });

});
