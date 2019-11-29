import * as Factory from 'factory.ts';
import * as faker from 'faker';

export const userFactory = Factory.makeFactory({
    firstName: Factory.each(() => faker.name.firstName()),
    lastName: Factory.each(() => faker.name.lastName()),
    username: Factory.each(() => faker.internet.userName()),
    email: Factory.each(() => faker.internet.email()),
    password: '123456',
});
