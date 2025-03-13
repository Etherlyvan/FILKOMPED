import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './BookReviews.css';

// Mock data untuk buku
const BOOK = {
  id: 1,
  title: 'Androids : The Team that Built the Android Operating System',
  author: 'Haase, Chet',
  coverImage: '/assets/books/android-book.jpg',
};

// Mock data untuk review
const REVIEWS = [
  {
    id: 1,
    user: {
      name: 'Joko Astoto',
      avatar: '/assets/users/user-avatar.png',
    },
    rating: 4,
    comment: 'Bagus bahasannya sangat seperti materi yang diberi saya diajarkan di perkuliahan yang membuat saya jadi lebih paham membuat materi baru lagi.',
    date: '2023-03-12'
  },
  {
    id: 2,
    user: {
      name: 'Joko Astoto',
      avatar: '/assets/users/user-avatar.png',
    },
    rating: 4,
    comment: 'Bagus bahasannya sangat seperti materi yang diberi saya diajarkan di perkuliahan yang membuat saya jadi lebih paham membuat materi baru lagi.',
    date: '2023-02-28'
  },
  {
    id: 3,
    user: {
      name: 'Joko Astoto',
      avatar: '/assets/users/user-avatar.png',
    },
    rating: 4,
    comment: 'Bagus bahasannya sangat seperti materi yang diberi saya diajarkan di perkuliahan yang membuat saya jadi lebih paham membuat materi baru lagi.',
    date: '2023-01-15'
  }
];

const BookReviews = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="book-reviews-page">
      <Header />
      
      <div className="book-reviews-container">
        <div className="book-reviews-left">
          <img 
            src={BOOK.coverImage} 
            alt={BOOK.title} 
            className="book-reviews-image" 
          />
        </div>
        
        <div className="book-reviews-right">
          <div className="reviews-list">
            {REVIEWS.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <img 
                    src={review.user.avatar} 
                    alt={review.user.name} 
                    className="reviewer-avatar" 
                  />
                  <div className="reviewer-info">
                    <div className="reviewer-name">{review.user.name}</div>
                    <div className="review-rating">
                      {'★'.repeat(review.rating)}
                      {'☆'.repeat(5 - review.rating)}
                    </div>
                  </div>
                </div>
                <div className="review-content">
                  {review.comment}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookReviews;