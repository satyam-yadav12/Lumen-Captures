import React from "react";

const About = () => {
  return (
    <div className=" text-gray-800   dark:text-gray-100">
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-left">About Lumen Captures</h1>
          <p className="text-gray-800 dark:text-gray-100 text-lg max-w-2xl text-left">
            Lumen Captures is an image exploration and sharing platform that enables users to discover, share, and interact with visual content in a secure and responsible environment.
          </p>
        </header>

        {/* Our Principles */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2 text-left">1. Our Principles</h2>
          <p className="text-gray-800 dark:text-gray-100 my-2 text-left">
            We respect the rights of content creators. User-uploaded images remain the property of their authors. Sample images from Unsplash are used under the Unsplash License for demonstration purposes, with proper attribution displayed where applicable.
          </p>
          <p className="text-gray-800 dark:text-gray-100 text-left my-2">
            Inappropriate content, including sexually explicit material, is not allowed and may be removed. User data, including name, email, and profile picture, is collected solely to provide platform functionality and is never shared with third parties.
          </p>
        </section>

        {/* Our Vision */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2 text-left">2. Our Vision</h2>
          <p className="text-gray-800 dark:text-gray-100 text-left">
            Our goal is to create a safe, user-friendly space for exploring and sharing images, fostering a community of creativity, responsible engagement, and discovery.
          </p>
        </section>

        {/* Technology & License */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-2 text-left">3. Technology & License</h2>
          <p className="text-gray-800 dark:text-gray-100 my-2 text-left">
            Lumen Captures is built with modern web technologies, including Flask, React, MongoDB, Tailwind CSS, and Material UI, ensuring a responsive, secure, and engaging user experience.
          </p>
          <p className="text-gray-800 dark:text-gray-100 text-left">
            The source code of this project is licensed under the{" "}
            <a href="https://github.com/satyam-yadav12/Lumen-Captures/blob/main/LICENSE" className="text-blue-600 underline">MIT License</a>. For information regarding user content, image usage, and platform policies, please see our <a href="/terms" className="text-blue-600 underline">Terms & Conditions</a>
          </p>
        </section>

        {/* Footer */}
        <footer className="pt-12 border-t text-sm text-gray-500 text-left">
          © 2025 Lumen Captures. All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default About;
