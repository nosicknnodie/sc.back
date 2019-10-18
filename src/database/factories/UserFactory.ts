import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { User } from '../../../src/api/models/User';

define(User, (faker: typeof Faker, settings: { role: string }) => {
    const gender = faker.random.number(1);
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);
    const email = faker.internet.email(firstName, lastName);
    const rDt = new Date(Date.now());
    const user = new User();

    user.idx = uuid.v1();
    user.name = firstName + ' ' + lastName;
    user.enName = user.name;
    user.email = email;
    user.password = '1234';
    user.bothDt = new Date('2000-01-01');
    user.regDt = rDt;
    user.edtDt = rDt;
    return user;
});
