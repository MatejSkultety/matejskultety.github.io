# Tímový projekt 1 - Modernizovaná webová stránka

## 🚀 Prehľad vylepšení

Táto nová štruktúra nahradí pôvodný 905-riadkový `index.html` súbor moderným, modulárnym riešením.

## 📁 Nová štruktúra súborov

```
├── index_new.html          # Modernizovaná hlavná stránka
├── css/
│   └── style_new.css       # Nový CSS s Bootstrap 5 a moderným dizajnom
├── js/
│   ├── app.js              # Hlavná JavaScript aplikácia
│   └── week-manager.js     # Utility pre správu týždňov
├── data/
│   └── weeks.json          # JSON súbor s dátami o týždňoch
└── README_NEW.md           # Tento súbor
```

## ✨ Kľúčové vylepšenia

### 1. **Modulárna štruktúra**
- Dáta oddelené od prezentácie (JSON súbor)
- Znovupoužiteľné komponenty
- Ľahké pridávanie nových týždňov

### 2. **Moderný dizajn**
- Bootstrap 5 (najnovšia verzia)
- Responzívny dizajn pre mobily/tablety
- Smooth scrolling a animácie
- Moderná typografia (Poppins font)

### 3. **Lepšia používateľská skúsenosť**
- Timeline vizualizácia postupu
- Interaktívna navigácia
- Loading stavy
- Error handling

### 4. **Efektívnosť pre vývojárov**
- JavaScript triedy pre organizáciu kódu
- Utility funkcie pre správu dát
- Ľahké pridávanie nových týždňov cez JSON
- Console nástroje pre testovanie

## 🔄 Ako migrovať

### Krok 1: Záloha súčasných súborov
```bash
cp index.html index_old.html
cp css/style.css css/style_old.css
cp js/script.js js/script_old.js
```

### Krok 2: Nahradenie súborov
```bash
mv index_new.html index.html
mv css/style_new.css css/style.css
# js/app.js a js/week-manager.js sú nové súbory
```

### Krok 3: Aktualizácia dát (ak potrebné)
Upravte `data/weeks.json` pre pridanie/úpravu týždňov.

## 📝 Pridávanie nových týždňov

### Metóda 1: Cez JSON súbor
Pridajte nový objekt do `data/weeks.json`:

```json
{
  "id": 3,
  "title": "Týždeň 3",
  "date": "6.10.2023",
  "type": "online",
  "tasks": [
    "research GPT algoritmov",
    "výber OpenAI na riešenie projektu"
  ],
  "participants": [
    "Adam Kučmín",
    "Simona Zlatohlávková",
    "..."
  ],
  "documents": []
}
```

### Metóda 2: Cez JavaScript Console
```javascript
// Otvorte DevTools Console a použite:
const manager = new WeekManager();
manager.addOnlineMeeting(3, "6.10.2023", [
  "research GPT algoritmov", 
  "výber OpenAI"
]);
console.log(manager.exportToJSON()); // Skopírujte výsledok do weeks.json
```

## 🎨 Prispôsobenie dizajnu

### CSS premenné (v `:root`)
```css
--primary-color: #0d6efd;     /* Hlavná farba */
--secondary-color: #6c757d;   /* Sekundárna farba */
--font-primary: 'Poppins-Medium';  /* Font pre nadpisy */
```

### Typy stretnutí
- `"online"` - Online stretnutie (modrá)
- `"offline"` - Osobné stretnutie (zelená) 
- `"presentation"` - Prezentácia (žltá)
- `"planning"` - Plánovanie (sivá)

## 📱 Responzívnosť

Stránka je optimalizovaná pre:
- **Desktop** (1200px+): Plný timeline s rozložením na 2 strany
- **Tablet** (768px-1199px): Upravený layout
- **Mobile** (< 768px): Jednoduchý zoznam, hamburger menu

## 🔧 Technické detaily

### Závislosti
- Bootstrap 5.3.2 (CSS + JS)
- Font Awesome 6.4.0 (ikony)
- Vanilla JavaScript (žiadne dodatočné knižnice)

### Prehliadače
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

### Výkon
- Lazy loading obrázkov
- Optimalizované CSS
- Minimálne JavaScript
- Fast JSON parsing

## 🚀 Budúce vylepšenia

### Možné rozšírenia:
1. **Admin panel** pre pridávanie týždňov cez GUI
2. **Export do PDF** pre prezentácie
3. **Dark mode** prepínač
4. **Vyhľadávanie** v týždňoch/úlohách
5. **Kalendár view** alternatíva k timeline
6. **Multilanguage** podpora (SK/EN)

### Integrácie:
- GitHub API pre automatické načítanie commitov
- Google Docs API pre live dokumentáciu
- Calendar API pre automatické dátumy

## 📊 Porovnanie

| Vlastnosť | Starý systém | Nový systém |
|-----------|--------------|-------------|
| Riadky kódu | 905 HTML | 150 HTML + modulárny JS |
| Pridanie týždňa | Editovanie HTML | Pridanie JSON objektu |
| Responzívnosť | Bootstrap 4 | Bootstrap 5 + custom |
| Údržba | Ťažká | Ľahká |
| Rýchlosť | Pomalá (veľký HTML) | Rýchla (lazy loading) |
| Rozšíriteľnosť | Obmedzená | Vysoká |

## 🤝 Tím a podpora

Pre otázky alebo problémy kontaktujte člena tímu alebo vytvorte issue v GitHub repozitári.

---

**Vytvorené s ❤️ pre efektívnejší Tímový projekt 1**