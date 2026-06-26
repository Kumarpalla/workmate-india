

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