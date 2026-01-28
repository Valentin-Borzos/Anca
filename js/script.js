// ===== BEBE PNG BUBBLE - COMPLET INDEPENDENT =====
(function() {
    // Așteaptă 20 secunde după încărcare, apoi afișează bula
    setTimeout(function startBebeBubble() {
        const container = document.getElementById('bebeBubbleContainer');
        const img = document.getElementById('bebeBubble');
        
        if (!container || !img) {
            console.log('Bebe bubble elements not found');
            return;
        }
        
        // Afișează bula
        container.style.display = 'block';
        console.log('Bebe bubble appeared!');
        
        // La click, dispare cu flori care zboară în toate direcțiile
        img.onclick = function() {
            // Creează 25 de emoticoane floarea-soarelui care zboară în toate direcțiile
            for (let i = 0; i < 25; i++) {
                const emoji = document.createElement('span');
                emoji.textContent = '🌻';
                // Direcție randomă în toate direcțiile
                const angle = Math.random() * Math.PI * 2;
                const distance = 150 + Math.random() * 200;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                
                emoji.style.cssText = `
                    position: absolute;
                    font-size: ${20 + Math.random() * 15}px;
                    left: 50px;
                    top: 50px;
                    pointer-events: none;
                    z-index: 1000;
                    --tx: ${tx}px;
                    --ty: ${ty}px;
                    animation: sunflowerFly ${0.8 + Math.random() * 0.6}s ease-out forwards;
                    animation-delay: ${Math.random() * 0.15}s;
                `;
                container.appendChild(emoji);
                setTimeout(() => emoji.remove(), 1800);
            }
            
            // Ascunde imaginea
            img.style.opacity = '0';
            img.style.transform = 'scale(0.3)';
            
            setTimeout(() => {
                container.style.display = 'none';
                img.style.opacity = '1';
                img.style.transform = '';
            }, 500);
            
            // Reapare după 27 secunde
            setTimeout(() => {
                container.style.display = 'block';
            }, 27000);
        };
    }, 20000); // 20 secunde după încărcarea paginii
})();
/* ============================================
   💉 DR. ANCA - Script Interactiv
   Site Medical-Romantic Valentine's Day 2026
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initIntroPage();
    initPreloader();
    initFloatingHearts();
    initTypedDiagnosis();
    initEKG();
    initTimelineAnimation();
    initGalleryLightbox();
    initMagicButton();
    initBPMCounter();
    initMicroscope();
    initLabAnimations();
    initSurgeryGame();
    initAlbum();
});

/* ===== INTRO PAGE WITH ENVELOPE ===== */
function initIntroPage() {
    const introPage = document.getElementById('introPage');
    const envelope = document.getElementById('envelope');
    const envelopeFlap = document.getElementById('envelopeFlap');
    const loveLetter = document.getElementById('loveLetter');
    const clickInstruction = document.getElementById('clickInstruction');
    const enterSiteBtn = document.getElementById('enterSiteBtn');
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('mainContent');
    
    let envelopeOpened = false;
    let fontsLoaded = false;
    
    // Așteaptă încărcarea fonturilor pentru a evita FOUC (Flash of Unstyled Content)
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            fontsLoaded = true;
            console.log('Fonts loaded successfully');
        }).catch(() => {
            // Fallback: dacă fonturile nu se încarcă în 3 secunde, permite oricum interacțiunea
            fontsLoaded = true;
        });
    }
    
    // Fallback timeout pentru dispozitive mai lente
    setTimeout(() => {
        fontsLoaded = true;
    }, 3000);
    
    // Envelope click to open
    envelope.addEventListener('click', (e) => {
        if (!envelopeOpened && !e.target.closest('.enter-site-btn')) {
            // Așteaptă fonturile să se încarce
            if (!fontsLoaded) {
                console.log('Waiting for fonts to load...');
                const checkFonts = setInterval(() => {
                    if (fontsLoaded) {
                        clearInterval(checkFonts);
                        openEnvelope();
                    }
                }, 100);
                // Timeout fallback de 2 secunde
                setTimeout(() => {
                    clearInterval(checkFonts);
                    if (!envelopeOpened) openEnvelope();
                }, 2000);
            } else {
                openEnvelope();
            }
        }
        
        function openEnvelope() {
            console.log('Opening envelope...');
            envelope.classList.add('opened');
            clickInstruction.classList.add('hidden');
            envelopeOpened = true;
            
            // Pornește muzica de fundal
            const bgMusic = document.getElementById('bgMusic');
            if (bgMusic) {
                bgMusic.volume = 0.08;
                bgMusic.play().catch(function(e) {
                    console.log('Audio play failed:', e);
                });
            }
            
            // Force letter to appear
            setTimeout(() => {
                if (loveLetter) {
                    loveLetter.style.opacity = '1';
                    loveLetter.style.transform = 'translateY(-10%) scale(1) rotate(0deg)';
                    loveLetter.style.pointerEvents = 'all';
                }
            }, 400);
        }
    });
    
    // Ripple effect on click
    if (enterSiteBtn) {
        enterSiteBtn.addEventListener('click', (e) => {
            // Ripple
            const rect = enterSiteBtn.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
            enterSiteBtn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);

            e.stopPropagation();
            console.log('Entering site...');

            // Fade out intro page
            introPage.classList.add('fade-out');

            setTimeout(() => {
                introPage.style.display = 'none';
                if (preloader) {
                    preloader.classList.remove('hidden');
                    preloader.style.display = 'flex';
                }

                // Start the normal preloader sequence
                setTimeout(() => {
                    if (preloader) preloader.classList.add('hidden');
                    if (mainContent) {
                        mainContent.classList.remove('hidden');
                        mainContent.style.display = 'block';
                    }
                }, 2500);
            }, 800);
        });
    }
}

