import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { DiriAPI, DiriAPIBotlist } from "../pages/list";
import { Bot } from "koreanbots";

function useFetch(query: string, page: number, lis: Bot[]) {
  console.log('useFetch');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState(lis);

  const fetch = async function() {
    setLoading(true);
    setError(false);
    try{
      console.log('loading...');
      const res = await axios.get('https://koreanbots.dev/api/v2/list/bots/votes');
      console.log(res);
      const data: DiriAPI<DiriAPIBotlist> = res.data;
      const bots = data.data.data;
      setList((prev) => [...prev, ...bots]);
      setLoading(false);
    } catch(e: unknown) {
      setError(true);
      console.log(e);
    }
  }

  const sendQuery = useCallback(fetch, [setLoading, setError, setList]);

  useEffect(() => {
    console.log('useEffect in useFetch');
    sendQuery();
  }, [query, sendQuery, page]);

  return { loading, error, list };
}

export default useFetch;