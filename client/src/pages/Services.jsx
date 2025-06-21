import { motion } from "framer-motion";
import { RiHeartPulseFill, RiUserStarFill, RiTeamFill, RiRestartFill, RiScales2Fill, RiShieldStarFill } from 'react-icons/ri';

const Services = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Services</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience premium fitness services designed to transform your health and wellness journey.
            Our comprehensive range of services caters to all fitness levels and goals.
          </p>
        </motion.div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <span className="text-[var(--secondary-color)] text-3xl mb-4 inline-block">
                {service.icon}
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {service.description}
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <RiHeartPulseFill className="text-[var(--secondary-color)]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Premium Services Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-xl text-white mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Premium Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Elevate your fitness experience with our exclusive premium services,
              designed for those who want to achieve exceptional results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {premiumServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white/5 p-6 rounded-lg border border-white/10"
              >
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <p className="text-[var(--secondary-color)]">{service.price}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Service Guarantee */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <span className="text-[var(--secondary-color)] text-4xl mb-4 inline-block">
            <RiShieldStarFill />
          </span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Our Service Guarantee
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We're committed to providing the highest quality fitness services. 
            If you're not completely satisfied with any of our services within the first 30 days, 
            we'll work with you to make it right or provide a full refund.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const services = [
  {
    title: "Fitness Assessment",
    description: "Comprehensive evaluation of your current fitness level and goals.",
    icon: <RiScales2Fill />,
    features: [
      "Body composition analysis",
      "Strength assessment",
      "Cardiovascular fitness test",
      "Flexibility measurement"
    ]
  },
  {
    title: "Personal Training",
    description: "One-on-one coaching tailored to your specific needs and goals.",
    icon: <RiUserStarFill />,
    features: [
      "Customized workout plans",
      "Form correction",
      "Progress tracking",
      "Nutritional guidance"
    ]
  },
  {
    title: "Group Classes",
    description: "Energetic group sessions led by expert instructors.",
    icon: <RiTeamFill />,
    features: [
      "Various class types",
      "All fitness levels",
      "Motivating environment",
      "Schedule flexibility"
    ]
  },
  {
    title: "Recovery Services",
    description: "Specialized services to help you recover and prevent injuries.",
    icon: <RiRestartFill />,
    features: [
      "Massage therapy",
      "Stretching sessions",
      "Recovery equipment",
      "Injury prevention"
    ]
  },
  {
    title: "Nutrition Coaching",
    description: "Expert guidance for optimal nutrition and meal planning.",
    icon: <RiHeartPulseFill />,
    features: [
      "Meal planning",
      "Dietary analysis",
      "Supplement advice",
      "Ongoing support"
    ]
  },
  {
    title: "Fitness Tracking",
    description: "Advanced tracking and monitoring of your fitness progress.",
    icon: <RiHeartPulseFill />,
    features: [
      "Digital tracking app",
      "Progress reports",
      "Goal monitoring",
      "Performance metrics"
    ]
  }
];

const premiumServices = [
  {
    title: "Elite Personal Training",
    description: "Premium one-on-one training with our most experienced trainers, including customized nutrition and recovery plans.",
    price: "From $99/session"
  },
  {
    title: "Lifestyle Transformation",
    description: "Comprehensive 12-week program including training, nutrition, recovery, and lifestyle coaching.",
    price: "From $999/program"
  },
  {
    title: "Corporate Wellness",
    description: "Customized wellness programs for companies, including group classes and health assessments.",
    price: "Custom pricing"
  },
  {
    title: "Sports Performance",
    description: "Specialized training for athletes focusing on sport-specific conditioning and performance.",
    price: "From $129/session"
  }
];

export default Services;
