document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form");

  // Create success popup dynamically
  const popup = document.createElement("div");
  popup.textContent = "Message sent successfully!";
  popup.style.cssText = `
    position: fixed;
    top: 60px;
    left: 78%;
    transform: translateX(-50%);
    background-color: #FFBD39;
    color: white;
    padding: 12px 20px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    z-index: 1000;
  `;

  document.body.appendChild(popup);

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevents form from reloading the page

    const name = form.querySelector('input[placeholder="Your Name"]').value;
    const email = form.querySelector('input[placeholder="Your Email"]').value;
    const subject = form.querySelector('input[placeholder="Subject"]').value;
    const message = form.querySelector('textarea[placeholder="Message"]').value;

    try {
      const response = await fetch(
        "https://portfolio-backend-fk8o.onrender.com/send-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message }),
        }
      );

      if (response.ok) {
        form.reset(); // Clears input fields

        // Show popup
        popup.style.opacity = "1";

        // Hide popup after 3 seconds with fade effect
        setTimeout(() => {
          popup.style.opacity = "0";
        }, 3000);
      } else {
        console.error("Failed to send message.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  });
});
