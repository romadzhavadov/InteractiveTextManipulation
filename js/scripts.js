// let selectedChars = new Set();

// const submitButton = document.querySelector(".submit-btn");
// submitButton.addEventListener("click", displayText);

// function displayText() {
//     const input = document.getElementById("textInput").value;
//     const output = document.getElementById("output");
//     output.innerHTML = "";
    
//     input.split("").forEach((char, index) => {
//         let span = document.createElement("span");
//         span.textContent = char;
//         span.classList.add("char");
//         span.setAttribute("draggable", "true");
//         span.setAttribute("data-index", index);
        
//         span.addEventListener("click", toggleSelection);
//         span.addEventListener("dragstart", handleDragStart);
//         span.addEventListener("dragover", handleDragOver);
//         span.addEventListener("drop", handleDrop);
        
//         output.appendChild(span);
//     });
// }

// function toggleSelection(event) {
//     if (event.ctrlKey) {
//         event.target.classList.toggle("selected");
//         if (selectedChars.has(event.target)) {
//             selectedChars.delete(event.target);
//         } else {
//             selectedChars.add(event.target);
//         }
//     }
// }

// function handleDragStart(event) {
//     event.dataTransfer.setData("text/plain", event.target.dataset.index);
// }

// function handleDragOver(event) {
//     event.preventDefault();
// }

// function handleDrop(event) {
//     event.preventDefault();
//     const draggedIndex = event.dataTransfer.getData("text/plain");
//     const draggedElement = document.querySelector(`[data-index='${draggedIndex}']`);
//     const targetElement = event.target;

//     if (draggedElement && targetElement && draggedElement !== targetElement) {
//         let parent = targetElement.parentNode;
//         let draggedClone = draggedElement.cloneNode(true);
//         let targetClone = targetElement.cloneNode(true);

//         parent.replaceChild(draggedClone, targetElement);
//         parent.replaceChild(targetClone, draggedElement);

//         draggedClone.addEventListener("click", toggleSelection);
//         draggedClone.addEventListener("dragstart", handleDragStart);
//         draggedClone.addEventListener("dragover", handleDragOver);
//         draggedClone.addEventListener("drop", handleDrop);

//         targetClone.addEventListener("click", toggleSelection);
//         targetClone.addEventListener("dragstart", handleDragStart);
//         targetClone.addEventListener("dragover", handleDragOver);
//         targetClone.addEventListener("drop", handleDrop);
//     }
// }


// 2 вар
// let isSelecting = false;
// let selectionBox = null;
// let selectedChars = new Set();
// let charElements = []; // масив для збереження елементів букв

// // Функція для відображення тексту з input в output
// function displayText() {
//     const input = document.getElementById("textInput").value;
//     const output = document.getElementById("output");
//     output.innerHTML = "";
//     charElements = []; // очищаємо масив букв

//     // Розбиваємо введений текст на окремі букви і додаємо до output
//     input.split("").forEach((char, index) => {
//         let span = document.createElement("span");
//         span.textContent = char;
//         span.classList.add("char");
//         span.setAttribute("data-index", index);

//         // Додаємо до output
//         output.appendChild(span);

//         // Додаємо елемент до масиву
//         charElements.push(span);

//         // Додаємо події для клік і перетягування
//         span.addEventListener("click", toggleSelection);
//     });
// }

// function toggleSelection(event) {
//     // Перевіряємо, чи натиснута клавіша Ctrl
//     if (event.ctrlKey) {
//         // Якщо натиснута Ctrl, то додаємо або прибираємо клас 'selected'
//         event.target.classList.toggle("selected");

//         // Перевіряємо, чи буква вже в масиві вибраних
//         if (selectedChars.has(event.target)) {
//             selectedChars.delete(event.target); // Видаляємо, якщо вже вибрано
//         } else {
//             selectedChars.add(event.target); // Додаємо, якщо ще не вибрано
//         }
//     } else {
//         // Якщо Ctrl не натиснута, очищуємо вибір і вибираємо лише одну букву
//         clearSelection(); // Очищаємо попереднє виділення
//         event.target.classList.add("selected"); // Виділяємо лише поточну букву
//         selectedChars.add(event.target); // Додаємо поточну букву в масив вибраних
//     }
// }
// // Функція початку виділення
// function startSelection(event) {
//     if (event.target.classList.contains("char")) {
//         // Очищаємо попереднє виділення
//         clearSelection();

