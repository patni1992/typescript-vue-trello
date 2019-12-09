import * as Factory from 'factory.ts';
import { markdownData } from '../markdown';
import { Colors } from '../../src/interfaces/Colors';
import { sample } from 'lodash';

let counter = 0;

export const resetCounter = (): void => {
    counter = 0;
};

export const cardFactory = Factory.makeFactory({
    content: Factory.each(() => markdownData[Math.floor(Math.random() * markdownData.length)]),
    color: Factory.each(() => sample(Colors)),
    position: Factory.each(() => counter++),
});
