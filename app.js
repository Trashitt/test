// ============================================
// ECORALLY - SOCIAL WASTE MOVEMENT ENGINE
// ============================================

// === STATE ===
const State = {
    points: 2450,
    streak: 15,
    level: 18,
    xp: 7200,
    reports: 3,
    cleanups: 156,
    challenges: ['cleanmystreet']
};

// === PARTICLES ===
function initParticles() {
    const c = document.getElementById('particles');
    const ctx = c.getContext('2d');
    c.width = innerWidth; c.height = innerHeight;
    const particles = Array.from({ length: 60 }, () => ({
        x: Math.random() * c.width, y: Math.random() * c.height,
        s: Math.random() * 1.5 + 0.5, dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4, o: Math.random() * 0.3 + 0.05
    }));
    (function draw() {
        ctx.clearRect(0, 0, c.width, c.height);
        particles.forEach(p => {
            p.x += p.dx; p.y += p.dy;
            if (p.x < 0 || p.x > c.width) p.dx *= -1;
            if (p.y < 0 || p.y > c.height) p.dy *= -1;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,210,106,${p.o})`; ctx.fill();
        });
        for (let i = 0; i < particles.length; i++)
            for (let j = i + 1; j < particles.length; j++) {
                const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                if (d < 120) {
                    ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0,210,106,${0.04 * (1 - d / 120)})`;
                    ctx.lineWidth = 0.5; ctx.stroke();
                }
            }
        requestAnimationFrame(draw);
    })();
    addEventListener('resize', () => { c.width = innerWidth; c.height = innerHeight; });
}

// === NAVBAR ===
addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    nav.classList.toggle('scrolled', scrollY > 40);

    document.querySelectorAll('section[id]').forEach(sec => {
        const link = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
        if (link) {
            const top = sec.offsetTop - 100;
            if (scrollY >= top && scrollY < top + sec.offsetHeight) {
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
});

function toggleMobileMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// === COUNTERS ===
function initCounters() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const target = +e.target.dataset.target;
                let current = 0;
                const step = target / 80;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) { current = target; clearInterval(timer); }
                    e.target.textContent = Math.floor(current).toLocaleString();
                }, 20);
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('.counter').forEach(el => obs.observe(el));
}

// === CHALLENGES ===
function filterChallenges(btn, category) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.challenge-card').forEach(card => {
        if (category === 'all' || card.dataset.category?.includes(category)) {
            card.style.display = '';
            card.style.animation = 'fadeInUp 0.4s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

function joinChallenge(id) {
    if (State.challenges.includes(id)) {
        toast('You already joined this challenge! 🎯');
        return;
    }
    State.challenges.push(id);
    State.points += 25;
    updatePoints();
    toast(`🎉 Joined #${id}! +25 EP bonus!`);

    if (typeof confetti !== 'undefined') {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 }, colors: ['#00D26A', '#00B4D8', '#FFD700'] });
    }

    // Play sound
    playSound([523, 659, 784]);
}

function openCreateChallenge() {
    document.getElementById('createChallengeModal').classList.add('active');
}

function createChallenge() {
    State.points += 100;
    updatePoints();
    toast('🚀 Challenge created! +100 EP for leadership!');
    closeModal('createChallengeModal');
    if (typeof confetti !== 'undefined') {
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
    }
}

// === FEED ===
function likePost(btn) {
    btn.classList.toggle('liked');
    const icon = btn.querySelector('i');
    const count = btn.querySelector('span');
    if (btn.classList.contains('liked')) {
        icon.className = 'fas fa-heart';
        icon.style.color = '#FF4757';
        count.textContent = (parseInt(count.textContent.replace(/,/g, '')) + 1).toLocaleString();
        playSound([440]);
    } else {
        icon.className = 'far fa-heart';
        icon.style.color = '';
        count.textContent = (parseInt(count.textContent.replace(/,/g, '')) - 1).toLocaleString();
    }
}

