import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditPost from '../components/EditPost';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ReadPost from '../components/ReadPost';
import supabase from '../supabaseClient';

function Post() {
  const [isEdit, setIsEdit] = useState(false);

  const [targetData, setTargetData] = useState({});
  const paramsId = Number(useParams().id);

  useEffect(() => {
    const fetchThisData = async () => {
      const { data, error } = await supabase.from('POSTS').select('*').eq('id', paramsId);
      if (error) {
        console.log(error);
      } else {
        setTargetData(data[0]);
      }
    };

    fetchThisData();
  }, []);

  return (
    <>
      <Header />
      {isEdit ? (
        <EditPost targetData={targetData} setTargetData={setTargetData} setIsEdit={setIsEdit} paramsId={paramsId} />
      ) : (
        <ReadPost isEdit={isEdit} setIsEdit={setIsEdit} targetData={targetData} paramsId={paramsId} />
      )}
      <Footer />
    </>
  );
}

export default Post;
