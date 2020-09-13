$(document).ready(function () {
    const puzzls = []

    getPuzzls()
    shuffle(puzzls)
    showPuzzl(puzzls)

    $('.left-place,.place').sortable({
        connectWith: '.place',
        containment: '.puzzle-container',
        forcePlaceholderSize: true,
        //        cancel : '.no_sort',
//        change: function (event, ui) {
//            $('.place').each(function (i, elem) {
//                console.log(elem.children.length)
//                if (!elem.children.length > 0) {
//                    $(elem).removeClass('no_sort')
//                }
//            })
//        },
        beforeStop: function (event, ui) {
            
                        console.log(event.toElement.parentElement.getAttribute('data-number'))
            console.log(event.toElement.parentElement)
            if (event.toElement.parentElement.classList.contains('no_sort')) {
                let oldPuzzl = event.toElement.parentElement.children[0]
                let index = findNear($('.right-box'), +event.toElement.parentElement.getAttribute('data-number'))
                $('.place').eq(index).addClass('no_sort')
                document.querySelector('.right-box').children[index].append(oldPuzzl)
                console.log(index)
                
            }
            event.target.classList.remove('no_sort')
            event.toElement.parentElement.classList.add('no_sort')
//            console.log('ooo')
        },
        stop: function (event, i){
//            console.log('yoyu')
        }
    })

    function showPuzzl(arr) {
        arr.forEach(p => {
            $('.left-box').append(p)
        })
    }

    function findNear(domArr, i) {
        let num = 17;
        let pos;
        domArr.children().each(function (index, elem) {
//            console.log(elem.classList.contains('no_sort'))
            if (!elem.classList.contains('no_sort')) {
                let temp = Math.abs(i - index);
                if (temp < num && temp != 0) {
                    num = temp
                    pos = index;
//                    console.log(num)
                }
            }

        })
        return pos;
    }

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    function getPuzzls() {
        let top = 0;
        let dataPosition = 0;
        for (let i = 0; i < 4; i++) {
            let left = 0;
            for (let j = 0; j < 4; j++) {
                let leftPlace = document.createElement('div')
                $(leftPlace).addClass('left-place');
                if (dataPosition == 0 || dataPosition == 3 || dataPosition == 1) {
                    puzzls.push(leftPlace)
                } else {
                    let puzzl = document.createElement('div')
                    $(puzzl).addClass('puzzl')
                    $(puzzl).attr('data-position', dataPosition)
                    $(puzzl).css({
                        backgroundPositionX: top + 'px',
                        backgroundPositionY: left + 'px'
                    })
                    leftPlace.append(puzzl)
                    puzzls.push(leftPlace)
                }
                left += 100;
                dataPosition++
            }
            top += 100
        }
    }
//    console.log(puzzls)
})
