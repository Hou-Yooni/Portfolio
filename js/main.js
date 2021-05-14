( function( window ) {
  function classReg( className ) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }
  var hasClass, addClass, removeClass;
  
  if ( 'classList' in document.documentElement ) {
    hasClass = function( elem, c ) {
      return elem.classList.contains( c );
    };
    addClass = function( elem, c ) {
      elem.classList.add( c );
    };
    removeClass = function( elem, c ) {
      elem.classList.remove( c );
    };
  }
  else {
    hasClass = function( elem, c ) {
      return classReg( c ).test( elem.className );
    };
    addClass = function( elem, c ) {
      if ( !hasClass( elem, c ) ) {
        elem.className = elem.className + ' ' + c;
      }
    };
    removeClass = function( elem, c ) {
      elem.className = elem.className.replace( classReg( c ), ' ' );
    };
  }
  
  function toggleClass( elem, c ) {
    var fn = hasClass( elem, c ) ? removeClass : addClass;
    fn( elem, c );
  }
  
  var classie = {
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
  };
  
  if ( typeof define === 'function' && define.amd ) {
    define( classie );
  } else {
    window.classie = classie;
  }
  
  })( window );
  
  
  
  var ModalEffects = (function() {
    function init() {
      var overlay = document.querySelector( '.md-overlay' );
      [].slice.call( document.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {
          
        var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
          close = modal.querySelector( '.md-close' );

        function removeModal( hasPerspective ) {
          classie.remove( modal, 'md-show' );
          if( hasPerspective ) {
            classie.remove( document.documentElement, 'md-perspective' );
          }
        }
  
        function removeModalHandler() {
          removeModal( classie.has( el, 'md-setperspective' ) ); 
        }
  
        el.addEventListener( 'click', function( ev ) {
          classie.add( modal, 'md-show' );
          overlay.removeEventListener( 'click', removeModalHandler );
          overlay.addEventListener( 'click', removeModalHandler );
  
          if( classie.has( el, 'md-setperspective' ) ) {
            setTimeout( function() {
              classie.add( document.documentElement, 'md-perspective' );
            }, 25 );
          }
        });
  
        close.addEventListener( 'click', function(e) {
          e.stopPropagation();
          removeModalHandler();
        });
  
      } );
  
    }
    init();
})(); 


$('.sidebar-link').click(function(){
    $('.sidebar-link').removeClass("is-active")
    $(this).addClass("is-active")
})


$(document).ready(function(){
    if( $(window).width() > 1090){
        $('.sidebar').removeClass('collapse')
    }else{
        $('.sidebar').addClass('collapse')
    }
    
})
$(window).resize(function(){
    if( $(window).width() > 1090){
        $('.sidebar').removeClass('collapse')
    }else{
        $('.sidebar').addClass('collapse')
    }
})


var allVideos = document.querySelectorAll(".video")
allVideos.forEach(v=>{
    v.addEventListener('mouseover',()=>{
        let video = v.querySelector('video')
        video.play()
    })
    v.addEventListener('mouseleave',()=>{
        let video = v.querySelector('video')
        video.pause()
    })
})


// $('.logo, .logo-expand, .discover').on('click',(e)=>{
    // $('.main-container').removeClass('show')
//     $('.main-container').animate({scrollTop: 0},1000)
// })

// $('.showed, .member').on('click',(e)=>{
//     $('.main-container').addClass('show')
//     $('.main-container').animate({scrollTop: 0},1000)
//     $('.sidebar-link').removeClass('is-active')
//     $('.showed').addClass('is-active')
// })

// $('.logo, .logo-expand, .discover').on('click',(e)=>{
//     $('.main-container').removeClass('show')
//     $('.main-container').animate({scrollTop: 0},1000)
// })


$('#bulletin,.logo, .logo-expand').on('click',(e)=>{
    $('.sidebar-link').removeClass('is-active')
    $('#bulletin').addClass('is-active')
    $('.main-body').css({display: 'none'})
    $('.bulletin').css({display: 'block'})
    $('.main-container').animate({scrollTop: 0},1000)
})

