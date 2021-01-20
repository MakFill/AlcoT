const boxes = document.querySelectorAll(".box");
const boxLeft = document.querySelector(".left");
const boxRight = document.querySelector(".right");
const buttonBegin = document.querySelector(".button-begin");
const headers = document.querySelectorAll(".headers");
const headerLeft = document.querySelector(".header-left");
const headerRight = document.querySelector(".header-right");
const results = document.querySelector("#myResults");

let newArrs = [];
let newArr = [];
let newArr2 = [];
let stack = [];
let newStack = [];
let arrLen = [];

let randomizer = function (numb) {
  return Math.round(Math.random() * numb);
};

let rL = 0;
let rR = 0;

let rec = function (param, prev) {
  if (
    param != prev &&
    newArrs[param] !== undefined &&
    !stack.includes(newArrs[param][0].name + newArrs[prev][0].name) &&
    !stack.includes(newArrs[prev][0].name + newArrs[param][0].name)
  ) {
    return param;
  } else {
    arrLen.splice(0, 1);
    return rec(arrLen[0], prev);
  }
};

buttonBegin.addEventListener("click", function () {
  newArr.length = 0;
  newArr2.length = 0;
  newArrs.length = 0;
  newStack.length = 0;
  stack.length = 0;
  arrLen.length = 0;
  rL = 0;
  rR = 0;

  boxes.forEach(function (box) {
    box.classList.add("show");
  });

  players.forEach(function (player) {
    if (player.classList.contains("choosen")) {
      newArr.push({
        name: player.textContent,
        image: player.firstElementChild.src,
        count: 0,
      });
    }
  });

  if (newArr.length <= 1) {
    newArr.length = 0;
    players.forEach(function (player) {
      newArr.push({
        name: player.textContent,
        image: player.firstElementChild.src,
        count: 0,
      });
    });
  }

  for (let i = 0; i < newArr.length; i++) {
    let arrz = [];
    for (let k = 0; k < newArr.length; k++) {
      arrz.push(newArr[i]);
    }
    newArrs.push(arrz.slice(0));
  }

  let arrLength = [];

  for (let i = 0; i < newArrs.length; i++) {
    arrLength.push(i);
  }

  let leng = arrLength.length;
  for (let i = 0; i < leng; i++) {
    arrLen.push(+arrLength.splice(randomizer(arrLength.length - 1), 1));
  }

  boxLeft.classList.add("box-left");
  boxRight.classList.add("box-right");

  rL = randomizer(newArrs.length - 1);
  boxLeft.style.background = `url(${newArrs[rL][0].image}) center no-repeat`;
  boxLeft.style.backgroundSize = "cover";
  headerLeft.textContent = `${newArrs[rL][0].name}`;

  rR = rec(arrLen[0], rL);

  boxRight.style.background = `url(${newArrs[rR][0].image}) center no-repeat`;
  boxRight.style.backgroundSize = "cover";
  headerRight.textContent = `${newArrs[rR][0].name}`;

  stack.push(
    newArrs[rL][0].name + newArrs[rR][0].name,
    newArrs[rR][0].name + newArrs[rL][0].name
  );

  newStack.push(rL, rR);

  list.classList.remove("show");
  results.classList.remove("show");

  const latestResults = document.querySelectorAll(".results-players");

  latestResults.forEach(function (resultat) {
    resultat.remove();
  });
});

