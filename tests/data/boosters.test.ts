import { expect, test } from 'vitest';
import {conditions, effectData, negativeData} from '../../src/data/boosters';

test('effect data defined properly', () => {
    for (const effect of effectData) {
        expect(effect.stat).toBeTypeOf('string');
        expect(Number.isFinite(effect.muted.min)).toBeTruthy();
        expect(Number.isFinite(effect.muted.max)).toBeTruthy();
        expect(Number.isFinite(effect.bold.min)).toBeTruthy();
        expect(Number.isFinite(effect.bold.max)).toBeTruthy();
        expect(Number.isFinite(effect.aggressive.min)).toBeTruthy();
        expect(Number.isFinite(effect.aggressive.max)).toBeTruthy();
    }
});

test('negative effect data defined properly', () => {
    for (const negative of negativeData) {
        expect(negative.stat).toBeTypeOf('string');
        if (negative.muted) {
            expect(Number.isFinite(negative.muted.min)).toBeTruthy();
            expect(Number.isFinite(negative.muted.max)).toBeTruthy();
        }
        if (negative.bold) {
            expect(Number.isFinite(negative.bold.min)).toBeTruthy();
            expect(Number.isFinite(negative.bold.max)).toBeTruthy();
        }
        if (negative.aggressive) {
            expect(Number.isFinite(negative.aggressive.min)).toBeTruthy();
            expect(Number.isFinite(negative.aggressive.max)).toBeTruthy();
        }
    }
});

test('condition data defined properly', () => {
    for (const condition of conditions) {
        expect(condition.name).toBeTypeOf('string');
        expect(condition.description).toBeTypeOf('string');
        expect(Object.keys(condition)).toHaveLength(2);
    }
});