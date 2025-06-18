# German A2 Reading Trainer

An offline-first web application for German language learners preparing for Goethe Institut A2 certification reading comprehension exam.

## 🎯 Project Overview

This application provides exam-style reading practice with instant feedback, adaptive difficulty, and progress tracking - all running offline in your browser.

**📋 Project Requirements & Progress:** See [README_PRD.txt](./README_PRD.txt) for detailed requirements and current progress.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── features/           # Feature-specific components (reading, dashboard)
├── lib/                # Shared utilities and helpers
└── styles/             # Global styles and Tailwind config
```

## 🛠 Tech Stack

- **Framework:** Next.js 15.3.3 + React 19 + TypeScript
- **Styling:** Tailwind CSS v4
- **Storage:** LocalStorage + IndexedDB (via localForage)
- **Testing:** Vitest + React Testing Library
- **Deployment:** Static export for offline use

## 📖 Features

### MVP (Current Focus)
- [ ] German text display with A2-level content
- [ ] Multiple-choice comprehension questions
- [ ] Immediate feedback system
- [ ] Basic progress tracking
- [ ] Offline functionality

### Post-MVP
- [ ] Adaptive difficulty adjustment
- [ ] Detailed analytics dashboard
- [ ] Achievement system
- [ ] Dark mode support

## 🎨 Design Principles

- **Offline-first:** Everything works without internet
- **Apple-level polish:** Smooth animations, perfect spacing
- **Accessibility:** WCAG 2.2 AA compliant
- **Mobile-responsive:** Works on all device sizes
- **Performance:** < 1s initial load time

## 📊 Progress Tracking

Current Status: **MVP Phase** - Setting up foundation

See [README_PRD.txt](./README_PRD.txt) for detailed deliverables and progress tracking.

## 🤝 Contributing

1. Check the current deliverable in [README_PRD.txt](./README_PRD.txt)
2. Follow the coding standards in `.cursor/rules/`
3. Ensure all tests pass before submitting PR
4. Update progress in PRD after completing deliverables

## 📄 License

This project is for educational purposes.
