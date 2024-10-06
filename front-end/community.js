// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Select all anchor links with href starting with '#'
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    // Loop through each link
    scrollLinks.forEach(function(link) {
        
        // Add a click event listener to each link
        link.addEventListener('click', function(e) {
            
            // Prevent default click behavior
            e.preventDefault();
            
            // Get the target element's ID from the href attribute
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            // Scroll smoothly to the target element if it exists
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop, // Position of the target element
                    behavior: 'smooth' // Enable smooth scroll
                });
            }
        });
    });
});
