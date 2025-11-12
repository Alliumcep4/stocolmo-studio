// ----- Scroll suave para navegación -----
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if(target){
            window.scrollTo({
                top: target.offsetTop - 70, // ajusta según header
                behavior: 'smooth'
            });
        }
    });
});

// ----- Cambio de tema claro/oscuro -----
const toggleTheme = () => {
    const root = document.documentElement;
    const currentBg = getComputedStyle(root).getPropertyValue('--color-bg').trim();
    
    if(currentBg === '#ffffff'){ // tema claro -> oscuro
        root.style.setProperty('--color-bg', '#1a1a1a');
        root.style.setProperty('--color-text', '#f0f0f0');
        root.style.setProperty('--color-accent', '#ff6b6b');
        root.style.setProperty('--color-accent-text', '#1a1a1a');
        root.style.setProperty('--color-border', '#f0f0f0');
    } else { // tema oscuro -> claro
        root.style.setProperty('--color-bg', '#ffffff');
        root.style.setProperty('--color-text', '#000000');
        root.style.setProperty('--color-accent', '#686868');
        root.style.setProperty('--color-accent-text', '#ffffff');
        root.style.setProperty('--color-border', '#000000');
    }
};

// Doble click en logo para cambiar tema + click con animación
const logo = document.querySelector('header .logo');
if(logo){
    logo.addEventListener('dblclick', toggleTheme);
    logo.addEventListener('click', () => {
        logo.style.transform = 'rotate(720deg) scale(1.2)';
        setTimeout(() => logo.style.transform = '', 1000);
    });
}

// ----- Animación fade-in al hacer scroll -----
const fadeElements = document.querySelectorAll('.home, .about, .galeria, .equipo, form, footer');
const fadeInOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if(rect.top < triggerBottom){
            el.style.opacity = 1;
            el.style.transform = 'translateY(0px)';
            el.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        } else {
            el.style.opacity = 0;
            el.style.transform = 'translateY(30px)';
        }
    });
};
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// ----- Highlight extra en cartas de equipo al pasar mouse -----
document.querySelectorAll('.equipo .user').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 35px 60px rgba(0,0,0,0.5)';
        card.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
    });
});

// ----- Efecto de movimiento reactivo en texto del Hero -----
const heroText = document.querySelector('.home .contenido h1');
const heroSub = document.querySelector('.home .contenido h3');

if(heroText){
    document.querySelector('.home').addEventListener('mousemove', e => {
        const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left - width/2;
        const y = e.clientY - top - height/2;
        const moveX = x * 0.03;
        const moveY = y * 0.03;
        heroText.style.transform = `translate(${moveX}px, ${moveY}px)`;
        if(heroSub) heroSub.style.transform = `translate(${moveX*0.5}px, ${moveY*0.5}px)`;
    });
}

// ----- Animación extra en imágenes de galería -----
document.querySelectorAll('.galeria .imagenes img').forEach(img => {
    img.addEventListener('mousemove', e => {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width/2;
        const y = e.clientY - rect.top - rect.height/2;
        const rotateX = -y * 0.05;
        const rotateY = x * 0.05;
        img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
    });
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
});
