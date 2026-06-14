document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("preferenceForm");

    if (!form) return;

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        // ===========================
        // Tinggi badan
        // ===========================

        const tinggiBadan = parseInt(
            document.getElementById("tinggi_badan").value
        ) || 0;

        // ===========================
        // Konversi tinggi badan
        // menjadi tinggi jok ideal
        // ===========================

        let tinggiJok = 780;

        if (tinggiBadan <= 165) {

            tinggiJok = 760;

        }
        else if (tinggiBadan <= 175) {

            tinggiJok = 780;

        }
        else {

            tinggiJok = 810;

        }

        // ===========================
        // Preference User
        // ===========================

        const preference = {

            budget: parseInt(
                document.getElementById("budget").value
            ) || 0,

            jenis_motor:
                document.getElementById("jenis_motor").value,

            cc:
                document.getElementById("cc").value,

            bbm:
                document.getElementById("bbm").value,

            bagasi:
                document.getElementById("bagasi").value,

            tinggi_badan: tinggiBadan,

            tinggi_jok: tinggiJok,

            harian:
                document.getElementById("harian").value,

            touring:
                document.getElementById("touring").value

        };

        // ===========================
        // Validasi sederhana
        // ===========================

        if (

            !preference.budget ||

            !preference.jenis_motor ||

            !preference.cc ||

            !preference.bbm ||

            !preference.bagasi

        ) {

            alert("Silakan lengkapi seluruh preferensi.");

            return;

        }

        console.log(
            "Preference User :",
            preference
        );

        // ===========================
        // Simpan Local Storage
        // ===========================

        localStorage.setItem(
            "userPreference",
            JSON.stringify(preference)
        );

        try {

            // ===========================
            // Generate Recommendation
            // ===========================

            console.log("Mulai Generate");

    await generateRecommendations(
        preference
    );

            // ===========================
            // Redirect ke halaman hasil
            // ===========================

            window.location.href =
                "Hasil_rekomendasi.html";

        }
        catch (error) {

            console.error(
                "Gagal membuat rekomendasi:",
                error
            );

            alert(
                "Terjadi kesalahan saat membuat rekomendasi. Silakan cek Console (F12)."
            );

        }

    });

});