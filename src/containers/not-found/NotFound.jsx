// import React from 'react';
// import { Link } from 'react-router-dom'; // Import Link for navigation

// const NotFound = () => {
//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>404</h1>
//       <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
//       <Link to="/" style={styles.link}>Go Back to Home</Link>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     textAlign: 'center',
//     marginTop: '50px',
//   },
//   title: {
//     fontSize: '6rem',
//     color: '#8a5c50',
//   },
//   message: {
//     fontSize: '1.5rem',
//     color: '#555',
//   },
//   link: {
//     fontSize: '1.2rem',
//     color: '#007bff',
//     textDecoration: 'none',
//   }
// };

// export default NotFound;



import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the home page after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '6rem', color: '#8a5c50' }}>404</h1>
      <p style={{ fontSize: '1.5rem', color: '#555' }}>Oops! Page not found.</p>
      <p>Redirecting to home in 5 seconds...</p>
    </div>
  );
};

export default NotFound;
