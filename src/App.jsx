import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import QuoteMachine from './component/QuoteMachine'
import XMLQuoteMachine from './component/XMLQuoteMachine'


function App() {

  return (
    <>
    <BrowserRouter>
      <main>
        {/* Your Routes */}
        <Routes>
          <Route path="/" element={<QuoteMachine />} />
          <Route path="/xml-quote-machine" element={<XMLQuoteMachine />} />
        </Routes>
      </main>
    </BrowserRouter>
    </>
  )
}

export default App
