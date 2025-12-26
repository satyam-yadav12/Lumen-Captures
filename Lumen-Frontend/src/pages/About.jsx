import React, { useContext } from "react";


const About = () => {



  return (<div classNameName="">

    <main className="max-w-4xl mx-auto px-6 py-16">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">About Lumen Captures</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Lumen Captures is an image exploration and sharing platform that enables users to discover, share, and interact with visual content in a secure and responsible environment.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Principles</h2>
        <p className="text-gray-700 mb-4">
          We respect the rights of content creators. User-uploaded images remain the property of their authors. Sample images from Unsplash are used under the Unsplash License for demonstration purposes, with proper attribution displayed where applicable.
        </p>
        <p className="text-gray-700">
          Inappropriate content, including sexually explicit material, is not allowed and may be removed. User data, including name, email, and profile picture, is collected solely to provide platform functionality and is never shared with third parties.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
        <p className="text-gray-700">
          Our goal is to create a safe, user-friendly space for exploring and sharing images, fostering a community of creativity, responsible engagement, and discovery.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Technology & License</h2>
        <p className="text-gray-700 mb-2">
          Lumen Captures is built with modern web technologies, including Flask, React, MongoDB, Tailwind CSS, and Material UI, ensuring a responsive, secure, and engaging user experience.
        </p>
        <p className="text-gray-700">
          The source code of this project is licensed under the <a href="LICENSE" className="text-blue-600 underline">MIT License</a>. For information regarding user content, image usage, and platform policies, please see our <a href="terms.html" className="text-blue-600 underline">Terms & Conditions</a>.
        </p>
      </section>

      <footer className="pt-12 border-t text-sm text-gray-500 text-center mt-12">
        © 2025 Lumen Captures. All rights reserved.
      </footer>
    </main>

  </div>);
};

export default About;
