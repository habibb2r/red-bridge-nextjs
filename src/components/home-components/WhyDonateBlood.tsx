import { Droplets, Heart, Users } from "lucide-react";

const WhyDonateBlood = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4 text-center text-black">
        <h2 className="text-3xl font-bold  mb-6">
          Why Donate Blood?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <Heart className="h-10 w-10 text-red-500 mb-2" />
            <h3 className="font-semibold text-lg mb-2">Save Lives</h3>
            <p>
              Every donation can save up to 3 lives. Blood is always in demand
              for emergencies, surgeries, and cancer treatments.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <Droplets className="h-10 w-10 text-blue-500 mb-2" />
            <h3 className="font-semibold text-lg mb-2">Health Benefits</h3>
            <p>
              Regular donation helps maintain healthy iron levels and may reduce
              risk of heart disease for some people.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <Users className="h-10 w-10 text-emerald-500 mb-2" />
            <h3 className="font-semibold text-lg mb-2">Community Impact</h3>
            <p>
              Donating blood brings communities together and supports local
              hospitals and patients in need.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <a
            href="#"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded shadow transition"
          >
            Become a Donor Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyDonateBlood;
