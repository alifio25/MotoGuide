// =====================================
// recommendation.js
// =====================================

// =====================================
// Mengambil rekomendasi
// =====================================

async function getRecommendations(preference) {

    // Ambil dataset motor
    const response =
        await fetch("motor.json");

    const motors =
        await response.json();

    // Hitung similarity seluruh motor
    const recommendationResults =
        motors.map((motor) => {

            const result =
                calculateSimilarity(
                    preference,
                    motor
                );

            return {

                ...motor,

                similarity:
                    result.similarity,

                explanation:
                    result.explanation,

                reason:
                    generateExplanation(
                        result.explanation,
                        result.similarity
                    )

            };

        });

    // Ranking Top 5
    return rankRecommendations(
        recommendationResults,
        5
    );

}

// =====================================
// Simpan hasil rekomendasi
// =====================================

function saveRecommendations(results) {

    localStorage.setItem(
        "recommendations",
        JSON.stringify(results)
    );

}

// =====================================
// Ambil hasil rekomendasi
// =====================================

function loadRecommendations() {

    const data =
        localStorage.getItem(
            "recommendations"
        );

    if (!data) {

        return [];

    }

    return JSON.parse(data);

}

// =====================================
// Generate rekomendasi
// =====================================

async function generateRecommendations(preference) {

    try {

        console.log(
            "generateRecommendations dijalankan"
        );

        const recommendations =
            await getRecommendations(
                preference
            );

        console.log(
            "Hasil recommendation:",
            recommendations
        );

        saveRecommendations(
            recommendations
        );

        console.log(
            "Data berhasil disimpan"
        );

        return recommendations;

    } catch (error) {

        console.error(
            "Gagal membuat rekomendasi:",
            error
        );

        return [];

    }

}