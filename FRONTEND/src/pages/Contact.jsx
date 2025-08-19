import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="px-4 md:px-20">

      <div className="text-center text-3xl pt-10 text-green-700 font-semibold">
        <h2>CONTACT <span className="text-gray-800">US</span></h2>
      </div>

      <div className="flex flex-col md:flex-row my-12 gap-12 items-center mb-28 text-base text-gray-600">
        <img
          className="w-full md:max-w-[360px] rounded-2xl shadow-md"
          src={assets.contact_image}
          alt="Contact Bio Remedies"
        />

        <div className="flex flex-col gap-6 md:w-2/3 leading-relaxed">
          <div>
            <p className="text-lg font-semibold text-gray-800">OUR WELLNESS HUB</p>
            <p className="mt-2">
              234 Herbal Way, Green District<br />
              Bengaluru, India – 560001
            </p>
            <p className="mt-2">
              Phone: +91 98765 43210<br />
              Email: hello@bionaturecare.in
            </p>
          </div>

          <div>
            <p className="text-lg font-semibold text-gray-800">JOIN OUR JOURNEY</p>
            <p className="mt-2">
              We're always looking for passionate individuals who believe in holistic healing. Come be a part of the natural wellness revolution.
            </p>
            <button className="mt-4 bg-btn hover:bg-lime-800 text-white px-6 py-2 rounded-b-md transition-all duration-300">
              Explore Careers
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;