/* ===== PRELOADER ===== */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 2500);
    });
}

/* ===== FLOATING HEARTS ===== */
function initFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    if (!container) return;
    
    const sunflowers = ['🌻', '🌻', '🌻', '☀️', '🌼', '🌻', '✨', '🌻'];
    
    function createHeart() {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = sunflowers[Math.floor(Math.random() * sunflowers.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) heart.remove();
        }, 5000);
    }
    
    // Create hearts continuously
    setInterval(createHeart, 800);
    
    // Create initial batch
    for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 200);
    }
}

/* ===== TYPED DIAGNOSIS ===== */
function initTypedDiagnosis() {
    const element = document.querySelector('.typed-diagnosis');
    const cursor = document.querySelector('.typing-cursor');
    const text = "Sindrom sever de îndrăgostire de Dr. Anca 💕";
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.textContent = text.substring(0, index + 1);
            index++;
            setTimeout(type, 70);
        } else {
            // Blink cursor at the end
            cursor.style.display = 'inline-block';
        }
    }
    
    // Start typing after preloader
    setTimeout(type, 3000);
}

/* ===== EKG ANIMATION ===== */
function initEKG() {
    const svg = document.getElementById('ekgSvg');
    const line = document.getElementById('ekgLine');
    const heart = document.getElementById('ekgHeart');
    
    if (!svg || !line) return;
    
    const width = 1000;
    const height = 200;
    const midY = height / 2;
    
    let points = [];
    let offset = 0;
    
    // Generate EKG pattern
    function generateEKGPattern(startX) {
        const pattern = [];
        let x = startX;
        
        // Flat line
        for (let i = 0; i < 50; i++) {
            pattern.push({ x: x++, y: midY });
        }
        
        // P wave
        for (let i = 0; i < 20; i++) {
            const y = midY - Math.sin(i / 20 * Math.PI) * 15;
            pattern.push({ x: x++, y });
        }
        
        // Flat
        for (let i = 0; i < 10; i++) {
            pattern.push({ x: x++, y: midY });
        }
        
        // QRS complex
        pattern.push({ x: x++, y: midY });
        pattern.push({ x: x++, y: midY + 10 }); // Q
        pattern.push({ x: x++, y: midY - 80 }); // R (tall spike)
        pattern.push({ x: x++, y: midY + 30 }); // S
        pattern.push({ x: x++, y: midY });
        
        // Flat
        for (let i = 0; i < 15; i++) {
            pattern.push({ x: x++, y: midY });
        }
        
        // T wave
        for (let i = 0; i < 30; i++) {
            const y = midY - Math.sin(i / 30 * Math.PI) * 25;
            pattern.push({ x: x++, y });
        }
        
        // Flat to end
        for (let i = 0; i < 30; i++) {
            pattern.push({ x: x++, y: midY });
        }
        
        return pattern;
    }
    
    function animate() {
        // Clear and regenerate
        points = [];
        
        // Generate multiple heartbeats
        for (let i = -1; i < 6; i++) {
            const pattern = generateEKGPattern(i * 180 - offset);
            points = points.concat(pattern);
        }
        
        // Filter visible points
        const visiblePoints = points.filter(p => p.x >= 0 && p.x <= width);
        
        // Convert to SVG points string
        const pointsStr = visiblePoints.map(p => `${p.x},${p.y}`).join(' ');
        line.setAttribute('points', pointsStr);
        
        // Animate heart on R wave
        const heartbeatInterval = 180;
        if (offset % heartbeatInterval < 5) {
            heart.style.transform = 'translateY(-50%) scale(1.3)';
            setTimeout(() => {
                heart.style.transform = 'translateY(-50%) scale(1)';
            }, 150);
        }
        
        offset = (offset + 2) % 180;
        requestAnimationFrame(animate);
    }
    
    animate();
}

