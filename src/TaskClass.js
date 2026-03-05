import { ProjectList, saveProjectsToLocalStorage } from "./ProjectClass";

const addTaskBtn = document.getElementById("add-task-btn");
const addTaskBox = document.querySelector(".add-task-box");
const submitTaskBtn = document.getElementById("submit-task-btn");
const projectsList = ProjectList.getProjects();
import { pages } from "./Pages";

let boxopened = false;

addTaskBtn.addEventListener("click", () => {
  displayTaskBox();
});

function displayTaskBox() {
  boxopened = !boxopened;

  if (boxopened) {
    addTaskBox.style.display = "flex";
    addTaskBox.innerHTML = "";

    const taskTitle = document.createElement("input");
    taskTitle.type = "text";
    taskTitle.id = "task-title";
    taskTitle.placeholder = "Task Title";
    addTaskBox.appendChild(taskTitle);

    const taskDescription = document.createElement("input");
    taskDescription.type = "text";
    taskDescription.id = "task-description";
    taskDescription.placeholder = "Task Description";
    addTaskBox.appendChild(taskDescription);

    const prioritySelect = document.createElement("select");
    prioritySelect.id = "priority";
    for (let i = 0; i < 3; i++) {
      if (i === 0) {
        const low = document.createElement("option");
        low.value = "low";
        low.textContent = "Low";
        prioritySelect.appendChild(low);
      } else if (i === 1) {
        const medium = document.createElement("option");
        medium.value = "medium";
        medium.textContent = "Medium";
        prioritySelect.appendChild(medium);
      } else if (i === 2) {
        const high = document.createElement("option");
        high.value = "high";
        high.textContent = "High";
        prioritySelect.appendChild(high);
      }
    }

    addTaskBox.appendChild(prioritySelect);

    const date = document.createElement("input");
    date.type = "date";
    date.id = "due-date";
    addTaskBox.appendChild(date);

    const projectSelect = document.createElement("select");
    projectSelect.name = "project";
    projectSelect.id = "project-select";

    for (let i = 0; i < projectsList.length; i++) {
      const projectOption = document.createElement("option");
      projectOption.value = projectsList[i].name;
      projectOption.textContent = projectsList[i].name;
      projectSelect.appendChild(projectOption);
    }

    addTaskBox.appendChild(projectSelect);

    const submitTaskBtn = document.createElement("button");
    submitTaskBtn.id = "submit-task-btn";
    submitTaskBtn.textContent = "Submit";

    addTaskBox.appendChild(submitTaskBtn);

    submitTaskBtn.addEventListener("click", () => {
      submitTask(
        taskTitle.value,
        taskDescription.value,
        prioritySelect.value,
        date.value,
        projectSelect.value
      );

      addTaskBox.style.display = "none";
    });
  } else {
    addTaskBox.style.display = "none";
  }
}

export class Task {
  constructor(name, description, priority, date, project) {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.date = date;
    this.project = project;
  }
}

export function submitTask(name, description, priority, date, project) {
  const task = new Task(name, description, priority, date, project);
  for (let i = 0; i < projectsList.length; i++) {
    if (projectsList[i].name === project) {
      projectsList[i].addTask(task);
    }
  }
  saveProjectsToLocalStorage();
  pages(project);

  console.log(projectsList);
}
