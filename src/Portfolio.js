import React, { useState, useRef, useEffect, useCallback } from "react";

import {
  Github,
  Linkedin,
  ExternalLink,
  FileText,
  Menu,
  X,
} from "lucide-react";

const skills = [
  "Full stack development",
  "Data Analysis",
  "Generative AI",
  "Python",
  "Pandas",
  "sqlite3",
  "NumPy",
  "SQL",
  "Cypher",
  "Redshift",
  "S3",
  "AWS Athena",
  "TensorFlow",
  "Keras",
  "OpenAI API",
  "LLMs Fine-tuning",
  "d3.js",
  "Sagemaker",
  "JavaScript",
  "React",
  "Flask",
  "Java",
  "Git",
  "Express.js",
  "Bash",
];

const projects = [
  {
    name: "Short Cuts NYC Website",
    description:
      "Developed and designed the Short Cuts NYC website for a New York-based filmmaking group using React and MongoDB. Created a user-friendly, custom-made submission form that dynamically displays entries in a table format.",
    tech: ["React", "MongoDB", "Vercel", "Full-Stack Development"],
    link: "https://www.shortcutsnyc.com/",
  },
  {
    name: "K-PhotoBook",
    description:
      "Developed a web application for creating and managing digital photo books. Implemented user authentication with Google Sign-In, photo upload functionality with metadata tagging, and a responsive gallery view for browsing created photobooks. Utilized Firebase for backend services and data storage.",
    tech: ["React", "Firebase", "Google OAuth", "Vercel"],
    link: "https://github.com/akokash99/photobook",
  },
  // {
  //   name: "K-PhotoBook",
  //   description:
  //     "Developed a web application for creating and managing digital photo books. Implemented user authentication with Google Sign-In, photo upload functionality with metadata tagging, and a responsive gallery view for browsing created photobooks. Utilized Firebase for backend services and data storage.",
  //   tech: ["React", "Firebase", "Google OAuth", "Vercel"],
  //   link: "https://github.com/akokash99/photobook",
  // },
];

