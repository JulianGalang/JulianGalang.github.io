function KirimPesan() {
    var pesan = document.getElementById('pesan');
    var token = '6460708675:AAF56-2-m201znZzTCIIERLoeUG6N1nA7HU';
    var group = '-4179191347';
    const now = new Date();

    // Mendapatkan nama hari, tanggal, bulan, tahun, dan jam dalam format Indonesia
    const options = {
        weekday: 'long', // nama hari dalam seminggu
        year: 'numeric', // tahun
        month: 'long', // nama bulan
        day: 'numeric', // tanggal dalam bulan
        hour: '2-digit', // jam
        minute: '2-digit', // menit
        second: '2-digit', // detik
        hour12: false // menggunakan format 24 jam
    };
    const tanggal = new Intl.DateTimeFormat('id-ID', options).format(now);

    var gabungan = tanggal + '%0APesan%20%3A%0A' + pesan.value;
    if (!pesan.value.trim()) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Textarea tidak boleh kosong!',
        });
    } else {
        $.ajax({
            url: `https://api.telegram.org/bot${token}/sendMessage?chat_id=${group}&text=${gabungan}&parse_mode=html`,
            method: `POST`
        })
        Swal.fire({
            title: "Berhasil kirim pesan",
            text: "Semoga dibaca ya pesannya ><",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OKEYYY"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'index.html';
            }
        });

    }
}