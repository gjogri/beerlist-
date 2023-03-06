console.log("recepy");
// const BASE_URL = "https://api.punkapi.com/v2/beers";
// var wordHtml = document.getElementById("word");
// var adjectiveHTML = document.getElementById("adjective");
// var descriptionHTML = document.getElementById("description");
// var inputValue = document.getElementById("typeText");
// var answer = document.getElementById("answer");
// document.getElementById("speakerButton").style.display = "none";
// var audiUrl = "";
// function search() {
//   wordHtml.innerText = "";
//   adjectiveHTML.innerHTML = "";
//   var inputValue = document.getElementById("typeText").value;

//   const options = {
//     method: "GET",
//     url: `https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`,
//   };

//   axios
//     .request(options)
//     .catch((error) => {})
//     .then((response) => {
//       if (response == undefined) {
//         alert("undifend");
//         document.getElementById("speakerButton").style.display = "block";
//       }
//       inputValue = response.data[0];
//       console.log(inputValue);
//       var phonetic = "";
//       if (inputValue.hasOwnProperty("phonetic")) {
//         phonetic = inputValue.phonetic;
//       } else {
//         phonetic = "";
//       }
//       wordHtml.innerText = inputValue.word;

//       inputValue.meanings.forEach((element) => {
//         // console.log(element);
//         var p = document.createElement("p");
//         var description = document.createElement("p");
//         p.innerHTML = element.partOfSpeech + "  " + phonetic;
//         p.style.color = "grey";
//         console.log(p);

//         description.innerHTML = element.definitions[0].definition;
//         adjectiveHTML.append(p, " ", description);

//         let audioSource = response.data[0].phonetics;

//         audioSource.forEach((element) => {
//           if (Object.keys(element).includes("audio")) {
//             console.log(audiUrl.length >= 0, "vnatre");
//             console.log(audiUrl.length, "vnatre");
//             if (element["audio"].length > 0 && audiUrl.length <= 0) {
//               let url = element["audio"];
//               audiUrl = url;
//               document.getElementById("speakerButton").style.display = "block";
//             }
//           }
//         });
//       });
//     });
// }

// function play(audiUrl) {
//   let audioHTML = document.getElementById("audio");
//   audioHTML.src = audiUrl;
//   console.log(audiUrl);
//   audioHTML.play();
// }
let allBeers = document.getElementById("cointener");
let heroContainer = document.getElementById("heroContainer");
let alcoholic = document.getElementById("alcoholic");
let title = document.getElementById("title");
let allBeersToghether = document.getElementById("allBeers");
let beerDetails = document.getElementById("beerDetails");
let backButton = document.getElementById("buttonDiv");
// backButton.style.display = "none";
let randomBeerButton = document.getElementById("randomBeerButton");
let randomBeer = document.getElementById("randomBeer");
const pagesButton = document.getElementById("pagesButton");
const secondButtonBack = document.getElementById("secondButtonBack");
secondButtonBack.style.display = "none";
const backButonFromAllBeers = document.getElementById("backButonFromAllBeers");
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInputValue");
const alertShow = document.getElementById("alertShow");
const alertCloseButton = document.getElementById("alertCloseButton");
const subMenu = document.getElementById("subMenu");
const previusButton = document.getElementById("previusButton");
const nextButton = document.getElementById("nextButton");
const showBeers = document.getElementById("showBeers");
const sortBeers = document.getElementById("sortBeers");
const pageNumber = document.getElementById("pageNumber");
const pageNumberPrevius = document.getElementById("pageNumberPrevius");
const pageNumberNext = document.getElementById("pageNumberNext");

const loadingBar = document.getElementById("loading-bar-progress");

let options = {
  method: "GET",
  url: "https://api.punkapi.com/v2/beers",
  // url: "https://api.punkapi.com/v2/beers?per_page=80",
};

