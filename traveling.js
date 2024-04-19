document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');
  
    hamburger.addEventListener('click', function () {
        // Get the current value of the left property
        const currentLeft = parseFloat(getComputedStyle(sidebar).left);
    
        // Toggle the sidebar based on its current state
        if (currentLeft < 0) {
          sidebar.style.left = '0';
        } else {
          sidebar.style.left = '-100%';
        }
      });
    });