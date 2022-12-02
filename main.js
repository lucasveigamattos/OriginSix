const slideShow = document.querySelector('#testimonials #slideShow')

function openMenu() {
    document.body.classList.add('menuExpanded')
}

function closeMenu() {
    document.body.classList.remove('menuExpanded')
}

function activeLink(section) {
    const tartgetLine = scrollY + innerHeight / 2
    const sectionTop = section.offsetTop
    const sectionBottom = section.offsetTop + section.offsetHeight
    const link = document.querySelector(`#menu ul li a[href*=${section.getAttribute('id')}]`)

    tartgetLine > sectionTop && tartgetLine < sectionBottom ? link.classList.add('active') : link.classList.remove('active')
}

function showBackToTop() {
    const backToTop = document.getElementById('backToTop')
    scrollY >= 720 ? backToTop.classList.add('show') : backToTop.classList.remove('show')
}

function onPageScroll() {
    activeLink(home)
    activeLink(about)
    activeLink(services)
    activeLink(testimonials)
    activeLink(contact)
    showBackToTop()
}

onPageScroll()

var deviceSize = getComputedStyle(slideShow).getPropertyValue('--device-size')

function checkSlides() {
    if (deviceSize == " \"small\"") {
        slideShow.classList.add('small')
        slideShow.classList.remove('larger')
    } else {
        slideShow.classList.remove('small')
        slideShow.classList.add('larger')
    }
}

checkSlides()

addEventListener('resize', () => {
    checkSlides()
})

function activePagers() {
    const targetLine = slideShow.scrollLeft + slideShow.offsetWidth / 2

    if (deviceSize == " \"small\"") {
        const slides = document.querySelectorAll('#testimonials #slideShow .slide')
        const pagers = document.querySelectorAll('#testimonials #pagers #pagersToSmallDevices .pager')
    
        for (let i = 0; i < slides.length--; i++) {
            const slide = slides[i]
            const slideLeft = slide.offsetLeft
            const slideRight = slideLeft + slide.offsetWidth
    
            if (getComputedStyle(slide).getPropertyValue('display') != 'none') {
                const pager = pagers[i]
                if (pager != undefined) {
                    targetLine > slideLeft && targetLine < slideRight ? pager.classList.add('active') : pager.classList.remove('active')
                }
            }
        }
    } else {
        const groups = document.querySelectorAll('#testimonials #slideShow .group')
        const pagers = document.querySelectorAll('#testimonials #pagers #pagersToLargerDevices .pager')

        for (let i = 0; i < groups.length--; i++) {
            const group = groups[i]
            const groupLeft = group.offsetLeft
            const groupRight = groupLeft + group.offsetWidth

            const pager = pagers[i]
            targetLine > groupLeft && targetLine < groupRight && group.getAttribute('id') == pager.getAttribute('for') ? pager.classList.add('active') : pager.classList.remove('active')
        }
    }
}

function onTestimonialsSlideShowScroll() {
    activePagers()
    checkSlides()
}

onTestimonialsSlideShowScroll()

addEventListener('scroll', onPageScroll)
slideShow.addEventListener('scroll', onTestimonialsSlideShowScroll)

function onPagerClick(element) {
    slideShow.scrollTo(element.offsetLeft, 0)
}

function checkPagers() {
    const pagersToSmallDevices = document.getElementById('pagersToSmallDevices')
    const pagerToLargerDevices = document.getElementById('pagersToLargerDevices')

    if (deviceSize == " \"small\"") {
        pagersToSmallDevices.classList.add('active')
        pagerToLargerDevices.classList.remove('active')
    } else {
        pagersToSmallDevices.classList.remove('active')
        pagerToLargerDevices.classList.add('active')
    }
}

checkPagers()

addEventListener('resize', () => {
    deviceSize = getComputedStyle(slideShow).getPropertyValue('--device-size')
    activePagers()
    checkPagers()
})