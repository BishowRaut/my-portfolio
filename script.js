function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Mobile menu toggle
document.getElementById('mobile-menu-btn').addEventListener('click', function() {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.add('hidden');
  });
});

document.addEventListener('mousemove', (e) => {
  const cross = document.getElementById('cross');
  cross.style.left = (e.clientX - 10) + 'px';
  cross.style.top = (e.clientY - 10) + 'px';

  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const rect = heroTitle.getBoundingClientRect();
    const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    heroTitle.classList.toggle('hovered', inside);
  }
});

const interactiveElements = document.querySelectorAll('a, button');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.getElementById('cross').classList.add('active');
  });
  el.addEventListener('mouseleave', () => {
    document.getElementById('cross').classList.remove('active');
  });
});

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = sanitize(document.getElementById("name").value);
  const email = sanitize(document.getElementById("email").value);
  const message = sanitize(document.getElementById("message").value);

  if (!name || !email || !message) {
    alert("All fields required");
    return;
  }

  alert("Message sent successfully!");
});

function sanitize(input) {
  return input.replace(/[<>]/g, "");
}

function updateNepalTime() {
  const options = {
    timeZone: 'Asia/Kathmandu',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };
  const formatter = new Intl.DateTimeFormat('ne-NP', options);
  const now = new Date();
  const timeString = formatter.format(now);
  const element = document.getElementById('nepalTime');
  if (element) {
    element.textContent = `Nepal Time: ${timeString}`;
  }
}

updateNepalTime();
setInterval(updateNepalTime, 1000);