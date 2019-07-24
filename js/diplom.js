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
let loading = false
const shareTools = document.querySelector('.share-tools')
const drawTools = document.querySelector('.draw-tools')
console.log(window.location.href.split('#')[1])
let code = null
let ws

// let ws = new WebSocket(`wss://neto-api.herokuapp.com/pic/null`)
// let timeWs = setInterval(function() {
    // ws.close()
    // ws = new WebSocket(`wss://neto-api.herokuapp.com/pic/${window.location.href.split('#')[1]}`)
    // console.log(code)

// }, 3000)
// setInterval(function() {
    // if (window.location.href.split('#')[1]) {
//         console.log(code, 'dasd')
//         clearInterval(timeWs)
//
//     }
// }, 1000)




let div = document.querySelector('.app')
let comment = commentsForm.querySelector('.comment')
let cloneComment = comment.cloneNode(true)
document.querySelector('.comments__body').removeChild(commentsForm.querySelector('.comment'))
document.querySelector('.comments__body').removeChild(commentsForm.querySelector('.comment'))
document.querySelector('.comments__body').removeChild(commentsForm.querySelector('.comment'))
let clone = commentsForm.cloneNode(true)

const delForm = div.removeChild(commentsForm)
comments.style.display = 'none'
draw.style.display = 'none'
share.style.display = 'none'
burger.style.display = 'none'
newLoad.type = 'file'
currentImage.style.display = 'none'
// commentsForm.style.display = 'none'

