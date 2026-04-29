const taskForm = document.getElementById("taskForm");
const taskIdField = document.getElementById("taskId");
const taskField = document.getElementById("task");
const deleteYesBtn = document.getElementById("deleteYes");
const deleteCancelBtn = document.getElementById("deleteCancel");
const deleteModal = document.getElementById("deleteModal");
const taskList = document.getElementById("taskList");
const clearAllTasks = document.getElementById("clearAllTasks");

const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const editTaskIdField = document.getElementById("editTaskId");
const editTaskValueField = document.getElementById("editTaskValue");

function initComponents() {
  M.Modal.init(deleteModal);
  M.Modal.init(editModal);
}

function registerEvents() {
  taskForm.addEventListener("submit", handleSubmit);
  taskList.addEventListener("click", handleTaskListClick);
  clearAllTasks.addEventListener("click", handleClearAll);
  deleteCancelBtn.addEventListener("click", handleDeleteCancel);
  deleteYesBtn.addEventListener("click", handleDeleteYes);
  editForm.addEventListener("submit", handleUpdateTask);
}

function createTask(taskObj) {
  const LI = document.createElement("LI");
  const DELETE_LINK = document.createElement("A");
  const EDIT_LINK = document.createElement("A");
  const SPAN = document.createElement("SPAN");

  LI.className = "collection-item";
  LI.setAttribute("data-id", taskObj.id);

  SPAN.className = "task-text";
  SPAN.innerText = taskObj.value;

  DELETE_LINK.href = "#";
  DELETE_LINK.className = "delete-item secondary-content";
  DELETE_LINK.title = "Remove task";
  DELETE_LINK.setAttribute("data-task-id", taskObj.id);
  DELETE_LINK.innerHTML = "<i class= 'fa fa-trash'></i>";

  EDIT_LINK.href = "#";
  EDIT_LINK.className = "edit-item secondary-content";
  EDIT_LINK.title = "Edit task";
  EDIT_LINK.style.marginRight = "10px";
  EDIT_LINK.setAttribute("data-task-id", taskObj.id);
  EDIT_LINK.innerHTML = "<i class= 'fa fa-pencil'></i>";

  LI.appendChild(SPAN);
  LI.appendChild(DELETE_LINK);
  LI.appendChild(EDIT_LINK);
  return LI;
}

function createAndAppendTask(taskObj) {
  const LI = createTask(taskObj);
  taskList.appendChild(LI);
}

function handleSubmit(evt) {
  evt.preventDefault();
  const task = taskField.value;
  if (task === "") {
    M.toast({ html: "Please enter a task!" });
  } else {
    const taskObj = createTaskObject(task);
    createAndAppendTask(taskObj);
    taskField.value = "";
  }
}

function createTaskObject(taskValue) {
  return {
    id: getUniqueId(),
    value: taskValue,
  };
}

function getUniqueId() {
  return Math.round(Math.random() * 99999999999 + 1);
}

function handleDeleteCancel(evt) {
  taskIdField.value = "";
}

function handleDeleteYes(evt) {
  const taskId = taskIdField.value;
  const element = document.querySelector(`li[data-id="${taskId}"]`);
  if (element) {
    element.remove();
  }
}

function handleTaskListClick(evt) {
  evt.preventDefault();
  let target = evt.target;

  const deleteItem = target.closest(".delete-item");
  const editItem = target.closest(".edit-item");

  if (deleteItem) {
    taskIdField.value = deleteItem.dataset.taskId;
    M.Modal.getInstance(deleteModal).open();
  } else if (editItem) {
    const taskId = editItem.dataset.taskId;
    const li = document.querySelector(`li[data-id="${taskId}"]`);
    const taskText = li.querySelector(".task-text").innerText;

    editTaskIdField.value = taskId;
    editTaskValueField.value = taskText;
    M.Modal.getInstance(editModal).open();
    M.updateTextFields(); // Re-initialize labels
  }
}

function handleUpdateTask(evt) {
  evt.preventDefault();
  const taskId = editTaskIdField.value;
  const newValue = editTaskValueField.value;

  if (newValue === "") {
    M.toast({ html: "Task cannot be empty!" });
    return;
  }

  const li = document.querySelector(`li[data-id="${taskId}"]`);
  if (li) {
    li.querySelector(".task-text").innerText = newValue;
  }

  M.Modal.getInstance(editModal).close();
}

function handleClearAll(evt) {
  while (taskList.firstElementChild) {
    taskList.firstElementChild.remove();
  }
}

initComponents();
registerEvents();