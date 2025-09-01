import { BrowserRouter as Router } from 'react-router-dom'
import { TourPlanner } from './components/TourPlanner'
import { LanguageProvider } from './contexts/LanguageContext'
import './App.css'

function App() {
  return (
    <Router>
      <LanguageProvider>
        <div className="min-h-screen bg-gray-50">
          <TourPlanner />
        </div>
      </LanguageProvider>
    </Router>
  )
}

export default App