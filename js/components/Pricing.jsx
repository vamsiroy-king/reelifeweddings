"use client";

import React, { useRef } from "react";
import NumberFlow from "@number-flow/react";
import { Clock, HardDrive, Film, Zap, User, Camera, Smartphone, CheckCheck, Infinity, Star, Share2, Hash, Layout } from "lucide-react";
import { motion, useInView } from "framer-motion";

const plans = [
  {
    name: "Moments",
    description: "Perfect for intimate celebrations.",
    price: 9999,
    buttonText: "Select Package",
    buttonVariant: "outline",
    packageId: "moments",
    features: [
      { text: "Up to 5 Hours of Shoot", icon: <Clock size={20} /> },
      { text: "Complimentary Raw Footage", icon: <HardDrive size={20} /> },
      { text: "2 Professionally Edited Reels / Event", icon: <Film size={20} /> },
      { text: "1 Same-Day Instant Reel / Event", icon: <Zap size={20} /> },
      { text: "1 Dedicated Reelife Content Creator", icon: <User size={20} /> },
      { text: "Apple iPhone Cinematic Filmmaking", icon: <Camera size={20} /> },
      { text: "Complimentary Mobile Portraits", icon: <Smartphone size={20} /> },
    ],
    includes: [
      "Important Details:",
      "Raw Footage Delivered to Your SSD",
      "Official Reelife Logo is Mandatory",
      "Additional Reels: ₹1,499/Reel",
    ],
  },
  {
    name: "Signature",
    description: "Crafted for elegant wedding storytelling.",
    price: 14999,
    buttonText: "Select Package",
    buttonVariant: "default",
    popular: true,
    packageId: "signature",
    features: [
      { text: "Unlimited Event Coverage", icon: <Infinity size={20} /> },
      { text: "Complimentary Raw Footage", icon: <HardDrive size={20} /> },
      { text: "3 Professionally Edited Reels / Event", icon: <Film size={20} /> },
      { text: "2 Same-Day Instant Reels / Event", icon: <Zap size={20} /> },
      { text: "1 Dedicated Reelife Content Creator", icon: <User size={20} /> },
      { text: "Apple iPhone Cinematic Filmmaking", icon: <Camera size={20} /> },
      { text: "Complimentary Mobile Portraits", icon: <Smartphone size={20} /> },
      { text: "Priority Editing & Delivery", icon: <Star size={20} /> },
      { text: "Share2 Page Setup & Management", icon: <Share2 size={20} /> },
      { text: "Up to 25 Story Uploads", icon: <Layout size={20} /> },
      { text: "Custom Couple Hashtag", icon: <Hash size={20} /> },
    ],
    includes: [
      "Important Details:",
      "Raw Footage Delivered to Your SSD",
      "Official Reelife Logo is Mandatory",
      "Additional Reels: ₹1,299/Reel",
    ],
  },
  {
    name: "Legacy",
    description: "Our most complete wedding content experience.",
    price: 24999,
    buttonText: "Select Package",
    buttonVariant: "outline",
    packageId: "legacy",
    features: [
      { text: "Unlimited Event Coverage", icon: <Infinity size={20} /> },
      { text: "Complimentary Raw Footage", icon: <HardDrive size={20} /> },
      { text: "6 Professionally Edited Reels / Event", icon: <Film size={20} /> },
      { text: "3 Same-Day Instant Reels / Event", icon: <Zap size={20} /> },
      { text: "2 Dedicated Reelife Content Creators", icon: <User size={20} /> },
      { text: "Latest iPhone Pro Series Cinematic", icon: <Camera size={20} /> },
      { text: "Premium Mobile Portraits", icon: <Smartphone size={20} /> },
      { text: "Express Editing & Delivery", icon: <Star size={20} /> },
      { text: "Share2 Page Setup & Management", icon: <Share2 size={20} /> },
      { text: "Unlimited Story Uploads", icon: <Layout size={20} /> },
      { text: "Custom Couple Hashtag", icon: <Hash size={20} /> },
      { text: "Unlimited Share2 Highlights", icon: <Share2 size={20} /> },
    ],
    includes: [
      "Important Details:",
      "Raw Footage Delivered to Your SSD",
      "Official Reelife Logo is Mandatory",
      "Additional Reels: ₹999/Reel",
    ],
  },
];

