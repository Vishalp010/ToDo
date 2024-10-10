"use client"
import { useState,useEffect } from "react";
import {Roboto} from "next/font/google"


const roboto = Roboto({    
  // yaha humne roboto bnaake usme Roboto ko as function paas kr diya with some objects or we can say props of it in it 
  weight:'700',
  subsets:['latin'],
  display:'swap',
  style:"normal"
 //yaha hume ye subset and all property paas krni hi krni hoti h apni marzi k according jo neeeded h wo 
})

const Body = () => {
  const [add,setAdd] = useState([]);

  const addBox = ()=>{
    setAdd([...add,{id:Date.now(),value: ""}])    //yaha pr teen dot ka mtlb h ki jo b element pehele se add array me mmojud h wo sb utha laao shallow copy krke and usme jo hum ye side me "" dere h iska mtlb ye h ki usme ek nayi empty string add krdo jo ki hum neeche ek function or input box bnaake type krege us string me jo empty h, ye teen ko hum spread operator kehte h , yaha hum id b bnaaare h jo aage paas krege easy maping k liy 
  }

  const removeTask = (index)=>{
    const newTask = add.filter((_,i)=> i!==index)
    setAdd(newTask)
  }



  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(add))   //ye line ka mtlb h ki stringify krke tasks me mojuda data ko add me add krdo after stringify at the key tasks in the local storage 
  },[add])    //yaha pr add array use krne ka mltb h ki jb jb array add change ho tb tb ye call ho 

  useEffect(()=>{
    const storedTasks = localStorage.getItem("tasks")  //yaha hum localstorage se tasks laare h jo usme saved h ya mojud h jo ki tasks key point pr mojud ho kuki yaha humne tasks ek key ka role play krri h jo ki localstorage ki key hoti h 
    if(storedTasks){
      // console.log(JSON.parse(storedTasks))
      setAdd(JSON.parse(storedTasks))  //yaha humne parse krke storedtask ka data setadd se add array me daal diya h 
    }
  },[])  //yaha blank array ka mtlb h ki ye sirf jb call hoga jb page load hoga wrna nahi hoga ye call 

  const updateTask=(index,value)=>{
    const newTask = [...add]   //yaha humne add ki shallow copy bnaayi then newTask me assign kra  as newTask ek string h to use array ki traah use krke Update krlege given value me jo aayi h hmaare paas 
    newTask[index].value = value  // newTask k index pr jaake value update krdege new value se    
    setAdd(newTask)
  }

  return (
    <div  className="h-screen flex justify-center items-center flex-col bg-slate-100 ">
      <h1 className="text-4xl font-bold md:text-6xl p-4 ">TO-DO-LIST</h1>
      <div  className="flex max-h-[80%] w-[80%] overflow-y-auto border-[2px] border-black rounded-md bg-white ">
      <div className="border-[1px] border-black w-[88%] " >
        {add.map((item,index)=>(   //yaha hum apni add array jo ki humne use state me declare kri h usko map kr rahe h 
        <div  key={item.id}>  
        {/* jo humne upar id bnaayi h usestate k waha addBox function me wo yaha as key paas krege taaki usse hume access krna is item ko easy ho jaaye */}
          <input //yaha hum wo jo input lene k liy box dege jisme to do task likhege wo krre h 
          type="text"
          placeholder="Enter your To do task here"
          value = {item.value}
          onChange={(i)=>updateTask(index,i.target.value)}    //yaha humne onchange me ek function call kra h jo ki h updateTask jisme hum yaha se index se related point pr jo value h usko edit krege by using the i.target.value iski help se hum i me target krege value uski then use edit karege 
          className={`border-black border-[1px] p-2 mb-1 w-[100%] ${roboto.className} `}
          
          />
        <button onClick={()=>{removeTask(index)}} className="red">DONE</button>
        <button className="white">UPDATE</button>
        </div>
        ))}
      </div>
        <div className="flex justify-center border-[1px] border-black w-[13%] md:w-[12%]"  >
        <button onClick={addBox}  className="green">ADD</button>   
        </div>
      </div>
    </div>
  )
}

export default Body
