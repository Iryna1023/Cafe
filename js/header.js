const deliveryModal = document.getElementById('modal__delivery');
const feedbackModal = document.getElementById('modal');
const contactModal = document.getElementById('modalHeader');
const openDeliveryModal = document.getElementById('openModal');
const openFeedbackModal = document.getElementById('respons');
const openContactModal = document.getElementById('contactHeader');

const closeDeliveryModal = deliveryModal.querySelector('.close');
const closeFeedbackModal = feedbackModal.querySelector('.close');
const closeContactModal = contactModal.querySelector('.close');

function openModal(modal) {
    modal.style.display = 'block';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

openDeliveryModal.addEventListener('click', () => openModal(deliveryModal));
openFeedbackModal.addEventListener('click', () => openModal(feedbackModal));
openContactModal.addEventListener('click', () => openModal(contactModal));

closeDeliveryModal.addEventListener('click', () => closeModal(deliveryModal));
closeFeedbackModal.addEventListener('click', () => closeModal(feedbackModal));
closeContactModal.addEventListener('click', () => closeModal(contactModal));

window.addEventListener('click', (event) => {
    if (event.target === deliveryModal) {
        closeModal(deliveryModal);
    }
    if (event.target === feedbackModal) {
        closeModal(feedbackModal);
    }
    if (event.target === contactModal) {
        closeModal(contactModal);
    }
});

const backButton = document.getElementById('back-button');
if (backButton) {
    backButton.onclick = function() {
        window.history.back();
    };
}

 const dropdowns = document.querySelectorAll('.dropdown');
 const navLinks = document.querySelectorAll('.nav-list__link a');

 navLinks.forEach(link => {
     link.addEventListener('click', function(e) {
         const dropdown = this.closest('.dropdown');
         const content = dropdown.querySelector('.dropdown-content');

         if (content.style.display === 'block') {
             content.style.display = 'none';
         } else {
             closeAllDropdowns();
             content.style.display = 'block';
         }
     });
 });

