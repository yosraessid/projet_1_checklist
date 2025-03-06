import { Heart } from 'lucide-react'; // Importation de l'icône "Heart" depuis la bibliothèque "lucide-react"

function Footer() {
  const currentYear = new Date().getFullYear(); // Récupération de l'année actuelle dynamiquement

  return (
    <footer className="footer"> {/* Élément de pied de page avec une classe CSS */}
      <div className="footer-content"> {/* Conteneur principal du pied de page */}
        
        <div className="footer-brand"> {/* Section pour afficher le nom et la description */}
          <h3>MultimédiaTeams</h3>
          <p>Plateforme collaborative pour étudiants</p>
        </div>
        
        <div className="footer-bottom"> {/* Section pour les crédits et le copyright */}
          <p className="copyright">
            © {currentYear} - Fait avec <Heart className="heart-icon" size={14} /> par Essid Yosra
            {/* Affichage de l'année dynamique et insertion d'une icône de cœur avec une taille définie */}
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer; // Exportation du composant Footer pour l'utiliser ailleurs dans l'application
