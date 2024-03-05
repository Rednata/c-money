import './App.css';
import { AccountInfo } from './components/AccountInfo/AccountInfo';
// import { AccountInfo } from './components/AccountInfo/AccountInfo';
import { Accounts } from './components/Accounts/Accounts';
// import { Footer } from './components/Footer/Footer';
// import { Header } from './components/Header/Header';
// import { HeaderAuth } from './components/Header/HeaderAuth';
import { Layout } from './components/Layout/Layout';
import { Main } from './components/Main/Main';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Main />} />
          <Route path='accounts' element={<Accounts />} />
          <Route path='accounts/:acc' element={<AccountInfo />} />
        </Route>

      </Routes>
      {/* <Routes>
        <Route path='/' element={
          <>
            <HeaderAuth />
            <Main />
            <Footer />
          </>
        }>
        </Route>
        <Route path='/accounts' element={
          <>
            <Header />
            <Accounts />
            <Footer />
          </>
        }>
        </Route>
        <Route path='/accounts/acc' element={
          <>
            <Header />
            <AccountInfo />
            <Footer />
          </>
        }>
        </Route>
      </Routes> */}
    </div>
  );
}

export default App;
