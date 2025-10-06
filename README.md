# Tímový projekt 1 - Použitie LLM pre extrakciu technických parametrov

## 📋 Popis projektu

**Názov témy:** Použitie veľkých jazykových modelov (LLM) pre extrakciu technických parametrov z technickej dokumentácie (datasheet)

### 🎯 Cieľ projektu
Vytvorte aplikáciu, ktorá z dokumentácie vyextrahuje hodnoty dopredu definovaných parametrov, s použitím LLM, ako napríklad GPT.

### 📄 Zadanie
Aplikácia má splniť tieto požiadavky:

1. **PDF spracovanie**
   - Prečíta datasheet vo formáte .pdf a skonvertuje ho na text

2. **LLM extrakcia**
   - Pomocou LLM v texte vyhľadá parametre produktu
   - Hľadané parametre budú vopred známe

3. **Databázová integrácia**
   - Nájdené hodnoty parametrov zapíše do databázy
   - Porovná s existujúcou databázou

4. **Validácia a testovanie**
   - Automaticky identifikuje chyby v ručne vyplnených údajoch
   - Porovnanie dvoch rôznych zdrojov údajov
   - Testovanie a meranie presnosti riešenia

### 💡 Motivácia
Automatizácia procesu validácie technických parametrov v dokumentácii s cieľom identifikovať chyby v ručne vyplnených údajoch porovnaním rôznych zdrojov dát.

### 🔗 Nadväznosť
Projekt nadväzuje na predchádzajúce tímové projekty, ktoré úspešne odprototypovali extrakciu číselných parametrov z voľného textu. Predchádzajúce riešenie ale pracovalo len s krátkym ručne zadaným textom.

## 🚀 Prehľad vylepšení webovej stránky

## 👥 Tím

**Členovia tímu:**
- Bc. Katarína Štofaniková
- Bc. Boris Hnila 
- Bc. Matej Škultéty
- Bc. Adam Zeman
- Bc. Martin Klokočík

**Vedúci práce:** Marián Lekavý

**Akademický rok:** 2025/2026

## 🛠️ Technológie

**Predpokladané technológie:**
- Python / Node.js
- LLM API (GPT, Claude, Llama, atď.)
- PDF processing knižnice
- Databáza (PostgreSQL, MongoDB, atď.)
- Webové technológie pre UI

**Licencia:** MIT (permisívna open-source licencia)

## 📊 Očakávané výstupy

1. **Funkčná aplikácia** pre extrakciu parametrov z PDF dokumentácie
2. **Databáza** s extrahovanými parametrami
3. **Validačný systém** pre porovnávanie údajov
4. **Meranie presnosti** a výkonnosti riešenia
5. **Technická dokumentácia** a návody
6. **Open-source kód** pod MIT licenciou

## 📞 Kontakt a podpora

Pre otázky alebo problémy týkajúce sa projektu kontaktujte:
- **GitHub Issues:** [matejskultety.github.io/issues](https://github.com/MatejSkultety/matejskultety.github.io/issues)
- **Projektová dokumentácia:** Dostupná v repozitári

---

**Vytvorené s ❤️ pre Tímový projekt 1 - LLM extrakcia parametrov**