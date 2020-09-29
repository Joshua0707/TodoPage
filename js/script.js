const myTodoToken = "joshua.dev.mytodoapp";

let todoItems = [];

const nameInput = document.querySelector('#form-text');
const form = document.querySelector('#form-container');
const itemList = document.querySelector('#todolist');
const feedback = document.querySelector('#feedback');

const showFeedback = ({ status, text }) => {

	switch (status) {
		case 'edit':
			feedback.classList.remove('complete');
			feedback.classList.remove('info');
			feedback.classList.remove('delete');
			feedback.classList.add('edit');

			feedback.querySelector('img').src = './image/editt.svg';
			break;
		case 'complete':
			feedback.classList.add('complete');
			feedback.classList.remove('delete');
			feedback.classList.remove('edit');
			feedback.classList.remove('info');

			feedback.querySelector('img').src = './image/complete.svg';
			break;
		case 'delete':
			feedback.classList.remove('complete');
			feedback.classList.add('delete');
			feedback.classList.remove('edit');
			feedback.classList.remove('info');

			feedback.querySelector('img').src = './image/delete.svg';
			break;
		default:
			// statements_def
			feedback.classList.remove('complete');
			feedback.classList.add('info');
			feedback.classList.remove('edit');
			feedback.classList.remove('delete');

			feedback.querySelector('img').src = './image/info.svg';
			break;
	}

	feedback.querySelector('span').textContent = text;
	feedback.classList.add('show');

	setTimeout(() => {
		feedback.classList.remove('show');
	}, 3000);

}

const handleItem = (name) => {

	// for the items
	const items = itemList.querySelectorAll('.todo');

	items.forEach((item) => {

		if (item.querySelector('.text').textContent === name) {
			// for the complete
			item.querySelector('.util .complete-item').addEventListener('click', () => {
				item.classList.add('complete');
				// error here and edit

				todoItems = todoItems.filter((item) => {
					return item !== name;
				});

				itemList.removeChild(item);
				itemList.appendChild(item);

				setLocalStorage(todoItems);

				showFeedback({
					status: 'complete',
					text: `"${name}" successfully completed`
				});
			});

			// for the edit
			item.querySelector('.util .edit-item').addEventListener('click', () => {
				nameInput.value = name;
				nameInput.focus();

				itemList.removeChild(item);

				todoItems = todoItems.filter((item) => {
					return item !== name;
				});

				setLocalStorage(todoItems);

				showFeedback({
					status: 'edit',
					text: `can edit now`
				});

				form.querySelector('[type="submit"]').classList.add("valid");
			});

			// for the delete
			item.querySelector('.util .delete-item').addEventListener('click', () => {
				itemList.removeChild(item);

				todoItems = todoItems.filter((item) => {
					return item !== name;
				});

				setLocalStorage(todoItems);

				showFeedback({
					status: 'delete',
					text: `"${name}" todo deleted`
				});

			});
		}
	});

}

// get list
const getList = (todoItems) => {

	itemList.innerHTML = '';

	//
	todoItems.forEach((item) => {

		itemList.insertAdjacentHTML('beforeend', `<div class="todo">
					<p class="text">${item}</p>
					<div class="util">
						<img src="./image/complete.svg" alt="c" title="complete" class="complete-item" />
						<img src="./image/editt.svg" alt="e" title="edit" class="edit-item" />
						<img src="./image/delete.svg" alt="d" title="delete" class="delete-item" />
					</div>
				</div>`);

		handleItem(item);

	});

}

// get local storage
const getLocalStorage = () => {

	const storage = localStorage.getItem(myTodoToken);
	if (!storage || storage === 'undefined') {
		todoItems = [];
	} else {
		todoItems = JSON.parse(storage);
		getList(todoItems);
	}

}

// set local storage
const setLocalStorage = (todoItems) => {
	localStorage.setItem(myTodoToken, JSON.stringify(todoItems));
}

// gte local storage from page
getLocalStorage();

handleItem();

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const name = nameInput.value;

	if (name.length === 0) {
		// show feedback
		showFeedback({ status: 'info', text: "No valid input" })
	} else {
		todoItems.push(name);
		setLocalStorage(todoItems);
		getLocalStorage();
		window.scrollTo(0, itemList.offsetTop + itemList.offsetHeight)
	}

	nameInput.value = '';
	form.querySelector('[type="submit"]').classList.remove("valid");
});