import React from "react";
import { FaGithub } from "react-icons/fa"; // For GitHub icon

const Developer = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-8 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <div className="text-center mb-6">
          <img
            src="https://via.placeholder.com/150" // You can replace this with your profile image
            alt="Developer"
            className="rounded-full mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800">Waqas ali shah</h1>
          <p className="text-lg text-gray-500">Frontend & Backend Developer</p>
        </div>

        <div className="flex justify-center items-center space-x-4 mb-6">
          <a
            href="tel:+1234567890"
            className="text-xl text-blue-600 hover:text-blue-800"
            aria-label="Phone Number"
          >
            📞 0321-8636730
          </a>
          <a
            href="https://github.com/Waqas7281?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-gray-700 hover:text-gray-900"
            aria-label="GitHub Profile"
          >
            <FaGithub />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2"> 6 Month Frontend Experience</h2>
            <ul className="list-disc pl-5">
              <li>React.js - Building responsive UIs</li>
              <li>Tailwind CSS - Styling with utility-first approach</li>
              <li>JavaScript ES6+ - Modern JS development</li>
              <li>Redux - State management</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Backend Experience</h2>
            <ul className="list-disc pl-5">
              <li>Node.js - JavaScript runtime for backend</li>
              <li>Express.js - Web framework for Node.js</li>
              <li>Postgres - SQL database</li>
              <li>RESTful API development</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developer;