/* ===== BPM COUNTER ===== */
function initBPMCounter() {
    const bpmElement = document.getElementById('bpmValue');
    const butterfliesElement = document.getElementById('butterfliesValue');
    
    if (!bpmElement) return;
    
    // Fluctuating BPM
    setInterval(() => {
        const baseBPM = 120;
        const variation = Math.floor(Math.random() * 20) - 5;
        bpmElement.textContent = baseBPM + variation;
    }, 1000);
    
    // Increasing butterflies
    let butterflies = 999;
    setInterval(() => {
        butterflies += Math.floor(Math.random() * 10);
        if (butterfliesElement) {
            butterfliesElement.textContent = butterflies + '+';
        }
    }, 2000);
}

/* ===== TIMELINE ANIMATION ===== */
function initTimelineAnimation() {
    const entries = document.querySelectorAll('.timeline-entry');
    
    const observer = new IntersectionObserver((observedEntries) => {
        observedEntries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px'
    });
    
    entries.forEach(entry => {
        observer.observe(entry);
    });
}

/* ===== GALLERY LIGHTBOX ===== */
function initGalleryLightbox() {
    const xrayItems = document.querySelectorAll('.xray-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.querySelector('.lightbox-close');
    
    xrayItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.dataset.caption;
            
            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption;
            lightbox.classList.remove('hidden');
        });
    });
    
    closeBtn.addEventListener('click', () => {
        lightbox.classList.add('hidden');
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add('hidden');
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightbox.classList.add('hidden');
        }
    });
}

/* ===== MAGIC BUTTON ===== */
function initMagicButton() {
    const magicBtn = document.getElementById('magicBtn');
    const explosion = document.getElementById('loveExplosion');
    
    if (!magicBtn) return;
    
    const items = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '🩷', '💉', '💊', '🩺', '✨', '🌟', '🫀'];
    let isExploding = false;
    
    magicBtn.addEventListener('click', () => {
        if (isExploding) return;
        isExploding = true;
        
        // Create massive explosion
        for (let wave = 0; wave < 5; wave++) {
            setTimeout(() => {
                for (let i = 0; i < 30; i++) {
                    setTimeout(() => {
                        const item = document.createElement('span');
                        item.className = 'explosion-item';
                        item.textContent = items[Math.floor(Math.random() * items.length)];
                        item.style.left = Math.random() * 100 + '%';
                        item.style.bottom = '0';
                        item.style.fontSize = (Math.random() * 30 + 20) + 'px';
                        item.style.animationDuration = (Math.random() * 2 + 2) + 's';
                        
                        explosion.appendChild(item);
                        
                        setTimeout(() => item.remove(), 4000);
                    }, i * 30);
                }
            }, wave * 400);
        }
        
        setTimeout(() => {
            isExploding = false;
        }, 3000);
    });
}

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

/* ===== MEDICINE ITEM HOVER SOUND EFFECT (Visual) ===== */
document.querySelectorAll('.medicine-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.boxShadow = '0 5px 20px rgba(255, 71, 87, 0.3)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.boxShadow = 'none';
    });
});

/* ===== JOKE CARDS ANIMATION ===== */
const jokeCards = document.querySelectorAll('.joke-card');

const jokeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1
});

jokeCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    jokeObserver.observe(card);
});

/* ===== X-RAY GALLERY ANIMATION ===== */
const xrayItems = document.querySelectorAll('.xray-item');

const xrayObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}, {
    threshold: 0.1
});

xrayItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    xrayObserver.observe(item);
});

/* ===== PRESCRIPTION PAPER TILT ===== */
const prescriptionPaper = document.querySelector('.prescription-paper');

if (prescriptionPaper) {
    prescriptionPaper.addEventListener('mousemove', (e) => {
        const rect = prescriptionPaper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 50;
        const rotateY = (centerX - x) / 50;
        
        prescriptionPaper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    prescriptionPaper.addEventListener('mouseleave', () => {
        prescriptionPaper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

/* ===== VITAL SIGNS PULSE ===== */
document.querySelectorAll('.vital-box').forEach(box => {
    setInterval(() => {
        box.style.boxShadow = '0 0 20px rgba(255, 71, 87, 0.5)';
        setTimeout(() => {
            box.style.boxShadow = 'none';
        }, 200);
    }, 2000 + Math.random() * 1000);
});

/* ===== CONSOLE EASTER EGG ===== */
console.log('%c💉 DIAGNOSTIC: Site-ul pentru Dr. Anca este gata! 💕', 
    'font-size: 20px; color: #FF4757; font-weight: bold;');
console.log('%c℞ Tratament: O viață întreagă de iubire!', 
    'font-size: 14px; color: #FF6B81;');
console.log('%c🏥 Spitalul Iubirii Eterne - Valentine\'s Day 2026', 
    'font-size: 12px; color: #00CEC9;');

/* ===== MICROSCOPE CELLS ===== */
function initMicroscope() {
    const container = document.getElementById('cellsContainer');
    if (!container) return;
    
    const cellEmojis = ['💕', '❤️', '💖', '💗', '🩷', '💓'];
    
    for (let i = 0; i < 12; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = cellEmojis[Math.floor(Math.random() * cellEmojis.length)];
        cell.style.left = Math.random() * 170 + 'px';
        cell.style.top = Math.random() * 170 + 'px';
        cell.style.animationDelay = Math.random() * 2 + 's';
        cell.style.fontSize = (Math.random() * 10 + 15) + 'px';
        cell.style.display = 'flex';
        cell.style.alignItems = 'center';
        cell.style.justifyContent = 'center';
        container.appendChild(cell);
    }
}

/* ===== LAB ANIMATIONS ===== */
function initLabAnimations() {
    const labItems = document.querySelectorAll('.lab-item');
    
    const labObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });
    
    labItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        labObserver.observe(item);
    });
}

/* ===== SURGERY GAME ===== */
function initSurgeryGame() {
    const tools = document.querySelectorAll('.tool-btn');
    const heart = document.getElementById('surgeryHeart');
    const message = document.getElementById('surgeryMessage');
    const healingFill = document.getElementById('healingFill');
    const healingPercent = document.getElementById('healingPercent');
    const status = document.getElementById('surgeryStatus');
    
    if (!tools.length || !heart) return;
    
    let healLevel = 0;
    
    const toolMessages = {
        syringe: ['💉 Injectez o doză de iubire pură!', '💉 Serul de adorație administrat!', '💉 Tratament cu ANCAMICINĂ aplicat!'],
        pill: ['💊 Vitamina ANCA absorbită!', '💊 Pastila fericirii înghițită!', '💊 Medicamentul iubirii funcționează!'],
        bandage: ['🩹 Pansament cu pupici aplicat!', '🩹 Rana vindecată cu dragoste!', '🩹 Bandaj magic pus!'],
        stethoscope: ['🩺 Bătăile inimii: AN-CA, AN-CA!', '🩺 Inima bate perfect pentru ea!', '🩺 Ritm cardiac: 100% îndrăgostit!'],
        kiss: ['💋 Tratament special administrat!', '💋 Cea mai dulce medicație!', '💋 Vindecarea e completă cu un sărut!']
    };
    
    const statusMessages = [
        'Pacientul răspunde la tratament! 💕',
        'Nivelul de iubire crește! 📈',
        'Simptomele de fericire apar! 😊',
        'Progres excelent! Continuă! 🌟',
        'Aproape vindecat de singurătate! 💖'
    ];
    
    tools.forEach(btn => {
        btn.addEventListener('click', () => {
            const tool = btn.dataset.tool;
            const msgs = toolMessages[tool];
            const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
            
            // Update message
            message.textContent = randomMsg;
            message.style.animation = 'none';
            message.offsetHeight; // Trigger reflow
            message.style.animation = 'fadeIn 0.5s ease';
            
            // Animate heart
            heart.classList.add('healed');
            setTimeout(() => heart.classList.remove('healed'), 500);
            
            // Increase heal level
            healLevel = Math.min(100, healLevel + 20);
            healingFill.style.width = healLevel + '%';
            healingPercent.textContent = healLevel + '%';
            
            // Update status
            const statusIndex = Math.floor(healLevel / 25);
            status.textContent = statusMessages[Math.min(statusIndex, statusMessages.length - 1)];
            
            // Complete message
            if (healLevel >= 100) {
                message.textContent = '🎉 VINDECARE COMPLETĂ! Inima e 100% a Ancăi! 💕';
                status.textContent = '✅ Operație reușită! Pacientul e fericit pentru totdeauna!';
                
                // Show completion message
                const completeMsg = document.getElementById('surgeryComplete');
                if (completeMsg) {
                    completeMsg.classList.remove('hidden');
                }
                
                // Reset after celebration
                setTimeout(() => {
                    healLevel = 0;
                    healingFill.style.width = '0%';
                    healingPercent.textContent = '0%';
                    message.textContent = 'Hai să o luăm de la capăt! 💕';
                    status.textContent = 'Așteptăm tratament...';
                    if (completeMsg) {
                        completeMsg.classList.add('hidden');
                    }
                }, 4000);
            }
        });
    });
}

/* ===== PARALLAX EFFECT ===== */
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Parallax on various elements
    const heroPhoto = document.querySelector('.photo-frame');
    if (heroPhoto && scrollY < window.innerHeight) {
        heroPhoto.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
});

