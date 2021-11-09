function PagePortfolio(){
	$('.page_portfolio').css('opacity','1')
	$('.page_portfolio').css('clip-path','polygon(0 100%, 100% 100%, 100% 0%, 0 0%)')
	$('.logo img, .portfolio_home__title h1, .portfolio_home__title hr, .portfolio_home__title img.trigger').addClass('out')
	$('.slider_inner').addClass('in')
	$('footer small').addClass('show')
	$('.logoMain').addClass('show')
	$('.number').addClass('show')
	$('.menu').addClass('show')
	$('.slider_note').addClass('show')
	setTimeout(function(){
			$('.slider_inner').click()
	},2500)
}

$('.trigger').on('click', function(event) {
    // event.preventDefault();
    PagePortfolio()
})



introComplete = false

setTimeout(function(){
    introComplete = true
},2500)



var ifPopupShow = false
$('.button').click(function(){
	$(this).parent().addClass('clicked')
	$(this).parent().removeClass('hovering')
	$(this).parent().parent().parent().addClass('clicked')
	$('.portfolio_home__work').addClass('expand')
})

$('.open-popup').click(function(e){
	$(this).closest('.slideClone').children('.popup').addClass('target')
	$(this).closest('.slideClone').children('.popup').addClass('touch')
	$(this).closest('.slideClone').children().children().removeClass('out').addClass('in')
	$(this).closest('.slideClone').children('.popup .popup__container').removeClass('out').addClass('in')
	ifPopupShow = true
})

$('.popup__close').click(function(e){
	e.preventDefault()
	$(this).parent().parent('.popup').removeClass('touch')
	$(this).parent().parent('.popup').children('.before-popup, .after-popup, .popup__container').removeClass('in').addClass('out')
	$(this).parent().parent('.popup').children('.before-popup, .after-popup, .popup__container').delay(1000).animate({scrollTop: 0},10)
	$(this).parent().addClass('out')
	ifPopupShow = false
})



$(function() {
var hover_off = false;
var hover_count = 10;

$(".image").mouseover(function() {
    hover_off = false;
    $(this).addClass('hovering');
});

$(".image").mouseout(function() {
    hover_off = true;
    setTimeout(myMouseOut, hover_count);
});

$('.button').mouseover(function(e){
    e.stopPropagation()
    hover_off = true;
    setTimeout(myMouseOut, hover_count);
});

function myMouseOut() {
    if (hover_off) {
        $(".image").removeClass('hovering');
    }
	}
});




$(window).resize(function(){
	$('.slider_inner').css('left', ($(document).width() / 2) - ($('.slider_inner__slide').width() / 2))
})
$('.slider_inner').css('left', ($(document).width() / 2) - ($('.slider_inner__slide').width() / 2))

var dragging = false
var endPosition = 0
var threshold = 100

$('.slider_inner').click(function(){
	$('.slider_inner__slide').css('animation', 'none')
	$('.slider_inner__slide').css('transform', 'rotateY(0deg) scale(1)')
})


var initX
var difference
var position
var index = 1
$('.slider_inner').mousedown(function(e){
	initX = e.clientX
	dragging = true
	// cursor.style.transition = `transform 0s 0s`
})


