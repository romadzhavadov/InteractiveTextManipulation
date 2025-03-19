let selectedChars = new Set();

const submitButton = document.querySelector(".submit-btn");
submitButton.addEventListener("click", displayText);

function displayText() {
    const input = document.getElementById("textInput").value;
    const output = document.getElementById("output");
    output.innerHTML = "";
    
    input.split("").forEach((char, index) => {
        let span = document.createElement("span");
        span.textContent = char;
        span.classList.add("char");
        span.setAttribute("draggable", "true");
        span.setAttribute("data-index", index);
        
        span.addEventListener("click", toggleSelection);
        span.addEventListener("dragstart", handleDragStart);
        span.addEventListener("dragover", handleDragOver);
        span.addEventListener("drop", handleDrop);
        
        output.appendChild(span);
    });
}

function toggleSelection(event) {
    if (event.ctrlKey) {
        event.target.classList.toggle("selected");
        if (selectedChars.has(event.target)) {
            selectedChars.delete(event.target);
        } else {
            selectedChars.add(event.target);
        }
    }
}

function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.dataset.index);
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    const draggedIndex = event.dataTransfer.getData("text/plain");
    const draggedElement = document.querySelector(`[data-index='${draggedIndex}']`);
    const targetElement = event.target;

    if (draggedElement && targetElement && draggedElement !== targetElement) {
        let parent = targetElement.parentNode;
        let draggedClone = draggedElement.cloneNode(true);
        let targetClone = targetElement.cloneNode(true);

        parent.replaceChild(draggedClone, targetElement);
        parent.replaceChild(targetClone, draggedElement);

        draggedClone.addEventListener("click", toggleSelection);
        draggedClone.addEventListener("dragstart", handleDragStart);
        draggedClone.addEventListener("dragover", handleDragOver);
        draggedClone.addEventListener("drop", handleDrop);

        targetClone.addEventListener("click", toggleSelection);
        targetClone.addEventListener("dragstart", handleDragStart);
        targetClone.addEventListener("dragover", handleDragOver);
        targetClone.addEventListener("drop", handleDrop);
    }
}