// Reusable Timeline Content Animation wrapper
const TimelineContent = ({ children, animationNum, delay = 0, className, as: Component = "div" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: (animationNum * 0.2) + delay,
        duration: 0.5,
      },
    },
    hidden: {
      filter: "blur(10px)",
      y: 20,
      opacity: 0,
    },
  };

  const MotionComponent = motion[Component] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

export default function PricingSection() {
  const handleSelectPackage = (packageId) => {
    window.location.href = `contact.html?package=${packageId}`;
  };

  return (
    <div className="px-4 py-24 min-h-screen mx-auto relative bg-[#fbf9f6]" id="pricing">
      <div
        className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0"
        style={{
          backgroundImage: `radial-gradient(circle at center, #206ce8 0%, transparent 70%)`,
          opacity: 0.05, // reduced opacity to blend with the warm white background
          mixBlendMode: "multiply",
        }}
      />

      <div className="text-center mb-12 max-w-3xl mx-auto relative z-10">
        <TimelineContent
          as="h2"
          animationNum={0}
          className="md:text-5xl sm:text-4xl text-3xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Choose the right package for your{" "}
          <span className="border border-dashed border-blue-500 px-3 py-1 rounded-xl bg-blue-50 text-blue-600 capitalize inline-block">
            wedding
          </span>
        </TimelineContent>

        <TimelineContent
          as="p"
          animationNum={1}
          className="sm:text-lg text-base text-gray-600 sm:w-[70%] w-[80%] mx-auto mt-6"
        >
          All packages are priced <strong className="text-gray-900">per event</strong>. Find the perfect fit to beautifully capture your special day.
        </TimelineContent>
      </div>

      <div className="grid md:grid-cols-3 max-w-7xl gap-6 py-6 mx-auto relative z-10">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={3 + index}
          >
            <div
              className={`relative h-full flex flex-col rounded-3xl border ${
                plan.popular ? "ring-2 ring-blue-500 bg-blue-50/50 border-blue-200" : "bg-white border-neutral-200 shadow-sm"
              }`}
            >
              <div className="p-8 pb-0 text-left">
                <div className="flex justify-between items-start">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                    {plan.name}
                  </h3>
                  {plan.popular && (
                    <div className="mt-1">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                        Popular
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-6 min-h-[40px]">{plan.description}</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-gray-900 flex items-center">
                    ₹
                    <NumberFlow
                      value={plan.price}
                      className="text-4xl font-bold ml-1"
                    />
                  </span>
                  <span className="text-gray-500 text-sm font-medium ml-2 uppercase tracking-wide">
                    / EVENT
                  </span>
                </div>
              </div>

              <div className="p-8 pt-0 flex-1 flex flex-col">
                <button
                  onClick={() => handleSelectPackage(plan.packageId)}
                  className={`w-full mb-8 p-4 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                    plan.popular
                      ? "bg-gradient-to-t from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30 border border-blue-400 text-white"
                      : "bg-gray-900 shadow-lg shadow-gray-900/20 border border-gray-800 text-white hover:bg-gray-800"
                  }`}
                >
                  {plan.buttonText}
                </button>
                
                <ul className="space-y-4 font-medium mb-8 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-gray-700 mt-0.5 mr-3 flex-shrink-0">
                        {feature.icon}
                      </span>
                      <span className="text-sm text-gray-700 leading-tight">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-sm text-gray-900 tracking-wide uppercase">
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-3 font-medium">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <span className="h-5 w-5 flex-shrink-0 bg-blue-100 border border-blue-200 rounded-full flex items-center justify-center mt-0.5 mr-3">
                          <CheckCheck className="h-3 w-3 text-blue-600" />
                        </span>
                        <span className="text-sm text-gray-600 leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TimelineContent>
        ))}
      </div>
    </div>
  );
}