/* ===== GLOW EFFECT ON SCROLL ===== */
const glowSections = document.querySelectorAll('section');

const glowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, { threshold: 0.1 });

glowSections.forEach(section => {
    glowObserver.observe(section);
});

/* ===== ALBUM FUNCTIONALITY ===== */
function initAlbum() {
    const albumCover = document.getElementById('albumCover');
    const albumPages = document.getElementById('albumPages');
    const pages = document.querySelectorAll('.album-page');
    const prevBtn = document.getElementById('albumPrev');
    const nextBtn = document.getElementById('albumNext');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');
    
    if (!albumCover || !albumPages) return;
    
    let currentPage = 0;
    let albumOpen = false;
    
    // Open album on cover click
    albumCover.addEventListener('click', () => {
        albumOpen = true;
        albumCover.style.display = 'none';
        albumPages.classList.remove('hidden');
        updatePage();
    });
    
    // Navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 0) {
                currentPage--;
                updatePage();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPage < pages.length - 1) {
                currentPage++;
                updatePage();
            }
        });
    }
    
    function updatePage() {
        pages.forEach((page, index) => {
            page.classList.remove('active');
            if (index === currentPage) {
                page.classList.add('active');
            }
        });
        
        if (currentPageSpan) {
            currentPageSpan.textContent = currentPage + 1;
        }
        if (totalPagesSpan) {
            totalPagesSpan.textContent = pages.length;
        }
        
        if (prevBtn) prevBtn.disabled = currentPage === 0;
        if (nextBtn) nextBtn.disabled = currentPage === pages.length - 1;
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!albumOpen) return;
        if (e.key === 'ArrowLeft' && currentPage > 0) {
            currentPage--;
            updatePage();
        }
        if (e.key === 'ArrowRight' && currentPage < pages.length - 1) {
            currentPage++;
            updatePage();
        }
    });
}

/* ===== ENHANCED LIGHTBOX WITH NAVIGATION ===== */
function initEnhancedLightbox() {
    const xrayItems = document.querySelectorAll('.xray-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const counter = document.querySelector('.lightbox-counter');
    
    if (!xrayItems.length || !lightbox) return;
    
    let currentIndex = 0;
    const images = Array.from(xrayItems);
    
    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightbox.classList.remove('hidden');
    }
    
    function updateLightbox() {
        const item = images[currentIndex];
        const img = item.querySelector('img');
        const caption = item.dataset.caption || '';
        
        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption;
        
        if (counter) {
            counter.textContent = `${currentIndex + 1} / ${images.length}`;
        }
    }
    
    xrayItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });
    
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightbox();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % images.length;
            updateLightbox();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('hidden')) return;
        
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightbox();
        }
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % images.length;
            updateLightbox();
        }
        if (e.key === 'Escape') {
            lightbox.classList.add('hidden');
        }
    });
}

