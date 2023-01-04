import  initialState  from "./initialState";
import {ADDED,ALLCOMPLETED,DELETE,TOGGLED,CLEARRCOMPLETED,COLORSELECTED} from "./actionType"


const nextTodoId = (todos) => {

    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
    return maxId + 1;

}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDED:
            return[
                ...state,
                {
                    id:nextTodoId(state),
                    text: action.payload,
                    completed: false,
                }
            ]
        case TOGGLED:
            return state.map(todo => {
                if(todo.id !== action.payload){
                    return todo;
                }
                return {
                    ...todo,
                    completed: !todo.completed //its means if completed = ture then its trun it into false
                }
            });
        case COLORSELECTED: 
            const {todoId, color} = action.payload;

            return state.map(todo =>{
                if(todo.id !== todoId){
                    return todo;
                }
                return {
                    ...todo,
                    color:color
                }
            });
        case DELETE: 
            return state.filter(todo => todo.id !== action.payload)
            
        case ALLCOMPLETED:
            return state.map(todo =>{
                return {
                    ...todo,
                    completed: true
                }
            });  
        case CLEARRCOMPLETED:
            return state.filter(todo => !todo.completed);

    
        default:
            return state;
    }
}
export default reducer;