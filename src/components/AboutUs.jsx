import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaUtensils,
  FaHandsHelping,
  FaUsers,
  FaSeedling,
  FaHeart,
} from "react-icons/fa";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  return (
    <section className="w-full dark:bg-gray-900">
      {/* 1. Hero Section */}
      <motion.div
        className="  py-20 px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-2xl md:text-3xl font-bold mb-4"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
        >
          About Our Food Donation System
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3, duration: 1 }}
        >
          We believe no food should go to waste while people are going hungry.  
          Our platform connects donors, charities, and communities to fight hunger together.
        </motion.p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        {/* 2. Mission & Vision */}
        <motion.div
          className="text-center space-y-6"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <FaSeedling className="mx-auto text-5xl text-green-600" />
          <h2 className="text-3xl font-bold">Our Mission & Vision</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our mission is to **rescue surplus food** and deliver it to people who need it most.  
            Our vision is a **world without hunger**, where kindness and sharing create stronger communities.
          </p>
        </motion.div>

        {/* 3. How It Works */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.3 },
            },
          }}
        >
          <motion.div
            className="p-6 bg-base-100 shadow-lg rounded-2xl border"
            variants={fadeInUp}
          >
            <FaUtensils className="mx-auto text-4xl text-teal-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">1. Donate Food</h3>
            <p className="text-gray-600">
              Restaurants, events, and families can donate surplus food with just a few clicks.
            </p>
          </motion.div>

          <motion.div
            className="p-6 bg-base-100 shadow-lg rounded-2xl border"
            variants={fadeInUp}
          >
            <FaHandsHelping className="mx-auto text-4xl text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">2. Connect to Charities</h3>
            <p className="text-gray-600">
              We link donations with trusted NGOs & charities that ensure fair distribution.
            </p>
          </motion.div>

          <motion.div
            className="p-6 bg-base-100 shadow-lg rounded-2xl border"
            variants={fadeInUp}
          >
            <FaUsers className="mx-auto text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">3. Feed Communities</h3>
            <p className="text-gray-600">
              Nutritious food reaches families, schools, and shelters in need.
            </p>
          </motion.div>
        </motion.div>

        {/* 4. Our Impact */}
        <motion.div
          className="text-center space-y-6"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <FaHeart className="mx-auto text-5xl text-pink-500" />
          <h2 className="text-3xl font-bold">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <motion.div
              className="p-6 bg-base-100 shadow-lg rounded-2xl border"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-4xl font-bold text-green-600">25K+</h3>
              <p className="text-gray-600">Meals Donated</p>
            </motion.div>
            <motion.div
              className="p-6 bg-base-100 shadow-lg rounded-2xl border"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-4xl font-bold text-blue-600">1K+</h3>
              <p className="text-gray-600">Charity Partners</p>
            </motion.div>
            <motion.div
              className="p-6 bg-base-100 shadow-lg rounded-2xl border"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-4xl font-bold text-pink-500">5K+</h3>
              <p className="text-gray-600">Volunteers</p>
            </motion.div>
          </div>
        </motion.div>

        {/* 5. Call to Action */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center bg-gradient-to-r from-green-600 to-teal-500 text-white py-12 px-6 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
          <p className="mb-6 max-w-xl mx-auto">
            Every small act of kindness counts. Whether you donate, volunteer, or spread awareness,
            you’re helping us fight hunger together.
          </p>
          <button className="btn btn-warning text-lg font-semibold">
            Get Involved
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
