document.addEventListener("DOMContentLoaded", function () {

    const pfBtn = document.getElementById("calculatePF");

    if (pfBtn) {
        pfBtn.addEventListener("click", calculatePF);
    }

});
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