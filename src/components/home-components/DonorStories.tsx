import { User } from "lucide-react";
import React from "react";

const DonorStories = () => {
  const stories = [
    {
      name: "Ayesha K.",
      story:
        "I donated blood for the first time last year. Knowing I helped someone in need was the best feeling ever!",
      city: "Dhaka",
    },
    {
      name: "Ali R.",
      story:
        "My father needed blood urgently. Thanks to donors, he recovered. Now I donate every 3 months.",
      city: "Chittagong",
    },
    {
      name: "Sara M.",
      story:
        "Blood donation camps at my university made it easy to give back. I encourage all my friends to join!",
      city: "Chittagong",
    },
  ];
  return (
    <section className="py-10 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">
          Recent Donor Stories
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((s, i) => (
            <div
              key={i}
              className="bg-red-50 rounded-lg shadow p-6 flex flex-col items-center"
            >
              <User className="h-10 w-10 text-red-400 mb-2" />
              <blockquote className="italic text-gray-700 mb-4">
                “{s.story}”
              </blockquote>
              <div className="font-semibold text-red-700">{s.name}</div>
              <div className="text-sm text-gray-500">{s.city}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonorStories;
