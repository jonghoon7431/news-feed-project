# React 뉴스피드 프로젝트

<aside>
🔥 **Intro: 뉴스피드 프로젝트**

</aside>

여러분! 드디어 프로젝트 시작입니다!

이번에는 본격적으로 리액트를 활용하여 협업 프로젝트를 진행해볼텐데요.

뉴스피드가 포함 되어있는 프로젝트를 진행해보겠습니다!

<aside>
👣 **잠깐! 우리 어디까지 왔을까요?**

- 확인하기
    
    ---
    
    0.  OT - 웹개발종합반 / 토이프로젝트
    
    1. 팀 소개페이지 미니 프로젝트
    
    2. 프로그래밍 기초
    
    **3.  주특기** 
    
    **3-1.  주특기 입문**
    
    **3-2.  주특기 숙련**
    
    **3-3. 뉴스피드 프로젝트 📌now! 5/31~6/7**
    
    ---
    
    **3-4.  주특기 심화**
    
    **3-5. 아웃소싱 프로젝트**
    
    ---
    
    **3-6. 주특기 플러스**
    
    **3-7. 심화 프로젝트**
    
    4. 최종프로젝트 
    
    5. 지원주차
    
</aside>

### **뉴스 피드란? 내 게시물을 포함한 모든 게시물을 볼 수 있는 공간**

**→ 블로그, 커뮤니티, SNS 모두 될 수 있어요. *뉴스를 보여주는 사이트가 아니에요!*** 

