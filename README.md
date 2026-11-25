# BANANA CRUNCH — Marketplace Kelompok 4

Website katalog dan pemesanan sederhana berbasis HTML, CSS, dan JavaScript.

## Cara menjalankan
- Buka `index.html` di browser untuk melihat website.
- Untuk menerbitkan di GitHub Pages, unggah seluruh isi folder ini ke repository GitHub.
- Di repository, buka **Settings → Pages**.
- Pada **Build and deployment**, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu **Save**.

## WAJIB sebelum digunakan menerima pesanan
Buka `script.js`, cari baris:
`const WHATSAPP_NUMBER = "6281234567890";`
Ganti dengan nomor WhatsApp Business penjual. Gunakan format internasional Indonesia: 62 diikuti nomor, tanpa tanda +, spasi, atau 0 di depan.

## Harga yang dimasukkan
- Original: Rp12.000
- Cokelat: Rp15.000
- Stroberi: Rp15.000
- Matcha: Rp15.000
- Taro: Rp15.000

## Catatan penting
- Rating bintang 5 ditampilkan sebagai elemen desain, bukan ulasan pelanggan terverifikasi.
- Komposisi produk di detail adalah rancangan awal/contoh. Pastikan kelompok menggantinya dengan komposisi dan bahan tambahan yang benar-benar digunakan sebelum website dipublikasikan.
- Website menghitung total belanja dan menyusun pesan WhatsApp. Pelanggan tetap perlu menekan tombol **Kirim** di WhatsApp.
- Keranjang disimpan di browser pelanggan menggunakan localStorage. Tidak ada database atau pembayaran online otomatis.
