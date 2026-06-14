// =====================================
// similarity.js
// Weighted Content-Based Filtering
// =====================================

function calculateSimilarity(preference, motor) {

    let totalScore = 0;
    let totalWeight = 0;

    let explanation = [];

    // =====================================
    // 1. Budget
    // =====================================

    let budgetScore = 0;

    if (motor.harga <= preference.budget) {

        budgetScore = 1;

    } else {

        budgetScore = Math.max(
            0,
            1 -
            (
                (motor.harga - preference.budget) /
                preference.budget
            )
        );

    }

    totalScore += budgetScore * weights.budget;
    totalWeight += weights.budget;

    explanation.push({
        kriteria: "Harga",
        skor: budgetScore
    });

    // =====================================
    // 2. Jenis Motor
    // =====================================

    const jenisScore =
        preference.jenis_motor === motor.jenis_motor
            ? 1
            : 0;

    totalScore += jenisScore * weights.jenis;
    totalWeight += weights.jenis;

    explanation.push({
        kriteria: "Jenis Motor",
        skor: jenisScore
    });

    // =====================================
    // 3. Kapasitas Mesin (CC)
    // =====================================

    let ccScore = 0;

    switch (preference.cc) {

        case "110-150":

            ccScore =
                motor.cc >= 110 &&
                motor.cc <= 150
                    ? 1
                    : 0;

            break;

        case "150-160":

            ccScore =
                motor.cc >= 150 &&
                motor.cc <= 160
                    ? 1
                    : 0;

            break;

        case "160-250":

            ccScore =
                motor.cc >= 160 &&
                motor.cc <= 250
                    ? 1
                    : 0;

            break;

        case "250+":

            ccScore =
                motor.cc >= 250
                    ? 1
                    : 0;

            break;

        default:

            ccScore = 0;

    }

    totalScore += ccScore * weights.cc;
    totalWeight += weights.cc;

    explanation.push({
        kriteria: "CC Mesin",
        skor: ccScore
    });

    // =====================================
    // 4. Konsumsi BBM
    // =====================================

    let bbmKategori = "";

    if (motor.bbm >= 50) {

        bbmKategori = "tinggi";

    } else if (motor.bbm >= 40) {

        bbmKategori = "sedang";

    } else {

        bbmKategori = "rendah";

    }

    const bbmScore =
        preference.bbm === bbmKategori
            ? 1
            : 0;

    totalScore += bbmScore * weights.bbm;
    totalWeight += weights.bbm;

    explanation.push({
        kriteria: "Efisiensi BBM",
        skor: bbmScore
    });

    // =====================================
    // 5. Kapasitas Bagasi
    // =====================================

    let bagasiKategori = "";

    if (motor.bagasi > 18) {

        bagasiKategori = "besar";

    } else if (
        motor.bagasi >= 10 &&
        motor.bagasi <= 18
    ) {

        bagasiKategori = "sedang";

    } else {

        bagasiKategori = "kecil";

    }

    const bagasiScore =
        preference.bagasi === bagasiKategori
            ? 1
            : 0;

    totalScore += bagasiScore * weights.bagasi;
    totalWeight += weights.bagasi;

    explanation.push({
        kriteria: "Bagasi",
        skor: bagasiScore
    });

    // =====================================
    // 6. Tinggi Jok
    // =====================================

    const tinggiScore = Math.max(

        0,

        1 -

        Math.abs(
            preference.tinggi_jok -
            motor.tinggi_jok
        ) /

        Math.max(
            preference.tinggi_jok,
            motor.tinggi_jok
        )

    );

    totalScore += tinggiScore * weights.tinggi;
    totalWeight += weights.tinggi;

    explanation.push({
        kriteria: "Tinggi Jok",
        skor: tinggiScore
    });

    // =====================================
    // 7. Penggunaan Harian
    // =====================================

    const motorHarian =
        motor.harian === "Ya"
            ? "1"
            : "0";

    const harianScore =
        preference.harian === motorHarian
            ? 1
            : 0;

    totalScore += harianScore * weights.harian;
    totalWeight += weights.harian;

    explanation.push({
        kriteria: "Penggunaan Harian",
        skor: harianScore
    });

    // =====================================
    // 8. Touring
    // =====================================

    const motorTouring =
        motor.touring === "Ya"
            ? "1"
            : "0";

    const touringScore =
        preference.touring === motorTouring
            ? 1
            : 0;

    totalScore += touringScore * weights.touring;
    totalWeight += weights.touring;

    explanation.push({
        kriteria: "Touring",
        skor: touringScore
    });

    // =====================================
    // Final Similarity Score
    // =====================================

    const similarity = totalWeight > 0

        ? Number(
            (totalScore / totalWeight).toFixed(4)
        )

        : 0;

    return {

        similarity,

        explanation

    };

}

// =====================================
// Explainable Recommendation
// =====================================

function generateExplanation(
    explanation,
    similarity = 0
) {

    const cocok = explanation
        .filter(item => item.skor >= 0.8);

    const kurangCocok = explanation
        .filter(item => item.skor < 0.5);

    let text =

        `Berdasarkan perhitungan Weighted Content-Based Filtering, ` +

        `motor ini memperoleh tingkat kemiripan sebesar ` +

        `${(similarity * 100).toFixed(2)}%. `;

    if (cocok.length > 0) {

        text +=

            `Rekomendasi ini didukung oleh kesesuaian pada kriteria ` +

            cocok

                .map(item =>
                    `${item.kriteria} (${(item.skor * 100).toFixed(0)}%)`
                )

                .join(", ") +

            `. `;

    }

    if (kurangCocok.length > 0) {

        text +=

            `Terdapat perbedaan pada kriteria ` +

            kurangCocok

                .map(item => item.kriteria)

                .join(", ") +

            `, namun motor ini tetap memiliki skor tertinggi dibandingkan alternatif lainnya.`;

    }

    return text;

}