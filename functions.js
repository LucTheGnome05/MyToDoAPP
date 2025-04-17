function getSavedData() {
    const data = localStorage.getItem("Tasks");
    return data !== null ? JSON.parse(data) : [];
}

function saveData(data) {
    localStorage.setItem("Tasks", JSON.stringify(data));
}

function generateHTMLstructure(task) {
    const div = document.createElement("div");
    div.classList.add("task-item", "animate__animated", "animate__backInUp");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = task.completed || false;

    const span = document.createElement("span");
    span.textContent = task.ourTask;

    const delButton = document.createElement("button");
    delButton.textContent = "🗑️";

    if (checkbox.checked) {
        span.style.textDecoration = "line-through";
    }

    span.addEventListener("dblclick", function () {
        const input = document.createElement("input");
        input.type = "text";
        input.value = task.ourTask;
        input.classList.add("edit-input");

        function saveEdit() {
            const newValue = input.value.trim();
            if (newValue) {
                span.textContent = newValue;
                task.ourTask = newValue;

                const tasks = getSavedData();
                const found = tasks.find(function (t) {
                    return t.id === task.id;
                });

                if (found) {
                    found.ourTask = newValue;
                    saveData(tasks);
                }

                div.replaceChild(span, input);
            } else {
                div.classList.remove("animate__backInUp");
                div.classList.add("animate__animated", "animate__backOutUp");

                div.addEventListener("animationend", function () {
                    const tasks = getSavedData().filter(function (t) {
                        return t.id !== task.id;
                    });
                    saveData(tasks);
                    div.remove();
                });
            }
        }

        input.addEventListener("blur", saveEdit);
        input.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                saveEdit();
            }
        });

        div.replaceChild(input, span);
        input.focus();
    });

    checkbox.addEventListener("change", function () {
        const tasks = getSavedData();
        const foundTask = tasks.find(function (t) {
            return t.id === task.id;
        });

        if (foundTask) {
            foundTask.completed = checkbox.checked;
            saveData(tasks);
            span.style.textDecoration = checkbox.checked ? "line-through" : "none";

            div.classList.remove("animate__backInUp");

            setTimeout(function () {
                div.classList.add("animate__animated", "animate__backOutUp");
                div.addEventListener("animationend", function () {
                    const updatedTasks = getSavedData().filter(function (t) {
                        return t.id !== task.id;
                    });
                    saveData(updatedTasks);
                    div.remove();
                });
            }, 1500);
        }
    });

    delButton.addEventListener("click", function () {
        div.classList.remove("animate__backInUp");
        div.classList.add("animate__animated", "animate__backOutUp");

        div.addEventListener("animationend", function () {
            const tasks = getSavedData().filter(function (t) {
                return t.id !== task.id;
            });
            saveData(tasks);
            div.remove();
        });
    });

    div.appendChild(checkbox);
    div.appendChild(span);
    div.appendChild(delButton);

    return div;
}
