/* Apply gradient background to the entire page */
body {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.2), rgba(255, 255, 255, 0.2));
  background-attachment: fixed; /* Keeps the background fixed while scrolling */
  min-height: 100vh; /* Ensures the gradient covers the full height of the page */
  color: white; /* Optional, to make text readable */
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

/* Navbar Styles (for all screens) */
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 50px;
  background-color: transparent;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  backdrop-filter: blur(15px); /* Glassmorphism effect */
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.2), rgba(255, 255, 255, 0.2)); /* Glassmorphism gradient */
  animation: gradientAnimation 8s ease infinite; /* Gradient animation */
}

/* Hero Section */
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  height: 100vh;
  color: #fff;
  text-align: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  margin: 0;
  backdrop-filter: blur(15px);
}

/* Gradient background for hero section */
.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #000, #fff);
  background-size: 200% 200%;
  animation: gradientAnimation 8s ease infinite;
  z-index: 1;
}

/* Gradient animation */
@keyframes gradientAnimation {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0 0;
  }
}

/* Cookie Popup */
.cookie-popup {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.2), rgba(255, 255, 255, 0.2));
  backdrop-filter: blur(15px);
  animation: gradientAnimation 8s ease infinite;
  z-index: 2000;
  padding: 20px;
  text-align: center;
  display: none;
}

/* Navbar Toggle Styles */
.toggle-button {
  font-size: 30px;
  cursor: pointer;
  display: none;
}

/* Sliding Menu */
.main-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  z-index: 1001;
}

.main-menu.active {
  transform: translateX(0);
}

.main-menu ul {
  list-style-type: none;
  padding: 50px 20px;
}

.main-menu ul li {
  margin: 20px 0;
}

.main-menu ul li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

.main-menu .close-btn {
  color: white;
  font-size: 30px;
  cursor: pointer;
}

/* Media Query for Small Screens (Mobile) */
@media (max-width: 768px) {
  .navbar .nav-links {
    display: none;
  }

  .toggle-button {
    display: block;
  }
}
