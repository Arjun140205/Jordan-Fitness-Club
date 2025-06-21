import { motion } from "framer-motion";
import { RiMapPin2Fill, RiPhoneFill, RiMailFill, RiTimeFill, RiCustomerService2Fill, RiQuestionFill } from 'react-icons/ri';
import FormInput from "../components/FormInput";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    reason: "general" // new field for contact reason
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "", reason: "general" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions about our services or need support? We're here to help!
            Reach out to us through any of the following channels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Contact Information */}
            <div className="space-y-8 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <span className="text-[var(--secondary-color)] text-2xl mt-1">
                    {info.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {info.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {info.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Business Hours
              </h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-400">
                <p className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>5:00 AM - 11:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday - Sunday:</span>
                  <span>6:00 AM - 10:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Holidays:</span>
                  <span>8:00 AM - 8:00 PM</span>
                </p>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Help
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickHelp.map((item, index) => (
                  <motion.a
                    key={item.title}
                    href={item.link}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <span className="text-[var(--secondary-color)]">{item.icon}</span>
                    <span className="text-gray-900 dark:text-white">{item.title}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Send us a Message</h3>
              
              <FormInput
                label="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Reason for Contact
                </label>
                <select
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--secondary-color)] outline-none transition-colors"
                >
                  <option value="general">General Inquiry</option>
                  <option value="membership">Membership Questions</option>
                  <option value="training">Personal Training</option>
                  <option value="feedback">Feedback</option>
                  <option value="support">Technical Support</option>
                </select>
              </div>

              <FormInput
                label="Subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--secondary-color)] outline-none transition-colors"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 text-white bg-[var(--secondary-color)] hover:bg-[var(--secondary-color-dark)] rounded-lg font-semibold transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const contactInfo = [
  {
    title: "Location",
    details: "123 Fitness Avenue, Workout District, Exercise City, 12345",
    icon: <RiMapPin2Fill />
  },
  {
    title: "Phone",
    details: "+1 (555) 123-4567",
    icon: <RiPhoneFill />
  },
  {
    title: "Email",
    details: "info@jordanfitnessclub.com",
    icon: <RiMailFill />
  }
];

const quickHelp = [
  {
    title: "FAQs",
    icon: <RiQuestionFill />,
    link: "/faq"
  },
  {
    title: "Member Support",
    icon: <RiCustomerService2Fill />,
    link: "/support"
  },
  {
    title: "Class Schedule",
    icon: <RiTimeFill />,
    link: "/schedule"
  },
  {
    title: "Book a Tour",
    icon: <RiMapPin2Fill />,
    link: "/book-tour"
  }
];

export default Contact;
