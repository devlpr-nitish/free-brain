import { AddContentForm } from '@/components/AddContentForm'
import ShinnyEffect from '@/components/ShinnyEffect';
import {motion}from "framer-motion";

const AddContent = () => {
  return (
    <div className='w-full md:px-36 py-10 min-h-[750px] bg-[#171717]  rounded-md flex flex-col relative overflow-hidden'>
      {/* ShinnyEffect with Improved Positioning */}
      <motion.div
        className="absolute top-[-50px] left-[-50px] hidden md:block"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ShinnyEffect left={10} top={10} size={300} />
      </motion.div>
      <motion.div
        className="absolute top-[-50px] right-[-50px] md:block"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ShinnyEffect right={10} top={10} size={300} />
      </motion.div>
      <motion.div
        className="absolute top-[-50px] left-[-50px] md:block"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ShinnyEffect left={50} top={400} size={300} />
      </motion.div>
      <motion.div
        className="absolute top-[-50px] left-[-50px]  md:block"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ShinnyEffect right={100} top={100} size={300} />
      </motion.div>
      <h1 className='text-center text-white py-4 text-4xl font-5xl font-bold'>Add Your <span className='text-[#594EF1]'>content</span></h1>
      <AddContentForm />
    </div>
  )
}

export default AddContent;