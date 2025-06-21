import { motion } from "framer-motion";
import { RiTeamFill, RiTrophyFill, RiCalendarEventFill, RiHandHeartFill, RiChat3Fill, RiUserHeartFill } from 'react-icons/ri';
import { Link } from "react-router-dom";

const Community = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Community</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join a supportive community of like-minded individuals who share your passion for fitness and wellness.
            Together, we celebrate achievements, support each other, and create lasting friendships.
          </p>
        </motion.div>

        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {communityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <span className="text-[var(--secondary-color)] text-3xl mb-4 inline-block">
                {feature.icon}
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[var(--secondary-color)]/10 p-3 rounded-lg">
                    <RiCalendarEventFill className="text-2xl text-[var(--secondary-color)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{event.date}</span>
                      <span>{event.time}</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Stories */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <div className="mb-4">
                  <RiUserHeartFill className="text-4xl text-[var(--secondary-color)]" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 italic">
                  "{story.quote}"
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {story.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {story.achievement}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Join Community CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-xl text-white"
        >
          <h2 className="text-2xl font-bold mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Become part of a supportive fitness family that celebrates every achievement
            and helps you stay motivated on your fitness journey.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-[var(--secondary-color)] hover:bg-[var(--secondary-color-dark)] rounded-lg font-semibold transition-colors"
          >
            Join Now
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

const communityFeatures = [
  {
    title: "Group Activities",
    description: "Participate in regular group workouts, challenges, and social events that make fitness fun and engaging.",
    icon: <RiTeamFill />
  },
  {
    title: "Challenges & Rewards",
    description: "Join monthly fitness challenges with exciting rewards and recognition for achieving your goals.",
    icon: <RiTrophyFill />
  },
  {
    title: "Support Network",
    description: "Connect with fellow members who share your goals and support each other's fitness journeys.",
    icon: <RiHandHeartFill />
  },
  {
    title: "Community Forums",
    description: "Engage in discussions, share tips, and get advice from our community of fitness enthusiasts.",
    icon: <RiChat3Fill />
  },
  {
    title: "Member Spotlights",
    description: "Get featured in our member spotlights and share your inspiring fitness journey with others.",
    icon: <RiUserHeartFill />
  },
  {
    title: "Social Events",
    description: "Participate in regular social gatherings that help build lasting friendships beyond the gym.",
    icon: <RiCalendarEventFill />
  }
];

const events = [
  {
    title: "Summer Fitness Challenge",
    description: "Join our 6-week transformation challenge with weekly goals and amazing prizes.",
    date: "July 1-Aug 15, 2025",
    time: "Various Times",
    location: "Main Facility"
  },
  {
    title: "Community Workout Day",
    description: "Free group workout sessions followed by healthy refreshments and socializing.",
    date: "June 28, 2025",
    time: "9:00 AM",
    location: "Outdoor Area"
  },
  {
    title: "Nutrition Workshop",
    description: "Learn about proper nutrition and meal planning from our expert nutritionists.",
    date: "July 5, 2025",
    time: "2:00 PM",
    location: "Workshop Room"
  },
  {
    title: "Charity Fun Run",
    description: "5K fun run/walk supporting local health initiatives. All fitness levels welcome.",
    date: "July 12, 2025",
    time: "8:00 AM",
    location: "City Park"
  }
];

const successStories = [
  {
    name: "Sarah Johnson",
    quote: "The community here has been instrumental in my fitness journey. I've lost 30 pounds and gained lifelong friends!",
    achievement: "Lost 30 lbs in 6 months"
  },
  {
    name: "Mike Thompson",
    quote: "From barely being able to run a mile to completing my first marathon. The support here is incredible!",
    achievement: "Completed first marathon"
  },
  {
    name: "Lisa Chen",
    quote: "The positive environment and encouragement from fellow members helped me achieve my strength goals.",
    achievement: "Doubled strength goals"
  }
];

export default Community;
