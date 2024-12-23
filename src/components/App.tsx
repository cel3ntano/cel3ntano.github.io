import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CVPreview from './CVPreview/CVPreview';
import Header from './Header/Header';
import Main from './Main/Main';
import { Footer } from './Footer/Footer';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/cv' element={<CVPreview />} />
        <Route
          path='/'
          element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}
