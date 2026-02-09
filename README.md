# Kanban Board - Frontend

> Projet vitrine réalisé en **React** + **TypeScript** + **TailwindCSS**.  
> Version frontend complète, avec drag & drop desktop, filtrage, persistence, et import/export JSON sécurisé.

## Technologies  

- **React 18** + **TypeScript**

- **TailwindCSS** pour le style

- **Vite** pour le bundling et le dev server

- **Hook personnalisé** useBoard pour gérer la logique

- HTML Drag & Drop (desktop)

- **LocalStorage** pour persistance automatique

- Import / Export **JSON** sécurisé

- Filtrage par tags

- Responsive design (desktop)

- Protection XSS sur titres et descriptions

## Fonctionnalités  

- Ajouter, modifier et supprimer des cartes (titre, description)

- Déplacer les cartes entre colonnes (drag & drop)

- 3 **tags** filtrables selon l'importance de la tâche

- Sauvegarde automatique via **LocalStorage**

- Import / Export JSON avec validation

- Interface responsive

- Boutons **Add Card** par colonne

- **Sécurité XSS** sur les entrées utilisateur

## Structure du projet  
```text
src/  
├─ components/  
│  ├─ Board/  
│  │  └─ Board.tsx  
│  ├─ Card/  
│  │  └─ Card.tsx  
│  └─ Column/  
│     └─ Column.tsx  
├─ hooks/  
│  └─ useBoard.ts  
├─ types/  
│  └─ board.ts  
├─ utils/  
│  ├─ tags.ts
│  └─ helper.ts  
├─ main.tsx  
└─ index.css  
```

## Composants principaux

- **Board.tsx** — orchestrateur principal du board

- **Column.tsx** — logique d’ajout, suppression et drag & drop

- **Card.tsx** — affichage d’une carte (tag, titre, description)

- **useBoard.ts** — hook central de la logique métier

## Installation  
```bash
git clone https://github.com/Tha1s/Kanban-Board.git
cd Kanban-Board
npm install
npm run dev
```


Le projet sera accessible sur : **http://localhost:5173**

## Bonnes pratiques  

- Hook métier isolé (useBoard) → testable et modifiable

- Pas de mutation directe du state React

- Validation des inputs et JSON importé

- Architecture composants claire et réutilisable

- Design responsive optimisé desktop & mobile

## Auteur  

Développé par **Thaïs Alibert**