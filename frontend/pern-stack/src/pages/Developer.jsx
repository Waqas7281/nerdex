import React from 'react';

const Developer = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Developer Portfolio</h1>
          <p className="text-xl text-gray-600 mt-2">React & Node.js Developer</p>
        </div>
        
        <div className="space-y-8">
          {/* Frontend Experience */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-800">Frontend Experience</h2>
            <p className="text-lg text-gray-700">
              I have experience in building responsive and interactive user interfaces using <strong>React.js</strong>.
              I’m skilled in component-based development, state management with hooks, and working with APIs.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-4">
              <li>Building single-page applications (SPA) with React</li>
              <li>Responsive layouts using Tailwind CSS</li>
              <li>State management using React hooks (useState, useEffect)</li>
              <li>Working with RESTful APIs</li>
            </ul>
          </section>

          {/* Backend Experience */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-800">Backend Experience</h2>
            <p className="text-lg text-gray-700">
              I have hands-on experience in backend development with <strong>Node.js</strong>. I’m proficient in creating server-side logic, working with databases, and building RESTful APIs.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-4">
              <li>Building REST APIs using Express.js</li>
              <li>Database integration with  Postgres</li>
              <li>Integrating third-party APIs</li>
            </ul>
          </section>

          {/* Education Section */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-800">Education</h2>
            <p className="text-lg text-gray-700">
              I am currently pursuing my <strong>Bachelor of Science in Computer Science (BSCS)</strong> at USA University. I am currently in my 6th semester.
            </p>
          </section>

          {/* GitHub Link */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-800">GitHub</h2>
            <p className="text-lg text-gray-700">
              Check out my projects and code on my <a href="https://github.com/Waqas7281?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Developer;
