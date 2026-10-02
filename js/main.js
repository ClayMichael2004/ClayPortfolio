/**
 * MICHAEL CLAY — PORTFOLIO JAVASCRIPT
 * High-fidelity interactive features:
 * 1. "You" Cursor Follower tracking cursor
 * 2. Hamburger Drawer menu (slide-in from right)
 * 3. Project detail modal view
 * 4. View More projects toggle
 * 5. Smooth back-to-top and navigation scrolling
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. CUSTOM CURSOR FOLLOWER ("You" badge)
     Tracks mouse movement smoothly across the desktop screen
     ========================================================================== */
  const cursorFollower = document.getElementById('custom-cursor-follower');
  
  if (cursorFollower && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let isVisible = false;

    // Direct movement tracking
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!isVisible) {
        cursorFollower.style.opacity = '1';
        isVisible = true;
      }

      // Position the follower just offset from the real cursor (as shown in screenshots)
      cursorFollower.style.transform = `translate3d(${mouseX + 2}px, ${mouseY + 2}px, 0)`;
    });

    document.addEventListener('mouseleave', () => {
      cursorFollower.style.opacity = '0';
      isVisible = false;
    });

    document.addEventListener('mouseenter', () => {
      cursorFollower.style.opacity = '1';
      isVisible = true;
    });
  }

  /* ==========================================================================
     2. HAMBURGER NAVIGATION DRAWER (Hamburgerafter.png)
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navDrawer = document.getElementById('nav-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    navDrawer.classList.add('is-active');
    drawerOverlay.classList.add('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    navDrawer.setAttribute('aria-hidden', 'false');
    drawerOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    navDrawer.classList.remove('is-active');
    drawerOverlay.classList.remove('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    navDrawer.setAttribute('aria-hidden', 'true');
    drawerOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', openDrawer);
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Top Nav Scroll State (keeps hamburger and nav pristine at any scroll position)
  const topNav = document.getElementById('top-nav');
  if (topNav) {
    const handleNavScroll = () => {
      if (window.scrollY > 15) {
        topNav.classList.add('is-scrolled');
      } else {
        topNav.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();
  }

  /* ==========================================================================
     3. PROJECT DATA & INTERACTIVE MODAL (Projects.png)
     "when you click one is when you now get more info mon the project itself"
     ========================================================================== */
  const projectsData = {
    'queue-management-system': {
      title: 'Bank Queue Management & Booking System',
      subtitle: 'Automated Till Routing, Thermal Receipts & SMS Dispatch',
      image: 'assets/images/QMS2.png',
      tags: ['Full Stack', 'Database Design', 'Queue Engine', 'SMS Gateway', 'Operations Tech'],
      description: `
        <p>A bank-grade queue dispatch and appointment booking system designed to streamline branch walk-ins, automate customer routing across dedicated service tills, and reduce customer wait friction.</p>
        <p><strong>Highlights & Implementation:</strong></p>
        <ul>
          <li>Deterministic queue ticket generator with daily auto-resetting alpha-numeric sequences (e.g., A001 for Accounts, D002 for Deposits) routed directly to matched teller tills.</li>
          <li>Three-stage transactional status lifecycle (WAITING → SERVING → COMPLETED) ensuring strict state transitions across concurrent cashier desks.</li>
          <li>Automated SMS notification bridge and printable ESC/POS thermal receipt formatting for immediate walk-in verification.</li>
          <li>Role-based operational dashboards providing administrative oversight, real-time wait telemetry, and cashier service consoles.</li>
        </ul>
      `,
      liveUrl: '',
      codeUrl: 'https://github.com'
    },
    'ict-support-system': {
      title: 'ICT Support & Help Desk System',
      subtitle: 'Multi-Location Ticket Routing, 3-Tier RBAC & Audit Compliance',
      image: 'assets/images/ICTSTAFF.png',
      tags: ['Node.js', 'Express', 'MySQL', 'JWT / RBAC', 'REST API', 'Enterprise IT'],
      description: `
        <p>A full-stack enterprise help desk and ticket management platform engineered to automate multi-location IT support requests, streamline technician dispatch, and maintain strict audit accountability.</p>
        <p><strong>Highlights & Implementation:</strong></p>
        <ul>
          <li>Automated location-based dispatch engine that instantly maps incoming staff tickets to designated field support officers without manual triaging.</li>
          <li>Three-tier Role-Based Access Control (Admin, Officer, Staff) enforced at both route middleware and database query layers with stateless JWT authentication and bcrypt password salting.</li>
          <li>End-to-end ticket lifecycle (OPEN → IN_PROGRESS → CLOSED) paired with post-resolution star ratings, unread officer feedback counters, and optimized single-query SQL joins.</li>
          <li>Immutable write-ahead audit logging subsystem tracking all administrative mutations, user authentications, and ticket status changes for regulatory compliance.</li>
        </ul>
      `,
      liveUrl: '',
      codeUrl: 'https://github.com'
    },

    'toolzz-ai': {
      title: 'Toolzz AI — Minimalist Developer Suite',
      subtitle: 'Multi-Agent LLM Orchestration, Repository Auditing & Workflow Automation',
      image: 'assets/images/result.png',
      tags: ['React 19', 'Node.js / Express', 'Multi-Agent AI', 'Vite', 'Developer Tools', 'REST API'],
      description: `
        <p>A minimalist developer workspace engineered to accelerate software workflows with automated repository diagnostics, commit authoring, and intelligent code scaffolding.</p>
        <p><strong>Highlights & Implementation:</strong></p>
        <ul>
          <li>Multi-agent AI routing engine with automatic failover across free cloud providers (Groq Llama 3.3 70B, OpenRouter, and Google Gemini) to eliminate 429 rate-limit interruptions.</li>
          <li>In-memory ZIP repository inspector analyzing project health, testing density, file-tree hierarchies, and automated structured README generation.</li>
          <li>AST/directory hierarchy parser converting ASCII project trees into executable Bash, PowerShell, and Node.js folder scaffolding scripts.</li>
          <li>Zero-clutter obsidian dark design system (#09090b) built with React 19, Tailwind CSS, Lucide icons, and stateless privacy-first upload lifecycles.</li>
        </ul>
      `,
      liveUrl: '',
      codeUrl: 'https://github.com/ClayMichael2004/toolzz'
    },
    'nemo': {
      title: 'Nemo X KijaniSpace & SpaceIoT',
      subtitle: 'Lake Victoria Aquaculture Digital Twin & Copernicus Earth Observation',
      image: 'assets/images/Nemo.jpeg',
      tags: ['Digital Twin', 'IoT & Embedded', 'Copernicus EO', 'WebGL / Three.js', 'Go', 'Telecom SMS/USSD'],
      description: `
        <p>A real-time 3D WebGL Digital Twin and satellite Earth Observation platform for smart offshore fish cage aquaculture monitoring and theft deterrence across Lake Victoria.</p>
        <p><strong>Highlights & Implementation:</strong></p>
        <ul>
          <li>Edge IoT deployment (ESP32-S3 / WaziDev & SIM7080G Cat-M1) featuring acoustic signal flight-time analysis for anti-theft raid detection and automated servo wiper biofouling cleaning on galvanic Dissolved Oxygen probes.</li>
          <li>Copernicus Sentinel-2 & Sentinel-3 satellite pipeline generating real-time spatial heatmaps for dissolved oxygen depletion (< 3.5 mg/L), chlorophyll-a algal blooms, and water hyacinth encroachment.</li>
          <li>Concurrent Go backend managing low-latency telemetry ingestion, cage relocation protocols, and high-frequency Canvas telemetry analytics at 60fps.</li>
          <li>Inclusive rural telecom bridge via Africa's Talking USSD (*483#) and automated SMS emergency dispatch for fishermen with low-bandwidth feature phones.</li>
        </ul>
      `,
      liveUrl: '',
      codeUrl: 'https://github.com'
    },
    'angaguard': {
      title: 'AngaGuard (AngaGuard dMRV)',
      subtitle: 'IoT Biochar Pyrolysis, Carbon Ledger, Kenya NCR & M-Pesa Integration',
      image: 'assets/images/angaguard.jpeg',
      tags: ['ClimateTech', 'IoT & Embedded', 'Go', 'LoRaWAN', 'FinTech / M-Pesa', 'dMRV'],
      description: `
        <p>A decentralized digital Monitoring, Reporting, and Verification (dMRV) climate-tech platform converting smallholder agricultural waste into certified carbon removal credits across Kenya.</p>
        <p><strong>Highlights & Implementation:</strong></p>
        <ul>
          <li>Edge telemetry firmware running on low-cost kiln nodes with multi-modal physics gating (ultrasonic volume loss and Steinhart-Hart thermal kinetics) to eliminate ash cheating and sand padding.</li>
          <li>Cryptographic Go backend providing append-only SHA-256 audit ledgers strictly aligned with Kenya's Climate Change (Carbon Markets) Regulations 2024 and DNA Letter of No Objection (LONO) workflows.</li>
          <li>Automated M-Pesa Daraja B2C revenue split engine enforcing the statutory 40% Community Development Trust Fund, direct farmer payouts, and cooperative operational reserves.</li>
          <li>Accessibility layer featuring Africa's Talking USSD (*384*55#) and Swahili voice AI for rural smallholders, paired with an institutional 3D digital twin dashboard.</li>
              </ul>
            `,
      liveUrl: '',
      codeUrl: 'https://github.com'
    },
    'digicow': {
      title: 'DigiCow AI — Farmer Intelligence System',
      subtitle: 'Knowledge Graph & Generative AI Decision Support for Agri-Extension Agents',
      image: 'assets/images/digicow2.png',
      tags: ['AgriTech', 'Neo4j', 'Knowledge Graph', 'Python / Flask', 'Generative AI', 'REST API'],
      description: `
        <p>An AI-powered decision support platform built for the Kenya AI Challenge 2026 (Mercy Corps AgriFin track) to equip youth extension agents with data-driven, personalized advisory workflows for smallholder dairy farmers.</p>
        <p><strong>Highlights & Implementation:</strong></p>
        <ul>
          <li>Connected Neo4j graph database modeling multidimensional farm relations across livestock profiles, cattle pathology, soil characteristics, and targeted clinical advisory paths.</li>
          <li>RESTful Flask backend integrating Featherless AI LLM reasoning to synthesize contextual clinical treatment and soil remediation recommendations on demand.</li>
          <li>Dynamic farmer prioritization engine ranking smallholder visit urgency based on risk severity, disease spread, and historical productivity deficits.</li>
          <li>Cross-platform integration serving real-time analytics to a web portal alongside automated structured data exports (CSV and PDF reporting).</li>
        </ul>
      `,
      liveUrl: '',
      codeUrl: 'https://github.com/Moraa021/digicow-ai-farmer-intelligence'
    },
    'judiciary-records': {
      title: 'Judiciary E-Records Assistant',
      subtitle: 'Judicial Service Commission Kenya Digital Records Workflow',
      image: 'assets/images/project-1.png',
      tags: ['Enterprise Software', 'Government Tech', 'Security', 'Database Architecture'],
      description: `
        <p>A digitized case tracking and administrative workflow assistant deployed to enhance operational efficiency across courts under the Judicial Service Commission Kenya.</p>
        <p><strong>Highlights & Implementation:</strong></p>
        <ul>
          <li>Fast indexed query interface handling hundreds of thousands of judicial record archives.</li>
          <li>Role-based access control complying with Kenyan data protection guidelines and court standards.</li>
        </ul>
      `,
      liveUrl: 'https://www.judiciary.go.ke',
      codeUrl: 'https://github.com'
    },
  };

  const projectModalBackdrop = document.getElementById('project-modal-backdrop');
  const projectModalCard = document.getElementById('project-modal-card');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-project-img');
  const modalTitle = document.getElementById('modal-project-title');
  const modalSubtitle = document.getElementById('modal-project-subtitle');
  const modalTags = document.getElementById('modal-project-tags');
  const modalDesc = document.getElementById('modal-project-description');
  const modalLiveLink = document.getElementById('modal-live-link');
  const modalCodeLink = document.getElementById('modal-code-link');

  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalDesc.innerHTML = data.description;

    modalTags.innerHTML = data.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('');
    modalLiveLink.href = data.liveUrl;
    modalCodeLink.href = data.codeUrl;

    projectModalBackdrop.classList.add('is-active');
    projectModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModalBackdrop.classList.remove('is-active');
    projectModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Attach click listener to project cards
  function attachCardListeners() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-project-id');
        openProjectModal(id);
      });

      // Keyboard support
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = card.getAttribute('data-project-id');
          openProjectModal(id);
        }
      });
    });
  }

  attachCardListeners();

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModalBackdrop) {
    projectModalBackdrop.addEventListener('click', (e) => {
      if (e.target === projectModalBackdrop) {
        closeProjectModal();
      }
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeProjectModal();
    }
  });

  /* ==========================================================================
     4. VIEW MORE TOGGLE FOR PROJECTS & HACKATHONS
     "fix the see more button to work only if more are there and it should only show 3 of them
      then after pressing see more if there are more we see the others of which in this case
      there arent yet. same to hackathons"
     ========================================================================== */
  function setupViewMoreToggle(gridId, btnId, containerId, maxVisible = 3) {
    const grid = document.getElementById(gridId);
    const btn = document.getElementById(btnId);
    const container = document.getElementById(containerId);
    if (!grid) return;

    // Get all card elements inside this grid
    const cards = Array.from(grid.querySelectorAll('.project-card'));
    const totalCards = cards.length;

    // If total cards <= maxVisible (currently 3 for projects, 3 for hackathons),
    // hide the button container
    if (totalCards <= maxVisible) {
      if (container) container.style.display = 'none';
      if (btn) btn.style.display = 'none';
      return;
    }

    // If more than maxVisible exist, display the button and toggle extra items
    if (container) container.style.display = 'flex';
    if (btn) btn.style.display = 'inline-block';

    let isExpanded = false;

    function applyVisibility() {
      cards.forEach((card, index) => {
        if (index >= maxVisible) {
          card.style.display = isExpanded ? '' : 'none';
        } else {
          card.style.display = '';
        }
      });
    }

    // Initialize: hide cards beyond maxVisible
    applyVisibility();

    if (btn) {
      btn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        applyVisibility();
        btn.textContent = isExpanded ? 'SHOW LESS' : 'VIEW MORE';
        if (!isExpanded) {
          const sectionElem = grid.closest('section');
          if (sectionElem) {
            sectionElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    }
  }

  window.setupViewMoreToggle = setupViewMoreToggle;

  setupViewMoreToggle('projects-grid', 'view-more-btn', 'projects-view-more-container', 3);
  setupViewMoreToggle('hackathons-grid', 'view-more-hackathons-btn', 'hackathons-view-more-container', 3);

  /* ==========================================================================
     5. BACK TO TOP BUTTON
     Smooth scroll to top when clicked
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const backToTopText = document.getElementById('back-to-top-text');

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', scrollToTop);
  }

  if (backToTopText) {
    backToTopText.addEventListener('click', scrollToTop);
  }

});
