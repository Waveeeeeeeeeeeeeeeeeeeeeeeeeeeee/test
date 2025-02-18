import { createRoot } from 'react-dom/client'

import './config/i18n/i18n.config'
import './styles/index.css'
import MainApp from './ui/MainApp'

createRoot(document.getElementById('root')!).render(<MainApp />)
