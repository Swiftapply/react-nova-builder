
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set document title to WingPilot
document.title = "WingPilot - Build mobile apps with AI";

createRoot(document.getElementById("root")!).render(<App />);
