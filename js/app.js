// Main application class
class TeamProjectApp {
    constructor() {
        this.data = null;
        this.selectedSemester = 'summer';
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
            this.data = this.normalizeData(await response.json());
        } catch (error) {
            console.error('Error loading data:', error);
            this.data = this.normalizeData(this.getFallbackData());
        }
    }

    normalizeData(data) {
        if (data.semesters) {
            return data;
        }

        if (Array.isArray(data.weeks)) {
            return {
                ...data,
                semesters: {
                    winter: {
                        label: 'Zimný semester',
                        weeks: data.weeks
                    },
                    summer: {
                        label: 'Letný semester',
                        weeks: []
                    }
                }
            };
        }

        return data;
    }

    getFallbackData() {
        return {
            team: {
                name: 'Použitie veľkých jazykových modelov (LLM) pre extrakciu technických parametrov z technickej dokumentácie',
                members: [
                    'Bc. Katarína Štofaniková',
                    'Bc. Boris Hnila',
                    'Bc. Matej Škultéty',
                    'Bc. Adam Zeman',
                    'Bc. Martin Klokočík'
                ],
                supervisor: 'Marián Lekavý',
                documentation: 'https://docs.google.com/document/d/1eJpGcQqRMPdtJohdd2-GSKKJUZY3I-dE5RxuG-63AaQ/edit?pli=1',
                github: 'https://github.com/MatejSkultety/matejskultety.github.io'
            },
            semesters: {
                winter: {
                    label: 'Zimný semester',
                    weeks: []
                },
                summer: {
                    label: 'Letný semester',
                    weeks: []
                }
            }
        };
    }

    getSemesterConfig() {
        if (!this.data || !this.data.semesters) {
            return { key: 'summer', label: 'Letný semester', weeks: [] };
        }

        const semester = this.data.semesters[this.selectedSemester] || this.data.semesters.summer || this.data.semesters.winter;

        return {
            key: this.selectedSemester,
            label: semester?.label || (this.selectedSemester === 'winter' ? 'Zimný semester' : 'Letný semester'),
            weeks: semester?.weeks || []
        };
    }

    setSemester(semesterKey) {
        if (!this.data || !this.data.semesters || !this.data.semesters[semesterKey]) {
            return;
        }

        this.selectedSemester = semesterKey;
        this.renderSemesterSwitcher();
        this.renderTimeline();
    }

    renderSemesterSwitcher() {
        const semesterTitle = document.getElementById('semester-title');
        const semesterButtons = document.querySelectorAll('[data-semester]');
        const currentSemester = this.getSemesterConfig();

        if (semesterTitle) {
            semesterTitle.textContent = currentSemester.label;
        }

        semesterButtons.forEach(button => {
            const isActive = button.getAttribute('data-semester') === this.selectedSemester;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
    }

    renderAll() {
        this.renderProjectTitle();
        this.renderTeamInfo();
        this.renderSemesterSwitcher();
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
                        <a href="${this.data.team.project_tracker}" target="_blank" class="btn btn-outline-primary btn-sm">
                            <i class="fas fa-tasks me-2"></i>Project Tracker
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

        const currentSemester = this.getSemesterConfig();
        const weeks = currentSemester.weeks || [];

        if (weeks.length === 0) {
            timelineContainer.innerHTML = `
                <div class="text-center py-5 text-muted">
                    <i class="fas fa-calendar-alt display-6 d-block mb-3"></i>
                    <p class="mb-0">Pre ${currentSemester.label.toLowerCase()} zatiaľ nie sú dostupné žiadne týždenné záznamy.</p>
                </div>
            `;
            return;
        }

        const timelineHTML = weeks.map((week, index) => {
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
                                    ${week.participants.map(participant => `<span class="participant-tag">${participant}</span>`).join('')}
                                </div>
                            </div>
                        ` : ''}

                        <div class="mt-3">
                            <h5><i class="fas fa-list me-2"></i>Aktivity:</h5>
                            <ul class="activity-list">
                                ${(week.activities && week.activities.length > 0)
                                    ? week.activities.map(activity => `<li>${activity}</li>`).join('')
                                    : '<li>Žiadne aktivity zaznamenané.</li>'}
                            </ul>
                        </div>
                        ${week.tasks && week.tasks.length > 0 ? `
                            <div class="mt-3">
                                <h5><i class="fas fa-tasks me-2"></i>Úlohy:</h5>
                                <ul class="task-list">
                                    ${week.tasks.map(task => `<li>${task}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}

                        ${week.documents && week.documents.length > 0 ? `
                            <div class="mt-3">
                                <h5><i class="fas fa-file-alt me-2"></i>Dokumenty:</h5>
                                <div class="d-flex gap-2 flex-wrap">
                                    ${week.documents.map(doc => `
                                        <a class="btn btn-sm btn-outline-primary" href="${doc.url}" target="_blank">
                                            <i class="fas fa-link me-1"></i>${doc.title}
                                        </a>
                                    `).join('')}
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
            online: 'bg-info',
            offline: 'bg-success',
            presentation: 'bg-warning',
            planning: 'bg-secondary'
        };
        return classes[type] || 'bg-secondary';
    }

    getMeetingTypeText(type) {
        const texts = {
            online: 'Online stretnutie',
            offline: 'Osobné stretnutie',
            presentation: 'Prezentácia',
            planning: 'Plánovanie',
            canceled: 'Zrušené stretnutie'
        };
        return texts[type] || 'Stretnutie';
    }

    getMeetingIcon(type) {
        const icons = {
            online: 'video',
            offline: 'handshake',
            presentation: 'presentation',
            planning: 'clipboard-list'
        };
        return icons[type] || 'calendar';
    }

    bindEvents() {
        document.querySelectorAll('[data-semester]').forEach(button => {
            button.addEventListener('click', () => {
                this.setSemester(button.getAttribute('data-semester'));
            });
        });

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
        console.log('Showing document:', docName);
    }

    showError(message) {
        const errorHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;

        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.insertAdjacentHTML('afterbegin', errorHTML);
        }
    }

    addWeek(weekData) {
        const semester = this.getSemesterConfig();

        if (this.data && this.data.semesters && this.data.semesters[semester.key]) {
            this.data.semesters[semester.key].weeks.push(weekData);
            this.renderTimeline();
        }
    }

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