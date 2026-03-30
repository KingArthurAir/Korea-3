/**
 * 한국미팅 - 1:1 复刻 love-me.xyz
 * 交互功能 + 韩国本土化
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 偏好选择按钮
    // ==========================================
    const preferenceColumns = document.querySelectorAll('.preference-column');
    
    preferenceColumns.forEach(column => {
        const buttons = column.querySelectorAll('.pref-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // 移除同组其他按钮的 active
                buttons.forEach(btn => btn.classList.remove('active'));
                // 给当前按钮添加 active
                this.classList.add('active');
            });
        });
    });
    
    // ==========================================
    // 个人资料卡片点击
    // ==========================================
    const allCards = document.querySelectorAll(
        '.preview-card-large, .preview-card-small, .gallery-card'
    );
    
    allCards.forEach(card => {
        card.addEventListener('click', function() {
            const name = this.querySelector('.preview-name, .gallery-name')?.textContent;
            const meta = this.querySelector('.preview-meta, .gallery-location')?.textContent;
            
            // 创建爱心特效
            createHeartEffect(this);
            
            setTimeout(() => {
                const message = name + (meta ? ' ' + meta : '') + '님과의 매칭을 시작합니다!\n\n카카오톡 채널로 이동합니다...';
                alert(message);
                // 实际使用时替换为：window.location.href = 'https://open.kakao.com/...';
            }, 500);
        });
    });
    
    // 爱心动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartFloat {
            0% { 
                opacity: 1; 
                transform: translateY(0) scale(1); 
            }
            100% { 
                opacity: 0; 
                transform: translateY(-100px) scale(1.5); 
            }
        }
    `;
    document.head.appendChild(style);
    
    // 创建爱心特效函数
    function createHeartEffect(element) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        const rect = element.getBoundingClientRect();
        
        heart.style.cssText = `
            position: fixed;
            font-size: 3rem;
            pointer-events: none;
            z-index: 9999;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top}px;
            animation: heartFloat 1s ease-out forwards;
        `;
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
    
    // ==========================================
    // CTA 按钮点击
    // ==========================================
    const ctaButtons = document.querySelectorAll('.btn-download, .btn-meet-now');
    
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const confirmed = confirm(
                '카카오톡 채널을 추가하시겠습니까?\n\n' +
                '실제 사람들과의 매칭이 시작됩니다!'
            );
            
            if (confirmed) {
                alert('카카오톡 채널: @한국미팅\n\n채널을 추가해주세요!');
                // 实际使用时替换为：window.location.href = 'https://open.kakao.com/...';
            }
        });
    });
    
    // ==========================================
    // 头部滚动效果
    // ==========================================
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(20, 10, 40, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(20, 10, 40, 0.9)';
            header.style.boxShadow = 'none';
        }
    });
    
    // ==========================================
    // 滚动动画 (Intersection Observer)
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 需要动画的元素
    const animateElements = document.querySelectorAll(
        '.preference-column, .preview-card-large, .preview-card-small, ' +
        '.gallery-card, .feature-card, .cta-section'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ==========================================
    // 画廊拖拽滚动 (桌面端)
    // ==========================================
    const gallery = document.querySelector('.profile-gallery');
    
    if (gallery) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        gallery.addEventListener('mousedown', (e) => {
            isDown = true;
            gallery.style.cursor = 'grabbing';
            startX = e.pageX - gallery.offsetLeft;
            scrollLeft = gallery.scrollLeft;
        });
        
        gallery.addEventListener('mouseleave', () => {
            isDown = false;
            gallery.style.cursor = 'grab';
        });
        
        gallery.addEventListener('mouseup', () => {
            isDown = false;
            gallery.style.cursor = 'grab';
        });
        
        gallery.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - gallery.offsetLeft;
            const walk = (x - startX) * 2;
            gallery.scrollLeft = scrollLeft - walk;
        });
    }
    
    // ==========================================
    // 触摸滑动支持 (移动端)
    // ==========================================
    if (gallery) {
        let touchStartX = 0;
        let touchScrollLeft = 0;
        
        gallery.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].pageX - gallery.offsetLeft;
            touchScrollLeft = gallery.scrollLeft;
        }, { passive: true });
        
        gallery.addEventListener('touchmove', (e) => {
            const x = e.touches[0].pageX - gallery.offsetLeft;
            const walk = (x - touchStartX) * 2;
            gallery.scrollLeft = touchScrollLeft - walk;
        }, { passive: true });
    }
    
    // ==========================================
    // 控制台日志
    // ==========================================
    console.log('%c💕 한국미팅', 'font-size: 24px; font-weight: bold; color: #ff4757;');
    console.log('%c1:1 复刻 love-me.xyz - 韩国版本已加载', 'font-size: 14px; color: #b8a8c8;');
    console.log('%c本土化内容：韩语文字 | 韩国城市 | KakaoTalk', 'font-size: 12px; color: #888899;');
});
