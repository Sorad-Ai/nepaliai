'use client';
import React from "react";
import Head from "next/head";
import './style.css';

const AboutPage: React.FC = () => {
  return (
    <div className="container">
      <Head>
        <title>Privacy Policy & Terms of Service</title>
      </Head>
      <div className="flex">
        {/* Left Side: Privacy Policy */}
        <div className="left-side">
          <h2 style={{ textAlign: 'center'}}>Privacy Policy</h2>
          <p className="max-width-2xl" style={{ textAlign: 'justify' }}>
            Your privacy is important to us. We are committed to protecting your personal information and your right to privacy. This privacy policy explains what information we collect, how we use it, and your rights regarding your data.
          </p>
          {/* Add more content for Privacy Policy here */}
        </div>

        {/* Right Side: Terms of Service */}
        <div className="terms-of-service">
          <h2 style={{ textAlign: 'center' }}>Terms of Service</h2>
          <p style={{ textAlign: 'justify' }}>
            By using our services, you agree to comply with our terms and conditions. Please read these terms carefully before using our platform.
          </p>
          {/* Add more content for Terms of Service here */}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
