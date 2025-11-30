'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FolderKanban,
  Code,
  Mail,
  LogOut,
  Plus,
  Eye,
  Trash2,
  Edit,
} from 'lucide-react';
import { toast } from 'sonner';

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

interface Skill {
  _id: string;
  name: string;
  category: string;
  level: number;
}

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'contacts'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    loadData();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check');
      if (!res.ok) {
        router.push('/admin/login');
      }
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [projectsRes, skillsRes, contactsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/skills'),
        fetch('/api/contact'),
      ]);

      if (projectsRes.ok) setProjects(await projectsRes.json());
      if (skillsRes.ok) setSkills(await skillsRes.json());
      if (contactsRes.ok) setContacts(await contactsRes.json());
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Project deleted');
        loadData();
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const deleteSkill = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    try {
      const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Skill deleted');
        loadData();
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'PATCH' });
      if (res.ok) {
        loadData();
      }
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Message deleted');
        loadData();
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const tabs = [
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'contacts', label: 'Messages', icon: Mail },
  ] as const;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 glass border-r border-gray-800 p-6 fixed h-full">
        <div className="flex items-center gap-2 mb-8">
          <LayoutDashboard className="w-8 h-8 text-cyan-400" />
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Admin Panel
          </h1>
        </div>

        <nav className="space-y-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 text-cyan-400'
                  : 'text-gray-400 hover:bg-gray-800/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white">Projects</h2>
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold hover:scale-105 transition-all">
                  <Plus className="w-5 h-5" />
                  Add Project
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass rounded-xl p-6"
                  >
                    <h3 className="text-xl font-bold text-cyan-400 mb-2">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <button className="text-cyan-400 hover:text-cyan-300">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProject(project._id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white">Skills</h2>
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold hover:scale-105 transition-all">
                  <Plus className="w-5 h-5" />
                  Add Skill
                </button>
              </div>

              <div className="glass rounded-xl p-6">
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill._id} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">{skill.name}</span>
                          <span className="text-cyan-400 text-sm">{skill.category}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                          <span className="text-cyan-400 text-sm w-12">{skill.level}%</span>
                        </div>
                      </div>
                      <div className="flex gap-3 ml-4">
                        <button className="text-cyan-400 hover:text-cyan-300">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteSkill(skill._id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Messages</h2>

              <div className="space-y-4">
                {contacts.map((contact) => (
                  <motion.div
                    key={contact._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`glass rounded-xl p-6 ${!contact.read ? 'border-l-4 border-cyan-500' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">{contact.name}</h3>
                        <p className="text-sm text-gray-400">{contact.email}</p>
                      </div>
                      <div className="flex gap-3">
                        {!contact.read && (
                          <button
                            onClick={() => markAsRead(contact._id)}
                            className="text-cyan-400 hover:text-cyan-300"
                            title="Mark as read"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteContact(contact._id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-300">{contact.message}</p>
                    <p className="text-xs text-gray-500 mt-4">
                      {new Date(contact.createdAt).toLocaleString()}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
