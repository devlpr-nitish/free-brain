import React from 'react';
import { motion } from 'framer-motion';

const ScrollAnimation = () => {

  const items = ["Documents", "Codes", "Links", "Files","Documents", "Codes", "Links", "Files","Documents", "Codes", "Links", "Files"]

  return (
    <div className="w-full max-w-[1536px] mx-auto relative h-[60px] mt-20 overflow-hidden mask-image-gradient">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute left-[max(calc(200px*8),100%)] md:w-[200px] md:h-[60px] px-8 py-2 flex justify-center items-center rounded-md opacity-80 
            ${index % 2 === 0 ? "border border-[#594EF1]" : "bg-[#594EF1] text-white"}`}
          animate={{
            left: '-200px',
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            delay: (30 / 8) * (8 - index - 1) * -1,
          }}
        >
          <p className={`md:text-2xl text-md select-none ${index % 2 === 0 ? "text-[#594EF1]" : "text-white"}`}>{item}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default ScrollAnimation;