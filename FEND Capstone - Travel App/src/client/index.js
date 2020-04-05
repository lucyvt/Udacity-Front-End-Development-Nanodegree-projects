
import { handleSubmit } from "./js/application.js"
import { addTask } from "./js/to_do_list.js"


//main event Handler
//add event-listener for submit-btn
document.querySelector('.save-btn').addEventListener('click', () => {
    
    event.preventDefault();

    const date = document.querySelector('#start-date').value;
    const city = document.querySelector('#user-location').value;
    
    

    // convert date format to "YYYY-MM-DD"
    const todayDate = new Date().toJSON().slice(0, 10);
//compare the input date with current time 
    if(city == '' || date == '') {
       
        alert('please enter a valid city and date!');
    
    }else if(date < todayDate) {

        alert('Travel Date can not be before current time');

    }else {

        handleSubmit(city);

    }
});

//add event-listener for reset-btn
document.querySelector('.remove-btn').addEventListener('click', ()=> {

document.querySelector('.Res-container').style.display = 'none';

});

//handle todo-list form

//import styles files
import './styles/base.scss'
import './styles/main.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/results.scss'
import './styles/media-screen.scss'


export { handleSubmit }