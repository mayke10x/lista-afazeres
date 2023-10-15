window.addEventListener("load", () => {
    fillingOutInitialTheTasksTable();

    const form = document.getElementById("form_task");
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        addNewTask();
    });
});

function fillingOutInitialTheTasksTable() {
    let getTasks = localStorage.getItem('tasks');
    
    if (getTasks) {
        getTasks = JSON.parse(getTasks);

        if (Array.isArray(getTasks)) {
            updateTasksTable(getTasks);
        } else {
            updateTasksTable([]);
        }
    }
}

function addNewTask() {
    const describeTask = document.getElementById('describe_task');

    if (!describeTask.value) {
        alert('Necessário preencher o campo de descrição da task');
        return;
    }

    let getTasks = localStorage.getItem('tasks');

    if (getTasks) {
        getTasks = JSON.parse(getTasks);

        if (Array.isArray(getTasks)) {
            getTasks.push({
                id: getTasks.length + 1,
                task_title: describeTask.value,
                checked: false,
            })
        } else {
            getTasks = [{
                id: 1,
                task_title: describeTask.value,
                checked: false,
            }];
        }
    } else {
        getTasks = [{
            id: 1,
            task_title: describeTask.value,
            checked: false,
        }];
    }

    localStorage.setItem('tasks', JSON.stringify(getTasks));

    updateTasksTable(getTasks);

    describeTask.value = '';

    alert('Nova tarefa adicionada');
}

function updateTasksTable(tasks) {
    const tbody = document.getElementsByTagName('tbody')[0];

    if (tasks.length <= 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3">
                    Nenhuma tarefa encontrada, adicione uma nova tarefa para aparecer aqui
                </td>
            </tr>
        `
        return;
    }

    let tr = '';
    
    for (const task of tasks) {
        tr += `
            <tr>
                <td>
                    <input type="checkbox" ${task.checked ? 'checked' : ''} name="check_${task.id}" id="check_${task.id}" onclick="toMarkToChecked(`+ task.id +`)">
                </td>

                <td id="title_task_${task.id}" class="${task.checked ? 'item_checked' : ''}">
                    ${task.task_title}
                </td>

                <td>
                    <button type="button" class="btn" id="btn_delete" title="Cancelar" onclick="deleteTask('`+ task.id +`')">❌</button>
                </td>
            </tr>
        `
    }

    tbody.innerHTML = tr;
}

function toMarkToChecked(idTask) {
    let getTasks = localStorage.getItem('tasks');
    
    if (getTasks) {
        getTasks = JSON.parse(getTasks);

        if (Array.isArray(getTasks)) {
            getTasks = getTasks.map((task) => {
                if (task.id === idTask) {
                    return { ...task, checked: !task.checked }
                } else {
                    return { ...task }
                }
            });

            localStorage.setItem('tasks', JSON.stringify(getTasks));

            const checkbox = document.getElementById('check_' + idTask);
            const titleTask = document.getElementById('title_task_' + idTask);

            if (checkbox.checked) {
                titleTask.classList.add('item_checked');
            } else {
                titleTask.classList.remove('item_checked');
            }
        } else {
            updateTasksTable([]);
        }
    }
}

function deleteTask(idTask) {
    let getTasks = localStorage.getItem('tasks');
    
    if (getTasks) {
        getTasks = JSON.parse(getTasks);

        if (Array.isArray(getTasks)) {
            if (getTasks.length > 0) {
                getTasks = getTasks.filter(task => task.id != idTask);

                localStorage.setItem('tasks', JSON.stringify(getTasks));
            }

            updateTasksTable(getTasks);
        } else {
            updateTasksTable([]);
        }
    }
}
