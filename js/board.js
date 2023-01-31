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
  const $fillHeart = document.querySelectorAll(".fillHeart");
  const $heart = document.querySelectorAll('.heart')
  const $box = document.querySelectorAll('.box')

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

  // 카테고리 클릭
  //for문 두번 돌려야하는걸 왜 까먹었을까....
  $tag.forEach((e) => {
    e.addEventListener("click", (e) => {
      e.target.classList.toggle("tagClick", true);
      for (let i = 0; i < $tag.length; i++) {
        if (e.target != $tag[i]) {
          $tag[i].classList.toggle("textHover", false);
          $tag[i].classList.toggle("tagClick", false);
        }
      }
    });
  });
console.log($box)
  // 하트 토글
  for (let i = 0; i < $heart.length; i++) {
    $heart[i].addEventListener("click", (e) => {
        e.target.classList.toggle("displayNone");
        $fillHeart[i].classList.toggle("displayNone");
      })
  }
  for (let i = 0; i < $fillHeart.length; i++) {
    $fillHeart[i].addEventListener("click", (e) => {
      e.target.classList.toggle("displayNone");
      $heart[i].classList.toggle("displayNone");
    });
  }
    
      
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
