document.addEventListener("DOMContentLoaded", function () {

    const btn = document.getElementById("calculateGratuity");

    if (btn) {
        btn.addEventListener("click", calculateGratuity);
    }

});

function calculateGratuity() {

    let basic = Number(document.getElementById("basicSalary").value);

    let years = Number(document.getElementById("years").value);

    if (basic <= 0) {

        alert("Please enter Basic Salary.");

        return;

    }

    if (years <= 0) {

        alert("Please enter Years of Service.");

        return;

    }

    if (years < 5) {

        document.getElementById("gratuityResult").innerHTML = `

        <table class="result-table">

            <tr class="total">
                <td colspan="2">
                    ❌ Not Eligible (Minimum 5 Years Required)
                </td>
            </tr>

        </table>

        `;

        return;

    }

    // Gratuity Formula
    let gratuity = (basic * 15 * years) / 26;

    document.getElementById("gratuityResult").innerHTML = `

    <table class="result-table">

        <tr>
            <td>Last Drawn Basic Salary</td>
            <td>₹${basic.toLocaleString("en-IN")}</td>
        </tr>

        <tr>
            <td>Years of Service</td>
            <td>${years}</td>
        </tr>

        <tr>
            <td>Eligibility</td>
            <td>✅ Eligible</td>
        </tr>

        <tr class="total">
            <td><strong>Gratuity Amount</strong></td>
            <td><strong>₹${gratuity.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}</strong></td>
        </tr>

    </table>

    `;
}