"use client";

import React, { useState } from "react";
import Head from "next/head";
import "./style.css";

interface Feedback {
  name: string;
  email: string;
  feedback: string;
}

const AboutPage: React.FC = () => {
  const [formData, setFormData] = useState<Feedback>({
    name: "",
    email: "",
    feedback: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/feedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      alert("Feedback submitted successfully!");
      setFormData({ name: "", email: "", feedback: "" }); // Clear form after success
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred while submitting your feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>About Us</title>
      </Head>
      <div className="flex">
        {/* Left Side: About Content and Contact Information */}
        <div className="left-side">
          <h2 className="title" style={{ textAlign: "center" }}>
            About Us
          </h2>
          <p style={{ textAlign: "justify" }}>
            Welcome to our website! We are a team of students from Shree
            Mahendra Adarsha School and Capital Secondary School, passionate
            about practicing Artificial Intelligence  <br />
            <br /> Our platform is dedicated to offering a unique collection of
            games that can be played using hand gestures, providing an
            innovative, immersive experience for players of all ages. As young
            developers, we aim to push the boundaries of gaming by introducing
            gesture-based gameplay, making it not only interactive but also
            accessible to everyone without the need for controllers or complex
            equipment. All you need is a camera and your hands to dive into our
            exciting world of games! Our mission is to make gaming more fun,
            intuitive, and forward-thinking. <br />
            <br /> We continuously update our collection and strive to improve
            the user experience, ensuring that there’s always something new and
            exciting to explore. <br />
            <br /> Thank you for visiting our site—we hope you enjoy playing as
            much as we enjoy creating!
          </p>
          <div className="cont" style={{ textAlign: "center" }}>
            <h2 style={{ marginTop: "2rem" }}>Contact Information</h2>
            <p>
              Email:{" "}
              <a href="mailto:nepaliai108@gmail.com" className="text-blue">
                nepaliai108@gmail.com
              </a>
            </p>
            <p>
              Whatsapp: <span className="text-blue">+977 9704390917</span>
            </p>
          </div>
        </div>

        {/* Right Side: Feedback Form */}
        <div className="feedback-form" style={{ padding: "20px" }}>
          <h2 style={{ textAlign: "center" }}>Submit Your Feedback</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">
                Name:
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label htmlFor="email">
                Contact:
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label htmlFor="feedback">
                Feedback:
                <textarea
                  id="feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </label>
            </div>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
