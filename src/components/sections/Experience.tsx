"use client";

import { motion } from "framer-motion";
import GlitchText from "@/components/ui/GlitchText";
import { useMultiverse } from "@/context/MultiverseContext";
import { Briefcase, Calendar } from "lucide-react";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: "Reply",
    role: "Junior .NET Developer (Fullstack Role)",
    period: "July 2025 – Present",
    description: [
      "Analyze legacy systems built with ASP Classic and .NET Framework 4.8, map business rules, identify dependencies and plan migration to .NET 8 using modern architecture.",
      "Migrate legacy systems to .NET 8, working on both back-end (C#) and front-end (HTML, CSS, JavaScript), modernizing architecture, reducing technical debt and improving performance and maintainability.",
      "Leverage GitHub Copilot and MCP Servers to accelerate development, standardize code and enhance delivery efficiency.",
      "Create and optimize SQL procedures to support critical business features and ensure data consistency.",
      "Participate in agile ceremonies (daily and planning), contributing with estimates, technical analysis and task breakdown.",
      "Maintain version control using Git on Azure DevOps, ensuring traceability and continuous development flow."
    ],
    skills: ["Azure DevOps", "GitHub Copilot", "Git/GitHub", ".NET 8", "C#", ".NET Framework 4.8", "ASP Classic", "HTML", "CSS", "JavaScript", "SQL Server", "MCP Servers", "REST APIs"]
  },
  {
    company: "Blip",
    role: "Junior Software Developer",
    period: "September 2024 – June 2025",
    description: [
      "Maintain RESTful APIs in .NET 8 and migrate legacy APIs from .NET 6.",
      "Adjust and improve CI/CD pipelines using Azure DevOps.",
      "Develop chatbots for Banco BMG using Blip, JavaScript and REST/SOAP third-party API integrations.",
      "Lead chatbot modularization efforts, enhancing scalability and team efficiency."
    ],
    skills: [".NET 6/8", "JavaScript", "Blip", "Docker", "Kubernetes", "Azure DevOps", "Git/GitHub", "YAML Pipelines", "SOAP/REST APIs", "C#", "CI/CD", "Grafana"]
  },
  {
    company: "Blip",
    role: "Software Development Intern",
    period: "September 2022 – August 2024",
    description: [
      "Develop and maintain chatbots for major clients including GM, Nissan and Petz.",
      "Build a middle-layer REST API using .NET 6 with layered architecture.",
      "Develop WhatsApp flows for GM, contributing to R$ 9 million in revenue over 3 months.",
      "Manage SQL Server databases."
    ],
    skills: ["JavaScript", "Blip", ".NET 6", "SQL Server", "Azure DevOps", "Git/GitHub", "C#", "REST APIs"]
  }
];

export default function Experience() {
  const { dimension } = useMultiverse();

  const SECTION_TITLES = {
    "C-137": "INTERDIMENSIONAL WORK HISTORY",
    "Pixel": "QUEST LOG",
    "Prime": "PROFESSIONAL EXPERIENCE",
    "Club": "TRACK RECORD"
  };

  return (
    <section id="experience" className="min-h-screen py-20 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-rick-hair/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-portal-green/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto max-w-6xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16 px-2"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
            <GlitchText text={SECTION_TITLES[dimension]} className="text-portal-green" />
          </h2>
          <p className="text-gray-400 font-mono text-sm">
            {dimension === "Pixel" ? "> COMPLETED QUESTS AND ACHIEVEMENTS" : dimension === "Club" ? "> PREVIOUS GIGS AND PERFORMANCES" : "> TIMELINE OF CONTRIBUTIONS"}
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-portal-green/30" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative mb-12 md:mb-24 ${index % 2 === 0 ? 'md:pr-[50%]' : 'md:pl-[50%]'}`}
            >
              {/* Timeline Dot */}
              <div className={`absolute top-6 ${index % 2 === 0 ? 'md:right-[-9px]' : 'md:left-[-9px]'} left-[-9px] w-5 h-5 bg-portal-green rounded-full border-4 border-space-black shadow-[0_0_10px_rgba(0,255,0,0.5)]`} />

              <div className={`ml-8 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                <motion.div
                  className="relative group bg-space-gray/80 backdrop-blur-sm border border-portal-green/30 rounded-lg p-6 hover:border-portal-green/60 transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-portal-green/20 to-rick-hair/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500" />
                  
                  <div className="relative">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4 mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">{exp.role}</h3>
                        <div className="flex items-center gap-2 text-portal-green font-mono">
                          <Briefcase className="w-4 h-4" />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 font-mono text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <ul className="space-y-2 mb-4 text-gray-300">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm leading-relaxed">
                          <span className="text-portal-green mt-1.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-black/40 text-portal-green text-xs font-mono rounded-full border border-portal-green/30 hover:bg-portal-green/10 transition-colors"
                        >
                          {dimension === "Pixel" ? `[${skill}]` : skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
