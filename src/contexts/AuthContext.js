// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// Data dummy untuk users (termasuk admin)
const DUMMY_USERS = [
  { 
    id: "admin01", 
    email: "admin@filkompedia.com", 
    password: "admin123", 
    username: "Admin",
    role: "admin" 
  },
  { 
    id: "00001", 
    email: "supermarco@gmail.com", 
    password: "password123", 
    username: "supermarco",
    role: "user",
    joinDate: "04 Sep 2019",
    salesNumber: "Electric" 
  }
];

// Data dummy untuk members
const DUMMY_MEMBERS = [
  { id: "00001", name: "Christine Brooks", email: "good123@gmail.com", joinDate: "04 Sep 2019", salesNumber: "Electric" },
  { id: "00002", name: "Rosie Pearson", email: "good123@gmail.com", joinDate: "28 May 2019", salesNumber: "Book" },
  { id: "00003", name: "Darrell Caldwell", email: "good123@gmail.com", joinDate: "23 Nov 2019", salesNumber: "Medicine" },
  { id: "00004", name: "Gilbert Johnston", email: "good123@gmail.com", joinDate: "05 Feb 2019", salesNumber: "Mobile" },
  { id: "00005", name: "Alan Cain", email: "good123@gmail.com", joinDate: "29 Jul 2019", salesNumber: "Watch" },
  { id: "00006", name: "Alfred Murray", email: "good123@gmail.com", joinDate: "15 Aug 2019", salesNumber: "Medicine" },
  { id: "00007", name: "Maggie Sullivan", email: "good123@gmail.com", joinDate: "21 Dec 2019", salesNumber: "Watch" },
  { id: "00008", name: "Rosie Todd", email: "good123@gmail.com", joinDate: "30 Apr 2019", salesNumber: "Medicine" },
  { id: "00009", name: "Dottie Hines", email: "good123@gmail.com", joinDate: "09 Jan 2019", salesNumber: "Book" }
];

// Data dummy untuk buku
const DUMMY_BOOKS = [
  { 
    id: "book1", 
    title: "Androids : The Team that Built the Android Operating System", 
    author: "Haase, Chet", 
    year: "2014", 
    description: "The story behind Android OS development team.",
    price: 100000, 
    stock: 25, 
    sales: 20,
    coverImage: "/assets/books/android-book.jpg" 
  },
  { 
    id: "book2", 
    title: "Androids : The Team that Built the Android Operating System", 
    author: "Haase, Chet", 
    year: "2014", 
    description: "The story behind Android OS development team.",
    price: 100000, 
    stock: 25, 
    sales: 20,
    coverImage: "/assets/books/android-book.jpg" 
  },
  { 
    id: "book3", 
    title: "Androids : The Team that Built the Android Operating System", 
    author: "Haase, Chet", 
    year: "2014", 
    description: "The story behind Android OS development team.",
    price: 100000, 
    stock: 25, 
    sales: 20,
    coverImage: "/assets/books/android-book.jpg" 
  }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState(DUMMY_MEMBERS);
  const [books, setBooks] = useState(DUMMY_BOOKS);

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    
    // Load members from localStorage if available
    const savedMembers = localStorage.getItem('members');
    if (savedMembers) {
      setMembers(JSON.parse(savedMembers));
    } else {
      // Initialize with dummy data
      localStorage.setItem('members', JSON.stringify(DUMMY_MEMBERS));
    }
    
    // Load books from localStorage if available
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    } else {
      // Initialize with dummy data
      localStorage.setItem('books', JSON.stringify(DUMMY_BOOKS));
    }
    
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const user = DUMMY_USERS.find(
      user => user.email === email && user.password === password
    );
    
    if (user) {
      const userInfo = { 
        id: user.id,
        email: user.email, 
        username: user.username,
        role: user.role
      };
      setCurrentUser(userInfo);
      localStorage.setItem('currentUser', JSON.stringify(userInfo));
      return { success: true, user: userInfo };
    }
    return { success: false };
  };

  const register = (username, email, password) => {
    // Check if user already exists
    const existingUser = DUMMY_USERS.find(user => user.email === email);
    if (existingUser) return false;
    
    // In a real app, this would be a server call
    // For our static version, we'll pretend it worked and log them in
    const userInfo = { 
      id: `user${Date.now()}`,
      email, 
      username,
      role: "user"
    };
    setCurrentUser(userInfo);
    localStorage.setItem('currentUser', JSON.stringify(userInfo));
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // Admin functions for managing members
  const addMember = (member) => {
    const newMember = {
      ...member,
      id: String(members.length + 1).padStart(5, '0')
    };
    const updatedMembers = [...members, newMember];
    setMembers(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
  };

  const updateMember = (id, updatedData) => {
    const updatedMembers = members.map(member => 
      member.id === id ? { ...member, ...updatedData } : member
    );
    setMembers(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
  };

  const deleteMember = (id) => {
    const updatedMembers = members.filter(member => member.id !== id);
    setMembers(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
  };

  // Admin functions for managing books
  const addBook = (book) => {
    const updatedBooks = [...books, book];
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  const updateBook = (id, updatedData) => {
    const updatedBooks = books.map(book => 
      book.id === id ? { ...book, ...updatedData } : book
    );
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  const deleteBook = (id) => {
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  const value = {
    currentUser,
    members,
    books,
    login,
    register,
    logout,
    loading,
    addMember,
    updateMember,
    deleteMember,
    addBook,
    updateBook,
    deleteBook
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};