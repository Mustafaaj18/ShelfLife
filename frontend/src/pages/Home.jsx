const features = [
  {
    icon: "📚",
    title: "Book collection",
    description: "Keep the library catalogue organized in one place."
  },
  {
    icon: "🔎",
    title: "Find a book",
    description: "Search the collection by title, author, or ISBN."
  },
  {
    icon: "↗",
    title: "Borrowing records",
    description: "Track borrowed books, due dates, and returns."
  }
];

function Home() {
  return (
    <div className="page">
      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">LIBRARY MANAGEMENT SYSTEM</p>
            <h1>Every book has a place. <span>Every story matters.</span></h1>
            <p className="intro">
              Shelf Life is a simple place to organize a library collection,
              find books, and keep track of borrowing activity.
            </p>
            <a className="primary-button" href="#features">Explore Shelf Life <span>→</span></a>
            <p className="status-note"><span className="status-dot"></span> Student project · Library Management System</p>
          </div>
          <div className="hero-art" aria-label="Illustration of books on a shelf">
            <div className="sun"></div>
            <div className="book book-one"></div>
            <div className="book book-two"></div>
            <div className="book book-three"></div>
            <div className="book book-four"></div>
            <div className="shelf"></div>
            <div className="plant">✦</div>
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="section-heading">
            <p className="eyebrow">OUR FEATURES</p>
            <h2>A more organized library</h2>
            <p>Explore the essential tools for managing a library.</p>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <span className="feature-icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div>
            <p className="eyebrow">ABOUT THE PROJECT</p>
            <h2>One simple system for the whole library.</h2>
          </div>
          <p>
            Shelf Life is being developed by a five-member student team.
            The system brings together book management, user accounts,
            and library collection tools in one place.
          </p>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#home"><span className="brand-mark">S</span><span>Shelf Life</span></a>
        <p>Library Management System · COMP229</p>
      </footer>
    </div>
  );
}

export default Home;
