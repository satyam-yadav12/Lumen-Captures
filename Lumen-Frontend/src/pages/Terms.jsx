import React from 'react'

export const Terms = () => {
    return (
        <div className=" text-gray-800  dark:text-gray-100  ">
            <main className="max-w-4xl mx-auto px-6 py-12">
                {/* Page Title */}
                <h1 className="text-3xl font-bold mb-6  text-left">Terms & Conditions</h1>
                <p className="text-sm text-gray-600 mb-12  text-left">
                    Last updated: January 2026
                </p>

                {/* Terms Sections */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-2  text-left">1. Purpose</h2>
                    <p className=" text-gray-800 dark:text-gray-100  text-left">
                        Lumen Captures is a personal project created for educational, portfolio, and community demonstration purposes. By accessing or using this website, you agree to these terms.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-2  text-left">2. Use of the Platform</h2>
                    <p className=" text-gray-800 dark:text-gray-100  text-left">
                        You agree to use Lumen Captures only for lawful purposes and in a manner that does not violate the rights of others or disrupt the platform experience.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-2  text-left">3. User-Uploaded Content</h2>
                    <p className=" text-gray-800 dark:text-gray-100  text-left">
                        Users retain full ownership of the images they upload. By uploading content, you grant Lumen Captures permission to store and display it solely for platform functionality.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-2  text-left">4. Content Policy</h2>
                    <p className=" text-gray-800 dark:text-gray-100  text-left">
                        Sexually explicit, pornographic, violent, abusive, or otherwise inappropriate content is prohibited. Violating content may be removed without notice.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-2  text-left">5. Image Usage & Attribution Notice</h2>
                    <p className=" text-gray-800 dark:text-gray-100  text-left">
                        Lumen Captures uses a curated selection of images sourced from Unsplash to enhance discovery, inspiration, and exploration features within the platform. All Unsplash images displayed in this application remain the property of their respective photographers and are licensed under the Unsplash License. Lumen Captures does not claim ownership of any Unsplash images and does not sell, sublicense, or redistribute Unsplash content as a dataset or collection. Images are presented individually for viewing and download, in accordance with Unsplash’s licensing terms. Downloaded images are intended for personal or commercial use as permitted by the Unsplash License, and users are responsible for complying with any applicable rights, including model or property releases. Whenever possible, attribution to the original photographer and Unsplash is provided and encouraged.                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-2  text-left">6. Image Downloads</h2>
                    <p className=" text-gray-800 dark:text-gray-100  text-left">
                        Users may download individual images for personal and educational use. Bulk downloads and redistribution are not permitted.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-2  text-left">7. User Information</h2>
                    <p className=" text-gray-800 dark:text-gray-100  text-left">
                        Limited user information such as name, email, and profile picture is collected for authentication and profile display only.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-2  text-left">8. Privacy & Data Usage</h2>
                    <p className=" text-gray-800 dark:text-gray-100  text-left">
                        User data is not sold or shared with third parties and is used solely for platform functionality.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-2  text-left">9. Limitation of Liability</h2>
                    <p className=" text-gray-800 dark:text-gray-100  text-left">
                        Lumen Captures is provided "as is" without warranties. The creator is not responsible for loss, damage, or misuse of content.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-2  text-left">10. Account Termination</h2>
                    <p className=" text-gray-800 dark:text-gray-100  text-left">
                        Access may be suspended or terminated if these terms are violated.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-2  text-left">11. Changes to These Terms</h2>
                    <p className=" text-gray-800 dark:text-gray-100  text-left">
                        Terms may be updated periodically. Continued use indicates acceptance of updated terms.
                    </p>
                </section>

                {/* Footer */}
                <footer className="pt-8 border-t text-sm text-gray-500  text-left">
                    © 2026 Lumen Captures. All rights reserved.
                </footer>
            </main>
        </div>
    )
}

export default Terms;