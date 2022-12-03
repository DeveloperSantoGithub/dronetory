//==> Variables:

let controller;
let sliderScene;
let pageScene;

//==> Functions:

function animateSliders() {
	// initial controller:
	controller = new ScrollMagic.Controller();

	//Get the Header Nav:
	const headerNav = document.querySelector('.nav-header');

	//Get the Sliders:
	const sliders = document.querySelectorAll('.slide');

	// Looping over the Sliders:
	sliders.forEach((slider, index, sliders) => {
		const img = slider.querySelector('img');
		const revealImg = slider.querySelector('.reveal-img');
		const revealText = slider.querySelector('.reveal-text');

		//==> GSAP:
		//-->> Slider Animation part:
		//Slider Timeline:
		const sliderTimeline = gsap.timeline({
			defaults: {
				duration: 1,
				ease: 'power2.inOut',
			},
		});

		//Create the animations:
		sliderTimeline.fromTo(revealImg, { x: '0%' }, { x: '100%' });
		sliderTimeline.fromTo(img, { scale: 2 }, { scale: 1 }, '-=1');
		sliderTimeline.fromTo(revealText, { x: '0%' }, { x: '100%' }, '-=0.75');
		sliderTimeline.fromTo(headerNav, { y: '-100%' }, { y: '0%' }, '-= 0.5');

		//Create Slider Scene:
		sliderScene = new ScrollMagic.Scene({
			triggerElement: slider,
			triggerHook: 0.25,
			reverse: false,
		})
			.setTween(sliderTimeline)
			.addIndicators({
				colorStart: 'lightgreen',
				colorTrigger: 'orange',
				name: 'slider',
			})
			.addTo(controller);

		//-->> Page Animations Part:

		// Create page Timeline:
		const pageTimeline = gsap.timeline();

		// Create Animations:

		// Checking condition to set sliders scrolling delay:
		let nextSlider =
			sliders.length - 1 === index ? 'stopScrolling' : sliders[index + 1];

		pageTimeline.fromTo(nextSlider, { y: '0%' }, { y: '50%' });
		pageTimeline.fromTo(
			slider,
			{ opacity: 1, scale: 1 },
			{ opacity: 0, scale: 0.5 }
		);
		pageTimeline.fromTo(nextSlider, { y: '50%' }, { y: '0%' }, '-= 0.5');

		// Create Page Scene:
		pageScene = new ScrollMagic.Scene({
			triggerElement: slider,
			duration: '100%',
			triggerHook: 0,
		})
			.setPin(slider, { pushFollowers: false })
			.setTween(pageTimeline)
			.addIndicators({
				colorStart: 'lightblue',
				colorTrigger: 'white',
				name: 'page',
				indent: 200,
			})
			.addTo(controller);
	});
}

animateSliders();

//==> Cursor Animation by using gsap:

// Selectors:
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const hoverables = document.querySelectorAll('img, .title, h1, a, h3');

// set the initials values of 2D axis:
var posX = 0,
	posY = 0,
	mouseX = 0,
	mouseY = 0;

// Create Animation with gsap TweenMax:
TweenMax.to({}, 0.016, {
	repeat: -1,
	onRepeat: function () {
		posX += (mouseX - posX) / 9;
		posY += (mouseY - posY) / 9;

		// Set TweenMax:
		TweenMax.set(follower, {
			css: {
				left: posX - 20,
				top: posY - 20,
			},
		});

		TweenMax.set(cursor, {
			css: {
				left: mouseX,
				top: mouseY,
			},
		});
	},
});

// Listeners with Functions:
document.addEventListener('mousemove', (e) => {
	mouseX = e.pageX;
	mouseY = e.pageY;
});

hoverables.forEach((element) => {
	element.addEventListener('mouseenter', () => {
		cursor.classList.add('active');
		follower.classList.add('active');

		if (element.classList.contains('explore')) {
			gsap.to('.title-swipe', 1, {
				y: '0%',
			});
		}
	});

	element.addEventListener('mouseleave', () => {
		cursor.classList.remove('active');
		follower.classList.remove('active');

		if (element.classList.contains('explore')) {
			gsap.to('.title-swipe', 1, { y: '120%' });
		}
	});
});

//===> Burger Navbar Toggle:

// Selectors:
const burgerNav = document.querySelector('.burger-nav');

// Functions:
function navToggler(e) {
	if (!e.target.classList.contains('active')) {
		e.target.classList.add('active');
		gsap.to('.line1', 0.5, { rotate: '45', y: 7.5, background: 'black' });
		gsap.to('.line2', 0.5, {
			rotate: '-45',
			y: -7.5,
			width: '3rem',
			background: 'black',
		});
		gsap.to('.line3', 0.5, { scale: 0 });

		gsap.to('#logo', 1, { color: 'black' });

		gsap.to('.navbar', 1, { clipPath: 'circle(2500px at 100% -10%)' });
	} else {
		e.target.classList.remove('active');
		gsap.to('.line1', 0.5, { rotate: '0', y: 0, background: 'white' });
		gsap.to('.line2', 0.5, {
			rotate: '0',
			y: 0,
			width: '2.2rem',
			background: 'white',
		});
		gsap.to('.line3', 0.5, { scale: 1 });

		gsap.to('#logo', 1, { color: 'white' });

		gsap.to('.navbar', 1, { clipPath: 'circle(50px at 100% -10%)' });
	}
}

// Listeners:
burgerNav.addEventListener('click', navToggler);
