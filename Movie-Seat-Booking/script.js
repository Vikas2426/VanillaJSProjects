const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector("#count");
const total = document.querySelector(".total");
const price = document.querySelector("#price");
const movie = document.querySelector("#movie");
const cost = document.querySelector("#cost");

let ticketPrice = +movie.value;
cost.innerText = ticketPrice;

//Store in local Storage
const storeMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem("movieIndex", movieIndex);
  localStorage.setItem("moviePrice", moviePrice);
};

//Update seat count and total price
const updateTotal = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatCount = selectedSeats.length;
  count.innerText = seatCount;
  price.innerText = seatCount * ticketPrice;

  //Store in Local Storage
  const selectedSeatsIndex = [...selectedSeats].map(seat =>
    [...seats].indexOf(seat)
  );
  localStorage.setItem("selectedSeats", JSON.stringify(selectedSeatsIndex));
};

//Seat Click Event
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateTotal();
  }
});

//Movie Select Event
movie.addEventListener("change", e => {
  ticketPrice = +e.target.value;
  cost.innerText = ticketPrice;
  updateTotal();

  //Store in Local Storage
  storeMovieData(e.target.selectedIndex, e.target.value);
});

//Populate UI with locally stored data
const populateUI = () => {
  // populate selected seats
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      //index is present in selectedSeats
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  //populate selected movie
  const selectedMovieIndex = localStorage.getItem("movieIndex");

  if (selectedMovieIndex != null) {
    movie.selectedIndex = selectedMovieIndex;
  }

  //populate selected movie price
  const selectedMoviePrice = localStorage.getItem("moviePrice");
  if (selectedMoviePrice != null) {
    ticketPrice = +selectedMoviePrice;
    cost.innerText = ticketPrice;
    updateTotal();
  }
};

populateUI();
