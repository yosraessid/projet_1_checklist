
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, Plus, Trash2, UserPlus, Search } from 'lucide-react';
import PropTypes from 'prop-types';
import '../App.css';


function ProjectDetails({ projects, onClose, onUpdate, onDelete }) {
  const navigate = useNavigate();
  const { id } = useParams();

  // Recherche du projet correspondant à l'ID
  const project = projects.find(p => p.id === id);

  // États pour gérer les données du projet
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [newMember, setNewMember] = useState({
    name: '',
    role: 'member',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  });

  // Initialisation des états avec les données du projet
  useState(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setDeadline(project.deadline || '');
      setTasks(project.tasks);
      setMembers(project.members);
    }
  }, [project]);

  // Affichage d'erreur si le projet n'est pas trouvé
  if (!project) {
    return <div>Projet non trouvé</div>;
  }

  /**
   * Gère la soumission du formulaire de modification
   * @param {Event} e - L'événement de soumission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProject = {
      ...project,
      title,
      description,
      deadline,
      tasks,
      members,
      lastUpdated: new Date().toISOString(),
    };
    onUpdate(updatedProject);
    navigate('/');
  };

  /**
   * Ajoute une nouvelle tâche au projet
   */
  const handleAddTask = () => {
    if (newTask.title.trim()) {
      const task = {
        id: Math.random().toString(36).substr(2, 9),
        title: newTask.title,
        description: newTask.description,
        status: 'todo',
        assignedTo: [],
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', description: '' });
    }
  };

  /**
   * Ajoute un nouveau membre à l'équipe
   */
  const handleAddMember = () => {
    if (newMember.name.trim()) {
      const member = {
        id: Math.random().toString(36).substr(2, 9),
        name: newMember.name,
        role: newMember.role,
        avatar: newMember.avatar,
      };
      setMembers([...members, member]);
      setNewMember({
        name: '',
        role: 'member',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      });
    }
  };

 
  const handleUpdateTaskStatus = (taskId, status) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  const handleDeleteMember = (memberId) => {
    setMembers(members.filter(member => member.id !== memberId));
    setTasks(tasks.map(task => ({
      ...task,
      assignedTo: task.assignedTo.filter(id => id !== memberId)
    })));
  };

  return (
    <div className="home-container">
      {/* En-tête avec titre et bouton */}
      <div className="header-section">
        <h1 className="page-title">Groupes de Travail</h1>
        <button className="new-project-button">
          <Plus size={20} />
          Nouveau Projet
        </button>
      </div>

      {/* Section de recherche */}
      <div className="search-section">
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher un projet, un membre..."
          />
        </div>
      </div>

      {/* Grille des projets */}
      <div className="project-grid">
        {projects.map((p) => (
          <div key={p.id} className="project-card">
            <h3 className="project-title">{p.title}</h3>
            <p className="project-description">{p.description}</p>
          </div>
        ))}
      </div>

      {/* Modal des détails du projet */}
      <div className="modal-overlay">
        <div className="modal-content">
          {/* En-tête de la modal */}
          <div className="modal-header">
            <h2 className="modal-title">Détails du Projet</h2>
            <button onClick={onClose} className="close-button">
              <X size={24} />
            </button>
          </div>

          {/* Formulaire de modification */}
          <form onSubmit={handleSubmit}>
            {/* Champs principaux */}
            <div className="form-group">
              <label className="form-label">Titre</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-textarea"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Date limite</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Section des membres */}
            <div className="members-section">
              <h3 className="section-title">Membres de l&apos;équipe</h3>
              <div className="member-list">
                {members.map((member) => (
                  <div key={member.id} className="member-item">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="member-avatar"
                    />
                    <div className="member-info">
                      <div className="member-name">{member.name}</div>
                      <div className="member-role">{member.role}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteMember(member.id)}
                      className="delete-button"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Formulaire d'ajout de membre */}
              <div className="add-member">
                <input
                  type="text"
                  placeholder="Nom du membre"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="member-input"
                />
                <select
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="role-select"
                >
                  <option value="member">Membre</option>
                  <option value="admin">Admin</option>
                </select>
                <button type="button" onClick={handleAddMember} className="add-button">
                  <UserPlus size={20} />
                  Ajouter
                </button>
              </div>
            </div>

            {/* Section des tâches */}
            <div className="tasks-section">
              <h3 className="section-title">Tâches</h3>
              <div className="task-list">
                {tasks.map((task) => (
                  <div key={task.id} className="task-item">
                    <div className="task-header">
                      <div className="task-title">{task.title}</div>
                      <select
                        value={task.status}
                        onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
                        className={`task-status status-${task.status}`}
                      >
                        <option value="todo">À faire</option>
                        <option value="in-progress">En cours</option>
                        <option value="completed">Terminé</option>
                      </select>
                    </div>
                    <div className="task-description">{task.description}</div>
                  </div>
                ))}
              </div>

              {/* Formulaire d'ajout de tâche */}
              <div className="add-member">
                <input
                  type="text"
                  placeholder="Nouvelle tâche"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="member-input"
                />
                <button type="button" onClick={handleAddTask} className="add-button">
                  <Plus size={20} />
                  Ajouter
                </button>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="action-buttons">
              <button
                type="button"
                onClick={() => onDelete(project.id)}
                className="delete-project"
              >
                Supprimer le projet
              </button>
              <div className="button-group">
                <button type="button" onClick={onClose} className="cancel-button">
                  Annuler
                </button>
                <button type="submit" className="save-button">
                  Enregistrer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Validation des props avec PropTypes
ProjectDetails.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    deadline: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      status: PropTypes.string.isRequired,
      assignedTo: PropTypes.arrayOf(PropTypes.string).isRequired
    })).isRequired,
    members: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired
    })).isRequired
  })).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ProjectDetails;
