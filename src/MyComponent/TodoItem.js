import React from 'react'
export default function TodoItem({todo, onRemovePressed, onCompletePressed}){
   
    return (
        <div className="container" >
            

                <div className="row mb-1 d-flex"  style={{borderBottom : '1px solid #ddd',alignItems: 'flex-end'}}>
                    <div  className='col-md-6'>
                        <p>{todo.text}</p>
                        <p>Created At:&nbsp;{ (new Date(todo.createdAt)).toLocaleDateString() }</p>
                    </div>
                    <div className="col-md-6 mb-2 pb-2 text-right d-flex flex-row-reverse" >
                        
                        
                        <button className='btn btn-danger btn-sm'
                        onClick={() => onRemovePressed(todo.id)}
                        >Remove</button>

                        { todo.isCompleted? null:  
                            <button className='btn btn-danger btn-sm mr-2'
                            onClick={() => onCompletePressed(todo.id)}
                            >Mark as completed</button>
                        }
                    </div>
                </div>
                
            
        </div>
        
    );
}