// Category scrolling
function scrollCategories(amount) {
    const container = document.querySelector('.categories-scroll');
    if (container) {
        container.scrollBy({ left: amount, behavior: 'smooth' });
    }
}

// Initialize tax display toggle
document.addEventListener('DOMContentLoaded', function() {
    const showTaxesCheckbox = document.getElementById('showTaxes');
    const taxInfoElements = document.querySelectorAll('.tax-info');
    
    if (showTaxesCheckbox) {
        showTaxesCheckbox.addEventListener('change', function() {
            taxInfoElements.forEach(el => {
                el.style.display = this.checked ? 'block' : 'none';
            });
        });
        
        // Initial state
        taxInfoElements.forEach(el => {
            el.style.display = showTaxesCheckbox.checked ? 'block' : 'none';
        });
    }
});

// Favorite button functionality
document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const icon = this.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = '#FF385C';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = 'white';
        }
    });
});
