# 🚇 지하철 노선도 미션

## 🚀 기능 요구사항

### 지하철 역 관련 기능
- 지하철 역을 등록하고 삭제할 수 있다. (단, 노선에 등록된 역은 삭제할 수 없다)
- 중복된 지하철 역 이름이 등록될 수 없다.
- 지하철 역은 2글자 이상이어야 한다.
- 지하철 역의 목록을 조회할 수 있다.

### 지하철 노선 관련 기능
- 지하철 노선을 등록하고 삭제할 수 있다.
- 중복된 지하철 노선 이름이 등록될 수 없다.
- 노선 등록 시 상행 종점역과 하행 종점역을 입력받는다.
- 지하철 노선의 목록을 조회할 수 있다.

### 지하철 구간 추가 기능
- 지하철 노선에 구간을 추가하는 기능은 노선에 역을 추가하는 기능이라고도 할 수 있다.
  - 역과 역사이를 구간이라 하고 이 구간들의 모음이 노선이다.  
- 하나의 역은 여러개의 노선에 추가될 수 있다.
- 역과 역 사이에 새로운 역이 추가 될 수 있다.
- 노선에서 갈래길은 생길 수 없다.

<img width="500" src="/images/section1.png">

### 지하철 구간 삭제 기능
- 노선에 등록된 역을 제거할 수 있다.
- 종점을 제거할 경우 다음 역이 종점이 된다.
- 노선에 포함된 역이 두개 이하일 때는 역을 제거할 수 없다.

<img width="500" src="/images/section2.png">

### 지하철 노선에 등록된 역 조회 기능
- 노선의 상행 종점부터 하행 종점까지 연결된 순서대로 역 목록을 조회할 수 있다.

<br/>

## 💻 프로그램 실행 결과

### 역관리
<img width="100%" src="/images/station_manager.gif">

### 노선관리
<img width="100%" src="/images/line_manager.gif">

### 구간관리
<img width="100%" src="/images/section_manager.gif">

### 노선도 출력
<img width="100%" src="/images/map_print_manager.gif">


## ✅ 프로그래밍 요구사항

### 메뉴 버튼
- 역 관리 button 태그는 `#station-manager-button` id값을 가진다.
- 노선 관리 button 태그는 `#line-manager-button` id값을 가진다.
- 구간 관리 button 태그는 `#section-manager-button` id값을 가진다.
- 지하철 노선도 출력 관리 button 태그는 `#map-print-manager-button` id값을 가진다.

### 지하철 역 관련 기능
- 지하철 역을 입력하는 input 태그는 `#station-name-input` id값을 가진다.
- 지하철 역을 추가하는 button 태그는 `#station-add-button` id값을 가진다.
- 지하철 역을 삭제하는 button 태그는 `.station-delete-button` class값을 가진다.

### 지하철 노선 관련 기능
- 지하철 노선의 이름을 입력하는 input 태그는 `#line-name-input` id값을 가진다.
- 지하철 노선의 상행 종점을 선택하는 select 태그는 `#line-start-station-selector` id값을 가진다.
- 지하철 노선의 하행 종점을 선택하는 select 태그는 `#line-end-station-selector` id값을 가진다.
- 지하철 노선을 추가하는 button 태그는 `#line-add-button` id값을 가진다.
- 지하철 노선을 삭제하는 button 태그는 `.line-delete-button` class값을 가진다.

### 지하철 구간 추가 기능
- 지하철 노선을 선택하는 button 태그는 `.section-line-menu-button` class값을 가진다.
- 지하철 구간을 설정할 역 select 태그는 `#section-station-selector` id값을 가진다.
- 지하철 구간의 순서를 입력하는 input 태그는 `#section-order-input` id값을 가진다.
- 지하철 구간을 등록하는 button 태그는 `#section-add-button` id값을 가진다.
- 지하철 구간을 제거하는 button 태그는 `.section-delete-button` class값을 가진다.

### 지하철 노선도 출력 기능
- 지하철 노선도 출력 버튼을 누르면 `<div class="map"></div>` 태그를 만들고 해당 태그 내부에 노선도를 출력한다.

### 기존 요구사항

