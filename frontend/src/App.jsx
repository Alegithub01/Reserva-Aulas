import { ThemeProvider } from './Contexts/ThemeContext'
// import AdminHomeScreen from  './AdminHomeScreen/AdminHomeScreen';
import TeacherLoginScreen from './TeacherLoginScreen/TeacherLoginScreen'

function App() {
  return (
    <ThemeProvider>
      <div style={{ width: '100vw', height: '100vh',overflow: 'auto'}}>
         {/* <AdminHomeScreen/> */}
          <TeacherLoginScreen/>
      </div>
    </ThemeProvider>
  )
}

export default App
