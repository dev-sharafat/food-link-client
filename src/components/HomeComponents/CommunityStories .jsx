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
        "https://images.unsplash.com/photo-1555992336-03a23c2b9d8b?auto=format&fit=crop&w=600&q=60",
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
    <section className="py-16 bg-white">
      <h2 className="text-4xl font-extrabold text-center text-green-700 mb-12">
        ❤️ Stories from Our Community
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto px-6">
        {defaultStories.map((story, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-green-50 to-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={story.image}
              alt={story.name}
              className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900">{story.name}</h3>
              <span className="text-sm text-green-600 font-medium">
                {story.role}
              </span>
              <p className="text-gray-700 text-lg mt-2">{story.story}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunityStories;
