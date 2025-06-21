import { motion } from "framer-motion";
import { RiShieldCheckFill, RiTimeFill, RiMoneyDollarCircleFill, RiUserSettingsFill } from 'react-icons/ri';

const Terms = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-20 px-4"
    >
      <div className="max-w-[var(--max-width)] mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="prose dark:prose-invert max-w-none"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Last updated: June 21, 2025
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {keyPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <span className="text-[var(--secondary-color)] text-3xl mb-4 inline-block">
                  {point.icon}
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {point.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Membership Terms</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>By becoming a member of Jordan Fitness Club, you agree to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Follow all gym rules and regulations</li>
                <li>Respect other members and staff</li>
                <li>Use equipment properly and safely</li>
                <li>Maintain current payment information</li>
                <li>Provide accurate personal information</li>
                <li>Comply with health and safety protocols</li>
                <li>Not share membership credentials</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Payment and Cancellation</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>Members understand and agree that:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Monthly membership fees are due on the specified billing date</li>
                <li>A 30-day notice is required for membership cancellation</li>
                <li>No refunds will be issued for unused membership time</li>
                <li>Late payment fees may apply for overdue payments</li>
                <li>Membership fees may be subject to annual increases</li>
                <li>Initial membership term is minimum 3 months</li>
                <li>Early termination fees may apply</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Liability and Waiver</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Members acknowledge that exercise and use of fitness equipment carry inherent risks. 
                Jordan Fitness Club is not liable for any injury or damage that may occur during 
                the use of our facilities or participation in our programs, except where caused by 
                our gross negligence.
              </p>
              <p>
                Members are required to:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Consult with healthcare providers before starting any exercise program</li>
                <li>Report any equipment malfunctions immediately</li>
                <li>Use equipment as instructed</li>
                <li>Report any injuries to staff immediately</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Facility Rules</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>Members must:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Wear appropriate athletic attire and footwear</li>
                <li>Wipe down equipment after use</li>
                <li>Return weights and equipment to designated areas</li>
                <li>Respect facility hours of operation</li>
                <li>Follow any posted safety guidelines</li>
                <li>Maintain personal hygiene</li>
                <li>Use lockers only during workout sessions</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Electronic Communications</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                By using our services, you consent to receive communications from us electronically, 
                including emails, texts, and push notifications. You can opt out of marketing 
                communications while continuing to receive essential service updates.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Modifications</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Jordan Fitness Club reserves the right to modify these terms at any time. 
                Members will be notified of any changes through email or posted notices 
                within the facility. Continued use of our services after such modifications 
                constitutes acceptance of the updated terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
            <p className="text-gray-600 dark:text-gray-400">
              For questions about these terms, please contact us at{" "}
              <a
                href="mailto:terms@jordanfitnessclub.com"
                className="text-[var(--secondary-color)]"
              >
                terms@jordanfitnessclub.com
              </a>
            </p>
          </section>
        </motion.div>
      </div>
    </motion.div>
  );
};

const keyPoints = [
  {
    title: "Member Safety",
    description: "Your safety is our priority. We maintain strict safety protocols and equipment maintenance standards.",
    icon: <RiShieldCheckFill />
  },
  {
    title: "Flexible Access",
    description: "24/7 access to facilities with your membership, subject to terms and conditions.",
    icon: <RiTimeFill />
  },
  {
    title: "Fair Billing",
    description: "Transparent pricing with no hidden fees. Clear cancellation and refund policies.",
    icon: <RiMoneyDollarCircleFill />
  },
  {
    title: "Member Rights",
    description: "Clear outline of member rights, responsibilities, and dispute resolution procedures.",
    icon: <RiUserSettingsFill />
  }
];

export default Terms;
