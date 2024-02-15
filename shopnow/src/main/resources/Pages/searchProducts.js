var isSortOpen = false;
function toggleSort() {
  var sortBOx = document.getElementById("drop-down-sort");
  var closeState = ["transform", "scale-95", "opacity-0"];
  var openState = ["transition", "ease-out", "duration-100"];
  isSortOpen = !isSortOpen;
  if (isSortOpen) {
    openState.forEach((i) => {
      sortBOx.classList.add(i);
    });
    closeState.forEach((i) => sortBOx.classList.remove(i));
  } else {
    openState.forEach((i) => {
      sortBOx.classList.remove(i);
    });
    closeState.forEach((i) => sortBOx.classList.add(i));
  }
}
