(function () {
  "use strict";
  // window resize 스와이퍼
  window.addEventListener("resize", (e) => {
    if (window.innerWidth <= 680) {
      swiper.enable();
    } else if (window.innerWidth > 680) {
      swiper.slideTo(0, 0);
      swiper.disable();
    }
  });
  // 카테고리 호버
  const $tag = document.querySelectorAll(".hashtag");
  const $cardBox = document.querySelector("#cardBox");
  const $cate = document.querySelector("#category");
  const $paging = document.querySelector("#paging");
  const $container = document.querySelector("#container");

  for (let i = 0; i < $tag.length; i++) {
    if (!$tag[i].classList.contains("textHover")) {
      $tag[i].addEventListener("mouseover", (e) => {
        e.target.classList.toggle("textHover");
      });
      $tag[i].addEventListener("mouseout", (e) => {
        e.target.classList.toggle("textHover");
      });
    }
  }

  let clicktag = "";
  let data = "";
  let page = 1;
  const rowCnt = 10;

  // json 가져오기

  fetch("https://baepippi.github.io/finalProject/tag.json")
    .then((res) => res.json())
    .then((res) => {
      getData(res);
      getData2(res);
    });
  $tag.forEach((e) => {
    if (e.classList.contains("tagClick")) {
      clicktag = e.attributes.tag.value;
    }
  });
  function getData(json) {
    if (clicktag === "happy") {
      data = json.happy;
    } else if (clicktag === "bored") {
      data = json.bored;
    } else if (clicktag === "nervous") {
      data = json.nervous;
    } else if (clicktag === "lonely") {
      data = json.lonely;
    } else if (clicktag === "sad") {
      data = json.sad;
    } else {
      data = json.angry;
    }
    makeDisplay(data);
  }

  // 카테고리 클릭
  //for문 두번 돌려야하는걸 왜 까먹었을까....
  function getData2(json) {
    $tag.forEach((e) => {
      e.addEventListener("click", (e) => {
        e.target.classList.toggle("tagClick", true);
        clicktag = e.target.attributes.tag.value;
        page = 1;
        for (let i = 0; i < $tag.length; i++) {
          if (e.target != $tag[i]) {
            $tag[i].classList.toggle("textHover", false);
            $tag[i].classList.toggle("tagClick", false);
          }
        }
        getData(json);
      });
    });
  }

  function makeDisplay(jsonlist) {
    $paging.innerHTML = "";
    data = jsonlist;
    const itemLen = data.length;
    console.log(itemLen);
    const maxPage = Math.ceil(itemLen / rowCnt);
    makePaging(maxPage);
    makeList();
  }

  function makeList() {
    // 클릭하면 카드없애기
    const del = document.querySelectorAll(".del");
    console.log(del);
    for (let i = 0; i < del.length; i++) {
      $cardBox.removeChild(del[i]);
    }

    const sIdx = (page - 1) * rowCnt;
    const eResult = page * rowCnt;
    const eIdx = eResult > data.length ? data.length : eResult;

    for (let i = sIdx; i < eIdx; i++) {
      const item = data[i];
      makeItem(item);
    }
    changeSelected();
  }

  function makeItem(item) {
    const $card = document.createElement("div");

    $card.classList.add("card", "del");
    $card.id = item.id;
    $card.innerHTML = `
    <img class="tape" src="image/tape.svg" alt="" />
    <div class="box">
    <div class="titleBox">
    <div class="title">${item.title}</div>
    <img class="cardEmoji" src="image/${item.Emoji}.png" alt="" />
    </div>
    <div class="contentBox">
    <p>
    ${item.content}
    </p>
    </div>
    `;
    $cardBox.appendChild($card);

    // 좋아요 버튼 만들기
    const $fillHeart = document.createElement("img");
    const $heart = document.createElement("img");
    const $aa = document.createElement("div");

    $aa.classList.add("aa");

    $fillHeart.classList.add("fillHeart", "displayNone");
    $fillHeart.src = "image/fillHeart.svg";

    $heart.classList.add("heart");
    $heart.src = "image/heart.svg";
    const $box = $card.querySelector(".box");

    $aa.appendChild($fillHeart);
    $aa.appendChild($heart);
    $box.appendChild($aa);
    $box.appendChild($aa);

    // 좋아요 토글
    $heart.addEventListener("click", (e) => {
      e.target.classList.toggle("displayNone");
      $fillHeart.classList.toggle("displayNone");
    });
    $fillHeart.addEventListener("click", (e) => {
      e.target.classList.toggle("displayNone");
      $heart.classList.toggle("displayNone");
    });

    // for (let i = 0; i < $heart.length; i++) {
    //   $heart[i].addEventListener("click", (e) => {
    //     e.target.classList.toggle("displayNone");
    //     $fillHeart[i].classList.toggle("displayNone");
    //   });
    // }
    // for (let i = 0; i < $fillHeart.length; i++) {
    //   $fillHeart[i].addEventListener("click", (e) => {
    //     e.target.classList.toggle("displayNone");
    //     $heart[i].classList.toggle("displayNone");
    //   });
    // }

    const $modalDisplay = document.querySelector(".modalAll");
    $card.addEventListener("click", (e) => {
      if (e.target !== $heart && e.target !== $fillHeart) {
        localStorage.setItem("list", JSON.stringify(item));
        $modalDisplay.classList.toggle("displayNone", false);
        makeModal();
      }
    });
  }
  let modalData = "";

  function makeModal() {
    modalData = JSON.parse(localStorage.getItem("list"));
    const $modal = document.querySelector("#modal");
    // const change = modalData.Emoji.toUpperCase();
    console.log(change);

    $modal.innerHTML = `
    <div class="close"></div>
        <div class="modalSection1">
          <div class="modalTitleBox">
            <p class="m-title">${modalData.title}</p>
            <div class="m-emoji" style="
background-image: URL(https://baepippi.github.io/finalProject/image/${modalData.Emoji.toUpperCase()}.png);"></div>
          </div>
          <div class="modalContentBox">
            <div class="modalMainImg" style="
background-image: URL(${modalData.img});"></div>
            <div class="m-content">
              <p>
                ${modalData.content}
              </p>
              <div>
                <div class="m-hashtag">
                  <div class="zigzag">
                    <p>#${modalData.Emoji.toUpperCase()}</p>
                  </div>
                </div>
                <img
                  class="fillHeart m-fillHeart displayNone"
                  src="image/fillHeart.svg"
                  alt=""
                />
                <img class="heart m-heart" src="image/heart.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="m-Section5">
          <p>수정</p>
          <p>삭제</p>
        </div>
        <div class="m-Section3">
          <p class="section3-title">RECOMMENDED ITEM</p>
          <ul class="itemList">
            <li class="item"></li>
            <li class="item"></li>
            <li class="item"></li>
            <li class="item"></li>
          </ul>
        </div>
        <div class="m-Section2">
          <p>댓글 34개</p>
        </div>
        <div class="inputClose displayNone"></div>

        <div class="m-Section4 displayNone">
          <div>
            <div class="comment">
              <div class="commentEmoji"></div>
              <p>잘 했고, 잘 하고 있고, 잘 할거야.</p>
              <p class="re-comment">답글쓰기</p>
              <img
                class="fillHeart co-fillHeart displayNone"
                src="image/fillHeart.svg"
                alt=""
              />
              <img class="heart co-heart" src="image/heart.svg" alt="" />
            </div>
            <div class="comment">
              <div class="commentEmoji"></div>
              <p>힘내렴</p>
              <p class="re-comment">답글쓰기</p>
              <img
                class="fillHeart co-fillHeart displayNone"
                src="image/fillHeart.svg"
                alt=""
              />
              <img class="heart co-heart" src="image/heart.svg" alt="" />
            </div>
            <div class="comment">
              <div class="commentEmoji"></div>
              <p>ㅅㄱ</p>
              <p class="re-comment">답글쓰기</p>
              <img
                class="fillHeart co-fillHeart displayNone"
                src="image/fillHeart.svg"
                alt=""
              />
              <img class="heart co-heart" src="image/heart.svg" alt="" />
            </div>
            <div class="comment">
              <div class="commentEmoji"></div>
              <p>우리 조금은 찬란하게 심적으로 가난해보자고</p>
              <p class="re-comment">답글쓰기</p>
              <img
                class="fillHeart co-fillHeart displayNone"
                src="image/fillHeart.svg"
                alt=""
              />
              <img class="heart co-heart" src="image/heart.svg" alt="" />
            </div>
            <div class="comment">
              <div class="commentEmoji"></div>
              <p>
                때론 혼자이길 바라면서도 누군가 잡아주면 좋겠다는 이기적인 생각
              </p>
              <p class="re-comment">답글쓰기</p>
              <img
                class="fillHeart co-fillHeart displayNone"
                src="image/fillHeart.svg"
                alt=""
              />
              <img class="heart co-heart" src="image/heart.svg" alt="" />
            </div>
            <div class="comment">
              <div class="commentEmoji"></div>
              <p>
                때론 혼자이길 바라면서도 누군가 잡아주면 좋겠다는 이기적인 생각
              </p>
              <p class="re-comment">답글쓰기</p>
              <img
                class="fillHeart co-fillHeart displayNone"
                src="image/fillHeart.svg"
                alt=""
              />
              <img class="heart co-heart" src="image/heart.svg" alt="" />
            </div>
            <div class="comment">
              <div class="commentEmoji"></div>
              <p>
                때론 혼자이길 바라면서도 누군가 잡아주면 좋겠다는 이기적인 생각
              </p>
              <p class="re-comment">답글쓰기</p>
              <img
                class="fillHeart co-fillHeart displayNone"
                src="image/fillHeart.svg"
                alt=""
              />
              <img class="heart co-heart" src="image/heart.svg" alt="" />
            </div>
            <div class="comment">
              <div class="commentEmoji"></div>
              <p>
                때론 혼자이길 바라면서도 누군가 잡아주면 좋겠다는 이기적인 생각
              </p>
              <p class="re-comment">답글쓰기</p>
              <img
                class="fillHeart co-fillHeart displayNone"
                src="image/fillHeart.svg"
                alt=""
              />
              <img class="heart co-heart" src="image/heart.svg" alt="" />
            </div>
            <div class="comment">
              <div class="commentEmoji"></div>
              <p>
                때론 혼자이길 바라면서도 누군가 잡아주면 좋겠다는 이기적인 생각
              </p>
              <p class="re-comment">답글쓰기</p>
              <img
                class="fillHeart co-fillHeart displayNone"
                src="image/fillHeart.svg"
                alt=""
              />
              <img class="heart co-heart" src="image/heart.svg" alt="" />
            </div>
            <div class="comment">
              <div class="commentEmoji"></div>
              <p>
                때론 혼자이길 바라면서도 누군가 잡아주면 좋겠다는 이기적인 생각
              </p>
              <p class="re-comment">답글쓰기</p>
              <img
                class="fillHeart co-fillHeart displayNone"
                src="image/fillHeart.svg"
                alt=""
              />
              <img class="heart co-heart" src="image/heart.svg" alt="" />
            </div>
            <div class="comment">
              <div class="commentEmoji"></div>
              <p>
                때론 혼자이길 바라면서도 누군가 잡아주면 좋겠다는 이기적인 생각
              </p>
              <p class="re-comment">답글쓰기</p>
              <img
                class="fillHeart co-fillHeart displayNone"
                src="image/fillHeart.svg"
                alt=""
              />
              <img class="heart co-heart" src="image/heart.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="commentInput">
          <div>
            <div class="inputEmoji"></div>
            <p class="input">댓글을 입력하세요.</p>
            <p class="save">게시</p>
          </div>
        </div>
  `;

  console.log('https://baepippi.github.io/finalProject/image/${modalData.Emoji.toUpperCase()}.png')
    const close = document.querySelector(".close");
    const modalDisplay = document.querySelector(".modalAll");
    close.addEventListener("click", (e) => {
      modalDisplay.classList.toggle("displayNone", true);
    });
    const input = document.querySelector('.input');
    const mSection4 = document.querySelector(".m-Section4");
    const inputClose = document.querySelector('.inputClose');
    
    input.addEventListener('click', e=>{
      mSection4.classList.toggle("displayNone",  false);
      inputClose.classList.toggle("displayNone", false);
    })
  }

  function changeSelected() {
    const pageSpanList = document.querySelectorAll(".page");
    pageSpanList.forEach((item) => {
      const innerNum = parseInt(item.textContent);
      item.classList.toggle("selected", page === innerNum);
    });
  }

  function makePaging(maxPage) {
    for (let i = 1; i <= maxPage; i++) {
      const span = document.createElement("span");
      $paging.appendChild(span);

      span.classList.add("page");
      span.classList.add("pointer");
      span.textContent = i.toString();

      span.addEventListener("click", (e) => {
        page = i;
        makeList();
        window.scrollTo(0, 0);
      });
    }
  }

  // 하트 토글

  // console.log($heart);
  // $heart.forEach((e) => {
  //   e.addEventListener('click', e => {
  //     // e.target.classList.toggle("displayNone");
  //     console.dir(e.target)
  //   })
  // });

  // 스와이퍼 클래스 넣어주기
  // $cardBox.firstElementChild.classList.add("swiper");
  // $cate.classList.add("swiper-wrapper");
  // for (let i = 0; i < $tag.length; i++) {
  //   $tag[i].classList.add("swiper-slide");
  // }

  let swiper = new Swiper(".swiper", {
    slideToClickedSlide: true,
    spaceBetween: 50,

    pagination: { el: ".swiper-pagination" },

    scrollbar: { nel: ".swiper-scrollbar" },
  });
  // 스와이퍼막기
  if (window.innerWidth <= 680) {
    swiper.enable();
  } else if (window.innerWidth > 680) {
    swiper.disable();
  }
})();
