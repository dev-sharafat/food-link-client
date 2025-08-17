// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";

const CTASection = () => {
 

  return (
    <section
      className="py-20 px-5 md:px-20 text-center bg-base-300 dark:bg-gray-600 my-5 rounded-sm dark:text-white bg-blue-5"
      
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold mb-6">
          Join the Movement to Reduce Food Waste
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Connect restaurants, charities, and communities to redistribute surplus food and create a sustainable impact. Start donating or join as a charity today!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          
          <Link to="/dashboard/user/request-charity-role" className="btn btn-outline border-green-700 hover:bg-green-700  font-semibold rounded-lg shadow-lg transition-all duration-300">
            Join as Charity
          </Link>
          
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
