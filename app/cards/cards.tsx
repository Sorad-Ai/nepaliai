'use client';
import React, { useEffect, useState, useRef } from "react";
import "./card-Style.css"; // Import the CSS file with updated styles
import gamesData from "@/app/data/games.json"; // Adjust the path based on your folder structure
import Link from "next/link";
import Image from "next/image";

interface Card {
  sn: number;
  title: string;
  img: string;
  description: string;
  keywords: string[];
  link: string; // Assuming this is the base URL (game.c)
  short: string; // Add this line
  view: number;
  isAi: boolean; // Ensure this property exists in your Card interface
}


const Cards: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const observer = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const cardsPerPage = 20;

  // Initially, set the sorted cards based on view count
  useEffect(() => {
    const sortedData = [...gamesData].sort((a, b) => b.view - a.view); // Sort by views in descending order
    setVisibleCards(sortedData.slice(0, cardsPerPage));
    setPage(1); // Initialize to page 1
  }, []);

  useEffect(() => {
    if (loading) {
      const newPage = page + 1;
      const start = newPage * cardsPerPage;
      const end = start + cardsPerPage;

      setTimeout(() => {
        const sortedData = [...gamesData].sort((a, b) => b.view - a.view);
        setVisibleCards((prevCards) => [
          ...prevCards,
          ...sortedData.slice(start, end),
        ]);
        setLoading(false);
        setPage(newPage);
      }, 100); // Slight delay to simulate loading
    }
  }, [loading]);

  // Intersection Observer to trigger loading more cards when scrolling
  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true); // Trigger loading more cards
        }
      },
      {
        rootMargin: "20px",
        threshold: 1.0,
      }
    );

    if (loaderRef.current) observer.current.observe(loaderRef.current);

    return () => observer.current?.disconnect();
  }, [loading]);

  // Skeleton loading when waiting for more cards
  const renderSkeletonCards = () => {
    return new Array(cardsPerPage).fill(null).map((_, index) => (
      <div key={index} className="card-div skeleton-card">
        <div className="skeleton-img"></div>
        <div className="skeleton-title"></div>
      </div>
    ));
  };

  const handleCardClick = async (sn: number) => {
    try {
      const response = await fetch("/api/updateView", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sn }),
      });

      if (!response.ok) {
        throw new Error("Failed to update view count");
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  };

  return (
    <div className="card-cont">
      {visibleCards.map((card) => (
        <Link
          key={card.sn}
          href={`${card.link}?src=${card.short}`} // Adjusted href here
          className="card-div"
          onClick={() => handleCardClick(card.sn)}
        >
          <Image
            className="card-img"
            src={card.img}
            alt={card.title}
            width={500} // Provide a width for the image
            height={300} // Provide a height for the image
          />
          <h3
            className="card-title"
            style={{
              fontSize: "15px",
              color: card.isAi ? "white" : "yellow", // Change color based on isAi
            }}
          >
            {card.title}
          </h3>
        </Link>
      ))}
  
      {/* Skeleton loader while waiting for more cards */}
      {loading && visibleCards.length >= cardsPerPage && renderSkeletonCards()}
  
      <div ref={loaderRef} className="loading-placeholder"></div>
    </div>
  );
  
};

export default Cards;
