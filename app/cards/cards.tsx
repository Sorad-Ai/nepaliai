const Cards: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Start with true to show skeletons on first load
  const [page, setPage] = useState<number>(0);
  const observer = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const cardsPerPage = 20;

  // Initially, set the sorted cards based on view count
  useEffect(() => {
    setLoading(true); // Show loading animation
    const sortedData = [...gamesData].sort((a, b) => b.view - a.view); // Sort by views in descending order
    setTimeout(() => {
      setVisibleCards(sortedData.slice(0, cardsPerPage));
      setLoading(false); // Hide loading animation after cards are loaded
      setPage(1); // Initialize to page 1
    }, 1000); // Simulating delay for the first load
  }, []);

  useEffect(() => {
    if (loading && page > 0) {
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
      }, 1000); // Slight delay to simulate loading
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

  return (
    <div className="card-cont">
      {loading && visibleCards.length === 0 ? ( // Show skeleton only if the initial load is happening
        renderSkeletonCards()
      ) : (
        visibleCards.map((card) => (
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
        ))
      )}

      {/* Skeleton loader while waiting for more cards */}
      {loading && visibleCards.length >= cardsPerPage && renderSkeletonCards()}

      <div ref={loaderRef} className="loading-placeholder"></div>
    </div>
  );
};
