import { addProjectDiv } from "./ProjectClass";
import { Project } from "./ProjectClass";
import { ProjectList } from "./ProjectClass";
import { addDemoProject } from "./ProjectClass";
import { Task } from "./TaskClass";
import { pages } from "./Pages";
import { submitTask } from "./TaskClass";
import { loadProjectsFromLocalStorage } from "./ProjectClass";

// Restore projects from localStorage on load
window.addEventListener("DOMContentLoaded", () => {
  // Only load from localStorage if there are no projects in memory
  if (ProjectList.getProjects().length === 0) {
    loadProjectsFromLocalStorage();
  }
  // Show the first project if any exist
  const projects = ProjectList.getProjects();
  if (projects.length > 0) {
    pages(projects[0].name);
  } else {
    pages("");
  }
});
