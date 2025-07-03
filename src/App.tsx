import { useEffect, useRef, useState } from 'react';
import './App.css';
import ProfilePic from './assets/profile.jpg'; // Placeholder, user should replace with their own
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaSun, FaMoon, FaReact, FaNodeJs, FaDatabase, FaJs, FaBars, FaTimes } from 'react-icons/fa';

// ProjectModal component
function ProjectModal({ open, onClose, project }: { open: boolean, onClose: () => void, project: any }) {
  if (!open || !project) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>{project.title}</h2>
        <div style={{ marginBottom: 8 }}>{project.tech}</div>
        <div style={{ marginBottom: 12 }}>{project.details}</div>
        {/* Placeholder for screenshot or demo */}
        {project.screenshot && <img src={project.screenshot} alt="screenshot" style={{ width: '100%', borderRadius: 8, marginBottom: 12 }} />}
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="github-btn" style={{ marginTop: 8 }}>
          <FaGithub /> GitHub
        </a>
        {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="github-btn" style={{ marginLeft: 12, marginTop: 8 }}>Live Demo</a>}
      </div>
    </div>
  );
}

function App() {
  // Theme toggle
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Section animation on scroll
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.section, .experience-item, .education-item, .project-item, .section.contact-section').forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Scrollspy for navbar
  useEffect(() => {
    const sections = [
      'about',
      'experience',
      'education',
      'projects',
      'skills',
      'achievements',
      'contact',
    ];
    const navLinks = document.querySelectorAll('.navbar a');
    const onScroll = () => {
      let current = '';
      for (const id of sections) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            current = id;
            break;
          }
        }
      }
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Parallax balls effect
  const ballsBgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const balls = ballsBgRef.current?.querySelectorAll('.ball');
      if (!balls) return;
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      balls.forEach((ball, i) => {
        const factor = (i + 1) * 10;
        (ball as HTMLElement).style.transform = `translateY(0) scale(1) translate(${x * factor}px, ${y * factor}px)`;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typewriter effect for subtitle
  const typewriterTexts = [
    'Aspiring Software & App Developer',
    'Full Stack Web Developer',
    'React | Node | Express | SQL | JS',
  ];
  const [typeIdx, setTypeIdx] = useState(0);
  const [typed, setTyped] = useState('');
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let current = typewriterTexts[typeIdx];
    if (typed.length < current.length) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 60);
    } else {
      timeout = setTimeout(() => {
        setTyped('');
        setTypeIdx((typeIdx + 1) % typewriterTexts.length);
      }, 1200);
    }
    return () => clearTimeout(timeout);
  }, [typed, typeIdx]);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState<any>(null);

  // Project data for modal
  const projects = [
    {
      title: 'LuxStay',
      github: 'https://github.com/5amyuktha/LuxStay-A-Full-Stack-Hotel-Booking-Website',
      tech: 'React, Node.js, Express.js, PostgreSQL',
      details: (
        <ul>
          <li>Built a responsive full-stack hotel booking website with secure JWT-based authentication and seamless room booking.</li>
          <li>Managed users, rooms, and bookings using a relational PostgreSQL database; styled with a luxurious UI theme.</li>
        </ul>
      ),
      screenshot: '',
      demo: '',
    },
    {
      title: 'Best Bike Day',
      github: 'https://github.com/5amyuktha/Best-Bike-Day',
      tech: 'Kotlin, Jetpack Compose, Ktor, OpenWeatherMap API',
      details: (
        <ul>
          <li>Built a real-world weather app to help bikers plan rides by predicting rain, temperature, and humidity.</li>
          <li>Cross-platform support for Android and web using Kotlin and Ktor with live data from OpenWeatherMap API.</li>
        </ul>
      ),
      screenshot: '',
      demo: '',
    },
    {
      title: 'Assignment Marketplace',
      github: 'https://github.com/5amyuktha/Assignment_Marketplace',
      tech: 'JavaScript, CSS, HTML, Node.js, Express',
      details: (
        <ul>
          <li>Assignment Marketplace is a platform designed to connect students with local experts who can help with assignments.</li>
          <li>Provides a convenient solution for students who need assistance with their academic tasks.</li>
          <li>Features: Task browsing, expert announcements, secure communication, and a user-friendly interface.</li>
          <li>Developed with a focus on accessibility and real-world usability for students and experts alike.</li>
        </ul>
      ),
      screenshot: '',
      demo: '',
    },
    {
      title: 'Keeper',
      github: 'https://github.com/5amyuktha/Keeper',
      tech: 'HTML, CSS, JavaScript',
      details: (
        <ul>
          <li>Keeper is a simple and effective note-taking web app inspired by Google Keep.</li>
          <li>Allows users to add, view, and delete notes in a clean, organized interface.</li>
          <li>Built with a focus on usability and minimalism for quick note management.</li>
        </ul>
      ),
      screenshot: '',
      demo: '',
    },
    {
      title: 'SimonGame',
      github: 'https://github.com/5amyuktha/SimonGame',
      tech: 'HTML, CSS, JavaScript',
      details: (
        <ul>
          <li>SimonGame is a memory-based color sequence game that challenges players to repeat an increasingly long pattern of lights and sounds.</li>
          <li>Features interactive gameplay, sound effects, and a responsive design for all devices.</li>
          <li>Great for improving memory and concentration skills in a fun way.</li>
        </ul>
      ),
      screenshot: '',
      demo: '',
    },
    {
      title: 'BandGenerator',
      github: 'https://github.com/5amyuktha/Band_Generator',
      tech: 'JavaScript, EJS, CSS',
      details: (
        <ul>
          <li>BandGenerator is a fun web app that generates random, creative band names for users.</li>
          <li>Users can get inspiration for band names and enjoy a playful, interactive experience.</li>
          <li>Built with a simple UI and quick name generation logic for entertainment purposes.</li>
        </ul>
      ),
      screenshot: '',
      demo: '',
    },
  ];

  // Timeline animation for experience/education
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.timeline-item').forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Hamburger menu state
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="balls-bg parallax" ref={ballsBgRef}>
        <div className="ball ball1"></div>
        <div className="ball ball2"></div>
        <div className="ball ball3"></div>
        <div className="ball ball4"></div>
        <div className="ball ball5"></div>
      </div>
      <div className="portfolio-container">
        {/* Header Section */}
        <header className="header">
          <div className="profile-pic-container" style={{ position: 'relative' }}>
            <img src={ProfilePic} alt="Samyuktha Nakirikanti" className="profile-pic" />
            <div className="floating-icons">
              <span className="floating-icon floating-icon1"><FaReact /></span>
              <span className="floating-icon floating-icon2"><FaNodeJs /></span>
              <span className="floating-icon floating-icon3"><FaDatabase /></span>
              <span className="floating-icon floating-icon4"><FaJs /></span>
            </div>
          </div>
          <div className="header-content">
            <h1>Samyuktha Nakirikanti</h1>
            <span className="typewriter">{typed}</span>
            <div className="contact-info">
              <a href="tel:+919392649468" title="Phone"><FaPhone /> +91 9392649468</a>
              <a href="mailto:nakirikantisamyuktha@gmail.com" title="Email"><FaEnvelope /> nakirikantisamyuktha@gmail.com</a>
              <a href="https://www.linkedin.com/in/samyukthanakirikanti" target="_blank" rel="noopener noreferrer" title="LinkedIn"><FaLinkedin /> LinkedIn</a>
              <a href="https://github.com/5amyuktha" target="_blank" rel="noopener noreferrer" title="GitHub"><FaGithub /> GitHub</a>
              <button
                className="theme-toggle-btn"
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                style={{ marginLeft: 16, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem', color: 'var(--accent)' }}
              >
                {theme === 'light' ? <FaMoon /> : <FaSun />}
              </button>
            </div>
          </div>
          {/* Hamburger icon for mobile */}
          <button
            className="hamburger-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
            style={{ display: 'none' }}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </header>

        {/* Navigation Bar */}
        <nav className={`navbar${menuOpen ? ' open' : ''}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#education" onClick={() => setMenuOpen(false)}>Education</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#achievements" onClick={() => setMenuOpen(false)}>Achievements</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>

        {/* About Section */}
        <section id="about" className="section">
          <h2>Professional Summary</h2>
          <p>
            Aspiring Software Developer and App Developer seeking opportunities in frontend, full-stack development and App Development. Dedicated, hardworking, and skilled in Java, JavaScript, SQL, and frameworks like React, Node, and Express. Passionate about building user-friendly applications and continuously enhancing problem-solving skills. Eager to contribute and grow in a dynamic development environment.
          </p>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section">
          <h2>Experience</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <h3>Software Developer & App Developer Intern</h3>
              <span className="exp-date">May 2025 – Present</span>
              <div className="exp-location">YugaYatra OPC Pvt. Ltd., Bengaluru, Karnataka, India</div>
              <ul>
                <li>Contributing to the development of scalable web and mobile applications in a startup environment.</li>
                <li>Building user-friendly interfaces and backend services using modern technologies.</li>
                <li>Collaborating with cross-functional teams to implement features and improve performance.</li>
              </ul>
              <div className="timeline-line"></div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <h3>Full Stack Web Developer</h3>
              <span className="exp-date">2025 – Present</span>
              <div className="exp-location">Qveto Technologies, Bangalore, Karnataka, India</div>
              <ul>
                <li>Developed and maintained scalable web applications using React, Node.js, and Express.</li>
                <li>Designed and implemented RESTful APIs and integrated third-party services for enhanced functionality.</li>
                <li>Collaborated with UI/UX designers to deliver responsive, user-friendly interfaces.</li>
                <li>Optimized application performance and ensured robust security practices across the stack.</li>
              </ul>
              <div className="timeline-line"></div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <h3>Software Development Intern</h3>
              <span className="exp-date">Feb 2023 – May 2023</span>
              <div className="exp-location">R Square Educational Services, Hyderabad, Telangana</div>
              <ul>
                <li>Worked on a frontend project focusing on responsive UI/UX design.</li>
                <li>Gained hands-on experience in HTML, CSS, and JavaScript.</li>
                <li>Learned best practices in code structuring, debugging, and optimization.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="section">
          <h2>Education</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <h3>Malla Reddy Engineering College (MREC)</h3>
              <span className="edu-date">2022 – Present</span>
              <div className="edu-location">Hyderabad, Telangana</div>
              <div>Bachelor of Technology in Computer Science (Cyber Security) <b>(CGPA: 9.17)</b></div>
              <div className="timeline-line"></div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <h3>New Science Junior College</h3>
              <span className="edu-date">2020 – 2022</span>
              <div className="edu-location">Kodad, Telangana</div>
              <div>Telangana State Board (98.6%)</div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <h2>Projects</h2>
          {projects.map((project /*, idx*/) => (
            <div className="project-item" key={project.title} onClick={() => { setModalProject(project); setModalOpen(true); }} style={{ cursor: 'pointer' }}>
              <h3>{project.title} <span className="github-btn" style={{ pointerEvents: 'none', marginLeft: 8 }}><FaGithub /> GitHub</span></h3>
              <div className="project-tech">{project.tech}</div>
              {project.details}
            </div>
          ))}
        </section>
        <ProjectModal open={modalOpen} onClose={() => setModalOpen(false)} project={modalProject} />

        {/* Skills Section */}
        <section id="skills" className="section">
          <h2>Technical Skills</h2>
          <ul className="skills-list">
            <li><b>Languages:</b> C, Java, HTML, CSS, JavaScript, PostgreSQL, Kotlin</li>
            <li><b>Frameworks:</b> Node, Express, React, Bootstrap</li>
            <li><b>Database:</b> MySQL, PostgreSQL, MongoDB, NeonConsole</li>
            <li><b>Developer Tools:</b> VSCode, Git, Postman, GitHub, AWS</li>
          </ul>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="section">
          <h2>Achievements and Certifications</h2>
          <ul>
            <li>Runners-up in Web Design at <b>AKSHARA 2023</b>; participated in multiple tech events and hackathons including <b>CodeChef Hackathon</b> and <b>AKSHARA 2024</b>.</li>
            <li>Certified in <b>C Programming</b>, <b>Python for Everybody</b> (Coursera), <b>Frontend Development with React</b> (freeCodeCamp), and <b>UI/UX Design</b> (Udemy).</li>
            <li>Completed the <b>Full-Stack Web Development Bootcamp</b> and followed the <b>Frontend Developer Roadmap</b>.</li>
            <li>Served as an Executive Member of <b>Street Social Service Club</b>, MREC.</li>
          </ul>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact-section">
          <h2>Contact Me</h2>
          <form className="contact-form" onSubmit={e => { e.preventDefault(); alert('Thank you for reaching out! I will get back to you soon.'); }}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your Name" required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Your Email" required />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} placeholder="Your Message" required></textarea>

            <button type="submit">Send Message</button>
          </form>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Samyuktha Nakirikanti. All rights reserved.</p>
        </footer>

        {/* SVG Waves at the very bottom */}
        <svg className="svg-waves" viewBox="0 0 1440 220" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 120 Q 360 220 720 120 T 1440 120 V220 H0Z" fill="#7ed6df" opacity="0.5">
            <animate attributeName="d" dur="8s" repeatCount="indefinite"
              values="M0 120 Q 360 220 720 120 T 1440 120 V220 H0Z;
                      M0 180 Q 360 80 720 180 T 1440 180 V220 H0Z;
                      M0 120 Q 360 220 720 120 T 1440 120 V220 H0Z" />
          </path>
          <path d="M0 180 Q 360 80 720 180 T 1440 180 V220 H0Z" fill="#686de0" opacity="0.4">
            <animate attributeName="d" dur="10s" repeatCount="indefinite"
              values="M0 180 Q 360 80 720 180 T 1440 180 V220 H0Z;
                      M0 120 Q 360 220 720 120 T 1440 120 V220 H0Z;
                      M0 180 Q 360 80 720 180 T 1440 180 V220 H0Z" />
          </path>
          <path d="M0 200 Q 360 160 720 200 T 1440 200 V220 H0Z" fill="#f6e58d" opacity="0.3">
            <animate attributeName="d" dur="12s" repeatCount="indefinite"
              values="M0 200 Q 360 160 720 200 T 1440 200 V220 H0Z;
                      M0 220 Q 360 180 720 220 T 1440 220 V220 H0Z;
                      M0 200 Q 360 160 720 200 T 1440 200 V220 H0Z" />
          </path>
        </svg>
      </div>
    </>
  );
}

export default App;


