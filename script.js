// 헤더 스크롤 효과
const header = document.getElementById('header');
const logoImg = document.querySelector('.logo img');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
        if (logoImg) {
            logoImg.src = 'logo.png';
        }
    } else {
        header.classList.remove('scrolled');
        if (logoImg) {
            logoImg.src = 'logo-f.png';
        }
    }
    
    lastScroll = currentScroll;
});

// 페이지 로드 시 초기 로고 설정
window.addEventListener('load', () => {
    if (logoImg && window.pageYOffset <= 100) {
        logoImg.src = 'logo-f.png';
    }
});

// 메뉴 토글
const menuToggle = document.getElementById('menuToggle');
const slideMenu = document.getElementById('slideMenu');
const closeMenu = document.getElementById('closeMenu');

menuToggle.addEventListener('click', () => {
    slideMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
    slideMenu.classList.remove('active');
    document.body.style.overflow = '';
});

// 메뉴 링크 클릭시 메뉴 닫기
const menuLinks = document.querySelectorAll('.menu-list a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        slideMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// 타자기 효과
const typingText = document.getElementById('typingText');
const isMobile = window.innerWidth <= 768;
const text = '이혼, "잘 끝내야 다시 시작할 수 있습니다."';
let index = 0;

function typeWriter() {
    if (index < text.length) {
        let currentText = text.substring(0, index + 1);
        typingText.innerHTML = currentText;
        index++;
        setTimeout(typeWriter, 100);
    }
}

// 페이지 로드시 타자기 효과 시작
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// 실시간 상담문의 더미 데이터
const inquiryData = [
    { name: '남x우', phone: '010-xxxx-2312', type: '이혼' },
    { name: '김xx', phone: '010-xxxx-5678', type: '재산분할' },
    { name: '이xx', phone: '010-xxxx-9012', type: '양육권' },
    { name: '박xx', phone: '010-xxxx-3456', type: '이혼' },
    { name: '최xx', phone: '010-xxxx-7890', type: '재산분할' },
    { name: '정xx', phone: '010-xxxx-1234', type: '양육권' },
    { name: '강xx', phone: '010-xxxx-5678', type: '이혼' },
    { name: '조xx', phone: '010-xxxx-9012', type: '재산분할' },
    { name: '윤xx', phone: '010-xxxx-3456', type: '양육권' },
];

let currentIndex = 0;
const inquiryList = document.getElementById('inquiryList');

function createInquiryItem(data) {
    const item = document.createElement('div');
    item.className = 'inquiry-item';
    item.innerHTML = `
        <div class="inquiry-info">
            <div class="inquiry-name">${data.name}</div>
            <div class="inquiry-phone">${data.phone}</div>
        </div>
        <div class="inquiry-type">${data.type}</div>
    `;
    return item;
}

function showInquiries() {
    // 기존 아이템들 제거
    const existingItems = inquiryList.querySelectorAll('.inquiry-item');
    existingItems.forEach(item => item.remove());
    
    // 3개씩 표시
    for (let i = 0; i < 3; i++) {
        const dataIndex = (currentIndex + i) % inquiryData.length;
        const item = createInquiryItem(inquiryData[dataIndex]);
        inquiryList.appendChild(item);
        
        // 애니메이션을 위해 약간의 지연
        setTimeout(() => {
            item.classList.add('active');
        }, i * 150);
    }
    
    currentIndex = (currentIndex + 3) % inquiryData.length;
}

// 초기 표시
setTimeout(() => {
    showInquiries();
}, 100);

// 3초마다 업데이트
setInterval(() => {
    // 기존 아이템들 제거 애니메이션
    const items = inquiryList.querySelectorAll('.inquiry-item');
    if (items.length > 0) {
        items.forEach(item => {
            item.classList.remove('active');
            item.classList.add('leaving');
        });
        
        // 새 아이템 표시
        setTimeout(() => {
            showInquiries();
        }, 500);
    }
}, 3000);

// Top 버튼
const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        topBtn.classList.add('visible');
    } else {
        topBtn.classList.remove('visible');
    }
});

topBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// 부드러운 스크롤 (내부 링크만)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 스크롤 시 섹션 이미지 애니메이션
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionImage = entry.target;
            sectionImage.classList.add('visible');
        }
    });
}, observerOptions);

// 모든 섹션 이미지에 observer 적용
document.querySelectorAll('.section-image').forEach(section => {
    sectionObserver.observe(section);
});
