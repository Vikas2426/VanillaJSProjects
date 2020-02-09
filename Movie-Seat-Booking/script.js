const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector("#count");
const total = document.querySelector(".total");
const price = document.querySelector("#price");
const movie = document.querySelector("#movie");
const cost = document.querySelector("#cost");
let ticketPrice = +movie.value;
cost.innerText = ticketPrice;

//Update seat count and total price
const updateTotal = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seats = selectedSeats.length;

  count.innerText = seats;
  price.innerText = seats * ticketPrice;
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
});
