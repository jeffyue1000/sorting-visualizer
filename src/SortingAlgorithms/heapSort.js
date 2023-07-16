import { BAR_COLOR, SORTING_COLOR } from "./globals";

export default function heapify(array, length, rootIndex, animationTimer, speedSliderValue){ //total animation timer tracks duration of all recursive calls
    const arrayBars = document.getElementsByClassName('array-bar');
    let largest = rootIndex;
    const leftChild = 2 * rootIndex + 1;
    const rightChild = 2 * rootIndex + 2;
    const firstBar = arrayBars[leftChild];
    const curBar = arrayBars[rootIndex];
    const secondBar = arrayBars[rightChild];

    setTimeout(() => { //color elements of the array being compared
        curBar.style.backgroundColor = SORTING_COLOR;
    }, animationTimer++ * speedSliderValue);

    if(leftChild < length){
        setTimeout(() => {
            firstBar.style.backgroundColor = SORTING_COLOR;
        }, animationTimer++ * speedSliderValue);
    
    }
    if(leftChild < length){
        setTimeout(() => {
            firstBar.style.backgroundColor = BAR_COLOR;
        }, animationTimer * speedSliderValue);
    }

    if(rightChild < length){
        setTimeout(() => {
            secondBar.style.backgroundColor = SORTING_COLOR; 
        }, animationTimer++ * speedSliderValue);
    }

    if(rightChild < length){
        setTimeout(() => {
            secondBar.style.backgroundColor = BAR_COLOR;
        }, animationTimer * speedSliderValue);
    }

    setTimeout(() => {
        curBar.style.backgroundColor = BAR_COLOR;
    }, animationTimer++ * speedSliderValue);

    if(leftChild < length && array[leftChild] > array[largest]){ //determine largest of root and children
        largest = leftChild;
    }
    if(rightChild < length && array[rightChild] > array[largest]){
        largest = rightChild;
    }
    if(largest !== rootIndex){ //if root not largest, swap with largest
        const rootHeight = array[rootIndex];
        const largestHeight = array[largest];
        array[rootIndex] = largestHeight;
        array[largest] = rootHeight;

        setTimeout(() => {
            const largestChild = arrayBars[largest];
            curBar.style.height = `${largestHeight / 10 - 20}vh`;
            largestChild.style.height = `${rootHeight / 10 - 20}vh`;
        }, animationTimer++ * speedSliderValue);

        animationTimer = heapify(array, length, largest, animationTimer, speedSliderValue);
    }
    return animationTimer;

}