function toggleComments(btn) {
    const post = btn.closest('.feed-post');
    const comments = post.querySelector('.post-comments-section');
    if (comments) {
        comments.style.display = comments.style.display === 'none' ? 'block' : 'none';
    }
}

function sharePost() {
    if (navigator.share) {
        navigator.share({ title: 'EcoRally', text: 'Check out this amazing cleanup! 🌍♻️', url: location.href });
    } else {
        navigator.clipboard?.writeText(location.href);
        toast('📋 Link copied to clipboard!');
    }
}

function nominatePost(btn) {
    State.points -= 10;
    updatePoints();
    btn.innerHTML = '<i class="fas fa-award" style="color:#FFC107"></i><span>Nominated!</span>';
    btn.disabled = true;
    toast('🏆 Post nominated for Best Cleanup Award! -10 EP');
}

function loadMorePosts() {
    toast('📸 Loading more stories...');
}

function openUploadModal() {
    document.getElementById('uploadModal').classList.add('active');
}

function selectUploadType(btn, type) {
    document.querySelectorAll('.upload-type').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function previewUpload(event, type) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        const preview = document.getElementById(type + 'Preview');
        const dropArea = event.target.closest('.drop-area');
        const img = document.createElement('img');
        img.src = e.target.result;
        dropArea.querySelector('i')?.remove();
        preview.innerHTML = '';
        preview.appendChild(img);
    };
    reader.readAsDataURL(file);
}

function submitPost() {
    State.points += 100;
    State.cleanups++;
    updatePoints();
    closeModal('uploadModal');
    toast('📸 Post submitted! +100 EP earned! AI verification in progress...');
    if (typeof confetti !== 'undefined') {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
    playSound([523, 659, 784, 1047]);

    setTimeout(() => toast('🤖 AI Verified your cleanup! Authenticity: 96%'), 3000);
}

// === BEFORE/AFTER SLIDER ===
function startSlide(e, sliderId) {
    e.preventDefault();
    const slider = document.getElementById(sliderId);
    const before = slider.querySelector('.ba-before');
    const handle = slider.querySelector('.ba-handle');
    const rect = slider.getBoundingClientRect();

    function onMove(ev) {
        const clientX = ev.touches ? ev.touches[0].clientX : ev.clientX;
        let x = ((clientX - rect.left) / rect.width) * 100;
        x = Math.max(5, Math.min(95, x));
        before.style.width = x + '%';
        handle.style.left = x + '%';
    }

    function onUp() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onUp);
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onUp);
}

// === REPORT SYSTEM ===
let currentStep = 1;

function nextReportStep(step) {
    document.querySelectorAll('.report-step-content').forEach(s => s.classList.remove('active'));
    document.getElementById('reportStep' + step).classList.add('active');

    document.querySelectorAll('.report-steps .step').forEach((s, i) => {
        s.classList.remove('active', 'completed');
        if (i + 1 < step) s.classList.add('completed');
        if (i + 1 === step) s.classList.add('active');
    });

    currentStep = step;
}

function prevReportStep(step) {
    nextReportStep(step);
}

function getGPSLocation() {
    if (navigator.geolocation) {
        toast('📍 Getting your location...');
        navigator.geolocation.getCurrentPosition(pos => {
            document.getElementById('locationInput').value =
                `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
            document.getElementById('mapLabel').textContent =
                `📍 Location pinned: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
            toast('✅ Location captured!');
        }, () => {
            document.getElementById('locationInput').value = 'Bengaluru, Karnataka';
            document.getElementById('mapLabel').textContent = '📍 Location: Bengaluru, Karnataka';
            toast('📍 Using approximate location');
        });
    }
}

function handleReportPhotos(event) {
    const container = document.getElementById('uploadedReportPhotos');
    container.innerHTML = '';
    Array.from(event.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = e => {
            const div = document.createElement('div');
            div.style.cssText = 'width:80px;height:80px;border-radius:8px;overflow:hidden;display:inline-block;margin:4px;';
            div.innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;">`;
            container.appendChild(div);
        };
        reader.readAsDataURL(file);
    });
    toast(`📷 ${event.target.files.length} photo(s) uploaded!`);
}

