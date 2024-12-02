import React from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PokemonDetails from '../pages/PokemonDetails';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/pokedex" replace />} />
                <Route path="/pokedex" element={<Home />} />
                <Route path="/pokedex/:id" element={<PokemonDetails />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
