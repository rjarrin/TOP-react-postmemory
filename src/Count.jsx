import { Component } from "react";

class Count extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {todos} = this.props;
        return (
            <div>
                <p>Total To-Do's: {todos.length}</p>
            </div>
        );
    }
}

export default Count;