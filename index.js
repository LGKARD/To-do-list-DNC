let tasks = [
    { id: 1, description: 'tomar banho', checked: false },
    { id: 2, description: 'tomar agua', checked: false },
    { id: 3, description: 'tomar vinho', checked: false }
]

const removeTask = (taskId) => {
    tasks = tasks.filter(({ id }) => parseInt(id) !== parseInt(taskId));
    document
        .getElementById("todo-list")
        .removeChild(document.getElementById(taskId));
}

const removeDoneTasks = () => {
    const tasksToRemove = tasks
        .filter(({ checked }) => checked)
        .map(({ id }) => id)
    
    tasks = tasks.filter(({checked}) => !checked);

    tasksToRemove.forEach((tasksToRemove) => {
        document
            .getElementById("todo-list")
            .removeChild(document.getElementById(tasksToRemove))
    })
}

const createTaskListItem = (task, checkbox) => {
    const list = document.getElementById('todo-list');
    const toDo = document.createElement('li');

    const removeTaskButton = document.createElement('button');
    removeTaskButton.textContent = 'x';
    removeTaskButton.ariaLabel = 'remover tarefa';

    removeTaskButton.onclick = () => removeTask(task.id);

    toDo.id = task.id;
    toDo.appendChild(checkbox);
    toDo.appendChild(removeTaskButton);
    list.appendChild(toDo);

    return toDo;
}

const onCheckboxClick = (event) => {
    const [id] = event.target.id.split('-');

    tasks = tasks.map((task) => {
        return parseInt(task.id) === parseInt(id) ? { ...task, checked: event.target.checked } : task;
    })
}

const getCheckboxInput = ({ id, description, checked }) => {
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const wrapper = document.createElement('div');
    const checkboxId = `${id}-checkbox`;

    checkbox.type = 'checkbox';
    checkbox.id = `${id}-checkbox`;
    checkbox.checked = checked || false;
    checkbox.addEventListener('change', onCheckboxClick)

    label.textContent = description;
    label.htmlFor = checkboxId;

    wrapper.className = 'checkbox-label-container';

    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

    return wrapper;
}

const getNewTaskId = () => {
    const lastId = tasks[tasks.length - 1]?.id;
    return lastId ? lastId + 1 : 1;
}

const getNewTaskData = () => {
    const description = event.target.elements.description.value;
    const id = getNewTaskId();
    return { description, id }
}

const createTask = (event) => {
    event.preventDefault();
    const newTaskData = getNewTaskData(event);
    const { description, id } = newTaskData;
    const checkbox = getCheckboxInput(newTaskData);
    createTaskListItem(newTaskData, checkbox);

    tasks = [...tasks, { id: newTaskData.id, description: newTaskData.description, checked: false }]
}

window.onload = function () {
    const form = document.getElementById('create-todo-form');
    form.addEventListener('submit', createTask)

    tasks.forEach((task) => {
        const checkbox = getCheckboxInput(task);
        createTaskListItem(task, checkbox)
    })
}