$(document).ready(function () {
    const puzzls = []
    
    
    
    getPuzzls()
    shuffle(puzzls)
    showPuzzl(puzzls)
    
    $('.left-box').sortable({
        connectWith : '.right-box'
    })
    
    function showPuzzl(arr){
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
                let puzzl = document.createElement('div')
                $(puzzl).addClass('puzzl')
                $(puzzl).attr('data-position', dataPosition)
                $(puzzl).css({
                    backgroundPositionX: top + 'px',
                    backgroundPositionY: left + 'px'
                })
                puzzls.push(puzzl)
                left += 100;
                dataPosition++
            }
            top += 100
        }
    }
    console.log(puzzls)







})
