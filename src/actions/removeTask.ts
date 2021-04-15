import TaskAction from "../interfaces/taskaction"

const removeTask = (key:number):TaskAction =>{
    return {
        type:"remove_task",
        payload:"",
        id: key
    }
}

export default removeTask;