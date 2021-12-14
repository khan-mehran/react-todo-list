import React, { useEffect, useState } from 'react'
import styles from './todo.module.css'

const Todo = () => {
    const [task, setTask] = useState('');
    const [list, setList] = useState([]);

    const [values, setValues] = useState([]);
    const [checkbox, setCheckbox] = useState([]);

    const [edit, setEdit] = useState(0);
    const [change, setChange] = useState(false)

    useEffect(() => {
        console.log('somthing in the list...')
    }, [list])
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
            const prevVal =  values.filter((val)=>val.title !==  list[edit].title );
            setValues(prevVal)
            list[edit]=task;
           
            setTask({title:''});
            setEdit(0);
            setChange(false);
        }
        
    }
    // getting checbox values of task of users
    const submitValues=(e,index,title)=>{
        var test = e.target.checked;
        if(test===true) {
            console.log('checkbox value',list[index],'event',e.target.checked);
            var temp = list[index];
            const prevVal = [...values];
            prevVal.push({...temp,value:false});
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
    // getting checbox values of revert users
    const submitRevert=(e,index,title)=>{
        var test = e.target.checked;
        if(test===true) {
            console.log('checkbox value',list[index],'event',e.target.checked);
            var temp = checkbox[index];
            const prevVal = [...values];
            prevVal.push({...temp,value:false});
            setValues(prevVal)
            const updatedList = checkbox.map((item, i) => {
                if(i===index){
                    return {
                        ...item,
                        value:true
                    }
                }
                return item
            })
            setCheckbox(updatedList);
            console.log('values is',values);
        }
        else{
            const updateCheck = values.filter((val)=>val.title!==title);
            setValues(updateCheck);
            const updatedList = checkbox.map((item, i) => {
                if(i===index){
                    return {
                        ...item,
                        value:false
                    }
                }
                return item
            })
            setCheckbox(updatedList);
        }
        
    }
    // submiting checkbox values
    const submitCheckbox =()=>{
        console.log('submitCheckbox',values);
        // setcheckbox.push(values);
        const updatedList = list.filter((item,i)=>!values.some(val=>val.title===item.title))
        setList(updatedList);
        setCheckbox([...checkbox,...values]);
        setValues([])
        //setList([]);
    }
    // fot deleting data
    const handleDelete=() => {
        const updatedList = list.filter((item,i)=>!values.some(val=>val.title===item.title))
        setList(updatedList);
        setValues([]);
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
    const handleRevert =()=>{
        console.log('submitCheckbox',values);
        // setcheckbox.push(values);
        const updatedList = checkbox.filter((item,i)=>!values.some(val=>val.title===item.title))
        setCheckbox(updatedList);
        setList([...list,...values]);
        setValues([])

    }
    return (
        <div>
            <div className={styles.input_data}>
                <h1>Todo List</h1>
                <input type="text" name="task" value={task.title && task.title} onChange={handleChange} placeholder="Enter your Task here..." id={styles.task} />
                <button className={styles.submit_btn} onClick={submitData}>{change?'Save Data':'Add Task'}</button>
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
                                list.length > 0?
                            list?.map((item, index) =>{
                                return(
                                
                                    <tr key={index}>
                                        <td> <input onChange={(e)=>submitValues(e,index,item.title)} checked={item.value} type="checkbox" /> {item.title} </td>
                                        <td className={styles.action_btns}> 
                                            <button onClick={() =>handleEdit(index)} className={styles.edit_btn}>Edit</button>
                                        </td>
                                    </tr>
                                )
                                })
                                : <div className={styles.noData}>
                                    <img src='/noData.svg' alt='no data' />
                                </div> }
                           { list.length>0 && <div className={styles.main_btns}>
                                <button onClick={submitCheckbox} className={styles.submit_btn} >Submit</button>
                                <button onClick={handleDelete} className={styles.del_btn}>Delete</button>
                            </div>
                             }
                        </tbody>
                    </table>
                    
                </div>
                <div className={styles.task_data}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Submitted Values</th>
                                {/* <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                checkbox.length>0?
                            checkbox?.map((item, index) =>{
                                
                                return(
                                    <tr key={index}>
                                        <td> <input onChange={(e)=>submitRevert(e,index,item.title)} checked={item.value} type="checkbox" />   {item.title} </td>
                                       
                                    </tr>
                                )
                                })
                                :<div className={styles.noData}>
                                    <img src='/noData.svg' alt='no data' />
                                </div>
                            }
                            {checkbox.length>0 && <div className={styles.main_btns}>
                                <button onClick={()=>handleRevert()} className={styles.revert_btn}>Revert</button>
                            </div>}
                            
                        </tbody>
                    </table>
                    
                </div>
            </div>

        </div>
    )
}

export default Todo
