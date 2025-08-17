document.addEventListener('DOMContentLoaded', function() {
    // Initialize category scrolling
    const categoriesScroll = document.querySelector('.categories-scroll');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Update navigation buttons visibility
    function updateNavButtons() {
        const isAtStart = categoriesScroll.scrollLeft === 0;
        const isAtEnd = categoriesScroll.scrollLeft >= (categoriesScroll.scrollWidth - categoriesScroll.clientWidth - 1);
        
        prevBtn.style.opacity = isAtStart ? '0' : '1';
        prevBtn.style.cursor = isAtStart ? 'default' : 'pointer';
        
        nextBtn.style.opacity = isAtEnd ? '0' : '1';
        nextBtn.style.cursor = isAtEnd ? 'default' : 'pointer';
    }

    // Scroll categories
    function scrollCategories(direction) {
        const scrollAmount = direction * (categoriesScroll.clientWidth / 2);
        categoriesScroll.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    // Event listeners for scroll buttons
    prevBtn.addEventListener('click', () => scrollCategories(-1));
    nextBtn.addEventListener('click', () => scrollCategories(1));
    
    // Update buttons on scroll
    categoriesScroll.addEventListener('scroll', updateNavButtons);
    
    // Initial button state
    updateNavButtons();

    // Highlight active category
    const categoryItems = document.querySelectorAll('.category-item');
    const urlParams = new URLSearchParams(window.location.search);
    const activeCategory = urlParams.get('category');

    categoryItems.forEach(item => {
        if (item.dataset.category === activeCategory) {
            item.classList.add('active');
        }

        // Add hover animation
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Handle tax display toggle
    const taxToggle = document.getElementById('showTaxes');
    const taxInfos = document.querySelectorAll('.tax-info');

    taxToggle.addEventListener('change', function() {
        taxInfos.forEach(info => {
            info.style.display = this.checked ? 'inline' : 'none';
        });
        
        // Save preference
        localStorage.setItem('showTaxes', this.checked);
    });

    // Load saved tax display preference
    const savedTaxPreference = localStorage.getItem('showTaxes');
    if (savedTaxPreference !== null) {
        taxToggle.checked = savedTaxPreference === 'true';
        taxToggle.dispatchEvent(new Event('change'));
    }
});
