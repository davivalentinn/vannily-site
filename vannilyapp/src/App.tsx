
import { createBrowserRouter } from 'react-router-dom'

//Importa páginas
import { Home } from './pages/home';
import { Cart } from './pages/cart'
import { Favorites } from './pages/favorites';
import { Login } from './pages/account/login';
import { Register } from './pages/account/register';
//Fim Importa páginas

//Importa Components
import { Layout } from './components/Layout';
import Profile from './pages/account/profile';
//Fim Importa Components

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/favorites",
        element: <Favorites />
      },
      {
        path: "/account/register",
        element: <Register />
      },
      {
        path: "/account/login",
        element: <Login />
      },
      {
        path: "/account/profile",
        element: <Profile />
      }

    ]

  }
])

export { router }
