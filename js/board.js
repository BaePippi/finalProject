(function () {
  ("use strict");

  // 헤더전체 시작
  const $barIcon = document.querySelector(".fa-bars");
  const $barMenu = document.querySelector(".bar-menu");
  const $cartIcon = document.querySelector(".fa-cart-shopping");
  const $cartMenu = document.querySelector(".cart-menu");
  const $cartX = document.querySelector(".cart-right-title .fa-xmark");

  let beforeSelectedIdx = false;
  window.addEventListener("load", () => {
    beforeSelectedIdx = localStorage.getItem("num");
  });

  $barIcon.addEventListener("click", () => {
    if ($barMenu.classList.contains("hidden")) {
      $barMenu.classList.toggle("hidden");
      $cartMenu.classList.toggle("hidden", true);
      $barMenu.classList.remove("menu-off");
      $barMenu.classList.add("menu-on");
    } else {
      $barMenu.classList.remove("menu-on");
      $barMenu.classList.add("menu-off");
      setTimeout(() => {
        $barMenu.classList.toggle("hidden");
        $cartMenu.classList.toggle("hidden", true);
      }, 1400);
    }
  });
  $cartIcon.addEventListener("click", () => {
    if ($cartMenu.classList.contains("hidden")) {
      $cartMenu.classList.toggle("hidden");
      $barMenu.classList.toggle("hidden", true);
      $cartMenu.classList.remove("cart-off");
      $cartMenu.classList.add("cart-on");
    }
  });
  $cartX.addEventListener("click", () => {
    if (!$cartMenu.classList.contains("hidden")) {
      $cartMenu.classList.remove("cart-on");
      $cartMenu.classList.add("cart-off");
      setTimeout(() => {
        $cartMenu.classList.toggle("hidden");
        $barMenu.classList.toggle("hidden", true);
      }, 900);
    }
  });
  //헤더끝

  let vh = window.innerHeight * 0.01;

  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // window resize 스와이퍼
  window.addEventListener("resize", (e) => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    if (window.innerWidth <= 680) {
      swiper.enable();
    } else if (window.innerWidth > 680) {
      swiper.slideTo(0);
      swiper.disable();
    }
  });

  const $wrapper = document.querySelector("#wrapper");
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
  $tag.forEach((e) => {
    if (e.classList.contains("tagClick")) {
      clicktag = e.attributes.tag.value;
    }
  });
  window.addEventListener("onbeforeunload", getData());

  function getData() {
    let url = `https://baepippi.github.io/finalProject/${clicktag}.json`;
    if (localStorage.getItem("cate")) {
      let $cate = localStorage.getItem("cate");
      url = `https://baepippi.github.io/finalProject/${$cate}.json`;
      $tag.forEach((e) => {
        if ($cate === e.attributes.tag.value) {
          e.classList.toggle("tagClick", true);
        } else {
          e.classList.toggle("tagClick", false);
        }
        localStorage.removeItem("cate");
      });
    }
    fetch(`${url}`)
      .then((res) => res.json())
      .then((res) => {
        makeDisplay(res);
        getData2(res);
      });
    data = clicktag;
    console.log(data);
    // makeDisplay(data);
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
        getData();
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
        // localStorage.setItem("list", JSON.stringify(item));
        $modalDisplay.classList.toggle("displayNone", false);
        $wrapper.classList.toggle("fixed", true);
        makeModal(item);
      }
    });
    let modalData = "";
  }

  // 새글쓰기
  const $addCard = document.querySelector(".addCard");
  const $newModal = document.querySelector(".modalAll2");

  console.log($newModal);
  $addCard.addEventListener("click", (e) => {
    openModal2(null);
    // $newModal.classList.remove("displayNone");
  });

  function makeModal(item) {
    modalData = item;
    // modalData = JSON.parse(localStorage.getItem("list"));
    const $modal = document.querySelector(".modal");
    console.log($modal);
    // const change = modalData.Emoji.toUpperCase();
    // console.log(change);

    $modal.innerHTML = `
    <div class="close"></div>
    <div class="modalSection1">
    <div class="modalTitleBox">
    <p class="m-title">${modalData.title}</p>
    <div class="m-emoji" style="
    background-image: URL(image/${modalData.Emoji}.png);"></div>
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
    <p class="edit">수정</p>
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
            <ul class="menu">
            <li class="inputEmoji dropdown dropdown-1">
            <ul class="dropdown_menu dropdown_menu-1 displayNone">
            <li
            class="dropdown_item-1"
            style="
            background-image: URL(image/happy.png);
            background-repeat: no-repeat;
            background-size: cover;
            "
            ></li>
            <li
            class="dropdown_item-2"
            style="
            background-image: URL(image/bored.png);
            background-repeat: no-repeat;
            background-size: cover;
            "
            ></li>
            <li
            class="dropdown_item-3"
            style="
            background-image: URL(image/lonely.png);
            background-repeat: no-repeat;
                      background-size: cover;
                    "
                    ></li>
                    <li
                    class="dropdown_item-4"
                    style="
                    background-image: URL(image/nervous.png);
                    background-repeat: no-repeat;
                    background-size: cover;
                    "
                    ></li>
                    <li
                    class="dropdown_item-5"
                    style="
                    background-image: URL(image/angry.png);
                    background-repeat: no-repeat;
                    background-size: cover;
                    "
                    ></li>
                    <li
                    class="dropdown_item-6"
                    style="
                    background-image: URL(image/sad.png);
                    background-repeat: no-repeat;
                    background-size: cover;
                    "
                    ></li>
                    </ul>
                    </li>
                    </ul>
                    <input class="input" placeholder="댓글을 입력하세요.">
                    <p class="save">게시</p>
                    </div>
                    </div>
                    `;

    const close = document.querySelector(".close");
    const modalDisplay = document.querySelector(".modalAll");
    close.addEventListener("click", (e) => {
      modalDisplay.classList.toggle("displayNone", true);
      $wrapper.classList.toggle("fixed", false);
    });

    // 하트토글
    const $heart = document.querySelector(".heart");
    const $fillHeart = document.querySelector(".fillHeart");

    $heart.addEventListener("click", (e) => {
      e.target.classList.toggle("displayNone");
      $fillHeart.classList.toggle("displayNone");
    });
    $fillHeart.addEventListener("click", (e) => {
      e.target.classList.toggle("displayNone");
      $heart.classList.toggle("displayNone");
    });

    // 수정
    const $edit = document.querySelector(".edit");
    console.log($edit);
    $edit.addEventListener("click", (e) => {
      modalDisplay.classList.toggle("displayNone", true);
      openModal2(modalData);
    });

    // 이모티콘 드롭다운

    const dropdown2 = document.querySelector(".dropdown");
    const dropdownMenu2 = document.querySelector(".dropdown_menu");
    const dropList2 = document.querySelectorAll(".dropdown li");
    console.log(dropdown2);
    dropdown2.addEventListener("click", (e) => {
      console.log("aa");
      dropdownMenu2.classList.toggle("displayNone");
      dropList2.forEach((item) => {
        item.style.animationName = "slideDown";
        item.style.display = "block";
        item.addEventListener("click", (e) => {
          dropdown2.style.backgroundImage = e.target.style.backgroundImage;
        });
      });
    });

    // 댓글창 on / off
    const input = document.querySelector(".input");
    const mSection4 = document.querySelector(".m-Section4");
    const inputClose = document.querySelector(".inputClose");
    const mSection2 = document.querySelector(".m-Section2");

    mSection2.addEventListener("click", (e) => {
      mSection4.classList.toggle("displayNone", false);
      inputClose.classList.toggle("displayNone", false);
    });

    input.addEventListener("click", (e) => {
      mSection4.classList.toggle("displayNone", false);
      inputClose.classList.toggle("displayNone", false);
    });

    inputClose.addEventListener("click", (e) => {
      mSection4.classList.toggle("displayNone", true);
      inputClose.classList.toggle("displayNone", true);
    });
  }
  function openModal2(data) {
    $newModal.classList.remove("displayNone");
    $wrapper.classList.toggle("fixed");
    const saveBtn = document.querySelector("#save");
    const modalDisplay = document.querySelector(".modalAll2");
    const $textArea = document.querySelector("#textarea");
    const title2 = document.querySelector(".m-title2");
    saveBtn.addEventListener("click", (e) => {
      localStorage.setItem("cate", data.Emoji);
      if (data.Emoji === "happy") {
        localStorage.setItem("num", 0);
      } else if (data.Emoji === "bored") {
        localStorage.setItem("num", 1);
      } else if (data.Emoji === "nervous") {
        localStorage.setItem("num", 2);
      } else if (data.Emoji === "lonely") {
        localStorage.setItem("num", 3);
      } else if (data.Emoji === "sad") {
        localStorage.setItem("num", 4);
      } else {
        localStorage.setItem("num", 5);
      }
    });
    console.dir(saveBtn);
    console.log(data);
    console.dir(title2);
    console.log(saveBtn);
    console.dir($textArea);
    $textArea.addEventListener("input", (e) => {
      if ($textArea.value) {
        saveBtn.style.color = "#000000";
      } else {
        saveBtn.style.color = "#c9c7bb";
      }
    });
    const close2 = document.querySelector(".close2");
    close2.addEventListener("click", (e) => {
      modalDisplay.classList.toggle("displayNone", true);
      $wrapper.classList.toggle("fixed", false);
      $textArea.value = "";
      title2.value = "";
      smallEmoji.style.backgroundImage = `url(image/happy.png)`;
      dropdown.firstChild.textContent = `#HAPPY`;
      img.src = "image/addImg.png";
    });

    //새글 드롭다운
    const dropdown = document.querySelector(".dropdown2", ".new");
    const dropdownMenu = document.querySelector(".dropdown_menu2", ".new");
    const dropList = document.querySelectorAll(".dropdown2 li", ".new");
    dropdown.addEventListener("click", (e) => {
      dropdownMenu.classList.toggle("displayNone");
      dropList.forEach((item) => {
        item.style.animationName = "slideUp";
        item.style.display = "block";
        console.dir(dropdown);
        item.addEventListener("click", (e) => {
          dropdown.firstChild.textContent = e.target.textContent;
        });
      });
    });

    // 캐릭터 클릭
    const newEmoji = document.querySelectorAll(".selectEmoji img");
    const smallEmoji = document.querySelector(".m-emoji", "new");
    const img = document.querySelector(".modalContentBox img");

    newEmoji.forEach((img) => {
      img.addEventListener("click", (e) => {
        console.dir(smallEmoji.style.backgroundImage);
        console.log(e.target.src);
        smallEmoji.style.backgroundImage = `url(${e.target.src})`;
      });
    });

    // 수정하기 클릭해서 글쓰기창 켜졌을때 데이터 가져오기
    if (data) {
      const str = removeHTML(data.content);
      console.log(img);

      function removeHTML(text) {
        text = text.replace(/(<br>|<br\/>|<br \/>)/g, "\r\n");
        text = text.replace(
          /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
          ""
        );
        return text;
      }
      console.log(str);
      $textArea.value = str;
      title2.value = data.title;
      smallEmoji.style.backgroundImage = `url(image/${data.Emoji}.png)`;
      img.src = data.img;
      dropdown.firstChild.textContent = `#${data.Emoji.toUpperCase()}`;

      $wrapper.classList.toggle("fixed", true);
      saveBtn.style.color = "#000000";
    }
    // 저장하기 텍스트 색 변경
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
        window.scrollTo({ top: 0, behavior: "smooth" });
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

  // 이미지 파일 업로드

  function getImageFiles(e) {
    const uploadFiles = [];
    const files = e.currentTarget.files;
    const imagePreview = document.querySelector(".image-preview");
    const docFrag = new DocumentFragment();

    // 파일 타입 검사
    [...files].forEach((file) => {
      if (!file.type.match("image/.*")) {
        alert("이미지 파일만 업로드가 가능합니다.");
        return;
      }

      // 파일 갯수 검사
      if ([...files].length < 2) {
        uploadFiles.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          const preview = createElement(e, file);
          imagePreview.appendChild(preview);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  function createElement(e, file) {
    upload.setAttribute("src", e.target.result);
    upload.setAttribute("data-file", file.name);
  }

  const realUpload = document.querySelector(".real-upload");
  const upload = document.querySelector(".upload");

  upload.addEventListener("click", () => realUpload.click());

  realUpload.addEventListener("change", getImageFiles);

  let swiper = new Swiper(".swiper1", {
    slideToClickedSlide: true,
    spaceBetween: 50,

    pagination: { el: ".swiper-pagination" },

    scrollbar: { nel: ".swiper-scrollbar" },
  });
  let swiper2 = new Swiper(".banner.swiper", {
    slideToClickedSlide: true,
    spaceBetween: 30,
    slidesPerView: "auto",
    autoplay: {
      delay: 2500,

      disableOnInteraction: false,
    },
    // loop: false,

    // loopAdditionalSlides: 1,
    pagination: { el: ".swiper-pagination" },

    scrollbar: { nel: ".swiper-scrollbar" },
  });
  // 스와이퍼막기
  if (window.innerWidth <= 680) {
    swiper.enable();
  } else if (window.innerWidth > 680) {
    swiper.disable();
  }

  let indexA = localStorage.getItem("num");
  swiper.slideTo(indexA);
  localStorage.removeItem("num");
})();
