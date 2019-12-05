

//var t = {
//		$list: null,
//		$listItems: null,
//		listLength: 0,
//		hasInitial: !1,
//		fitPattern: !1,
//		init: function() {
//			this.$list = $(".banner .swiper-scroller-list");
//			var e = this.$list.find(".swiper-scroller-item");
//			return this.listLength = e.length, !(this.listLength < 5) && (5 == this.listLength && (this.fitPattern = !0), this.$list.prepend(e.eq(this.listLength - 1)), this.fitPattern ? this.$list.prepend(e.eq(this.listLength - 2).clone()) : this.$list.prepend(e.eq(this.listLength - 2)), this.$list.prepend(e.eq(this.listLength - 3).clone()), this.$list.removeClass("hidden"), this.bind(), void(this.hasInitial = !0))
//		},
//		bind: function() {
//			var e = this;
//			this.$list.delegate(".swiper-scroller-item a", "click", function() {
//				var a = $(this).parent("li").index();
//				2 == a || 1 == a ? (e.scrollDown(), "function" == typeof ga && ga("send", "event", "pc-homepage", "click", "widget-up")) : 4 != a && 5 != a || (e.scrollUp(), "function" == typeof ga && ga("send", "event", "pc-homepage", "click", "widget-down"));
//				var t = e.$list.find(".swiper-scroller-item").eq(3).data("index");
//				bannerSwiper.slideTo(t)
//			})
//		},
//		scrollDown: function() {
//			var e = this.$list.find(".swiper-scroller-item"),
//				a = e.length - 2;
//			this.fitPattern && (a -= 1);
//			var t = e.eq(a).clone();
//			this.$list.prepend(t), e.last().remove()
//		},
//		scrollUp: function() {
//			var e = this.$list.find(".swiper-scroller-item"),
//				a = this.fitPattern ? 2 : 1,
//				t = e.eq(a).clone();
//			this.$list.append(t), e.first().remove()
//		},
//		scrollTo: function(e) {
//			if(!this.hasInitial) return !1;
//			e > this.listLength ? e %= this.listLength : 0 == e && (e = this.listLength);
//			var a = this.$list.find(".swiper-scroller-item").eq(3).data("index");
//			if(a == e) return !1;
//			var t = a + 1,
//				i = a - 1;
//			1 == a ? i = this.listLength : a == this.listLength && (t = 1), e == i ? this.scrollDown() : e == t && this.scrollUp()
//		},
//	};
//	t.init();