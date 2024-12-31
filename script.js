function displayStudentInfo(event) {
    event.preventDefault();

    // Collecting form values
    const studentId = document.getElementById('studentId').value.trim();
    const studentName = document.getElementById('studentName').value.trim();
    const qualifyingMarks = document.getElementById('qualifyingMarks').value.trim();
    const yearOfEngg = document.getElementById('yearOfEngg').value.trim();
    const residence = document.getElementById('residence').value;

    // Validation check for qualifying marks
    if (isNaN(qualifyingMarks) || qualifyingMarks === "" || qualifyingMarks < 0 || qualifyingMarks > 700) {
        showError("Please enter valid total marks between 0 and 700.");
        return;
    }

    // Validation for batch year
    const yearPattern = /^\d{4}-\d{4}$/;
    if (!yearPattern.test(yearOfEngg)) {
        showError("Please enter a valid batch year (e.g., 2020-2024).");
        return;
    }

    const yearRange = yearOfEngg.split("-");
    const startYear = parseInt(yearRange[0]);
    const endYear = parseInt(yearRange[1]);
    const currentYear = new Date().getFullYear(); // Get the current year

    if (startYear < currentYear || endYear > currentYear + 4) { 
        showError(`The batch year range must start from ${currentYear} and end within ${currentYear + 4}.`);
        return;
    }

    // Residence text conversion
    let residenceText = residence === 'H' ? 'Hosteller' : 'Dayscholar';

    // Output formatting
    const output = `
        <p><strong>Student Name:</strong> ${studentName}</p>
        <p><strong>Student Register Number:</strong> ${studentId}</p>
        <p><strong>Total Marks (Out of 700):</strong> ${qualifyingMarks}</p>
        <p><strong>Batch Year:</strong> ${yearOfEngg}</p>
        <p><strong>Residence:</strong> ${residenceText}</p>
    `;

    // Display the output
    document.getElementById('output').innerHTML = output;

    // Clear the form inputs
    document.querySelector('form').reset();
}

// Helper function to show error messages
function showError(message) {
    const errorDiv = document.querySelector('.error');
    if (errorDiv) {
        errorDiv.textContent = message; // Update the existing error message
    } else {
        const errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.style.color = 'red';
        errorElement.style.marginBottom = '10px';
        errorElement.textContent = message;
        document.querySelector('.container').prepend(errorElement);

        // Remove error message after 5 seconds
        setTimeout(() => {
            errorElement.remove();
        }, 5000);
    }
}

// Real-time validation for the Total Marks field
document.getElementById('qualifyingMarks').addEventListener('input', function (e) {
    if (e.target.value < 0) {
        e.target.value = 0; // Reset to 0 if a negative value is entered
    }
});
