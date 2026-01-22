# Medical Prescription Generator

A modern medical prescription generator built with React 19 and Vite. Features a glassmorphism UI, single-workspace prescription builder, and HIPAA-compliant data handling. Designed for clinicians to create professional prescriptions in minutes.

## Features

- Modern glassmorphism landing page with hero section
- Single-workspace prescription form with all sections visible
- Doctor profile management with signature and logo upload
- Patient details form with comprehensive fields
- Clinical information tracking (vitals, diagnosis, symptoms)
- Medication management with dosage and instructions
- Custom fields for additional prescription data
- Reusable UI component library
- State management with Zustand
- Local storage for data persistence

## Tech Stack

- React 19
- Vite 6
- React Router v7
- Tailwind CSS v3.4.17
- Zustand v5 (state management)
- Lucide React (icons)
- Local storage for persistence

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/reachvivek/medical-prescription-generator.git
   cd medical-prescription-generator
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Hero, Footer components
│   ├── prescription/    # Prescription form sections
│   └── ui/              # Reusable UI components (Button, Input, etc.)
├── hooks/               # Custom React hooks
├── pages/               # Page components (QuickStart, CreatePrescription)
├── store/               # Zustand state stores
├── utils/               # Utility functions
├── App.jsx              # Main app with routing
└── main.jsx             # Entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

### Creating a Prescription

1. Click "Create New Prescription" on the landing page
2. Fill in doctor profile information
3. Add patient details
4. Enter clinical information (vitals, diagnosis, symptoms)
5. Add medications with dosage and instructions
6. Include any custom fields as needed
7. Generate and download the prescription

## Architecture

The application uses a single-workspace design where all prescription sections are visible on one page, eliminating the need for multi-step wizards. State management is handled through Zustand stores with local storage persistence for data durability.

## Design System

The UI features a glassmorphism design with:
- Floating header with backdrop blur
- Hero section with gradient overlay
- Feature cards with overlapping icons
- Consistent color palette (slate-800, slate-500, sky-600)
- Responsive layout with Tailwind CSS utilities

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## License

MIT License

## Acknowledgments

Trusted by healthcare professionals at leading institutions including Cleveland Clinic, Mayo Clinic, Kaiser Permanente, Fortis Healthcare, and Life Pharmacy.
