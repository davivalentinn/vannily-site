
import { createBrowserRouter } from 'react-router-dom'

//Importa páginas
import { Home } from './pages/home';
import { Cart }from './pages/cart'
//Fim Importa páginas

//Importa Components
import { Layout } from './components/Layout';
//Fim Importa Components

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/cart",
        element: <Cart/>
      }
    ]

  }
])

export {router}
