import { MyButton } from "@/components/Self/MyButton";
import ShinnyEffect from "@/components/ShinnyEffect";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ScrollAnimation from "@/components/InfineScrollRow";
import { LuBrain } from "react-icons/lu";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.5 }
  }
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full min-h-screen rounded-md md:px-24 md:py-54 px-10 py-40 flex flex-col gap-12 items-center justify-center bg-[#171717] relative text-white antialiased overflow-hidden"
    >
      <motion.div
        className="text-white text-wrap text-center text-2xl md:text-6xl font-bold flex flex-col gap-6 items-center"
      >
        <motion.div variants={textVariants}>
          <span>Unload Your Brain, Organize Your World</span>
        </motion.div>

        <motion.div
          className="md:text-5xl text-xl text-wrap text-center text-gray-200"
          variants={textVariants}
        >
          <span>
            <span className="text-[#594ef1]">Free Brain</span> Your Digital Memory Vault
          </span>
        </motion.div>
      </motion.div>

      {/* Description Section */}
      <motion.div
        className="md:text-md text-sm text-center text-gray-300 tracking-wide"
        variants={textVariants}
      >
        <p>
          Don't let ideas slip away. Save your links, docs, codes, and more in one place — so your brain stays free to create and explore.
        </p>
      </motion.div>

      {/* Button Section */}
      <motion.div className="flex gap-2 items-center">
        <motion.button
          initial={{ scale: 1 }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          onClick={() => navigate("/dashboard")}
          className="bg-[#594ef1] md:px-6 px-4 text-center flex items-center flex-row py-2 rounded-sm hover:rounded-xl transition cursor-pointer text-xl"
        >
          Get started
        </motion.button>
      </motion.div>


      <div className="w-full ">
        <ScrollAnimation/>
      </div>


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
        <ShinnyEffect left={10} top={10} size={400} />
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
        <ShinnyEffect right={10} top={10} size={400} />
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
        <ShinnyEffect left={50} top={400} size={400} />
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
        <ShinnyEffect right={100} top={100} size={400} />
      </motion.div>
    </motion.div>
  );
};

export default Home;
