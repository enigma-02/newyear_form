const form = document.getElementById('newYearReviewForm');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    
    // Change button state
    btn.innerText = "Sending... 🚀";
    btn.disabled = true;

    const data = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            status.style.color = "#1a5e00";
            status.innerHTML = "✨ Thank you! Your response was sent. ✨";
            form.reset();
            btn.style.display = 'none';
        } else {
            const result = await response.json();
            status.style.color = "red";
            status.innerHTML = result.errors.map(error => error.message).join(", ");
            btn.disabled = false;
            btn.innerText = "Try Again";
        }
    } catch (error) {
        status.style.color = "red";
        status.innerHTML = "Oops! Connection error. Please try again.";
        btn.disabled = false;
        btn.innerText = "Try Again";
    }
});