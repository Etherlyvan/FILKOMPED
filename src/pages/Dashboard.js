import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';
import BookCard from '../components/BookCard';

/**
 * Dashboard component with inline styling
 * Features 3-column grid layout with elongated book cards
 * 
 * @returns {JSX.Element} - Rendered component
 */
const Dashboard = () => {
  // Inline styles using JavaScript objects
  const styles = {
    dashboard: {
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    },
    dashboardContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    },
    bookSection: {
      marginBottom: '40px'
    },
    sectionTitle: {
      fontSize: '24px',
      marginBottom: '20px',
      position: 'relative',
      paddingBottom: '10px',
      color: '#333',
      fontWeight: '600'
    },
    titleAfter: {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '50px',
      height: '3px',
      backgroundColor: '#1a1a1a'
    },
    bookGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)', // Exactly 3 columns
      gap: '24px',
      marginTop: '24px'
    },
    // Media query styles need to be applied via JavaScript in this approach
    '@media (max-width: 992px)': {
      bookGrid: {
        gridTemplateColumns: 'repeat(2, 1fr)'
      }
    },
    '@media (max-width: 640px)': {
      bookGrid: {
        gridTemplateColumns: '1fr'
      }
    }
  };

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Sample book data - In production, this would come from an API
  const BOOKS = [
    {
      id: 1,
      title: 'Androids : The Team that Built the Android Operating System',
      author: 'Haase, Chet',
      year: '2014',
      price: 100000,
      rating: 4,
      coverImage: '/assets/books/android-book.jpg'
    },
    {
      id: 2,
      title: 'Professional Android Application Development',
      author: 'Meier, Reto',
      year: '2018',
      price: 125000,
      rating: 5,
      coverImage: '/assets/books/android-book.jpg'
    },
    {
      id: 3,
      title: 'Android Programming: The Big Nerd Ranch Guide',
      author: 'Phillips, Bill',
      year: '2019',
      price: 115000,
      rating: 4,
      coverImage: '/assets/books/android-book.jpg'
    },
    {
      id: 4,
      title: 'Head First Android Development',
      author: 'Griffiths, Dawn',
      year: '2017',
      price: 95000,
      rating: 3,
      coverImage: '/assets/books/android-book.jpg'
    },
    {
      id: 5,
      title: 'Kotlin for Android Developers',
      author: 'Leiva, Antonio',
      year: '2020',
      price: 130000,
      rating: 5,
      coverImage: '/assets/books/android-book.jpg'
    },
    {
      id: 6,
      title: 'Android Design Patterns and Best Practices',
      author: 'Jaroslaw, Kyle',
      year: '2016',
      price: 105000,
      rating: 4,
      coverImage: '/assets/books/android-book.jpg'
    }
  ];

  // Apply responsive styles based on window width
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Compute grid template columns based on window width
  const getGridStyle = () => {
    if (windowWidth <= 640) {
      return { ...styles.bookGrid, gridTemplateColumns: '1fr' };
    } else if (windowWidth <= 992) {
      return { ...styles.bookGrid, gridTemplateColumns: 'repeat(2, 1fr)' };
    }
    return styles.bookGrid;
  };

  // Authentication check
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  // Event handlers for book interactions
  const handleViewDetails = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const handleAddToCart = (bookId) => {
    // In a real app, this would dispatch to a cart context/redux store
    console.log(`Adding book ${bookId} to cart`);
    alert(`Buku telah ditambahkan ke keranjang!`);
  };

  if (!currentUser) return null;

  return (
    <div style={styles.dashboard}>
      <Header />
      
      <main style={styles.dashboardContent}>
        <section style={styles.bookSection}>
          <h2 style={styles.sectionTitle}>
            Today's Pick
            <span style={{ ...styles.titleAfter, display: 'block' }}></span>
          </h2>
          <div style={getGridStyle()}>
            {/* Display exactly 3 books per row */}
            {BOOKS.slice(0, 3).map((book) => (
              <BookCard 
                key={`today-${book.id}`} 
                book={book}
                onViewDetails={handleViewDetails}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>
        
        <section style={styles.bookSection}>
          <h2 style={styles.sectionTitle}>
            Just for you
            <span style={{ ...styles.titleAfter, display: 'block' }}></span>
          </h2>
          <div style={getGridStyle()}>
            {/* Display exactly 3 books per row */}
            {BOOKS.slice(3, 6).map((book) => (
              <BookCard 
                key={`foryou-${book.id}`} 
                book={book}
                onViewDetails={handleViewDetails}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;