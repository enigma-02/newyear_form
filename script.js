document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newYearReviewForm');
    const status = document.getElementById('form-status');
    const btn = document.getElementById('submitBtn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Manual check for rating to prevent browser focus errors
        const ratingSelected = form.querySelector('input[name="rating"]:checked');
        if (!ratingSelected) {
            status.style.color = "red";
            status.innerHTML = "⚠️ Please select a star rating before sending!";
            return;
        }
        
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
                status.innerHTML = "Error: Submission failed. Please try again.";
                btn.disabled = false;
                btn.innerText = "Try Again";
            }
        } catch (error) {
            status.style.color = "red";
            status.innerHTML = "Connection error. Please check your internet.";
            btn.disabled = false;
            btn.innerText = "Try Again";
        }
    });
});
