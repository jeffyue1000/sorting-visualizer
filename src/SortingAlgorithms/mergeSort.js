export default function mergeSortAnimations(array){
    const animations = [];
    if(array.length <= 1){
        return array;
    }
    const auxArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxArray, animations);
    return animations;
}

function mergeSortHelper(mainArray, start, end, auxArray, animations){ //performs the merge sort
    if(start === end){
        return;
    }
    const middle = Math.floor(start + (end - start) / 2);
    mergeSortHelper(auxArray, start, middle, mainArray, animations);
    mergeSortHelper(auxArray, middle + 1, end, mainArray, animations);
    merge(mainArray, start, middle, end, auxArray, animations);
}

function merge(mainArray, start, middle, end, auxArray, animations){
    let i = start, k = start, j = middle + 1;
    while(i <= middle && j <= end){
        animations.push([i, j]); //animations tracks pairs of vales being examined to be colored in
        animations.push([i, j]);
        if(auxArray[i] <= auxArray[j]){
            animations.push([k, auxArray[i]]); //track value of sorted value
            mainArray[k++] = auxArray[i++];
        }
        else{
            animations.push([k, auxArray[j]]);
            mainArray[k++] = auxArray[j++];
        }
    }
    while(i <= middle){ //merge rest of array if necessary
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxArray[i]]);
        mainArray[k++] = auxArray[i++];
    }
    while(j <= end){ //merge rest of array if necessary
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxArray[j]]);
        mainArray[k++] = auxArray[j++];
    }
}
