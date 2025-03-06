import { Calendar, Users, CheckSquare } from 'lucide-react';
import '../App.css';

function ProjectCard({ project, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="project-card"
    >
      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
      </div>
      
      <div className="project-meta">
        <div className="meta-item">
          <Users size={16} />
          <span>{project.members.length} membres</span>
        </div>
        
        {project.deadline && (
          <div className="meta-item">
            <Calendar size={16} />
            <span>{new Date(project.deadline).toLocaleDateString()}</span>
          </div>
        )}
        
        <div className="meta-item">
          <CheckSquare size={16} />
          <span>
            {project.tasks.filter(task => task.status === 'completed').length}/
            {project.tasks.length}
          </span>
        </div>
      </div>
      
      <div className="project-members">
        {project.members.slice(0, 4).map((member) => (
          <img
            key={member.id}
            src={member.avatar}
            alt={member.name}
            className="member-avatar"
          />
        ))}
        {project.members.length > 4 && (
          <div className="member-avatar more-members">
            +{project.members.length - 4}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
