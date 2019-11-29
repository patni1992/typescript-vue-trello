import * as Factory from 'factory.ts';
import * as faker from 'faker';

export const columnFactory = Factory.makeFactory({
    title: Factory.each(() => faker.lorem.sentence()),
});
