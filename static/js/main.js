//广告轮播图


window.onload = function () {

	function $id(el) {
		return document.getElementById(el)
	}
	function $class(el) {
		return document.getElementsByClassName(el)
	}
	function $tagName(el) {
		return document.getElementsByTagName(el)
	}

	var bannerSwiper = new Swiper('.banner_swiper', {
		effect: 'fade',
		autoplay: 3000,	//轮播时间
		speed: 600,
		simulateTouch: false,
		//  initialSlide: 2,
		loop: true
	});
	//字体轮播
	var bannerTSwiper = new Swiper('.banner_title', {
		autoplay: 3000,		//轮播时间
		speed: 600,
		slidesPerView: 5,
		initialSlide: -2,
		loop: true,
		direction: 'vertical',
		onlyExternal: true,
		onClick: function (swiper) {

		}
	});
		//console.log(bannerTSwiper.activeIndex,bannerSwiper.activeIndex);
	function headerNavmouseenter() {

		for (let i = 0; i < $class("nav_item").length; i++) {
			console.log(i)
			$class("nav_item")[i].onmouseenter = function () {
				$class("header_hover_conta")[0].style.display = "block"
			}

		}
	}

	headerNavmouseenter()

	function listMouseEnter(){
		for (let i = 0; i < $class("list-item").length; i++) {
			console.log(i)
			$class("header_hover")[0].onmouseleave = function () {
				$class("header_hover_conta")[0].style.display = "none"
			}

		}
	}
	listMouseEnter()


}
