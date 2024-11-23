position = { x: 0, y: 0 };
function makeDraggable(item) {
  let offsetX = 0;
  let offsetY = 0;

  interact(item).draggable({
    listeners: {
      start(event) {
        event.target.style.zIndex = "1000";

        // Get the board's position relative to the window
        const board = document.querySelector(".board");
        const boardRect = board.getBoundingClientRect();

        // Calculate the initial offset between the mouse position and the element's top-left corner
        offsetX = event.clientX - event.target.getBoundingClientRect().left;
        offsetY = event.clientY - event.target.getBoundingClientRect().top;

        console.log("Start offset:", offsetX, offsetY);
      },
      move(event) {
        // Get the board's position relative to the window
        const board = document.querySelector(".board");
        const boardRect = board.getBoundingClientRect();

        // Calculate the new position based on the mouse position and initial offset
        position.x = event.clientX - boardRect.left - offsetX;
        position.y = event.clientY - boardRect.top - offsetY;

        // Apply the translation relative to the board's position
        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;

        console.log("Move position:", position.x, position.y);
      },
      end(event) {
        event.target.style.zIndex = "";
        console.log(event.type, event.target);
      },
    },
  });
}

function addToBoard(item) {
  const board = document.querySelector(".board");

  const block = document.createElement("div");
  block.className = "draggable_item";
  block.setAttribute("data-type", "block");
  block.innerText = item;

  board.appendChild(block);
  makeDraggable(block);
}

document
  .querySelectorAll(".draggable_label, .draggable_value")
  .forEach((item) => {
    item.addEventListener("click", () => {
      addToBoard(item.innerText);
    });
  });
