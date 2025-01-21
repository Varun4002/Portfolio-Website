document.addEventListener('DOMContentLoaded', () => {
  const cursorAura = document.querySelector('.cursor-aura');
  const clickableElements = document.querySelectorAll('a, button, .nav-links li, .project-card, .skill');
  let isMoving = false;
  let moveTimeout;

  // Add glow effect class to all clickable elements
  clickableElements.forEach(element => {
      element.classList.add('glow-effect');
  });

  function updateCursor(e) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      requestAnimationFrame(() => {
          cursorAura.style.left = `${mouseX}px`;
          cursorAura.style.top = `${mouseY}px`;
      });

      if (!isMoving) {
          isMoving = true;
          cursorAura.style.transform = 'translate(-50%, -50%) scale(0.9)';
      }

      clearTimeout(moveTimeout);

      moveTimeout = setTimeout(() => {
          isMoving = false;
          cursorAura.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 100);

      // Handle proximity effects
      let nearClickable = false;

      clickableElements.forEach(element => {
          const rect = element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const distance = Math.hypot(mouseX - centerX, mouseY - centerY);
          const threshold = 100;

          if (distance < threshold) {
              nearClickable = true;
              element.classList.add('active');
              
              const relativeX = mouseX - rect.left;
              const relativeY = mouseY - rect.top;
              
              element.style.setProperty('--mouse-x', `${relativeX}px`);
              element.style.setProperty('--mouse-y', `${relativeY}px`);
          } else {
              element.classList.remove('active');
          }
      });

      if (nearClickable) {
          cursorAura.classList.add('near-clickable');
      } else {
          cursorAura.classList.remove('near-clickable');
      }
  }

  // Event listeners
  document.addEventListener('mousemove', updateCursor);

  document.addEventListener('mousedown', () => {
      cursorAura.classList.add('clicking');
  });

  document.addEventListener('mouseup', () => {
      cursorAura.classList.remove('clicking');
  });

  document.addEventListener('mouseout', () => {
      cursorAura.style.opacity = '0';
  });

  document.addEventListener('mouseover', () => {
      cursorAura.style.opacity = '1';
  });

  clickableElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
          cursorAura.classList.add('hovering');
      });

      element.addEventListener('mouseleave', () => {
          cursorAura.classList.remove('hovering');
      });
  });
});
