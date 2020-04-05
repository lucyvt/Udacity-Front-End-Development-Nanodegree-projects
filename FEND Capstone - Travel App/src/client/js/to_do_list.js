//create an array for to-do tasks
let todoList = [];

const liItem = document.querySelector('.item');

//add-a-task function
export const addTask = (text) => {
    const task = {
        text,
        checked: false,
        id: Date.now(),
    };

    todoList.push(task);
    console.log(todoList);

    const list = document.querySelector('.to-do-list');

    list.insertAdjacentHTML('beforeend', 
    '<li class="item" data-key="' + addTask.id + '<i class="far fa-check-square"></i><i class="far fa-square"></i>' + addTask.text + '<i class="fas fa-times"></i></li>');
    

    liItem.addEventListener('click', (ev) => {
        if(ev.target.classList.contains('far')) {
            alert('yes');
            const itemKey = ev.target.parentElement.dataset.key;

            checkDone(itemKey);
        }

        if(ev.target.classList.contains('fa-times')) {
            const itemKey = ev.target.parentElement.dataset.key;
            deleteTask(itemKey);
        }
    
    });

}
//delete a task
export const deleteTask = (key)=> {
    
    todoList = todoList.filter(listItem => listItem.id !== Number(key));
    if(liItem.getAttribute('data-key') === Number(key)) {
        liItem.remove();
    }
    

}

//check a task is done
export const checkDone = (key) => {
    const index = todoList.findIndex( listItem => listItem.id === Number(key));
    console.log(index);
    // todoList[index].checked = !todoList[index].checked;
    const listItem = document.querySelector('[data-key=' + key + ']');
    const box = document.querySelector('.fa-square');
    const check_box = document.querySelector('.fa-check-square');
    if(todoList[index].checked) {
        box.style.display = 'none';
        check_box.style.display = 'block';
        listItem.classList.add('done');
    } else {
        listItem.classList.remove('done');
        box.style.display = 'block';
        check_box.style.display = 'none';
    }
}

;