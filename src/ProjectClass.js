import { pages } from "./Pages";

const addProjectBtn = document.getElementById("add-project-btn");
const projectName = document.getElementById("project-name");
const submitProjectBtn = document.getElementById("submit-project-btn");
const addProjectBox = document.querySelector(".add-project-box");
const projectsDiv = document.querySelector(".projects");
const deleteProjectBtn = document.querySelectorAll(".delete-project");
const statusPageText = document.getElementById("status-text");

//PROJECT CLASS AND PROJECTS LIST CLASS

export class Project {
  constructor(name) {
    this.name = name;
  }

  tasks = [];

  getTasks() {
    return this.tasks;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(task) {
    this.tasks.splice(task, 1);
  }
}

class Projects {
  projects = [];

  getProjects() {
    return this.projects;
  }

  addProject(project) {
    this.projects.push(project);
  }
}

export const ProjectList = new Projects();

// --- LOCAL STORAGE HELPERS ---
export function saveProjectsToLocalStorage() {
  const projects = ProjectList.getProjects().map((project) => ({
    name: project.name,
    tasks: project.tasks,
  }));
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function loadProjectsFromLocalStorage() {
  const data = localStorage.getItem("projects");
  if (!data) return;
  try {
    const projects = JSON.parse(data);
    projects.forEach((proj) => {
      const project = new Project(proj.name);
      project.tasks = proj.tasks || [];
      ProjectList.projects.push(project);
      submitProjectDiv(project, true); // true = skip duplicate check
    });
  } catch (e) {
    // If data is corrupted, ignore and do not crash
    console.error("Failed to load projects from localStorage", e);
  }
}

//ADD PROJECT BUTTON OPEN CLOSE

let boxopened = false;

export function addProjectDiv() {
  boxopened = !boxopened;

  if (boxopened) {
    addProjectBox.style.display = "flex";
  } else {
    addProjectBox.style.display = "none";
  }
}

//SUBMITTING A NEW PROJECT

submitProjectBtn.addEventListener("click", () => {
  const project = new Project(projectName.value);
  addProjectBox.style.display = "none";
  submitProjectDiv(project);
  ProjectList.addProject(project);
  saveProjectsToLocalStorage();
  pages(projectName.value);
});

addProjectBtn.addEventListener("click", () => {
  addProjectDiv();
});

export function submitProjectDiv(project, skipDuplicateCheck = false) {
  const projectsList = ProjectList.getProjects();

  if (!skipDuplicateCheck) {
    for (let i = 0; i < projectsList.length; i++) {
      if (projectsList[i].name == project.name) {
        alert("More than one project can't have the same name!");
        return;
      }
    }
  }

  const newProjectdiv = document.createElement("div");

  newProjectdiv.innerHTML = `
                <div class="folderandname">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>folder-outline</title>
                  <path
                    d="M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z"
                  />
                </svg>
                <button class="projectname">${project.name}</button>
                </div>
                <button class="delete-project">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>trash-can</title>
                    <path
                      d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"
                    />
                  </svg>
                </button>`;

  const projectBtn = newProjectdiv.querySelector(".projectname");
  projectBtn.addEventListener("click", () => {
    pages(projectBtn.textContent);
  });

  const projectDeleteBtn = newProjectdiv.querySelector(".delete-project");

  projectDeleteBtn.addEventListener("click", () => {
    const projectsList = ProjectList.getProjects();
    const folderandname = newProjectdiv.querySelector(".folderandname");
    const projectName = folderandname.querySelector(".projectname").textContent;

    for (let i = 0; i < projectsList.length; i++) {
      if (projectsList[i].name === projectName) {
        projectsList.splice(i, 1);
      }
    }

    pages("");
    newProjectdiv.remove();
    saveProjectsToLocalStorage();
  });

  newProjectdiv.classList.add("project");
  projectsDiv.appendChild(newProjectdiv);
}

//ADD DEMO PROJECT

export function addDemoProject(project) {
  const newProjectdiv = document.createElement("div");

  newProjectdiv.innerHTML = `
                <div class="folderandname">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>folder-outline</title>
                  <path
                    d="M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z"
                  />
                </svg>
                <button class="projectname">${project.name}</button>
                </div>
                <button class="delete-project">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>trash-can</title>
                    <path
                      d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"
                    />
                  </svg>
                </button>`;

  const projectBtn = newProjectdiv.querySelector(".projectname");
  projectBtn.addEventListener("click", () => {
    pages(projectBtn.textContent);
  });

  const projectDeleteBtn = newProjectdiv.querySelector(".delete-project");

  projectDeleteBtn.addEventListener("click", () => {
    const projectsList = ProjectList.getProjects();
    const folderandname = newProjectdiv.querySelector(".folderandname");
    const projectName = folderandname.querySelector(".projectname").textContent;

    for (let i = 0; i < projectsList.length; i++) {
      if (projectsList[i].name === projectName) {
        projectsList.splice(i, 1);
      }
    }

    pages("");
    newProjectdiv.remove();
    saveProjectsToLocalStorage();
  });

  newProjectdiv.classList.add("project");
  projectsDiv.appendChild(newProjectdiv);
}

window.addEventListener("DOMContentLoaded", () => {
  loadProjectsFromLocalStorage();
});
