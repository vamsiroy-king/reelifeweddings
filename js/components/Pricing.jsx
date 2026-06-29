"use client";

import React, { useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import { Clock, HardDrive, Film, Zap, User, Camera, Smartphone, CheckCheck, Infinity, Star, Share2, Hash, Layout, Briefcase, Database, Server } from "lucide-react";
import { motion, useInView } from "framer-motion";

const plans = [
  {
    name: "Moments",
    description: "Perfect for intimate celebrations.",
    price: 9999,
    yearlyPrice: 7999,
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
    yearlyPrice: 11999,
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
      { text: "Instagram Page Setup & Management", icon: <Share2 size={20} /> },
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
    yearlyPrice: 19999,
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
      { text: "Instagram Page Setup & Management", icon: <Share2 size={20} /> },
      { text: "Unlimited Story Uploads", icon: <Layout size={20} /> },
      { text: "Custom Couple Hashtag", icon: <Hash size={20} /> },
      { text: "Unlimited Instagram Highlights", icon: <Share2 size={20} /> },
    ],
    includes: [
      "Important Details:",
      "Raw Footage Delivered to Your SSD",
      "Official Reelife Logo is Mandatory",
      "Additional Reels: ₹999/Reel",
    ],
  },
];

// Reusable Components to match the user's `@/components/ui/` exactly
const Card = ({ className, children }) => (
  <div className={`rounded-xl border ${className}`}>{children}</div>
);
const CardHeader = ({ className, children }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);
const CardContent = ({ className, children }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const TimelineContent = ({ children, animationNum, customVariants, className, as: Component = "div", timelineRef }) => {
  const isInView = useInView(timelineRef, { once: true, margin: "-50px" });

  const MotionComponent = motion[Component] || motion.div;

  return (
    <MotionComponent
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customVariants}
      custom={animationNum}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

const PricingSwitch = ({ onSwitch }) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-50 mx-auto flex w-fit rounded-full bg-neutral-50 border border-gray-200 p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={`relative z-10 w-fit sm:h-12 h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors ${
            selected === "0"
              ? "text-white"
              : "text-muted-foreground hover:text-black"
          }`}
        >
          {selected === "0" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 sm:h-12 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 via-blue-400 to-blue-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">1 Event</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={`relative z-10 w-fit sm:h-12 h-8 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors ${
            selected === "1"
              ? "text-white"
              : "text-muted-foreground hover:text-black"
          }`}
        >
          {selected === "1" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 sm:h-12 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 via-blue-400 to-blue-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">
            2+ Events
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-black">
              Save 20%
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef(null);

  const revealVariants = {
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const togglePricingPeriod = (value) =>
    setIsYearly(parseInt(value) === 1);

  const handleSelectPackage = (packageId) => {
    window.location.href = `contact.html?package=${packageId}`;
  };

  return (
    <div className="px-4 pt-20 min-h-screen mx-auto relative bg-neutral-100" ref={pricingRef} id="pricing">
      <div
        className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at center, #206ce8 0%, transparent 70%)
      `,
          opacity: 0.6,
          mixBlendMode: "multiply",
        }}
      />

      <div className="text-center mb-6 max-w-3xl mx-auto relative z-10">
        <TimelineContent
          as="h2"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="md:text-6xl sm:text-4xl text-3xl font-medium text-gray-900 mb-4"
        >
          Plans that works best for your{" "}
          <TimelineContent
            as="span"
            animationNum={1}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="border border-dashed border-blue-500 px-2 py-1 rounded-xl bg-blue-100 capitalize inline-block"
          >
            wedding
          </TimelineContent>
        </TimelineContent>

        <TimelineContent
          as="p"
          animationNum={2}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="sm:text-base text-sm text-gray-600 sm:w-[70%] w-[80%] mx-auto mt-6"
        >
          Trusted by millions, We help teams all around the world, Explore which option is right for you.
        </TimelineContent>
      </div>

      <TimelineContent
        as="div"
        animationNum={3}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="relative z-10"
      >
        <PricingSwitch onSwitch={togglePricingPeriod} />
      </TimelineContent>

      <div className="grid md:grid-cols-3 max-w-7xl gap-4 py-6 mx-auto relative z-10">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={4 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
          >
            <Card
              className={`relative border-neutral-200 ${
                plan.popular ? "ring-2 ring-blue-500 bg-blue-50" : "bg-white "
              }`}
            >
              <CardHeader className="text-left">
                <div className="flex justify-between">
                  <h3 className="text-3xl font-semibold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  {plan.popular && (
                    <div className="">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Popular
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4 h-[40px]">{plan.description}</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-semibold text-gray-900">
                    ₹
                    <NumberFlow
                      value={isYearly ? plan.yearlyPrice : plan.price}
                      className="text-4xl font-semibold ml-1"
                    />
                  </span>
                  <span className="text-gray-600 ml-1">
                    /{isYearly ? "event" : "event"}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <button
                  onClick={() => handleSelectPackage(plan.packageId)}
                  className={`w-full mb-6 p-4 text-xl rounded-xl ${
                    plan.popular
                      ? "bg-gradient-to-t from-blue-500 to-blue-600 shadow-lg shadow-blue-500 border border-blue-400 text-white"
                      : plan.buttonVariant === "outline"
                        ? "bg-gradient-to-t from-neutral-900 to-neutral-600 shadow-lg shadow-neutral-900 border border-neutral-700 text-white"
                        : ""
                  }`}
                >
                  {plan.buttonText}
                </button>
                <ul className="space-y-2 font-semibold py-5">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-neutral-800 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                        {feature.icon}
                      </span>
                      <span className="text-sm text-gray-600">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 pt-4 border-t border-neutral-200">
                  <h4 className="font-medium text-base text-gray-900 mb-3">
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-2 font-semibold">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <span className="h-6 w-6 bg-green-50 border border-blue-500 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                          <CheckCheck className="h-4 w-4 text-blue-500" />
                        </span>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>
    </div>
  );
}