function appendBeer(singleBeer) {
  console.log("test");

  let imgDiv = document.createElement("div");
  let showImg = document.createElement("img");
  showImg.src = singleBeer.image_url;
  showImg.classList.add("showImg");
  showImg.classList.add("col-md");
  showImg.classList.add("imgCorrection");
  imgDiv.append(showImg);
  imgDiv.classList.add("margin-right");
  allBeers.style.display = "none";
  beerDetails.classList.remove("hidden");
  let divPerent = document.createElement("div");
  let beerName = document.createElement("h4");
  beerName.innerText = singleBeer.name;
  let beertagline = document.createElement("p");
  beertagline.innerText = singleBeer.tagline;
  let divHeader = document.createElement("div");
  divHeader.append(beerName, beertagline);
  divHeader.classList.add("cardHeader");
  /*BODY*/
  let beerDescription = document.createElement("p");
  beerDescription.innerText = "Description:" + " " + singleBeer.description;
  let beerAlcoholic = document.createElement("p");
  beerAlcoholic.innerHTML = "Alcohol:" + " " + singleBeer.abv + "%";
  let firstBrewed = document.createElement("p");
  firstBrewed.innerText = "Brewed:" + " " + singleBeer.first_brewed;
  let beerBitterness = document.createElement("p");
  beerBitterness.innerText = "Bitterness:" + " " + singleBeer.ibu + " " + "IBU";
  let divBody = document.createElement("div");
  divBody.append(beerDescription, beerAlcoholic, firstBrewed, beerBitterness);
  /*FOOTER*/
  let foodPairing = document.createElement("h4");
  foodPairing.innerText = "Food pairing";
  let divFooter = document.createElement("div");
  divFooter.append(foodPairing);
  let food_pairing = singleBeer.food_pairing;
  food_pairing.forEach((item) => {
    let p = document.createElement("p");
    p.innerText = "''" + item + "''";
    divFooter.appendChild(p);
  });

  divFooter.classList.add("card-footer");

  divPerent.classList.add("card", "col-md");
  divPerent.append(divHeader, divBody, divFooter);
  beerDetails.appendChild(imgDiv, divPerent);
}
allBeersToghether.addEventListener("click", (e) => {
  subMenu.style.display = "block";
  beerDetails.innerHTML = " ";
  e.preventDefault();
  allBeers.classList.add("item-grid");
  allBeers.style.display = "block";
  pagesButton.style.display = "block";

  secondButtonBack.style.display = "none";
  heroContainer.classList.add("hidden");

  axios.request(options).then((response) => {
    let beers = response.data;
    console.log(beers);
    addtingToCointener(beers);
  });
});
// na pocetna da gi dade so BUTTON DETAILS
function renderBeer(data) {
  data.forEach((singleBeer) => {
    searchedBeerAppend(singleBeer);
  });
}

//BACK BUTTON FROM ALL BEERS
function backButonFromBeers() {
  cointener.classList.remove("cointenerNone");
  cointener.classList.add("item-grid");
  console.log("test");
  allBeers.style.display = "grid";
  beerDetails.innerHTML = " ";
  backButonFromAllBeers.style.display = "none";
  cointener.classList.add("");
  // cointener.classList.toggle("cointenerNone");
}
//BACK BUTTON FROM RANDOM BEERS
function backButtonFromRandomBeer() {
  beerDetails.innerHTML = " ";
  allBeers.innerHTML = " ";
  allBeers.style.display = "grid";
  heroContainer.classList.remove("hidden");
  secondButtonBack.style.display = "none";
}
function getRandomBeer() {
  console.log("get random");
  // subMenu.style.display = "none";
  // subMenu.classList.add("hidden");
  randomBeerButton.addEventListener("click", function () {
    subMenu.style.display = "none";
    secondButtonBack.style.display = "block";
    backButonFromAllBeers.style.display = "none";

    const randomNumber = Math.floor(Math.random() * 25);
    // console.log(randomNumber);

    axios.request(options).then((response) => {
      let beers = response.data;
      console.log(beers);
      beers.find((singleBeer) => {
        if (singleBeer.id == randomNumber) {
          pagesButton.style.display = "none";
          allBeers.innerHTML = " ";
          heroContainer.classList.add("hidden");
          beerDetails.innerHTML = " ";
          console.log(singleBeer);

          appendBeer(singleBeer);
        }
      });
    });
  });
}
getRandomBeer();

/*
 // let imgDiv = document.createElement("div");
          // let showImg = document.createElement("img");
          // showImg.src = singleBeer.image_url;
          // showImg.classList.add("showImg");
          // showImg.classList.add("col-md");
          // showImg.classList.add("imgCorrection");
          // imgDiv.append(showImg);
          // imgDiv.classList.add("margin-right");
          // console.log(imgDiv);
          // allBeers.style.display = "none";
          // beerDetails.classList.remove("hidden");
          // let divPerent = document.createElement("div");
          // let beerName = document.createElement("h4");
          // beerName.innerText = singleBeer.name;
          // let beertagline = document.createElement("p");
          // beertagline.innerText = singleBeer.tagline;
          // let divHeader = document.createElement("div");
          // divHeader.append(beerName, beertagline);
          // divHeader.classList.add("cardHeader");
          // /*BODY*/
