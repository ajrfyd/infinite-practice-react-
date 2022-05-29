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
      root = null, // 타겟의 가시성을 확인할 때 사용. 타겟 상위 요소, 즉 조상 요소. 설정하지 않거나 root 값을 null 로 주었을 때 기본 값으로 브라우저 뷰포트가 설정.
      rootMargin = "0px", // root의 범위를 확장할 수 있다.
      threshold = 1.0, // 어느 정도 타겟 요소가 보여 졌는지에 따라 콜백을 실행. 1.0 = 타겟이 100%다 보여 졌을때. 0.5 = 타겟이 반절 보여 졌을때
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

```js
  // 타겟과 루트가 전혀 교차하지 않았음에도 호출 되는 것은 Intersection Observer의 기본동작. 이를 예외처리 하기 위해서 intersectionRatio를 사용하거나 아래의 방법 사용.
 const onIntersect = (entries, observer) => {
    // isFetching && entries[0].isIntersecting && fetchNextPage();
    // if (entry.intersectionRatio <= 0) return
    if(!entries[0].isIntersecting) return
    entries[0].isIntersecting && fetchNextPage();
  }
```