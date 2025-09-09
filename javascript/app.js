/*
 * Navigation Interactions
 * Toggle the mobile icon to show and hide the main navigation
 * Toggle the dropdown button to show and hide the dropdown content
*/
document.addEventListener('DOMContentLoaded', () => {

    // Dropdown toggles
    const dropdownToggle = document.querySelectorAll('.dropdown-toggle');
    dropdownToggle.forEach((dropdown) => {
        dropdown.addEventListener('click', (e) => {
            e.preventDefault(); // prevent default anchor behavior
            const dropdownElement = dropdown.parentElement;
            dropdownElement.classList.toggle('collapse');
        });
    });
});

// Screen size snippet
const reportWindowSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    document.getElementById('windowSize').innerHTML = `${width}px by ${height}px`;
}


/* 
    * Ensure that the DOM is loaded before running
    * the functions inside
*/
document.addEventListener('DOMContentLoaded', () => {
    reportWindowSize();
    window.onresize = reportWindowSize;
});

/* Animation */
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // If the element is a project container
      if (entry.target.classList.contains('project')) {
        const children = entry.target.querySelectorAll('.hidden');
        children.forEach((child, index) => {
          setTimeout(() => child.classList.add('show'), index * 200); // stagger by 200ms
        });
      } else {
        entry.target.classList.add('show'); // reveal single hidden element
      }
      obs.unobserve(entry.target); // stop observing after reveal
    }
  });
}, { threshold: 0.2 });

// Observe project containers
document.querySelectorAll('.project').forEach(project => observer.observe(project));

// Observe other hidden elements NOT inside a project
document.querySelectorAll('.hidden').forEach(el => {
  if (!el.closest('.project')) observer.observe(el);
});
