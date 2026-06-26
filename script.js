function formatCurrency(value) {
    return value.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

document.addEventListener("DOMContentLoaded", function () {

    const btn = document.getElementById("calculateBtn");
    if (btn) btn.addEventListener("click", calculateSalary);

    const pdfBtn = document.getElementById("downloadPdf");
    if (pdfBtn) pdfBtn.addEventListener("click", downloadPDF);

    const pfBtn = document.getElementById("calculatePF");
    if (pfBtn) pfBtn.addEventListener("click", calculatePF);

    const esiBtn = document.getElementById("calculateESI");
    if (esiBtn) esiBtn.addEventListener("click", calculateESI);

    const searchBox = document.getElementById("searchBox");
    if (searchBox) {
        searchBox.addEventListener("keyup", function () {
            let value = this.value.toLowerCase();
            document.querySelectorAll(".card").forEach(card => {
                card.style.display = card.innerText.toLowerCase().includes(value) ? "block" : "none";
            });
        });
    }

});


function calculateSalary() {

    let gross = Number(document.getElementById("grossSalary").value);
    let basic = Number(document.getElementById("basicSalary").value);
    let bonus = Number(document.getElementById("bonus").value) || 0;

    let pfChecked = document.getElementById("pf").checked;
    let esiChecked = document.getElementById("esi").checked;

    // Validation
    if (gross <= 0) {
        alert("Please enter a valid Gross Salary.");
        return;
    }

    // Auto Basic Salary (50%)
    if (basic === 0) {
        basic = gross * 0.50;
    }

    // Validation
    if (basic > gross) {
        alert("Basic Salary cannot be greater than Gross Salary.");
        return;
    }

    // Salary Components
    let hra = basic * 0.40;

    let pf = 0;
    if (pfChecked) {
        pf = basic * 0.12;
    }

    let esi = 0;
    if (esiChecked) {
        esi = gross * 0.0075;
    }

    let pt = 200;

    let net = gross + bonus - pf - esi - pt;

    // Result
    document.getElementById("result").innerHTML = `
        <table class="result-table">

            <tr>
                <td>Gross Salary</td>
                <td>₹${gross.toLocaleString("en-IN")}</td>
            </tr>

            <tr>
                <td>Basic Salary</td>
                <td>₹${basic.toLocaleString("en-IN")}</td>
            </tr>

            <tr>
                <td>HRA</td>
                <td>₹${hra.toLocaleString("en-IN")}</td>
            </tr>

            <tr>
                <td>PF</td>
                <td>₹${pf.toLocaleString("en-IN")}</td>
            </tr>

            <tr>
                <td>ESI</td>
                <td>₹${esi.toLocaleString("en-IN")}</td>
            </tr>

            <tr>
                <td>Professional Tax</td>
                <td>₹${pt.toLocaleString("en-IN")}</td>
            </tr>

            <tr>
                <td>Bonus</td>
                <td>₹${bonus.toLocaleString("en-IN")}</td>
            </tr>

            <tr class="total">
                <td><strong>Net Salary</strong></td>
                <td><strong>₹${net.toLocaleString("en-IN")}</strong></td>
            </tr>

        </table>
    `;
}
document.addEventListener("DOMContentLoaded", function () {

    const pdfBtn = document.getElementById("downloadPdf");

    if (pdfBtn) {
        pdfBtn.addEventListener("click", downloadPDF);
    }

});

function downloadPDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    let gross = Number(document.getElementById("grossSalary").value);
    let basic = Number(document.getElementById("basicSalary").value) || gross * 0.5;
    let bonus = Number(document.getElementById("bonus").value) || 0;

    let pf = document.getElementById("pf").checked ? basic * 0.12 : 0;
    let esi = document.getElementById("esi").checked ? gross * 0.0075 : 0;

    let hra = basic * 0.40;
    let pt = 200;

    let net = gross + bonus - pf - esi - pt;

    doc.setFontSize(20);
    doc.text("WorkMate India", 20, 20);

    doc.setFontSize(14);
    doc.text("Salary Slip", 20, 35);

    doc.line(20, 40, 190, 40);

    let y = 55;

    function row(label, value) {
        doc.text(label, 20, y);
        doc.text("Rs. " + value.toLocaleString("en-IN"), 140, y);
        y += 10;
    }

    row("Gross Salary", gross);
    row("Basic Salary", basic);
    row("HRA", hra);
    row("PF", pf);
    row("ESI", esi);
    row("Professional Tax", pt);
    row("Bonus", bonus);

    doc.line(20, y, 190, y);

    y += 10;

    doc.setFontSize(16);
    doc.text("Net Salary", 20, y);
    doc.text("Rs. " + net.toLocaleString("en-IN"), 140, y);

    doc.save("Salary-Slip.pdf");

}

