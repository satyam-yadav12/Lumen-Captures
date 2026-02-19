export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen  text-gray-800  dark:text-gray-200 text-left">
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="mb-8 text-sm text-gray-600 dark:text-gray-400">
          Last updated: January 2026
        </p>

        <div className="space-y-8 leading-relaxed">
          {/* Intro */}
          <p>
            Lumen Captures is a personal portfolio and image-sharing platform.
            This Privacy Policy explains how information is collected, used, and
            protected when you use the application.
          </p>

          {/* Section */}
          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              1. Information We Collect
            </h2>
            <p>
              When you sign in using Google OAuth, we may collect limited
              profile information such as your name, email address, and profile
              picture. This data is used strictly for authentication and account
              management.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              2. User-Uploaded Images
            </h2>
            <ul className="list-disc space-y-1 pl-6">
              <li>Image uploads are voluntary and user-initiated</li>
              <li>Uploaded images are associated with the user’s account</li>
              <li>
                Images may be visible to others based on platform features
              </li>
              <li>Users may delete their uploaded images at any time</li>
            </ul>
            <p className="mt-2">
              Users are responsible for ensuring they have the right to upload
              and share the content they provide.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              3. Third-Party Image Content
            </h2>
            <p>
              Lumen Captures also displays publicly available images sourced
              from Unsplash for browsing and exploration. These images are not
              owned by Lumen Captures and remain subject to Unsplash’s licensing
              terms.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              4. Authentication & Cookies
            </h2>
            <p>
              Secure HTTP-only cookies are used to manage authentication
              sessions. Access and refresh tokens are used only to maintain
              secure login functionality.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              5. Data Sharing
            </h2>
            <p>
              We do not sell, rent, or share user data with third parties.
              Google OAuth is used solely for authentication purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              6. User Rights
            </h2>
            <p>
              Users may request account deletion or removal of associated data
              by contacting the developer.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              7. Contact
            </h2>
            <p>
              For any questions regarding this Privacy Policy, contact:
              <br />
              <span className="font-medium">satyam.dev637@gmail.com</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
