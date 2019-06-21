'use strict'
const comments = document.querySelector('.comments')
comments.style.display = 'none'
const draw = document.querySelector('.draw')
draw.style.display = 'none'
const share = document.querySelector('.share')
share.style.display = 'none'
const new = document.querySelector('.new')
new.addEventListener('change', (event) => {
    let file = event.currentTarget.files
    console.log(file)
})
