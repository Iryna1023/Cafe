
document.getElementById("menu-btn").addEventListener("click", function(event) {
    event.preventDefault(); 
    const menuContainer = document.getElementById("menu-container");
    
      if (menuContainer.style.display === "none" || menuContainer.style.display === "") {
        menuContainer.style.display = "block"; 
    } else {
        menuContainer.style.display = "none"; 
    }
});

window.addEventListener("resize", function() {
    if (window.innerWidth > 768) {
        document.getElementById("menu-container").style.display = "none";
    }
});


document.getElementById('contacts-link').addEventListener('click', function(event) {
    event.preventDefault();
    const contactInfo = document.getElementById('contact-info');
    
    contactInfo.classList.toggle('show');
});

