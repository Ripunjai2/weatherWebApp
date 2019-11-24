const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const messageOne=document.querySelector('#message-1');
const messageTwo=document.querySelector('#message-2');

// if(data.errror){
// messageOne.textContent=data.error
// messageTwo.textContent=''
// }else{
//     messageOne.textContent=data.location
//     messageTwo.textContent=data.weather_report;
// }


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    locate=search.value
    // console.log(locate);

    fetch('http://localhost:3000/weather?address='+locate).then((response)=>{
        response.json().then((data)=>{
            // if(data.error){
            //     console.log(data.error)
            // }else{
            //     console.log(data.weather_report);
            //     console.log(data.location)
            //             }

                        if(data.error){
                            messageOne.textContent=data.error
                            messageTwo.textContent=''
                            }else{
                                messageOne.textContent=data.location
                                messageTwo.textContent=data.weather_report;
                            }
                                 
        })
    })


})



// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })
