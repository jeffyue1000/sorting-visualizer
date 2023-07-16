import React, { useEffect, useState } from "react";
import mergeSortAnimations from "../SortingAlgorithms/mergeSort.js";
import heapify from "../SortingAlgorithms/heapSort.js";
import quickSortHelper from "../SortingAlgorithms/quickSort.js";
import { BAR_COLOR, SORTING_COLOR, SORTED_COLOR } from "../SortingAlgorithms/globals.js";
import './SortingVisualizer.css';

export default function SortingVisualizer(){
    const [newArray, setNewArray] = useState([]);
    const [isRandomArray, setIsRandomArray] = useState(true);
    const [barSliderValue, setBarSliderValue] = useState(100);
    const [speedSliderValue, setSpeedSliderValue] = useState(10);

    useEffect(() => {
        if(isRandomArray){
            resetArray();
        }
        else{
            sortedArray();
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [barSliderValue]);

    function resetArray() { //creates new random array
        let array = [];
        for(let i = 0; i < barSliderValue; i++){
            array.push(randomInt(200, 980));
        }
        setNewArray(array);
        setIsRandomArray(true);
        revertDefaultColor(newArray);
    }

    function sortedArray(){
        let array = [];
        const valueStep = 800 / barSliderValue;
        array.push(Math.floor(Math.random() * valueStep + 210));
        for(let i = 1; i < barSliderValue; i++){
            let partialSortedVal = Math.floor(Math.random() * (valueStep + 22)) - 9.6;
            array.push(array[i - 1] + partialSortedVal);
        }
        setNewArray(array);
        setIsRandomArray(false);
        revertDefaultColor(newArray);
    }

    function disableInteractibles(){
        const buttons = document.getElementsByClassName("btn");
        const sliders = document.getElementsByClassName("slider");
        for(let i = 0; i < buttons.length; i++){
            buttons[i].disabled = true;
        }
        for(let i = 0; i < sliders.length; i++){
            sliders[i].disabled = true;
        }
    }
    
    function enableInteractibles(animationsLength){
        const buttons = document.getElementsByClassName("btn");
        const sliders = document.getElementsByClassName("slider");
        setTimeout(() => {
            for(let i = 0; i < buttons.length; i++){
                buttons[i].disabled = false;
            }
            for(let i = 0; i < sliders.length; i++){
                sliders[i].disabled = false;
            }
        }, animationsLength * speedSliderValue);
    }
    
    function sortedColorChange(array){
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i = 0; i < array.length; i++){
            setTimeout(() => {
                arrayBars[i].style.backgroundColor = SORTED_COLOR;
            }, i * speedSliderValue);
        }
    }

    function selectionSort(){
        disableInteractibles();
        revertDefaultColor(newArray);

        let mainArray = newArray.slice();
        const length = mainArray.length;
        let animationTimer = 0;

        for(let i = 0; i < length; i++){
            let min = mainArray[i]; //start the sorting process
            let minIndex = i;

            const arrayBars = document.getElementsByClassName('array-bar'); //get bars for animation
            const curBar = arrayBars[i];
            setTimeout(() => { //change color of value being examined
                curBar.style.backgroundColor = SORTING_COLOR;
            }, animationTimer++ * speedSliderValue);

            for(let j = i + 1; j < length; j++){ //parse through array
                if(mainArray[j] < min){
                    min = mainArray[j];
                    minIndex = j;
                }
                const curBar = arrayBars[j];
                const prevBar = arrayBars[j - 1];
                setTimeout(() => { //change colors of value while reverting previous value;
                    curBar.style.backgroundColor = SORTING_COLOR;
                    prevBar.style.backgroundColor = BAR_COLOR;
                }, animationTimer++ * speedSliderValue)
            }
            setTimeout(() => { //revert final bar color
                const lastBar = arrayBars[length - 1];
                lastBar.style.backgroundColor = BAR_COLOR;
            }, animationTimer++ * speedSliderValue);

            const firstBarHeight = mainArray[i]; //swap bar values
            mainArray[i] = min;
            mainArray[minIndex] = firstBarHeight;

            setTimeout(() => { //swap min bar with 'first' bar
                const firstBar = arrayBars[i];
                const swappedBar = arrayBars[minIndex];
                firstBar.style.height = `${min / 10 - 20}vh`;
                swappedBar.style.height = `${firstBarHeight / 10 - 20}vh`;
            }, animationTimer++ * speedSliderValue);
        }
        setTimeout(() => {
            sortedColorChange(newArray);
            setNewArray(mainArray);
        }, animationTimer++ * speedSliderValue);
        
        enableInteractibles(animationTimer + length);
    }

    function insertionSort(){
        disableInteractibles();
        revertDefaultColor(newArray);

        let mainArray = newArray.slice();
        const length = mainArray.length;
        let animationTimer = 0;

        for(let i = 1; i < length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const curBar = arrayBars[i];
            setTimeout(() => { //indicate which index is being examined
                curBar.style.backgroundColor = SORTING_COLOR;
            }, animationTimer++ * speedSliderValue);

            const curVal = mainArray[i];
            let j = i - 1;
            while(j >= 0 && mainArray[j] > curVal){ //swapping and animating each instance of insertion
                const temp = mainArray[j + 1];
                mainArray[j + 1] = mainArray[j];
                mainArray[j] = temp;
                const firstBar = arrayBars[j + 1];
                const secondBar = arrayBars[j];
                const firstBarHeight = mainArray[j + 1];
                const secondBarHeight = mainArray[j];
                j--;
                setTimeout(() => {
                    firstBar.style.backgroundColor = SORTING_COLOR;
                }, animationTimer++ * speedSliderValue);
                
                setTimeout(() => { //staggered color changes show comparisons
                    secondBar.style.backgroundColor = SORTING_COLOR;
                }, animationTimer++ * speedSliderValue);

                setTimeout(() => {
                    firstBar.style.height = `${firstBarHeight / 10 - 20}vh`;
                    secondBar.style.height = `${secondBarHeight / 10 - 20}vh`;
                }, animationTimer++ * speedSliderValue);
                if(j === i - 2){
                    setTimeout(() => {
                        // firstBar.style.backgroundColor = BAR_COLOR;
                        secondBar.style.backgroundColor = BAR_COLOR;
                    }, animationTimer++ * speedSliderValue);
                }
                else{
                    setTimeout(() => {
                        firstBar.style.backgroundColor = BAR_COLOR;
                        secondBar.style.backgroundColor = BAR_COLOR;
                    }, animationTimer++ * speedSliderValue);
                }
            }
            setTimeout(() => { //revert rightmost examined bar to original color
                curBar.style.backgroundColor = BAR_COLOR;
            }, animationTimer++ * speedSliderValue);
        }
        setTimeout(() => {
            sortedColorChange(newArray);
            setNewArray(mainArray);
        }, animationTimer++ * speedSliderValue);

        enableInteractibles(animationTimer + length);
    }

    function bubbleSort(){
        disableInteractibles();
        revertDefaultColor(newArray);

        let mainArray = newArray;
        const length = newArray.length;
        let animationTimer = 0;

        for(let i = 0; i < length - 1; i++){
            let sorted = true; //used to end algorithm if already sorted
            const arrayBars = document.getElementsByClassName('array-bar');
            for(let j = 0; j < length - 1; j++){
                const firstBar = arrayBars[j];
                const secondBar = arrayBars[j + 1];
                setTimeout(() => {
                    firstBar.style.backgroundColor = SORTING_COLOR; //color in bars being compared
                }, animationTimer++ * speedSliderValue);
                setTimeout(() => {
                    secondBar.style.backgroundColor = SORTING_COLOR;
                }, animationTimer++ * speedSliderValue);

                if(mainArray[j] > mainArray[j + 1]){ //if unsorted, swap bars
                    const firstBarHeight = mainArray[j + 1];
                    const secondBarHeight = mainArray[j];
                    sorted = false;
                    const temp = mainArray[j];
                    mainArray[j] = mainArray[j + 1];
                    mainArray[j + 1] = temp;
                    setTimeout(() => { //swap bar heights
                        firstBar.style.height = `${firstBarHeight / 10 - 20}vh`;
                        secondBar.style.height = `${secondBarHeight / 10 - 20}vh`;
                    }, animationTimer++ * speedSliderValue);
                }
                setTimeout(() => {
                    firstBar.style.backgroundColor = BAR_COLOR; //revert earlier bar to default color
                }, animationTimer * speedSliderValue);
            }
            setTimeout(() => {
                arrayBars[length - 1].style.backgroundColor = BAR_COLOR;
            }, animationTimer++ * speedSliderValue);

            if(sorted){ //if no swaps were made the sorting is complete
                break;
            }
        }
        setTimeout(() => {
            sortedColorChange(newArray);
            setNewArray(mainArray);
        }, animationTimer++ * speedSliderValue);
        enableInteractibles(animationTimer + length);
    }

    function heapSort(){
        disableInteractibles();
        revertDefaultColor(newArray);

        let mainArray = newArray.slice();
        const length = mainArray.length;
        let animationTimer = 0;

        for(let i = Math.floor(length / 2) - 1; i >= 0; i--){ //make array into a heap
            animationTimer = heapify(mainArray, length, i, animationTimer, speedSliderValue);
        }
        for(let i = length - 1; i > 0; i--){ //extract element from heap to be placed at end of array
            const arrayBars = document.getElementsByClassName('array-bar');
            const firstBar = arrayBars[0];
            const secondBar = arrayBars[i]
            const largestHeight = mainArray[0];
            const bottomRightHeight = mainArray[i];
            mainArray[0] = bottomRightHeight;
            mainArray[i] = largestHeight;

            setTimeout(() => { //color in bars to be swapped
                firstBar.style.backgroundColor = SORTING_COLOR;
            }, animationTimer++ * speedSliderValue);
            setTimeout(() => {
                secondBar.style.backgroundColor = SORTING_COLOR;
            }, animationTimer++ * speedSliderValue);

            setTimeout(() => { //swap bar heights
                firstBar.style.height = `${bottomRightHeight / 10 - 20}vh`;
                secondBar.style.height = `${largestHeight / 10 - 20}vh`;
            }, animationTimer++ * speedSliderValue);

            setTimeout(() => {
                firstBar.style.backgroundColor = BAR_COLOR;
                secondBar.style.backgroundColor = BAR_COLOR;
            }, animationTimer++ * speedSliderValue);

            animationTimer = heapify(mainArray, i, 0, animationTimer, speedSliderValue);
        }

        setTimeout(() => {
            sortedColorChange(newArray);
            setNewArray(mainArray);
        }, animationTimer++ * speedSliderValue);

        enableInteractibles(animationTimer + length);
    }

    function mergeSort(){
        disableInteractibles();
        revertDefaultColor(newArray);

        const animations = mergeSortAnimations(newArray);
        for(let i = 0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const colorChange = i % 3 !== 2;
            if(colorChange){
                const [firstBarIndex, secondBarIndex] = animations[i];
                const firstBar = arrayBars[firstBarIndex];
                const secondBar = arrayBars[secondBarIndex];
                const color = i % 3 === 0 ? SORTING_COLOR : BAR_COLOR;
                setTimeout(() => {
                    firstBar.style.backgroundColor = color;
                    secondBar.style.backgroundColor = color;
                }, i * speedSliderValue);
            }
            else{
                setTimeout(() => {
                    const[firstBarIndex, newHeight] = animations[i];
                    const firstBar = arrayBars[firstBarIndex];
                    firstBar.style.height = `${newHeight / 10 - 20}vh`;
                }, i * speedSliderValue);
            }
        }
        setTimeout(() => {
            sortedColorChange(newArray);
        }, animations.length * speedSliderValue);
        
        enableInteractibles(animations.length + newArray.length);
    }

    function quickSort(){
        disableInteractibles();
        revertDefaultColor(newArray);

        let mainArray = newArray.slice();
        const length = mainArray.length;
        let animationTimer = 0;
        animationTimer = quickSortHelper(mainArray, 0, length - 1, animationTimer, speedSliderValue);

        setTimeout(() => {
            sortedColorChange(newArray);
            setNewArray(mainArray);
        }, animationTimer++ * speedSliderValue);

        enableInteractibles(animationTimer + length);
    }

    const array = newArray;
    return (
        <>
        <div className="array-container">
            {array.map((value, index) => (
                <div 
                    className="array-bar"
                    key={index}
                    style={{height: `${value / 10 - 20}vh`, width: `${90 / barSliderValue}vw`}}>
                </div>
            ))}
        </div>
        <div className='buttons'>
            <button className="btn" onClick={sortedArray}>Generate Almost Sorted Array</button>
            <button className="btn" onClick={resetArray}>Generate Random Array</button>
            <button className="btn" onClick={selectionSort}>Selection Sort</button>
            <button className="btn" onClick={insertionSort}>Insertion Sort</button>
            <button className="btn" onClick={bubbleSort}>Bubble Sort</button>
            <button className="btn" onClick={heapSort}>Heapsort</button>
            <button className="btn" onClick={mergeSort}>Merge Sort</button>
            <button className="btn" onClick={quickSort}>Quicksort</button>
        </div> 
        {/* <RangeSlider {...barSliderProps} onChange={handleSliderChange} value={barSliderValue}></RangeSlider> */}
        <div className="slider-container">
            Number of Bars: {barSliderValue}
            <input 
                type="range"
                min="20" max="250" 
                value={barSliderValue} 
                className="slider" 
                id="bar-range" 
                step="10"
                onChange={e => {
                    setBarSliderValue(e.target.value);
                }}>
            </input>
            Animation Speed (ms): {speedSliderValue}
            <input 
                type="range" 
                min="1" 
                max="500" 
                value={speedSliderValue} 
                className="slider" 
                id="speed-range"
                onChange={e => {
                    setSpeedSliderValue(e.target.value);
                }}>
            </input>
        </div>
        </>
    )
}

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function revertDefaultColor(array){ //reverts color back to blue after showing green post-sort
    const arrayBars = document.getElementsByClassName('array-bar');
    for(let i = 0; i < array.length; i++){
        arrayBars[i].style.backgroundColor = BAR_COLOR;
    }
}