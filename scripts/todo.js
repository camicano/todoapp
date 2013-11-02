function sanitize(str) {
	str_array = str.split("");
	var new_array = _.select(str_array, function(letter) {
		return !letter.match(/['"]/);
	} );

	return new_array.join("");
};

var TodoItem = function(text) {
	var date = new Date();
	this.text = text;
	this.created = date.toLocaleTimeString();
	this.completed = '';
	this.color = '';
};

var TodoApp = function() {
	this.finished_tasks = [];
	this.unfinished_tasks = [];

	this.createTask = function(text, due_date) {
		text = sanitize(text);
		var task = new TodoItem(text, due_date);
		if (_.findWhere(this.unfinished_tasks, {text: text})) {
			// do nothing!
		} else {
			this.unfinished_tasks.push(task);
			localStorage.setItem('unfinished_tasks', JSON.stringify(this.unfinished_tasks));	
			this.appendTask(task);
		}	
	};

	this.completeTask = function(el, text) {
		var completed = new Date();
		
		el.remove();

		var task = _.findWhere(this.unfinished_tasks, {text: text});

		if (task) {
			task.completed = completed.toLocaleTimeString();
		}

		var updated_unfinished_task_array = _.reject(this.unfinished_tasks, function(task) { return task.text == text } );

		this.unfinished_tasks = updated_unfinished_task_array;
		
		this.finished_tasks.push(task);
		
		localStorage.setItem('finished_tasks', JSON.stringify(this.finished_tasks));
		localStorage.setItem('unfinished_tasks', JSON.stringify(this.unfinished_tasks));

		var completed_button = el.getElementsByClassName('complete')[0];
		completed_button.remove();
		el.getElementsByClassName('meta-data')[0].innerHTML = " completed at " + completed.toLocaleTimeString();
		el.dataset.completed = 'true';
		completed_items.appendChild(el);

	};

	this.deleteTask = function(el, text) {
		var updated_array;
		var completed = el.dataset.completed;
		if (completed) {
			//take out of finished
			updated_array = _.reject(this.finished_tasks, function(task) { return task.text == text; } );
			this.finished_tasks = updated_array;
			localStorage.setItem('finished_tasks', JSON.stringify(this.finished_tasks));

		} else {
			// take out of unfinished
			updated_array =  _.reject(this.unfinished_tasks, function(task) { return task.text == text; } );
			this.unfinished_tasks = updated_array;
			localStorage.setItem('unfinished_tasks', JSON.stringify(this.unfinished_tasks));

		}
		el.remove();
	};

	this.appendTask = function(task, complete) {
		var el = document.createElement('li');
		el.className = "items";
		var html = task.text;
		var now = new Date();

		setInterval()

		if (!complete) {
			html += "    " + "<span class='meta-data'> created at " + task.created + " </span>";
			var complete_btn = "<button class='complete' onclick=\"todo_app.completeTask(this.parentElement, '" + task.text + "')\"  >Complete</button>";
			html += complete_btn;
		} else {
			html += "<span class='meta-data'> completed at " + task.completed + " </span>";
		}

		html += "<button class='delete' onclick=\"todo_app.deleteTask(this.parentElement, '" + task.text + "')\" >Delete</button>";
		el.innerHTML = html;

		if (complete) {
			el.dataset.completed = 'true'
			completed_items.appendChild(el);
			
		} else {
			todo_items.appendChild(el);
			
		}
	};
};

var todo_app = new TodoApp();

var add_item, new_task_field, todo_items, completed_items, stored_unfinished_tasks, stored_finished_tasks, day, year, month;

window.onload = function() {
	add_item = document.getElementById('add-item');
	new_task_field = document.getElementById('new-task-field');
	todo_items = document.getElementById('todo-items');
	completed_items = document.getElementById('completed-items');
	month = document.getElementById('month'); 
	day = document.getElementById('day'); 
	year = document.getElementById('year');
	hour = document.getElementById('time');

	stored_unfinished_tasks = JSON.parse(localStorage.getItem('unfinished_tasks'));
	stored_finished_tasks = JSON.parse(localStorage.getItem('finished_tasks'));

	todo_app.unfinished_tasks = stored_unfinished_tasks || [];
	todo_app.finished_tasks = stored_finished_tasks || [];

	_.each(stored_unfinished_tasks, function(task) {
		// added the feature that changes the color in the object then i have to do that change the css 
		todo_app.appendTask(task);
	});

	_.each(stored_finished_tasks, function(task) {
		todo_app.appendTask(task, true);
	});

	add_item.addEventListener('click', function(e) {
		var text = new_task_field.value;
		new_task_field.value = ""
		var now = new Date();

		todo_app.createTask(text, due_date);
	});

	new_task_field.addEventListener('keyup', function(e) {
		if (e.keyCode == 13) {
			var text = this.value;	
			this.value = ""
			todo_app.createTask(text, due_date);
		}
	});
}



















