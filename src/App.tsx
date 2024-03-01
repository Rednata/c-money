import './App.css';
import { Accounts } from './components/Accounts/Accounts';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='*' element={
          <>
            <Header />
            <Routes>
              <Route path='/' element={<Main/>} />
            </Routes>
            <Routes>
              <Route path='/accounts' element={<Accounts/>} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
