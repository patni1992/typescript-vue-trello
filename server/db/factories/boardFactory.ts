import * as Factory from 'factory.ts';
import * as faker from 'faker';
import { sample } from 'lodash';
import { Colors } from '../../src/interfaces/Colors';

export const boardFactory = Factory.makeFactory({
    title: Factory.each(() => faker.lorem.sentence()),
    color: Factory.each(() => sample(Colors)),
});
