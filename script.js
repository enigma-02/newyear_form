const form = document.getElementById('newYearReviewForm');
const status = document.getElementById('form-status');

if (!form) {
    console.error("Error: Could not find the form element!");
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // NEW: Manual check for the rating
    const rating = form.querySelector('input[name="rating"]:checked');
    if (!rating) {
        status.style.color = "red";
        status.innerHTML = "⚠️ Please select a star rating!";
        return; // Stops the form from sending if no star is picked
    }

    // ... (rest of your existing code: btn.innerText = "Sending...", etc.)
    // 1. Change button state
    btn.innerText = "Sending... 🚀";
    btn.disabled = true;

    const data = new FormData(form);

    try {
        console.log("Sending data to Formspree...");
        const response = await fetch(form.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            console.log("Success! Form submitted.");
            status.style.color = "#1a5e00";
            status.innerHTML = "✨ Thank you! Your response was sent. ✨";
            form.reset();
            btn.style.display = 'none';
        } else {
            const result = await response.json();
            console.error("Formspree Error:", result);
            status.style.color = "red";
            status.innerHTML = "Oops! " + (result.errors ? result.errors[0].message : "Something went wrong.");
            btn.disabled = false;
            btn.innerText = "Try Again";
        }
    } catch (error) {
        console.error("Network Error:", error);
        status.style.color = "red";
        status.innerHTML = "Oops! Connection error. Are you offline?";
        btn.disabled = false;
        btn.innerText = "Try Again";
    }
});

