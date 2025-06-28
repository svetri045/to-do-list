let editModeIndex = -1;
let currentFilter = 'all';

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const dateInput = document.getElementById("dateInput");
  const hourInput = document.getElementById("hourInput");
  const minuteInput = document.getElementById("minuteInput");
  const ampmInput = document.getElementById("ampmInput");
  const purposeInput = document.getElementById("purposeInput");

  const text = taskInput.value.trim();
  const date = dateInput.value;
  const hour = hourInput.value.padStart(2, '0');
  const minute = minuteInput.value.padStart(2, '0');
  const ampm = ampmInput.value;
  const purpose = purposeInput.value;

  if (!text || !date || !hour || !minute || !ampm || !purpose) {
    return alert("Please fill all fields.");
  }

  const time12hr = `${hour}:${minute} ${ampm}`;
  const datetime = `<span class="date-label">🗓 ${date}</span> | <span class="time-label">🕒 ${time12hr}</span>`;

  if (editModeIndex !== -1) {
    const taskItem = document.querySelectorAll("#taskList li")[editModeIndex];
    taskItem.querySelector(".task-text").innerText = text;
    taskItem.querySelector(".date-label").innerText = `🗓 ${date}`;
    taskItem.querySelector(".time-label").innerText = `🕒 ${time12hr}`;
    taskItem.querySelector(".purpose").innerText = `🎯 ${purpose}`;
    editModeIndex = -1;
  } else {
    const li = document.createElement("li");
    li.classList.add("pending");
    li.innerHTML = `
      <div class="task-info">
        <span class="task-text">${text}</span><br>
        ${datetime} | <span class="purpose">🎯 ${purpose}</span>
      </div>
      <div class="actions">
        <button class="edit" onclick="editTask(this)">✏️</button>
        <button class="complete" onclick="toggleComplete(this)">✔️</button>
        <button class="delete" onclick="deleteTask(this)">🗑️</button>
      </div>
    `;
    document.getElementById("taskList").appendChild(li);
  }

  taskInput.value = "";
  dateInput.value = "";
  hourInput.value = "";
  minuteInput.value = "";
  ampmInput.value = "AM";
  purposeInput.value = "Work";
  applyFilter();
}

function toggleComplete(btn) {
  const li = btn.closest("li");
  li.classList.toggle("completed");
  li.classList.toggle("pending");
  applyFilter();
}

function deleteTask(btn) {
  btn.closest("li").remove();
  applyFilter();
}

function editTask(btn) {
  const li = btn.closest("li");
  document.getElementById("taskInput").value = li.querySelector(".task-text").innerText;

  const date = li.querySelector(".date-label").innerText.replace('🗓 ', '').trim();
  const time = li.querySelector(".time-label").innerText.replace('🕒 ', '').trim();
  const [h, rest] = time.split(':');
  const [m, ampm] = rest.split(' ');

  document.getElementById("dateInput").value = date;
  document.getElementById("hourInput").value = h;
  document.getElementById("minuteInput").value = m;
  document.getElementById("ampmInput").value = ampm;
  document.getElementById("purposeInput").value = li.querySelector(".purpose").innerText.replace('🎯 ', '').trim();

  editModeIndex = Array.from(document.querySelectorAll("#taskList li")).indexOf(li);
}

function setFilter(filter) {
  currentFilter = filter;
  applyFilter();
}

function applyFilter() {
  const tasks = document.querySelectorAll("#taskList li");
  tasks.forEach(task => {
    if (currentFilter === 'all') {
      task.style.display = '';
    } else if (currentFilter === 'completed') {
      task.style.display = task.classList.contains("completed") ? '' : 'none';
    } else if (currentFilter === 'pending') {
      task.style.display = task.classList.contains("completed") ? 'none' : '';
    }
  });
}