$('.slider_inner').mousemove(function(e){
	if(dragging){
			let mouseX = e.clientX
			difference = mouseX - initX
			position = parseInt($('.slider_inner').css('transform').split(',')[4])
			$('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .overlay, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .title, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .cats, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .button').css('opacity', 1 -Math.abs(difference / 200))

			$('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .overlay, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .title, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .cats, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .button').css('transition', 'all .2s')

			$('.slider_inner').css('transform', `translateX(${difference + endPosition}px) translateY(-50%)`)
	}
	})



	var offset = 760;
	var margin = 0;
	var slideNums = $('.slider_inner__slide').length
	$('.slider_inner').mouseup(function(){
	// cursor.style.transition = `transform ${cursorSettings.transitionTime} ${cursorSettings.transitionEase} , width ${cursorSettings.expandSpeed}s .2s, height ${cursorSettings.expandSpeed}s .2s, opacity 1s .2s` 
	// endPosition = parseInt($('.slider_inner').css('transform').split(',')[4]);
	//瀏覽器根據您應用的轉換將transform值轉換為2d或3d轉換為矩陣
	//3d如果您應用3D變換（X，Y，Z軸），則瀏覽器將創建矩陣。
	//2d如果您應用2D變換（僅X，Y軸），瀏覽器將創建矩陣。
	//2D矩陣 2d矩陣具有6值  第五值是 translateX/第六值是 translateY 如下
	//matric(1,0,0,1,10,20)

	if(difference < -160){
			if(index < (slideNums - 1 )){
					index++
					var threshold = offset - ((offset + margin) * index)
					$('.slider_inner').css('transform',`translateX(${threshold}px) translateY(-50%)`)
					endPosition = threshold
			} else {
					var threshold = offset - ((offset + margin) * index)
					$('.slider_inner').css('transform',`translateX(${threshold}px) translateY(-50%)`)
					endPosition = threshold
			}
	} else {
			if(difference > 160) {
					if(index > 0) {
							index--;
							var threshold = offset - ((offset + margin) * index);
							$('.slider_inner').css('transform', `translateX(${threshold}px) translateY(-50%)`);
							endPosition = threshold;

					} else {
							var threshold = offset - ((offset + margin) * index);
							$('.slider_inner').css('transform', `translateX(${threshold}px) translateY(-50%)`);
							endPosition = threshold; 

					}

			} else {
					var threshold = offset - ((offset + margin) * index);
					$('.slider_inner').css('transform', `translateX(${threshold}px) translateY(-50%)`);
					endPosition = threshold;

			}
	}

	if(index == slideNums - 2){
			$('.slider_contact__slide .big_contact').addClass('show')
			setTimeout(() => {
					$('.slider_contact__slide .big_contact').css({'animation' : 'none'})
					$('.slider_contact__slide .big_contact').css({'clip-path' : 'none'})
			}, 1550);
	}

	if(index == slideNums - 1){
			$('.page_portfolio_work .tv-noise').css('background', `repeating-linear-gradient(transparent, transparent 50%, transparent 50%, transparent)`);
			$('.page_portfolio_work .tv-noise').css('backgroundColor', `#fed94d`);
			$('.page_portfolio_work .tv-noise').css('backgroundSize', `5px 5px`);
	} else {
			$('.page_portfolio_work .tv-noise').css('background', `repeating-linear-gradient(#fff, #fff 50%, #f0f0f0 50%, #f0f0f0)`);
			$('.page_portfolio_work .tv-noise').css('backgroundColor', `transparent`);
			$('.page_portfolio_work .tv-noise').css('backgroundSize', `5px 5px`);
	}

	dragging = false
	$('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .overlay, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .title, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .cats, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .button').css('opacity', 1)
	$('.slider_inner__slide').css('transform', 'rotateY(0deg) scale(1)')
	if ($(window).width() > 767) {
		$('.slideClone').hide()
	$('.slideClone:nth-of-type('  + parseInt(index + 2) +  ')').show()
	}

	difference = 0

})



function drawMouseSpeedDemo(){
var mrefreshinterval = 30
var lastmousex=-1
var lastmousey=-1
var lastmousetime
var mousetravel = 0
var direction

$('html').mousemove(function(e){
    var mousex = e.pageX
    var mousey = e.pageY
    if(lastmousex > -1){
        mousetravel += Math.max(Math.abs(mousex-lastmousex),Math.abs(mousey-lastmousey))
    }

    if(mousex-lastmousex > 0) {
        direction = '+'
    } else {
        direction = '-'
    }

    lastmousex = mousex
    lastmousey = mousey
})

var mdraw = function() {
    var md = new Date();
    var timenow = md.getTime();
    if (lastmousetime!=timenow) {
        var pps = Math.round(mousetravel / (timenow - lastmousetime) * 1000);
        mousetravel = 0;
        if(dragging) {
            let velocity = .5 - (pps / 40000);
            $('.slider_inner__slide').css('transform', 'rotateY(' + direction + pps / 110 + 'deg) scale(1)')
            $('.slider_inner__slide').css('transition', 'all ' + velocity + 's');
        }

    }
    lastmousetime = timenow;
}
setInterval(mdraw, mrefreshinterval);
}
drawMouseSpeedDemo()




