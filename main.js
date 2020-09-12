$(document).ready(function () {
    const puzzls = []



    getPuzzls()
    shuffle(puzzls)
    showPuzzl(puzzls)

    $('.left-place,.place').sortable({
        connectWith: '.place',
        containment: '.puzzle-container',
        forcePlaceholderSize: true,
        over : function(event, ui){
            console.log(event.target)
            if(event.target.children.length > 1){
                $(event.target).remov
//                ui.sortable('disable')
            } else{
                console.log('пусто')
            }  
        }
    })

    function showPuzzl(arr) {
        arr.forEach(p => {
            $('.left-box').append(p)
        })
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
    console.log(puzzls)







})
