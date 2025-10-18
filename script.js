function goToBook() {
  // Get values from the form
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const date = document.getElementById("date").value;
  const passengers = document.getElementById("passengers").value;

  // Validation: Check if all required fields are filled
  if (!from) {
    alert("Please select a 'From' location.");
    return;
  }
  if (!to) {
    alert("Please select a 'To' location.");
    return;
  }
  if (!date) {
    alert("Please select a date.");
    return;
  }
  if (!passengers || passengers < 1) {
    alert("Please enter a valid number of passengers (at least 1).");
    return;
  }

  // If all validations pass, proceed
  alert("Finding ticket... Redirecting to booking page.");
  window.location.href = "booking-page.html";
}

function confirmBooking() {
  console.log("confirmBooking() started.");  // Debugging: Check if function is called

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const location = document.getElementById("location").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const termsChecked = document.getElementById("terms").checked;
  const driver = document.getElementById("driver-select").value; // Get selected driver
  const date = new Date().toLocaleDateString();

  // Validation: Check if all fields are filled
  if (!name || !email || !location || !contact) {
    alert("Please fill out all fields.");
    console.log("Validation failed: Missing required fields.");  // Debugging
    return;
  }

  // Validation: Name must be full name (at least two words)
  if (name.split(' ').length < 2) {
    alert("Please enter your full name (first and last name).");
    console.log("Validation failed: Name not full.");  // Debugging
    return;
  }

  // Validation: Email must end with @gmail.com
  if (!email.toLowerCase().endsWith('@gmail.com')) {
    alert("Email must end with @gmail.com.");
    console.log("Validation failed: Invalid email.");  // Debugging
    return;
  }

  // Validation: Contact must start with +63
  if (!contact.startsWith('+63')) {
    alert("Contact number must start with +63.");
    console.log("Validation failed: Invalid contact.");  // Debugging
    return;
  }

  // Check if terms are agreed
  if (!termsChecked) {
    alert("Please agree to the Terms and Privacy Policy.");
    console.log("Validation failed: Terms not checked.");  // Debugging
    return;
  }

  console.log("All validations passed.");  // Debugging

  // Auto-increment control number using localStorage (with error handling)
  let controlNumber;
  try {
    controlNumber = localStorage.getItem('controlNumber') || 0;
    controlNumber = parseInt(controlNumber) + 1;
    localStorage.setItem('controlNumber', controlNumber);
    console.log("Control number set to:", controlNumber);  // Debugging
  } catch (e) {
    console.error("localStorage error:", e);  // Debugging
    controlNumber = 1;  // Fallback if localStorage fails
  }

  // Update hidden elements (for consistency, though modal will show)
  const driverNameElement = document.getElementById("driver-name");
  const dateDisplayElement = document.getElementById("date-display");
  if (driverNameElement) driverNameElement.textContent = driver;
  if (dateDisplayElement) dateDisplayElement.textContent = date;

  // Prepare modal content
  const modalText = `Your driver is: ${driver}<br>Date: ${date}<br>Control #: ${controlNumber}`;
  const modalTextElement = document.getElementById("modal-text");
  if (modalTextElement) {
    modalTextElement.innerHTML = modalText;
  } else {
    console.error("Modal text element not found.");  // Debugging
    return;
  }

  // Show modal with details (using both inline style and class for reliability)
  const bookingModal = document.getElementById("bookingModal");
  if (bookingModal) {
    bookingModal.style.display = "block";  // Inline style
    bookingModal.classList.remove("hidden");  // Class toggle (requires CSS above)
    console.log("Modal should now be visible.");  // Debugging
  } else {
    console.error("Booking modal element not found.");  // Debugging
    return;
  }

  // Clear the success message (in case it was shown before)
  const messageElement = document.getElementById("message");
  if (messageElement) {
    messageElement.textContent = "";
  }
}

function closeModal() {
  const bookingModal = document.getElementById("bookingModal");
  if (bookingModal) {
    bookingModal.style.display = "none";
    bookingModal.classList.add("hidden");  // Optional: Add class for consistency
  }
}

function openTermsModal() {
  const termsModal = document.getElementById("termsModal");
  if (termsModal) {
    termsModal.style.display = "block";
    termsModal.classList.remove("hidden");  // Optional
  }
}

function closeTermsModal() {
  const termsModal = document.getElementById("termsModal");
  if (termsModal) {
    termsModal.style.display = "none";
    termsModal.classList.add("hidden");  // Optional
  }
}

// Close modal if clicked outside (handles both booking and terms modals)
window.onclick = function(event) {
  const bookingModal = document.getElementById("bookingModal");
  const termsModal = document.getElementById("termsModal");
  if (event.target === bookingModal) {
    closeModal();
  }
  if (event.target === termsModal) {
    closeTermsModal();
  }
};
