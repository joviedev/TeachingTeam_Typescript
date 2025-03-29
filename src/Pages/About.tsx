import React from 'react';

const About = () => {
  return (
    <div className="p-6 md:p-12 bg-white text-gray-800 font-sans">
      <section className="text-center py-10">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          Welcome to TeachTeam
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-600">
          A smart platform for managing casual tutor applications at the School of Computer Science.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-10 py-10">
        <div>
          <h2 className="text-2xl font-semibold text-blue-800 mb-3">For Tutors</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Apply for available roles</li>
            <li>List your skills and availability</li>
            <li>Manage your tutor profile</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-blue-800 mb-3">For Lecturers</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>View and shortlist applicants</li>
            <li>Rank tutor preferences</li>
            <li>Leave feedback and comments</li>
          </ul>
        </div>
      </section>

      <section className="text-center py-10">
        <h3 className="text-xl font-medium mb-4">Ready to get started?</h3>
        <div className="flex justify-center gap-6">
          <a href="/signup" className="text-blue-700 underline font-semibold">
            Create Account
          </a>
          <a href="/signin" className="text-blue-700 underline font-semibold">
            Sign In
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
