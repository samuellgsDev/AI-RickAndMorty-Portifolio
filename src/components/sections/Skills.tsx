"use client";

import { motion } from "framer-motion";

const skills = [
  { name: ".NET / C#", level: 95, color: "bg-portal-green" },
  { name: "JavaScript / TypeScript", level: 90, color: "bg-rick-hair" },
  { name: "SQL & Databases", level: 85, color: "bg-portal-center" },
  { name: "Azure & DevOps", level: 80, color: "bg-blue-500" },
  { name: "AI & Python (TensorFlow)", level: 75, color: "bg-neon-green" },
  { name: "Chatbots", level: 92, color: "bg-purple-500" },
];

const categories = [
    { title: "Languages", items: ["C#", "Python", "JavaScript", "VB.NET", "HTML/CSS", "SQL"] },
    { title: "Frameworks", items: [".NET 6/8", "React", "ASP.NET", "TensorFlow"] },
    { title: "DevOps & Cloud", items: ["Azure DevOps", "Docker", "Kubernetes", "GitHub CI/CD"] },
    { title: "Tools", items: ["Scrum", "Kanban", "Jira", "N8N", "GitHub Copilot"] }
];

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen py-20 px-4 flex flex-col items-center justify-center relative bg-space-black/80">
        <div className="container mx-auto max-w-5xl">
            <motion.h2 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8 md:mb-12 text-center md:text-left px-2"
            >
                <span className="text-white">ARSENAL OF </span>
                <span className="text-toxic-slime ml-4 text-shadow-glow">SKILLS</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Main Progress Bars */}
                <div className="space-y-6">
                    {skills.map((skill, index) => (
                        <div key={skill.name} className="relative">
                            <div className="flex justify-between mb-1 text-sm sm:text-base md:text-lg font-mono text-gray-300">
                                <span>{skill.name}</span>
                                <span className="text-portal-green">{skill.level}%</span>
                            </div>
                            
                            <div className="h-4 bg-space-gray rounded-full overflow-hidden border border-gray-700">
                                <motion.div 
                                    className={`h-full ${skill.color} relative`}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                                >
                                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20" />
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {categories.map((cat, idx) => (
                        <motion.div 
                            key={cat.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-space-gray/50 border border-portal-green/20 p-4 rounded-xl hover:border-portal-green/50 transition-colors"
                        >
                            <h3 className="text-rick-hair font-bold mb-3 border-b border-gray-700 pb-2">{cat.title}</h3>
                            <div className="flex flex-wrap gap-2">
                                {cat.items.map(item => (
                                    <span key={item} className="text-xs bg-black/40 text-gray-300 px-2 py-1 rounded border border-gray-700">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
}
