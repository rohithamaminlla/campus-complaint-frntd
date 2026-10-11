import {useState} from "react"
function Counting(){
    cont [Counting,setCount] = useState(0);
    function increment(){
        setCount(count+1);
    }
    function decrement(){
        setCount(count-1);
    }
    return(
        <>
           <h1>welcome</h1> 
           <h1>Anurag university</h1>

           <button onClick = {increment}>Inc</button>
           <button onClick = {decrement}>Dec</button>
           <h2>Count::{count}</h2>
        </>
    )
}
export default Counting;