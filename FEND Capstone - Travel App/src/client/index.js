import { get_API } from './js/application.js'

//main event Handler
document.querySelector('.save-btn').addEventListener('click', () => {
    
    event.preventDefault();

    const date = document.querySelector('#user-date').value;
    const city = document.querySelector('#user-location').value;

    if(city == '' || date == '') {
       
        alert('please enter a valid city and date!');
        
    } else {

        get_API(city);

    }
});


//import styles files
import './styles/base.scss'
import './styles/main.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/results.scss'
import './styles/media-screen.scss'


export { get_API }