import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {AuthContextProvider} from './store/auth-context';
import {RecipeContextProvider} from "./store/recipe-context";
import {FavoriteContextProvider} from "./store/favorite-context";
import {RatingContextProvider} from "./store/rating-context";
import {ViewContextProvider} from "./store/view-context";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <RecipeContextProvider>
                <FavoriteContextProvider>
                    <RatingContextProvider>
                        <ViewContextProvider>
                            <BrowserRouter>
                                <App/>
                            </BrowserRouter>
                        </ViewContextProvider>
                    </RatingContextProvider>
                </FavoriteContextProvider>
        </RecipeContextProvider>
    </AuthContextProvider>
);
