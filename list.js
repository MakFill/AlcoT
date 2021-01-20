const listButton = document.querySelector(".dropbtn");
const list = document.querySelector("#myDropdown");

let arr = [
  { image: 1, name: "Водка", count: 0 },
  { image: 2, name: "Пиво", count: 0 },
  { image: 3, name: "Вино", count: 0 },
  { image: 4, name: "Текила", count: 0 },
  { image: 5, name: "Виски", count: 0 },
  { image: 6, name: "Джин", count: 0 },
  { image: 7, name: "Ром", count: 0 },
  { image: 8, name: "Конъяк", count: 0 },
  { image: 9, name: "Шампанское", count: 0 },
  { image: 10, name: "Самогон", count: 0 },
];

let listPositions = function (items) {
  for (let item of items) {
    list.innerHTML += `<a class="players" href="#"> <img class="item-block mini-images" src="images/${item.image}.jpg" alt="">${item.name}</a>`;
  }
};

listPositions(arr);

const players = document.querySelectorAll(".players");

players.forEach(function (player) {
  player.addEventListener("click", function (e) {
    e.preventDefault();
    player.classList.toggle("choosen");
  });
});

listButton.addEventListener("click", function () {
  list.classList.toggle("show");
});

if (list.classList.contains("show")) {
  buttonBegin.classList.add("stick");
}
