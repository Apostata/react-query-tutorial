import {lazy} from "react"

const Home = lazy(()=>import('../pages/home'))
const SuperHeroes = lazy(()=>import('../pages/superheroes'))
const Teste = lazy(()=>import('../pages/Teste'))
const SuperHeroDetails = lazy(()=>import('../pages/SuperHero/superHeroDetails'))
const ParallelQuerys = lazy(()=>import('../pages/ParallelQerys/parallelQuerys'))
const DependantQueries = lazy(()=>import('../pages/DependantQueries/DependantQueries'))
const Pagination = lazy(()=>import('../pages/Pagination/Pagination'))
const InfinitePagination = lazy(()=>import('../pages/InfinitePagination/InfinitePagination'))


export const Routes = [
    {
      label: 'Home',
      pageLabel: 'Home',
      path: '/home',
      element: Home,
      exact:true
    },
    {
      label: 'Super Heroes',
      pageLabel: 'List Super Heroes',
      path: '/superHeroes',
      element: SuperHeroes,
      exact:true,
      children: [
        {
          label: 'Teste',
          path: '/teste',
          element: Teste,
          exact:true,
        },
        {
          label: 'Superhero Details',
          path: '/:id',
          element: SuperHeroDetails,
          exact:true,
          show: false,
        },
        
      ],
    },
    {
      label: 'Parallel',
      pageLabel: 'Parallel',
      path: '/parallel',
      initialData: {
        heroIds :[1, 2, 3]
      },
      element: ParallelQuerys,
      exact:true
    },
    {
      label: 'Dependant Queries',
      pageLabel: 'Dependat Queries',
      path: '/dependant',
      initialData: {
        email :"rene@example.com"
      },
      element: DependantQueries,
      exact:true
    },
    {
      label: 'Query pagination',
      pageLabel: 'Query pagination',
      path: '/pagination',
      element: Pagination,
      exact:true
    },
    {
      label: 'Infinite pagination',
      pageLabel: 'Infinite pagination',
      path: '/infinitePagination',
      element: InfinitePagination,
      exact:true
    },
]