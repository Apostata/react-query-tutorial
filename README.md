# React query
`npm i react-query`

`import {useQuery} from 'react-query'` 


## Exemplo de uso

 - No Hook
  ```js
    export function useCharacters() {
      const getAllChars = useCallback(async () => {
          const response = await getCharacters();
          const data = response.json();
          return data
      
      }, []);

      const {data, status} = useQuery('apiData', getAllChars)

      const value = useMemo(
        () => ({
          data,
          status
        }),
        [data, status]
      );

      return value;

    }
  ```

- no Componente
  
  ```js
    import { useCharacters } from "./useCharacters";

    export default function Characters() {
      const {data, status } = useCharacters();

      return <div>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'error' && <div>Error</div>}
      {status === 'success' && data?.results?.map((character)=><p key={character.id}>{character.name}</p>)}
      </div>;
    }
  ```
- Colocar o QueryClientProvider

  ```js
    import "./App.css";
    import Characters from "./Characters/Characters";
    import {QueryClientProvider, QueryClient} from 'react-query'

    const queryClient = new QueryClient()

    function App() {
      return (
        <div className="App">
          
          <div className="container">
            <h1>React Query Tutorial - Rick and Morty</h1>
          <QueryClientProvider client={queryClient}>
            <Characters />
          </QueryClientProvider>
          </div>
            
        </div>
      );
    }

    export default App;
  ```
## Colocando o ReactQueryTools no site

```js
  import './App.css';
  import {Router} from './routes/router';
  import {QueryClient, QueryClientProvider} from 'react-query'
  import {ReactQueryDevtools} from 'react-query/devtools'

  const queryClient = new QueryClient()

  function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Router/>
        </div>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
      </QueryClientProvider>
    );
  }

  export default App;

```

## React Query Hooks

