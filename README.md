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
Usado para requisi????es http/s, para chamadas de APIs
J?? devolve o resultado, e os estados da api, n??o ?? necess??rio criar um useState para armazenar os resultados
recebe 2(3 opcional) parametros, o primeiro ?? a chave da consulta e o segundo ?? a fun????o que de fato chama o endpoint
```js
  ...
    const {data, status} = useQuery('apiData', getAllChars)
  ...
```
no caso `apiData` ?? a chave e getAllChars ?? a fun????o que faz a chamada para a api

  - passando pagina????o, basta passar `queryKey` pra a fun????o que far?? a chamada e como passado no `useQuery` a pagina????o ?? o segundo parametro, portanto `queryKey[1]` 
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


 - Persistir a ultima busca at?? que seja completada a chamada
    Neste caso passamos o 3 parametro que s??o outras op????es, e passamos ` keepPreviousData: true`, para que mantenha renderizado na tela a ultima consulta at?? que a nova possa subistitui-loading
    
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
  #### useQuery 3?? parametro
  pode ser um objeto com os valores:
  - `keepPreviousData: boolean` - mantem a ultima chamada em cache, para usar com pagina????o por exemplo, elimiando assim que a p??gina fique em branco ou mostre o carregamento, caso tenha alguma tratativa
  - `cacheTime: number (milisseconds)` - seta o tempo de dura????o do cache ap??s useQuery ficar inativo(exemplo, quando navega para uma p??gina que n??o use a query), ap??s este tempo o cache e limpo.
  - `staleTime: number (milisseconds)` - seta o tempo para que quando a mesma requisi????o for chamada, n??o refa??a ela em 30 segundos, ou seja se um edponit n??o muda seus resultados com freq??ncia, seria interessante pegar do cache ao iv??s de fazer uma nova chamada  
  - `refetchOnMount: boolean | 'always'` - ao montar o componente busca dados do endpoint
  - `refetchOnWindowFocus: boolean | 'always'` - por paadr??o ?? always. Quando foca na tela novamente, ou seja, saiu de uma aba e volta nela por exemplo
  - `refreshInterval: false | number (milisseconds)` - para fazer pooling em um endpoint a cada X tempos, desde que a tela esteja em foco
  - `refreshIntervalInBackground: boolean` -  trabalha em conjunto com o 'refreshInterval', mas funciona para quando a aplica????o n??o est?? em foco, ou seja o cliente esta em outra aba por exemplo.
  - `enabled: boolean` - por padr??o ?? true, quando montar o componente j?? executa a query
  deve ser usado em conjunto com a fun????o `refetch` importada de useQuery:
  ```js
    const {data:res, isLoading, error, refetch} = useQuery('superHeroes', getSuperHeroes, {enabled:false})
  ```
    e chamar esta fun????o um click de um bot??o por exemplo.
  - `onSuccess: function(param: object)`: passa um callback para quando a query ?? executada com sucesso, caso queira recebe algo ra resposta no callback basta passar o parametro de retorno com o nome desejado, normalmente `data`
  - `onError: function(param: object)`: passa um callback para quando a query retornar um erro, caso queira recebe algo ra resposta no callback basta passar o parametro de retorno com o nome desejado, normalmente `error`
  - `select: function(param :object)`: um callback para transformar a resposta vinda da api para outra coisa
  - `initialData: function()`: um callback para passar os dados iniciais ou pegar de outra query, usando o `useQueryClient`

  #### useQuery status
  Podem ser 
  - `isLoading`: Esta executando a chamada da api pela primeira vez quando o cache esta vazio
  - `isFetching`: Esta executando a chamada da api em background para atualizar a consulta
  
  #### Dependant queries
  Quando uma query depende do resultado da outra para ser chamada, neste caso a query dependente deve ser habilitada somente quando tiver o necess??rio, no caso abaixo chamamos a query para pegar os 'channels' somente quanto tivermos o 'channelId' que esta ma resposta da primeira requisi????o feita para pegar os 'users'

  ```js
    const id = 'algumId'
    const{ data:resUser } = useQuery(['user', id], ()=>getUserById(id), {})
    ...
    const channelId = resUser?.data?.channelId
    const{ data:resChannel } = useQuery(['channel', channelId], ()=>getChannelById(channelId), { enabled: !!channelId})
  ```

### useQueries (parallel queryies)
para realizar mais de uma query simult??nea, mas o principio ?? o mesmo do `useQuery`

```js
 const useParralelSuperHeroQuery = (ids)=>
    useQueries(
        ids?.map((id)=>({
            queryKey: ['super-hero', id],
            queryFn: ()=> getSuperHeroById(id)
        }))
    )
```
o resultado ser?? um array de queries com os mesmo parametros do resultado de um `useQuery` simples

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
#### invalidateQueries
podemos forcar um refetch em uma query especifica de qualquer outra query usando o `queryClient.invalidateQueries($CHAVE_DA_QUERY)`
ser?? demonstrado no hook `useMutation`

