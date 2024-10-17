import React from "react";
import styles from "./HelpPage.module.css";
import Image from "next/image";

const HelpPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Help Center</h1>

      {/* Section: Introduction */}
      <section className={styles.section}>
        <div className={styles.textContent}>
          <h2 className={styles.sectionTitle}>Introduction</h2>
          <p>
            Welcome to our hand tracking and hand pose detecting website! Our
            platform allows you to play games using simple hand gestures. This
            guide will help you get started and make the most of the experience.
          </p>
        </div>
      </section>

      {/* Section: How to Use Hand Tracking */}
      <section className={styles.section}>
        <div className={styles.textContent}>
          <h2 className={styles.sectionTitle}>How to Use Hand Tracking</h2>
          <p>Follow these steps to enable hand tracking:</p>
          <ol
            style={{
              paddingLeft: "30px",
            }}
          >
            <li>
              Make sure your camera is enabled and allow camera access when
              prompted.
            </li>
            <li>
              Position your hand within the camera’s view in good lighting.
            </li>
            <li>
              Keep your hand at an optimal distance from the camera for better
              tracking.
            </li>
          </ol>
        </div>
      </section>

      {/* Section: Types of Games */}
      <section className={styles.section}>
        <div className={styles.textContent}>
          <h2 className={styles.sectionTitle}>Types of Games</h2>
          <ul>
            <li>
              <strong>Yellow Game Cards:</strong> Normal games without AI
              controls.
              <Image
                src="/img/yellow.jpeg"
                alt="Yellow Game Card"
                style={{
                  minWidth: '80px'
                }}
                width={80}
                height={120}
              />
            </li>
            <li>
              <strong>White Game Cards:</strong> Games with AI controls.
              <Image
                src="/img/white.jpeg"
                alt="White Game Card"
                style={{
                  minWidth: '80px'
                }}
                width={80}
                height={120}
              />
            </li>
          </ul>
        </div>
      </section>

      {/* Section: Supported Hand Poses */}
      <section className={styles.section}>
        <div className={styles.textContent}>
          <h2 className={styles.sectionTitle}>Supported Hand Poses</h2>
          <p>Here are the common hand poses and their functions:</p>
          <div className={styles.gridContainer}>
            {[
              {
                imageUrl: "/img/normal.png",
                description: "Normal",
              },
              {
                imageUrl: "/img/left.png",
                description: "Left",
              },
              {
                imageUrl: "/img/right.png",
                description: "Right",
              },
              {
                imageUrl: "/img/up.png",
                description: "Up",
              },
              {
                imageUrl: "/img/down.png",
                description: "Down",
              },
              {
                imageUrl: "/img/pause.png",
                description: "Pause",
              },
              {
                imageUrl: "/img/restart.png",
                description: "Restart",
              },
            ].map((pose, index) => (
              <div key={index} className={styles.gridItem}>
                <Image
                  src={pose.imageUrl}
                  alt={pose.description}
                  width={150}
                  height={150}
                  style={{
                    maxWidth: "150px",
                    maxHeight: "150px",
                  }}
                />
                <p>{pose.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Troubleshooting */}
      <section className={styles.section}>
        <div className={styles.textContent}>
          <h2 className={styles.sectionTitle}>Troubleshooting</h2>
          <p>Having trouble? Try these tips:</p>
          <ul>
          <li style={{color: 'yellow'}}>
             Try refreshing page. Some games are not supported in mobile.
            </li>
            <li>
              Ensure good lighting and adjust camera settings if tracking is
              inaccurate.
            </li>
            <li>
              Check browser permissions to make sure your camera is enabled.
            </li>
            <li>
              Keep your hand at a reasonable distance from the camera for better
              detection.
            </li>
          </ul>
        </div>
      </section>

      {/* Section: System Requirements */}
      <section className={styles.section}>
        <div className={styles.textContent}>
          <h2 className={styles.sectionTitle}>System Requirements</h2>
          <p>
            For the best experience, ensure you meet the following system
            requirements:
          </p>
          <ul>
            <li>
              Supported Browsers: Chrome, Firefox, Edge other Chromium or modern
              browsers
            </li>
            <li>Camera: Minimum 720p resolution</li>
            <li>Stable internet connection for online games</li>
          </ul>
        </div>
      </section>

      {/* Section: Video Tutorial */}
      <section className={styles.section}>
        <div className={styles.textContent}>
          <h2 className={styles.sectionTitle}>Video Tutorial</h2>
          <p>Watch this quick tutorial to get started:</p>
          <video className={styles.video} controls>
            <source src="/hand-tracking-tutorial.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Section: Contact Support */}
      <section className={styles.section}>
        <div className={styles.textContent}>
          <h2 className={styles.sectionTitle}>Contact Support</h2>
          <p>
            If you’re still facing issues, feel free to reach out to us via our{" "}
            <a href="/about">About Page</a>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;
