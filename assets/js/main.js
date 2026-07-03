/* ============================================
   ACHAHIJAB - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // Initialize all modules
  initProducts();
  initMobileMenu();
  initNavbarScroll();
  initScrollAnimations();
  initTestimonialSlider();
  initSmoothScroll();
});

/* ==========================================
   1. MOBILE MENU
   ========================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  // Close menu when clicking a link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

/* ==========================================
   2. NAVBAR SHADOW ON SCROLL
   ========================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('shadow-md', window.scrollY > 50);
  });
}

/* ==========================================
   3. SCROLL REVEAL ANIMATIONS
   ========================================== */
function initScrollAnimations() {
  const options = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => {
    observer.observe(el);
  });
}

/* ==========================================
   4. TESTIMONIAL SLIDER
   ========================================== */
function initTestimonialSlider() {
  const track = document.getElementById('testimonial-track');
  const dots = document.querySelectorAll('#slider-dots span');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (!track || !prevBtn || !nextBtn) return;

  const TOTAL_SLIDES = 3;
  const AUTO_INTERVAL = 4000;
  let current = 0;
  let autoTimer;

  function isMobile() {
    return window.innerWidth < 768;
  }

  function update() {
    const offset = isMobile() ? current * 100 : current * 33.333;
    track.style.transform = `translateX(-${offset}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-primary', i === current);
      dot.classList.toggle('bg-pink-200', i !== current);
    });
  }

  function goTo(index) {
    const max = isMobile() ? TOTAL_SLIDES - 1 : 0;
    current = Math.max(0, Math.min(index, max));
    update();
  }

  function next() {
    const max = isMobile() ? TOTAL_SLIDES - 1 : 0;
    current = current >= max ? 0 : current + 1;
    update();
  }

  function prev() {
    const max = isMobile() ? TOTAL_SLIDES - 1 : 0;
    current = current <= 0 ? max : current - 1;
    update();
  }

  function startAuto() {
    autoTimer = setInterval(next, AUTO_INTERVAL);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  // Event listeners
  nextBtn.addEventListener('click', () => { next(); resetAuto(); });
  prevBtn.addEventListener('click', () => { prev(); resetAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index));
      resetAuto();
    });
  });

  startAuto();
}

/* ==========================================
   5. SMOOTH SCROLL
   ========================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ==========================================
   6. DYNAMIC PRODUCTS & MODAL SYSTEM
   ========================================== */

const PRODUCTS = [
  {
    id: 'hiban-dania',
    name: 'Hiban Dania',
    category: 'Koleksi Terbaru',
    tag: 'New Collection',
    isVariable: true,
    description: `🌸 HIBAN DANIA 🌸

Hiban dania? apa bedanya sama hiban mafaza?
over all hampir mirip, bedanya hanya model/look depannya saja🥰

📝 Detail Bahan:
• Grade A: Armani doll premium
• Grade B: Ceruty baby doll`,
    images: [
      'assets/images/hiban_dania/photo_6168079684739385289_y.jpg',
      'assets/images/hiban_dania/photo_6168079684739385290_y.jpg',
      'assets/images/hiban_dania/photo_6168079684739385291_y.jpg',
      'assets/images/hiban_dania/photo_6168079684739385292_y.jpg',
      'assets/images/hiban_dania/photo_6168079684739385293_y.jpg',
      'assets/images/hiban_dania/photo_6168079684739385294_y.jpg',
      'assets/images/hiban_dania/photo_6168079684739385295_y.jpg',
      'assets/images/hiban_dania/photo_6168079684739385296_y.jpg',
      'assets/images/hiban_dania/photo_6168079684739385297_y.jpg',
      'assets/images/hiban_dania/photo_6168079684739385298_y.jpg'
    ],
    grades: [
      { id: 'A', name: 'Grade A', material: 'Armani doll premium' },
      { id: 'B', name: 'Grade B', material: 'Ceruty baby doll' }
    ],
    sizes: [
      { id: 'S', label: 'S (90x105)' },
      { id: 'M', label: 'M (95x110)' },
      { id: 'L', label: 'L (100x115)' },
      { id: 'XL', label: 'XL (105x120)' }
    ],
    priceRange: 'Rp 75.000 - Rp 120.000',
    pricing: {
      A: { S: 115000, M: 115000, L: 120000, XL: 120000 },
      B: { S: 75000, M: 80000, L: 85000, XL: 90000 }
    }
  },
  {
    id: 'hiban-mafaza',
    name: 'Hiban Mafaza',
    category: 'Koleksi Terbaru',
    tag: 'New Collection',
    isVariable: true,
    description: `🌸 HIBAN MAFAZA 🌸

Apa itu hiban?
Hiban adalah hijab bandana🥰
Hiban ini cocok banget untuk kalian-kalian yg gak suka ribet, gak suka pake peniti atau jarum pentul, pengennya tuh selalu sat set, nahh ini solusinya💗

beberapa minggu kebelakang mimin udah produksi hiban ini, tapi hanya untuk costumer offline🤭

So sekarang untuk sahabat acha hijab dimanapun berada udah bisa pesan yaa!!
Langsung aga gass DM📩

📝 Detail Bahan:
• Grade A: Armani doll premium
• Grade B: Ceruty baby doll`,
    images: [
      'assets/images/hiban_mafaza/photo_6136500405123354591_y.jpg',
      'assets/images/hiban_mafaza/photo_6136500405123354592_y.jpg',
      'assets/images/hiban_mafaza/photo_6136500405123354593_y.jpg',
      'assets/images/hiban_mafaza/photo_6136500405123354594_y.jpg',
      'assets/images/hiban_mafaza/photo_6136500405123354595_y.jpg',
      'assets/images/hiban_mafaza/photo_6136500405123354596_y.jpg',
      'assets/images/hiban_mafaza/photo_6136500405123354598_y.jpg',
      'assets/images/hiban_mafaza/photo_6136500405123354599_y.jpg',
      'assets/images/hiban_mafaza/photo_6136500405123354600_y.jpg'
    ],
    grades: [
      { id: 'A', name: 'Grade A', material: 'Armani doll premium' },
      { id: 'B', name: 'Grade B', material: 'Ceruty baby doll' }
    ],
    sizes: [
      { id: 'XS', label: 'XS (85x100 cm)' },
      { id: 'S', label: 'S (90x105 cm)' },
      { id: 'M', label: 'M (95x110 cm)' },
      { id: 'L', label: 'L (100x115 cm)' },
      { id: 'XL', label: 'XL (105x120 cm)' }
    ],
    priceRange: 'Rp 90.000 - Rp 150.000',
    pricing: {
      A: { XS: 125000, S: 130000, M: 135000, L: 140000, XL: 150000 },
      B: { XS: 90000, S: 95000, M: 100000, L: 105000, XL: 110000 }
    }
  },
  {
    id: 'voal-premium',
    name: 'Kerudung Voal Premium',
    category: 'Kerudung',
    tag: 'New',
    isVariable: false,
    description: `Kerudung Voal Premium dengan detail laser cut eksklusif.

Bahan voal premium ultra-lembut, tidak terawang, mudah dibentuk, tegak di dahi, serta sejuk dan nyaman dipakai sepanjang hari. Cocok untuk penggunaan formal maupun sehari-hari.`,
    images: ['assets/images/product-1.png'],
    priceRange: 'Rp 89.000',
    price: 89000
  },
  {
    id: 'niqab-sifon',
    name: 'Cadar Niqab Sifon',
    category: 'Cadar',
    tag: 'Best Seller',
    isVariable: false,
    description: `Cadar Niqab Sifon Premium dua layer yang elegan.

Menggunakan bahan Sifon Silk Arab Grade A yang super lembut, ringan, sangat breathable (tidak pengap), dan jahitan kualitas butik. Tidak menerawang di area mata.`,
    images: ['assets/images/product-2.png'],
    priceRange: 'Rp 65.000',
    price: 65000
  },
  {
    id: 'pashmina-diamond',
    name: 'Pashmina Diamond',
    category: 'Pashmina',
    tag: 'New',
    isVariable: false,
    description: `Pashmina Diamond Italiano Premium original.

Bahan Diamond Georgette premium yang tebal tapi tetap elastis (stretch), bertekstur pasir khas, sangat mudah diatur, tidak mudah bergeser, dan jatuh dengan cantik saat dikenakan.`,
    images: ['assets/images/product-3.png'],
    priceRange: 'Rp 75.000',
    price: 75000
  },
  {
    id: 'silk-premium',
    name: 'Kerudung Silk Premium',
    category: 'Kerudung',
    tag: 'Best Seller',
    isVariable: false,
    description: `Kerudung Silk Satin Premium mewah dengan efek glossy yang elegan.

Material Silk Satin import berkualitas tinggi, permukaannya berkilau lembut (doff glossy), jatuh dengan anggun, sangat halus di kulit, dan memberikan kesan mewah seketika.`,
    images: ['assets/images/product-4.png'],
    priceRange: 'Rp 120.000',
    price: 120000
  }
];

let currentProduct = null;
let selectedGrade = null;
let selectedSize = null;

function initProducts() {
  renderProducts();
  setupModalEvents();
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(product => {
    let badgeColor = 'bg-primary';
    if (product.tag === 'Best Seller') {
      badgeColor = 'bg-amber-500';
    } else if (product.tag === 'New Collection') {
      badgeColor = 'bg-pink-600';
    }

    const tagHTML = product.tag ? `
      <span class="absolute top-3 left-3 ${badgeColor} text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm z-10 animate-fade-in">${product.tag}</span>
    ` : '';

    return `
      <div class="product-card group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-fade-in" data-id="${product.id}">
        <div class="relative overflow-hidden aspect-[4/5] bg-pink-50/50">
          <img src="${product.images[0]}" alt="${product.name}"
               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          ${tagHTML}
          <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div class="bg-white text-primary p-4 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <i data-lucide="eye" class="w-5 h-5"></i>
            </div>
          </div>
        </div>
        <div class="p-5">
          <span class="text-[10px] uppercase font-bold text-primary/70 tracking-wider">${product.category}</span>
          <h3 class="font-bold text-gray-800 text-base mt-1 mb-1.5 group-hover:text-primary transition-colors truncate">${product.name}</h3>
          <p class="text-primary font-extrabold text-sm md:text-base">${product.priceRange}</p>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();

  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      openProductModal(card.dataset.id);
    });
  });
}