var cursorSettings = {
// class : 'dynamicCursor',
size : '28',
expandedSize : '40',
expandSpeed : 0.4,
// background : 'rgba(255, 255, 255, 1)',
background : `url("data:image/svg+xml,%3Csvg width='47' height='47' viewBox='0 0 47 47' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M42.4202 42.4202C38.8403 46 33.3594 46 23.5 46C13.6406 46 8.15966 46 4.57983 42.4202C1 38.8403 1 33.3594 1 23.5C1 13.6406 1 8.15966 4.57983 4.57983C8.15966 1 13.6406 1 23.5 1C33.3594 1 38.8403 1 42.4202 4.57983C46 8.15966 46 13.6406 46 23.5C46 33.3594 46 38.8403 42.4202 42.4202Z' stroke='rgba(35,44,58,0.7)'/%3E%3C/svg%3E%0A")`,
opacity : '1',
transitionTime : '1.4s',
transitionEase : 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
borderWidth : '0',
borderColor : 'black',
iconSize: '8px',
iconColor: '#232c3a',
triggerElements: {
    trigger : {
        className : 'trigger',
        icon : '<i class="las la-dot-circle"></i>'
    },
    trigger2 : {
        className : 'slider_inner',
        icon : '<i class="fa fa-arrows-h"></i>'
    }
}
}


$('body').append('<div class="dynamicCursor"><div class="cursorIcon"></div></div>')
function dynamicCursor(options) {
$(document.body).append('<link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css">')

var hold

$('.cursorIcon').css({position:"absolute"})
$('.cursorIcon').css({fontFamily:'Raleway'})
$('.cursorIcon').css({textTransform:'uppercase'})
$('.cursorIcon').css({fontWeight:'800'})
$('.cursorIcon').css({textAlign: 'center'})
$('.cursorIcon').css({top: '50%'})
$('.cursorIcon').css({width: '23px'})
$('.cursorIcon').css({height: '23px'})
$('.cursorIcon').css({transform: 'translate(-50%,-50%)'})
$('.cursorIcon').css({left: '50%'})
$('.cursorIcon').css({color: options.iconColor})
$('.cursorIcon').css({fontSize: options.iconSize})
$('.cursorIcon').css({lineHeight: '23px'})
$('.cursorIcon').css({opacity: 0})
$('.cursorIcon').css({transition: `opacity ${options.expandSpeed}s`})
$('.cursorIcon').css({background: 'white'})
$('.cursorIcon').css({mixBlendMode: 'difference'})
$('.cursorIcon').css({borderRadius: '100%'})


$('.dynamicCursor').css({boxSizing: 'border-box'})
$('.dynamicCursor').css({width: `${options.size}px`})
$('.dynamicCursor').css({height: `${options.size}px`})
$('.dynamicCursor').css({opacity: 0})
$('.dynamicCursor').css({pointerEvents: 'none'})
$('.dynamicCursor').css({zIndex: 999})
$('.dynamicCursor').css({transition: `transform ${options.transitionTime} ${options.transitionEase}, width ${options.expandSpeed}s .2s, height ${options.expandSpeed}s .2s, opacity 1s .2s`})
$('.dynamicCursor').css({border: `${options.borderWidth}px solid ${options.borderColor}`})
$('.dynamicCursor').css({position: 'fixed'})
$('.dynamicCursor').css({backgroundImage: options.background})
$('.dynamicCursor').css({backgroundSize: 'cover'})
$('.dynamicCursor').css({mixBlendMode: 'difference'})


setTimeout(function() {
    $('.dynamicCursor').css({opacity: options.opacity})
}, 500)

var idle

$(document).mousemove((e)=>{
    var x = e.pageX
    var y = e.pageY
    // console.log('test')

    $('.dynamicCursor').css({opacity: options.opacity})
    clearInterval(idle)
    idle = setTimeout(() => {
        $('.dynamicCursor').css({opacity: 0})
    }, 4000);

    $('.dynamicCursor').css({top: 0})
    $('.dynamicCursor').css({left: 0})
    $('.dynamicCursor').css({transform: `translateX(calc(${x}px - 50%)) translateY(calc(${y}px - 50%))`})
})

for(i in options.triggerElements){
    let trigger = $(`.${options.triggerElements[i].className}`)
    let icon = options.triggerElements[i].icon
    if(!trigger){
        console.log('You dont have any triggers')
    } else {
        trigger.each(function(el){
            trigger.css({cursor: 'default'});
            // trigger.css({position: 'absolute'});
            // trigger.css({zIndex: 1});
            trigger[el].addEventListener('mouseover',()=>{
                // console.log('over')
                $('.dynamicCursor').css({width: `${options.expandedSize}px`})
                $('.dynamicCursor').css({height: `${options.expandedSize}px`})
                $('.cursorIcon').html(icon)
                $('.cursorIcon').css({opacity: 1})
            })
            trigger[el].addEventListener('mouseout',()=>{
                // console.log('over')
                $('.dynamicCursor').css({width: `${options.size}px`})
                $('.dynamicCursor').css({height: `${options.size}px`})
                $('.cursorIcon').css({opacity: 0})
            })
        })
    }
}
}

