/** @format */
function KirimPesan() {
  var nama = document.getElementById("name");
  var pesan = document.getElementById("message");
  var token = "6460708675:AAF56-2-m201znZzTCIIERLoeUG6N1nA7HU";
  var group = "-4548083582";
  const now = new Date();

  // Mendapatkan nama hari, tanggal, bulan, tahun, dan jam dalam format Indonesia
  const options = {
    weekday: "long", // nama hari dalam seminggu
    year: "numeric", // tahun
    month: "long", // nama bulan
    day: "numeric", // tanggal dalam bulan
    hour: "2-digit", // jam
    minute: "2-digit", // menit
    second: "2-digit", // detik
    hour12: false, // menggunakan format 24 jam
  };
  const tanggal = new Intl.DateTimeFormat("id-ID", options).format(now);

  var gabungan =
    tanggal +
    "%0ANama%20%3A%20" +
    nama.value +
    "%0APesan%20%3A%20" +
    pesan.value;

  // Validasi input nama dan pesan
  if (!nama.value.trim()) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Nama dan pesan tidak boleh kosong!",
    });
  } else if (!pesan.value.trim()) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Nama dan pesan tidak boleh kosong!",
    });
  } else {
    // Log untuk melihat apakah proses masuk ke sini
    console.log("Mengirim pesan ke Telegram...");

    // AJAX request untuk mengirim pesan ke Telegram
    $.ajax({
      url: `https://api.telegram.org/bot${token}/sendMessage?chat_id=${group}&text=${gabungan}&parse_mode=html`,
      method: "POST",
    })
      .done(function (response) {
        console.log("Pesan terkirim: ", response);
        // Menampilkan SweetAlert setelah pesan terkirim
        Swal.fire({
          title: "Berhasil kirim pesan",
          text: "Semoga dibaca ya pesannya ><",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OKEYYY",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "index.html"; // Redirect setelah user menekan "OKEYYY"
          }
        });
      })
      .fail(function (error) {
        console.error("Error: ", error);
        // Menampilkan SweetAlert jika ada kesalahan saat mengirim pesan
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.",
        });
      });
  }
}