function toggleChip(btn) {
    btn.classList.toggle('active');
}

function selectSeverity(btn, level) {
    document.querySelectorAll('.severity-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function selectSubmitOption(el, option) {
    document.querySelectorAll('.submit-option').forEach(o => o.classList.remove('active'));
    el.classList.add('active');
}

function submitReport() {
    State.points += 50;
    State.reports++;
    updatePoints();

    toast('🚨 Report submitted successfully! +50 EP earned!');

    if (typeof confetti !== 'undefined') {
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 }, colors: ['#FF6B35', '#FFC107', '#00D26A'] });
    }

    playSound([392, 523, 659]);

    setTimeout(() => toast('📋 Report forwarded to Swachh Bharat Portal'), 2000);
    setTimeout(() => toast('🏢 Municipal Corporation notified'), 3500);
    setTimeout(() => toast('👥 Posted on Community Board — volunteers being rallied!'), 5000);

    // Reset form
    nextReportStep(1);
}

function organizeCleanup() {
    State.points += 75;
    updatePoints();
    toast('📢 Community cleanup rally posted! +75 EP for leadership! 💪');
}

// === LEADERBOARD ===
function switchLB(btn, type) {
    document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    toast(`📊 Showing ${type} leaderboard`);
}

// === CHARTS ===
function initCharts() {
    const ctx = document.getElementById('impactChart');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            datasets: [
                {
                    label: 'Cleanups',
                    data: [45, 89, 134, 210, 287, 412, 578, 847],
                    borderColor: '#00D26A',
                    backgroundColor: 'rgba(0,210,106,0.1)',
                    fill: true, tension: 0.4, borderWidth: 2
                },
                {
                    label: 'Users',
                    data: [120, 450, 980, 2100, 4500, 7800, 11200, 15847],
                    borderColor: '#0066FF',
                    backgroundColor: 'rgba(0,102,255,0.1)',
                    fill: true, tension: 0.4, borderWidth: 2
                },
                {
                    label: 'Reports Filed',
                    data: [20, 65, 130, 340, 680, 1200, 1800, 2340],
                    borderColor: '#FF6B35',
                    backgroundColor: 'rgba(255,107,53,0.1)',
                    fill: true, tension: 0.4, borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#9CA3AF', font: { size: 12 } } } },
            scales: {
                x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#6B7280' } },
                y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#6B7280' } }
            }
        }
    });
}

// === UTILITY ===
function updatePoints() {
    document.getElementById('totalPoints').textContent = State.points.toLocaleString();
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

function toast(msg) {
    const c = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, 3500);
}

function playSound(freqs) {
    try {
        const ctx = new (AudioContext || webkitAudioContext)();
        freqs.forEach((f, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            osc.type = 'sine'; osc.frequency.value = f;
            gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.3);
            osc.start(ctx.currentTime + i * 0.1);
            osc.stop(ctx.currentTime + i * 0.1 + 0.3);
        });
    } catch (e) {}
}

function toggleNotifications() { toast('🔔 Notifications panel coming soon!'); }
function toggleProfile() { toast('👤 Profile settings coming soon!'); }

// === SCROLL ANIMATIONS ===
function initScrollAnim() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.challenge-card, .feed-post, .impact-card, .how-step, .report-track-item, .lb-row').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        obs.observe(el);
    });
}

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌍 EcoRally Initializing...');
    initParticles();
    initCounters();
    initCharts();
    initScrollAnim();

    setTimeout(() => toast('🌍 Welcome to EcoRally! Join a challenge to start earning! 🔥'), 1000);
    setTimeout(() => toast('🔥 Your 15-day streak is on fire! Keep it up!'), 3500);
    setTimeout(() => toast('🎯 New challenge: #BeachCleanup is trending!'), 6000);

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', e => {
            if (e.target === overlay) overlay.classList.remove('active');
        });
    });

    console.log('✅ EcoRally Ready! Let\'s save the planet! 🌍');
});