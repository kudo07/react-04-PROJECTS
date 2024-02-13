import { useState } from 'react';
import Dispay from './Dispay';
import Info from './Info';
import faqs from './faqs.json';
const Accordian = () => {
  const [openIndeices, setOpenIndices] = useState([]);
  const toggleFAQ = (index) => {
    setOpenIndices((prevOpenIndices) =>
      prevOpenIndices.includes(index)
        ? prevOpenIndices.filter((i) => i != index)
        : [...prevOpenIndices, index]
    );
  };
  return (
    <>
      <Info />
      <h1
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '50px',
        }}
      >
        Frequently Asked Questions
      </h1>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <Dispay
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndeices.includes(index)}
            toggleFAQ={() => toggleFAQ(index)}
          />
        ))}
      </div>
    </>
  );
};

export default Accordian;
