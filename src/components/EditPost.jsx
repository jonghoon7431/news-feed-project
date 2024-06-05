import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

function EditPost({ targetData, setTargetData, setIsEdit, postId }) {
  const navigate = useNavigate;
  const { title, content, tag } = targetData;

  const onChangeHandler = (e) => {
    setTargetData({ ...targetData, [e.target.name]: e.target.value });
  };

  const editHandler = async () => {
    const { error } = await supabase
      .from('POSTS')
      .update({
        title: title,
        content: content,
      })
      .eq('id', postId);
    if (error) {
      console.error(error);
      alert('수정 실패. 잠시 후 다시 시도해주세요');
    } else {
      alert('수정되었습니다');
      setIsEdit(false);
    }
  };
  return (
    <div className="flex flex-col h-[100vh] w-full bg-gray-300">
      <div className="h-[20vh] bg-red-300">
        <label>제목</label>
        <input type="text" value={title} name="title" onChange={onChangeHandler} />
      </div>
      <div className="bg-yellow-200">
        <label>내용</label>
        <textarea type="text" value={content} name="content" onChange={onChangeHandler} />
      </div>
      <input type="text" value={tag} name="tag" onChange={onChangeHandler} />
      <button onClick={editHandler}>수정 완료</button>
      <button onClick={() => navigate(-1)}>취소</button>
    </div>
  );
}

export default EditPost;