boxes.forEach(function (box) {
  box.addEventListener("click", function () {
    let arrLength = [];
    for (let i = 0; i < newArrs.length; i++) {
      arrLength.push(i);
    }

    arrLen.length = 0;

    let leng = arrLength.length;
    for (let i = 0; i < leng; i++) {
      arrLen.push(+arrLength.splice(randomizer(arrLength.length - 1), 1));
    }
    if (
      box.classList.contains("box-left") ||
      box.classList.contains("box-right")
    ) {
      if (newArrs.length > 2) {
        if (box.classList.contains("box-left")) {
          if (newStack.length > 0) {
            newArrs[newStack[0]].pop();
            newArrs[newStack[1]].pop();
            newStack.length = 0;
          }

          newArrs[rL][0].count++;

          for (let item in newArrs) {
            if (newArrs[item].length < 2) {
              newArr2.push(newArrs[item][0]);
              newArrs.splice(item, 1);
            }
          }

          rL = randomizer(newArrs.length - 1);

          boxLeft.style.background = `url(${newArrs[rL][0].image}) center no-repeat`;
          boxLeft.style.backgroundSize = "cover";
          headerLeft.textContent = `${newArrs[rL][0].name}`;

          rR = rec(arrLen[0], rL);

          boxRight.style.background = `url(${newArrs[rR][0].image}) center no-repeat`;
          boxRight.style.backgroundSize = "cover";
          headerRight.textContent = `${newArrs[rR][0].name}`;

          stack.push(
            newArrs[rL][0].name + newArrs[rR][0].name,
            newArrs[rR][0].name + newArrs[rL][0].name
          );
          newArrs[rL].pop();
          newArrs[rR].pop();
        }
        if (box.classList.contains("box-right")) {
          if (newStack.length > 0) {
            newArrs[newStack[0]].pop();
            newArrs[newStack[1]].pop();
            newStack.length = 0;
          }

          newArrs[rR][0].count++;

          for (let item in newArrs) {
            if (newArrs[item].length < 2) {
              newArr2.push(newArrs[item][0]);
              newArrs.splice(item, 1);
            }
          }

          rL = randomizer(newArrs.length - 1);

          boxLeft.style.background = `url(${newArrs[rL][0].image}) center no-repeat`;
          boxLeft.style.backgroundSize = "cover";
          headerLeft.textContent = `${newArrs[rL][0].name}`;

          rR = rec(arrLen[0], rL);

          boxRight.style.background = `url(${newArrs[rR][0].image}) center no-repeat`;
          boxRight.style.backgroundSize = "cover";
          headerRight.textContent = `${newArrs[rR][0].name}`;

          stack.push(
            newArrs[rL][0].name + newArrs[rR][0].name,
            newArrs[rR][0].name + newArrs[rL][0].name
          );
          newArrs[rL].pop();
          newArrs[rR].pop();
        }
      } else if (newArrs.length == 2) {
        if (box.classList.contains("box-left")) {
          if (newStack.length > 0) {
            newArrs[newStack[0]].pop();
            newArrs[newStack[1]].pop();
            newStack.length = 0;
          }

          newArrs[rL][0].count++;

          newArr2.push(newArrs[0][0]);
          newArr2.push(newArrs[1][0]);

          boxLeft.style.background = "none";
          boxRight.style.background = "none";

          boxLeft.classList.remove("box-left");
          boxRight.classList.remove("box-right");
          headerLeft.textContent = "";
          headerRight.textContent = "";

          newArr2.sort((a, b) => a.count - b.count).reverse();

          for (let item of newArr2) {
            results.innerHTML += `<div class="results-players"><a class="players" href="#"> <img class="item-block players-img" src="${
              item.image
            }" alt="">${
              item.name
            }</a><p class="count count${item.name.trim()}">Очки:${
              item.count
            }</p></div>`;
          }

          results.classList.add("show");

          boxes.forEach(function (box) {
            box.classList.remove("show");
          });
        }
        if (box.classList.contains("box-right")) {
          if (newStack.length > 0) {
            newArrs[newStack[0]].pop();
            newArrs[newStack[1]].pop();
            newStack.length = 0;
          }

          newArrs[rR][0].count++;

          newArr2.push(newArrs[0][0]);
          newArr2.push(newArrs[1][0]);

          boxLeft.style.background = "none";
          boxRight.style.background = "none";

          boxLeft.classList.remove("box-left");
          boxRight.classList.remove("box-right");
          headerLeft.textContent = "";
          headerRight.textContent = "";

          newArr2.sort((a, b) => a.count - b.count).reverse();

          for (let item of newArr2) {
            results.innerHTML += `<div class="results-players"><a class="players" href="#"> <img class="item-block players-img" src="${
              item.image
            }" alt="">${
              item.name
            }</a><p class="count count${item.name.trim()}">Очки:${
              item.count
            }</p></div>`;
          }

          results.classList.add("show");
          boxes.forEach(function (box) {
            box.classList.remove("show");
          });
        }
        const resultsButton = document.querySelector(".close-res");

        resultsButton.addEventListener("click", function () {
          results.classList.remove("show");
        });
      }
    }
  });
});
