// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaHandsHelping, FaUtensils, FaLeaf } from "react-icons/fa";

const AboutSection = () => {
  return (
    <section className="relative py-16 px-6 mt-5 rounded-sm md:px-12 lg:px-20 bg-gray-50 dark:bg-gray-600 transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-3xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100"
        >
          Connecting Surplus Food with Communities in Need
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto"
        >
          Our platform helps restaurants donate surplus food, charities access meals,
          and communities fight hunger — while reducing food waste sustainably.
        </motion.p>
      </div>

      {/* Features */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Card 1 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800 text-center transition-colors duration-300"
        >
          <FaUtensils className="text-4xl mx-auto text-green-500" />
          <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
            Easy Donations
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
            Restaurants can quickly post available surplus food with details like
            quantity, type, and pickup time.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800 text-center transition-colors duration-300"
        >
          <FaHandsHelping className="text-4xl mx-auto text-blue-500" />
          <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
            Charity Support
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
            Verified charities can request food easily, ensuring meals reach those
            who need them the most.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800 text-center transition-colors duration-300"
        >
          <FaLeaf className="text-4xl mx-auto text-yellow-500" />
          <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
            Sustainability
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
            By reducing food waste, we protect the environment while helping
            communities thrive together.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
