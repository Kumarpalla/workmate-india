document.addEventListener("DOMContentLoaded", function () {

    const btn = document.getElementById("calculateTax");

    if (btn) {
        btn.addEventListener("click", calculateTax);
    }

});

function calculateTax() {

    let income = Number(document.getElementById("annualIncome").value);

    let regime = document.getElementById("taxRegime").value;

    if (income <= 0) {
        alert("Please enter Annual Income");
        return;
    }

    let taxableIncome = income - 75000; // Standard Deduction

    if (taxableIncome < 0)
        taxableIncome = 0;

    let tax = 0;

    if (regime === "new") {

        if (taxableIncome <= 1200000)
            tax = 0;

        else if (taxableIncome <= 1600000)
            tax = (taxableIncome - 1200000) * 0.15;

        else if (taxableIncome <= 2000000)
            tax = 60000 + (taxableIncome - 1600000) * 0.20;

        else
            tax = 140000 + (taxableIncome - 2000000) * 0.30;

    }
    else {

        if (taxableIncome <= 250000)
            tax = 0;

        else if (taxableIncome <= 500000)
            tax = (taxableIncome - 250000) * 0.05;

        else if (taxableIncome <= 1000000)
            tax = 12500 + (taxableIncome - 500000) * 0.20;

        else
            tax = 112500 + (taxableIncome - 1000000) * 0.30;

    }

    let cess = tax * 0.04;

    let totalTax = tax + cess;

    document.getElementById("taxResult").innerHTML = `

    <table class="result-table">

        <tr>
            <td>Annual Income</td>
            <td>₹${income.toLocaleString("en-IN")}</td>
        </tr>

        <tr>
            <td>Taxable Income</td>
            <td>₹${taxableIncome.toLocaleString("en-IN")}</td>
        </tr>

        <tr>
            <td>Income Tax</td>
            <td>₹${tax.toLocaleString("en-IN")}</td>
        </tr>

        <tr>
            <td>Health & Education Cess (4%)</td>
            <td>₹${cess.toLocaleString("en-IN")}</td>
        </tr>

        <tr class="total">
            <td>Total Tax</td>
            <td>₹${totalTax.toLocaleString("en-IN")}</td>
        </tr>

    </table>

    `;
}