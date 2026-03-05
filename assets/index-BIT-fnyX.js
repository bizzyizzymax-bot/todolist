(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const e of c.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&s(e)}).observe(document,{childList:!0,subtree:!0});function r(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(o){if(o.ep)return;o.ep=!0;const c=r(o);fetch(o.href,c)}})();const E=document.querySelector(".task-box"),S=document.getElementById("status-text");function h(n){const t=l.getProjects();S.textContent=n,E.innerHTML="";for(let r=0;r<t.length;r++)if(t[r].name===n){const s=t[r],o=s.getTasks();for(let c=0;c<o.length;c++){const e=o[c],a=document.createElement("div"),p=document.createElement("div"),i=document.createElement("p"),u=document.createElement("div"),f=document.createElement("first"),y=document.createElement("second");p.innerHTML=`<button></button>
                <p class="title">${e.name}</p>`,f.appendChild(p),p.classList.add("titleandcheck"),e.priority==="low"?(i.classList.add("priority-low"),i.textContent="Low"):e.priority==="medium"?(i.classList.add("priority-medium"),i.textContent="Medium"):e.priority==="high"&&(i.classList.add("priority-high"),i.textContent="High"),u.appendChild(i),u.innerHTML=u.innerHTML+`<p>${e.date}</p>
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
                </button>`,u.classList.add("priorityanddate"),f.appendChild(u),y.innerHTML=`<p class="description">Description:</p>
              <p class="description-text">
                ${e.description}
              </p>`,a.classList.add("task-item"),f.classList.add("first"),y.classList.add("second"),a.appendChild(f),a.appendChild(y),E.appendChild(a);const w=u.querySelector("button");w.addEventListener("click",()=>{const g=w.parentNode.parentNode.parentNode;s.removeTask(e),g.remove(),saveProjectsToLocalStorage()});const P=p.querySelector("button");let j=!1;P.addEventListener("click",()=>{const g=p.querySelector("p");j=!j,j?(g.style.textDecoration="line-through",e.completed=!0):(g.style.textDecoration="none",e.completed=!1),saveProjectsToLocalStorage()})}}}const B=document.getElementById("add-project-btn"),b=document.getElementById("project-name"),M=document.getElementById("submit-project-btn"),k=document.querySelector(".add-project-box"),V=document.querySelector(".projects");document.querySelectorAll(".delete-project");document.getElementById("status-text");class C{constructor(t){this.name=t}tasks=[];getTasks(){return this.tasks}addTask(t){this.tasks.push(t)}removeTask(t){this.tasks.splice(t,1)}}class q{projects=[];getProjects(){return this.projects}addProject(t){this.projects.push(t)}}const l=new q;function x(){const n=l.getProjects().map(t=>({name:t.name,tasks:t.tasks}));localStorage.setItem("projects",JSON.stringify(n))}function H(){const n=localStorage.getItem("projects");if(n)try{JSON.parse(n).forEach(r=>{const s=new C(r.name);s.tasks=r.tasks||[],l.projects.push(s),T(s,!0)})}catch(t){console.error("Failed to load projects from localStorage",t)}}let v=!1;function D(){v=!v,v?k.style.display="flex":k.style.display="none"}M.addEventListener("click",()=>{const n=new C(b.value);k.style.display="none",T(n),l.addProject(n),x(),h(b.value)});B.addEventListener("click",()=>{D()});function T(n,t=!1){const r=l.getProjects();if(!t){for(let e=0;e<r.length;e++)if(r[e].name==n.name){alert("More than one project can't have the same name!");return}}const s=document.createElement("div");s.innerHTML=`
                <div class="folderandname">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>folder-outline</title>
                  <path
                    d="M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z"
                  />
                </svg>
                <button class="projectname">${n.name}</button>
                </div>
                <button class="delete-project">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>trash-can</title>
                    <path
                      d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"
                    />
                  </svg>
                </button>`;const o=s.querySelector(".projectname");o.addEventListener("click",()=>{h(o.textContent)}),s.querySelector(".delete-project").addEventListener("click",()=>{const e=l.getProjects(),p=s.querySelector(".folderandname").querySelector(".projectname").textContent;for(let i=0;i<e.length;i++)e[i].name===p&&e.splice(i,1);h(""),s.remove(),x()}),s.classList.add("project"),V.appendChild(s)}window.addEventListener("DOMContentLoaded",()=>{H()});const I=document.getElementById("add-task-btn"),d=document.querySelector(".add-task-box");document.getElementById("submit-task-btn");const m=l.getProjects();let L=!1;I.addEventListener("click",()=>{O()});function O(){if(L=!L,L){d.style.display="flex",d.innerHTML="";const n=document.createElement("input");n.type="text",n.id="task-title",n.placeholder="Task Title",d.appendChild(n);const t=document.createElement("input");t.type="text",t.id="task-description",t.placeholder="Task Description",d.appendChild(t);const r=document.createElement("select");r.id="priority";for(let e=0;e<3;e++)if(e===0){const a=document.createElement("option");a.value="low",a.textContent="Low",r.appendChild(a)}else if(e===1){const a=document.createElement("option");a.value="medium",a.textContent="Medium",r.appendChild(a)}else if(e===2){const a=document.createElement("option");a.value="high",a.textContent="High",r.appendChild(a)}d.appendChild(r);const s=document.createElement("input");s.type="date",s.id="due-date",d.appendChild(s);const o=document.createElement("select");o.name="project",o.id="project-select";for(let e=0;e<m.length;e++){const a=document.createElement("option");a.value=m[e].name,a.textContent=m[e].name,o.appendChild(a)}d.appendChild(o);const c=document.createElement("button");c.id="submit-task-btn",c.textContent="Submit",d.appendChild(c),c.addEventListener("click",()=>{N(n.value,t.value,r.value,s.value,o.value),d.style.display="none"})}else d.style.display="none"}class A{constructor(t,r,s,o,c){this.name=t,this.description=r,this.priority=s,this.date=o,this.project=c}}function N(n,t,r,s,o){const c=new A(n,t,r,s,o);for(let e=0;e<m.length;e++)m[e].name===o&&m[e].addTask(c);x(),h(o),console.log(m)}window.addEventListener("DOMContentLoaded",()=>{l.getProjects().length===0&&H();const n=l.getProjects();n.length>0?h(n[0].name):h("")});
