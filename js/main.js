(function () {
  const user = document.getElementById("user");
  const userCount = document.getElementById("user-count");
  const computer = document.getElementById("computer");
  const computerCount = document.getElementById("computer-count");
  const count = document.getElementById("count");
  const start = document.getElementById("start");
  const round = document.getElementById("round");
  const resultGame = document.querySelectorAll(".win");
  const refresh = document.getElementById("refresh");
  const settings = document.getElementById("settings");
  const overlay = document.getElementById("overlay");
  const speedComputer = document.getElementById("speed-computer");
  const roundSetInput = document.getElementById("round-set");

  const items = [
    {
      title: "CUT",
      src: "img/cut.png",
      win: "PAPER",
    },
    {
      title: "PAPER",
      src: "img/paper.png",
      win: "ROCK",
    },
    {
      title: "ROCK",
      src: "img/rock.png",
      win: "CUT",
    },
  ];
  let currentItem = 0;
  let currentComputerItem = 0;
  let interval, speedSetNumber;
  let roundSet = parseInt(roundSetInput.value);

  start.addEventListener("click", startGame);
  settings.addEventListener("click", (e) => {
    overlay.classList.toggle("active");
  });
  overlay.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  refresh.addEventListener("click", () => {
    clearInterval(interval);
    let computerImage = computer.querySelector("img");
    computerImage.src = "img/computer.png";
    computerImage.classList.add("image-large");
    computerImage.classList.remove("active");
    userCount.textContent = parseInt(0);
    computerCount.textContent = parseInt(0);
    round.textContent = parseInt(0);
  });

  user.addEventListener("click", (e) => {
    const image = e.currentTarget.querySelector(".game__image");
    currentItem++;

    if (currentItem >= items.length) {
      currentItem = 0;
    }

    image.classList.remove("active");
    image.src = items[currentItem].src;
    image.classList.add("active");
  });

  roundSetInput.addEventListener("input", (e) => {
    if (e.target.value > parseInt(e.target.max)) e.target.value = e.target.max;
    if (e.target.value < parseInt(e.target.min)) e.target.value = e.target.min;

    roundSet = parseInt(e.target.value);
  });

  speedComputer.addEventListener("input", (e) => {
    if (e.target.value > parseInt(e.target.max)) e.target.value = e.target.max;
    if (e.target.value < parseInt(e.target.min)) e.target.value = e.target.min;
    speedSetNumber = parseInt(e.target.value);
  });

  function startGame() {
    let iterations = 0;
    let roundTime = 0;

    function startInterval() {
      let loading = true;
      let timeSkip = roundSet;

      interval = setInterval(() => {
        timeSkip--;
        loadingComputer(computer, loading);
        if (timeSkip <= 0) {
          clearInterval(interval);
          loading = false;
          loadingComputer(computer, loading);
          checkResults();
          round.textContent = parseInt(round.textContent) + 1;
          roundTime++;
          if (roundTime === roundSet) {
            if (iterations < roundSet - 1) {
              roundTime = 0;
              iterations++;
            } else {
              start.disabled = false;
              return;
            }
          } else if (iterations < roundSet) {
            setTimeout(startInterval, speedSetNumber);
          }
        }
      }, speedSetNumber);
    }

    start.disabled = true;
    startInterval();
  }

  function checkResults() {
    if (items[currentItem].win === items[currentComputerItem].title) {
      userCount.textContent = parseInt(userCount.textContent) + 1;
    } else if (items[currentItem].title === items[currentComputerItem].win) {
      computerCount.textContent = parseInt(computerCount.textContent) + 1;
    } else {
      userCount.textContent = parseInt(userCount.textContent) + 0;
      computerCount.textContent = parseInt(computerCount.textContent) + 0;
    }

    if (parseInt(userCount.textContent) == count) {
      resultGame[0].classList.remove("hide");
    } else if (parseInt(computerCount.textContent) == count) {
      resultGame[1].classList.remove("hide");
    }
  }

  function loadingComputer(item, loading) {
    let computer = item.querySelector("img");
    currentComputerItem = Math.floor(Math.random() * items.length);
    computer.classList.toggle("active", !loading);
    computer.classList.toggle("image-large", loading);
    computer.src = loading ? "img/loading.gif" : items[currentComputerItem].src;
  }
})();
