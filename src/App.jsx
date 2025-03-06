import { useState, useEffect } from 'react';
import { Plus, Search, Users, Calendar, CheckSquare, X } from 'lucide-react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProjectCard from './components/ProjectCardProps';
import NewProjectModal from './components/NewProjectModalProps';
import ProjectDetails from './components/ProjectDetailsProps';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'Projet de Développement Web',
    description: "Création d'une application web pour la gestion de projets étudiants avec React et TypeScript.",
    deadline: '2024-04-15',
    members: [
      {
        id: '1',
        name: 'Marie Laurent',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        page: '/admin',
        link: '/profile/1'
      },
      {
        id: '2', 
        name: 'Thomas Martin',
        role: 'member',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150',
        page: '/member',
        link: '/profile/2'
      },
      {
        id: '3',
        name: 'Sophie Dubois', 
        role: 'member',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        page: '/member',
        link: '/profile/3'
      },
    ],
    tasks: [
      {
        id: '1',
        title: 'Configuration du projet',
        description: "Mettre en place l'environnement de développement",
        status: 'completed',
        assignedTo: ['1'],
      },
      {
        id: '2',
        title: 'Design de l\'interface',
        description: 'Créer les maquettes UI/UX',
        status: 'in-progress',
        assignedTo: ['2', '3'],
      },
    ],
  },
];

function App() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : MOCK_PROJECTS;
  });
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const handleProjectClick = (project) => {
    navigate(`/project/${project.id}`);
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects(projects.map(p => 
      p.id === updatedProject.id ? updatedProject : p
    ));
    setIsNewProjectModalOpen(false);
  };

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(p => p.id !== projectId));
    navigate('/');
  };

  const handleCreateProject = (newProject) => {
    if (!newProject.title || !newProject.description) {
      alert('Please fill in all required fields');
      return;
    }
    
    const projectWithId = {
      ...newProject,
      id: Math.random().toString(36).substr(2, 9),
      tasks: [],
      members: [],
      createdAt: new Date().toISOString(),
    };

    const updatedProjects = [...projects];
    updatedProjects.splice(1, 0, projectWithId);
    setProjects(updatedProjects);
    setIsNewProjectModalOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProjects = projects.filter(project => {
    const searchLower = searchTerm.toLowerCase();
    return (
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      project.members.some(member => 
        member.name.toLowerCase().includes(searchLower)
      )
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <Routes>
        <Route path="/" element={
          <div className="home-container">
            <div className="header-section">
              <h1 className="page-title">Groupes de Travail</h1>
              <button 
                onClick={() => setIsNewProjectModalOpen(true)}
                className="new-project-button"
              >
                <Plus size={20} />
                Nouveau Projet
              </button>
            </div>

            <div className="search-section">
              <div className="search-wrapper">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Rechercher un projet, un membre..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                {searchTerm && (
                  <button 
                    className="clear-search"
                    onClick={() => setSearchTerm('')}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              {searchTerm && (
                <div className="search-results">
                  <span className="results-count">
                    {filteredProjects.length} résultat(s) trouvé(s)
                  </span>
                </div>
              )}
            </div>

            <div className="project-grid">
              {filteredProjects.map((project, index) => (
                <div 
                  key={project.id}
                  className="project-card"
                  onClick={() => handleProjectClick(project)}
                  style={{ order: index }}
                >
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
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
                      <span>{project.tasks.filter(task => task.status === 'completed').length}/{project.tasks.length}</span>
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
              ))}
            </div>
          </div>
        } />

        <Route 
          path="/project/:id" 
          element={
            <ProjectDetails
              projects={projects}
              onClose={() => navigate('/')}
              onUpdate={handleUpdateProject}
              onDelete={handleDeleteProject}
            />
          } 
        />
      </Routes>

      {isNewProjectModalOpen && (
        <NewProjectModal
          onClose={() => setIsNewProjectModalOpen(false)}
          onCreate={handleCreateProject}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;





