// =====================================
// ranking.js
// Ranking Weighted Content Based Filtering
// =====================================

function rankRecommendations(
    recommendations,
    topN = 5
) {

    const ranked = [...recommendations]

        .sort((a, b) => {

            if (b.similarity !== a.similarity) {

                return b.similarity - a.similarity;

            }

            return a.harga - b.harga;

        });

    return ranked.slice(
        0,
        Math.min(topN, ranked.length)
    );

}