/* ===== HERO STATS COUNTER ANIMATION ===== */
function initCounters() {
    const daysCounter = document.getElementById('daysCounter');
    const photosCounter = document.getElementById('photosCounter');
    const heartbeatsCounter = document.getElementById('heartbeatsCounter');
    
    function animateCounter(element, target, suffix = '', duration = 2000) {
        if (!element) return;
        
        let start = 0;
        const increment = target / (duration / 16);
        
        function update() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + suffix;
                requestAnimationFrame(update);
            } else {
                element.textContent = target + suffix;
            }
        }
        
        update();
    }
    
    // Start counters when hero section is visible
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(daysCounter, 529, '');
                    animateCounter(photosCounter, 50, '+');
                    animateCounter(heartbeatsCounter, 999, '+');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(heroSection);
    }
}

/* ===== CHAPTER GALLERY CLICKS ===== */
function initChapterGalleries() {
    const galleryImages = document.querySelectorAll('.chapter-gallery img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    if (!lightbox) return;
    
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxCaption.textContent = img.alt || 'Amintire frumoasă 💕';
            lightbox.classList.remove('hidden');
        });
    });
}

/* ===== VIDEO PLAY ON VISIBLE ===== */
function initVideoAutoplay() {
    const videos = document.querySelectorAll('.main-video');
    const bgMusic = document.getElementById('bgMusic');
    let isAnyVideoPlaying = false;
    
    // Detectează dacă este pe mobil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    function checkAndManageBackgroundMusic() {
        // Verifică dacă vreun video este în redare
        let hasPlayingVideo = false;
        videos.forEach(video => {
            if (!video.paused && !video.ended) {
                hasPlayingVideo = true;
            }
        });
        
        // Pe mobil, muzica se oprește automat când începe un video
        // Repornește muzica când nu mai este niciun video în redare
        if (!hasPlayingVideo && isAnyVideoPlaying && bgMusic) {
            // Așteaptă puțin pentru a fi sigur că nu mai începe alt video
            setTimeout(() => {
                if (bgMusic.paused) {
                    bgMusic.play().catch(e => console.log('Background music restart failed:', e));
                }
            }, isMobile ? 1000 : 300); // Mai mult timp de așteptare pe mobil
        }
        
        isAnyVideoPlaying = hasPlayingVideo;
    }
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play().catch(() => {});
            } else {
                entry.target.pause();
            }
        });
        
        // Verifică starea muzicii după orice schimbare
        setTimeout(checkAndManageBackgroundMusic, 100);
    }, { threshold: 0.5 });
    
    // Adaugă event listeners pentru fiecare video
    videos.forEach(video => {
        videoObserver.observe(video);
        
        // Event listeners pentru play, pause, și ended
        video.addEventListener('play', () => {
            isAnyVideoPlaying = true;
            
            // Pe mobil, muzica se oprește automat când începe video-ul
            if (isMobile && bgMusic && !bgMusic.paused) {
                console.log('Video started on mobile, background music will be paused by browser');
            }
        });
        
        video.addEventListener('pause', () => {
            setTimeout(checkAndManageBackgroundMusic, isMobile ? 500 : 100);
        });
        
        video.addEventListener('ended', () => {
            setTimeout(checkAndManageBackgroundMusic, isMobile ? 500 : 100);
        });
        
        // Listener pentru când video-ul își pierde focus-ul (ex: scroll away)
        video.addEventListener('blur', () => {
            setTimeout(checkAndManageBackgroundMusic, 200);
        });
        
        // Pe mobil, monitorizează mai atent când video-ul nu mai este vizibil
        if (isMobile) {
            video.addEventListener('volumechange', checkAndManageBackgroundMusic);
        }
    });
}

/* ===== SCROLL PROGRESS BAR ===== */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--heart-red), var(--heart-pink));
        z-index: 99999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

/* ===== TYPING EFFECT FOR QUOTES ===== */
function initQuoteTyping() {
    const quotes = document.querySelectorAll('.chapter-quote');
    
    quotes.forEach(quote => {
        const text = quote.textContent;
        quote.textContent = '';
        quote.dataset.fullText = text;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeText(quote, text);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(quote);
    });
    
    function typeText(element, text) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 30);
            }
        }
        type();
    }
}

