import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="px-4 md:px-20">

      <div className="text-center text-3xl pt-10 text-green-700 font-semibold">
        <p>ABOUT <span className="text-gray-800">US</span></p>
      </div>

      <div className="flex my-12 flex-col md:flex-row items-center gap-12">
        <img className="w-full md:max-w-[360px] rounded-2xl shadow-md" src={assets.about_image} alt="About Bio Remedies" />

        <div className="flex flex-col justify-center gap-6 md:w-2/3 text-base text-gray-600 leading-relaxed">
          <p>
            Our platform bridges traditional wellness with modern access. We specialize in connecting users to trusted practitioners in bio remedies — including Ayurveda, naturopathy, herbal medicine, and holistic therapies. With user-friendly tools and verified expert listings, we help people explore safe, natural paths to better health.
          </p>
          <p>
            Every remedy we support is backed by tradition, verified knowledge, and user feedback. You can browse remedies, practitioner profiles, availability, and reviews all in one place. Our goal is to promote balance, healing, and mindful living through nature-powered care.
          </p>

          <b className="text-gray-800 text-lg">Our Vision</b>

          <p>
            We’re committed to redefining wellness by putting natural health within reach. Our experts are deeply rooted in ancient healing systems, certified in their fields, and chosen for their integrity and compassion. We aim to build trust and transparency in alternative medicine through education and accessibility.
          </p>
        </div>
      </div>

      <div className="text-2xl font-semibold text-center mb-8 text-green-700">
        WHY <span className="text-gray-800">CHOOSE US</span>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-20">
        <div className="border-t-4 border-lime-900 p-8 rounded-b-3xl hover:bg-lime-700 hover:text-white transition-all duration-300 cursor-pointer shadow-sm">
          <b className="text-lg">Natural & Safe</b>
          <p className="mt-2">We prioritize plant-based and holistic remedies that support the body’s own healing processes without harsh side effects.</p>
        </div>
        <div className="border-t-4 border-lime-900 p-8 rounded-b-3xl hover:bg-lime-700 hover:text-white transition-all duration-300 cursor-pointer shadow-sm">
          <b className="text-lg">Trusted Experts</b>
          <p className="mt-2">Our specialists in Ayurveda, herbal therapy, and naturopathy are thoroughly vetted for credibility and experience.</p>
        </div>
        <div className="border-t-4 border-lime-900 p-8 rounded-b-3xl hover:bg-lime-700 hover:text-white transition-all duration-300 cursor-pointer shadow-sm">
          <b className="text-lg">Personalized Care</b>
          <p className="mt-2">We tailor recommendations to your body type, lifestyle, and health goals — because one solution doesn't fit all.</p>
        </div>
      </div>

    </div>
  );
};

export default About;
