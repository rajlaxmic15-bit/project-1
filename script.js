// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// =============================================
// OLD CINEMATIC PARALLAX CODE - DISABLED FOR FROSTED GLASS DESIGN
// =============================================
/*
const hero = document.querySelector('.hero');
const heroBackground = document.getElementById('heroBackground');
const heroMidLayer   = document.getElementById('heroMidLayer');
const heroFgLayer    = document.getElementById('heroFgLayer');
const heroText       = document.getElementById('heroText');

if (hero && heroBackground) {
    // Smoothed mouse position
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let scrollY = 0;

    // Custom magnetic cursor
    const cursor = document.createElement('div');
    cursor.className = 'hero-cursor';
    cursor.style.display = 'none';
    document.body.appendChild(cursor);

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        // Normalised -0.5 → 0.5
        targetX = (e.clientX - rect.left  - rect.width  / 2) / rect.width;
        targetY = (e.clientY - rect.top   - rect.height / 2) / rect.height;

        cursor.style.display = 'block';
        cursor.style.left = (e.clientX - 15) + 'px';
        cursor.style.top  = (e.clientY - 15) + 'px';
        cursor.style.transform = 'scale(' + (1 + Math.abs(targetX) * 0.4) + ')';
    });

    hero.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
    });

    hero.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
        cursor.style.display = 'none';
    });

    window.addEventListener('scroll', () => {
        scrollY = window.pageYOffset;
    });

    function animateCinematicParallax() {
        // Smooth lerp towards target
        const ease = 0.06;
        currentX += (targetX - currentX) * ease;
        currentY += (targetY - currentY) * ease;

        const scrollOffset = scrollY * 0.28;

        // ── LAYER 0: Background — moves the LEAST (farthest away)
        const bg_x = currentX * 18;
        const bg_y = currentY * 18;
        const bg_rotX =  currentY * 4;
        const bg_rotY = -currentX * 4;
        // Deep-focus: blur increases toward edges
        const edgeDist = Math.sqrt(currentX * currentX + currentY * currentY);
        const focusBlur = Math.min(edgeDist * 8, 7);
        heroBackground.style.transform =
            `translateX(${bg_x}px) translateY(${bg_y + scrollOffset}px) rotateX(${bg_rotX}deg) rotateY(${bg_rotY}deg) scale(1.06)`;
        heroBackground.style.filter =
            `contrast(1.15) brightness(${0.85 - edgeDist * 0.12}) saturate(1.15) blur(${focusBlur}px)`;

        // ── LAYER 1: Mid layer — moves at medium speed
        const mid_x = currentX * 34;
        const mid_y = currentY * 34;
        if (heroMidLayer) {
            heroMidLayer.style.transform =
                `translateX(${mid_x}px) translateY(${mid_y + scrollOffset * 0.6}px) scale(1.06)`;
            heroMidLayer.style.opacity = 0.25 + edgeDist * 0.3;
        }

        // ── LAYER 2: Foreground vignette — moves the MOST (closest)
        const fg_x = currentX * 55;
        const fg_y = currentY * 55;
        if (heroFgLayer) {
            heroFgLayer.style.transform =
                `translateX(${fg_x}px) translateY(${fg_y + scrollOffset * 0.25}px)`;
        }

        // ── LAYER 3: Hero text — opposite direction, floats forward
        if (heroText) {
            const text_x = -currentX * 22;
            const text_y = -currentY * 22;
            const text_rotX = -currentY * 6;
            const text_rotY =  currentX * 6;
            heroText.style.transform =
                `perspective(1200px) translateX(${text_x}px) translateY(${text_y}px) rotateX(${text_rotX}deg) rotateY(${text_rotY}deg) translateZ(60px)`;
        }

        requestAnimationFrame(animateCinematicParallax);
    }

    animateCinematicParallax();
}
*/

// =============================================
// OLD FLOATING PARTICLES CODE - DISABLED FOR FROSTED GLASS DESIGN
// =============================================
/*
const heroParticles = document.getElementById('heroParticles');

if (heroParticles) {
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation duration
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = duration + 's';
        
        // Random delay
        const delay = Math.random() * 5;
        particle.style.animationDelay = delay + 's';
        
        heroParticles.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, (duration + delay) * 1000);
    }
    
    // Create particles periodically
    for (let i = 0; i < 30; i++) {
        setTimeout(() => createParticle(), i * 500);
    }
    
    // Continue creating particles
    setInterval(() => createParticle(), 1500);
}
*/

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for all anchor links
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            entry.target.style.filter = 'blur(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section:not(.hero)').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(60px)';
    section.style.filter = 'blur(10px)';
    section.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(section);
});

// Observe service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px) scale(0.95)';
    card.style.filter = 'blur(5px)';
    card.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
    observer.observe(card);
});

