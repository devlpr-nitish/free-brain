import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[750px] flex flex-col items-center justify-center bg-[#0A0A0A] text-white">
      <motion.h1 
        className="text-6xl font-bold mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        4<span className='text-[#594ef1]'>0</span>4
      </motion.h1>
      <motion.p 
        className="text-xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Oops! The page you are looking for does not exist.
      </motion.p>
      <Link 
        to="/"
        className="px-6 py-2 bg-[#594ef1] text-white rounded-md hover:bg-[#463dcf] transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;