function setupModalEvents() {
  const modal = document.getElementById('product-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal || !closeBtn) return;

  closeBtn.addEventListener('click', closeProductModal);

  // Close modal when clicking on backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeProductModal();
    }
  });

  // Handle ESC key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden-modal')) {
      closeProductModal();
    }
  });
}

function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  currentProduct = product;
  
  const modal = document.getElementById('product-modal');
  const mainImg = document.getElementById('modal-main-img');
  const thumbsContainer = document.getElementById('modal-thumbnails');
  const title = document.getElementById('modal-title');
  const category = document.getElementById('modal-category');
  const tag = document.getElementById('modal-tag');
  const price = document.getElementById('modal-price');
  const desc = document.getElementById('modal-desc');
  const gradeContainer = document.getElementById('modal-grade-container');
  const sizeContainer = document.getElementById('modal-size-container');

  // Basic info
  title.textContent = product.name;
  category.textContent = product.category;
  
  if (product.tag) {
    tag.textContent = product.tag;
    tag.classList.remove('hidden');
    if (product.tag === 'Best Seller') {
      tag.className = 'text-xs font-semibold tracking-wider text-white bg-amber-500 px-2.5 py-1 rounded-full';
    } else if (product.tag === 'New Collection') {
      tag.className = 'text-xs font-semibold tracking-wider text-white bg-pink-600 px-2.5 py-1 rounded-full';
    } else {
      tag.className = 'text-xs font-semibold tracking-wider text-white bg-primary px-2.5 py-1 rounded-full';
    }
  } else {
    tag.classList.add('hidden');
  }

  desc.textContent = product.description;

  // Setup Gallery
  mainImg.src = product.images[0];
  mainImg.alt = product.name;

  thumbsContainer.innerHTML = '';
  if (product.images.length > 1) {
    thumbsContainer.classList.remove('hidden');
    product.images.forEach((imgSrc, idx) => {
      const thumb = document.createElement('button');
      thumb.className = `w-14 h-14 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${idx === 0 ? 'border-primary scale-95 shadow-md' : 'border-pink-100 hover:border-pink-300'}`;
      thumb.innerHTML = `<img src="${imgSrc}" class="w-full h-full object-cover" alt="Thumbnail ${idx + 1}" />`;
      
      const selectThumb = () => {
        mainImg.src = imgSrc;
        thumbsContainer.querySelectorAll('button').forEach((btn, bIdx) => {
          btn.className = `w-14 h-14 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${bIdx === idx ? 'border-primary scale-95 shadow-md' : 'border-pink-100 hover:border-pink-300'}`;
        });
      };

      thumb.addEventListener('click', selectThumb);
      thumb.addEventListener('mouseenter', selectThumb);
      thumbsContainer.appendChild(thumb);
    });
  } else {
    thumbsContainer.classList.add('hidden');
  }

  // Setup Variables
  if (product.isVariable) {
    gradeContainer.classList.remove('hidden');
    sizeContainer.classList.remove('hidden');

    // Default choices
    selectedGrade = product.grades[0].id;
    selectedSize = product.sizes[0].id;

    // Render Grades
    renderGradeSelectors();
    // Render Sizes
    renderSizeSelectors();
  } else {
    gradeContainer.classList.add('hidden');
    sizeContainer.classList.add('hidden');
    selectedGrade = null;
    selectedSize = null;
  }

  // Update dynamic values (Price and WhatsApp href)
  updateModalPriceAndLink();

  // Show Modal
  modal.classList.remove('hidden-modal');
  modal.classList.add('show-modal');
  document.body.classList.add('overflow-hidden');
  
  // Re-run Lucide inside modal
  lucide.createIcons();
}

