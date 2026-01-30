"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Code } from "lucide-react";

const projects = [
  {
    title: "School Management System",
    description: "REST API for school management with student and teacher CRUD operations, ViaCEP integration for address lookup, and complete validation using Spring Boot and H2 Database.",
    tags: ["Java", "Spring Boot", "JPA", "REST API", "H2"],
    link: "#",
    github: "https://github.com/samuellgsDev/SistemaDeGestaoEscolar",
    dimension: "EDU-23"
  },
  {
    title: "Student Registration API",
    description: "RESTful API for student registration with full CRUD operations, Entity Framework Core migrations, and SQLite database. Built with .NET 10 and documented with Swagger.",
    tags: [".NET", "EF Core", "SQLite", "REST API", "Swagger"],
    link: "#",
    github: "https://github.com/samuellgsDev/student-registration-API",
    dimension: "API-24"
  },
  {
    title: "Red-Black Tree Simulator",
    description: "Interactive visualization of Red-Black Tree data structure with step-by-step insertion, deletion, and rotation animations built with Angular and .NET.",
    tags: ["Angular", "C#", ".NET", "Data Structures"],
    link: "https://arvore-rubro-negra.vercel.app/",
    github: "https://github.com/samuellgsDev/Arvore-Rubro-negra",
    dimension: "ALGO-24"
  },
  {
    title: "Accessibility Device for Public Transport",
    description: "Developed a device using Arduino and C to aid visually impaired individuals in navigating public transportation.",
    tags: ["Arduino", "C", "Hardware"],
    link: "#",
    github: "#",
    dimension: "UFMA-22"
  },
  {
    title: "Programming Logic Education",
    description: "Taught programming logic and Python to high school students, guiding them in building games with Pygame.",
    tags: ["Python", "Pygame", "Education"],
    link: "#",
    github: "#",
    dimension: "IEMA-21"
  },
  {
     title: "Meme Veracity Analyzer",
     description: "AI model analyzing memes for truthfulness using Computer Vision/NLP.",
     tags: ["Python", "OCR", "NLP"],
     link: "#",
     github: "https://github.com/samuellgsDev/meme-fact-checker",
     dimension: "MEME-X"
  },
  {
      title: "Cardiomegaly Detection",
      description: "Chest X-ray analysis model using TensorFlow and Tesseract OCR.",
      tags: ["TensorFlow", "Medical AI", "Python"],
      link: "#",
      github: "#",
      dimension: "MED-BAY"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-20 px-4 flex flex-col items-center justify-center relative">
      <div className="container mx-auto max-w-6xl">
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-8 md:mb-16 px-2"
        >
            <span className="text-white">PROJECT </span>
            <span className="text-portal-green text-shadow-glow">DIMENSIONS</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {projects.map((project, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-space-gray border border-portal-green/20 rounded-xl overflow-hidden hover:border-portal-green transition-all duration-300 flex flex-col h-full"
                >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-portal-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    
                    {/* Dimension Label */}
                    <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded border border-rick-hair/50 text-xs font-mono text-rick-hair z-10">
                        DIMENSION {project.dimension}
                    </div>

                    <div className="h-40 bg-black/50 flex items-center justify-center border-b border-portal-green/20 relative overflow-hidden group-hover:bg-black/80 transition-colors">
                         <div className="absolute inset-0 flex items-center justify-center">
                            <Code className="w-16 h-16 text-gray-700 group-hover:text-portal-green/50 transition-colors duration-500" />
                         </div>
                    </div>

                    <div className="p-6 space-y-4 relative z-10 bg-space-gray flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-white group-hover:text-portal-green transition-colors">{project.title}</h3>
                        <p className="text-gray-400 text-sm flex-1">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-xs font-mono bg-black/50 text-portal-center px-2 py-1 rounded border border-portal-center/20">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-gray-700 mt-4">
                            <a href={project.github} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                                <Github className="w-4 h-4" /> Code
                            </a>
                            {project.link !== "#" && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-portal-green transition-colors">
                                    <ExternalLink className="w-4 h-4" /> Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
