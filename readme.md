###Overview

The goal of this lab is to build a simple client side JavaScript todo application that makes use of DOM manipulation, and user interaction through events.

#####Application structure

This app is made up of only two objecst: todo_app and todo_item.

todo_app combines all the methods that are useful for working with the app.  It creates and appends new tasks to the DOM and also retrieves an array of funished and unfinished tasks.

todo_item constructs the actual DOM element to represent a task.  The methods that return a 'complete' and 'delete' buttons also bind a function that handles the click events for those buttons.  The render method returns a DOM object containing the task and the two buttons.

#####File structure

Application:

- index.html - the main todo app HTML page
- scripts/todo.js - the todo app JavaScript source code
- styles/styles.css - todo app css style sheet

###Step-by-step instructions

#####Step 1:

Build out the starter DOM structure in index.html:

- A container div with id 'container' for the app, containing:
  - An h1 tag for your app's title
  - p tags as headers for your two sections:
  	- Todo Items
  	- Completed Items
  - A div with an 'unfinished' id for holding new tasks, containing:
    - An input field with the 'new-task-field' id for getting user input
    - A button with an 'add-item' id for submitting a new task
    - An ordered list with a 'todo-items' id for holding new tasks
  - A div with a 'finished' id for completed tasks, containing:
    - An unordered list with a 'completed-items' id for holding completed tasks

#####Step 2:

Build out the starting structure of the javascript app in src/todo.js:

- An empty todo_app object
- An empty todo_item object
<!-- - Define the Object.clone() method for duplicating todo_item -->

#####Step 3:

Implement the basic add item functionality:

- Use the window.onload event to pick out an 'add-item' button
- Add an onclick event handler that will call a todo_app createTask method and input from the 'new-task-field' field as an argument
- Implement the todo_app createTask method to:
  - create a new instance of a todo_item object
  - Use the new task objects setTaskText method to set the task text from the argument
  - call the todo_app appendTask method passing the new task object as an argument
- Implement the todo_app appendTask method to:
  - check that the new task name isn't blank
  - call the new task render method that returns a DOM object and append it to the 'todo-items'
- Implement the necessary todo_item methods:
  - setTaskText method to set the task_name attribute
  - render method to return an 'li' element with a div for holding the task text

#####Step 4:

Implement the complete button

- Make a todo_item completedButton method that will return a button DOM object:
  - create the button
  - set the onclick function to do some DOM manipulation:
    - (remember to save a reference to the todo_item 'this' in the function's scope by storing it in a variable)
    - remove the task from 'todo-items' and append it to 'completed-items'

#####Step 5:

Implement the delete button

- Make a todo_item deleteButton method that will return a button DOM object:
  - create the button
  - set the onclick function to do some DOM manipulation:
    - (remember to save a reference to the todo_item 'this' in the function's scope by storing it in a variable)
    - remove the task from the DOM

#####Step 6 (Optional):

- Add hover effects (css or js) for the buttons
- You may want to refactor some code, add helper methods to clean up the repeated parts or abstract out some parts, and add styling by adding css classes.

#####Step 7 (Optional):

Add a 'created on:' and 'completed on:' section to the tasks to keep track of the date when the tasks were created and completed.

#####Step 8 (Optional):

Use the browser's (HTML5) localStorage to save and retrieve items when the page is refreshed.