dynamicCursor(cursorSettings)


$('.back').click(function(){
$(".popup .in").removeClass('in').addClass('out')
$(".touch" ).removeClass('touch')
$('.popup__container').delay(1000).animate({scrollTop: 0},10)
let _this = this
if(ifPopupShow == true){
	setTimeout(function(){
		$(_this).parent().parent().removeClass('expand')
	},1300)
}else{
		$(_this).parent().parent().removeClass('expand')
	}
})






var slideCloneObj = document.querySelectorAll(".slideClone")
var slideinnerObj = document.querySelectorAll(".slider_inner__slide")
const MobileWheel = () => {
$('.portfolio_home__slider').on('mousewheel scroll touchmove', function (e) {
const siderH = $('.portfolio_home__slider').height() / 2
	$('.slider_inner__slide').each(function(ind,element){
			const _this = $(this)
			const offtop = _this.offset().top
			const offBottom = offtop +  _this.outerHeight();
			// console.log(offtop + " top")
			// console.log(offBottom + " bottom")
			if(offtop <= siderH && offBottom >= siderH){
					_this.children().children('.overlay, .cats, .title, .button').css("opacity" , 1)
					slideCloneObj[ind].style.display = 'block'
			} else{
					_this.children().children('.overlay, .cats, .title, .button').css("opacity" , 0)
					slideCloneObj[ind].style.display = 'none'
			}
		})
	});
}
const MobileSider = () => {
	if ($(window).width() < 768) {  
		slideCloneObj[0].style.display = 'block'
		var $inner_1 = $(slideinnerObj[0])
		var $inner_2 = $(slideinnerObj[1])
		$inner_1.children().children('.overlay, .cats, .title, .button').css("opacity" , 1)
		$inner_2.children().children('.overlay, .cats, .title, .button').css("opacity" , 0)
		// setInterval(MobileWheel, 100);
		MobileWheel()
	}
}
MobileSider()










// const linkText = document.querySelector('.link-text');
const linkImage = document.querySelector('.link-image');

function showImgContent(e) {
x = e.clientX
y = e.clientY
linkImage.style.transform = `translate3d(${x}px, ${y}px, 0)`;
//   linkText.style.setProperty('--x',(x)+'px');
//   linkText.style.setProperty('--y',(y)+'px');
}
document.addEventListener('mousemove', showImgContent);

function loading() {
  $('body').append('<div style="" id="loadingDiv"><div class="bounceball"></div></div>');
	setTimeout(function(){
		$( ".page_portfolio" ).css('clip-path','polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)')
	},5)
  setTimeout(function(){
      $( "#loadingDiv" ).css('clip-path','polygon(0 100%, 100% 100%, 100% 0%, 0 0%)')
      setTimeout(addBounceball, 1200);
      setTimeout(removeLoader, 2000);
  },50) 
  function removeLoader(){
      $( "#loadingDiv" ).css('clip-path','polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)')
      setTimeout(function(){
          $( "#loadingDiv" ).remove();
      },2500)
      $( ".bounceball" ).fadeOut(500, function() {
          $( ".bounceball" ).remove(); 
      });  
  }
  function addBounceball(){
      $( ".bounceball" ).css('display','block')
      
  }
}



//Slider_inner_ Number
const sliderNumber = document.querySelectorAll(".slider_inner__slide .title span")
for(var i = 0 ; i < sliderNumber.length; i++){
    sliderNumber[i].innerHTML = i + 1
    if(sliderNumber[i].innerHTML.length < 2){
        sliderNumber[i].prepend('0')
    }
}



// Page settimeout location
var webLink = [].slice.call(document.querySelectorAll(".main-link"));
webLink.forEach(function (element, index){
	element.addEventListener("click", function(e){
		loading()
		e.preventDefault()
		var a = $(this).attr('href')
		setTimeout(function(){location.href= a } , 2500); 
	});
});



//current clock 
var currentTime
function updateCurrentTime(){
    currentTime = moment().format("LTS")
    $(".currenttime").html( currentTime )
}
setInterval(() => updateCurrentTime(), 1 * 1000)


