

import React from "react";

const Developer = () => {
  return (
    <div className=" text-gray-800 dark:text-white">
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4  text-left">Developer</h1>
          <p className="text-lg max-w-2xl  text-left">
            Lumen Captures is developed and maintained by SATYAM YADAV. If you have any questions, suggestions, or want to collaborate, feel free to reach out.
          </p>
        </header>

        {/* About Developer */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2  text-left">1. About the Developer</h2>
          <p className=" text-gray-800 dark:text-gray-100  text-left mb-2">
            SATYAM YADAV is a full-stack web developer with experience in Flask, React, and MongoDB. Passionate about building secure, responsive, and user-friendly platforms.
          </p>
          <p className=" text-gray-800 dark:text-gray-100  text-left">
            Lumen Captures is a personal project showcasing expertise in modern web technologies and best practices in authentication, image management, and UI/UX design.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-2  text-left">2. Contact</h2>
          <p className=" text-gray-800 dark:text-gray-100  text-left mb-2">
            For professional inquiries, collaborations, or feedback, you can reach out via email:
          </p>
          <p className=" text-gray-800 dark:text-gray-100  text-left">
            <a href="mailto:satyam.dev637@gmail.com" className="text-blue-600 underline">
              satyam.dev637@gmail.com
            </a>
          </p>
        </section>

        {/* Footer */}
        <footer className="pt-12 border-t text-sm text-gray-500  text-left">
          © 2026 SATYAM YADAV. All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default Developer;