let xhrParse = null
let input = document.createElement('input')
input.type = 'file'
newLoad.addEventListener('click', () => {
    input.click()
    input.addEventListener('change', (event) => {
        let file = event.currentTarget.files[0]
        if ((file.type === 'image/jpeg') || (file.type === 'image/png')) {
            let form = new FormData()
            form.append('title', file.name)
            form.append('image', file)
            xhrLoad(form)
            currentImage.src = URL.createObjectURL(file)
            currentImage.style.display = 'block'
            currentImage.addEventListener('load', (e) => {
                error.style.display = 'none'
                URL.revokeObjectURL(e.target.src)
            })

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
            let form = new FormData()
            form.append('title', file[0].name)
            form.append('image', file[0])

            xhrLoad(form)
            error.style.display = 'none'
            currentImage.src = URL.createObjectURL(file[0])
            currentImage.style.display = 'block'

            // window.location.reload()
        } else {
            error.querySelector('p').textContent = 'Чтобы загрузить новое изображение, пожалуйста, воспользуйтесь пунктом <<Загрузить новое>> в меню.'
            error.style.display = 'block'
        }
    } else {
        error.style.display = 'block'
    }
})


function xhrLoad(form) {
    console.log('one')
    xhr.addEventListener('loadstart', () => {

        if (!loading) {
          currentImage.style.display = 'none'
          document.querySelector('.image-loader').style.display = 'inline-block'
        }
    })
    xhr.addEventListener('load', (e) => {
        currentImage.style.display = 'block'
        document.querySelector('.image-loader').style.display = 'none'
        newLoad.style.display = 'none'
        console.log('Alica')
        xhrParse = JSON.parse(xhr.responseText)

        if (!sessionStorage.web) {
            shareTools.style.display = 'inline-block'
            share.style.display = 'inline-block'
            comments.style.display = 'none'
        }
        sessionStorage.web = xhrParse.id

        burger.style.display = 'inline-block'
        draw.style.display = 'none'
        // location.hash = 'id1'
        window.location = `#${sessionStorage.web}`
        shareTools.querySelector('.menu__url').value = window.location.href
        canvas.width = currentImage.clientWidth
        canvas.height = currentImage.clientHeight
        canvas.style.marginTop = `-${canvas.height/2}px`
        img.height = canvas.height
        img.style.marginTop = `-${img.height/2}px`

        console.log('two')
        // ws.open()


        // wsLoad(sessionStorage.web)
        loading = true
    })
    xhr.open('POST', 'https://neto-api.herokuapp.com/pic')
    xhr.send(form)
}
// currentImage.addEventListener('load', ()=> {
//     console.log(sessionStorage.web)
//     ws = new WebSocket(`wss://neto-api.herokuapp.com/pic/${window.location.href.split('#')[1]}`)
// })
// function wsLoad(id) {
//
//     console.log('free')
//     if (!loading) {
//         // let ws = new WebSocket(`wss://neto-api.herokuapp.com/pic/${id}`)
//         ws.addEventListener('message', (event) => {
//             console.log('xaxa')
//             let info = JSON.parse(event.data)
//             console.log(info)
//             if (info.event === 'pic') {
//               if (info.pic.mask === undefined) {
//                 img.src = info.pic.url
//               } else {
//                   img.src = info.pic.mask
//               }
//             } else if (info.event === 'mask') {
//               img.src = info.url
//               // img.addEventListener('load', () => {
//               //     ctx.clearRect(0, 0, canvas.width, canvas.height)
//               // })
//             } else if (info.event === 'comment') {
//                 let form = null
//                 document.querySelectorAll('form').forEach((elem) => {
//                     if ((elem.offsetLeft === info.comment.left) && (elem.offsetTop === info.comment.top)) {
//                         form = elem
//                     }
//                 })
//                 if ((form === undefined) || (form === null)) {
//                     form = addForm(info.comment.left, info.comment.top)
//                 }
//                 let cloning = cloneComment.cloneNode(true)
//                 let data = new Date(info.comment.timestamp)
//                 form.querySelector('.comments__body').insertBefore(cloning, form.querySelector('textarea').previousElementSibling)
//                 cloning.querySelector('.comment__time').textContent = data.toLocaleString('ru')
//                 cloning.querySelector('.comment__message').textContent = info.comment.message
//
//
//             }
//
//         })
//     }
// }

if ((sessionStorage.web) || (window.location.href.split('#')[1])) {
    sessionStorage.web = window.location.href.split('#')[1]
    console.log(window.location.href.split('#')[1])
    console.log(sessionStorage.web)
    console.log('four')
    xhrGet()
}


function xhrGet() {
    console.log('five')
    let url = `https://neto-api.herokuapp.com/pic/${sessionStorage.web}`
    xhr.open('GET', url)
    xhr.addEventListener('load', () => {
        console.log('six')
        currentImage.src = JSON.parse(xhr.responseText).url
        currentImage.style.display = 'inline-block'
        comments.style.display = 'inline-block'
        document.querySelector('.comments-tools').style.display = 'inline-block'
        burger.style.display = 'inline-block'

        shareTools.querySelector('.menu__url').value = window.location.href
        newLoad.style.display = 'none'
        currentImage.addEventListener('load', () => {
          canvas.width = currentImage.clientWidth
          canvas.height = currentImage.clientHeight
          canvas.style.marginTop = `-${canvas.height/2}px`
          img.height = canvas.height
          img.style.marginTop = `-${img.height/2}px`
        })
        if (JSON.parse(xhr.responseText).comments) {
            console.log(JSON.parse(xhr.responseText).comments)
            let obj = JSON.parse(xhr.responseText).comments
            if (document.querySelectorAll('form').length === 0) {
                for (let elem in obj) {
                    let form = null
                    if (document.querySelectorAll('form').length === 0) {
                        form = addForm(obj[elem].left, obj[elem].top)
                        console.log('a')
                    } else {
                        let control = false
                        document.querySelectorAll('form').forEach(el => {
                            if ((obj[elem].left === el.offsetLeft) && (obj[elem].top === el.offsetTop)) {
                                form = el
                                control = true
                            }
                        })
                        if (!control) {
                            form = addForm(obj[elem].left, obj[elem].top)
                            console.log('b')
                        }
                    }
                    let cloning = cloneComment.cloneNode(true)
                    let data = new Date(obj[elem].timestamp)
                    console.log(form)
                    form.querySelector('.comments__body').insertBefore(cloning, form.querySelector('textarea').previousElementSibling)
                    cloning.querySelector('.comment__time').textContent = data.toLocaleString('ru')
                    cloning.querySelector('.comment__message').textContent = obj[elem].message
                }
            }
            // JSON.parse(xhr.responseText).comments.forEach(elem => {
            //
            // })

        }
    })
    xhr.send()
}

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
    canvas.style.pointerEvents = 'none'
})
comments.addEventListener('click', (event) => {
    document.querySelectorAll('.menu__item').forEach(e => e.style.display = 'none')
    burger.style.display = 'inline-block'
    comments.style.display = 'inline-block'
    document.querySelector('.drag').style.display = 'inline-block'
    document.querySelector('.comments-tools').style.display = 'inline-block'
    commentsForm.style.display = 'inline-block'
})
share.addEventListener('click', () => {
    document.querySelectorAll('.menu__item').forEach(e => e.style.display = 'none')
    burger.style.display = 'inline-block'
    share.style.display = 'inline-block'
    shareTools.style.display = 'inline-block'
    document.querySelector('.drag').style.display = 'inline-block'
})
let color = null
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
canvas.style.position = 'relative'


