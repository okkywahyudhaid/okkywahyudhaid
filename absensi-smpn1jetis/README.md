# Absensi Guru SMP Negeri 1 Jetis

Aplikasi ini ditempatkan di folder tersendiri agar aplikasi ujian pada root repository tidak berubah.

## Arsitektur
- Frontend: HTML statis di Vercel.
- API bridge: `/api/gas` pada Vercel.
- Backend dan autentikasi: Google Apps Script.
- Database: Google Sheets.

## Langkah aktivasi backend
1. Buka proyek Google Apps Script yang memakai spreadsheet absensi.
2. Salin isi `Code.gs` dari folder ini ke proyek Apps Script tersebut (atau tambahkan fungsi `doPost` yang ada di bagian akhir file; jangan menggandakan fungsi yang sudah ada).
3. Pastikan fungsi-fungsi backend yang dipanggil tersedia dan terhubung ke spreadsheet yang benar.
4. Deploy > Manage deployments > Edit deployment (ikon pensil) > pilih New version > Deploy.
5. Pastikan deployment sebagai Web app menggunakan Execute as: Me dan akses sesuai kebijakan akun/sekolah (untuk akses publik aplikasi, biasanya Anyone).
6. Salin URL Web app yang berakhir dengan `/exec`.

## Environment Variable Vercel
Tambahkan `GAS_WEB_APP_URL` pada Settings > Environment Variables. Nilainya adalah URL Web app Apps Script yang berakhir `/exec`. Pilih Production dan Preview, lalu lakukan redeploy.

## Catatan
- Jangan menaruh password atau token di HTML.
- Semua pemanggilan frontend melewati API bridge Vercel.
- Fungsi API Apps Script dibatasi ke daftar metode yang diizinkan pada `doPost`.
- Data tetap tersimpan di Google Sheets; Supabase tidak digunakan.
