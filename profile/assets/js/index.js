/*=============== SERVICES MODAL ===============*/
const   modal = document.querySelectorAll('.services__modal'),
        modalButton = document.querySelectorAll('.services__button'),
        modalClose = document.querySelectorAll('.services__modal-close')

let activeModal = (modalClick) => {
    modal[modalClick].classList.add('active-modal')
}

modalButton.forEach((modalButton, i) => {
    modalButton.addEventListener('click', () => {
        activeModal(i)
    })
})

modalClose.forEach((modalClose, i) => {
    modalClose.addEventListener('click', () => {
        modal.forEach((modalRemove) => {
            modalRemove.classList.remove('active-modal')
        })
    })
})

/*=============== SWIPER TESTIMONIAL ===============*/
const swiperTestimonial = new Swiper('.testimonial__swiper', {
    loop: true,
    spaceBetween: 32,
    grabCursor: true,

    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        clickable: true,
    },
})

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
    const scrollup = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll  class to the a tag with the scrollup class
    this.scrollY >= 350 ? scrollup.classList.add('show-scroll') : scrollup.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SHOW SOCIAL NETWORKS ===============*/
const showSocial = (toggleCard, socialCard) =>{
    const toggle = document.getElementById(toggleCard),
          social = document.getElementById(socialCard),
          icon = document.getElementById('toggle-icon')
    
    toggle.addEventListener('click', ()=>{
        // If the animation class exists, we add the down-animation class
        if(social.classList.contains('animation')){
            social.classList.add('down-animation')

            // We remove the down-animation class
            setTimeout(() =>{
                social.classList.remove('down-animation')
            }, 1000)
        }

        if (icon.classList.contains('ri-eye-off-line')){
            icon.classList.add('ri-eye-line')
            icon.classList.remove('ri-eye-off-line')

        } else {
            icon.classList.remove('ri-eye-line')
            icon.classList.add('ri-eye-off-line')
        }

        // We add the animation class to the div tag with the card__social class
        social.classList.toggle('animation')
    })
}
showSocial('card-toggle','card-social')