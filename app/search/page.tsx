'use client';

import React, { useEffect, useState, useRef, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import './search-Style.css';
import gamesData from '@/app/data/games.json';
import Link from 'next/link';
import Image from 'next/image';

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

const SearchComponent: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleCards, setVisibleCards] = useState<Card[]>([]);
  const [page, setPage] = useState<number>(1);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const CARDS_PER_PAGE = 10;

  useEffect(() => {
    if (query) {
      const filteredData = gamesData
        .filter((card) =>
          card.title.toLowerCase().includes(query.toLowerCase()) ||
          card.keywords.some((keyword) =>
            keyword.toLowerCase().includes(query.toLowerCase())
          )
        )
        .sort((a, b) => b.view - a.view);

      setFilteredCards(filteredData);
      setVisibleCards(filteredData.slice(0, CARDS_PER_PAGE));
    } else {
      setFilteredCards([]);
      setVisibleCards([]);
    }

    setLoading(false);
  }, [query]);

  const loadMoreCards = () => {
    const nextPage = page + 1;
    const newVisibleCards = filteredCards.slice(0, nextPage * CARDS_PER_PAGE);
    setVisibleCards(newVisibleCards);
    setPage(nextPage);
  };

  const lastCardRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && visibleCards.length < filteredCards.length) {
          loadMoreCards();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, visibleCards, filteredCards, loadMoreCards]
  );

  const handleLinkClick = async (sn: number) => {
    try {
      const response = await fetch('/api/updateView', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sn }),
      });

      if (!response.ok) {
        console.error('Failed to update view count:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating view count:', error);
    }
  };

  const renderSkeletonCards = () => {
    return new Array(CARDS_PER_PAGE).fill(null).map((_, index) => (
      <div key={index} className="div-car skeleton-card">
        <div className="skeleton-img"></div>
        <div className="skeleton-title"></div>
      </div>
    ));
  };

  return (
    <div className="search-container">
      <h2 style={{ justifyContent: 'center', display: 'flex' }}>
        Search Results for: &quot;{query}&quot;
      </h2>
      <div className="card-cont">
        {loading ? (
          renderSkeletonCards()
        ) : visibleCards.length > 0 ? (
          visibleCards.map((card, index) => {
            const cardElement = (
              <Link
                key={card.sn}
                href={`${card.link}?src=${card.short}`} // Adjusted href here
                className="card-div"
                onClick={() => handleLinkClick(card.sn)}
              >
                <Image
                  className="card-img"
                  src={card.img}
                  alt={card.title}
                  width={300}
                  height={200}
                />
                <h3
                  className="card-title"
                  style={{
                    fontSize: '15px',
                    color: card.isAi ? 'white' : 'yellow', // Conditional color change
                  }}
                >
                  {card.title}
                </h3>
              </Link>
            );

            if (index === visibleCards.length - 1) {
              return (
                <div key={card.sn} ref={lastCardRef}>
                  {cardElement}
                </div>
              );
            }

            return (
              <div key={card.sn} style={{ height: '150px' }}>
                {cardElement}
              </div>
            );
          })
        ) : (
          <p>No results found for &quot;{query}&quot;.</p>
        )}
      </div>
    </div>
  );
};

const SearchPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchComponent />
    </Suspense>
  );
};

export default SearchPage;
