var n = 4;
var i = 1;

function next() {
  if (i == n) i = 1;
  else i++;

  document
    .getElementById("show")
    .setAttribute("src", "./imgae/show_" + i + ".jpg");
}

function back() {
  if (i == 1) i = n;
  else i--;

  document
    .getElementById("show")
    .setAttribute("src", "./imgae/show_" + i + ".jpg");
}

function autoPlay() {
  setInterval(next, 1000);
}
