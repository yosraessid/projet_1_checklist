import { Heart } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>MultimédiaTeams</h3>
          <p>Plateforme collaborative pour étudiants</p>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} - Fait avec <Heart className="heart-icon" size={14} /> par Essid Yosra
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 