document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const termsAccepted = document.getElementById("terms").checked;

    if (!validateAge(dob)) {
        alert("Age must be between 18 and 55.");
        return;
    }

    const userData = { name, email, password, dob, termsAccepted };

    let users = JSON.parse(sessionStorage.getItem("users")) || [];
    users.push(userData);
    sessionStorage.setItem("users", JSON.stringify(users));

    displayEntries();

    // *Clear the form fields after submission*
    document.getElementById("registrationForm").reset();
});

function validateAge(dob) {
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age >= 18 && age <= 55;
}

function displayEntries() {
    const users = JSON.parse(sessionStorage.getItem("users")) || [];
    const tbody = document.querySelector("#entriesTable tbody");
    tbody.innerHTML = "";

    users.forEach(user => {
        const row = `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.termsAccepted}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

window.onload = displayEntries;