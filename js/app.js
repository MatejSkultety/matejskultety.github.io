// Main application class
class TeamProjectApp {
    constructor() {
        this.data = null;
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.renderAll();
            this.bindEvents();
        } catch (error) {
            console.error('Error initializing app:', error);
            this.showError('Nepodarilo sa načítať dáta projektu.');
        }
    }

    async loadData() {
        try {
            const response = await fetch('data/weeks.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.data = await response.json();
        } catch (error) {
            console.error('Error loading data:', error);
            // Fallback data if JSON fails to load
            this.data = this.getFallbackData();
        }
    }

    getFallbackData() {
        return {
            team: {
                name: "Chatbot (GPT) na vyhľadávanie v štruktúrovaných dátach",
                members: [
                    "Bc. Katarína Štofaniková",
                    "Bc. Boris Hnila",
                    "Bc. Matej Škultéty",
                    "Bc. Adam Zeman",
                    "Bc. Martin Klokočík"
                ],
                supervisor: "Marián Lekavý",
                documentation: "https://docs.google.com/document/d/1eJpGcQqRMPdtJohdd2-GSKKJUZY3I-dE5RxuG-63AaQ/edit?pli=1",
                github: "https://github.com/MatejSkultety/matejskultety.github.io"
            },
            weeks: [
                {
                    id: 1,
                    title: "Týždeň 1",
                    date: null,
                    type: "planning",
                    tasks: [
                        "Výber témy",
                        "Spracovanie a zaslanie ponuky zadávatelovi témy"
                    ],
                    participants: [],
                    documents: []
                },
                {
                    id: 2,
                    title: "Týždeň 2",
                    date: "29.9.2025",
                    type: "online",
                    tasks: [
                        "vytvoriť backlog",
                        "vytvoriť GitHub repozitár (6.10.2025)",
                        "vytvoriť dokumentáciu",
                        "vytvoriť webstránku",
                        "vytvoriť databázu z onsemi webstránky (10.10.2025)",
                        "výber GPT algoritmu (6.10.2025)",
                        "pridať licenciu do projektu",
                        "vytvoriť základnú dokumentáciu pre tímový projekt",
                        "vytvoriť základný náčrt UI"
                    ],
                    participants: [
                        "Bc. Katarína Štofaniková",
                        "Bc. Boris Hnila",
                        "Bc. Matej Škultéty",
                        "Bc. Adam Zeman",
                        "Bc. Martin Klokočík"
                    ],
                    documents: []
                }
            ]
        };
    }

    renderAll() {
        this.renderProjectTitle();
        this.renderTeamInfo();
        this.renderTimeline();
        this.renderDocuments();
    }

    renderProjectTitle() {
        const titleElement = document.getElementById('project-title');
        if (titleElement && this.data.team.name) {
            titleElement.textContent = this.data.team.name;
        }
    }

    renderTeamInfo() {
        const teamContainer = document.getElementById('team-info');
        if (!teamContainer) return;

        const teamHTML = `
            <div class="col-lg-4 mb-4">
                <div class="team-card">
                    <h4><i class="fas fa-users me-2"></i>Členovia tímu</h4>
                    <ul>
                        ${this.data.team.members.map(member => `<li>${member}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="col-lg-4 mb-4">
                <div class="team-card">
                    <h4><i class="fas fa-user-tie me-2"></i>Vedúci práce</h4>
                    <ul>
                        <li>${this.data.team.supervisor}</li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-4 mb-4">
                <div class="team-card">
                    <h4><i class="fas fa-link me-2"></i>Dôležité odkazy</h4>
                    <div class="d-grid gap-2">
                        <a href="${this.data.team.documentation}" target="_blank" class="btn btn-outline-primary btn-sm">
                            <i class="fas fa-file-alt me-2"></i>Dokumentácia
                        </a>
                        <a href="${this.data.team.github}" target="_blank" class="btn btn-outline-primary btn-sm">
                            <i class="fab fa-github me-2"></i>GitHub Repo
                        </a>
                    </div>
                </div>
            </div>
        `;

        teamContainer.innerHTML = teamHTML;
    }

    renderTimeline() {
        const timelineContainer = document.getElementById('timeline');
        if (!timelineContainer) return;

        const timelineHTML = this.data.weeks.map((week, index) => {
            const meetingTypeClass = this.getMeetingTypeClass(week.type);
            const meetingTypeText = this.getMeetingTypeText(week.type);
            
            return `
                <div class="timeline-item" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <div class="timeline-content">
                        <div class="d-flex align-items-center mb-3">
                            <h3 class="mb-0">${week.title}</h3>
                            ${week.date ? `<span class="timeline-date ms-auto">${week.date}</span>` : ''}
                        </div>
                        
                        ${week.type !== 'planning' ? `
                            <span class="timeline-meeting-type ${meetingTypeClass}">
                                <i class="fas fa-${this.getMeetingIcon(week.type)} me-1"></i>
                                ${meetingTypeText}
                            </span>
                        ` : ''}

                        ${week.participants && week.participants.length > 0 ? `
                            <div class="mt-3">
                                <h5><i class="fas fa-users me-2"></i>Zúčastnili sa:</h5>
                                <div class="participants-list">
                                    ${week.participants.map(participant => 
                                        `<span class="participant-tag">${participant}</span>`
                                    ).join('')}
                                </div>
                            </div>
                        ` : ''}

                        ${week.tasks && week.tasks.length > 0 ? `
                            <div class="mt-3">
                                <h5><i class="fas fa-tasks me-2"></i>Úlohy a aktivity:</h5>
                                <ul class="task-list">
                                    ${week.tasks.map(task => `<li>${task}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}

                        ${week.documents && week.documents.length > 0 ? `
                            <div class="mt-3">
                                <h5><i class="fas fa-file-alt me-2"></i>Dokumenty:</h5>
                                <div class="d-flex gap-2 flex-wrap">
                                    ${week.documents.map(doc => 
                                        `<button class="btn btn-sm btn-outline-primary" data-document="${doc}">
                                            ${doc}
                                        </button>`
                                    ).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');

        timelineContainer.innerHTML = timelineHTML;
    }

    renderDocuments() {
        const documentsContainer = document.getElementById('documents-info');
        if (!documentsContainer) return;

        const documentsHTML = `
            <div class="col-md-6 mb-4">
                <div class="document-card">
                    <div class="document-icon">
                        <i class="fas fa-file-alt"></i>
                    </div>
                    <h4>Dokumentácia</h4>
                    <p>Kompletná projektová dokumentácia s opisom riešenia a postupov.</p>
                    <a href="${this.data.team.documentation}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-external-link-alt me-2"></i>Otvoriť
                    </a>
                </div>
            </div>
            <div class="col-md-6 mb-4">
                <div class="document-card">
                    <div class="document-icon">
                        <i class="fab fa-github"></i>
                    </div>
                    <h4>GitHub Repository</h4>
                    <p>Zdrojový kód projektu, issue tracking a verzie aplikácie.</p>
                    <a href="${this.data.team.github}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-external-link-alt me-2"></i>Zobraziť kód
                    </a>
                </div>
            </div>
        `;

        documentsContainer.innerHTML = documentsHTML;
    }

    getMeetingTypeClass(type) {
        const classes = {
            'online': 'bg-info',
            'offline': 'bg-success',
            'presentation': 'bg-warning',
            'planning': 'bg-secondary'
        };
        return classes[type] || 'bg-secondary';
    }

    getMeetingTypeText(type) {
        const texts = {
            'online': 'Online stretnutie',
            'offline': 'Osobné stretnutie',
            'presentation': 'Prezentácia',
            'planning': 'Plánovanie'
        };
        return texts[type] || 'Stretnutie';
    }

    getMeetingIcon(type) {
        const icons = {
            'online': 'video',
            'offline': 'handshake',
            'presentation': 'presentation',
            'planning': 'clipboard-list'
        };
        return icons[type] || 'calendar';
    }

    bindEvents() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Document buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-document]')) {
                const docName = e.target.getAttribute('data-document');
                this.showDocument(docName);
            }
        });

        // Navbar collapse on link click (mobile)
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });
    }

    showDocument(docName) {
        // This would show a modal or redirect to document
        console.log('Showing document:', docName);
        // Implementation would depend on your document storage/display strategy
    }

    showError(message) {
        const errorHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        // Add error to top of main content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.insertAdjacentHTML('afterbegin', errorHTML);
        }
    }

    // Method to add new week (for future use)
    addWeek(weekData) {
        if (this.data && this.data.weeks) {
            this.data.weeks.push(weekData);
            this.renderTimeline();
        }
    }

    // Method to update team info (for future use)
    updateTeamInfo(teamData) {
        if (this.data && this.data.team) {
            this.data.team = { ...this.data.team, ...teamData };
            this.renderTeamInfo();
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.teamProjectApp = new TeamProjectApp();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TeamProjectApp;
}