function renderGradeSelectors() {
  const container = document.getElementById('modal-grades');
  const gradeDesc = document.getElementById('modal-grade-desc');
  if (!container || !currentProduct) return;

  container.innerHTML = currentProduct.grades.map(grade => {
    const isActive = grade.id === selectedGrade;
    return `
      <button class="btn-grade px-4 py-2 rounded-xl text-xs font-semibold ${isActive ? 'active' : 'text-gray-600 bg-white'}" data-grade="${grade.id}">
        ${grade.name}
      </button>
    `;
  }).join('');

  // Material text desc
  const currentGradeObj = currentProduct.grades.find(g => g.id === selectedGrade);
  if (currentGradeObj) {
    gradeDesc.innerHTML = `<span class="font-semibold text-primary">Bahan:</span> ${currentGradeObj.material}`;
  }

  // Bind click
  container.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedGrade = btn.dataset.grade;
      renderGradeSelectors();
      updateModalPriceAndLink();
    });
  });
}

function renderSizeSelectors() {
  const container = document.getElementById('modal-sizes');
  if (!container || !currentProduct) return;

  container.innerHTML = currentProduct.sizes.map(size => {
    const isActive = size.id === selectedSize;
    return `
      <button class="btn-size px-4 py-2 rounded-xl text-xs font-semibold ${isActive ? 'active' : 'text-gray-600 bg-white'}" data-size="${size.id}">
        ${size.id}
      </button>
    `;
  }).join('');

  // Bind click
  container.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedSize = btn.dataset.size;
      renderSizeSelectors();
      updateModalPriceAndLink();
    });
  });
}

