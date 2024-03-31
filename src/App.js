import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";
import { useState } from "react";
import { useEffect } from 'react';
function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    if (hasMore) {
      fetchData();
    }
  }, [hasMore]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9001/englishwords?_page=${page}&_limit=10`
      );
      setItems(prevItems => [...prevItems, ...response.data]);
      setPage(prevPage => prevPage + 1);
      if (response.data.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setHasMore(false);
    }
  };
  return (
    <InfiniteScroll
      style={{ margin: "10px" }}
      pageStart={0}
      loadMore={fetchData}
      hasMore={hasMore}
      loader={
        <div className="loader" key={0}>
          Loading 
        </div>
      }
    >
      {items.map((item) => (
        <div key={item.id}>
          <h2>{item.id}</h2>
          <p>{item.word}</p>
        </div>
      ))}
    </InfiniteScroll>
    );
  }
  export default App;

