import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await mongoose.connection.db?.dropDatabase();
    console.log('Database cleared');

    // Import models
    const Admin = (await import('../models/Admin')).default;
    const Project = (await import('../models/Project')).default;
    const Skill = (await import('../models/Skill')).default;

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await Admin.create({
      email: 'admin@portfolio.com',
      password: hashedPassword,
      name: 'Admin User',
    });
    console.log('Admin user created: admin@portfolio.com / admin123');

    // Create sample projects
    await Project.insertMany([
      {
        title: 'AI Chat Platform',
        description: 'Real-time AI-powered chat application with GPT-4 integration, vector embeddings, and semantic search capabilities.',
        technologies: ['Next.js', 'TypeScript', 'OpenAI', 'Pinecone', 'Tailwind'],
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        featured: true,
        order: 1,
      },
      {
        title: 'Neural Network Visualizer',
        description: 'Interactive visualization tool for deep learning models with real-time training metrics and architecture diagrams.',
        technologies: ['React', 'TensorFlow.js', 'D3.js', 'Python', 'FastAPI'],
        imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
        liveUrl: 'https://example.com',
        featured: true,
        order: 2,
      },
      {
        title: 'Blockchain Analytics Dashboard',
        description: 'Comprehensive analytics platform for tracking cryptocurrency transactions, wallet activities, and market trends.',
        technologies: ['Vue.js', 'Web3.js', 'GraphQL', 'Node.js', 'PostgreSQL'],
        imageUrl: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800',
        githubUrl: 'https://github.com',
        featured: true,
        order: 3,
      },
    ]);
    console.log('Projects created');

    // Create sample skills
    await Skill.insertMany([
      { name: 'React', category: 'Frontend', level: 95, icon: 'Code', order: 1 },
      { name: 'Next.js', category: 'Frontend', level: 90, icon: 'Code', order: 2 },
      { name: 'TypeScript', category: 'Frontend', level: 92, icon: 'Code', order: 3 },
      { name: 'Tailwind CSS', category: 'Frontend', level: 88, icon: 'Code', order: 4 },
      { name: 'Node.js', category: 'Backend', level: 90, icon: 'Database', order: 1 },
      { name: 'Python', category: 'Backend', level: 85, icon: 'Database', order: 2 },
      { name: 'MongoDB', category: 'Backend', level: 87, icon: 'Database', order: 3 },
      { name: 'PostgreSQL', category: 'Backend', level: 83, icon: 'Database', order: 4 },
      { name: 'Machine Learning', category: 'AI', level: 88, icon: 'Brain', order: 1 },
      { name: 'GPT Integration', category: 'AI', level: 90, icon: 'Brain', order: 2 },
      { name: 'TensorFlow', category: 'AI', level: 82, icon: 'Brain', order: 3 },
      { name: 'Docker', category: 'DevOps', level: 85, icon: 'Cpu', order: 1 },
      { name: 'AWS', category: 'DevOps', level: 80, icon: 'Cpu', order: 2 },
      { name: 'CI/CD', category: 'DevOps', level: 87, icon: 'Cpu', order: 3 },
    ]);
    console.log('Skills created');

    console.log('✅ Seed completed successfully!');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
