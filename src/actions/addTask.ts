import TaskAction from "../interfaces/taskaction";

const genRandom = ():number => {
    return Math.round(Math.random()*10);
}

const addTask = (payload:string): TaskAction =>{
    return {
        type:"add_task",
        payload:payload,
        id: genRandom(),
    }
}

export default addTask;