'use strict'
const comments = document.querySelector('.comments')
comments.style.display = 'none'
const draw = document.querySelector('.draw')
draw.style.display = 'none'
const share = document.querySelector('.share')
share.style.display = 'none'
const newLoad = document.querySelector('.new')
newLoad.type = 'file'
const currentImage = document.querySelector('.current-image')
const commentsForm = document.querySelector('.comments__form')
currentImage.src = ''
commentsForm.style.display = 'none'
newLoad.addEventListener('click', () => {
    let input = document.createElement('input')
    input.type = 'file'
    // input.accept = 'image/jpeg, image/png'
    input.addEventListener('change', (event) => {
        let file = event.currentTarget.files[0]
        currentImage.src = URL.createObjectURL(file);
        currentImage.addEventListener('load', event => {
            URL.revokeObjectURL(event.target.src);
        });
    })
})
