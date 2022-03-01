// import { async } from '@firebase/util'
import { addDoc, collection, doc, getDoc,  } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { db } from "./firebase"

const TodoApp = () => {

    const [input, setinput] = useState("")
    const [todo, setTodo] = useState([])
    const [refresh,setrefresh] = useState(false)



    useEffect(async () => {
        const dbfref = collection(db, "Todos")
        const update = await getDoc(dbfref)
        let getTodo = []
        update.forEach((doc) => {
            getTodo.push({key: doc.id, todo: doc.data().todo})
        })
        setTodo(getTodo)


    }, [refresh])



    //   for Add Button
    const Add = async () => {
        // console.log(input)
        const dbref = collection(db, "Todos")
        try {
            const upref = await addDoc(dbref, {
                Todo: input
            })
            setrefresh(!refresh)
            console.log(upref)
        } catch (error) {
            console.log(error)
        }

        setinput("")

    }


    return (
        <div>


            <div>
                <input type="text" value={input} placeholder='Add Todo' onChange={(e) => setinput(e.target.value)} />
                <div>
                    <button onClick={Add} className=''>Add</button>
                    <button>Delete</button>

                </div>
            </div>
            <div>
                {/* <ul>
                    {todo.map((val, index) => {
                        return val.todo !== "" ?(
                        <div key={index}>

                            <li> {val.todo} </li>
                            <div>
                                <button>Edit</button>
                                <button>Del</button>
                            </div>
                        </div> ) :null;

                    })}
                </ul> */}


                {/* <h1>{input}</h1> */}
             <div>
             {todo.map((val,index,array)=>{
                    <ul key={index}>
                        <li >
                            {val.todo}
                        </li>
                    </ul>
                })}
            </div>
             </div>
            



        </div>
    )
}

export default TodoApp
