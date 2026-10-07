document.addEventListener("DOMContentLoaded", () =>
{

let inputTask = document.getElementById("input-task");
let addBtn = document.getElementById("addBtn");
let todoList = document.getElementById("todo-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task => displayTasks(task));

addBtn.addEventListener("click", () =>{
    let taskText = inputTask.value.trim();

    if(taskText === "") return;

    let newTask = {
        id : Date.now(),
        text : taskText,
        completed : false,
    };

    tasks.push(newTask);
    saveTask();
    displayTasks(newTask);
    inputTask.value = "";
    console.log(tasks);

});

function displayTasks(task)
{
    let li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.className = "flex justify-between items-center bg-white p-1 mt-2 rounded-md"
    li.innerHTML = `
        <span class = "text-gray-800">${task.text}</span>
        <button class = "bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 hover:cursor-pointer">delete</button>
    `;
    li.addEventListener("click", (e) =>
    {
        if(e.target.tagName === "BUTTON") return;
        task.completed = !task.completed;
        li.classList.toggle("line-through");
        li.classList.toggle("opacity-50");
        
        saveTask();
    });

    li.querySelector("button").addEventListener("click", (e) =>
    {
        e.stopPropagation();
        tasks = tasks.filter(t => t.id !== task.id);
        li.remove();
        saveTask();
    });



    todoList.appendChild(li);
}

function saveTask()
{
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
})