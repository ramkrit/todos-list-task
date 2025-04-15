import { 
    createTodo, 
    loadTodosInProgress, 
    loadTodosSuccess, 
    loadTodosFailure,
    markTodoAsCompleted,  
    removeTodo
} from "./actions";

// Helper function to interact with localStorage
const getTodosFromLocalStorage = () => {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
};

const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

// Load todos from localStorage
export const loadTodos = () => dispatch => {
    try {
        dispatch(loadTodosInProgress());

        const todos = getTodosFromLocalStorage();

        dispatch(loadTodosSuccess(todos));
    } catch (e) {
        dispatch(loadTodosFailure());
        dispatch(displayAlert(e));
    }
};

// Add todo and store in localStorage
export const addTodoRequest = (text, userName) => dispatch => {
    try {
        const todos = getTodosFromLocalStorage();
        const newTodo = {
            id: Date.now().toString(),
            text,
            isCompleted: false,
            createdAt: new Date().toISOString(),
        };

        const updatedTodos = [...todos, newTodo];
        saveTodosToLocalStorage(updatedTodos);

        dispatch(createTodo(newTodo));
    } catch (e) {
        dispatch(displayAlert(e));
    }
};

// Mark as completed
export const markTodoAsCompletedRequest = (id) => dispatch => {
    try {
        const todos = getTodosFromLocalStorage();
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, isCompleted: true } : todo
        );

        saveTodosToLocalStorage(updatedTodos);

        const updatedTodo = updatedTodos.find(todo => todo.id === id);
        dispatch(markTodoAsCompleted(updatedTodo));
    } catch (e) {
        dispatch(displayAlert(e));
    }
};

// Remove todo
export const removeTodoRequest = (id) => dispatch => {
    try {
        const todos = getTodosFromLocalStorage();
        const updatedTodos = todos.filter(todo => todo.id !== id);
        const removedTodo = todos.find(todo => todo.id === id);

        saveTodosToLocalStorage(updatedTodos);

        dispatch(removeTodo(removedTodo));
    } catch (e) {
        dispatch(displayAlert(e));
    }
};

// Display error
export const displayAlert = (text) => () => {
    alert(`Error: ${text}`);
};
