import React from "react";

const CommunityStories = ({ stories }) => {
  // Example fallback stories
  const defaultStories = stories || [
    {
      name: "Green Bites Restaurant",
      role: "Restaurant",
      story:
        "We donated 800+ kg of surplus meals and reduced waste while helping local families.",
      image:
        "https://i.postimg.cc/WzzP5pps/people-meeting-community-center.jpg",
    },
    {
      name: "Helping Hands Charity",
      role: "Charity",
      story:
        "Thanks to generous restaurants, we distributed 5,000+ meals to people in need this year.",
      image:
        "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=600&q=60",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-600 mt-5 rounded-sm">
      <h2 className="text-4xl font-extrabold text-center dark:text-white text-green-700 mb-12">
         Stories from Our Community
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto px-6">
        {defaultStories.map((story, i) => (
          <div
            key={i}
            className=" dark:from-gray-800 dark:to-gray-800 bg-gradient-to-br  from-green-50 to-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={story.image}
              alt={story.name}
              className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{story.name}</h3>
              <span className="text-sm text-green-600 dark:text-green-500 font-medium">
                {story.role}
              </span>
              <p className="text-gray-700 text-lg mt-2 dark:text-white">{story.story}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunityStories;
