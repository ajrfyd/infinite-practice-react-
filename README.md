### Practice of Infinite scroll 
> 초기 세팅 완료

### useInfiniteQuery
```js
  const {
      data, 
      error,
      fetchNextPage, // 다음 페이지를 호출 함수
      hasNextPage, // Boolean 값
      isFetching, // Boolean 값,
      isFetchingNextPage, // Boolean 값
      status, // 상태 string으로 넘어옴
  } = useInfiniteQuery(
        "pokemonList" // 식별
      , getPokeList // 데이터 호출 비동기 함수
      , {
          // falsy한 값을 반환하면 fetch를 실행하지 않음
          // Number를 리턴해야 함
          // pageParam값으로 전달됨.({pageParam})
          getNextPageParam: (lastPage, page) => 
            return number // 다음 페이지 호출
        }
      )

```


### useObserver

```js
  export const useObserver = ({
      target,
      onIntersect, // 타겟이 감지되면 실행할 callback 함수
      root = null, // 교차할 부모 요소, 아무것도 넘기지 않으면 document가 기본이다.
      rootMargin = "0px", // root와 target이 감지하는 여백의 거리
      threshold = 1.0, // 임계점. 1.0이면 root내에서 target이 100% 보여질 때 callback이 실행된다.
  }) => {
      useEffect(() => {
          let observer

          // 넘어오는 element가 있어야 observer를 생성할 수 있도록 한다.
          if (target && target.current) {
              // callback의 인자로 들어오는 entry는 순환자. 복잡한 로직을 필요로 할때가 많다. 
              observer = new IntersectionObserver(onIntersect, { root, rootMargin, threshold })
              // 감지
              observer.observe(target.current)
          }

          // observer 정리 
          return () => observer && observer.disconnect()
      }, [target, rootMargin, threshold])
  }
```

