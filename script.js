// Wait for the DOM to be loaded to run the script
document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Check if we are on the calculator page
    const calculatorForm = document.getElementById('calculator-form');
    
    if (calculatorForm) {
        // Listen for changes on the form (when a box is checked/unchecked)
        calculatorForm.addEventListener('change', calculateTotal);
    }

    // Testimonial slider functionality
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    // Add click handlers to dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = dot.getAttribute('data-slide');
            
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to selected slide and dot
            slides[slideIndex].classList.add('active');
            dot.classList.add('active');
        });
    });
});

function calculateTotal() {
    let subtotal = 0;
    let count = 0;
    
    // Get all checked boxes
    const checkboxes = document.querySelectorAll('#calculator-form input[type="checkbox"]:checked');
    
    checkboxes.forEach(cb => {
        count++;
        // Get the price from the 'data-price' attribute
        subtotal += parseFloat(cb.dataset.price);
    });

    // Apply discount logic
    let discountRate = 0;
    if (count === 2) {
        discountRate = 0.05; // 5%
    } else if (count === 3) {
        discountRate = 0.10; // 10%
    } else if (count > 3) {
        discountRate = 0.15; // 15%
    }

    let discountAmount = subtotal * discountRate;
    let totalAfterDiscount = subtotal - discountAmount;

    // 👇 ADD VAT (15%)
    let vatRate = 0.15;
    let vatAmount = totalAfterDiscount * vatRate;

    // 👇 Final total including VAT
    let total = totalAfterDiscount + vatAmount;

    // Update the summary display
    document.getElementById('count').innerText = count;
    document.getElementById('subtotal').innerText = `${subtotal.toFixed(2)} Rands`;
    document.getElementById('discount').innerText = `- ${discountAmount.toFixed(2)} Rands`;

    // 👇 Add a line for VAT in your HTML and update it here
    const vatElement = document.getElementById('vat');
    if (vatElement) {
        vatElement.innerText = `${vatAmount.toFixed(2)} Rands`;
    }

    document.getElementById('total').innerText = `${total.toFixed(2)} Rands`;
}
