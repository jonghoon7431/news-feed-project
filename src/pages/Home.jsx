import React, { useEffect } from 'react';
import supabase from '../supabaseClient';

function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('POSTS').select('*');

      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h3>user info </h3>
    </div>
  );
}

export default Home;