//         // Створюємо новий прямокутник для виділення
//         selectionBox = document.createElement("div");
//         selectionBox.style.position = "absolute";
//         selectionBox.style.border = "1px dashed rgba(0, 0, 0, 0.5)";
//         selectionBox.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
//         document.body.appendChild(selectionBox);

//         // Записуємо початкові координати для прямокутника
//         const startX = event.pageX;
//         const startY = event.pageY;

//         // Встановлюємо початкові координати для прямокутника
//         selectionBox.style.left = `${startX}px`;
//         selectionBox.style.top = `${startY}px`;

//         // Зберігаємо стартові координати
//         selectionBox.startX = startX;
//         selectionBox.startY = startY;

//         isSelecting = true;
//     }
// }

// // Функція для оновлення розмірів прямокутника при тязі миші
// function updateSelection(event) {
//     if (!isSelecting) return;

//     const currentX = event.pageX;
//     const currentY = event.pageY;

//     // Визначаємо нові розміри та позицію прямокутника
//     const width = Math.abs(currentX - selectionBox.startX);
//     const height = Math.abs(currentY - selectionBox.startY);

//     selectionBox.style.width = `${width}px`;
//     selectionBox.style.height = `${height}px`;

//     // Перевірка попадання букв у прямокутник
//     const selectionRect = selectionBox.getBoundingClientRect();
//     console.log(selectionRect)

//     charElements.forEach(charElement => {
//         const charRect = charElement.getBoundingClientRect();
//         console.log(charRect)
//         const tolerance = 20;
//         // Перевірка, чи знаходиться буква в межах прямокутника
//         if (
//             charRect.left >= selectionRect.left - tolerance &&
//             charRect.right <= selectionRect.right + tolerance &&
//             charRect.top >= selectionRect.top - tolerance &&
//             charRect.bottom <= selectionRect.bottom + tolerance
//         ) {
//             // Виділяємо букву, якщо вона всередині прямокутника
//             charElement.classList.add("selected");
//             selectedChars.add(charElement);
//         } else {
//             // Скидаємо виділення, якщо буква не в межах прямокутника
//             charElement.classList.remove("selected");
//             selectedChars.delete(charElement);
//         }
//     });
// }

// // Функція для завершення виділення
// function stopSelection() {
//     isSelecting = false;

//     // Перевірка, чи існує selectionBox перед його видаленням
//     if (selectionBox) {
//         selectionBox.remove(); // Прибираємо прямокутник після завершення виділення
//     }

//     selectionBox = null; // Очищаємо змінну для прямокутника
// }

// // Очищаємо виділення
// function clearSelection() {
//     selectedChars.forEach(charElement => {
//         charElement.classList.remove("selected");
//     });
//     selectedChars.clear();
// }

// // Додаємо слухачів подій
// document.addEventListener("mousedown", startSelection);
// document.addEventListener("mousemove", updateSelection);
// document.addEventListener("mouseup", stopSelection);

// // Додаємо подію для кнопки
// const submitButton = document.querySelector(".submit-btn");
// submitButton.addEventListener("click", displayText);

let isSelecting = false;
let selectionBox = null;
let selectedChars = new Set();
let charElements = []; // масив для збереження елементів букв

// Функція для відображення тексту з input в output
function displayText() {
    const input = document.getElementById("textInput").value;
    const output = document.getElementById("output");
    output.innerHTML = "";
    charElements = []; // очищаємо масив букв

    // Розбиваємо введений текст на окремі букви і додаємо до output
    input.split("").forEach((char, index) => {
        let span = document.createElement("span");
        span.textContent = char;
        span.classList.add("char");
        span.setAttribute("data-index", index);

        // Додаємо до output
        output.appendChild(span);

        // Додаємо елемент до масиву
        charElements.push(span);
    });

    // Після оновлення тексту додаємо події
    addEventListeners();
}

