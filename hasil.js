// =====================================
// hasil.js
// Final Version
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // Ambil data Local Storage
    // ==============================

    const recommendations = loadRecommendations();

    const preference = JSON.parse(
        localStorage.getItem("userPreference")
    );

    if (
        !recommendations ||
        recommendations.length === 0 ||
        !preference
    ) {

        alert("Data rekomendasi tidak ditemukan.");

        return;
    }

    // ==============================
    // Motor terbaik
    // ==============================

    const bestMotor = recommendations[0];

    // ==============================
    // Helper
    // ==============================

    function setText(id, value) {

        const element = document.getElementById(id);

        if (element) {

            element.textContent = value;

        }

    }

    // ==============================
    // Summary Preference
    // ==============================

    setText(
        "summaryBudget",
        "Rp " + Number(preference.budget).toLocaleString("id-ID")
    );

    setText(
        "summaryJenisMotor",
        preference.jenis_motor
    );

    setText(
        "summaryCC",
        preference.cc
    );

    setText(
        "summaryBBM",
        preference.bbm
    );

    setText(
        "summaryBagasi",
        preference.bagasi
    );

    setText(
        "summaryTinggiBadan",
        preference.tinggi_jok + " mm"
    );

    setText(
        "summaryHarian",
        preference.harian == "1"
            ? "Ya"
            : "Tidak"
    );

    setText(
        "summaryTouring",
        preference.touring == "1"
            ? "Ya"
            : "Tidak"
    );

    // ==============================
    // Informasi Utama
    // ==============================
const topRecommendations =
    recommendations.slice(0, 5);

    setText(
        "totalRecommendation",
        `Ditemukan ${recommendations.length} rekomendasi terbaik`
    );

    setText(
        "bestMotorName",
        bestMotor.nama_motor
    );

    setText(
        "bestMotorCategory",
        bestMotor.merek + " • " + bestMotor.jenis_motor
    );

    setText(
        "bestMotorScore",
        (bestMotor.similarity * 100).toFixed(0) + "%"
    );

    setText(
        "bestMotorPrice",
        "Rp " + bestMotor.harga.toLocaleString("id-ID")
    );

    // ==============================
    // Technical Specs
    // ==============================

    setText(
        "specCC",
        bestMotor.cc + " CC"
    );

    setText(
        "specBBM",
        bestMotor.bbm + " km/l"
    );

    setText(
        "specBagasi",
        bestMotor.bagasi + " Liter"
    );

    setText(
        "specJok",
        bestMotor.tinggi_jok + " mm"
    );

    setText(
        "specSimilarity",
        bestMotor.similarity.toFixed(2)
    );

    setText(
        "specPersen",
        (bestMotor.similarity * 100).toFixed(0) + "%"
    );

    // ==============================
    // Penjelasan
    // ==============================

    const alasanContainer =
        document.getElementById("hasil-container");

    if (!alasanContainer) return;

alasanContainer.innerHTML = `

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        ${bestMotor.explanation

            .sort((a, b) => b.skor - a.skor)

            .map(item => {

                const warna =

                    item.skor >= 0.8
                        ? "text-green-500"

                        : item.skor >= 0.5
                            ? "text-yellow-500"

                            : "text-red-500";

                return `

                    <div class="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">

                        <span class="material-symbols-outlined ${warna}">
                            analytics
                        </span>

                        <span class="text-sm text-slate-700">

                            ${item.kriteria}

                            <strong>
                                (${(item.skor * 100).toFixed(0)}%)
                            </strong>

                        </span>

                    </div>

                `;

            }).join("")}

    </div>

    <div class="mt-8 bg-blue-100 rounded-xl p-5 text-blue-800">

        <strong>
            Ringkasan Explainable Recommendation
        </strong>

        <br><br>

        <div class="mb-3">

            <strong>
                Similarity Score:
                ${(bestMotor.similarity * 100).toFixed(2)}%
            </strong>

        </div>

        ${bestMotor.reason}

    </div>

`;

// =====================================
// Ranking #2 - #5
// =====================================

const rankingContainer =
    document.getElementById("ranking-lainnya");

if (rankingContainer) {

    const rankingLain =
        recommendations.slice(1, 5);

    rankingContainer.innerHTML = `

        <div
            class="bg-white rounded-3xl shadow-lg border border-slate-100 p-8"
        >

            <h2
                class="text-2xl font-bold text-slate-800 mb-8 text-center"
            >
                Ranking Rekomendasi Lainnya
            </h2>

            <div class="space-y-5">

                ${rankingLain.map((motor, index) => `

                    <div
                        class="border border-slate-200 rounded-2xl p-5 hover:shadow-md transition"
                    >

                        <div
                            class="flex flex-col md:flex-row md:justify-between md:items-center gap-4"
                        >

                            <!-- Kiri -->
                            <div class="flex items-center gap-4">

                                <div
                                    class="w-12 h-12 rounded-full bg-blue-100 text-primary font-bold flex items-center justify-center"
                                >
                                    #${index + 2}
                                </div>

                                <div>

                                    <div
                                        class="text-lg font-bold text-slate-800"
                                    >
                                        ${motor.nama_motor}
                                    </div>

                                    <div
                                        class="text-sm text-slate-500"
                                    >
                                        ${motor.merek}
                                        •
                                        ${motor.jenis_motor}
                                    </div>

                                </div>

                            </div>

                            <!-- Kanan -->
                            <div
                                class="text-left md:text-right"
                            >

                                <div
                                    class="text-2xl font-bold text-primary"
                                >
                                    ${(motor.similarity * 100).toFixed(2)}%
                                </div>

                                <div
                                    class="text-sm text-slate-500"
                                >
                                    Similarity Score
                                </div>

                                <div
                                    class="mt-2 font-medium text-slate-700"
                                >
                                    Rp ${motor.harga.toLocaleString("id-ID")}
                                </div>

                            </div>

                        </div>

                    </div>

                `).join("")}

            </div>

        </div>

    `;
}

});