"use strict";

// 헤더 gnb 스크립트
const header = document.querySelector('.header');
const mobileGnb = document.querySelector('.mobile-gnb');
window.addEventListener('DOMContentLoaded', () => {
  initGnb(header);
  initMobileGnb(mobileGnb);
})

// PC
function initGnb(header){
  let gnb = header.querySelector('.header-gnb');
  let gnbMenus = gnb.querySelectorAll('.gnb-depth-1 .depth-1');

  [...gnbMenus].forEach(menu => {
    menu.addEventListener('mouseenter', (event) => {
      gnbOpen(event.target);
    });
    menu.addEventListener('focusin', (event) => {
      gnbOpen(event.target.closest('.depth-1'));
    });

    menu.addEventListener('mouseleave', (event) => {
      gnbClose(event.target);
    });
    menu.addEventListener('focusout', (event) => {
      gnbClose(event.target.closest('.depth-1'));
    });
  });

  function gnbOpen(target){
    let targetItem = target.querySelector('.depth-item');
    let targetMenu = target.querySelector('.gnb-depth-2');
    let targetHeight = targetMenu.getBoundingClientRect().height;
    header.classList.add('open');
    target.classList.add('current');
    targetItem.style.height = `${targetHeight}px`;
  }

  function gnbClose(target){
    let targetItem = target.querySelector('.depth-item');
    header.classList.remove('open');
    target.classList.remove('current');
    targetItem.style.height = '0px';
  }
}

// Mobile
function initMobileGnb(mobileGnb){
  let html = document.querySelector('html');
  let sidebarButton = mobileGnb.querySelector('.sidebar-btn');
  let mobileMenuButtons = mobileGnb.querySelectorAll('.depth-1 a');

  sidebarButton.addEventListener('click', (event) => {
    if (mobileGnb.classList.contains('open')) {
      mobileGnbClose(mobileGnb);
    } else {
      mobileGnbOpen(mobileGnb);
    }
  });

  mobileMenuButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const button = event.target.closest('.depth-1-link');
			if (!button) return;
      openAccordion(button);
    });
  })

  window.addEventListener('resize', function(){
    if (window.innerWidth > 1024) {
      mobileGnbClose(mobileGnb);
    }
  });

  function mobileGnbOpen(gnb){
    gnb.classList.add('open');
    html.classList.add('not-scroll');
  }

  function mobileGnbClose(gnb){
    gnb.classList.remove('open');
    html.classList.remove('not-scroll');
  }

  // 모바일 메뉴 아코디언
  function openAccordion($this) {
    let target = $this.parentElement;
    let depthTarget = $this.nextElementSibling;
    if (!depthTarget) return;
    let otherLinks = siblings(target);
    let otherItems = otherLinks.map(link => link.querySelector('ul'));

    if (target.classList.contains('open')){
      target.classList.remove('open');
      depthTarget.style.maxHeight = '0px';
    } else {
      otherLinks.forEach(link => link.classList.remove('open'));
      otherItems.forEach(item => item ? item.style.maxHeight = '0px' : '');
      target.classList.add('open');
      depthTarget.style.maxHeight = depthTarget.scrollHeight + 'px';
    }
  }
}

function siblings(element) {
  return [...element.parentElement.children].filter(value => value != element);
}

$(document).ready(function(){
  
  $(".slide-box").slick({
    
    slidesToShow:3,
    // slidesToScroll: 3 ,
    swipeToSlide: true ,
    
  })
  
})