document.addEventListener('DOMContentLoaded', () => {
    const typingName = document.getElementById('typing-name');
    const sparkle = document.getElementById('sparkle');
    const revealBtn = document.getElementById('revealBtn');
    const secretMessage = document.getElementById('secretMessage');
    const cheerLine = document.querySelector('.cheer-line');
    const magicContainer = document.getElementById('magic-container');
    
    // --- 1. Soft, Elegant Typing Effect ---
    const nameStr = "Vidhi";
    let charIndex = 0;

    function typeEffect() {
        if (charIndex < nameStr.length) {
            typingName.textContent += nameStr.charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 200); // Slower, more elegant typing
        } else {
            sparkle.innerHTML = ' ✨';
            sparkle.animate([
                { opacity: 0.2 }, { opacity: 1 }, { opacity: 0.2 }
            ], { duration: 2000, iterations: Infinity });
        }
    }
    setTimeout(typeEffect, 1000);

    // --- 2. Gentle Cursor Sparkles ---
    const pastelColors = ['#ffb6c1', '#ffdfba', '#baffc9', '#bae1ff', '#e6baff'];
    
    window.addEventListener('mousemove', (e) => {
        if(Math.random() > 0.8) return; // Keep it subtle and beautiful
        
        const dust = document.createElement('div');
        dust.className = 'twirl-particle';
        
        const size = Math.random() * 8 + 4;
        dust.style.width = `${size}px`;
        dust.style.height = `${size}px`;
        dust.style.backgroundColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
        dust.style.left = `${e.clientX}px`;
        dust.style.top = `${e.clientY}px`;
        dust.style.borderRadius = '50%';
        dust.style.filter = 'blur(2px)';
        
        magicContainer.appendChild(dust);
        
        dust.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 0.6 },
            { transform: `translate(0px, -40px) scale(0)`, opacity: 0 }
        ], { duration: 1000, easing: 'ease-out' }).onfinish = () => dust.remove();
    });

    // --- 3. The Beautiful Swirling Reveal ---
    revealBtn.addEventListener('click', (e) => {
        
        // Soft button fade out
        revealBtn.style.pointerEvents = 'none';
        revealBtn.animate([
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(0.8)', opacity: 0 }
        ], { duration: 500, fill: 'forwards' });
        
        // Show the sweet message
        setTimeout(() => {
            revealBtn.style.display = 'none';
            secretMessage.classList.add('show');
            setTimeout(() => cheerLine.classList.add('reveal'), 1500);
        }, 500);

        // Trigger the beautiful swirling color dance
        const rect = revealBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        createSwirlingDance(centerX, centerY);
    });

    // --- 4. Rhythmic Swirling Color & Petal Dance ---
    function createSwirlingDance(cx, cy) {
        // Traditional, beautiful Holi colors (Marigold, Rani Pink, etc)
        const festiveColors = ['#d81b60', '#ffb300', '#00bcd4', '#ab47bc', '#ff9800'];
        const cuteEmojis = ['🌸', '✨', '💖', '🌺'];
        
        for (let i = 0; i < 150; i++) {
            const p = document.createElement('div');
            p.className = 'twirl-particle';
            p.style.left = `${cx}px`;
            p.style.top = `${cy}px`;
            
            if (Math.random() > 0.8) {
                // Emojis
                p.innerHTML = cuteEmojis[Math.floor(Math.random() * cuteEmojis.length)];
                p.style.fontSize = `${Math.random() * 15 + 10}px`;
            } else {
                // Soft colored gulal/petals
                const size = Math.random() * 12 + 5;
                p.style.width = `${size}px`;
                p.style.height = `${size}px`;
                p.style.backgroundColor = festiveColors[Math.floor(Math.random() * festiveColors.length)];
                
                // Mix of circles and petal shapes
                p.style.borderRadius = Math.random() > 0.5 ? '50%' : '15px 0 15px 0';
                p.style.opacity = Math.random() * 0.5 + 0.5;
            }

            magicContainer.appendChild(p);

            // The Math for the "Swirl" (Archimedean spiral outward)
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 600 + 100; 
            
            // X and Y destinations with a curving effect
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            const swirlAngle = (Math.random() > 0.5 ? 1 : -1) * 360; // Spin left or right

            p.animate([
                { transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', opacity: 0 },
                { transform: `translate(calc(-50% + ${tx * 0.5}px), calc(-50% + ${ty * 0.5}px)) scale(1.2) rotate(${swirlAngle / 2}deg)`, opacity: 1, offset: 0.4 },
                { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty + 100}px)) scale(0) rotate(${swirlAngle}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 4000 + 3000, // Lingers much longer and softer
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)' 
            }).onfinish = () => p.remove();
        }
    }
});