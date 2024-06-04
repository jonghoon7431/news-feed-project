import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabaseClient';

function Post() {
  const [targetData, setTargetData] = useState([]);
  const paramsId = useParams().id;

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('POSTS').select('*').eq('id', paramsId);
      if (error) {
        console.log(error);
      } else {
        setTargetData(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* <h1>{targetData.title}</h1> */}
      {targetData.map((data) => {
        return (
          <div key={data.id}>
            <h1>{data.title}</h1>
          </div>
        );
      })}
      <h1>dd</h1>
    </div>
  );
}

export default Post;
