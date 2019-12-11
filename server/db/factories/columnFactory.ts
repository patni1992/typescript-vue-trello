import * as Factory from 'factory.ts';
import * as faker from 'faker';

let counter = 0;

export const resetCounter = (): void => {
    counter = 0;
};

export const columnFactory = Factory.makeFactory({
    title: Factory.each(() => faker.lorem.sentence()),
    position: Factory.each(() => counter++),
});