// Observe testimonial cards
document.querySelectorAll('.testimonial-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px) scale(0.95)';
    card.style.filter = 'blur(5px)';
    card.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
    observer.observe(card);
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        console.log('Newsletter subscription:', email);
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Observe stat numbers
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const text = entry.target.textContent;
            const number = parseInt(text.match(/\d+/)?.[0] || 0);
            if (number > 0) {
                entry.target.textContent = '0';
                setTimeout(() => {
                    animateCounter(entry.target, number);
                    // Add back the suffix after animation
                    setTimeout(() => {
                        if (text.includes('+')) {
                            entry.target.textContent = number + '+';
                        }
                        if (text.includes('Cr')) {
                            entry.target.textContent = '₹' + number + 'Cr+';
                        }
                    }, 2100);
                }, 200);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statObserver.observe(stat);
});


// Compound Interest Calculator
let compoundChart = null;

function calculateCompound() {
    const monthlyInvestment = parseFloat(document.getElementById('monthlyInvestment').value);
    const returnRate = parseFloat(document.getElementById('expectedReturn').value);
    const years = parseInt(document.getElementById('timePeriod').value);
    
    const months = years * 12;
    const monthlyRate = returnRate / 12 / 100;
    
    // Calculate future value of SIP
    const futureValue = monthlyInvestment * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const totalInvestment = monthlyInvestment * months;
    const expectedReturns = futureValue - totalInvestment;
    
    // Update result cards
    document.getElementById('totalInvestment').textContent = '₹' + totalInvestment.toLocaleString('en-IN', {maximumFractionDigits: 0});
    document.getElementById('expectedReturns').textContent = '₹' + expectedReturns.toLocaleString('en-IN', {maximumFractionDigits: 0});
    document.getElementById('totalValue').textContent = '₹' + futureValue.toLocaleString('en-IN', {maximumFractionDigits: 0});
    
    // Generate chart data
    const chartData = generateChartData(monthlyInvestment, returnRate, years);
    updateCompoundChart(chartData);
}

function generateChartData(monthly, rate, years) {
    const data = [];
    const investmentData = [];
    const valueData = [];
    
    for (let year = 1; year <= years; year++) {
        const months = year * 12;
        const monthlyRate = rate / 12 / 100;
        const futureValue = monthly * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
        const invested = monthly * months;
        
        data.push('Year ' + year);
        investmentData.push(invested);
        valueData.push(futureValue);
    }
    
    return { labels: data, investment: investmentData, value: valueData };
}

function updateCompoundChart(data) {
    const ctx = document.getElementById('compoundChart').getContext('2d');
    
    if (compoundChart) {
        compoundChart.destroy();
    }
    
    compoundChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Total Investment',
                    data: data.investment,
                    borderColor: '#1a5490',
                    backgroundColor: 'rgba(26, 84, 144, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Total Value',
                    data: data.value,
                    borderColor: '#ff6b35',
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ₹' + context.parsed.y.toLocaleString('en-IN');
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + (value / 100000).toFixed(1) + 'L';
                        }
                    }
                }
            }
        }
    });
}

// Input event listeners for calculator
document.getElementById('monthlyInvestment')?.addEventListener('input', function(e) {
    e.target.nextElementSibling.textContent = '₹' + parseInt(e.target.value).toLocaleString('en-IN');
});

document.getElementById('expectedReturn')?.addEventListener('input', function(e) {
    e.target.nextElementSibling.textContent = e.target.value + '%';
});

document.getElementById('timePeriod')?.addEventListener('input', function(e) {
    const value = e.target.value;
    e.target.nextElementSibling.textContent = value + (value == 1 ? ' Year' : ' Years');
});

// Initialize calculator on page load
window.addEventListener('load', function() {
    if (document.getElementById('compoundChart')) {
        calculateCompound();
    }
    
    // Initialize Investor Growth Chart
    if (document.getElementById('investorGrowthChart')) {
        initInvestorGrowthChart();
    }
});

// Investor Growth Chart
function initInvestorGrowthChart() {
    const ctx = document.getElementById('investorGrowthChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'Investors (in Millions)',
                data: [35, 40, 48, 58, 72, 89, 105, 125],
                backgroundColor: [
                    'rgba(26, 84, 144, 0.8)',
                    'rgba(26, 84, 144, 0.8)',
                    'rgba(26, 84, 144, 0.8)',
                    'rgba(26, 84, 144, 0.8)',
                    'rgba(26, 84, 144, 0.8)',
                    'rgba(26, 84, 144, 0.8)',
                    'rgba(255, 107, 53, 0.8)',
                    'rgba(255, 107, 53, 0.9)'
                ],
                borderColor: [
                    '#1a5490',
                    '#1a5490',
                    '#1a5490',
                    '#1a5490',
                    '#1a5490',
                    '#1a5490',
                    '#ff6b35',
                    '#ff6b35'
                ],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + ' Million Investors';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + 'M';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}


// YouTube Video Player
document.querySelectorAll('.youtube-thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        const videoId = this.getAttribute('data-video-id');
        const iframe = document.createElement('iframe');
        
        iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        
        // Clear thumbnail content and add iframe
        this.innerHTML = '';
        this.appendChild(iframe);
    });
});

// 3D Tilt Effect for Service Cards
document.querySelectorAll('.service-card, .learning-card, .why-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        card.style.transition = 'none';
        card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'all 0.5s ease';
        card.style.zIndex = '1';
    });
});

