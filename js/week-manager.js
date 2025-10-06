// Week Management Utilities
class WeekManager {
    constructor() {
        this.weeks = [];
    }

    // Template for new week
    createWeekTemplate(weekNumber, date = null) {
        return {
            id: weekNumber,
            title: `Týždeň ${weekNumber}`,
            date: date,
            type: "online", // online, offline, presentation, planning
            tasks: [],
            participants: [
                "Bc. Katarína Štofaniková",
                "Bc. Boris Hnila",
                "Bc. Matej Škultéty",
                "Bc. Adam Zeman",
                "Bc. Martin Klokočík"
            ],
            documents: [],
            notes: "",
            futureWork: []
        };
    }

    // Add new week
    addWeek(weekData) {
        const week = { ...this.createWeekTemplate(this.weeks.length + 1), ...weekData };
        this.weeks.push(week);
        return week;
    }

    // Update existing week
    updateWeek(weekId, updates) {
        const weekIndex = this.weeks.findIndex(week => week.id === weekId);
        if (weekIndex !== -1) {
            this.weeks[weekIndex] = { ...this.weeks[weekIndex], ...updates };
            return this.weeks[weekIndex];
        }
        return null;
    }

    // Get week by ID
    getWeek(weekId) {
        return this.weeks.find(week => week.id === weekId);
    }

    // Get all weeks
    getAllWeeks() {
        return this.weeks;
    }

    // Export to JSON
    exportToJSON() {
        return JSON.stringify({
            team: {
                name: "Použitie veľkých jazykových modelov (LLM) pre extrakciu technických parametrov z technickej dokumentácie",
                members: [
                    "Bc. Katarína Štofaniková",
                    "Bc. Boris Hnila",
                    "Bc. Matej Škultéty",
                    "Bc. Adam Zeman",
                    "Bc. Martin Klokočík"
                ],
                supervisor: "Marián Lekavý",
                documentation: "https://docs.google.com/",
                github: "https://github.com/MatejSkultety/matejskultety.github.io"
            },
            weeks: this.weeks
        }, null, 2);
    }

    // Import from JSON
    importFromJSON(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            if (data.weeks && Array.isArray(data.weeks)) {
                this.weeks = data.weeks;
                return true;
            }
        } catch (error) {
            console.error('Error importing JSON:', error);
        }
        return false;
    }

    // Validate week data
    validateWeek(weekData) {
        const required = ['id', 'title', 'type'];
        const missing = required.filter(field => !weekData[field]);
        
        if (missing.length > 0) {
            throw new Error(`Missing required fields: ${missing.join(', ')}`);
        }

        const validTypes = ['online', 'offline', 'presentation', 'planning'];
        if (!validTypes.includes(weekData.type)) {
            throw new Error(`Invalid meeting type. Must be one of: ${validTypes.join(', ')}`);
        }

        return true;
    }

    // Quick add methods for common week types
    addOnlineMeeting(weekNumber, date, tasks = []) {
        return this.addWeek({
            id: weekNumber,
            title: `Týždeň ${weekNumber}`,
            date: date,
            type: "online",
            tasks: tasks
        });
    }

    addOfflineMeeting(weekNumber, date, tasks = []) {
        return this.addWeek({
            id: weekNumber,
            title: `Týždeň ${weekNumber}`,
            date: date,
            type: "offline",
            tasks: tasks
        });
    }

    addPresentation(weekNumber, date, title = null) {
        return this.addWeek({
            id: weekNumber,
            title: title || `Prezentácia - Týždeň ${weekNumber}`,
            date: date,
            type: "presentation",
            tasks: [
                "Prezentácia výsledkov",
                "Získanie spätnej väzby",
                "Diskusia o ďalšom postupe"
            ]
        });
    }
}

// Usage examples (for console testing):
/*
const manager = new WeekManager();

// Add week 3
manager.addOnlineMeeting(3, "6.10.2023", [
    "research GPT algoritmov a alternatív",
    "výber OpenAI na riešenie projektu",
    "prekonzultovanie možného postupu práce s OpenAI"
]);

// Export to see the result
console.log(manager.exportToJSON());
*/

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WeekManager;
}

// Make available globally for console use
if (typeof window !== 'undefined') {
    window.WeekManager = WeekManager;
}