- 이를테면 이런 서비스들이 있습니다.
    
    *디스콰이엇은 스파르타 수료생들이 만든 서비스로, 최근에 시리즈A 투자도 받았답니다.
    
    비즈니스(구직, 채용) 중심 SNS, **링크드인**
    
    [LinkedIn: Log In or Sign Up](https://www.linkedin.com/)
    
    IT 서비스 메이커들의 커뮤니티, **디스콰이엇**
    
    [Disquiet*](https://disquiet.io/)
    
    개발자를 위한 블로그 서비스, **벨로그**
    
    [velog](https://velog.io/)
    
    한국 최대 비즈니스 네트워크, **로켓펀치**
    
    [로켓펀치 - 비즈니스 네트워크](https://www.rocketpunch.com/)
    

---

<aside>
💡 **What to do: 프로그래밍 기초 지식을 바탕으로 프로젝트를 기획하고 만들어봅시다!**

</aside>

<aside>
📌 **여러분도 서비스를 기획해보시고, 
필수 기능을 구현해서 여러분만의 서비스를 만들어보세요!**

</aside>

### **협업을 위한 방법** 💑

1. 우리 팀이 만들 서비스 기획 대한 충분한 논의합니다.

<aside>
❓ **< 각 팀의 팀장님은 팀원에게 이런 질문을 먼저해볼까요? >**
- 우리 팀은 이번에 어떤 서비스를 만들어보면 좋을까요?
   - 일상생활의 불편함, 아쉬움을 생각해보면 편해요~
- 우리 팀은 어떤 기능들을 구현해볼까요?
- 각 기능은 누가 맡아서 진행할까요?
- 마감 기한은 어떻게 정할까요? 배포 시기는 언제로 할까요?

</aside>

<aside>
❗ **난이도는 중요하지 않아요**. 스코프가 너무 넓거나 깊을 필요 없습니다!

1. 역할을 적절하게 나눠 주세요. 난이도에 따라 역할을 나누고 마감 기한에 맞춰 서로 도우며 완성해주세요.
2. 꼭 구현해야 하는 기능을 우선순위로 두고, 마감 기한을 정해서 우선 완성 해봅시다!
3. 혹시 마감보다 일찍 마무리 했다면 추가 기능 구현에 도전 해봅시다!
</aside>

- 1. 결과물에 대한 목업(MOCKUP) 그려보기
    - 주요 색상 혹은 프레임 디자인 등 
    (스파르타 코딩클럽 스타일, Google 스타일, NAVER 스타일 등 원하는 스타일)
    - PPT, 피그마 등 자유롭게 도구를 활용해주세요.
        
        [UX의 기본, 와이어프레임은 어떻게 작성하는 것일까](https://brunch.co.kr/@second-space/27)
        
- 2. 목업을 기반한 웹 페이지 기능에 관한 논의
    1. 회원 가입/로그인 페이지
    2. 메인 페이지
    3. 마이 페이지 
- 3. 기술 개발 및 결합 과정의 방법 논의
    - 브랜치를 어떻게 나누고 어떻게 병합할 것인지
    - 어느 시점에 브랜치 병합을 할 것인지
    - 일반적으로 브랜치를 이렇게 나눠요
        - 마스터 브랜치(master) - 배포용
        - 디벨롭 브랜치(dev)
        - 기능 단위 별 브랜치(i-12)
    - 병합 순서는 대체로 이렇게 진행해요.
        - 기능 단위 별 브랜치 — 병합 → 디벨롭 브랜치 —최종병합→ 마스터 브랜치

---

### 개발 프로세스 가이드

<aside>
1️⃣ **개발 프로세스 가이드**

</aside>

- 1. Vite 프로젝트 셋업
    - Vite 프로젝트 생성은 yarn create vite [project-name] —template react 또는 npx create-vite [project-name] —template react 중 아무 방법이나 상관없습니다.
    - 그러나 프로젝트 생성 이후에는 팀 내에서 npm, yarn 중 하나를 선택해서 사용하는 것을 권장 드립니다.
    - npm을 사용할 경우 package-lock.json 파일, yarn을 사용할 경우, yarn.lock 파일이 github에 함께 공유되어야 의존성 라이브러리들의 버전을 일관성있게 관리 할 수 있어 동일한 개발환경을 유지하는 데 도움을 줍니다.
    - 팀원 중 대표로 한분이 github repository 를 만들고 팀원들과 공유합니다.
- 2. .prettierrc 파일 만들기
    - 팀원들과 코드포맷팅 규칙을 동일하게 설정하기 위해 .prettierrc 을 깃헙에 공유해서 활용합니다.
        
        ‼ 아직 prettier 익스텐션 설치 및 format on save 설정이 안된 분은 꼭 해주세요!
        
    - .prettierrc Sample:  root directory (package.json 과 같은 레벨의 위치)에 .prettierrc 파일을 만들고 아래 코드를 붙여 넣습니다. 팀원 간의 조율을 통해 포맷팅 설정을 변경해도 좋습니다.
        
        ```jsx
        {
            "printWidth": 120,
            "tabWidth": 2,
            "useTabs": false,
            "semi": true,
            "singleQuote": true,
            "bracketSpacing": true,
            "trailingComma": "none"
        }
        ```
        
- 3. supabase 셋업 (서버 및 DB 셋업)
    - Supabase 가이드 확인하기
    • [https://vintz.notion.site/Supabase-191093692b8242d6858619a2d968929f](https://www.notion.so/Supabase-191093692b8242d6858619a2d968929f?pvs=21)
- 4. 환경변수(.env.local) 셋업
    - supabase 의 계정 정보(api_key포함) 등 보안이 필요한 정보들은 .env.local 파일에 담아서 github에 공유되지 않도록 합니다.
    - root directory 에 .env.local 이란 이름의 파일을 만듭니다.
        
        ⭐️ .env.local은 Vite로 리액트 프로젝트 생성 시 .gitignore에 기본으로 기입되어 github에 공유되지 않습니다.
        
    - .env.local  예시 (supabase에서 본인의 URL과 KEY등을 참고해서 만듭니다.)
        
        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/83c75a39-3aba-4ba4-a792-7aefe4b07895/ac6c965b-a1d1-4cdf-af89-8d2249f8606b/Untitled.png)
        
        ## ⬇️ 위를 참조해서 .env.local 내용 구성
        
        ```jsx
        //.env.local
        VITE_SUPABASE_URL = "MY_SUPABASE_URL"
        VITE_SUPABASE_KEY = "MY_SUPABASE_KEY"
        ```
        
        ```jsx
        import { createClient } from "@supabase/supabase-js";
        
        const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
        const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_KEY;
        
        const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);
        
        export default supabase;
        ```
        
    - Vite 환경변수 핸들링
        
        [Vite의 환경 변수와 모드](https://ko.vitejs.dev/guide/env-and-mode)
        
- 5. Git 브랜치 관리 권장사항
    - main/master 또는 dev/develop 브랜치에 직접 push 하는 것은 지양해야 합니다.
    - 권장하는 브랜치 관리 Flow 예시
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3934cb30-882b-4cbc-80cf-7683b924465f/Untitled.png)
        

<aside>
2️⃣ **프로젝트 구현 필요사항**

</aside>

### 필수 구현 사항

- [ ]  로그인, 회원 가입
    - Authentication 에서 제공하는 api를 이용하여 아래 회원 가입, 로그인을 구현해보세요.
        - 이메일, 패스워드
        - 참고 자료: https://supabase.com/docs/reference/javascript/auth-signup
- [ ]  CRUD
    - supabase 에서 제공하는 api를 이용하여 CRUD 데이터베이스 핸들링을 구현해보세요.
    - CUD(등록, 수정, 삭제)가 일어날 때 마다 R(조회)해서 자연스럽게 화면 변경을 해보세요.
- [ ]  마이 페이지
    - 내 게시물 보기
        - Authentication 에서 제공하는 uid 를 이용해서 내 게시물들이 보일 수 있게 해보세요.
    - 프로필 수정 기능
        - Storage 에서 제공하는 api를 이용하여 이미지 업로드와 다운로드 url 을 받아서 이미지 핸들링을 해보세요.
        - 참고자료: https://supabase.com/docs/reference/javascript/storage-createbucket
- [ ]  배포하기
    - Vercel 이라는 호스팅플랫폼을 이용해 배포합니다.
    - 배포에 적용될 브랜치는 main 브랜치로 적용합니다.
    
    [리액트 배포하기 (vercel)](https://www.notion.so/vercel-e4039e5f8c7841ac960a2e9d840330c3?pvs=21)
    
- [ ]  Git을 최대한 활용해보기!
    - Pull Request 활용하기!
        - Merge는 Pull Request를 활용하여 진행한다.
        - 참고
            - [https://xo.dev/github-collaboration-guide/#pull-request-만들기](https://xo.dev/github-collaboration-guide/#pull-request-%EB%A7%8C%EB%93%A4%EA%B8%B0)
    - Branch 만들어 작업하기
        - 참고
            - [https://xo.dev/github-collaboration-guide/#git-브랜치-만들어-작업하기](https://xo.dev/github-collaboration-guide/#git-%EB%B8%8C%EB%9E%9C%EC%B9%98-%EB%A7%8C%EB%93%A4%EC%96%B4-%EC%9E%91%EC%97%85%ED%95%98%EA%B8%B0)
            - https://blog.outsider.ne.kr/1505
    - 코드 리뷰 해보기!
        - 참고
            - [https://xo.dev/github-collaboration-guide/#코드-리뷰-하기](https://xo.dev/github-collaboration-guide/#%EC%BD%94%EB%93%9C-%EB%A6%AC%EB%B7%B0-%ED%95%98%EA%B8%B0)

### 도전 과제

- [ ]  로그인, 회원가입 예외 처리
- [ ]  소셜 로그인 (구글, 깃헙)
- [ ]  비밀번호 찾기 기능
- [ ]  팔로우, 팔로워 기능
- [ ]  팔로우한 상대 게시물 확인 기능
- [ ]  댓글 기능
- [ ]  좋아요, 북마크 기능
- [ ]  반응형 웹 구현
- [ ]  무한스크롤 기능
- [ ]  더보기 기능
- [ ]  memo, useMemo, useCallback 을 이용한 렌더링 최적화 적용
- [ ]  Vercel 에 배포한 뒤 커스텀 도메인 적용 (500원 정도하는 저렴한 도메인 권장)

<aside>
3️⃣ **체크리스트**

</aside>

- **SPA**
    - [ ]  react-router-dom 적용: path에 따라 렌더링할 페이지 컴포넌트를 지정
    - [ ]  CSR (Client Side Rendering)적용 : 서버로부터 json 데이터 받아와 새로고침 없이 화면 전환
- **CRUD**
    - [ ]  게시글 쓰기 기능 구현
    - [ ]  게시글 글 보여주기 구현
    - [ ]  게시글 글 수정 구현
    - [ ]  게시글 글 삭제 구현
- **스타일링 방식**
    - [ ]  styled-components 적용
- **상태관리 라이브러리**
    - [ ]  Redux 적용
- **Git**
    - [ ]  git add / commit / push 활용
    - [ ]  git 브랜치/ PR / merge 활용
    - [ ]  github pull request에서 Code review 활용
- **배포**
    - [ ]  Vercel 을 이용하여 배포하기
    - [ ]  가비아 또는 고대디 같은 도메인 판매 업체에서 도메인을 구매하여 커스텀 도메인 적용 (선택)

---

<aside>
📌 **팀 노션**

</aside>

- 새로운 팀에서도 서로를 존중하는 말과 겸손함으로 좋은 협업 경험을 만드는 팀이 되었으면!
    - 👉 [[주특기 입문주차 팀 편성 확인] 바로가기](https://docs.google.com/spreadsheets/d/1TbFQScXHNoF2cAo0tSAaMmGw5bIOenBJYUd4bCEwHjQ/edit?usp=sharing)
- 복제 후 여러분의 팀노션을 자유롭게 꾸며보세요.
- 팀 별로 프로젝트 계획을 세웁니다.
    - 매일 오전 9시 출석체크 후 하루 계획 회의
    - 16시에 모여서 진척도 공유 및 문제 상황 해결

<aside>
👩‍👩‍👦‍👦 **A반**

</aside>

[히사이시 조(A01조)](https://www.notion.so/A01-63118aca667041f9b1ed14b9a52ec5b0?pvs=21)

[이쿠조 (A02)](https://www.notion.so/A02-26ce4a0f41ff45feb56c8b9687ee1232?pvs=21)

[공부하기시조 (A-03)](https://www.notion.so/A-03-a9c508f6777b4a50ab30c915f7caaf89?pvs=21)

[용사조🐉 (A04)](https://www.notion.so/A04-14dc580d21244e7bbb1e579e45711ba9?pvs=21)

[5늘만놀조 (A05조)](https://www.notion.so/5-A05-1556637657da467f857066c19fe3d66a?pvs=21)

[핫식스조(A06)](https://www.notion.so/A06-11da94b1b3fd49649b196b5831661d36?pvs=21)

[칠칠맞조 (A07)](https://www.notion.so/A07-593041dc9c5e4c2f912e71586330a72a?pvs=21)

[팔좀주물러조(A08조)](https://www.notion.so/A08-e7e56bff62184a6180a77040da2a084a?pvs=21)

[구구콘(A 9조)](https://www.notion.so/A-9-00fbbd722c644260becc8226d19503e1?pvs=21)

[보고10조(A10조)](https://www.notion.so/10-A10-5fe225a2ed304941a0feadf45b495268?pvs=21)

[하지만 빨랐조? (A 11조)](https://www.notion.so/A-11-27437d9ea6d04aae98f2e6772a3f8fdd?pvs=21)

[거기 112조!? (A12조)](https://www.notion.so/112-A12-deb363db083f40f389ddbc51e6c31bf8?pvs=21)

[SEVENTEEN(A-13)](https://www.notion.so/SEVENTEEN-A-13-ae7cb169c15340afbe8184d055bca16d?pvs=21)

<aside>
👩‍👩‍👦‍👦 **B반**

</aside>

[이러다 죽는건 시간문제조 😫😱😵 (B01조)](https://www.notion.so/B01-ea50339155884f938bcf8abffd9044f8?pvs=21)

[🍓코드 블랙베리 (B02조)](https://www.notion.so/B02-fde9acc6645e4d6f80b6d95dbf10aab0?pvs=21)

[삼시세끼조 (B03조)](https://www.notion.so/B03-207ac11987a14da99a4b442ad84bf386?pvs=21)

[연봉 4조 (B04조)](https://www.notion.so/4-B04-e70dec1f2f294ad88feb55d42e799481?pvs=21)

[     I 사이에 피어난 E 조 (B05조)](https://www.notion.so/I-E-B05-0cf408c51da446fba36495f4cc4c2112?pvs=21)

[피도 눈물도 없조 (B06조)](https://www.notion.so/B06-8607a735943443d889c83102e9f258fa?pvs=21)

[비타민 B7 (B07조)](https://www.notion.so/B7-B07-839518991c1440328fed32499c6af8e9?pvs=21)

[윤문열(B-08)](https://www.notion.so/B-08-a9d5c934f5a2498d991fbe0779ba8336?pvs=21)

[엄마용돈조(B09)](https://www.notion.so/B09-0bb6536707e0447f8ae3b915bf33d7cf?pvs=21)

[게임알려조(B10조)](https://www.notion.so/B10-c62a4500ae1b4d4e9dff249b3a9f8ce8?pvs=21)

[세명남았조 (B-11)](https://www.notion.so/B-11-4173bdb9f1a243a6b2e26191d5841f67?pvs=21)

[빡빡이조😍 (B-12조)](https://www.notion.so/B-12-064988966b724ea89dbe022ca0c84e4d?pvs=21)

[개발무법자(B13조)](https://www.notion.so/B13-fe7a7c69898e47c983585fdcdf83b54c?pvs=21)

[(B14조) 슈퍼루키](https://www.notion.so/B14-c04b84135473483b88628e5ff47d64d4?pvs=21)

<aside>
📝 **S.A (Starting Assignments) : 시작 전 꼭 작성합시다.**

</aside>

- 제출 기한: **5/31(금) 16:00까지**
- 제출 링크
    
    [](https://forms.gle/HTBriajomMgwhoC99)
    
- 예시
    
    [6캔두잇](https://www.notion.so/6-e1a657a6826f488d83bfb795732c7e6c?pvs=21)
    
    [7-  7ㅏ보조](https://www.notion.so/7-7-247388aa6c6449e191b553ce9416dcb7?pvs=21)
    
    [8조 조랭이떡🫧](https://www.notion.so/8-21aacb3dc1a44a20aec229c07cbbae42?pvs=21)
    
- 1. 프로젝트 제목/간단 설명
    
    프로젝트 명칭, 그리고 서비스의 핵심적인 목적 또는 기능에 대해 설명해주세요.
    
    프로젝트 명은 언제든 변경해도 괜찮으니 부담 갖지 말고 가볍게 지어보세요!
    
- 2. 와이어 프레임
    - 예시를 위한 기본형입니다. 실제 프로젝트는 여러분의 프로젝트 성격에 맞게 마음껏 꾸며주세요!
    
    ![Untitled Diagram.drawio.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3e2e794f-cae2-4c95-b4bc-d686a1ba244a/Untitled_Diagram.drawio.png)
    
    - 이렇게, 손으로 그려보아도 좋아요. 최대한 구체적으로 그리는 것이 핵심입니다.
    
    !https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2c5becda-1345-4b1b-9f51-8433b9a44144/Untitled.png
    
- 3. 역할 분담(WBS)
    
    팀원별로 어떤 기능을 메인으로 두고 개발을 진행할 건지 작성해주세요.
    
- 주의할 것!
    - 도전 과제는 필수가 아닙니다.
    - 우선순위를 잘 고려하여 마감 기한을 지켜주세요.

<aside>
🗒️ 🌟**중요**🌟 **제출해야 할 것**

</aside>

<aside>
⚠️ 내일배움캠프는 고용노동부와 함께하는 K-Digital Training 과정으로, 국가에서 지원해주는 국가 사업입니다.

- **프로그램 참여 증빙을 위한 모든 수강생은 수료를 위해 
반드시 결과보고서를 제출해주셔야 합니다.**
</aside>

1. **프로젝트 소스코드 → 2개**
- 링크 형태로 제출 : **Github 레포지토리**를 제출
    
    **외부공개용 레포지토리**를 따로 만드는 것을 권장
    
    Unity 트랙 예시 : https://github.com/TodangTodang/TodangTodangPublic
    
- 파일 형태로 제출 : Github 레포지토리를 **ZIP으로 내려받아 제출**
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/83c75a39-3aba-4ba4-a792-7aefe4b07895/b6acb856-ef10-4443-8deb-97339b80ee2f/Untitled.png)
    
- ‣
    - ‣

1. **결과보고서 PPT**
    - 조건에 맞는 항목을 갖춘 PPT를 반드시 제출
    - [결과보고서 PPT 가이드라인](https://www.notion.so/PPT-37e75aa48d6345c5bb5153391e5e6e62?pvs=21)
    - 강의 지급 완료
        
        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/83c75a39-3aba-4ba4-a792-7aefe4b07895/c3347bf7-f6a1-490b-a87c-f0eef3bbcffc/Untitled.png)
        

1. **프로젝트 시연 영상**
    - 조건에 맞는 항목을 갖춘 시연 영상을 반드시 제출
    - [시연 영상 촬영 가이드라인](https://www.notion.so/c77277574a7e4440b854013b88cdb975?pvs=21)

<aside>
🏁 **Goal: 최종 제출 및 발표**

</aside>

- 제출 기한: **6/7 (금) 12:00까지**
- 제출 링크
    
    [](https://forms.gle/2KWtvgrDzcbvRejQ8)
    
- 제출할 것
    1. 소스코드 Public 링크
    2. 소스코드 ZIP 파일
    3. 시연 영상 전체공개 링크
    4. 시연 영상 파일
    5. 결과보고서 PDF 링크
    6. 결과보고서 PDF 파일
- 발표 장소 : ZOOM 링크는 당일 공개 예정
- 발표 진행 상세
    - 발표는 팀 내의 어떤 분이 하셔도 좋습니다.
    - 발표 시간에는 팀 전원이 **`필수`** **카메라는 모두 켜주세요!**
        - 발표는 1명이 진행하지만 긴장감은 팀원들이 함께 덜어주세요.
    - 아래 두가지를 이용하여 7~10분 분량의 발표를 진행해주세요.
        - 발표 자료(PDF) **`필수`**
        - 시연 영상 **`권장`** (영상 분량이 5~10분이다보니 필요시 일부만 활용해주세요)

<aside>
✅ 🌟**중요**🌟 **프로젝트 평가 기준**

</aside>

[뉴스피드 프로젝트 평가 기준](https://www.notion.so/0b1d8c21d5424d9693fc315c1ae23671?pvs=21)

<aside>
⏰ **뉴스피드 프로젝트 타임라인: 5/31(금) ~ 6/7(금)**

</aside>

- **5/31(금) 16:00까지** : 프로젝트 S.A. 제출
    - 제출 링크
        
        [](https://forms.gle/HTBriajomMgwhoC99)
        
- **6/7 (금) 12:00까지** : 프로젝트 완성 및 시연 영상 녹화본(5분~10분) 제출
    - 제출 링크
        
        [](https://forms.gle/2KWtvgrDzcbvRejQ8)
        
- **6/7 (금)**
    - `15:00`: 프로젝트 발표회
    - `17:30` : 다면평가 설명
    - `19:00` : 연봉1억 받는 개발자 되는 법 특강

<aside>
❗ **주의할 것**

</aside>

- 프로젝트는 마감을 지키는 연습
- 어떤 기술을 사용할지 보다 플래닝이 더 중요
- 내가 어떤 기술을 기깔나게 해내는 건 중요하지 않습니다.
- 진짜 중요한 것은
    - **“문제에 부딪히며 해결해나가는 과정을 회고할 수 있어야 한다”**
    - **“크고 작음과 상관없이 팀이 목표한 바를 이루어냈는가”**
    - **“그 목표를 이루기 위해 나는 스스로 어떤 노력을 했는가”**
- `중요` 모든 주제 다 좋은데, **인스타그램 클론코딩은 안됩니다 !! 레퍼런스를 참고하는건 좋지만 절대 코드 베끼기로 프로젝트 구성하시면 안됩니다 !!**
- **개발 진행에 따른 기록 작성(★★★★★)**
    - 개발 혹은 개발을 위한 공부를 진행 할 때마다 간략한 글 작성하기 ( ※ 티스토리, velog, 카카오 브런치, 네이버 블로그 등 불특정 다수가 확인 가능한 소셜 플랫폼 활용)
        1. 어떠한 이유로 해당 `기능`을 사용하였는지
            
            ※ [강의]에서 배웠습니다. 라는 이유는 피해주세요.
            
        2. 해당 기능의 `코드`는 어떠한 `로직`을 가지고 있는지
            
            ※ 입력값이 들어가면 어떠한 코드를 통해 어떠한 값으로 변화하는지
            
        3. `코드`를 작성하며 발견된 `버그`나 `오류`는 어떠한 게 있었는지 그리고 어떻게 **해결**하였는지.
        
- 문제가 잘 풀리지 않는다면, 참고해보세요!
    - [에러를 발견한다면!](https://www.notion.so/916f465b27de4f9698dbf916b2d424ce?pvs=21)
    - [모르는 건 어떻게 찾아볼까요?](https://www.notion.so/b33117aae81c4839bc786b205ea1e844?pvs=21)
