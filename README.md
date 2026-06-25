# Portofolio — Muhammad Ulil Albab

Website portofolio statis (HTML, CSS, JS, JSON) bertema dark/circuit untuk profesi **Electronics Technician**.

## Struktur folder

```
portfolio/
├── index.html              -> halaman utama
├── css/style.css            -> semua styling
├── js/main.js                -> render konten dari JSON + logika modal detail
├── data/content.json         -> SEMUA isi teks (profil, pendidikan, pengalaman, skill, kontak)
├── assets/
│   ├── images/profile.jpg    -> ganti dengan foto profil kamu
│   └── docs/CV-Muhammad-Ulil-Albab.pdf -> ganti dengan file CV asli (PDF)
└── README.md
```

## Cara mengedit isi

Hampir semua teks (nama, deskripsi, pendidikan, pengalaman, skill, kontak) ada di
**`data/content.json`**. Kamu tidak perlu menyentuh HTML/JS untuk mengubah isi —
cukup edit angka/teks di file JSON itu.

- Tambah skill baru → tambahkan object baru di array `skills` (gunakan `icon`:
  `tool`, `speaker`, `cpu`, atau `code`).
- Tambah pengalaman/pendidikan baru → tambahkan object baru di array
  `experience` / `education`.
- Klik kartu di halaman akan otomatis memunculkan modal berisi field `detail`.

## Mengganti foto & CV

Nama file foto yang dipakai kode (taruh di `assets/images/`):

| Bagian | Nama file |
|---|---|
| Foto profil (hero) | `profile.jpg` |
| Foto pengalaman 1 — CV Berkah Teknik | `exp-berkah-teknik.jpg` |
| Foto pengalaman 2 — CV Sarana Cipta Media | `exp-sarana-cipta-media.jpg` |
| Foto project 1 | `project-1.jpg` |
| Foto project 2 | `project-2.jpg` |

Tambah project baru → duplikat salah satu object di array `projects` pada
`data/content.json`, beri `id`, `image` (mis. `project-3.jpg`), dan isi
`detail`-nya. Kartu baru otomatis muncul di halaman.

CV asli (PDF) → simpan sebagai:
```
assets/docs/CV-Muhammad-Ulil-Albab.pdf
```
Tombol "UNDUH CV" di navbar otomatis mengarah ke file ini.

Jika file belum ada, halaman tetap berjalan normal (foto akan menampilkan
inisial "MA" sebagai fallback, dan kartu project tanpa gambar akan
menyembunyikan area foto).

## Kontak (klik langsung menghubungi)

Diatur lewat `profile` di `data/content.json`:

- `"whatsapp"`: nomor tanpa "+" dan tanpa angka 0 di depan, mis. `"6282134364968"` untuk `082134364968`. Dipakai untuk link `https://wa.me/...` — saat diklik langsung membuka chat WhatsApp.
- `"email"`: dipakai untuk link `mailto:` — saat diklik langsung membuka aplikasi email.
- `"instagram"`: link ke profil Instagram.

## Menjalankan secara lokal

Browser memblokir `fetch()` ke file JSON jika dibuka langsung sebagai
`file://`. Jalankan server lokal sederhana dari folder ini:

```bash
python3 -m http.server 8000
```

lalu buka `http://localhost:8000` di browser.

## Deploy ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `portfolio`.
2. Di folder ini, jalankan:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/USERNAME/portfolio.git
   git push -u origin main
   ```

3. Di GitHub: **Settings → Pages → Source: Deploy from a branch →
   Branch: `main` / folder: `/ (root)` → Save**.
4. Tunggu 1–2 menit, situs akan tersedia di:
   `https://USERNAME.github.io/portfolio/`

## Kustomisasi tampilan

- Warna utama (amber/cyan) bisa diubah di bagian `:root` paling atas
  `css/style.css`.
- Background sudah hitam (`--bg: #07090b`) dengan pola grid tipis ala papan
  sirkuit (circuit board).
- Font: Space Grotesk (judul), Inter (body), IBM Plex Mono (label/data).
