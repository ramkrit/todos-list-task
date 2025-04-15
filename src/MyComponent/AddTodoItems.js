import React, { useState } from "react";
import { connect } from "react-redux";
import { getTodos } from "./selectors";
import { addTodoRequest } from "./thunks";

const AddTodoItems = ({ todos, onCreatePressed }) => {

  const [itemValue, setItemValue] = useState('');

  
  return(
    <div className="container">
      <div className="row">
        <div className="col-lg-6 offset-lg-3 py-3">
          <div><h4>Add Todo</h4></div>
          <div className="form">
            <div className="row">
              <div className="col-lg-12">
                <input type='text' name="name" className="form-control mb-2" placeholder='Enter Value' 
                value={itemValue} onChange={(e)=> setItemValue(e.target.value)}
                />
              </div>
              
              <div className="col-lg-12">
                <button className="btn btn-primary w-100" 
                  onClick={() => {
                    const isDuplicateText = todos.some(todo => todo.text === itemValue);
                    if(!isDuplicateText && itemValue!==''){
                      onCreatePressed(itemValue);
                      setItemValue('');
                    }
                    
                  }}
                >Submit</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  todos: getTodos(state),
});
const mapDispatchToProps = dispatch => ({
  onCreatePressed: (text) => dispatch(addTodoRequest(text)),
});

export default connect( mapStateToProps, mapDispatchToProps)(AddTodoItems);
