import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";


export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-100 flex flex-col justify-center items-center p-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Welcome to <span className="text-indigo-600">Task Manager</span>
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          A powerful task management system built to help you organize work,
          collaborate with teams, manage priorities, track progress, and boost
          productivity.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-lg flex items-center gap-2"
            onClick={() => navigate("/login")}
          >
            Login <ArrowRight size={18} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white border border-indigo-600 text-indigo-600 rounded-xl shadow-lg"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </motion.button>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-16 grid md:grid-cols-3 gap-6 w-full max-w-5xl"
      >
        {[
          "Create & manage tasks easily",
          "Assign users with profile images",
          "Priority tagging & due dates",
          "Interactive ToDo checklists",
          "Upload attachments",
          "Dashboards with user/task metrics",
        ].map((feature, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="bg-white shadow-md rounded-xl p-5 flex gap-3 items-start"
          >
            <CheckCircle className="text-indigo-600 mt-1" />
            <p className="text-gray-700 font-medium">{feature}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <div className="mt-20 text-gray-500 text-sm">
        © {new Date().getFullYear()} Task Manager — Built by Aishwary Shreykar
        Singh
      </div>
    </div>
  );
}
