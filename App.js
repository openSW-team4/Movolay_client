import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Movies } from './routes/movies';
import { Home } from './routes/home';
import { Nav } from './components/navigation';
import { MyPage} from './routes/mypage';
import { Login } from './routes/login';
import  Loginform  from './routes/loginform';
import SignupForm from './routes/signupform';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
    color: white;
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Nav />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/MyPage" element={<MyPage />}/>
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<Movies />} />
        <Route path="/loginform" element={<Loginform />} /> 
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
