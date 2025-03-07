
import { Calendar, Users, CheckSquare } from 'lucide-react';
import PropTypes from 'prop-types';
import '../App.css';


function ProjectCard({ project, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="project-card"
    >
      {/* Informations principales du projet */}
      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
      </div>
      
      {/* Métadonnées du projet */}
      <div className="project-meta">
        {/* Nombre de membres */}
        <div className="meta-item">
          <Users size={16} />
          <span>{project.members.length} membres</span>
        </div>
        
        {/* Date limite (si définie) */}
        {project.deadline && (
          <div className="meta-item">
            <Calendar size={16} />
            <span>{new Date(project.deadline).toLocaleDateString()}</span>
          </div>
        )}
        
        {/* Progression des tâches */}
        <div className="meta-item">
          <CheckSquare size={16} />
          <span>
            {project.tasks.filter(task => task.status === 'completed').length}/
            {project.tasks.length}
          </span>
        </div>
      </div>
      
      {/* Liste des membres avec leurs avatars */}
      <div className="project-members">
        {/* Affichage des 4 premiers avatars */}
        {project.members.slice(0, 4).map((member) => (
          <img
            key={member.id}
            src={member.avatar}
            alt={member.name}
            className="member-avatar"
          />
        ))}
        {/* Compteur pour les membres supplémentaires */}
        {project.members.length > 4 && (
          <div className="member-avatar more-members">
            +{project.members.length - 4}
          </div>
        )}
      </div>
    </div>
  );
}

// Validation des props avec PropTypes
ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired
    })).isRequired,
    deadline: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.shape({
      status: PropTypes.string.isRequired
    })).isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default ProjectCard;