const experiences = [
  {
    title: "Software Engineer",
    company: "Roivant Sciences",
    period: "2023-Present",
    achievements: [
      "Spearheaded development and testing of a Flask Neo4j Cypher ChatBot web app that translates natural language input into Cypher queries and fetch data from a Neo4j graph database, incorporating features such as suggested queries, bi-directional LLM agent communication, and an agent-based research pipeline, leading to a significant improvement in functionality and user experience.",
      "Executed and automated ETL and DDL processes with proper unit testing on medical claims data using bash, pandas and sqlite3 to update outdated datasets and ensure database accuracy and currency.",
      "Examined data related to ADT therapies by running multiple analysis using pandas, SQLAlchemy and MySQL Workbench, aiding the Oncology team in gaining insights into patient population and treatment efficacy.",
      "Engineered and assessed multiple large language models (LLMs) using Python, LangChain and AutoGPT to come up with advanced features for the ChatBot and a better user experience.",
      "Fine-tuned multiple LLMs including gpt-3.5-turbo, llama-7b and llama-13b for generating accurate Cypher queries and conducted qualitative assessments to identify top-performing models, enhancing query accuracy by 50%.",
      "Improving chatbot operations, cutting costs by 50%, while boosting accuracy by 1.5x and speed by 6.4x through model fine-tuning on a curated dataset.",
    ],
  },
  {
    title: "Full-Stack Developer",
    company: "Roivant Sciences",
    period: "2022-2023",
    achievements: [
      "Engineered CRONUS, a Machine Learning Ensemble System that classifies news articles into perspective buckets to assess corporate reputation using the GDELT dataset. Leveraged Python, Tensorflow, Keras, JavaScript d3.js, dc.js, Crossfilter, and Bootstrap to create an interactive and user-friendly interface that rapidly cross-filters news articles and calculates sentiment scores using 3D data visualizations.",
      "Built MLP neural networks using Keras, TensorFlow and word2vec to perform topic modeling and classification within a comprehensive NLP pipeline, incorporating sophisticated feature engineering techniques.",
      "Implemented and assessed Google's PaLM LLM models for topic modeling and classification, achieving a 45% improvement in accuracy and eliminating the need for a whole classical topic modeling pipeline. This successful integration prompted a strategic shift, leading to a lasting collaboration between Sumitomo Pharma, 66degrees and Google.",
      "Developed a web application for CRONUS, which was internally valued at $10 million, using Flask, JavaScript and d3.js. The application replaced the need to purchase multiple datasets and reports from external vendors, highlighting the substantial impact and cost-saving benefits.",
    ],
  },
];
const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredExperience, setHoveredExperience] = useState(null);
  const [visibleExperiences, setVisibleExperiences] = useState({});
  const [hoveredProject, setHoveredProject] = useState(null);
  const [projectsSectionVisible, setProjectsSectionVisible] = useState(false);
  const experienceRefs = useRef([]);
  const projectsSectionRef = useRef(null);

  const sectionRefs = {
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    experience: useRef(null),
    contact: useRef(null),
  };

  const combinedProjectsRef = useCallback((node) => {
    sectionRefs.projects.current = node;
    projectsSectionRef.current = node;
  }, []);

  useEffect(() => {
    experienceRefs.current = experienceRefs.current.slice(
      0,
      experiences.length
    );
  }, [experiences]);

  useEffect(() => {
    const experienceObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = experienceRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          if (index !== -1) {
            setVisibleExperiences((prev) => ({
              ...prev,
              [index]: entry.isIntersecting,
            }));
          }
        });
      },
      {
        threshold: [0.2, 0.8],
        rootMargin: "-10% 0px",
      }
    );

    experienceRefs.current.forEach((ref) => {
      if (ref) experienceObserver.observe(ref);
    });

    return () => {
      experienceRefs.current.forEach((ref) => {
        if (ref) experienceObserver.unobserve(ref);
      });
    };
  }, []);

  useEffect(() => {
    const projectsObserver = new IntersectionObserver(
      ([entry]) => {
        setProjectsSectionVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "-20% 0px",
      }
    );

    if (projectsSectionRef.current) {
      projectsObserver.observe(projectsSectionRef.current);
    }

    return () => {
      if (projectsSectionRef.current) {
        projectsObserver.unobserve(projectsSectionRef.current);
      }
    };
  }, []);

  const scrollToExperience = (index) => {
    const element = experienceRefs.current[index];
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middle = absoluteElementTop - window.innerHeight / 2;
      window.scrollTo({
        top: middle,
        behavior: "smooth",
      });
    }
  };
  const headerHeight = 72;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionName) => {
    const section = sectionRefs[sectionName].current;
    if (section) {
      const offsetTop =
        section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveSection(sectionName);
      setIsMobileMenuOpen(false); // Close mobile menu after selection
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <header className="fixed top-0 left-0 right-0 bg-black z-50 px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-3xl font-bold text-white">AK</div>

          {/* Mobile menu button */}
          <button className="sm:hidden text-white" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden sm:block">
            <ul className="flex space-x-6">
              {["About", "Skills", "Experience", "Projects", "Contact"].map(
                (section, index) => (
                  <li key={section}>
                    <button
                      onClick={() => scrollToSection(section.toLowerCase())}
                      className={`text-sm ${
                        activeSection === section.toLowerCase()
                          ? "text-white"
                          : "text-gray-500 hover:text-white"
                      }`}
                    >
                      {`0${index + 1}. ${section}`}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Resume link (hidden on mobile) */}
          <a
            href="https://docs.google.com/document/d/e/2PACX-1vS7mIU1IJroipk0uY1s1cthjEKif2HyHaNrdhxls9yFuYCnt96AUTOAZKYLAqRsE8L6EiC_QbjpAOZv/pub"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-black transition duration-300 items-center"
          >
            <FileText className="mr-2" size={18} />
            Resume
          </a>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden mt-4 bg-gray-900 rounded-lg p-4">
            <ul className="space-y-2">
              {["About", "Skills", "Experience", "Projects", "Contact"].map(
                (section, index) => (
                  <li key={section}>
                    <button
                      onClick={() => scrollToSection(section.toLowerCase())}
                      className={`text-sm w-full text-left py-2 px-4 rounded ${
                        activeSection === section.toLowerCase()
                          ? "bg-gray-800 text-white"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      {`0${index + 1}. ${section}`}
                    </button>
                  </li>
                )
              )}
              <li>
                <a
                  href="https://docs.google.com/document/d/e/2PACX-1vS7mIU1IJroipk0uY1s1cthjEKif2HyHaNrdhxls9yFuYCnt96AUTOAZKYLAqRsE8L6EiC_QbjpAOZv/pub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm w-full text-left py-2 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white flex items-center"
                >
                  <FileText className="mr-2" size={16} /> Resume
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
      <main className="max-w-3xl mx-auto">
        <section ref={sectionRefs.about} className="mb-16">
          <p className="text-gray-400 mb-4">Hi, my name is</p>
          <h1 className="text-5xl font-bold mb-2 text-white">
            Abdallah Kokash.
          </h1>
          <h2 className="text-4xl font-bold mb-6 text-gray-300">
            I build applications and software solutions
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl">
            Forward-thinking Software Engineer with expertise in Full Stack
            Development, Data Analysis, Machine Learning and Generative AI
            integration. Extensive experience at Roivant Sciences and Sumitomo
            Pharma, developing applications using Python, Pandas, LangChain,
            LLMs, SQL, Flask and React.
          </p>
          {/* <button className="px-6 py-3 border border-white text-white rounded hover:bg-white hover:text-black transition duration-300">
            Check out my work!
          </button> */}
        </section>
        {/* skills */}
        <section ref={sectionRefs.skills} className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-800 rounded-full text-sm cursor-pointer
                           transition-all duration-300 ease-in-out
                           hover:bg-gray-700 hover:shadow-[0_0_10px_3px_rgba(45,212,191,0.5)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
        {/* skils */}
        {/* experiences  */}
        <section ref={sectionRefs.experience} className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Experience</h2>
          <div className="relative">
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={(el) => (experienceRefs.current[index] = el)}
                className={`
                mb-8 pl-8 border-l-2 border-gray-700 relative cursor-pointer
                transition-all duration-1000 ease-in-out
                ${
                  visibleExperiences[index]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }
              `}
                onMouseEnter={() => setHoveredExperience(index)}
                onMouseLeave={() => setHoveredExperience(null)}
                onClick={() => scrollToExperience(index)}
              >
                <div
                  className={`
                absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-white 
                transition-all duration-300 
                ${hoveredExperience === index ? "scale-150" : ""}
                before:content-[''] before:absolute before:inset-[-4px]
                before:rounded-full before:border-2 before:border-teal-300
                before:opacity-0 before:scale-0
                ${
                  hoveredExperience === index
                    ? "before:opacity-100 before:scale-100"
                    : ""
                }
                before:transition-all before:duration-300
              `}
                ></div>
                <h3
                  className={`
                text-xl font-bold transition-colors duration-300
                ${hoveredExperience === index ? "text-teal-300" : "text-white"}
              `}
                >
                  {exp.title}
                </h3>
                <p className="text-gray-400 mb-2">
                  {exp.company} | {exp.period}
                </p>
                <ul
                  className={`
                list-disc pl-5 space-y-2 transition-all duration-300 
                ${hoveredExperience === index ? "text-white" : "text-gray-500"}
              `}
                >
                  {exp.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* experiences  */}

        {/* projects */}
        <section ref={combinedProjectsRef} className="mb-16 overflow-hidden">
          <h2 className="text-2xl font-bold mb-4">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`
               bg-gray-900 p-6 rounded-lg cursor-pointer m-1
               transition-all ease-in-out
               hover:shadow-[0_0_15px_5px_rgba(45,212,191,0.3)]
               ${
                 projectsSectionVisible
                   ? "opacity-100 translate-x-0"
                   : "opacity-0 translate-x-full"
               }
             `}
                style={{
                  "--transition-duration-transform": "1500ms",
                  "--transition-duration-glow": "200ms",
                  transitionDuration:
                    "var(--transition-duration-transform), var(--transition-duration-transform), var(--transition-duration-glow)",
                  transitionProperty: "transform, opacity, box-shadow",
                  transitionDelay: `${index * 100}ms, ${index * 100}ms, 0ms`,
                }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-800 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white hover:text-teal-300 transition-colors duration-300"
                >
                  <ExternalLink className="mr-2" size={16} /> View Project
                </a>
              </div>
            ))}
          </div>
        </section>

        <section ref={sectionRefs.contact} className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          {/* ... contact content ... */}
          <p className="text-gray-400 mb-8 max-w-xl">
            abdkokash.ak@gmail.com
            <br></br>
            +1 (585)-351-9582
          </p>
        </section>
      </main>

      <footer className="mt-16 text-center text-gray-400">
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://github.com/akokash99"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <Github />
          </a>
          <a
            href="https://linkedin.com/in/akokash"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <Linkedin />
          </a>
        </div>
        <p>Designed & Built by Abdallah Kokash</p>
      </footer>
    </div>
  );
};

export default Portfolio;
