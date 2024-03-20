import { ThemeProvider } from './Contexts/ThemeContext'
import AdminHomeScreen from  './AdminHomeScreen/AdminHomeScreen';

function App() {
  return (
    <ThemeProvider>
      <div style={{ width: '100vw', height: '100vh',overflow: 'auto'}}>
         <AdminHomeScreen/>
      </div>
    </ThemeProvider>
  )
}

export default App
