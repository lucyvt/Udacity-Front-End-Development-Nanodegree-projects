import { handleSubmit } from '../src/client/js/formHandler'


describe('test if "handleSubmit()" exists', () => {

    test('it should return true', () => {

        expect(handleSubmit).toBeDefined();
    });
    
});

