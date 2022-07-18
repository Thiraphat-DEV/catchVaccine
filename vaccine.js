//----------------------------------------------------- write TO Code for life GameChanger
//ดึงคลาสจาก html
const screens = document.querySelectorAll(".screen");
const choose_vacine_btns = document.querySelectorAll(".choose-vacine-btn");
const start_btn = document.getElementById("start-btn");
const game_container = document.getElementById("game-container");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const message = document.getElementById("message");

//ตั้งค่าเริ่มต้น
let seconds = 0;
let score = 0;
let selected_vacine = {}; //empty object with get Vacine

//เมิ่อกดเริ่มเกมให้เรียกใช้หน้าต่างการเลือก Vacine
start_btn.addEventListener("click", () => screens[0].classList.add("up"));

//เมื่อมีการเลือกวัคซีนเเล้วให้มีการดึงรูปภาพของ Vacine
choose_vacine_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");
    selected_vacine = { src, alt }; // get attribute src , alt from img tag
    screens[1].classList.add("up");

    setTimeout(createVacine, 1000); // สร้างรูป vacine ทุกๆ 1วิ
    startGame(); //เริ่มเกม
  });
});

//เริ่มเกม
function startGame() {
  setInterval(increaseTime, 1500); //หลังจาก 1.5 วินาที่ ให้เวลาเริ่ม
}

// เพิ่มเวลาขึ้นเรื่อยๆ
function increaseTime() {
  let m = Math.floor(seconds / 60); //นาที
  let s = seconds % 60; //วินาที
  // ternary operator
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `Time: ${m}:${s}`; // เเสดง time
  seconds++; //เเละให้ค่า วินาทีเพิ่มครั้งละ1 ทุกๆ1วิ
}

//สร้างวัคซีน
function createVacine() {
  const vacines = document.createElement("div");
  vacines.classList.add("vacine");
  const { x, y } = getRandomLocation();
  vacines.style.top = `${y}px`;
  vacines.style.left = `${x}px`;
  //ให้สัตว์มีการเเสดงภาพทิศทางเเบบสุ่ม
  vacines.innerHTML = `<img src="${selected_vacine.src}" alt="${
    selected_vacine.alt
  }" style="transform: rotate(${Math.random() * 360}deg)" />`;

  vacines.addEventListener("click", catchVacine); //คลิกจับ Vacine

  game_container.appendChild(vacines);
}

//สุ่มตำเเหน่งที่จะเเสดง
function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
}

//จับวัคซีน
function catchVacine() {
  increaseScore(); // เมื่อมีการจับรูป vacineให้คะเเนนเพิ่มขึ้น
  this.classList.add("caught");

  setTimeout(() => this.remove(), 2000); //ให้รูป vacineนั้นหายไปเมื่อกดคลิกไปเเล้ว2วินาที
  addVacines(); //เพิ่มรูป vacineเข้าไปใหม่
}
// เพิ่มวัคซีน
function addVacines() {
  setTimeout(createVacine, 1000); //เพิ่มรูปvacineทุกๆ1วิ
  setTimeout(createVacine, 1500); //เพิ่มรูปvacineทุกๆ1.5วิ
}
// เพิ่มคะเเนน
function increaseScore() {
  score++; //เพิ่มคะเเนนครั้งละ 1
  scoreEl.innerHTML = `Score: ${score}`; //output score
  if (seconds === 30) {
    message.classList.add("visible");
    message.innerHTML = ` <button onclick="location.reload()" class="btn">Play Again<br />Score:${score}</button>`; // เมื่อคลิก play again จะกลับไปหน้าหลัก
  }
}
