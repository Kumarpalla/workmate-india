

document.addEventListener("DOMContentLoaded", function () {

    const btn = document.getElementById("calculateBtn");
    if (btn) btn.addEventListener("click", calculateSalary);

    const pdfBtn = document.getElementById("downloadPdf");
    if (pdfBtn) pdfBtn.addEventListener("click", downloadPDF);

    const pfBtn = document.getElementById("calculatePF");
    if (pfBtn) pfBtn.addEventListener("click", calculatePF);

    const esiBtn = document.getElementById("calculateESI");
    if (esiBtn) esiBtn.addEventListener("click", calculateESI);

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

/* ===========================
   Loader
=========================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(() => {

            loader.style.opacity = "0";

            loader.style.visibility = "hidden";

        }, 800);

    }

});



/* ===========================
   Dark Mode
=========================== */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            themeToggle.innerHTML = "☀️";

            localStorage.setItem("theme", "dark");

        }

        else {

            themeToggle.innerHTML = "🌙";

            localStorage.setItem("theme", "light");

        }

    });

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark-mode");

        themeToggle.innerHTML = "☀️";

    }

}

/* ===========================
   Scroll To Top
=========================== */

const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            topBtn.style.opacity = "1";
            topBtn.style.visibility = "visible";

        }

        else {

            topBtn.style.opacity = "0";
            topBtn.style.visibility = "hidden";

        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}




/* ===========================
   Toast
=========================== */

function showToast(message) {

    const toast = document.getElementById("toast");

    const text = document.getElementById("toastMessage");

    if (!toast || !text) return;

    text.innerHTML = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}
/* ===========================
   Counter Animation
=========================== */

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const target = +counter.dataset.target;

    let count = 0;

    const updateCounter = () => {

        const increment = target / 80;

        if (count < target) {

            count += increment;

            counter.innerText = Math.ceil(count);

            requestAnimationFrame(updateCounter);

        } else {

            if (target === 100)

                counter.innerText = target + "%";

            else if (target === 6)

                counter.innerText = target + "+";

            else

                counter.innerText = target;

        }

    };

    updateCounter();

});
/* ===========================
   Search Suggestions
=========================== */

const suggestionBox = document.getElementById("searchSuggestions");

if (searchBox && suggestionBox) {

    const tools = [

        {

            name: "Salary Calculator",

            url: "tools/salary.html"

        },

        {

            name: "PF Calculator",

            url: "tools/pf.html"

        },

        {

            name: "ESI Calculator",

            url: "tools/esi.html"

        },

        {

            name: "Leave Planner",

            url: "tools/leave.html"

        },

        {

            name: "Income Tax Calculator",

            url: "tools/income-tax.html"

        },

        {

            name: "Gratuity Calculator",

            url: "tools/gratuity.html"

        }

    ];

    searchBox.addEventListener("keyup", () => {

        const value = searchBox.value.toLowerCase();

        suggestionBox.innerHTML = "";

        if (value === "") return;

        tools.forEach(tool => {

            if (tool.name.toLowerCase().includes(value)) {

                suggestionBox.innerHTML += `

<a href="${tool.url}"

class="list-group-item list-group-item-action">

${tool.name}

</a>

`;

            }

        });

    });

}
