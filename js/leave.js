document.addEventListener("DOMContentLoaded", function () {

    const leaveBtn = document.getElementById("calculateLeave");

    if (leaveBtn) {
        leaveBtn.addEventListener("click", calculateLeave);
    }

});

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
    showToast("Leave Calculated Successfully");
}