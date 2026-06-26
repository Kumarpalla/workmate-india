document.addEventListener("DOMContentLoaded", function () {

    const esiBtn = document.getElementById("calculateESI");

    if (esiBtn) {
        esiBtn.addEventListener("click", calculateESI);
    }

});

function calculateESI() {

    let gross = Number(document.getElementById("grossESI").value);

    let employeePercent = Number(document.getElementById("employeeESI").value);

    let employerPercent = Number(document.getElementById("employerESI").value);

    if (gross <= 0) {

        alert("Please Enter Gross Salary");

        return;

    }

    let employeeESI = gross * employeePercent / 100;

    let employerESI = gross * employerPercent / 100;

    let total = employeeESI + employerESI;

    let yearly = total * 12;

    let status = gross <= 21000 ? "✅ Eligible" : "❌ Not Eligible";

    document.getElementById("esiResult").innerHTML = `

<table class="result-table">

<tr>
<td>Employee ESI</td>
<td>₹${formatCurrency(employeeESI)}</td>
</tr>

<tr>
<td>Employer ESI</td>
<td>₹${formatCurrency(employerESI)}</td>
</tr>

<tr>
<td>Total Contribution</td>
<td>₹${formatCurrency(total)}</td>
</tr>

<tr>
<td>Yearly Contribution</td>
<td>₹${formatCurrency(yearly)}</td>
</tr>

<tr class="total">
<td>Eligibility</td>
<td>${status}</td>
</tr>

</table>

`;

}