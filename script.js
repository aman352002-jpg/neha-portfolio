document.addEventListener('DOMContentLoaded', () => {
    // Navigation Logic
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            if(navMenu.classList.contains('active')) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '80px';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = 'white';
                navMenu.style.padding = '2rem';
                navMenu.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            } else {
                navMenu.style.display = '';
            }
        });
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;
        revealElements.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Stats Counter
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const counter = entry.target;
                const text = counter.innerText;
                const target = parseFloat(text.replace(/[^0-9.]/g, ''));
                const suffix = text.replace(/[0-9.]/g, '');
                let count = 0;
                const updateCount = () => {
                    count += target / 50; 
                    if (count < target) {
                        counter.innerHTML = Math.ceil(count) + '<span>' + suffix + '</span>';
                        setTimeout(updateCount, 40);
                    } else {
                        counter.innerHTML = target + '<span>' + suffix + '</span>';
                    }
                };
                counter.classList.add('counted');
                updateCount();
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => observer.observe(counter));

    // Chart.js Config (Only runs if canvas exists)
    const chartConfig = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { grid: { color: '#f3f4f6' }, beginAtZero: true },
            x: { grid: { display: false } }
        }
    };

    if(document.getElementById('keywordChart')) {
        new Chart(document.getElementById('keywordChart'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Keywords',
                    data: [15, 35, 60, 90, 120, 150],
                    borderColor: '#2563eb',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(37, 99, 235, 0.1)'
                }]
            },
            options: chartConfig
        });
        new Chart(document.getElementById('trafficChart'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Traffic',
                    data: [2000, 3500, 5000, 8000, 10500, 12000],
                    backgroundColor: '#0f172a',
                    borderRadius: 4
                }]
            },
            options: chartConfig
        });
    }

    if(document.getElementById('socialChart')) {
        new Chart(document.getElementById('socialChart'), {
            type: 'line',
            data: {
                labels: ['W1', 'W2', 'W3', 'W4', 'W5'],
                datasets: [{
                    label: 'Engagement',
                    data: [500, 1200, 1900, 2400, 3200],
                    borderColor: '#2563eb',
                    tension: 0.4,
                    borderWidth: 3,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#2563eb'
                }]
            },
            options: { ...chartConfig, plugins: { legend: { display: true } } }
        });
    }
});