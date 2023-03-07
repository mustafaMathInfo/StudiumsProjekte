import {Route, Routes} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import MyRecipes from "./components/Ui/Recipes/MyRecipes";
import AddRecipe from "./components/Ui/Recipes/AddRecipe";
import HomeRecipe from "./components/Ui/Recipes/HomeRecipe";
import EditRecipe from "./components/Ui/Recipes/EditRecipe";
import CardDetailed from "./components/Ui/Recipes/CardDetailed";
import FavoriteRecipe from "./components/Ui/Recipes/FavoriteRecipe";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path='/'  element={<HomePage/>}/>
                <Route path='/login'  element={<AuthPage/>}/>
                <Route path='/recipe'  element={ <HomeRecipe/>}/>
                <Route path='/recipeDetailed'  element={ <CardDetailed/>}/>
                <Route path='/myRecipe'  element={ <MyRecipes/>}/>
                <Route path='/newRecipe'  element={ <AddRecipe/>}/>
                <Route path='/myRecipe/edit'  element={ <EditRecipe/>}/>
                <Route path='/favoriteRecipe'  element={ <FavoriteRecipe/>}/>
                <Route path='*'  element={ <HomePage/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
