import supabase from '../supabaseClient';
/*
- POST table schema : {id, created_at, content, like, name, tag, title, view}
- supabase return { data, status, statusText }
*/

class PostApi {
  #TABLE_NAME = 'POSTS';

  constructor() {}

  async getRecentPosts({ startNo, rownum }) {
    const response = await supabase
      .from(this.#TABLE_NAME)
      .select()
      .range(startNo, startNo + rownum)
      .order('id', { ascending: false });
    return this.#getResult(response, []);
  }

  async getPopularPosts() {
    const response = await supabase
      .from(this.#TABLE_NAME)
      .select()
      .gte('view', 10)
      .limit(5)
      .order('view', { ascending: false });
    return this.#getResult(response, []);
  }

  async getMyPosts() {
    const response = await supabase
      .from(this.#TABLE_NAME)
      .select()
      .order('id', { ascending: false }) // 오더 독스에서 검색하기.
      .eq('name');
    //유저 ID를 가져와야 한다. 해당 컬럼에서 , 뒤에 일치하는 값을 가져옴
    //현재 로그인 되어 있는 유저의 아이디를 가져와서 넣어준다. 전역변수에서 ID값만 가져와서 넣어준다.
    return this.#getResult(response, []);
  }

  async search(keyword) {
    const response = await supabase.from(this.#TABLE_NAME).select().like('title', `%${keyword}%`);
    return this.#getResult(response, []);
  }

  #getResult(response, defaultValue) {
    const status = response.status;
    if (status === 200) {
      return response.data;
    }
    console.warn(`${status} : ${response.statusText}`, response.error);
    return defaultValue;
  }
}

export default PostApi;
