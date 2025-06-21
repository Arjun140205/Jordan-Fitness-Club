import { motion } from "framer-motion";
import { RiShieldUserFill, RiLockFill, RiUserSettingsFill, RiGlobalFill } from 'react-icons/ri';

const Privacy = () => {
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Privacy Policy</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Last updated: June 21, 2025
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {privacyHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <span className="text-[var(--secondary-color)] text-3xl mb-4 inline-block">
                  {highlight.icon}
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Information We Collect</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Name and contact information</li>
                <li>Membership and billing information</li>
                <li>Health and fitness goals</li>
                <li>Emergency contact details</li>
                <li>Workout and attendance history</li>
                <li>Device and usage information when you use our website or app</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How We Use Your Information</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide and improve our services</li>
                <li>Process your membership and payments</li>
                <li>Send important updates and notifications</li>
                <li>Personalize your fitness experience</li>
                <li>Ensure the security of your account</li>
                <li>Analyze usage patterns to improve our services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Security</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information, including:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and audits</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
                <li>Incident response procedures</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Rights</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>Under GDPR and other applicable privacy laws, you have the right to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Restrict or object to processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
                <li>Lodge a complaint with supervisory authorities</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cookie Policy</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                We use cookies and similar technologies to enhance your experience and analyze usage patterns.
                You can control cookie preferences through your browser settings.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Updates to This Policy</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400">
              If you have any questions about this Privacy Policy, please contact our Data Protection Officer at{" "}
              <a href="mailto:privacy@jordanfitnessclub.com" className="text-[var(--secondary-color)]">
                privacy@jordanfitnessclub.com
              </a>
            </p>
          </section>
        </motion.div>
      </div>
    </motion.div>
  );
};

const privacyHighlights = [
  {
    title: "Data Protection",
    description: "Your personal data is protected using industry-standard security measures and encryption.",
    icon: <RiShieldUserFill />
  },
  {
    title: "Secure Processing",
    description: "We process your data securely and only for specified, legitimate purposes.",
    icon: <RiLockFill />
  },
  {
    title: "Your Control",
    description: "You have full control over your personal data and can exercise your privacy rights at any time.",
    icon: <RiUserSettingsFill />
  },
  {
    title: "Global Compliance",
    description: "Our privacy practices comply with GDPR and other international privacy laws.",
    icon: <RiGlobalFill />
  }
];

export default Privacy;
