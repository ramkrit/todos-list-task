import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import AddTodoItems from './AddTodoItems';
import { 
    getTodosIsLoading,
    getIncompleteTodos,
    getCompletedTodos
 } from './selectors';
import {loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from './thunks';
import TodoItem from "./TodoItem";

const  TodosPage = ({completeTodos, inCompleteTodos, onRemovePressed, onCompletePressed, isLoading, startLoadingTodo}) => {
    
  const [searchUserName, setSearchUserName] = useState("");

    const myStyle = {
        color: "red",
        paddingLeft: "20px",
    }

    useEffect( ()=>{
        startLoadingTodo();
    }, [])

    const loaddingMessage = <div>Loading Todos...</div>;
    
    const content = (
        <>
            <AddTodoItems />
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        
                        <h5 style={myStyle} className="my-4">Incomplete Todos</h5>
                        {inCompleteTodos.map((data) =>
                            <TodoItem 
                                todo={data} 
                                onRemovePressed={onRemovePressed} 
                                onCompletePressed={onCompletePressed}
                                key={data.id}
                            />
                        )}
                        <h5 style={myStyle} className="my-4">Complete Todos</h5>
                        
                        {completeTodos.map((data) =>
                            <TodoItem 
                                todo={data} 
                                onRemovePressed={onRemovePressed} 
                                onCompletePressed={onCompletePressed}
                                key={data.id}
                            />
                        )}

                        
                    </div>
                </div>
            </div>
        </>
    );

    return isLoading? loaddingMessage:content;
}

const mapStateToProps = state =>({
    isLoading: getTodosIsLoading(state),
    completeTodos: getCompletedTodos(state),
    inCompleteTodos: getIncompleteTodos(state),
});
const mapDispatchToProps = dispatch => ({
    startLoadingTodo: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletePressed: id => dispatch(markTodoAsCompletedRequest(id)),
})

export default connect( mapStateToProps, mapDispatchToProps)(TodosPage);
