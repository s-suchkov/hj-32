'use strict'
const comments = document.querySelector('.comments')
comments.style.display = 'none'
const draw = document.querySelector('.draw')
draw.style.display = 'none'
const share = document.querySelector('.share')
share.style.display = 'none'
const newLoad = document.querySelector('.new')
newLoad.type = 'file'
newLoad.accept = 'image/jpeg, image/png'
newLoad.addEventListener('change', (event) => {
    let file = event.currentTarget.files
    console.log(file)
})
