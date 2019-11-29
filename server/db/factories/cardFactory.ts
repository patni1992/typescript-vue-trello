import * as Factory from 'factory.ts';
import { markdownData } from '../markdown';
import { colors } from '../../src/models/Board';
import { sample } from 'lodash';

export const cardFactory = Factory.makeFactory({
    content: Factory.each(() => markdownData[Math.floor(Math.random() * markdownData.length)]),
    color: sample(colors),
});
