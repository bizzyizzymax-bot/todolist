(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const e of c.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&s(e)}).observe(document,{childList:!0,subtree:!0});function r(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(n){if(n.ep)return;n.ep=!0;const c=r(n);fetch(n.href,c)}})();const E=document.querySelector(".task-box"),B=document.getElementById("status-text");function h(o){const t=l.getProjects();B.textContent=o,E.innerHTML="";for(let r=0;r<t.length;r++)if(t[r].name===o){const s=t[r],n=s.getTasks();for(let c=0;c<n.length;c++){const e=n[c],i=document.createElement("div"),p=document.createElement("div"),a=document.createElement("p"),m=document.createElement("div"),f=document.createElement("first"),y=document.createElement("second");p.innerHTML=`<button></button>
                <p class="title">${e.name}</p>`,f.appendChild(p),p.classList.add("titleandcheck"),e.priority==="low"?(a.classList.add("priority-low"),a.textContent="Low"):e.priority==="medium"?(a.classList.add("priority-medium"),a.textContent="Medium"):e.priority==="high"&&(a.classList.add("priority-high"),a.textContent="High"),m.appendChild(a),m.innerHTML=m.innerHTML+`<p>${e.date}</p>
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
                </button>`,m.classList.add("priorityanddate"),f.appendChild(m),y.innerHTML=`<p class="description">Description:</p>
              <p class="description-text">
                ${e.description}
              </p>`,i.classList.add("task-item"),f.classList.add("first"),y.classList.add("second"),i.appendChild(f),i.appendChild(y),E.appendChild(i);const w=m.querySelector("button");w.addEventListener("click",()=>{const g=w.parentNode.parentNode.parentNode;s.removeTask(e),g.remove()});const P=p.querySelector("button");let j=!1;P.addEventListener("click",()=>{const g=p.querySelector("p");j=!j,j?g.style.textDecoration="line-through":g.style.textDecoration="none"})}}}const S=document.getElementById("add-project-btn"),b=document.getElementById("project-name"),M=document.getElementById("submit-project-btn"),k=document.querySelector(".add-project-box"),V=document.querySelector(".projects");document.querySelectorAll(".delete-project");document.getElementById("status-text");class C{constructor(t){this.name=t}tasks=[];getTasks(){return this.tasks}addTask(t){this.tasks.push(t)}removeTask(t){this.tasks.splice(t,1)}}class q{projects=[];getProjects(){return this.projects}addProject(t){this.projects.push(t)}}const l=new q;function x(){const o=l.getProjects().map(t=>({name:t.name,tasks:t.tasks}));localStorage.setItem("projects",JSON.stringify(o))}function H(){const o=localStorage.getItem("projects");if(o)try{JSON.parse(o).forEach(r=>{const s=new C(r.name);s.tasks=r.tasks||[],l.projects.push(s),T(s,!0)})}catch(t){console.error("Failed to load projects from localStorage",t)}}let v=!1;function D(){v=!v,v?k.style.display="flex":k.style.display="none"}M.addEventListener("click",()=>{const o=new C(b.value);k.style.display="none",T(o),l.addProject(o),x(),h(b.value)});S.addEventListener("click",()=>{D()});function T(o,t=!1){const r=l.getProjects();if(!t){for(let e=0;e<r.length;e++)if(r[e].name==o.name){alert("More than one project can't have the same name!");return}}const s=document.createElement("div");s.innerHTML=`
                <div class="folderandname">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>folder-outline</title>
                  <path
                    d="M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z"
                  />
                </svg>
                <button class="projectname">${o.name}</button>
                </div>
                <button class="delete-project">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>trash-can</title>
                    <path
                      d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"
                    />
                  </svg>
                </button>`;const n=s.querySelector(".projectname");n.addEventListener("click",()=>{h(n.textContent)}),s.querySelector(".delete-project").addEventListener("click",()=>{const e=l.getProjects(),p=s.querySelector(".folderandname").querySelector(".projectname").textContent;for(let a=0;a<e.length;a++)e[a].name===p&&e.splice(a,1);h(""),s.remove(),x()}),s.classList.add("project"),V.appendChild(s)}window.addEventListener("DOMContentLoaded",()=>{H()});const I=document.getElementById("add-task-btn"),d=document.querySelector(".add-task-box");document.getElementById("submit-task-btn");const u=l.getProjects();let L=!1;I.addEventListener("click",()=>{O()});function O(){if(L=!L,L){d.style.display="flex",d.innerHTML="";const o=document.createElement("input");o.type="text",o.id="task-title",o.placeholder="Task Title",d.appendChild(o);const t=document.createElement("input");t.type="text",t.id="task-description",t.placeholder="Task Description",d.appendChild(t);const r=document.createElement("select");r.id="priority";for(let e=0;e<3;e++)if(e===0){const i=document.createElement("option");i.value="low",i.textContent="Low",r.appendChild(i)}else if(e===1){const i=document.createElement("option");i.value="medium",i.textContent="Medium",r.appendChild(i)}else if(e===2){const i=document.createElement("option");i.value="high",i.textContent="High",r.appendChild(i)}d.appendChild(r);const s=document.createElement("input");s.type="date",s.id="due-date",d.appendChild(s);const n=document.createElement("select");n.name="project",n.id="project-select";for(let e=0;e<u.length;e++){const i=document.createElement("option");i.value=u[e].name,i.textContent=u[e].name,n.appendChild(i)}d.appendChild(n);const c=document.createElement("button");c.id="submit-task-btn",c.textContent="Submit",d.appendChild(c),c.addEventListener("click",()=>{N(o.value,t.value,r.value,s.value,n.value),d.style.display="none"})}else d.style.display="none"}class A{constructor(t,r,s,n,c){this.name=t,this.description=r,this.priority=s,this.date=n,this.project=c}}function N(o,t,r,s,n){const c=new A(o,t,r,s,n);for(let e=0;e<u.length;e++)u[e].name===n&&u[e].addTask(c);x(),h(n),console.log(u)}window.addEventListener("DOMContentLoaded",()=>{l.getProjects().length===0&&H();const o=l.getProjects();o.length>0?h(o[0].name):h("")});
