
console.log('Client side JS file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})

fetch('/weather?address=India').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
        }else{
            console.log(data.location);
            console.log(data.forecast);
        }
        
    })
})

const weatherform = document.querySelector('form')
const search =document.querySelector('input')
const MessageOne =document.querySelector('#msg1')
const MessageTwo =document.querySelector('#msg2')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault() // to prevent the browser's default behaviour of page reload on submitting a form
    const location =search.value

    MessageOne.textContent='Loading...'
    MessageTwo.textContent= ''

    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                // console.log(data.error)
                MessageOne.textContent=data.error
            }else{
                // console.log(data.location)
                // console.log(data.forecast)
                MessageOne.textContent= data.location
                MessageTwo.textContent= data.forecast
            }
        })
    }) 

})