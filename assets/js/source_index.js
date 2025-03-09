// iterate over all nav links and add active class to the current page
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  const linkHref = link.getAttribute('href');
  if (linkHref === currentPage) {
      link.classList.add('active');
  }
});

// dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = themeToggle.querySelector('.fa-sun');
const moonIcon = themeToggle.querySelector('.fa-moon');
// logo switcher witht the theme
const logo = document.getElementById('logo');

// theme switcher
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');

  // swith icon
  if (document.body.classList.contains('light-mode')) {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'inline';
      logo.src = 'assets/logo/logo_bk.svg';
  } else {
      sunIcon.style.display = 'inline';
      moonIcon.style.display = 'none';
      logo.src = 'assets/logo/logo_wt.svg';
  }

  // save preference
  const isDarkMode = document.body.classList.contains('light-mode');
  localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
});

// init theme
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'inline';
  } else {
      document.body.classList.remove('light-mode');
      sunIcon.style.display = 'inline';
      moonIcon.style.display = 'none';
  }
}

initTheme();

// lazy load images
document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.image-gallery');
  const images = Array.from(gallery.querySelectorAll('.gallery-item'));

  // 打乱图片顺序
  const shuffledImages = shuffleArray(images);

  // 清空容器并重新插入打乱后的图片
  gallery.innerHTML = '';
  shuffledImages.forEach(img => gallery.appendChild(img));

  // 懒加载功能
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src; // 加载图片
        img.classList.add('loaded'); // 添加加载完成样式
        observer.unobserve(img); // 停止观察已加载的图片
      }
    });
  }, {
    rootMargin: '0px',
    threshold: 0.1 // 当图片 10% 进入视口时触发
  });

  shuffledImages.forEach(img => {
    observer.observe(img);
  });
});

// 打乱数组函数
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // 交换元素
  }
  return array;
}

// gallery modal
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const closeBtn = document.getElementById('close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const galleryImages = document.querySelectorAll('.gallery-item');

let currentIndex = 0;

// 打开 Modal
function openModal(index) {
    currentIndex = index;
    modal.style.display = 'flex';
    modalImage.src = galleryImages[currentIndex].src;
}

// 关闭 Modal
function closeModal() {
    modal.style.display = 'none';
}

// 显示上一张图片
function showPrev() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = galleryImages.length - 1; // 循环到最后一张
    }
    modalImage.src = galleryImages[currentIndex].src;
}

// 显示下一张图片
function showNext() {
    if (currentIndex < galleryImages.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // 循环到第一张
    }
    modalImage.src = galleryImages[currentIndex].src;
}

// 绑定事件
galleryImages.forEach((image, index) => {
    image.addEventListener('click', () => openModal(index));
});

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

prevBtn.addEventListener('click', showPrev);

nextBtn.addEventListener('click', showNext);

// 键盘事件支持
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            showPrev();
        } else if (e.key === 'ArrowRight') {
            showNext();
        } else if (e.key === 'Escape') {
            closeModal();
        }
    }
});