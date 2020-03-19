import { isValidURL } from '../src/client/js/urlChecker'

//a test for successful url_input
describe('isValidURL function', () => {
    test('it should check if the input is a url or not', () => {

        const user_url = "https://www.udacity.com/";
        
        expect(isValidURL(user_url)).toBe(true);
        
    });

});

//a test for failed url_input
describe('isValidURL function', () => {
    test('it should check if the input is a url or not', () => {


        const user_url = "htp://www.udacity.com/";
   
       
        expect(isValidURL(user_url)).toBe(false);
    });

});