function formatPrice(number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
}

function updateModalPriceAndLink() {
  const priceLabel = document.getElementById('modal-price');
  const waBtn = document.getElementById('modal-wa-btn');
  if (!currentProduct || !priceLabel || !waBtn) return;

  let finalPriceText = '';
  let whatsappMsg = '';

  if (currentProduct.isVariable) {
    const rawPrice = currentProduct.pricing[selectedGrade][selectedSize];
    finalPriceText = formatPrice(rawPrice);

    const gradeObj = currentProduct.grades.find(g => g.id === selectedGrade);
    const sizeObj = currentProduct.sizes.find(s => s.id === selectedSize);

    whatsappMsg = `Halo Achahijab, saya ingin memesan produk berikut:

Nama Produk: ${currentProduct.name}
Grade: ${gradeObj.name} (${gradeObj.material})
Ukuran: ${sizeObj.label}
Harga: ${finalPriceText}

Mohon informasi ketersediaan stok dan kelanjutan pemesanannya. Terima kasih!`;
  } else {
    finalPriceText = currentProduct.priceRange;
    whatsappMsg = `Halo Achahijab, saya ingin memesan produk berikut:

Nama Produk: ${currentProduct.name}
Harga: ${finalPriceText}

Mohon informasi ketersediaan stok dan kelanjutan pemesanannya. Terima kasih!`;
  }

  priceLabel.textContent = finalPriceText;

  const waPhone = '6282129298920';
  const encodedText = encodeURIComponent(whatsappMsg);
  waBtn.href = `https://wa.me/${waPhone}?text=${encodedText}`;
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (!modal) return;

  modal.classList.add('hidden-modal');
  modal.classList.remove('show-modal');
  document.body.classList.remove('overflow-hidden');
  currentProduct = null;
}
