const certPictures = (path) => {
    return new Promise(async resolve => {
        try {
            fetch(path)
                .then(function (response) {
                    return response.blob()
                }).then(function (myBlob) {
                let objectURL = URL.createObjectURL(myBlob)
                let divImg = document.createElement('div')
                let p = document.createElement('p')
                divImg.className = 'img'
                let img = document.createElement('img')
                img.className = 'img'
                img.src = objectURL
                img.alt = 'certificate'
                img.onload = function () {
                    p.appendChild(img)
                    divImg.appendChild(p)
                    resolve(divImg)
                }
            })
        } catch (e) { console.log('error upload', e) }
    })
}

const certText = () => {
    return new Promise(async resolve => {
        try {
            let txt = document['body'].querySelector('#input')
            txt = JSON.parse(txt.innerText)
            let str = []
            str.push(txt['certificate'])
            switch (txt['status']) {
                case 5:
                    str.push(`ДИПЛОМ`)
                    break
                case 6:
                    str.push(`ДИПЛОМ`)
                    break
                case 7:
                    str.push(`ДИПЛОМ`)
                    break
                default:
                    str.push(`СЕРТИФИКАТ`)
                    break
            }
            str.push(`Настоящий диплом подтверждает, что`)
            str.push(`${txt['fio2']} ${txt['fio1']}`)
            str.push(`ученик(ца) ${txt['class']} класса`)
            str.push(`${txt['school']}`)

            switch (txt['status']) {
                case 4:
                    str.push(`является участником второго этапа`)
                    break
                case 8:
                    str.push(`является участником финального этапа`)
                    break
                default:
                    str.push(`занял(а) ${txt['status2']} в`)
                    break
            }
            str.push(`Международной метапредметной олимпиаде`)
            str.push(`младших школьников`)
            str.push(`«Совенок-2019»`)
            let output = []
            output.push(str)
            output.push(txt)
            resolve(output)
        } catch (e) {
            console.log('error upload', e)
        }
        finally {
            let str = []
            str.push('нет входящего текста')

            resolve(str)
        }
    })
}

const createDocument = (obj, picture) => {
    return new Promise(async resolve => {
        try {
            let i = 0
            let div = document.createElement('div')
            for (let key in obj[0]) {
                let p = document.createElement('p')
                p.className = `a${i}`
                p.innerText = obj[0][key]
                switch (obj[1]['status']) {
                    case 4:
                        break
                    case 5:
                        if (i === 6) {
                            p.style.left = '43.3%'
                        }
                        break
                    case 6:
                        if (i === 6) {
                            p.style.left = '43.3%'
                        }
                        break
                    case 7:
                        if (i === 6) {
                            p.style.left = '44.3%;'
                        }
                        break
                    case 8:
                        if (i === 1) {
                            // console.assert(false,'8', p)
                            p.style.left = '36%'
                        }
                        break
                    default:
                        break
                }
                picture.appendChild(p)
                i++
            }
            resolve(picture)
        } catch (e) {

            console.warn('!!!', e)
            // err(e)
        }finally {
            resolve(picture)
        }
    })
}
export default {
    certPictures: certPictures,
    certText: certText,
    createDocument: createDocument
}
