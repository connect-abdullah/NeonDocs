import React from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";

export default function Card({ data, ref, markDone, deleteTask }) {
  return (
    <motion.div 
      drag 
      dragConstraints={ref} 
      whileDrag={{scale:1.2}} 
      dragElastic={0.3} 
      dragTransition={{bounceStiffness:150,bounceDamping:20}} 
      className={`relative flex-shrink-0 w-58 h-68 rounded-[30px] ${data.tag.isOpen ? 'bg-zinc-900/70' :'bg-green-700/20'} text-white px-7 py-10 overflow-hidden cursor-pointer`}
    >
      <FaRegFileAlt />
      <p className="text-sm mt-5 font-semibold leading-tight">{data.desc}</p>

      <div className="footer absolute bottom-0 left-0 w-full bg-red-700/72 text-white/75">
        {data.close && (<div className="flex items-center justify-center py-3 px-8 pb-1 mb-3" onClick={deleteTask}> 
           <IoMdClose />
        </div> )}
        {data.tag.isOpen && (
          <div className={`tag w-full py-3 pb-4 flex justify-center items-center bg-green-600/72`} onClick={markDone}>
            <h3 className="text-sm font-semibold">{data.tag.tagTitle}</h3>
          </div>
        )}
      </div>
    </motion.div>
  );
}