### useInfiniteQuery
**NOTA: este hook chama 2 vezes inicialmente - bug ser?? corrigido na vers??o 4.0.0-beta.16**

Exemplo:
  l??gica :
  ```js
    const {data isLoading, error, isFetching, hasNextPage, fetchNextPage} =useInfiniteQuery(['colorsInfinite'], getColorsPageParams, {
            refetchOnWindowFocus:false,
            getNextPageParam:(_lastPage, pages)=>{
                const total = Number(_lastPage?.headers?.['x-total-count'] || 0) //para pegar o total no json-server
                if((total > size * pages?.length)){
                    return pages?.length + 1
                }else{
                    return undefined
                }
            }
        })
        ...
  ```
  no parte da tela basta chmar a fun????o `fetchNextPage` para carregar mais itens

### useMutation
Para usar os outros metodos al??m do `GET`
exemplo de `POST`, onde `addHero` ?? a fun????o que ser?? chamada por um evento (click ou submit) para chamar a `postHero`, que ir?? chamar o servi??o da api, representada pela fun????o	`postSuperHero`, o uso do onSuccess ?? para demostrar como podemos usar o `invalidateQueries` de `useQueryClient` para for??ar um refetch na query `'superHeroes'` que ?? a chamada para retornar a lista de superHeroes

```js
  const useSuperHeroAddMutation = (onSuccessCallback) =>{
      const queryClient = useQueryClient()
      return useMutation(postSuperHero, {onSuccess:()=>{
          onSuccessCallback(queryClient)
      }})
  }
  ...
  const onSuccessAdd = useCallback((queryClient)=>{
          nameRef.current.value = ''
          alterEgoRef.current.value =''
          queryClient.invalidateQueries('superHeroes')
      },[])
  ...
  const {mutate:postHero, isLoading, error} = useSuperHeroAddMutation(postSuperHero, {onSuccessAdd})
  ...
  const addHero = useCallback(()=>{
          const payload = {name:nameRef?.current.value, alterEgo:alterEgoRef?.current.value}
          postHero(payload)
      },[postHero])
```

#### Handling mutation response
Melhorando o exemplo anterior para n??o fazer o refetch e sim pegar os dados retornados do post para a lista, podemos atualizar o resultado da chamada da lista inicial, feita quando a p??gina ?? carregada.

```js
  const useSuperHeroAddMutation = (onSuccessCallback) =>{
      const queryClient = useQueryClient()
      /// precisamos s?? passar a resposta do POST a mais para o callback
      return useMutation(postSuperHero, {onSuccess:(data)=>{
          onSuccessCallback(queryClient, data)
      }})
  }
  ...
  const onSuccessAdd = useCallback((queryClient)=>{
          nameRef.current.value = ''
          alterEgoRef.current.value =''
          // esta ?? a mudan??a que atualiza a query chamada anteriormente
           queryClient.setQueryData('superHeroes', (oldRes)=>({
            ...oldRes,
            data:[...oldRes.data, newRes.data]
        }))  
      },[])
  ...
    const {mutate:postHero, isLoading, error} = useSuperHeroAddMutation(postSuperHero, {onSuccessAdd})
  ...
  const addHero = useCallback(()=>{
          const payload = {name:nameRef?.current.value, alterEgo:alterEgoRef?.current.value}
          postHero(payload)
      },[postHero])
```

### Opttimistic update
?? atualizar o estado presumindo que nada vai dar errado antes mesmo de realizar um post ou um update. Caso d?? errado ele volta ao estado anterior

callbacks definidos em aqrquivo diferente da query

```js
// aqrquivo que contem os callbacks
const onMutateAdd = useCallback(async(queryClient, newHero)=>{
    await queryClient.cancelQueries('superHeroes')
    const previousData = queryClient.getQueryData('superHeroes')

    queryClient.setQueryData('superHeroes', (oldResponse)=>{
        console.log(oldResponse)
        return  {
            ...oldResponse,
            data:[...oldResponse?.data, {id:oldResponse?.data?.length + 1, ...newHero}]
        }
    })  
    return {
        previousData
    }
},[])

const onErrorAdd = useCallback((queryClient, error, hero, context)=>{
    console.log(error, hero)
    queryClient.setQueryData('superHeroes', context.previousData)
},[])

const onSettledAdd = useCallback((queryClient)=>{
    queryClient.invalidateQueries('superHeroes')
},[])


const {mutate:postHero, isLoading, error} = useSuperHeroAddMutation( onMutateAdd, onErrorAdd, onSettledAdd)

...

// arquivo que contem a query
export const useSuperHeroAddMutation = (onMutateCallback, onErrorCallback, onSettledCallback) =>{
    const queryClient = useQueryClient()
    return useMutation(postSuperHero, {
        onMutate:(newHero)=>onMutateCallback(queryClient, newHero), // antes de fazer os post
        onerror:(error, hero, context)=>onErrorCallback(queryClient, error, hero, context), // quando der erro
        onSettled:()=>onSettledCallback(queryClient) // quando der tudo certo
    })
}


```