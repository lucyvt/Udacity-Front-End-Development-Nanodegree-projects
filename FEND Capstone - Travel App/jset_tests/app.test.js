import { geoNamesAPI, weatherbitAPI, pixabayAPI, updateUI } from '../src/client/js/application.js'

test('geoNamesAPI shoud be a function', () => {
        expect(typeof geoNamesAPI).toBe('function');
});

test('weatherbitAPI shoud be a function', () => {
        expect(typeof weatherbitAPI).toBe('function');
});

test('pixabayAPI shoud be a function', () => {
        expect(typeof pixabayAPI).toBe('function');
});

test('updateUI shoud be a function', () => {
        expect(typeof updateUI).toBe('function');
});

