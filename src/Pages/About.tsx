import React, { useState } from 'react';
import heroImage from '../assets/study-group.jpg'; // Make sure this exists

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="font-sans text-gray-800">

      {/* Hero Section */}
      <section
        className="relative h-[90vh] text-white flex items-center justify-center text-center px-4 md:px-12"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Empowering Tutors. Simplifying Selection.
          </h1>
          <p className="text-lg md:text-xl mb-8 drop-shadow-sm text-gray-100">
            TeachTeam helps students and lecturers connect through an efficient tutoring platform.
            Apply, review, and collaborate – all in one place.
          </p>
          <a
            href="#features"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition duration-200"
          >
            Learn How It Works
          </a>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Features Section */}
      <section id="features" className="bg-white py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">How TeachTeam Helps</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">For Tutors</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Apply for open tutoring roles easily</li>
              <li>Showcase your skills & availability</li>
              <li>Maintain an active tutoring profile</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">For Lecturers</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Browse and shortlist qualified applicants</li>
              <li>Rank tutors based on your preferences</li>
              <li>Provide feedback and manage matches</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Application Process Section */}
      <section id="how-to-apply" className="bg-gray-100 py-20 px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <img
            src={heroImage}
            alt="Students collaborating"
            className="rounded-xl shadow-md w-full h-auto object-cover"
          />
          {/* Accordion */}
          <div className="bg-white rounded-xl shadow p-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <h3 className="text-xl font-semibold text-blue-700">How do I apply?</h3>
              <span className="text-yellow-500 text-3xl font-bold select-none">
                {isExpanded ? '−' : '+'}
              </span>
            </div>
            {isExpanded && (
              <div className="mt-4 text-sm text-gray-700 space-y-4">
                <p>
                  To apply, log in or create an account on TeachTeam and follow these steps:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Upload proof of right to work (citizenship or visa)</li>
                  <li>Provide your full name and contact details</li>
                  <li>List your qualifications and education</li>
                  <li>Add employment history</li>
                  <li>Submit two references with contact info</li>
                </ul>
                <p>
                  Your profile will remain active for two years and can be updated anytime.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* CTA Section */}
      <section className="py-20 bg-blue-700 text-white text-center px-6">
        <h3 className="text-3xl font-bold mb-4">Ready to join TeachTeam?</h3>
        <p className="text-lg mb-8">Sign up today and start shaping the future of tutoring at the School of Computer Science.</p>
        <div className="flex justify-center gap-6 flex-wrap">
          <a
            href="/signup"
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Create Account
          </a>
          <a
            href="/login"
            className="border-2 border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-blue-700 transition"
          >
            Sign In
          </a>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-300" />

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 px-6 md:px-20 py-12 mt-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8 text-sm">
          <div>
            <h4 className="text-lg font-semibold text-blue-900 mb-4">Contact</h4>
            <ul className="space-y-2">
              <li><a href="#" className="font-medium text-blue-800">Online enquiry</a></li>
              <li>Future students <br /><span className="font-semibold text-blue-800">1800 626 481</span></li>
              <li>Current students <br /><span className="font-semibold text-blue-800">1800 72 4357</span></li>
              <li>International agents <br /><span className="font-semibold text-blue-800">+61 2 6620 3876</span></li>
              <li>24/7 Mental Health <br /><span className="font-semibold text-blue-800">1300 782 676</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-blue-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Directory</a></li>
              <li><a href="#" className="hover:underline">How to apply</a></li>
              <li><a href="#" className="hover:underline">News</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">A-Z Courses</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-blue-900 mb-4">Information for</h4>
            <ul className="space-y-2">
              <li>Students</li>
              <li>Lecturers</li>
              <li>Alumni</li>
              <li>Partners</li>
              <li>Staff</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-blue-900 mb-4">About</h4>
            <ul className="space-y-2">
              <li>Our Team</li>
              <li>Vision & Mission</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 border-t border-gray-300 pt-4">
          <p>© {new Date().getFullYear()} TeachTeam | School of Computer Science</p>
          <div className="mt-2 md:mt-0 flex gap-4">
            <a href="#" className="hover:underline">Feedback</a>
            <a href="#" className="hover:underline">Accessibility</a>
            <a href="#" className="hover:underline">Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
