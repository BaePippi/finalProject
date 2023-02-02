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

  // json 가져오기
  // getData();
  // function getData() {
  // }
  let clicktag = "";
  let data = "";
  let page = 1;
  const rowCnt = 10;

  fetch("tag.json")
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
    makelist(data);
  }

  // 카테고리 클릭
  //for문 두번 돌려야하는걸 왜 까먹었을까....
  function getData2(json) {
    $tag.forEach((e) => {
      e.addEventListener("click", (e) => {
        e.target.classList.toggle("tagClick", true);
        clicktag = e.target.attributes.tag.value;
        // console.log(clicktag)
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

  function makelist(jsonlist) {
    data = jsonlist;
    const itemLen = data.length;
    console.log(itemLen);
    const maxPage = Math.ceil(itemLen / rowCnt);
    makePaging(maxPage);
    makeList(jsonlist);
  }

  function makeList(jsonlist) {
    // $container.innerHTML = "";
    const sIdx = (page - 1) * rowCnt;
    const eResult = page * rowCnt;
    const eIdx = eResult > data.length ? data.length : eResult;

    for (let i = sIdx; i < eIdx; i++) {
      const item = data[i];
      makeItem(item);
    }
    // changeSelected();
  }

  function makeItem(item) {
    const $card = document.createElement("div");

    $card.classList.add('card')
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

    $aa.classList.add('aa')

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