- 사용자가 잘못된 입력 값을 작성한 경우 `alert`을 이용해 메시지를 보여주고, 재입력할 수 있게 한다.
- 외부 라이브러리(jQuery, Lodash 등)를 사용하지 않고, 순수 Vanilla JS로만 구현한다.
- **자바스크립트 코드 컨벤션을 지키면서 프로그래밍** 한다
  - [https://google.github.io/styleguide/jsguide.html](https://google.github.io/styleguide/jsguide.html)
  - [https://ui.toast.com/fe-guide/ko_CODING-CONVENSION/](https://ui.toast.com/fe-guide/ko_CODING-CONVENTION)
- **indent(인덴트, 들여쓰기) depth를 3이 넘지 않도록 구현한다. 2까지만 허용**한다.
  - 예를 들어 while문 안에 if문이 있으면 들여쓰기는 2이다.
  - 힌트: indent(인덴트, 들여쓰기) depth를 줄이는 좋은 방법은 함수(또는 메소드)를 분리하면 된다.
- **함수(또는 메소드)의 길이가 15라인을 넘어가지 않도록 구현한다.**
  - 함수(또는 메소드)가 한 가지 일만 잘 하도록 구현한다.
- 변수 선언시 `var` 를 사용하지 않는다. `const` 와 `let` 을 사용한다.
  - [const](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/const)
  - [let](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/let)
- `import` 문을 이용해 스크립트를 모듈화하고 불러올 수 있게 만든다.
  - [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/import](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/import)
- `template literal`을 이용해 데이터와 html string을 가독성 좋게 표현한다.
  - [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals)

### 추가된 요구사항
- [data](https://developer.mozilla.org/ko/docs/Learn/HTML/Howto/%EB%8D%B0%EC%9D%B4%ED%84%B0_%EC%86%8D%EC%84%B1_%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)속성을 활용하여 html 태그에 역, 노선, 구간의 유일한 데이터 값들을 관리한다. 
- [localStorage](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)를 이용하여, 새로고침하더라도 가장 최근에 작업한 정보들을 불러올 수 있도록 한다.

<br/>

## 📝 미션 저장소 및 진행 요구사항

- 미션은 [https://github.com/woowacourse/javascript-subway-map-precours](https://github.com/woowacourse/javascript-subway-map-precourse) 저장소를 fork/clone해 시작한다.
- **기능을 구현하기 전에 javascript-subway-precourse/docs/README.md 파일에 구현할 기능 목록**을 정리해 추가한다.
- **git의 commit 단위는 앞 단계에서 README.md 파일에 정리한 기능 목록 단위로 추가**한다.
- [프리코스 과제 제출](https://github.com/woowacourse/woowacourse-docs/tree/master/precourse) 문서 절차를 따라 미션을 제출한다.



기능정리

1. 역
- 화면
 - 역 form
  - 역 이름 label
  - 역 이름 input 
  - 역 추가 button
 - 지하철 역 목록 title
 - 지하철 역 목록 table
  - tr 
   - th 역이름
   - th 설정
  - tr data-set index?
   - td ${stationName}
   - td button 삭제


 - 추가
  - 중복하면 안됨 (찾기함수로 체크 후 추가)
  - 글자는 2글자 이상

- 삭제
 - 노선에 등록된 역 삭제 불가(노선 찾기로 체크 후 삭제)
 - advance) 돔 하나만 삭제하기 성능 최적화

- 공통함수 찾기
 - 이름 혹은 index로 찾기

- 리스트
 - table에 이름과 삭제버튼을 생성
 - 삭제버튼마다 클릭 이벤트리스너 추가
  - advance로 이벤트 위임을 이용한 최적화 고려

2. 노선
 - 화면
  - 노선 추가 form
   - 노선 이름 label
   - 노선 이름 input
   // select tag 공부 필요!
   - 상행종점 select -> stations 이용
   - 하행종점 select -> stations 이용
   - 노선추가 button type=submit 
  - 지하철 노선 목록 title h2?
  - 지하철 노선 목록 table
   - tr
    - th 노선 이름
    - th 상행 종점역
    - th 하행 종점역
    - th 설정 
     - button 삭제 addEventListener click

 - 기능
  - 등록(추가)
   form validation check(required) 
   - 중복 x
   - 이름이 빈칸이면 안된다.
   - 상행과 하행이 겹치면 안된다.
    - advance) 2호선처럼 순환노선이 가능하다면?
  
  - 삭제
   - 존재하지 않는 노선을 지울 수 없다.

  - 목록
   - Object.value(lines).map(line=>calback)으로 작성하자.
  
3. 구간
 - 화면
  - h2 구간을 수정할 노선을 선택해주세요
  - buttons ${라인 이름}
  
  action( 버튼 클릭 후)
  - h2 ${선택된 라인 이름} 관리
  - form 구간등록
   - title 구간등록
   - select 역 list
   - input number
   - button 등록
  
  목록
  - table 
   - tr 
    - th 순서
    - th 이름
    - th 설정
- 기능
 - 수정할 노선 선택
  - 노선리스트를 버튼으로 랜더
   - advance) 이벤트 위임으로 이베트 부하 감소시키기
 - 등록
  - 역 선택시 기존 노선에 존재하는지 판단
  - 순서 number valid, range valid
 - 제거
  - 이름 or index로 삭제
  - 제대로 된 삭제인가..?

추가적인 고려사항
화면 전환은 어떻게 할 것 인가?
 - 각 컴포넌트마다 render함수를 만들어, 관리한다?
 - 좀더 고려해봐야한다.
- data-set공부
- select공부
- table 공부
- 배민 table 공부