$('#info').on('click',(e)=>{
    $('.sidebar-link').removeClass('is-active')
    $('#info').addClass('is-active')
    $('.main-body').css({display: 'none'})
    $('.info').css({display: 'block'})
    $('.main-container').animate({scrollTop: 0},1000)
})

$('#top-menu-info').on('click',(e)=>{
  $('.sidebar-link').removeClass('is-active')
  $('#info').addClass('is-active')
  $('.main-body').css({display: 'none'})
  $('.info').css({display: 'block'})
  $('.main-container').animate({scrollTop: 0},1000)
})

$('#group').on('click',(e)=>{
    $('.sidebar-link').removeClass('is-active')
    $('#group').addClass('is-active')
    $('.main-body').css({display: 'none'})
    $('.group').css({display: 'block'})
    $('.main-container').animate({scrollTop: 0},1000)
})

$('#members').on('click',(e)=>{
    $('.sidebar-link').removeClass('is-active')
    $('#members').addClass('is-active')
    $('.main-body').css({display: 'none'})
    $('.members').css({display: 'block'})
    $('.main-container').animate({scrollTop: 0},1000)
})

$('#authority').on('click',(e)=>{
    $('.sidebar-link').removeClass('is-active')
    $('#authority').addClass('is-active')
    $('.main-body').css({display: 'none'})
    $('.authority').css({display: 'block'})
    $('.main-container').animate({scrollTop: 0},1000)
})


$('.dropdown').css('display','none')

$('.user-settings').click((e)=>{
    e.stopPropagation()
    $('.dropdown').toggle(function(){
        $(this).animate({
            width: "118.95px", 
            height: '90px',
            display: 'block'
        },400)
    })
})


function hidedropdown(){
    if ($('.dropdown').css('display') == 'none'){
        $('.app').click(function(){
            $('.dropdown').animate({
                width: "0", 
                height: '0',
            },400)
            setTimeout(function(){
                $('.dropdown').css('display','none')
            },400)
        })
    }
}

var authorName = $('.author-name')
function nameToCase(){
    for(var i = 0; i < authorName.length; i++){
        let mainName = authorName[i].innerText
        let str =  mainName.slice(0,1).toUpperCase()
        let rel =  mainName.slice(1)
        authorName[i].innerText =  str + rel
    }
}

function init(){
    hidedropdown()
    nameToCase()
    setWidth()
    var blogAmim = document.querySelectorAll('.main-blog.anim')
    var membersAmim = document.querySelectorAll('.members-card.anim')
    var groupAmim = document.querySelectorAll('.group-card.anim')
    var authorityAmim = document.querySelectorAll('.authority-card.anim')
    var count = 0
    for(var i = 1; i<blogAmim.length; i++){
        count += 0.1
        blogAmim[i].style.animationDelay = count + 's'
    }
    var count2 = 0
    for(var i = 0; i<membersAmim.length; i++){
        count2 += 0.1
        membersAmim[i].style.animationDelay = count2 + 's'
    }
    var count3 = 0
    for(var i = 0; i<groupAmim.length; i++){
        count3 += 0.1
        groupAmim[i].style.animationDelay = count3 + 's'
    }
    var count4 = 0
    for(var i = 0; i<authorityAmim.length; i++){
        count4 += 0.1
        authorityAmim[i].style.animationDelay = count4 + 's'
    }
}
init()


function setWidth(){
    $('.main-blog__title a').each(function(){
        var len = $(this).text().length
        var str = ''
        if(len > 28){
            str = $('.main-blog__title a').text().slice(0,28)+'...'
            $(this).html(str)
        }
    })  

    $('.newsContent-title-text small').each(function(){
        var len = $(this).text().length
        var str = ''
        if(len > 60){
            str = $('.newsContent-title-text small').text().slice(0,60)+'...'
            $(this).html(str)
        }
    })  

}
setWidth()


$(".input-group").focusin(function(){
    $(this).find('span').animate({'opacity':'0'},200)
})

$(".input-group").focusout(function(){
    $(this).find('span').animate({'opacity':'1'},300)
})






