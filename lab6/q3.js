function printNumbers(from, to){
    let count = from;
    const timerId = setInterval(()=>{
        if(count<=to){
            console.log(count++)
            
        }else if(count === to ){
            clearInterval(timerId);
        }
    }, 1000)
}

printNumbers(10, 20);