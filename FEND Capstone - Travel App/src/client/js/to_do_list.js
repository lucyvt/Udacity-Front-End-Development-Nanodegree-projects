//create an array for to-do tasks
let todoList = [];

const list = document.querySelector('.to-do-list');
const listItem = document.querySelectorAll('.item');
const inputItem = document.querySelectorAll('.task');
const form = document.querySelector('.to-do-form'); 
const user_input = document.querySelector('.add-task');
//add-a-task function
export const addTask = (text) => {
    const task = {
        text: text,
        checked: false,
        id: Date.now(),
    };

    todoList.push(task);
    console.log(todoList);

    list.insertAdjacentHTML('beforeend',
   '<li class="item" data-key=' + task.id + '><input type="checkbox" class="task" id=' + task.id +'/><label for=' +  task.id + 'class="item-tick"></label><span>' + task.text + '</span><i class="fas fa-times delete"></i></li>');
}

list.addEventListener('click', ev => {
    if (ev.target.classList.contains('item-tick')) {
        const itemKey = ev.target.parentElement.dataset.key;

        markDone(itemKey);
    }

    if (ev.target.classList.contains('delete')) {

        const itemKey = ev.target.parentElement.dataset.key;

        deleteTask(itemKey);
    }
})
//main function
form.addEventListener('submit', () => {
    
    event.preventDefault();
const text = user_input.value.trim();

    if(text !== '') {
        
        addTask(text);
        user_input.value = '';
        user_input.focus();

    }
});
    

    
//delete a task
export const deleteTask = (key)=> {
    
    todoList = todoList.filter(item => item.id !== Number(key));
    
    const tsk = document.querySelector(`[data-key='${key}']`);

    tsk.remove();
    

}

//mark task as done
export const markDone = (key) => {

    const index = todoList.findIndex(item => item.id === Number(key));

    todoList[index].checked = !todoList[index].checked;

    const tsk = document.querySelector(`[data-key='${key}']`);

    console.log(tsk);

    if (todoList[index].checked) {
        tsk.classList.add('checked');
    } else {
        tsk.classList.remove('checked');
    }

}