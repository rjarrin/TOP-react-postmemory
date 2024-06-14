import { Component } from "react";
import Count from "./Count";

class ClassInput extends Component {
    // 1. Constructor
    constructor(props) {
        super(props);
        // 3. State management (always initialized as a part of the constructor)
        this.state = {
            todos: ['Just some demo tasks', 'As an example'],
            inputVal: "",
            // Modified state for editing functionality
            isEditing: false,
            tempEditValue: "",
            editingIndex: null,
        };
        // 4. Binding the functionality
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // Added delete functionality
        this.deleteTask = this.deleteTask.bind(this);
        // Added editing functionality
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.handleTempEditChange = this.handleTempEditChange.bind(this);
        this.savedEditedTodo = this.savedEditedTodo.bind(this);
    }
    handleInputChange(e) {
        this.setState((state) => ({
            ...state,
            inputVal: e.target.value,
        }));
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState((state) => ({
            todos: state.todos.concat(state.inputVal),
            inputVal: "",
        }));
    }
    deleteTask(indexToDelete) {
        this.setState((prevState) => ({
            todos: prevState.todos.filter((_, index) => index !== indexToDelete),
        }));
    }
    toggleEditMode(index) {
        this.setState(prevState => ({
            isEditing: !prevState.isEditing,
            editingIndex: prevState.isEditing ? null : index,
            tempEditValue: prevState.isEditing ? "" : this.state.todos[index],
        }));
    }
    handleTempEditChange(e, index) {
        this.setState({tempEditValue: e.target.value});
    }
    savedEditedTodo(index) {
        const updatedTodos = [...this.state.todos];
        updatedTodos[index] = this.state.tempEditValue;
        this.setState({todos: updatedTodos, isEditing: false, tempEditValue: "", editingIndex: null});
    }

    // 2. Render the JSX
    render() {
        return (
            <section>
                <h3>{this.props.name}</h3>
                {/* The input field to enter To-Do's */}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="task-entry">Enter a task: </label>
                    <input type="text" name="task-entry" value={this.state.inputVal} onChange={this.handleInputChange} />
                    <button type="submit">Submit</button>
                </form>
                <h4>All the tasks!</h4>
                {/* The list of all the To-Do's, displayed */}
                <ul>
                    {this.state.todos.map((todo, index) => (
                        <li key={todo}>
                            {this.state.isEditing && index === this.state.editingIndex ? (
                                <input 
                                    type="text"
                                    value={this.state.tempEditValue}
                                    onChange={(e) => this.handleTempEditChange(e, index)}
                                    onBlur={() => this.savedEditedTodo(index)}
                                    autoFocus
                                />
                            ): (
                                todo
                            )}
                            <button onClick={() => this.toggleEditMode(index)}>{this.state.isEditing && index === this.state.editingIndex ? "Resubmit" : "Edit"}</button>
                            <button onClick={() => this.deleteTask(index)} style={{marginLeft: "10px"}}>Delete</button>
                        </li>
                    ))}
                </ul>
                <Count todos={this.state.todos}/>
            </section>
        );
    }
}

export default ClassInput;