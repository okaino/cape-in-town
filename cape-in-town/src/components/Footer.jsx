import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 Foodie's Paradise. All Rights Reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "1rem",
    textAlign: "center",
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
};

export default Footer;
