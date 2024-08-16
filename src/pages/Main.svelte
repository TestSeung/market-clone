<script>
  import { onMount } from "svelte";
  import Nav from "../components/Nav.svelte";
  import { getDatabase, ref, onValue } from "firebase/database";

  let hour = new Date().getHours();
  let min = new Date().getMinutes();

  $: items = [];

  const calTime = (timeStamp) => {
    //한국시간 UTC+9
    const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
    const time = new Date(curTime - timeStamp);
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    if (hour > 0) return `${hour}시간 전`;
    else if (minute > 0) return `${minute}분 전`;
    else if (second >= 0) return `${second}초 전`;
    else "방금 전";
  };

  const db = getDatabase();
  const starCountRef = ref(db, "items/");

  onMount(() => {
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      items = Object.values(data).reverse();
    });
  });
</script>

<header>
  <!--bem방식을 쓰는게 좋다-->
  <div class="info-bar">
    <div class="info-bar__time">{hour}:{min}</div>
    <div class="info-bar__icons">
      <img src="assets/chart-bar.svg" alt="chart-bar" />
      <img src="assets/wifi.svg" alt="wifi" />
      <img src="assets/battery.svg" alt="battery" />
    </div>
  </div>
  <div class="menu-bar">
    <div class="menu-bar__location">
      <div>역삼1동</div>
      <div class="menu-bar__location-icon">
        <img src="assets/arrow.svg" alt="" />
      </div>
    </div>
    <div class="menu-bar__icons">
      <img src="assets/search.svg" alt="" />
      <img src="assets/menu.svg" alt="" />
      <img class="bell-count" src="assets/bell.svg" alt="" />
      <div class="bell-count__msg">1</div>
    </div>
  </div>
</header>

<main>
  {#each items as item}
    <div class="items-list">
      <div class="items-list__img">
        <img alt={item.title} src={item.imgUrl} />
      </div>
      <div class="items-list__info">
        <div class="items-list__info-title">{item.title}</div>
        <div class="items-list__info-meta">
          {item.place}
          {calTime(item.insertAt)}
        </div>
        <div class="items-list__info-price">{item.price}</div>
        <div>{item.description}</div>
      </div>
    </div>
  {/each}
  <a class="write-btn" href="#/write">+ 글쓰기</a>
</main>

<Nav location="home" />

<div class="media-info-msg">화면을 줄여주세요.</div>