// let beerDescription = document.createElement("p");
// beerDescription.innerText =
//   "Description:" + " " + singleBeer.description;
// let beerAlcoholic = document.createElement("p");
// beerAlcoholic.innerHTML = "Alcohol:" + " " + singleBeer.abv + "%";
// let firstBrewed = document.createElement("p");
// firstBrewed.innerText = "Brewed:" + " " + singleBeer.first_brewed;
// let beerBitterness = document.createElement("p");
// beerBitterness.innerText =
//   "Bitterness:" + " " + singleBeer.ibu + " " + "IBU";
// let divBody = document.createElement("div");
// divBody.append(
//   beerDescription,
//   beerAlcoholic,
//   firstBrewed,
//   beerBitterness
// );
// /*FOOTER*/
// let foodPairing = document.createElement("h4");
// foodPairing.innerText = "Food pairing";
// let divFooter = document.createElement("div");
// divFooter.append(foodPairing);
// let food_pairing = singleBeer.food_pairing;
// food_pairing.forEach((item) => {
//   let p = document.createElement("p");
//   p.innerText = "''" + item + "''";
//   divFooter.appendChild(p);
// });

// divFooter.classList.add("card-footer");

// divPerent.classList.add("card");
// divPerent.classList.add("col-md");
// divPerent.append(divHeader, divBody, divFooter);
// beerDetails.appendChild(imgDiv);
// beerDetails.appendChild(divPerent);
function newBeer(singleBeer) {
  console.log("test");

  let imgDiv = document.createElement("div"); // beer tile
  let showImg = document.createElement("img"); // single beer image
  showImg.src = singleBeer.image_url;
  showImg.classList.add("showImg");
  showImg.classList.add("col-md");
  showImg.classList.add("imgCorrection");
  imgDiv.append(showImg);
  imgDiv.classList.add("margin-right");
  allBeers.style.display = "none";
  beerDetails.classList.remove("hidden");
  let divPerent = document.createElement("div");
  let beerName = document.createElement("h4");
  beerName.innerText = singleBeer.name;
  let beertagline = document.createElement("p");
  beertagline.innerText = singleBeer.tagline;
  let divHeader = document.createElement("div");
  divHeader.append(beerName, beertagline);
  divHeader.classList.add("cardHeader");
  /*BODY*/
  let beerDescription = document.createElement("p");
  beerDescription.innerText = "Description:" + " " + singleBeer.description;
  let beerAlcoholic = document.createElement("p");
  beerAlcoholic.innerHTML = "Alcohol:" + " " + singleBeer.abv + "%";
  let firstBrewed = document.createElement("p");
  firstBrewed.innerText = "Brewed:" + " " + singleBeer.first_brewed;
  let beerBitterness = document.createElement("p");
  beerBitterness.innerText = "Bitterness:" + " " + singleBeer.ibu + " " + "IBU";
  let divBody = document.createElement("div");
  divBody.append(beerDescription, beerAlcoholic, firstBrewed, beerBitterness);
  /*FOOTER*/
  let foodPairing = document.createElement("h4");
  foodPairing.innerText = "Food pairing";
  let divFooter = document.createElement("div");
  divFooter.append(foodPairing);
  let food_pairing = singleBeer.food_pairing;
  food_pairing.forEach((item) => {
    let p = document.createElement("p");
    p.innerText = "''" + item + "''";
    divFooter.appendChild(p);
  });

  divFooter.classList.add("card-footer");

  divPerent.classList.add("card");
  divPerent.classList.add("col-md");
  divPerent.append(divHeader, divBody, divFooter);
  beerDetails.appendChild(imgDiv);
  beerDetails.appendChild(divPerent);
}

const allPerPages = document.querySelectorAll(".beers-per-page");
console.log(allPerPages);
for (let beersPerPage of allPerPages) {
  beersPerPage.addEventListener("click", async (e) => {
    heroContainer.classList.add("hidden");
    e.preventDefault();

    itemsPerPage = Number(e.target.dataset.value);
    const fetchUrl = `https://api.punkapi.com/v2/beers?per_page=${itemsPerPage}`;
    // const searchByName = `https://api.punkapi.com/v2/beers?beer_name=buzz`;
    console.log(fetchUrl);
    const response = await axios.get(fetchUrl);

    // console.log(responseTwo.data);
    addtingToCointener(response.data);
    // cointener.append(
    //   "https://api.punkapi.com/v2/beers?beer_name=buzz&per_page=10"
    // );
  });
}

function addtingToCointener(beers) {
  if (cointener.textContent.trim().length >= 0) {
    cointener.innerHTML = " ";
  }
  renderBeer(beers);

  pagesButton.style.display = "block";
}

