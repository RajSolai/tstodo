import TaskAction from "../interfaces/taskaction";

export type taskType = {
    title: string,
    id : number
};

export type taskState = taskType[];

const taskReducer = (state:taskState=[],action:TaskAction) =>{
    let userTask:taskType = {
        title : action.payload,
        id : action.id
    }
    switch (action.type){
        case "add_task":
            return state =[userTask,...state];
        case "remove_task":
            return state = state.filter(item=>item.id!==action.id);
        default:
            return state = [];
    }
} 

export default taskReducer;
