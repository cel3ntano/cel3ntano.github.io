import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';

const CVPreview = lazy(() => import('./CVPreview/CVPreview'));
const HRPreview = lazy(() => import('./HRPreview/HRPreview'));
const Main = lazy(() => import('./Main/Main'));
const Footer = lazy(() => import('./Footer/Footer'));
const NotFound = lazy(() => import('./NotFound/NotFound'));

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/cv'
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <CVPreview />
            </Suspense>
          }
        />
        <Route
          path='/hr/:hrId'
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <HRPreview />
            </Suspense>
          }
        />
        <Route
          path='/'
          element={
            <>
              <Header />
              <Suspense fallback={<LoadingSpinner />}>
                <Main />
              </Suspense>
              <Suspense fallback={null}>
                <Footer />
              </Suspense>
            </>
          }
        />
        <Route
          path='*'
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
};
