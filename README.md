# 서울시립미술관 전시안내

서울시립미술관의 전시 정보를 안내해주는 웹 페이지입니다.

### 주제

- 회원가입 및 데이터 저장, 수정, 삭제 기능 등 웹 사이트의 기본적인 기능 구현
- Next.js를 이용한 프론트엔드-백엔드 동시 개발
- 배포 Page : [https://our-museum.vercel.app/](https://our-museum.vercel.app/)

### 개요

- 개발 인원 : 1인 (개인 프로젝트)
- 개발 기간 : 2023.05.

### 사용 기술

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/> <img src="https://img.shields.io/badge/React Query-FF4154?style=flat-square&logo=React Query&logoColor=white"/> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>

### Frontend 개발 내용

- **회원가입 및 마이페이지**

  - 이메일 계정 및 구글 계정으로 회원 가입을 할 수 있고, 회원가입 후 마이페이지에서 프로필을 수정할 수 있습니다.
  - 로그인을 하면 전시 정보와 미술관 정보를 북마크로 저장하고, 마이페이지에서 확인할 수 있습니다.
  - 마이페이지에서 북마크된 항목의 오른쪽 상단 마이너스 아이콘을 클릭하면 북마크를 삭제할 수 있습니다.

- **네비게이션 바**

  - 네비게이션 바의 이름을 클릭하면 해당 섹션으로 이동합니다.

- **메인 페이지**

  - 현재 전시 중인 작품은 슬라이드로, 지난 전시는 애니메이션으로 확인할 수 있습니다.

- **상세 페이지**
  - 로그인 상태에서는 각 상세 페이지에 북마크 아이콘이 나타납니다. 북마크 아이콘을 클릭하면 마이페이지에 전시 정보가 저장됩니다.

### Backend 개발 내용

- Next.js api로 프론트엔드와 같은 출처의 서버를 생성하여 공공 API의 CORS 에러 방지
- 프론트엔드의 path parameter, query string 방식의 요청을 RESTful하게 응답
