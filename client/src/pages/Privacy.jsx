import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-[var(--max-width)] mx-auto px-4">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold mb-8"
        >
          Privacy Policy
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose max-w-none"
        >
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <p className="mb-4">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name and contact information</li>
              <li>Emergency contact details</li>
              <li>Health and fitness information</li>
              <li>Payment information</li>
              <li>Membership preferences</li>
              <li>Workout and attendance history</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Process your membership and payments</li>
              <li>Provide personalized fitness programs</li>
              <li>Send important updates about your membership</li>
              <li>Improve our services and facilities</li>
              <li>Ensure the safety and security of our members</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
            <p className="mb-4">We do not sell or rent your personal information. We may share your information with:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Service providers who assist in our operations</li>
              <li>Professional advisors and insurers</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>File a complaint with relevant authorities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, modification, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-gray-100 p-4 rounded">
              <p>Email: privacy@jordanfitnessclub.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Address: 123 Fitness Avenue, City, State 12345</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Updates to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date and the updated version will be effective as soon as it is accessible.
            </p>
            <p className="text-sm text-gray-600">Last Updated: June 14, 2025</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
