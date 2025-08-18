// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "Who can donate food?",
    answer: "Any registered restaurant or food provider can donate surplus food to the platform.",
  },
  {
    question: "Is it free to join as a charity?",
    answer: "Yes, charities can join and request food donations without any fees.",
  },
  {
    question: "How does pickup work?",
    answer: "Once a donation request is accepted, charities can schedule a pickup within the available time window.",
  },
  {
    question: "How do you ensure food safety?",
    answer: "All donations are verified and restaurants are responsible for providing safe and consumable food.",
  },
];

const FAQSection = () => {

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section
      className="py-20 mt-5 px-5 md:px-20 dark:bg-gray-800 dark:text-white bg-white text-gray-900 mb-5 rounded-sm"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl lg:text-4xl md:text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              className="border 
                dark:border-gray-700 border-gray-200
              } rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full text-left px-5 py-4 flex justify-between items-center font-semibold focus:outline-none"
              >
                {faq.question}
                <span className="text-2xl">{activeIndex === idx ? "-" : "+"}</span>
              </button>
              {activeIndex === idx && (
                <div className="px-5 py-3 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FAQSection;
