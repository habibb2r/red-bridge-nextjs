
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Droplets, HeartPulse } from 'lucide-react';

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    {
      q: "Who can donate blood?",
      a: "Most healthy people aged 18-65 can donate. There are some restrictions for certain medical conditions or medications.",
      icon: <Droplets className="h-5 w-5 text-red-500 mr-2 inline" />,
    },
    {
      q: "How often can I donate?",
      a: "You can donate whole blood every 3 months. Platelet and plasma donation intervals may differ.",
      icon: <ChevronDown className="h-5 w-5 text-blue-500 mr-2 inline" />,
    },
    {
      q: "Is blood donation safe?",
      a: "Yes! All equipment is sterile and single-use. You cannot get any disease from donating blood.",
      icon: <HeartPulse className="h-5 w-5 text-green-500 mr-2 inline" />,
    },
    {
      q: "How long does it take?",
      a: "The whole process takes about 30-45 minutes, but the actual donation is usually less than 10 minutes.",
      icon: <ChevronDown className="h-5 w-5 text-yellow-500 mr-2 inline" />,
    },
    {
      q: "What should I do before donating?",
      a: "Eat a healthy meal, drink plenty of water, and bring your ID. Avoid fatty foods and get a good night’s sleep.",
      icon: <ChevronDown className="h-5 w-5 text-purple-500 mr-2 inline" />,
    },
    {
      q: "What is platelet donation?",
      a: "Platelet donation is a process where only platelets are collected from your blood using a machine, and the rest is returned to you. Platelets are vital for cancer patients and those with bleeding disorders.",
      icon: <Droplets className="h-5 w-5 text-orange-500 mr-2 inline" />,
    },
    {
      q: "What is plasma donation?",
      a: "Plasma is the liquid part of blood. Plasma donation helps patients with burns, trauma, and clotting disorders. The process is similar to platelet donation.",
      icon: <Droplets className="h-5 w-5 text-cyan-500 mr-2 inline" />,
    },
    {
      q: "Are there health effects from donating blood?",
      a: "Blood donation is safe for healthy adults. It may help balance iron levels and has no long-term negative effects. You might feel tired for a day, so rest and hydrate after donating.",
      icon: <HeartPulse className="h-5 w-5 text-pink-500 mr-2 inline" />,
    },
  ];
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">
          Blood Donation FAQs
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded shadow p-4 transition-all duration-300">
              <button
                className={`w-full text-left font-semibold text-lg text-red-700 flex justify-between items-center focus:outline-none ${open === i ? 'bg-red-50' : ''}`}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span>{faq.icon}{faq.q}</span>
                {open === i ? (
                  <ChevronUp className="h-5 w-5 text-red-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>
              <div
                id={`faq-answer-${i}`}
                className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                style={{}}
              >
                <div className="text-gray-700 border-t pt-2">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
