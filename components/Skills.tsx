'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Database, Cpu } from 'lucide-react';

interface Skill {
  _id: string;
  name: string;
  category: string;
  level: number;
  icon: string;
}

const categoryIcons: Record<string, any> = {
  Frontend: Code,
  Backend: Database,
  AI: Brain,
  DevOps: Cpu,
};

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/skills')
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
        const cats = [...new Set(data.map((s: Skill) => s.category))] as string[];
        setCategories(cats);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">
              Expertise
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Skills</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Mastering cutting-edge technologies to build exceptional solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category, catIndex) => {
            const Icon = categoryIcons[category] || Code;
            const categorySkills = skills.filter((s) => s.category === category);

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: catIndex % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-6 hover:glow-cyan transition-all"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                    {category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {categorySkills.map((skill, index) => (
                    <div key={skill._id}>
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-cyan-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1, duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
