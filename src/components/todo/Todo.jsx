import React, { useState } from 'react'
import styles from './todo.module.css'

const Todo = () => {
    const [task, setTask] = useState('');
    const [list, setList] = useState([]);

    const [values, setValues] = useState([]);
    const [checkbox, setCheckbox] = useState([]);

    const [edit, setEdit] = useState(0);
    const [change, setChange] = useState(false)

    // for getting data
    const handleChange=(e) => {
        const task = e.target.value;
        // setTask(task);
        setTask({
            title:task,
            value:false
        })
    }

    // for submiting data
    const submitData=()=>{
        if(change===false){
            
            setList([...list,task]);
            setTask({title:''});
        }
        else
        {
            list[edit]=task;
            setTask({title:''});
            setEdit(0);
            setChange(false);
        }
        
    }
    // getting checbox values
    const submitValues=(e,index,title)=>{
        var test = e.target.checked;
        if(test===true) {
            console.log('checkbox value',list[index],'event',e.target.checked);
            var temp = list[index];
            const prevVal = [...values];
            prevVal.push(temp);
            setValues(prevVal)
            const updatedList = list.map((item, i) => {
                if(i===index){
                    return {
                        ...item,
                        value:true
                    }
                }
                return item
            })
            setList(updatedList);
            console.log('values is',values);
        }
        else{
            const updateCheck = values.filter((val)=>val.title!==title);
            setValues(updateCheck);
            const updatedList = list.map((item, i) => {
                if(i===index){
                    return {
                        ...item,
                        value:false
                    }
                }
                return item
            })
            setList(updatedList);
        }
        
    }
    // submiting checkbox values
    const submitCheckbox =()=>{
        console.log('submitCheckbox',values);
        // setcheckbox.push(values);
        const updatedList = list.filter((item,i)=>!values.some(val=>val.title===item.title))
        setList(updatedList);
        setCheckbox([...values]);
        //setList([]);
    }
    // fot deleting data
    const handleDelete=(index) => {
        var temp = [...list];
        temp.splice(index, 1);
        setList([...temp]);
    }
    //for editing submitData
    const handleEdit=(index) => {
        console.log('this is index with value',list[index]);
        const temp = list[index]
        
        // setTask([temp])
        setTask({...temp});
        console.log('value is', temp);

        setChange(true);
        setEdit(index);

    }
    //for revert data
    const handleRevert =(index)=>{
        console.log('revert check',checkbox[index])
        const temp = checkbox[index];
        const prevList = [...list]
        prevList.push(temp)
        setList(prevList)
        
        var del = [...checkbox]
        del.splice(index, 1);
        setCheckbox([...del]);
    }
    return (
        <div>
            <div className={styles.input_data}>
                <h1>Todo List</h1>
                <input type="text" name="task" value={task.title && task.title} onChange={handleChange} placeholder="Enter your Task here..." id={styles.task} />
                <button className={styles.submit_btn} onClick={submitData}>Add Task</button>
            </div>

            <div className={styles.user_data}>
                <div className={styles.task_data}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Task of Users</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            list?.map((item, index) =>{
                                return(
                                    <tr key={index}>
                                        <td> <input onChange={(e)=>submitValues(e,index,item.title)} checked={item.value} type="checkbox" /> {item.title} </td>
                                        <td className={styles.action_btns}> 
                                            <button onClick={() =>handleDelete(index)} className={styles.del_btn}>Delete</button> 
                                            <button onClick={() =>handleEdit(index)} className={styles.edit_btn}>Edit</button>
                                            {/* <button onClick={() =>submitValues(index)} className={styles.edit_btn}>Submit</button> */}
                                        </td>
                                    </tr>
                                )
                                })
                            }
                            <button onClick={submitCheckbox} className={styles.submit_btn} >Submit</button>
                        </tbody>
                    </table>
                    
                </div>
                <div className={styles.task_data}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Submitted Values</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            checkbox?.map((item, index) =>{
                                
                                return(
                                    <tr key={index}>
                                        <td>  {item.title} </td>
                                        <td className={styles.action_btns}> 
                                            <button onClick={()=>handleRevert(index)} className={styles.edit_btn}>Revert</button>
                                        </td>
                                    </tr>
                                )
                                })
                            }
                            {/* <button className={styles.submit_btn} onClick={submitValues}>Submit</button> */}
                        </tbody>
                    </table>
                    
                </div>
            </div>

        </div>
    )
}

export default Todo
