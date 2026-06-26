
document.addEventListener("DOMContentLoaded", function () {

    const calculateBtn = document.getElementById("calculateBtn");

    if (calculateBtn) {
        calculateBtn.addEventListener("click", calculateSalary);
    }

    const pdfBtn = document.getElementById("downloadPdf");

    if (pdfBtn) {
        pdfBtn.addEventListener("click", downloadPDF);
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
        showToast("Please Enter Gross Salary");
        return;
    }

    // Auto Basic Salary (50%)
    if (basic === 0) {
        basic = gross * 0.50;
    }

    // Validation
    if (basic > gross) {
        showToast("Basic Salary cannot be greater than Gross Salary.");
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
    showToast("Salary Calculated Successfully");
}

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