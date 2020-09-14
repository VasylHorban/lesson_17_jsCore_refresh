$(document).ready(function () {
    let puzzls = []
    const winComb = [12, 8, 4, 15, 11, 7, 2, 14, 10, 6, 13, 9, 5]
    let showTime = false;
    generPlace()
    getPuzzls()
    puzzls = shuffle(puzzls)
    showPuzzl(puzzls)
    sortable();
    
    $('#new-game').click(function(){
        puzzls = []
        generPlace()
        getPuzzls(puzzls)
        shuffle(puzzls)        
        showPuzzl(puzzls)
        sortable()
        timerModule.refresh();
    })
    $('#check').click(function () {
        showTime = true
        checkResult()
        windowModule.innerText(0)
        windowModule.show()
        
    })
    
    
    function checkResult(){
        let win = true;
        let i = 0;
        $('.place').each(function (index, elem) {
            if (index == 0 || index == 4 || index == 12) {
                console.log('f')
            } else {
                if (elem.children.length == 0) {
                    win = false;

                }
                let pv = $(elem.children[0]).attr('data-position')
                if (pv != winComb[i]) {
                    win = false
                    
                }
                i++
            }
        })
        return win
    }
    
    
    
    const windowModule = (function(){
        let outHtml;
        let bg;
        const innterHtml = [
            ["You still have time, are you sure?", "<button class='btn close'>close</button><button class='btn check'>check</button>"]
        ] 
        
        function html(){
            outHtml = $('.modal-window')
            bg = $('.dark-container')
        }
        function show(){
            $(outHtml).show();
            $(bg).css({
                zIndex : 50,
                backgroundColor : 'rgba(60, 51, 51, 0.65)'
            })
        }
        function hide(){
            $(outHtml).hide();
            $(bg).css({
                zIndex : -1,
                backgroundColor : '#fff'
            })
        }
        function innerText(i, time){
            $(outHtml).children().eq(0).html(innterHtml[i][0])
            
            if(time != undefined){
                $(outHtml).children().eq(1).html(time)
            }
            $(outHtml).children().eq(2).html(innterHtml[i][1])
        }
        function init(){
            html()
        }
        return {
            init : init,
            hide : hide,
            innerText : innerText,
            show : show,
            window : outHtml
        }
        
    })();
    
    windowModule.init();
    const timerModule = (function(){
        let outHtml;
        let mm = 1;
        let ss = 0;
        let timer;
        function html(){
            outHtml = $('.timer');
            $('#start').click(function(){
                run()
            })
        }
        function stop(){
            clearTimeout(timer)
        }
        function refresh(){
            mm = 1;
            ss = 0;
            clearTimeout(timer)
            $(outHtml).eq(0).text('01')
            $(outHtml).eq(1).text('00')
        }
        function run(){
            let out = [];
            ss = ss - 1
            if(ss == -1){
                ss = 59
                mm = mm - 1
            }
            if(ss < 10) out.push(`0${ss}`)
            else out.push(ss)
            if(mm < 10) out.push(`0${mm}`)
            else out. push(mm)
            
            $(outHtml).html(`<span>${out[1]}</span>:<span>${out[0]}</span>`)
            if(showTime){
                windowModule.innerText(0, `<span>${out[1]}</span>:<span>${out[0]}</span>`)
            }
            if(mm >= 0 && ss >= 1){
               timer = setTimeout(run, 1000)
            }
            
        }
        function init(){
            html();
        }
        
        return {
            init: init,
            run : run,
            refresh : refresh
        }
    })();
    timerModule.init()
    $('#start').click(function(){
        
    })
    
    function sortable(){    $('.left-place,.place').sortable({
        connectWith: '.place',
        containment: '.puzzle-container',
        forcePlaceholderSize: true,
        beforeStop: function (event, ui) {

            console.log(event.toElement.parentElement.getAttribute('data-number'))
            console.log(event.toElement.parentElement)
            if (event.toElement.parentElement.classList.contains('no_sort')) {
                let oldPuzzl = event.toElement.parentElement.children[0]
                let index = findNear($('.right-box'), +event.toElement.parentElement.getAttribute('data-number'))
                $('.place').eq(index).addClass('no_sort')
                console.log($('.place').eq(index))
                document.querySelector('.right-box').children[index].append(oldPuzzl)

            }
            event.target.classList.remove('no_sort')
            event.toElement.parentElement.classList.add('no_sort')
        }
    })
    }

    function showPuzzl(arr) {
        $('.left-box').html('')
        arr.forEach(p => {
            $('.left-box').append(p)
        })
    }

    function findNear(domArr, i) {
        let num = 17;
        let pos;
        domArr.children().each(function (index, elem) {
            if (!elem.classList.contains('no_sort')) {
                let temp = Math.abs(i - index);
                if (temp < num && temp != 0) {
                    num = temp
                    pos = index;
                }
            }

        })
        return pos;
    }

    function shuffle(array) {
       return array.sort(() => Math.random() - 0.5);
    }

    function generPlace() {
        $('.right-box').html('')
        let index = 0
        for (let i = 0; i < 16; i++) {
            let rightPlace = document.createElement('div');
            $(rightPlace).addClass('place');
            $(rightPlace).attr('data-number', i);
            $('.right-box').append(rightPlace)
        }
    }

    function getPuzzls() {
        let top = 0;
        let dataPosition = 0;
        for (let i = 0; i < 4; i++) {
            let left = 0;
            for (let j = 0; j < 4; j++) {
                let leftPlace = document.createElement('div')
                $(leftPlace).addClass('left-place');
                if (dataPosition == 0 || dataPosition == 1 || dataPosition == 3) {
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
})