searchButton.addEventListener("click", async function () {
  let keyword = searchInput.value;
  keyword = keyword.replaceAll(" ", "_");
  console.log(keyword.length);
  if (keyword.length == 0) {
    heroContainer.classList.add("hidden");
    alertShow.style.display = "block";
  }
  const searchByName = `https://api.punkapi.com/v2/beers?beer_name=${keyword}`;
  startLoading();
  const response = await axios.get(searchByName);

  try {
    const response = await axios.get(searchByName);
    const data = response.data;

    if (data.length == 0) {
      console.log(`No data found for keyword: ${keyword}`);
      alertShow.style.display = "block";
      heroContainer.classList.add("hidden");
      searchInput.value = " ";
    } else {
      console.log(`Data found for keyword: ${keyword}`);
      let singleBeer = response.data[0];

      pagesButton.style.display = "none";
      allBeers.innerHTML = " ";
      heroContainer.classList.add("hidden");
      beerDetails.innerHTML = " ";
      searchedBeerAppend(singleBeer);

      searchInput.value = " ";
      // process the data
    }
  } catch (error) {
    console.error(error);
    stopLoading();
  }

  // console.log(response);
  // let singleBeer = response.data[0];

  // pagesButton.style.display = "none";
  // allBeers.innerHTML = " ";
  // heroContainer.classList.add("hidden");
  // beerDetails.innerHTML = " ";
  // searchedBeerAppend(singleBeer);

  // searchInput.value = " ";
});
alertCloseButton.addEventListener("click", function () {
  heroContainer.classList.remove("hidden");
  alertShow.style.display = "none";
});
function searchedBeerAppend(singleBeer) {
  let br = document.createElement("br");
  let buttonDeatils = document.createElement("button");
  buttonDeatils.classList.add("btn-secondary");
  buttonDeatils.innerText = "Details";
  let beerImg = document.createElement("img");
  beerImg.classList.add("allBeersImg");
  beerImg.src = singleBeer.image_url;
  let perentDiv = document.createElement("div");
  let divHeaderPerent = document.createElement("div");
  let cardHeader = document.createElement("div");
  cardHeader.classList.add("cardHeader");
  cardHeader.append(beerImg);
  divHeaderPerent.append(cardHeader);
  divHeaderPerent.classList.add("center");
  let cardBody = document.createElement("div");
  let cardFooter = document.createElement("div");
  cardFooter.append(buttonDeatils);
  cardFooter.classList.add("card-footer");
  perentDiv.classList.add("card");
  perentDiv.classList.add("bg-light");
  let beerTitle = document.createElement("h3");
  beerTitle = singleBeer.name;

  let alcoholicPrcn = document.createElement("p");
  alcoholicPrcn = singleBeer.abv;
  cardBody.classList.add("card-body");
  cardBody.append(beerTitle, br, alcoholicPrcn, "%");

  perentDiv.append(divHeaderPerent, cardBody, cardFooter);
  // console.log(perentDiv);
  allBeers.classList.add("item-grid");
  allBeers.appendChild(perentDiv);
  buttonDeatils.addEventListener("click", function () {
    cointener.classList.add("cointenerNone"); ////tuka
    appendBeer(singleBeer);
    pagesButton.style.display = "none";
    secondButtonBack.style.display = "none";
    backButonFromAllBeers.style.display = "block";
  });
}

// SORTING

document.querySelector("#sort-by-name-asc").addEventListener("click", (e) => {
  e.preventDefault();
  axios.request(options).then((response) => {
    response.data = response.data.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    cointener.innerHTML = " ";
    renderBeer(response.data);
  });
});

document.querySelector("#sort-by-name-des").addEventListener("click", (e) => {
  e.preventDefault();
  axios.request(options).then((response) => {
    response.data = response.data.sort((a, b) => {
      if (a.name < b.name) return 1;
      if (a.name > b.name) return -1;
      return 0;
    });
    cointener.innerHTML = " ";
    renderBeer(response.data);
  });
});

document.querySelector("#sort-by-abv-asc").addEventListener("click", (e) => {
  e.preventDefault();
  axios.request(options).then((response) => {
    response.data = response.data.sort((a, b) => b.abv - a.abv);
    cointener.innerHTML = " ";
    renderBeer(response.data);
  });
});

document.querySelector("#sort-by-abv-des").addEventListener("click", (e) => {
  e.preventDefault();
  axios.request(options).then((response) => {
    response.data = response.data.sort((a, b) => a.abv - b.abv);
    cointener.innerHTML = " ";
    renderBeer(response.data);
  });
});

