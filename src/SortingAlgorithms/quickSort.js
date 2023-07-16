import { BAR_COLOR, SORTING_COLOR } from "./globals";

export default function quickSortHelper(array, low, high, animationTimer, speedSliderValue){
    if(low < high){
        let partitionIndex;
        [partitionIndex, animationTimer] = partition(array, low, high, animationTimer, speedSliderValue);
        animationTimer = quickSortHelper(array, low, partitionIndex - 1, animationTimer, speedSliderValue);
        animationTimer = quickSortHelper(array, partitionIndex + 1, high, animationTimer, speedSliderValue);
    }
    return animationTimer;
}

function partition(array, low, high, animationTimer, speedSliderValue){ //partition using final element as pivot
    const arrayBars = document.getElementsByClassName('array-bar');
    const pivotBarHeight = array[high];
    const pivotBar = arrayBars[high];
    let i = (low - 1);

    setTimeout(() => { //highlight pivot
        pivotBar.style.backgroundColor = SORTING_COLOR;
    }, animationTimer++ * speedSliderValue);

    for(let j = low; j < high; j++){ //iterate through array, swapping when necessary
        const curBar = arrayBars[j];
        setTimeout(() => { //highlight current bar being compared
            curBar.style.backgroundColor = SORTING_COLOR;
        }, animationTimer++ * speedSliderValue);

        if(array[j] < pivotBarHeight){
            i++;
            const swapBar = arrayBars[i]; //highlight bar to be swapped with
            setTimeout(() => {
                swapBar.style.backgroundColor = SORTING_COLOR;
            }, animationTimer++ * speedSliderValue);

            const curBarHeight = array[j]; //swap values in array
            const swapBarHeight = array[i];
            array[j] = swapBarHeight;
            array[i] = curBarHeight;

            setTimeout(() => { //swap bar heights
                curBar.style.height = `${swapBarHeight / 10 - 20}vh`;
                swapBar.style.height = `${curBarHeight / 10 - 20}vh`;
            }, animationTimer++ * speedSliderValue);

            setTimeout(() => {
                swapBar.style.backgroundColor = BAR_COLOR;
            }, animationTimer * speedSliderValue);
        }
        setTimeout(() => { //revert bar colors
            curBar.style.backgroundColor = BAR_COLOR;
        }, animationTimer++ * speedSliderValue);
    }
    //swap pivot into proper location

    const finalSwapBar = arrayBars[i + 1];
    const finalSwapBarHeight = array[i + 1];
    array[high] = finalSwapBarHeight;
    array[i + 1] = pivotBarHeight;
    
    setTimeout(() => { //highlight swap bar
        finalSwapBar.style.backgroundColor = SORTING_COLOR;
    }, animationTimer++ * speedSliderValue);

    setTimeout(() => { //swap bar heights
        pivotBar.style.height = `${finalSwapBarHeight / 10 - 20}vh`;
        finalSwapBar.style.height = `${pivotBarHeight / 10 - 20}vh`;
    }, animationTimer++ * speedSliderValue);

    setTimeout(() => { //revert bar colors
        pivotBar.style.backgroundColor = BAR_COLOR;
        finalSwapBar.style.backgroundColor = BAR_COLOR;
    }, animationTimer++ * speedSliderValue);

    return [i + 1, animationTimer];
}