canvas.style.pointerEvents = 'none'
canvas.style.top = '50%'
// console.log(canvas.style.height/2)


let img = document.createElement('img')



div.appendChild(img)
img.style.pointerEvents = 'none'
img.style.position = 'absolute'
img.style.top = '50%'



div.appendChild(canvas)

draw.addEventListener('click', () => {
    document.querySelectorAll('.menu__item').forEach(e => e.style.display = 'none')
    burger.style.display = 'inline-block'
    document.querySelector('.drag').style.display = 'inline-block'
    draw.style.display = 'inline-block'
    drawTools.style.display = 'inline-block'
    let colors = document.querySelectorAll('.menu__color')
    canvas.style.pointerEvents = 'auto'
    colors.forEach(e => {
        if (e.checked) {
            color = e.value
        }
    })
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('menu__color')) {
            colors.forEach(e => {
                e.checked = false
            })
            event.target.checked = true
            color = event.target.value
        }
    })
    drawing()
})

let picaso = true
function drawing () {
    let moving = false
    let x = null
    let y = null
    document.addEventListener('mousedown', (event) => {
        if (drawTools.style.display === 'inline-block') {
            if (event.target === canvas) {
                picaso = false
                x = event.offsetX
                y = event.offsetY
                ctx.fillStyle = color
                ctx.beginPath();
                ctx.arc(event.offsetX, event.offsetY, 2, 0, 2 * Math.PI);
                ctx.fill()
                moving = true
            } else {
                moving = false

            }
        }
    })
    document.addEventListener('mousemove', (event) => {
        if (moving) {
            if (event.target === canvas) {
                ctx.lineWidth = 4
                ctx.strokeStyle = color
                ctx.beginPath()
                ctx.moveTo(x, y)
                ctx.lineTo(event.offsetX, event.offsetY);
                ctx.stroke();
                ctx.closePath();
                x = event.offsetX
                y = event.offsetY
            }
        }
    })
    document.addEventListener('mouseup', (event) => {
      if (moving) {
        picaso = true
        moving = false
        canvas.toBlob(obj => ws.send(obj))
      }
    })
}

let marker = true
function connect() {
    ws = new WebSocket(`wss://neto-api.herokuapp.com/pic/${window.location.href.split('#')[1]}`)
    ws.addEventListener('open', event => {
        console.log('open');

    });
    ws.addEventListener('close', event => {
        console.log(event.code);
        console.log('close')
        setTimeout(function() {
            connect();
        }, 1000);
    });
    ws.addEventListener('message', (event) => {
        console.log('seven')
        let info = JSON.parse(event.data)
        console.log(info)
        if (info.event === 'pic') {
          if (info.pic.mask === undefined) {
            img.src = info.pic.url
          } else {
              img.src = info.pic.mask
          }
        } else if (info.event === 'mask') {
          img.src = info.url
          // img.addEventListener('load', () => {
          //     ctx.clearRect(0, 0, canvas.width, canvas.height)
          // })
        } else if (info.event === 'comment') {
            let form = null
            console.log(document.querySelectorAll('form'))
            document.querySelectorAll('form').forEach((elem) => {
                if ((elem.offsetLeft === info.comment.left) && (elem.offsetTop === info.comment.top)) {
                    form = elem
                }
            })
            if ((form === undefined) || (form === null)) {
                form = addForm(info.comment.left, info.comment.top)
            }
            let cloning = cloneComment.cloneNode(true)
            let data = new Date(info.comment.timestamp)
            console.log(form)
            form.querySelector('.comments__body').insertBefore(cloning, form.querySelector('textarea').previousElementSibling)
            cloning.querySelector('.comment__time').textContent = data.toLocaleString('ru')
            cloning.querySelector('.comment__message').textContent = info.comment.message


        }
    })
}
connect()
// function connection(event) {
//         console.log('seven')
//         let info = JSON.parse(event.data)
//         console.log(info)
//         if (info.event === 'pic') {
//           if (info.pic.mask === undefined) {
//             img.src = info.pic.url
//           } else {
//               img.src = info.pic.mask
//           }
//         } else if (info.event === 'mask') {
//           img.src = info.url
//           // img.addEventListener('load', () => {
//           //     ctx.clearRect(0, 0, canvas.width, canvas.height)
//           // })
//         } else if (info.event === 'comment') {
//             let form = null
//             console.log(document.querySelectorAll('form'))
//             document.querySelectorAll('form').forEach((elem) => {
//                 if ((elem.offsetLeft === info.comment.left) && (elem.offsetTop === info.comment.top)) {
//                     form = elem
//                 }
//             })
//             if ((form === undefined) || (form === null)) {
//                 form = addForm(info.comment.left, info.comment.top)
//             }
//             let cloning = cloneComment.cloneNode(true)
//             let data = new Date(info.comment.timestamp)
//             console.log(form)
//             form.querySelector('.comments__body').insertBefore(cloning, form.querySelector('textarea').previousElementSibling)
//             cloning.querySelector('.comment__time').textContent = data.toLocaleString('ru')
//             cloning.querySelector('.comment__message').textContent = info.comment.message
//
//
//         }
//
// }


