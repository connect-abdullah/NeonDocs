import {React,useRef,useState,useEffect} from 'react';
import Card from './Card';
import { IoMdAddCircleOutline } from "react-icons/io";

export default function Foreground() {
    const ref = useRef(null)
     // Load data from sessionStorage or use default data
  const [data, setData] = useState(() => {
    const storedData = sessionStorage.getItem("docsData");
    return storedData ? JSON.parse(storedData) : [];
  });

  // Update sessionStorage whenever data changes
  useEffect(() => {
    sessionStorage.setItem("docsData", JSON.stringify(data));
  }, [data]);

  // Function to add a new task
  const addTask = () => {
    const newTask = prompt("Enter your task:");
    if (newTask) {
      const updatedData = [
        ...data,
        {
          desc: newTask,
          close: false,
          tag: { isOpen: true, tagTitle: "Done"}
        }
      ];
      setData(updatedData);
    } else {
      alert("Please enter a task");
    }
  };

   // Function to mark task as done (shows cross & changes color)
   const markDone = (index) => {
    const updatedData = [...data];
    updatedData[index].close = true; // Show cross
    updatedData[index].tag.isOpen = false; // Hide Done Button
    // updatedData[index].bgColor = "bg-green-900/80"
    setData(updatedData);
  };


  // Function to delete a task
  const deleteTask = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };
    
  return (
    <div ref={ref} className='fixed top-0 left-0 z-[3] w-full h-full flex gap-5 flex-wrap'>
        <IoMdAddCircleOutline  onClick={addTask} className='absolute right-4 top-4 text-black text-6xl cursor-pointer hover:text-red-700/50 hover:scale-120 transition-all duration-300'/>
        {data.map((item) => (
            <Card data={item} ref={ref} markDone={() => markDone(data.indexOf(item))} deleteTask={() => deleteTask(data.indexOf(item))}/>
        ))}
    </div>
  )
}
