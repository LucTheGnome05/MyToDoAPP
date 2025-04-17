const taskListDiv = document.querySelector(".list-tasks");
const myForm = document.querySelector("#my-form");

window.addEventListener("DOMContentLoaded", function () {
    const savedTasks = getSavedData();
    savedTasks.forEach(function(task) {
        const taskHTML = generateHTMLstructure(task);
        taskListDiv.appendChild(taskHTML);
    });
});

myForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const input = event.target.elements.ourTask;
    const taskText = input.value.trim();

    if (taskText === "") return;

    const tasks = getSavedData();

    const newTask = {
        id: uuidv4(),
        ourTask: taskText,
        completed: false
    };

    tasks.push(newTask);
    saveData(tasks);
    input.value = "";

    const taskHTML = generateHTMLstructure(newTask);
    taskListDiv.appendChild(taskHTML);

    taskListDiv.scrollTop = taskListDiv.scrollHeight;
});