document.addEventListener('click', (event) => {
    if (event.target.classList.contains('menu_copy')) {
        // document.querySelector('.menu__url').focus()
        document.querySelector('.menu__url').select()
        try {
            document.execCommand('copy')

        }
        catch(err) {
            console.log(err)
        }
    }
    if (event.target.classList.contains('menu__toggle')) {
        if (event.target.value === 'on') {
            marker = true
            document.querySelectorAll('.comments__form').forEach((e) => {
                e.style.display = 'inline-block'

            })
        } else if (event.target.value === 'off') {
            marker = false
            document.querySelectorAll('.comments__form').forEach((e) => {
                e.style.display = 'none'
            })
        }
    }
})



document.addEventListener('click', (event) => {
    if (picaso) {
        if (event.target === currentImage) {
            addForm(event.pageX, event.pageY)
        }
    }
    if (event.target.classList.contains('comments__marker-checkbox')) {
        document.querySelectorAll('.comments__marker-checkbox').forEach(e => {
            e.checked = false
            e.parentNode.style.zIndex = 1
            // e.previousElementSibling.style.position = 'absolute'
            // e.style.position = 'absolute'
        })
        event.target.checked = true
        event.target.parentNode.style.zIndex = 200

        // event.target.nextElementSibling.style.position = 'absolute'
    }
    if (event.target.classList.contains('comments__close')) {
        event.target.parentNode.previousElementSibling.checked = false
    }
    if (event.target.classList.contains('comments__submit')) {
        event.preventDefault()
        let textarea = event.target.previousElementSibling.previousElementSibling
        if (textarea.value === '') {
            console.log('пусто')
        } else {
            xhr.open('POST', `https://neto-api.herokuapp.com/pic/${sessionStorage.web}/comments`)
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
            xhr.addEventListener('loadstart', () => {
                event.target.parentNode.querySelector('.comment .loader').style.display = 'block'
            })
            xhr.addEventListener('load', () => {
                console.log('eith')
                event.target.parentNode.querySelector('.comment .loader').style.display = 'none'
            })
            let forma = 'message=' + textarea.value + '&left=' + event.target.parentNode.parentNode.style.left.replace('px', '') + '&top=' + event.target.parentNode.parentNode.style.top.replace('px', '')
            textarea.value = ''
            xhr.send(forma)
        }
    }
})
console.log(window.location.href)
function addForm(x, y) {
    console.log('nine')
    let clones = clone.cloneNode(true)
    div.appendChild(clones)
    clones.style.left = `${x}px`
    clones.style.top = `${y}px`
    clones.querySelector('.comment .loader').style.display = 'none'
    document.querySelectorAll('.comments__marker-checkbox').forEach((e)=>e.checked = false)
    clones.querySelector('.comments__marker-checkbox').checked = true
    if (!marker) {
        clones.style.display = 'none'
    } else {
        clones.style.display = 'inline-block'
    }
    return clones
}
// document.addEventListener('click', (event) => {
//   if (event.target.classList.contains('comments__submit')) {
//     let value = document.querySelector('.comments__input').value
    // xhr.open('POST', `https://neto-api.herokuapp.com/pic/${sessionStorage.web}/comments`)
//     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
//     xhr.addEventListener('loadstart', () => {
//       clones.querySelector('.comment .loader').style.display = 'inline-block'
//     })
//     xhr.addEventListener('load', () => {
//       clones.querySelector('.comment .loader').style.display = 'none'
//     })
//   }
// })

// document.addEventListener('click', (event) => {
//
//
// })