const searchBox = document.getElementById("searchBox");

if (searchBox) {

    searchBox.addEventListener("keyup", function () {

        let value = this.value.toLowerCase();

        let cards = document.querySelectorAll(".card");

        cards.forEach(card => {

            let text = card.innerText.toLowerCase();

            if (text.includes(value))
                card.style.display = "block";
            else
                card.style.display = "none";

        });
    });

}

const pfBtn = document.getElementById("calculatePF");

if (pfBtn) {

    pfBtn.addEventListener("click", calculatePF);

}

function calculatePF() {

    let basic = Number(document.getElementById("basicPF").value);

    let empPercent = Number(document.getElementById("employeePF").value);

    let employerPercent = Number(document.getElementById("employerPF").value);

    if (basic <= 0) {

        alert("Enter Basic Salary");

        return;

    }

    let empPF = basic * empPercent / 100;

    let employerPF = basic * employerPercent / 100;

    let total = empPF + employerPF;

    let yearly = total * 12;

    document.getElementById("pfResult").innerHTML = `

<table class="result-table">

<tr>

<td>Employee PF</td>

<td>₹${empPF.toLocaleString("en-IN")}</td>

</tr>

<tr>

<td>Employer PF</td>

<td>₹${employerPF.toLocaleString("en-IN")}</td>

</tr>

<tr>

<td>Total PF</td>

<td>₹${total.toLocaleString("en-IN")}</td>

</tr>

<tr class="total">

<td>Yearly PF</td>

<td>₹${yearly.toLocaleString("en-IN")}</td>

</tr>

</table>

`;

}
const esiBtn = document.getElementById("calculateESI");

if (esiBtn) {

    esiBtn.addEventListener("click", calculateESI);

}

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
const leaveBtn = document.getElementById("calculateLeave");

if (leaveBtn) {

    leaveBtn.addEventListener("click", calculateLeave);

}

function calculateLeave() {

    let cl = Number(document.getElementById("casualLeave").value);

    let sl = Number(document.getElementById("sickLeave").value);

    let el = Number(document.getElementById("earnedLeave").value);

    let used = Number(document.getElementById("usedLeave").value);

    let total = cl + sl + el;

    if (used > total) {

        alert("Used Leave cannot be greater than Total Leave.");

        return;

    }

    let remaining = total - used;

    let usage = (used / total) * 100;

    let remainingPercent = 100 - usage;

    document.getElementById("leaveResult").innerHTML = `

<table class="result-table">

<tr>
<td>Casual Leave</td>
<td>${cl}</td>
</tr>

<tr>
<td>Sick Leave</td>
<td>${sl}</td>
</tr>

<tr>
<td>Earned Leave</td>
<td>${el}</td>
</tr>

<tr>
<td>Total Leave</td>
<td>${total}</td>
</tr>

<tr>
<td>Used Leave</td>
<td>${used}</td>
</tr>

<tr class="total">
<td>Remaining Leave</td>
<td>${remaining}</td>
</tr>

<tr>
<td>Leave Usage</td>
<td>${usage.toFixed(2)}%</td>
</tr>

<tr>
<td>Remaining</td>
<td>${remainingPercent.toFixed(2)}%</td>
</tr>

</table>

`;
}