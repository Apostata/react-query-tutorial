import {lazy} from "react"

const Home = lazy(()=>import('../pages/home'))
const SuperHeroes = lazy(()=>import('../pages/superheroes'))
const Teste = lazy(()=>import('../pages/Teste'))

export const Routes = [
    {
      label: 'Home',
      pageLabel: 'Home',
      path: '/home',
    //   icon: <AppBold fill='white' />,
      element: Home,
      exact:true
    },
    {
      label: 'Super Heroes',
      pageLabel: 'List Super Heroes',
      path: '/superHeroes',
    //   icon: <AppBold fill='white' />,
      element: SuperHeroes,
      children: [
        {
          label: 'Teste',
          path: '/teste',
          element: Teste,
          exact:true
        },
        
      ],
    },
]