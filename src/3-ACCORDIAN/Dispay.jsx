import { motion } from 'framer-motion';
import './style.css';
const Dispay = ({ question, answer, isOpen, toggleFAQ }) => {
  return (
    <motion.div layout>
      <motion.div className="faq-question" layout onClick={toggleFAQ}>
        <div>{question}</div>
        <div>{isOpen ? <span>&#9650;</span> : <span>&#9660;</span>}</div>
      </motion.div>
      <motion.div
        className="faq-answer"
        layout
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? '30px' : 0,
          marginBottom: isOpen ? '10px' : 0,
          padding: isOpen ? '10px' : 0,
          borderBottom: isOpen ? '#ccc' : 'none',
        }}
      >
        {answer}
      </motion.div>
    </motion.div>
  );
};

export default Dispay;
