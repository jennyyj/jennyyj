document.addEventListener('DOMContentLoaded', function () {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');

    function showModal(src) {
        modalContainer.style.display = 'block';
        modalContent.src = src;
    }

    function hideModal() {
        modalContainer.style.display = 'none';
    }

    const photos = document.querySelectorAll('.modeling-photo');
    photos.forEach(photo => {
        photo.addEventListener('click', function () {
            const src = this.getAttribute('data-src');
            showModal(src);
        });
    });

    const closeButton = document.getElementById('close');
    closeButton.addEventListener('click', hideModal);

    modalContainer.addEventListener('click', function (event) {
        if (event.target === modalContainer) {
            hideModal();
        }
    });
});

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
