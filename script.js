let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask() {

    let taskInput = document.getElementById("taskInput");
    let dueDate = document.getElementById("dueDate");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskInput.value,
        due: dueDate.value,
        completed: false
    });

    saveTasks();

    taskInput.value = "";
    dueDate.value = "";

    displayTasks();
}

function displayTasks() {

    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let today = new Date().toISOString().split("T")[0];

    tasks.forEach((task, index) => {

        let li = document.createElement("li");

        let status = "⏳ Pending";
        let statusClass = "";

        if (task.completed) {
            status = "✅ Completed";
            statusClass = "completed";
        }
        else if (task.due && task.due < today) {
            status = "🔴 Overdue";
            statusClass = "overdue";
        }

        li.innerHTML = `
            <div>
                <strong>${task.text}</strong><br>
                📅 Due: ${task.due || "No Date"}<br>
                <span class="${statusClass}">
                    ${status}
                </span>
            </div>

            <div>
                <button onclick="toggleTask(${index})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button onclick="editTask(${index})">
                    Edit
                </button>

                <button onclick="deleteTask(${index})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    displayTasks();
}
function editTask(index) {

    document.getElementById("taskInput").value =
        tasks[index].text;

    document.getElementById("dueDate").value =
        tasks[index].due;

    tasks.splice(index, 1);

    saveTasks();
    displayTasks();
}
function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();
    displayTasks();
}

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}