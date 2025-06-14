import { motion } from "framer-motion";

const Terms = () => {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-[var(--max-width)] mx-auto px-4">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold mb-8"
        >
          Terms of Service
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose max-w-none"
        >
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Membership Terms</h2>
            <div className="space-y-4">
              <p>
                By becoming a member of Jordan Fitness Club, you agree to these terms and conditions. Membership is subject to the following conditions:
              </p>
              <ul className="list-disc pl-6">
                <li>Members must be at least 16 years of age</li>
                <li>Membership is non-transferable</li>
                <li>Members must complete health screening documentation</li>
                <li>Members must follow gym rules and etiquette</li>
                <li>Management reserves the right to terminate membership for violation of terms</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Payment and Cancellation</h2>
            <div className="space-y-4">
              <p>Payment terms and cancellation policies include:</p>
              <ul className="list-disc pl-6">
                <li>Monthly membership fees are due on the agreed payment date</li>
                <li>30-day written notice required for membership cancellation</li>
                <li>Initiation fees are non-refundable</li>
                <li>Membership freezing available for medical reasons (documentation required)</li>
                <li>Late payment fees may apply</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Facility Usage</h2>
            <div className="space-y-4">
              <p>Members agree to the following regarding facility usage:</p>
              <ul className="list-disc pl-6">
                <li>Proper athletic attire and closed-toe shoes required</li>
                <li>Equipment must be wiped down after use</li>
                <li>Respect time limits on cardio equipment during peak hours</li>
                <li>Personal training limited to club-employed trainers</li>
                <li>Lockers are for day use only unless otherwise specified</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Liability and Risk</h2>
            <div className="space-y-4">
              <p>
                Members acknowledge that exercise and use of fitness facilities carries inherent risks. Members agree to:
              </p>
              <ul className="list-disc pl-6">
                <li>Accept responsibility for their own safety</li>
                <li>Report any equipment issues to staff immediately</li>
                <li>Not hold the club liable for personal injury or property loss</li>
                <li>Follow proper form and technique guidelines</li>
                <li>Seek medical clearance when necessary</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Club Rules and Etiquette</h2>
            <div className="space-y-4">
              <ul className="list-disc pl-6">
                <li>No unauthorized photography or videography</li>
                <li>Respect other members' personal space and privacy</li>
                <li>Follow posted schedules and class registration procedures</li>
                <li>Maintain appropriate noise levels</li>
                <li>Return equipment to designated areas</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Modifications to Terms</h2>
            <p>
              Jordan Fitness Club reserves the right to modify these terms at any time. Members will be notified of significant changes via email or posted notices within the facility.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Contact Information</h2>
            <div className="bg-gray-100 p-4 rounded">
              <p>For questions about these terms, please contact:</p>
              <p>Email: terms@jordanfitnessclub.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Address: 123 Fitness Avenue, City, State 12345</p>
            </div>
          </section>

          <p className="text-sm text-gray-600">Last Updated: June 14, 2025</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
