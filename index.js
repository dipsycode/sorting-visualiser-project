// Variables to hold array elements and container
const container = document.getElementById('container');
let array = [];

// Function to generate a random array of elements
function generateArray() {
    container.innerHTML = "";  // Clear existing blocks
    array = [];
    for (let i = 0; i < 50; i++) { // Array of 50 elements
        const value = Math.floor(Math.random() * 300) + 0; // Random heights
        array.push(value);
        const arrayElement = document.createElement('div');
        arrayElement.classList.add('arrayelements');
        arrayElement.style.height = `${value}px`;
        container.appendChild(arrayElement);
    }
}

// Function to swap two blocks (for visualization) and mark them in red during the swap
function swap(el1, el2) {
    return new Promise((resolve) => {
        // Change colors to red to indicate swapping
        el1.style.backgroundColor = "red";
        el2.style.backgroundColor = "red";

        setTimeout(() => {
            // Swap the heights of the two elements
            const temp = el1.style.height;
            el1.style.height = el2.style.height;
            el2.style.height = temp;
            
            // Change the colors back to the original after the swap
            el1.style.backgroundColor = "aquamarine";
            el2.style.backgroundColor = "aquamarine";
            
            resolve();
        }, 150); // Adjust time for visualization (300ms delay during swap)
    });
}

// Bubble Sort
async function bubbleSort() {
    const elements = document.querySelectorAll('.arrayelements');
    for (let i = 0; i < elements.length - 1; i++) {
        for (let j = 0; j < elements.length - i - 1; j++) {
            if (parseInt(elements[j].style.height) > parseInt(elements[j + 1].style.height)) {
                await swap(elements[j], elements[j + 1]);
            }
        }
    }
}

// Selection Sort
async function selectionSort() {
    const elements = document.querySelectorAll('.arrayelements');
    for (let i = 0; i < elements.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < elements.length; j++) {
            if (parseInt(elements[j].style.height) < parseInt(elements[minIndex].style.height)) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            await swap(elements[i], elements[minIndex]);
        }
    }
}

// Insertion Sort
async function insertionSort() {
    const elements = document.querySelectorAll('.arrayelements');
    for (let i = 1; i < elements.length; i++) {
        let key = elements[i].style.height;
        let j = i - 1;
        while (j >= 0 && parseInt(elements[j].style.height) > parseInt(key)) {
            elements[j + 1].style.height = elements[j].style.height;
            j = j - 1;
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
        elements[j + 1].style.height = key;
    }
}

// Quick Sort
async function quickSort(left = 0, right = array.length - 1) {
    if (left < right) {
        let pivotIndex = await partition(left, right);
        await quickSort(left, pivotIndex - 1);
        await quickSort(pivotIndex + 1, right);
    }
}

// Partition function for Quick Sort
async function partition(left, right) {
    const elements = document.querySelectorAll('.arrayelements');
    let pivot = parseInt(elements[right].style.height);
    let i = left - 1;
    for (let j = left; j < right; j++) {
        if (parseInt(elements[j].style.height) < pivot) {
            i++;
            await swap(elements[i], elements[j]);
        }
    }
    await swap(elements[i + 1], elements[right]);
    return i + 1;
}

// Function to sort based on the selected algorithm
async function sortArray() {
    const selectedAlgorithm = document.getElementById('algorithm').value;

    if (selectedAlgorithm === 'bubble') {
        await bubbleSort();
    } else if (selectedAlgorithm === 'selection') {
        await selectionSort();
    } else if (selectedAlgorithm === 'insertion') {
        await insertionSort();
    } else if (selectedAlgorithm === 'quick') {
        await quickSort();
    }
}

// Event listeners for buttons
document.getElementById('generate').addEventListener('click', generateArray);

document.getElementById('sort').addEventListener('click', sortArray);

// Generate the initial array
generateArray();