### useQuery
Usado para requisições http/s, para chamadas de APIs
Já devolve o resultado, e os estados da api, não é necessário criar um useState para armazenar os resultados
recebe 2(3 opcional) parametros, o primeiro é a chave da consulta e o segundo é a função que de fato chama o endpoint
```js
  ...
    const {data, status} = useQuery('apiData', getAllChars)
  ...
```
no caso `apiData` é a chave e getAllChars é a função que faz a chamada para a api

  - passando paginação, basta passar `queryKey` pra a função que fará a chamada e como passado no `useQuery` a paginação é o segundo parametro, portanto `queryKey[1]` 
    ```js
      const [page, setPage] = useState(1)
      ...
      const getAllChars = useCallback(async ({queryKey}) => {
        const response = await getCharacters(queryKey[1]);
        const data = response.json();
        return data
    
      }, []);
      ...
      const {data, status} = useQuery(['apiData', page], getAllChars)
      ...
    ```

    **ou**

    ```js
      const [page, setPage] = useState(1)
      ...
      const getAllChars = useCallback(async (page) => {
        const response = await getCharacters(page);
        const data = response.json();
        return data
    
      }, []);
      ...
      const {data, status} = useQuery(['apiData', page], ()=>getAllChars(page))
      ...
    ```


 - Persistir a ultima busca até que seja completada a chamada
    Neste caso passamos o 3 parametro que são outras opções, e passamos ` keepPreviousData: true`, para que mantenha renderizado na tela a ultima consulta até que a nova possa subistitui-loading
    
  ```js
    const [page, setPage] = useState(1)
    ...
     const getAllChars = useCallback(async ({queryKey}) => {
      const response = await getCharacters(queryKey[1]);
      const data = response.json();
      return data
   
    }, []);
    ...
    const {data, status, isPreviousData} = useQuery(['apiData', page], getAllChars, , { keepPreviousData: true}))
    ...
  ```
  #### useQuery 3º parametro
    pode ser um objeto com os valores:
    `keepPreviousData: boolean` - mantem a ultima chamada em cache?
    `cacheTime: number (milisseconds)` - seta o tempo de duração do cache após useQuery ficar inativo(exemplo, quando navega para uma página que não use a query), após este tempo o cache e limpo.
    `staleTime: number (milisseconds)` - seta o tempo para que quando a mesma requisição for chamada, não refaça ela em 30 segundos, ou seja se um edponit não muda seus resultados com freqência, seria interessante pegar do cache ao ivés de fazer uma nova chamada  
    `refetchOnMount: boolean | 'always'` - ao montar o componente busca dados do endpoint
    `refetchOnWindowFocus: boolean | 'always'` - por paadrão é always. Quando foca na tela novamente, ou seja, saiu de uma aba e volta nela por exemplo
    `refreshInterval: false | number (milisseconds)` - para fazer pooling em um endpoint a cada X tempos, desde que a tela esteja em foco
    `refreshIntervalInBackground: boolean` -  trabalha em conjunto com o 'refreshInterval', mas funciona para quando a aplicação não está em foco, ou seja o cliente esta em outra aba por exemplo.
    `enabled: boolean` - por padrão é true, quando montar o componente já executa a query
    deve ser usado em conjunto com a função `refetch` importada de useQuery:
    ```js
     const {data:res, isLoading, error, refetch} = useQuery('superHeroes', getSuperHeroes, {enabled:false})
    ```
     e chamar esta função um click de um botão por exemplo.
    `onSuccess: function(param: object)`: passa um callback para quando a query é executada com sucesso, caso queira recebe algo ra resposta no callback basta passar o parametro de retorno com o nome desejado, normalmente `data`
    `onError: function(param: object)`: passa um callback para quando a query retornar um erro, caso queira recebe algo ra resposta no callback basta passar o parametro de retorno com o nome desejado, normalmente `error`
    `select: function(param :object)`: um callback para transformar a resposta vinda da api para outra coisa
    `initialData: function()`: um callback para passar os dados iniciais ou pegar de outra query, usando o `useQueryClient`

  #### useQuery status
    Podem ser 
    - `isLoading`: Esta executando a chamada da api pela primeira vez quando o cache esta vazio
    - `isFetching`: Esta executando a chamada da api em background para atualizar a consulta
  
  #### Dependant queries
  Quando uma query depende do resultado da outra para ser chamada, neste caso a query dependente deve ser habilitada somente quando tiver o necessário, no caso abaixo chamamos a query para pegar os 'channels' somente quanto tivermos o 'channelId' que esta ma resposta da primeira requisição feira para pegar os 'users'

  ```js
  const id = 'algumId'
  const{ data:resUser } = useQuery(['user', id], ()=>getUserById(id), {})
  ...
  const channelId = resUser?.data?.channelId
  const{ data:resChannel } = useQuery(['channel', channelId], ()=>getChannelById(channelId), { enabled: !!channelId})
  ```

### useQueries (parallel queryies)
para realizar mais de uma query simultânea, mas o principio é o mesmo do `useQuery`

```js
 const useParralelSuperHeroQuery = (ids)=>
    useQueries(
        ids?.map((id)=>({
            queryKey: ['super-hero', id],
            queryFn: ()=> getSuperHeroById(id)
        }))
    )
```
o resultado será um array de queries com os mesmo parametros do resultado de um `useQuery` simples

### useQueryClient - exemplo de initialData
Usado por exemplo para pegar os dados de cahce de outra query, no exemplo abaixo, a segunda query chama o resultado em cache da  primeira para passar como dado inicial

```js
useQuery('superHeroes', getSuperHeroes, {
    refetchOnWindowFocus:false,
    onSuccess,
    onError,
    
})
...

useQuery(['superHeroeDetails', id], ()=>getSuperHeroById(id), {
    refetchOnWindowFocus:false,
    initialData: ()=>{
        const hero = queryClient.getQueryData('superHeroes')?.data.find((hero)=>hero.id === parseInt(id))
        return hero ? {data:hero} : undefined
    }
})
```