/* ===== FLOATING BUBBLE ===== */
function initFloatingBubble() {
    const bubbleContainer = document.getElementById('bubbleContainer');
    const bubble = document.getElementById('floatingBubble');
    const poppedText = document.getElementById('bubblePoppedText');
    
    if (!bubbleContainer || !bubble || !poppedText) return;
    
    bubbleContainer.addEventListener('click', (e) => {
        // Get exact click position
        const clickX = e.clientX;
        const clickY = e.clientY;
        
        // Position the popped text at click location instantly
        poppedText.style.left = `${clickX}px`;
        poppedText.style.top = `${clickY}px`;
        poppedText.style.transform = 'translate(-50%, -50%) scale(0.5)';
        
        // Show popped text instantly
        poppedText.classList.remove('hidden');
        poppedText.classList.add('visible');
        
        // Add popping animation to bubble
        bubbleContainer.classList.add('popping');
        
        // Play pop sound effect (optional - creates a small audio context)
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.frequency.value = 400;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch(e) {
            // Audio not supported, continue without sound
        }
        
        // Hide bubble container after pop animation
        setTimeout(() => {
            bubbleContainer.style.display = 'none';
            // Hide text after 5 seconds
            setTimeout(() => {
                poppedText.classList.remove('visible');
                poppedText.classList.add('hidden');
            }, 5000);
            // Pornește timer pentru bula PNG
            if (window.showBebeBubble) {
                setTimeout(window.showBebeBubble, 15000);
            }
        }, 400);
    });
}

/* ===== GLOBAL BACKGROUND MUSIC MANAGEMENT ===== */
function initBackgroundMusicManager() {
    const bgMusic = document.getElementById('bgMusic');
    if (!bgMusic) return;
    
    let musicWasForcedStop = false;
    
    // Monitorizează când muzica se oprește neașteptat (de ex. din cauza video autoplay)
    bgMusic.addEventListener('pause', () => {
        // Verifică dacă muzica s-a oprit din cauza unui video
        const videos = document.querySelectorAll('.main-video');
        const hasPlayingVideo = Array.from(videos).some(video => !video.paused && !video.ended);
        
        if (!hasPlayingVideo && !musicWasForcedStop) {
            // Dacă nu este niciun video în redare și nu am oprit-o noi intenționat,
            // încearcă să o repornești după o mică pauză
            setTimeout(() => {
                if (bgMusic.paused && !musicWasForcedStop) {
                    bgMusic.play().catch(e => console.log('Background music auto-restart failed:', e));
                }
            }, 500);
        }
    });
    
    // Funcție globală pentru oprirea/pornirea muzicii
    window.toggleBackgroundMusic = function(forceStop = false) {
        musicWasForcedStop = forceStop;
        if (bgMusic.paused) {
            bgMusic.play().catch(e => console.log('Background music start failed:', e));
        } else {
            bgMusic.pause();
        }
    };
    
    // Verificare periodică pentru a se asigura că muzica rulează când trebuie
    setInterval(() => {
        if (!musicWasForcedStop && bgMusic.paused) {
            const videos = document.querySelectorAll('.main-video');
            const hasPlayingVideo = Array.from(videos).some(video => !video.paused && !video.ended);
            
            if (!hasPlayingVideo) {
                bgMusic.play().catch(e => console.log('Background music periodic restart failed:', e));
            }
        }
    }, 3000); // Verifică la fiecare 3 secunde
}

/* ===== INITIALIZE ALL NEW FUNCTIONS ===== */
document.addEventListener('DOMContentLoaded', () => {
    // Original functions already called in the first DOMContentLoaded
    
    // New functions
    initAlbum();
    initEnhancedLightbox();
    initCounters();
    initChapterGalleries();
    initVideoAutoplay();
    initScrollProgress();
    initFloatingBubble();
    initBackgroundMusicManager();
});

/* ===== CONSOLE MESSAGE ===== */
console.log('%c💉 Site-ul pentru Dr. Anca e gata! 💕', 'font-size: 16px; color: #FF4757; font-weight: bold;');
console.log('%c℞ Tratament: Te iubesc, Anca!', 'font-size: 12px; color: #FF6B81;');
