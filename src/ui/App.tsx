import {HashRouter, Routes, Route} from 'react-router-dom'
import {EditComponent, OpenComponent } from "./components"
import './App.css';
const App = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<OpenComponent/>}/>
          <Route path="/edit" element={<EditComponent/>}/>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
