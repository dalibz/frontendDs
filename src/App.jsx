import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import MainPage from "./components/MainPage/MainPage";
import MenuPage from "./components/MenuPage/MenuPage"; // Ensure this path is correct

// Lazy loading components
const Listarticles = React.lazy(() => import('./components/articles/Listarticles'));
const Insertarticle = React.lazy(() => import('./components/articles/Insertarticle'));
const Editarticle = React.lazy(() => import('./components/articles/Editarticle'));
const Viewarticle = React.lazy(() => import('./components/articles/Viewarticle'));
const Listcategorie = React.lazy(() => import('./components/categories/Listcategorie'));
const Insertcategorie = React.lazy(() => import('./components/categories/Insertcategorie'));
const Editcategorie = React.lazy(() => import('./components/categories/Editcategorie'));
const Viewcategorie = React.lazy(() => import('./components/categories/Viewcategorie'));
const Listscategories = React.lazy(() => import('./components/scategories/Listscategories'));
const Insertscategorie = React.lazy(() => import('./components/scategories/Insertscategorie'));
const Editscategorie = React.lazy(() => import('./components/scategories/Editscategorie'));
const Viewscategorie = React.lazy(() => import('./components/scategories/Viewscategorie'));
const Listarticlescard = React.lazy(() => import('./components/articles/Listarticlescard'));

function App() {
  return (
    <Router>
      <Menu />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Main Page */}
          <Route path="/" element={<MainPage />} />
          
          {/* Menu Page */}
          <Route path="/menu" element={<MenuPage />} />  {/* Menu page route */}

          {/* Articles Routes */}
          <Route path="/articles" element={<Listarticles />} />
          <Route path="/articles/add" element={<Insertarticle />} />
          <Route path="/article/edit/:id" element={<Editarticle />} />
          <Route path="/article/view/:id" element={<Viewarticle />} />
          <Route path="/articlescard" element={<Listarticlescard />} />

          {/* Categories Routes */}
          <Route path="/categories" element={<Listcategorie />} />
          <Route path="/categories/add" element={<Insertcategorie />} />
          <Route path="/categories/edit/:id" element={<Editcategorie />} />
          <Route path="/categories/view/:id" element={<Viewcategorie />} />

          {/* Subcategories Routes */}
          <Route path="/scategories" element={<Listscategories />} />
          <Route path="/scategories/add" element={<Insertscategorie />} />
          <Route path="/scategories/edit/:id" element={<Editscategorie />} />
          <Route path="/scategories/view/:id" element={<Viewscategorie />} />

          {/* 404 Page */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