var newsLink = document.querySelectorAll(".main-blog__title a")
var newsContent = document.querySelectorAll(".content")
$('.newsContent-area').css("display","none")
for(var i = 0; i < newsContent.length; i++){
    newsContent[i].setAttribute("data-con",[i])
}
for(var i = 0; i < newsLink.length; i++){
    newsLink[i].setAttribute("data-news",[i])
    newsLink[i].addEventListener('click',function(e){
        var touchData = this.dataset.news
        var newsContents = $('.newsContent-area')
        newsContents.get().forEach(function(element,j){
            if(touchData == element.getAttribute("data-con")){
                $(element).css("display","block")
                $(".bulletin").css("display","none")
            }else {
                $(element).css("display","none")
                $(".bulletin").css("display","none")
            }
        })
    })
}





var authorityLink = document.querySelectorAll(".authority-btn")
var authoritySetUp = document.querySelectorAll(".authoritySetup")
$('.authoritySetup').css("display","none")
for(var i = 0; i < authoritySetUp.length; i++){
    authoritySetUp[i].setAttribute("data-set",[i])
}
for(var i = 0; i < authorityLink.length; i++){
    authorityLink[i].setAttribute("data-aubtn",[i])
    authorityLink[i].addEventListener('click',function(e){
        var touchData = this.dataset.aubtn
        var authoritySetUps = $('.authoritySetup')
        authoritySetUps.get().forEach(function(element,j){
            if(touchData == element.getAttribute("data-set")){
                $(element).css("display","block")
                $(".authority").css("display","none")
            }else {
                $(element).css("display","none")
                $(".authority").css("display","none")
            }
        })
    })
}



var groupLink = document.querySelectorAll(".group-edit")
var groupEditBody = document.querySelectorAll(".groupEditBody")
$('.groupEditBody').css("display","none")
for(var i = 0; i < groupEditBody.length; i++){
  groupEditBody[i].setAttribute("data-edit",[i])
}
for(var i = 0; i < groupLink.length; i++){
    groupLink[i].setAttribute("data-group",[i])
    groupLink[i].addEventListener('click',function(e){
        var touchData = this.dataset.group
        var groupEditBodys = $('.groupEditBody')
        groupEditBodys.get().forEach(function(element,j){
            if(touchData == element.getAttribute("data-edit")){
                $(element).css("display","block")
                $(".group").css("display","none")
            }else {
                $(element).css("display","none")
                $(".group").css("display","none")
            }
        })
    })
}



var membersCard = document.querySelectorAll(".members-card-header")


for(var i = 0 ; i < membersCard.length; i++){
    var colors = Math.floor(Math.random()*240)
    membersCard[i].style.background = `hsl(${colors}, 100%, 40%)`
}



$('.cb-value').click(function() {
    var mainParent = $(this).parent('.toggle-btn');
    if($(mainParent).find('input.cb-value').is(':checked')) {
      $(mainParent).addClass('active');
    } else {
      $(mainParent).removeClass('active');
    }
  
})




$(document).ready(function() {
  min = 0
  max = 10
  $(".minus").on("click", function() {
    if ($('.count').val() > min) {
      $('.count').val(parseInt($('.count').val()) - 1 );
      $('.counter').text(parseInt($('.counter').text()) - 1 );
    }
  });
  $(".plus").on("click", function() {
      $('.count').val(parseInt($('.count').val()) + 1 );
      $('.counter').text(parseInt($('.counter').text()) + 1 );
  });
});








// -------sweetalert
function open_modal1(){
  const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger',
    title: 'delete-swal-title',
  },
  buttonsStyling: false,
  width: '300px'
})

swalWithBootstrapButtons.fire({
  title: '您確定要刪除嗎？',
  html: '<span style="color: #707070;font-size: 14px;">此動作將不可回復<span>',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: '確定',
  cancelButtonText: '取消',
  reverseButtons: true,
}).then((result) => {
  if (result.value) {
      Swal.fire({
      title: '刪除成功',
      icon: 'success',
      showCancelButton: false,
      showConfirmButton: false,
      timer: 1800,
      width: '300px',
      heightAuto: false 
     })
    }
  })
}



function open_modal2(){
  Swal.fire({
  title: '儲存成功',
  icon: 'success',
  showConfirmButton: false,
  width: '300px',
  timer: 1800,
   heightAuto: false
  })
}