document.querySelector("#sort-by-ibu-asc").addEventListener("click", (e) => {
  e.preventDefault();
  axios.request(options).then((response) => {
    response.data = response.data.sort((a, b) => b.ibu - a.ibu);
    cointener.innerHTML = " ";
    renderBeer(response.data);
  });
});

document.querySelector("#sort-by-ibu-des").addEventListener("click", (e) => {
  e.preventDefault();
  axios.request(options).then((response) => {
    response.data = response.data.sort((a, b) => a.ibu - b.ibu);
    cointener.innerHTML = " ";
    renderBeer(response.data);
  });
});

document.querySelector("#sort-by-date-asc").addEventListener("click", (e) => {
  e.preventDefault();
  axios.request(options).then((response) => {
    response.data = response.data.sort((a, b) => {
      let aDate = a.first_brewed.split("/");
      let bDate = b.first_brewed.split("/");

      console.log(new Date(`${aDate[1]}-${aDate[0]}-01`));
      return (
        new Date(`${aDate[1]}-${aDate[0]}-01`) -
        new Date(`${bDate[1]}-${bDate[0]}-01`)
      );
    });
    cointener.innerHTML = " ";
    renderBeer(response.data);
  });
});
document.querySelector("#sort-by-date-des").addEventListener("click", (e) => {
  e.preventDefault();
  axios.request(options).then((response) => {
    response.data = response.data.sort((a, b) => {
      let aDate = a.first_brewed.split("/");
      let bDate = b.first_brewed.split("/");

      console.log(new Date(`${aDate[1]}-${aDate[0]}-01`));
      return (
        new Date(`${bDate[1]}-${bDate[0]}-01`) -
        new Date(`${aDate[1]}-${aDate[0]}-01`)
      );
    });
    cointener.innerHTML = " ";
    renderBeer(response.data);
  });
});

//PAGINATION
currentPage = 1;
itemsPerPage = 20;
console.log(currentPage, "onLoad");
previusButton.classList.add("disabled");
previusButton.addEventListener("click", function () {
  console.log("Previus BUTTON");
  if (currentPage === 1) {
    console.log("you re on the first Page");
    return;
  }
  currentPage--;

  if (currentPage === 1) {
    previusButton.classList.add("disabled");
  }
  startLoading();
  const fetchUrl = `https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=${itemsPerPage}`;

  axios
    .request(fetchUrl)
    .then((response) => {
      console.log(response, "response PREVIUS BUTTON");
      cointener.innerHTML = " ";
      pageNumber.innerText = currentPage;
      pageNumberPrevius.innerText = currentPage - 1;
      pageNumberNext.innerText = currentPage + 1;
      addtingToCointener(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      stopLoading(); // code to be executed regardless of whether an exception was thrown or caught
    });
});
nextButton.addEventListener("click", function () {
  if (currentPage === 17) {
    nextButton.classList.add("disabled");
    return;
  }
  currentPage++;
  previusButton.classList.remove("disabled");

  const fetchUrl = `https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=${itemsPerPage}`;

  //
  startLoading();
  axios
    .request(fetchUrl)
    .then((response) => {
      console.log(currentPage);
      // if (currentPage === 2) {
      //   pageNumberPrevius.innerText = " ";
      // }
      pageNumber.innerText = currentPage;
      pageNumber.classList.add("bold");
      pageNumberPrevius.innerText = currentPage - 1;
      pageNumberNext.innerText = currentPage + 1;
      cointener.innerHTML = " ";
      addtingToCointener(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      stopLoading(); // code to be executed regardless of whether an exception was thrown or caught
    });
});

// DROPDOWN BUTTONS
function showBeersDropDown() {
  if (showBeers.style.display === "block") {
    showBeers.style.display = "none"; // if currently visible, hide the element
  } else {
    showBeers.style.display = "block"; // if currently hidden, show the element
  }
}
console.log("test");

function sortBeersDropDown() {
  if (sortBeers.style.display === "block") {
    sortBeers.style.display = "none"; // if currently visible, hide the element
  } else {
    sortBeers.style.display = "block"; // if currently hidden, show the element
  }
}

//LOADING SPINNER

function updateLoading(progress) {
  var loadingBarProgress = document.getElementById("loading-bar-progress");
  loadingBarProgress.style.width = progress + "%";
}
function startLoading() {
  var loadingBar = document.getElementById("loading-bar");
  loadingBar.style.display = "block";
}

function stopLoading() {
  var loadingBar = document.getElementById("loading-bar");
  loadingBar.style.display = "none";
}