// Функція для додавання прослуховувачів подій
function addEventListeners() {
    charElements.forEach(span => {
        span.addEventListener("click", toggleSelection);
    });
}

// Функція для перемикання вибору при натисканні Ctrl
function toggleSelection(event) {
    // Перевіряємо, чи натиснута клавіша Ctrl
    if (event.ctrlKey) {
        event.target.classList.toggle("selected"); // Додаємо або видаляємо клас 'selected'

        if (selectedChars.has(event.target)) {
            selectedChars.delete(event.target); // Видаляємо з вибраних, якщо вже є
        } else {
            selectedChars.add(event.target); // Додаємо в вибрані
        }
    } else {
        // Якщо Ctrl не натиснута, очищаємо вибір і вибираємо лише одну букву
        clearSelection(); // Очищаємо попереднє виділення
        event.target.classList.add("selected"); // Виділяємо лише поточну букву
        selectedChars.add(event.target); // Додаємо поточну букву в масив вибраних
    }
}

// Функція початку виділення
function startSelection(event) {
    if (event.target.classList.contains("char")) {
        // Очищаємо попереднє виділення
        clearSelection();

        // Створюємо новий прямокутник для виділення
        selectionBox = document.createElement("div");
        selectionBox.style.position = "absolute";
        selectionBox.style.border = "1px dashed rgba(0, 0, 0, 0.5)";
        selectionBox.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        document.body.appendChild(selectionBox);

        // Записуємо початкові координати для прямокутника
        const startX = event.pageX;
        const startY = event.pageY;

        // Встановлюємо початкові координати для прямокутника
        selectionBox.style.left = `${startX}px`;
        selectionBox.style.top = `${startY}px`;

        // Зберігаємо стартові координати
        selectionBox.startX = startX;
        selectionBox.startY = startY;

        isSelecting = true;
    }
}

// Функція для оновлення розмірів прямокутника при тязі миші
function updateSelection(event) {
    if (!isSelecting) return;

    const currentX = event.pageX;
    const currentY = event.pageY;

    // Визначаємо нові розміри та позицію прямокутника
    const width = Math.abs(currentX - selectionBox.startX);
    const height = Math.abs(currentY - selectionBox.startY);

    selectionBox.style.width = `${width}px`;
    selectionBox.style.height = `${height}px`;

    // Перевірка попадання букв у прямокутник
    const selectionRect = selectionBox.getBoundingClientRect();
    console.log(selectionRect);

    charElements.forEach(charElement => {
        const charRect = charElement.getBoundingClientRect();
        console.log(charRect);

        const tolerance = 20;
        // Перевірка, чи знаходиться буква в межах прямокутника
        if (
            charRect.left >= selectionRect.left - tolerance &&
            charRect.right <= selectionRect.right + tolerance &&
            charRect.top >= selectionRect.top - tolerance &&
            charRect.bottom <= selectionRect.bottom + tolerance
        ) {
            // Виділяємо букву, якщо вона всередині прямокутника
            charElement.classList.add("selected");
            selectedChars.add(charElement);
        } else {
            // Скидаємо виділення, якщо буква не в межах прямокутника
            charElement.classList.remove("selected");
            selectedChars.delete(charElement);
        }
    });
}

// Функція для завершення виділення
function stopSelection() {
    isSelecting = false;

    // Перевірка, чи існує selectionBox перед його видаленням
    if (selectionBox) {
        selectionBox.remove(); // Прибираємо прямокутник після завершення виділення
    }

    selectionBox = null; // Очищаємо змінну для прямокутника
}

// Очищаємо виділення
function clearSelection() {
    selectedChars.forEach(charElement => {
        charElement.classList.remove("selected");
    });
    selectedChars.clear();
}

// Додаємо слухачів подій
document.addEventListener("mousedown", startSelection);
document.addEventListener("mousemove", updateSelection);
document.addEventListener("mouseup", stopSelection);

// Додаємо подію для кнопки
const submitButton = document.querySelector(".submit-btn");
submitButton.addEventListener("click", displayText);
