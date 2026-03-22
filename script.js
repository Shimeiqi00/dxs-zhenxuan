// 导航栏滚动效果
$(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
        $('#navbar').addClass('nav-scrolled');
        $('#backToTop').removeClass('opacity-0 invisible').addClass('opacity-100 visible');
    } else {
        $('#navbar').removeClass('nav-scrolled');
        $('#backToTop').addClass('opacity-0 invisible').removeClass('opacity-100 visible');
    }
});

// 移动端菜单
$('#menuBtn').click(function() {
    $('#mobileMenu').toggleClass('hidden');
    $(this).find('i').toggleClass('fa-bars fa-xmark');
});

// 移动端菜单点击后关闭
$('#mobileMenu a').click(function() {
    $('#mobileMenu').addClass('hidden');
    $('#menuBtn').find('i').removeClass('fa-xmark').addClass('fa-bars');
});

// 回到顶部
$('#backToTop').click(function() {
    $('html, body').animate({scrollTop: 0}, 500);
});

// 轮播图逻辑
let currentSlide = 0;
const slides = $('.carousel-item').length;

// 重置当前轮播的动画
function resetSlideAnimation() {
    // 先移除所有轮播文字的动画类
    $('.carousel-text').removeClass('animate-float-up animate-delay-200 animate-delay-400');
    // 强制重绘
    void $('.carousel-text')[0].offsetWidth;
    // 重新添加动画类
    $('.carousel-item:eq(' + currentSlide + ') .carousel-text').each(function(i) {
        if (i === 0) {
            $(this).addClass('animate-float-up');
        } else if (i === 1) {
            $(this).addClass('animate-float-up animate-delay-200');
        } else if (i === 2) {
            $(this).addClass('animate-float-up animate-delay-400');
        }
    });
}

// 轮播切换函数（新增动画重置）
function goToSlide(n) {
    $('.carousel-inner').css('transform', `translateX(-${n * 100}%)`);
    $('.carousel-dot').removeClass('bg-white').addClass('bg-white/50');
    $(`.carousel-dot:eq(${n})`).removeClass('bg-white/50').addClass('bg-white');
    currentSlide = n;
    // 切换轮播时重置动画
    resetSlideAnimation();
}

// 初始加载时执行一次动画
resetSlideAnimation();

// 下一张
$('.carousel-next').click(function() {
    currentSlide = (currentSlide + 1) % slides;
    goToSlide(currentSlide);
});

// 上一张
$('.carousel-prev').click(function() {
    currentSlide = (currentSlide - 1 + slides) % slides;
    goToSlide(currentSlide);
});

// 指示器点击
$('.carousel-dot').click(function() {
    currentSlide = $(this).index();
    goToSlide(currentSlide);
});

// 自动轮播
let autoPlay = setInterval(function() {
    currentSlide = (currentSlide + 1) % slides;
    goToSlide(currentSlide);
}, 5000);

// 鼠标悬停停止轮播
$('.carousel').hover(function() {
    clearInterval(autoPlay);
}, function() {
    autoPlay = setInterval(function() {
        currentSlide = (currentSlide + 1) % slides;
        goToSlide(currentSlide);
    }, 5000);
});

// 好物分类标签切换
$('.goods-tab').click(function() {
    $('.goods-tab').removeClass('active bg-primary text-white').addClass('bg-white hover:bg-primary/10');
    $(this).addClass('active bg-primary text-white').removeClass('bg-white hover:bg-primary/10');
    // 此处可添加品类筛选逻辑，暂做样式切换
});