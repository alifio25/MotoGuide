// =====================================
// detail.js
// Menampilkan Detail Motor Ranking #1
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // Ambil data rekomendasi
    // =====================================

    const recommendations = JSON.parse(

        localStorage.getItem("recommendations")

    ) || [];

    // =====================================
    // Jika tidak ada data
    // =====================================

    if (recommendations.length === 0) {

        alert("Data rekomendasi tidak ditemukan.");

        window.location.href = "index.html";

        return;

    }

    // =====================================
    // Ambil Ranking #1
    // =====================================

    const motor = recommendations[0];

    // =====================================
    // Helper
    // =====================================

    function setText(id, value) {

        const element = document.getElementById(id);

        if (element) {

            element.textContent = value;

        }

    }

    // =====================================
    // Header
    // =====================================

    setText(

        "detailNamaMotor",

        motor.nama_motor

    );

    setText(

        "detailSimilarity",

        "Skor Kecocokan " +

        (motor.similarity * 100).toFixed(2) +

        "%"

    );

    // =====================================
    // Informasi Motor
    // =====================================

    setText(

        "detailNama",

        motor.nama_motor

    );

    setText(

        "detailMerek",

        motor.merek

    );

    setText(

        "detailJenis",

        motor.jenis_motor

    );

    setText(

        "detailHarga",

        "Rp " +

        motor.harga.toLocaleString("id-ID")

    );

    setText(

        "detailCC",

        motor.cc + " cc"

    );

    setText(

        "detailBBM",

        motor.bbm + " km/l"

    );

    setText(

        "detailBagasi",

        motor.bagasi + " Liter"

    );

    setText(

        "detailJok",

        motor.tinggi_jok + " mm"

    );

    setText(

        "detailBerat",

        motor.berat + " kg"

    );

    setText(

        "detailTangki",

        motor.tangki + " Liter"

    );

    setText(

        "detailHarian",

        motor.harian

    );

    setText(

        "detailTouring",

        motor.touring

    );

    setText(

        "detailPerforma",

        motor.performa

    );

    // =====================================
    // Explainable Recommendation
    // =====================================

    const explanationContainer = document.getElementById(

        "detailExplanation"

    );

    if (

        explanationContainer &&

        motor.explanation &&

        motor.explanation.length > 0

    ) {

        explanationContainer.innerHTML = "";

        motor.explanation

            .sort(

                (a, b) => b.skor - a.skor

            )

            .forEach(item => {

                const li = document.createElement("li");

                li.className =

                    "bg-blue-50 border border-blue-100 rounded-lg p-3 flex justify-between items-center";

                li.innerHTML = `

                    <span>

                        ${item.kriteria}

                    </span>

                    <span class="font-bold text-blue-700">

                        ${(item.skor * 100).toFixed(0)}%

                    </span>

                `;

                explanationContainer.appendChild(li);

            });

    }

});