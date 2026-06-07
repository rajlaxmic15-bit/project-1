// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
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
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
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
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal-on-scroll');
    observer.observe(section);
});

// Compound Interest Calculator
let compoundChart = null;

function formatINR(amount) {
    return '₹' + Math.round(amount).toLocaleString('en-IN');
}

function calculateCompound() {
    const monthlyInvestment = parseFloat(document.getElementById('monthlyInvestment').value);
    const returnRate = parseFloat(document.getElementById('expectedReturn').value);
    const years = parseInt(document.getElementById('timePeriod').value);
    
    const months = years * 12;
    const monthlyRate = returnRate / 12 / 100;
    
    // Future Value of SIP: P * [((1+r)^n - 1) / r] * (1+r)
    const futureValue = monthlyInvestment * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const totalInvestment = monthlyInvestment * months;
    const expectedReturns = futureValue - totalInvestment;
    
    // Update Display Values
    const monthlyVal = document.getElementById('monthlyVal');
    const returnVal = document.getElementById('returnVal');
    const yearsVal = document.getElementById('yearsVal');

    if (monthlyVal) monthlyVal.textContent = formatINR(monthlyInvestment);
    if (returnVal) returnVal.textContent = returnRate + '%';
    if (yearsVal) yearsVal.textContent = years + (years === 1 ? ' Year' : ' Years');
    
    // Update Result Cards
    const totalInvestedEl = document.getElementById('totalInvestment');
    const totalReturnsEl = document.getElementById('expectedReturns');
    const totalValueEl = document.getElementById('totalValue');

    if (totalInvestedEl) totalInvestedEl.textContent = formatINR(totalInvestment);
    if (totalReturnsEl) totalReturnsEl.textContent = formatINR(expectedReturns);
    if (totalValueEl) totalValueEl.textContent = formatINR(futureValue);
    
    updateDoughnutChart(totalInvestment, expectedReturns);
}

function updateDoughnutChart(invested, returns) {
    const canvas = document.getElementById('compoundChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (compoundChart) compoundChart.destroy();
    
    compoundChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Invested Amount', 'Estimated Returns'],
            datasets: [{
                data: [invested, returns],
                backgroundColor: ['#002147', '#FFC107'],
                borderWidth: 0,
                hoverOffset: 12
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            family: 'Plus Jakarta Sans',
                            weight: '700'
                        }
                    }
                }
            },
            cutout: '75%'
        }
    });
}

// Investor Trends Line Chart
function initTrendsChart() {
    const canvas = document.getElementById('investorGrowthChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'Market Participation (Millions)',
                data: [40, 55, 72, 90, 115, 142],
                borderColor: '#002147',
                backgroundColor: 'rgba(0, 33, 71, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointBackgroundColor: '#FFC107',
                pointBorderColor: '#002147',
                pointBorderWidth: 2,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: {
                        font: { family: 'Plus Jakarta Sans', weight: '600' }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        font: { family: 'Plus Jakarta Sans', weight: '600' }
                    }
                }
            }
        }
    });
}

// Event Listeners for Calculator
const inputs = ['monthlyInvestment', 'expectedReturn', 'timePeriod'];
inputs.forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculateCompound);
});

// Initialize on load
window.addEventListener('load', () => {
    calculateCompound();
    initTrendsChart();
});

// CSS for reveal on scroll (adding via JS to ensure sections are initially hidden)
const style = document.createElement('style');
style.textContent = `
    .reveal-on-scroll {
        opacity: 0;
        transform: translateY(40px);
        transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    .reveal-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
