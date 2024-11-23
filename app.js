const position = { x: 0, y: 0 };

function makeDraggable(item) {
  interact(item).draggable({
    listeners: {
      start(event) {
        event.target.style.zIndex = "1000";
        console.log(event.dx, event.dy);
      },
      move(event) {
        position.x += event.dx;
        position.y += event.dy;

        event.target.style.transform = `translate(${position.x}px,${position.y}px)`;
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
}

document
  .querySelectorAll(".draggable_label, .draggable_value")
  .forEach((item) => {
    item.addEventListener("click", () => {
      addToBoard(item.innerText);
      makeDraggable(".draggable_item");
    });
  });
