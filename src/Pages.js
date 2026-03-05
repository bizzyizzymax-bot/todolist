import { ProjectList } from "./ProjectClass";
import { saveProjectsToLocalStorage } from "./ProjectClass";
const taskbox = document.querySelector(".task-box");

const statusPageText = document.getElementById("status-text");

export function pages(project) {
  const projectList = ProjectList.getProjects();
  statusPageText.textContent = project;
  taskbox.innerHTML = "";
  for (let i = 0; i < projectList.length; i++) {
    if (projectList[i].name === project) {
      const currentPage = projectList[i];
      const tasksList = currentPage.getTasks();
      for (let x = 0; x < tasksList.length; x++) {
        const task = tasksList[x];
        const taskItemDiv = document.createElement("div");
        const titleandcheck = document.createElement("div");
        const priorityText = document.createElement("p");
        const priorityanddate = document.createElement("div");
        const first = document.createElement("first");
        const second = document.createElement("second");

        titleandcheck.innerHTML = `<button></button>
                <p class="title">${task.name}</p>`;
        first.appendChild(titleandcheck);

        titleandcheck.classList.add("titleandcheck");

        if (task.priority === "low") {
          priorityText.classList.add("priority-low");
          priorityText.textContent = "Low";
        } else if (task.priority === "medium") {
          priorityText.classList.add("priority-medium");
          priorityText.textContent = "Medium";
        } else if (task.priority === "high") {
          priorityText.classList.add("priority-high");
          priorityText.textContent = "High";
        }

        priorityanddate.appendChild(priorityText);

        priorityanddate.innerHTML =
          priorityanddate.innerHTML +
          `<p>${task.date}</p>
                <button>
                  <svg
                    class="trash-closed"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <title>delete</title>
                    <path
                      d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                    />
                  </svg>
                  <svg
                    class="trash-open"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <title>delete-empty</title>
                    <path
                      d="M20.37,8.91L19.37,10.64L7.24,3.64L8.24,1.91L11.28,3.66L12.64,3.29L16.97,5.79L17.34,7.16L20.37,8.91M6,19V7H11.07L18,11V19A2,2 0 0,1 16,21H8A2,2 0 0,1 6,19Z"
                    />
                  </svg>
                </button>`;

        priorityanddate.classList.add("priorityanddate");

        first.appendChild(priorityanddate);

        second.innerHTML = `<p class="description">Description:</p>
              <p class="description-text">
                ${task.description}
              </p>`;

        taskItemDiv.classList.add("task-item");
        first.classList.add("first");
        second.classList.add("second");

        taskItemDiv.appendChild(first);
        taskItemDiv.appendChild(second);
        taskbox.appendChild(taskItemDiv);

        const deleteTaskBtn = priorityanddate.querySelector("button");

        deleteTaskBtn.addEventListener("click", () => {
          const taskItem = deleteTaskBtn.parentNode.parentNode.parentNode;
          currentPage.removeTask(task);
          taskItem.remove();
          saveProjectsToLocalStorage();
        });

        const comepletedTaskBtn = titleandcheck.querySelector("button");

        let checked = !!task.completed;
        if (checked) {
          const taskTitle = titleandcheck.querySelector("p");
          taskTitle.style.textDecoration = "line-through";
        }

        comepletedTaskBtn.addEventListener("click", () => {
          const taskTitle = titleandcheck.querySelector("p");
          checked = !checked;

          if (checked) {
            taskTitle.style.textDecoration = "line-through";
            task.completed = true;
          } else {
            taskTitle.style.textDecoration = "none";
            task.completed = false;
          }
          saveProjectsToLocalStorage();
        });
      }
    }
  }
}
