'use strict'
const comments = document.querySelector('.comments')
const draw = document.querySelector('.draw')
const share = document.querySelector('.share')
const burger = document.querySelector('.burger')
const newLoad = document.querySelector('.new')
const currentImage = document.querySelector('.current-image')
const commentsForm = document.querySelector('.comments__form')
let error = document.querySelector('.error')
const xhr = new XMLHttpRequest()
const shareTools = document.querySelector('.share-tools')
const drawTools = document.querySelector('.draw-tools')

comments.style.display = 'none'
draw.style.display = 'none'
share.style.display = 'none'
burger.style.display = 'none'
newLoad.type = 'file'
currentImage.style.display = 'none'
commentsForm.style.display = 'none'

let xhrParse = null
let input = document.createElement('input')
input.type = 'file'
newLoad.addEventListener('click', () => {
    input.click()
    input.addEventListener('change', (event) => {
        let file = event.currentTarget.files[0]
        if ((file.type === 'image/jpeg') || (file.type === 'image/png')) {
            currentImage.src = URL.createObjectURL(file)
            currentImage.style.display = 'block'
            currentImage.addEventListener('load', (e) => {
                error.style.display = 'none'
                URL.revokeObjectURL(e.target.src)
            })
            let form = new FormData()
            form.append('title', file.name)
            form.append('image', file)
            xhr.addEventListener('loadstart', () => {
                currentImage.style.display = 'none'
                document.querySelector('.image-loader').style.display = 'inline-block'
            })
            xhr.addEventListener('load', (e) => {
                currentImage.style.display = 'block'
                document.querySelector('.image-loader').style.display = 'none'
                newLoad.style.display = 'none'
                share.style.display = 'inline-block'
                xhrParse = JSON.parse(xhr.responseText)
                shareTools.style.display = 'inline-block'
                burger.style.display = 'inline-block'
                shareTools.querySelector('.menu__url').value = xhrParse.url
                console.log(xhr.responseText)
            })
            xhr.open('POST', 'https://neto-api.herokuapp.com/pic')

            xhr.send(form)
        } else {
            error.style.display = 'block'
        }
    })
})

document.querySelector('.wrap').addEventListener('dragover', (event) => {
    event.preventDefault()
})

document.querySelector('.wrap').addEventListener('drop', (event) => {
    event.preventDefault()
    let file = Array.from(event.dataTransfer.files)
    if ((file[0].type === 'image/jpeg') || (file[0].type === 'image/png')) {
        if (currentImage.style.display === 'none') {
            error.style.display = 'none'
            currentImage.src = URL.createObjectURL(file[0])
            currentImage.style.display = 'block'
        } else {
            error.querySelector('p').textContent = 'Чтобы загрузить новое изображение, пожалуйста, воспользуйтесь пунктом <<Загрузить новое>> в меню.'
            error.style.display = 'block'
        }
    } else {
        error.style.display = 'block'
    }
})

let move = null
let shiftX = 0
let shiftY = 0

document.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('drag')) {
        move = event.target.parentNode
        const bounds = event.target.getBoundingClientRect();
        shiftX = event.pageX - bounds.left - window.pageXOffset;
        shiftY = event.pageY - bounds.top - window.pageYOffset;
    }
})

document.addEventListener('mousemove', (event) => {
    if (move) {
        event.preventDefault()
        let x = event.pageX - shiftX
        let y = event.pageY - shiftY
        let body = document.body
        let minX = body.offsetLeft
        let minY = body.offsetTop
        let maxX = body.offsetLeft + body.offsetWidth - move.offsetWidth - 1
        let maxY = body.offsetTop + body.offsetHeight - move.offsetHeight - 1
        x = Math.min(x, maxX)
        y = Math.min(y, maxY)
        x = Math.max(x, minX)
        y = Math.max(y, minY);
        move.style.left = `${x}px`
        move.style.top = `${y}px`
    }
})

document.addEventListener('mouseup', (event) => {
    if (move) {
        document.body.appendChild(move)
        move = null
    }
})

burger.addEventListener('click', (event) => {
    document.querySelectorAll('.menu__item').forEach(e => e.style.display = 'none')
    newLoad.style.display = 'inline-block'
    share.style.display = 'inline-block'
    draw.style.display = 'inline-block'
    comments.style.display = 'inline-block'
    document.querySelector('.drag').style.display = 'inline-block'
})
comments.addEventListener('click', (event) => {
    document.querySelectorAll('.menu__item').forEach(e => e.style.display = 'none')
    burger.style.display = 'inline-block'
    comments.style.display = 'inline-block'
    document.querySelector('.drag').style.display = 'inline-block'
    document.querySelector('.comments-tools').style.display = 'inline-block'
})
share.addEventListener('click', () => {
    document.querySelectorAll('.menu__item').forEach(e => e.style.display = 'none')
    burger.style.display = 'inline-block'
    share.style.display = 'inline-block'
    shareTools.style.display = 'inline-block'
    document.querySelector('.drag').style.display = 'inline-block'
})
draw.addEventListener('click', () => {
    document.querySelectorAll('.menu__item').forEach(e => e.style.display = 'none')
    burger.style.display = 'inline-block'
    document.querySelector('.drag').style.display = 'inline-block'
    draw.style.display = 'inline-block'
    drawTools.style.display = 'inline-block'
    drawing()
})
function drawing () {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    let div = document.querySelector('.app')
    canvas.style.position = 'relative'
    canvas.width = currentImage.clientWidth
    canvas.height = currentImage.clientHeight
    div.appendChild(canvas)
    document.addEventListener('mousedown', (event) => {
        if (drawTools.style.display === 'inline-block') {
            if (event.target === canvas) {
                ctx.beginPath();
                ctx.arc(event.offsetX, event.offsetY, 2, 0, 2 * Math.PI);
                ctx.fill()
            }
        }
    })
}
