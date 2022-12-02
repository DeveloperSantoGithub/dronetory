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
