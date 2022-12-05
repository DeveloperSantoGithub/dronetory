//===> Slider Divs Reveals Animation start:

//==> Variables:

let controller;
let sliderScene;
let homePageScene;
let detailsPageScene;

//==> Functions:

function animateSliders() {
	// initial controller:
	controller = new ScrollMagic.Controller();

	//Get the Header Nav:
	const headerNav = document.querySelector('.nav-header');

	//Get the Sliders:

	// For Home page:
	const sliders = document.querySelectorAll('.slide');

	// Looping over the Home page Sliders:
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

		//-->>Home Page Animations Part:

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
		homePageScene = new ScrollMagic.Scene({
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

//===> Home page Slider Divs Reveals Animation end <<===|

//====> Drone Details page Scroll Animations start:

function droneDitailsAnimation() {
	//Create Controller:
	controller = new ScrollMagic.Controller();

	// Get the all slider from drone details page:
	const sliders = document.querySelectorAll('.droneSlide-details');

	//Looping over sliders:
	sliders.forEach((slider, index, sliders) => {
		const sliderTimeline = gsap.timeline({ defaults: { duration: 1 } });

		let nextDetailsSlider =
			sliders.length - 1 === index ? 'end' : sliders[index + 1];

		// Get the next slider Imgs and text:
		const nextImg = nextDetailsSlider.querySelector('img');
		const nextText = nextDetailsSlider.querySelector('.dronecase-text');

		// Create Animations:

		sliderTimeline.fromTo(slider, { opacity: 1 }, { opacity: 0 });
		sliderTimeline.fromTo(
			nextDetailsSlider,
			{ opacity: 0 },
			{ opacity: 1 },
			'-= 1'
		);

		sliderTimeline.fromTo(
			nextImg,
			{ x: '50%', y: '50%' },
			{ x: '0%', y: '0%' }
		);

		sliderTimeline.fromTo(
			nextText,
			{ x: '-50%', y: '-50%' },
			{ x: '0%', y: '0%' },
			'-= 0.5'
		);

		// Create Scene:
		detailsPageScene = new ScrollMagic.Scene({
			triggerElement: slider,
			triggerHook: 0,
			duration: '100%',
		})
			.setPin(slider, { pushFollowers: false })
			.setTween(sliderTimeline)
			.addIndicators({
				colorStart: 'lightblue',
				colorTrigger: 'white',
				name: 'page',
				indent: 200,
			})
			.addTo(controller);
	});
}

//====> Drone Details page Scroll Animations end.

//==> Cursor Animation by using gsap start:

function cursorAnimation() {
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
}

//==> Cursor Animation by using gsap end <<==|

//===> Burger Navbar Toggle start:

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

		document.body.classList.add('hide');
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

		document.body.classList.remove('hide');
	}
}

// Listeners:
burgerNav.addEventListener('click', navToggler);

//===> Burger Navbar Toggle end <<==|

//===> Drones types Details Page start:

// Page Transitions by using Barba JS:
const logo = document.querySelector('#logo');

barba.init({
	// Pre and post work before Entering and Leaving any page:
	views: [
		{
			namespace: 'home',
			beforeEnter() {
				animateSliders();
				cursorAnimation();

				logo.href = './index.html';
			},
			beforeLeave() {
				sliderScene.destroy();
				homePageScene.destroy();
				controller.destroy();
				cursorAnimation().destroy();
			},
		},
		{
			namespace: 'dronedetails',
			beforeEnter() {
				cursorAnimation();
				droneDitailsAnimation();

				logo.href = '../index.html';

				gsap.fromTo(
					'.nav-header',
					1,
					{ y: '-100%' },
					{ y: '0%', ease: 'power2.inOut' }
				);
			},
			beforeLeave() {
				cursorAnimation().destroy();
				controller.destroy();
			},
		},
	],

	//Create Animations on the pages:
	transitions: [
		{
			//Page Leaving Animations:
			leave({ current, next }) {
				let done = this.async();

				// FadeInOut Animation:
				const fadeTimeline = gsap.timeline({
					defaults: { ease: 'power2.inOut' },
				});

				fadeTimeline.fromTo(
					current.container,
					1,
					{ opacity: 1 },
					{ opacity: 0 }
				);

				// swipe animations:
				fadeTimeline.fromTo(
					'.swipe',
					0.75,
					{ x: '-100%' },
					{ x: '0%', onComplete: done },
					'-= 0.5'
				);
			},

			//Page Entering Animations:
			enter({ current, next }) {
				let done = this.async();

				// Scroll to top:
				window.scrollTo(0, 0);

				// FadeInOut Animation:
				const fadeTimeline = gsap.timeline({
					defaults: { ease: 'power2.inOut' },
				});

				fadeTimeline.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });

				// swipe animations:
				fadeTimeline.fromTo(
					'.swipe',
					0.75,
					{ x: '0%' },
					{ x: '100%', stagger: 0.3, onComplete: done },
					'-= 0.5'
				);
			},
		},
	],
});

//===> Drones types Details Page end <<==|
