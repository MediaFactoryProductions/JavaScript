class TaskNode {
    constructor(taskName, priority) {
        this.taskName = taskName;
        this.priority = priority;
        this.next = null;
    }
}

class TaskList {
    constructor() {
        this.head = null;
    }

    addTask(taskName, priority) {
        const newTask = new TaskNode(taskName, priority);
        if (!this.head) {
            this.head = newTask;
            return;
        }
        let currentTask = this.head;
        while (currentTask.next) {
            currentTask = currentTask.next;
        }
        currentTask.next = newTask;
    }

    printTasks() {
        let currentTask = this.head;
        if (!currentTask) {
            console.log("No tasks in the list");
            return;
        }
        console.log("Tasks:");
        while (currentTask) {
            console.log(`Task: ${currentTask.taskName}, Priority: ${currentTask.priority}`);
            currentTask = currentTask.next;
        }
    }

    removeTask(taskName) {
        let currentTask = this.head;
        if (currentTask && currentTask.taskName === taskName) {
            this.head = currentTask.next;
            currentTask = null;
            return;
        }
        let prevTask = null;
        while (currentTask && currentTask.taskName !== taskName) {
            prevTask = currentTask;
            currentTask = currentTask.next;
        }
        if (currentTask === null) {
            console.log("Task not found in the list");
            return;
        }
        prevTask.next = currentTask.next;
        currentTask = null;
    }
}

// Example usage:
const taskList = new TaskList();

// Adding tasks
taskList.addTask("Buy groceries", 2);
taskList.addTask("Finish project report", 1);
taskList.addTask("Call client", 3);

// Displaying tasks
taskList.printTasks();

// Removing a task
taskList.removeTask("Buy groceries");

// Displaying tasks after removal
taskList.printTasks();
