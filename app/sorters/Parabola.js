function parabola(arr){
    let sorted = arr.sort((a, b) => {
        return a.dance - b.dance
    })

    console.log(sorted)
    const length = sorted.length

    const midpoint = Math.ceil(length / 2)

    let parabola=[]

    parabola[midpoint] = sorted[length - 1]

    let i = length - 1                  //start the index at the end of the array and therefore the largest value

    let downcounter = midpoint - 1
    let upcounter = midpoint + 1
    while(i > 0 && downcounter > -1){
        i--
        parabola[downcounter] = sorted[i]
        i--
        if(sorted[i]){
            parabola[upcounter] = sorted[i]
        }   
        upcounter++
        downcounter--

    }
    console.log(parabola)

    return parabola

}

export default parabola