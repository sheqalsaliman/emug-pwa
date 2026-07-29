/* ===== EMUG SYSTEM — app.js (v2) ===== */
'use strict';

// ─── SUPABASE ─────────────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://mrurkcrgncpqmhrszapi.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ydXJrY3JnbmNwcW1ocnN6YXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3OTM5MDYsImV4cCI6MjA5NDM2OTkwNn0.K2Ltr05cyAcZleBufxreICNPwtQXzryTRscYZsnTE6w';
console.log('[EMUG] Supabase URL:', SUPABASE_URL);
console.log('[EMUG] Supabase KEY (first 20 chars):', SUPABASE_KEY.slice(0, 20));
console.log('[EMUG] window.supabase available:', !!window.supabase);
if(!window.supabase) {
  console.error('[EMUG] CRITICAL: Supabase library not loaded. Check CDN script tag in index.html.');
}
const db = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;
console.log('[EMUG] Supabase client (db):', db ? 'initialized' : 'NULL — CDN failed');

function showLoading(msg) {
  const o = document.getElementById('loading-overlay');
  const m = document.getElementById('loading-msg');
  if(o) o.style.display = 'flex';
  if(m && msg) m.textContent = msg;
}
function hideLoading() {
  const o = document.getElementById('loading-overlay');
  if(o) { o.style.opacity = '0'; setTimeout(() => { o.style.display = 'none'; o.style.opacity = '1'; }, 300); }
}
function showLoadingError(msg) {
  const errEl  = document.getElementById('loading-error');
  const btnEl  = document.getElementById('loading-dismiss');
  const msgEl  = document.getElementById('loading-msg');
  const barEl  = document.getElementById('loading-bar');
  if(errEl)  { errEl.textContent = msg; errEl.style.display = 'block'; }
  if(btnEl)  { btnEl.style.display = 'inline-block'; }
  if(msgEl)  { msgEl.style.color = 'rgba(255,255,255,.35)'; }
  if(barEl)  { barEl.style.animation = 'none'; barEl.style.background = '#ef5350'; barEl.style.width = '100%'; }
}

// ─── LANGUAGE STRINGS ────────────────────────────────────────────────────────
const T = {
  bm: {
    tagline:'Pakar Paip & Pembetungan Johor',
    staffLoginBtn:'Log Masuk Kakitangan',
    badge:'Berlesen & berpengalaman sejak 2015',
    heroTitle:'Masalah paip?<br><span class="lp-headline-accent">Buat aduan dalam 1 minit.</span>',
    heroSub:'Pasukan pakar kami di seluruh Johor sedia membantu — dari paip bocor hingga tangki najis. Respons pantas, kerja berjamin.',
    heroTag:'Pasir Gudang, Johor &nbsp;•&nbsp; Sejak 2015',
    heroCta:'📋 Buat Aduan',
    heroTrack:'🔍 Semak Status',
    svTag:'🔧 Perkhidmatan Kami',
    svTitle:'Apa Yang Kami Tawarkan',
    svSub:'Kami menyediakan pelbagai perkhidmatan paip dan pembetungan profesional di seluruh Johor.',
    svc:['Paip Bocor','Saliran Tersumbat','Tandas Tersumbat','Tangki Najis','Pemasangan Baru','Pemeriksaan Am'],
    svcDesc:['Pembaikan dan penggantian paip bocor segera','Bersihkan saliran dan longkang yang tersumbat','Naiktaraf dan pembaikan sistem tandas','Pengosongan dan pembersihan tangki septik','Pasang sistem paip baru untuk rumah atau kilang','Pemeriksaan menyeluruh sistem paip anda'],
    ctaTitle:'Ada Masalah Paip? Kami Sedia Membantu!',
    ctaSub:'Hantar aduan anda sekarang. Pasukan kami akan menghubungi anda dengan segera untuk pengesahan dan penjadualan.',
    ctaBtn1:'📋 Buat Aduan Sekarang',ctaBtn2:'🔍 Semak Status Aduan',
    qtTag:'📋 Jejak Aduan',qtTitle:'Semak Status Aduan Anda',
    qtCardTitle:'Masukkan No. Rujukan',
    qtCardSub:'Gunakan no. rujukan yang diberikan semasa anda membuat aduan (contoh: EMUG-2026-0001)',
    qtBtn:'Semak',
    cbPhone:'Telefon',cbEmail:'Emel',cbAddr:'Alamat',
    cfBack:'Kembali ke Laman Utama',
    cfTitle:'Borang Aduan / Tempahan',
    cfSub:'Isi borang di bawah dan pasukan kami akan menghubungi anda.',
    cfCardTitle:'🔧 E Man Utama Group — Borang Aduan',
    cfCardSub:'Semua maklumat adalah sulit dan selamat',
    cfName:'Nama Penuh',cfPhone:'No. Telefon',cfAddr:'Alamat Lengkap',
    cfProb:'Jenis Masalah',cfDate:'Tarikh Pilihan',cfTime:'Masa Pilihan',
    cfUrgency:'Keutamaan',cfDesc:'Penerangan Masalah',
    cfNote:'Setelah menghantar borang, anda akan menerima nombor rujukan. Simpan nombor rujukan tersebut untuk menyemak status aduan anda.',
    cfSubmit:'Hantar Aduan',
    ccTitle:'Aduan Berjaya Dihantar!',
    ccSub:'Terima kasih. Pasukan kami akan menghubungi anda untuk pengesahan dan penjadualan kerja.',
    ccRefLbl:'No. Rujukan Aduan Anda',
    ccSaveNote:'Sila simpan nombor rujukan ini untuk menyemak status aduan anda.',
    ccTrackBtn:'🔍 Semak Status',ccHomeBtn:'🏠 Kembali ke Laman Utama',
    trBack:'Kembali ke Laman Utama',
    trTitle:'Semak Status Aduan',trSub:'Masukkan nombor rujukan anda untuk menyemak status terkini.',
    trRefLbl:'No. Rujukan Aduan',trBtn:'Semak Status',
    trNotFound:'❌ No. rujukan tidak dijumpai. Sila semak semula.',
    trStatus:'Status Semasa',trAssigned:'Juruteknik',trProblem:'Masalah',
    trDate:'Tarikh Temujanji',trTime:'Masa',trSubmitted:'Tarikh Hantar',
    trLastUpdate:'Kemas Kini Terakhir',trNotes:'Nota',
    trUnassigned:'Belum ditugaskan — kami akan segera menghubungi anda.',
    trGoHome:'🏠 Kembali',trNewComplaint:'📋 Aduan Baru',
    liTagline:'Pakar Paip & Pembetungan Johor',
    liTitle:'🔐 Log Masuk Kakitangan',
    liUser:'Nama Pengguna',liPass:'Kata Laluan',
    liBtn:'Log Masuk',liDemo:'Akaun Demo — klik untuk isi:',
    liBack:'Kembali ke Laman Utama',
    liError:'Nama pengguna atau kata laluan salah.',
    dashboard:'Papan Pemuka',complaints:'Senarai Aduan',
    schedule:'Jadual Kerja',staff:'Kakitangan',
    reports:'Laporan',notifications:'Pemberitahuan',profile:'Profil Saya',
    mySchedule:'Jadual Saya',myComplaints:'Aduan Saya',
    logout:'Log Keluar',
    pending:'Menunggu',inProgress:'Sedang Berjalan',completed:'Selesai',
    all:'Semua',today:'Hari Ini',week:'Minggu',day:'Hari',
    markAllRead:'Baca Semua',markRead:'Tandakan Semua Dibaca',
    viewAll:'Lihat Semua',
    totalJobs:'Jumlah Aduan',totalStaff:'Jumlah Kakitangan',
    todayJobs:'Kerja Hari Ini',recentComplaints:'Aduan Terkini',
    staffOverview:'Ikhtisar Kakitangan',
    noJobs:'Tiada aduan dijumpai.',noNotifs:'Tiada pemberitahuan.',
    assignTo:'Tugaskan Kepada',adminNotes:'Nota Admin',
    unassigned:'Belum Ditugaskan',notAssigned:'Belum ditugaskan',
    schedDate:'Tarikh Kerja (Jadual)',
    save:'Simpan',cancel:'Batal',delete:'Padam',update:'Kemaskini',
    editComplaint:'Edit Aduan',deleteComplaint:'Padam Aduan',
    confirmDelete:'Adakah anda pasti untuk memadam aduan ini?',
    deleted:'Aduan telah dipadam.',saved:'Berjaya disimpan.',
    statusUpdated:'Status telah dikemas kini.',
    updateStatus:'Kemaskini Status',techNote:'Nota Juruteknik',
    noScheduleToday:'Tiada jadual untuk hari ini.',
    addSchedule:'Tambah Jadual',schedSaved:'Jadual berjaya disimpan.',
    dsmTitle:'Senarai Kerja',dsmEmpty:'Tiada kerja pada tarikh ini.',
    dsmAdd:'Tambah Jadual',dsmClose:'Tutup',dsmPool:'Pool (Semua Kakitangan)',
    unassignedTitle:'Job Menunggu Ditugaskan',unassignedEmpty:'Tiada job menunggu ditugaskan.',
    assignOperatorBtn:'Terima & Tugaskan Operator',assignOperatorTitle:'Tugaskan Operator',
    assignOperatorPh:'-- Pilih Operator --',assignConfirmBtn:'Sahkan Tugasan',
    editStaffBtn:'Edit',editStaffTitle:'Edit Kakitangan',editStaffSaved:'Perubahan berjaya disimpan.',
    editStaffHardcoded:'Kakitangan asas sistem tidak boleh diedit di sini.',
    editStaffPassPh:'Biarkan kosong jika tidak mahu tukar',
    assignedOk:'Job berjaya ditugaskan.',pleaseSelectOperator:'Sila pilih operator.',
    reassignWarn:'Job ini sudah ditugaskan kepada {old} — tukar kepada {new}?',
    completeNeedAfterPhoto:'Sila muat naik sekurang-kurangnya 1 gambar \'Selepas\' sebelum menandakan kerja selesai.',
    completeNoAfterConfirm:'Tiada gambar \'Selepas\' diupload — teruskan tandakan selesai?',
    saLblName:'Nama',saLblPhone:'Phone',saLblAddr:'Alamat / Lokasi',
    saLblProb:'Jenis Masalah',saLblUrgency:'Keutamaan',saProbPh:'-- Pilih Masalah --',
    saTimePh:'-- Pilih Masa --',saNeedProb:'Sila pilih jenis masalah.',
    monthNames:['Januari','Februari','Mac','April','Mei','Jun','Julai','Ogos','September','Oktober','November','Disember'],
    dayNames:['Ahad','Isnin','Selasa','Rabu','Khamis','Jumaat','Sabtu'],
    dayNamesShort:['Ahd','Isn','Sel','Rab','Kha','Jum','Sab'],
    role_admin:'Pentadbir',role_staff:'Kakitangan',
    urgencyNormal:'Normal',urgencyUrgent:'🚨 Segera',
    notifNewComplaint:'Aduan Baru Diterima',
    notifAssigned:'Kerja Baru Ditugaskan',
    notifStatusUpdate:'Status Telah Dikemas Kini',
    justNow:'Baru sahaja',minutesAgo:'minit lalu',hoursAgo:'jam lalu',yesterday:'Semalam',
    daysAgo:'hari lalu',
    refPrefix:'EMUG',
    searchPlaceholder:'Cari aduan...',
    // Media upload
    mediaLabel:'📷 Muat Naik Gambar/Video Masalah',
    mediaUploadBtn:'Klik untuk muat naik gambar/video',
    mediaUploadSub:'JPG, PNG, GIF, MP4, MOV • Maks 5 fail',
    mediaClear:'🗑️ Buang Semua',
    mediaMax:'Maksimum 5 fail dibenarkan.',
    // Location
    locBtn:'Pin Lokasi Saya',
    locHint:'atau taip alamat di atas',
    locFound:'Lokasi berjaya dikesan!',
    locFail:'GPS tidak tersedia. Sila taip alamat anda.',
    locLoading:'Mengesan lokasi...',
    locOpenMaps:'🗺️ Buka Google Maps',
    // Testimonials
    tsTag:'⭐ Ulasan Pelanggan',tsTitle:'Apa Kata Pelanggan Kami',
    tsSub:'Kepuasan pelanggan adalah keutamaan kami.',
    tsAvgLabel:'Penilaian Purata',tsCountLabel:'Ulasan Diterima',
    tsRecommend:'Mengesyorkan Kami',
    tsLeave:'Tinggalkan Ulasan Anda',
    // Feedback form
    fbBack:'Kembali ke Laman Utama',fbTitle:'Kongsi Pengalaman Anda',
    fbSub:'Ulasan anda membantu kami menambah baik perkhidmatan.',
    fbCardTitle:'⭐ Borang Penilaian Perkhidmatan',fbCardSub:'Berikan penilaian jujur anda',
    fbLblRef:'No. Rujukan Aduan',fbLblName:'Nama Anda (tidak wajib)',
    fbLblRatings:'Penilaian Perkhidmatan',
    fbLblQuality:'🔧 Kualiti Kerja',fbLblTime:'⏱️ Ketepatan Masa',fbLblService:'😊 Layanan Kakitangan',
    fbOverallLbl:'Penilaian Keseluruhan',
    fbLblComment:'Ulasan Anda',fbSubmit:'Hantar Ulasan',
    fbRefOk:'✅ Kerja telah selesai — anda boleh memberi penilaian.',
    fbRefNotDone:'⚠️ Kerja belum selesai. Penilaian boleh diberi setelah kerja selesai.',
    fbRefNotFound:'❌ No. rujukan tidak dijumpai.',
    fbCcTitle:'Terima Kasih Atas Ulasan Anda!',
    fbCcSub:'Ulasan anda telah kami terima dan akan dipaparkan setelah disemak.',
    fbCcHome:'🏠 Kembali ke Laman Utama',
    fbFeedbackCta:'Aduan anda telah selesai! Bagaimana pengalaman anda?',
    fbFeedbackCtaSub:'Luangkan masa 1 minit untuk memberi penilaian.',
    fbFeedbackBtn:'⭐ Beri Penilaian',
    fbNoRating:'Sila beri sekurang-kurangnya 1 bintang untuk semua kategori.',
    fbSubmitted:'Ulasan berjaya dihantar! Terima kasih.',
    // Gallery
    galleryTitle:'📷 Galeri Foto Kerja',
    galleryBefore:'📷 Sebelum',galleryDuring:'🔧 Semasa',galleryAfter:'✅ Selepas',
    galleryUpload:'Tambah Foto',galleryEmpty:'Tiada foto. Klik + untuk muat naik.',
    galleryCount:'foto',galleryAdded:'Foto berjaya ditambah.',galleryDeleted:'Foto dipadam.',
    galleryView:'Lihat Galeri',
    // Admin feedback
    fbaTitle:'Pengurusan Ulasan',fbaSub:'Semak dan urus ulasan pelanggan',
    fbaListTitle:'Semua Ulasan',fbaPublish:'Terbit',fbaUnpublish:'Nyahterbit',
    fbaPublished:'diterbitkan',
    fbaQuality:'Kualiti',fbaTimeliness:'Masa',fbaService:'Layanan',fbaOverall:'Keseluruhan',
    // Booking calendar
    cfBooking:'📅 Tarikh & Masa Tempahan',
    bkLegAvail:'Tersedia',bkLegLtd:'Terhad',bkLegFull:'Penuh / Tutup',
    bkSlotAvail:'slot tersedia',bkSlotFull:'Penuh',bkSlotBack:'Tukar Tarikh',
    bkSummaryLbl:'Tempahan Dipilih',bkSummaryDate:'Tarikh',bkSummaryTime:'Masa',
    bkPleaseDate:'Sila pilih tarikh dahulu.',bkPleaseSlot:'Sila pilih tarikh dan masa tempahan.',
    bkFull:'Slot ini telah penuh. Sila pilih slot lain.',
    bkNeedProb:'Sila pilih jenis masalah dahulu untuk lihat slot tempahan',
    bkJustBooked:'Maaf, slot ini baru sahaja ditempah. Sila pilih slot lain.',
    bkChecking:'Menyemak slot tersedia...',
    bkOps1:'Waktu operasi: 8:30 AM – 5:30 PM | Rehat: 12:30 – 1:30 PM (Jumaat: 12:30 – 2:30 PM)',
    bkOps2:'Sabtu: Pejabat pentadbiran tutup, namun pasukan operasi beroperasi seperti biasa.',
    bkOps3:'Kami memohon maaf sekiranya berlaku sedikit kelewatan ketibaan pasukan disebabkan perjalanan antara lokasi kerja atau kerja terdahulu yang mengambil masa lebih lama.',
    bkOps4:'Slot tempahan anda mungkin tertakluk kepada perubahan atas faktor operasi seperti cuti pasukan atau kerja terdahulu yang memerlukan masa yang lebih panjang. Kami akan menghubungi anda terlebih dahulu sekiranya perubahan diperlukan.',
    mileFree:'Lokasi anda dalam kawasan liputan percuma ({km} km dari pejabat)',
    mileCharge:'Caj perjalanan site visit: RM {amt} ({km} km dari pejabat, RM2.00/km termasuk perjalanan pergi-balik)',
    mileNote:'Caj perjalanan adalah anggaran berdasarkan jarak jalan raya dan akan disahkan oleh pihak kami.',
    milePin:'Pin lokasi anda untuk anggaran caj perjalanan',
    mileCalc:'Mengira jarak dari pejabat...',
    mileEst:'anggaran',
    mileDist:'Jarak',
    mileChargeLbl:'Caj perjalanan',
    mileFreeZone:'Free zone',
    mapBtn:'Pilih di Peta',
    mapTitle:'🗺️ Pilih Lokasi di Peta',
    mapConfirm:'✅ Sahkan Lokasi',
    mapCancel:'Batal',
    mapHint:'Klik pada peta atau seret penanda untuk pilih lokasi.',
    mapLoadFail:'Peta gagal dimuatkan. Sila semak sambungan internet.',
    shareInfo:'Kongsi Maklumat',
    shareTitle:'📤 Kongsi Maklumat Aduan',
    shareTabText:'Text',
    shareTabPng:'Gambar (PNG)',
    shareCopy:'Copy',
    shareCopied:'Disalin!',
    shareDownload:'Download PNG',
    shareNative:'Share',
    // Operator role
    role_operator:'Operator Lapangan',role_team_leader:'Ketua Pasukan',
    opDashTitle:'Papan Pemuka Operator',opDashSub:'Pengurusan kerja pasukan lapangan',
    opSchedTitle:'Jadual Kerja',opSchedSub:'Jadual kerja pasukan',
    opNewJobs:'Aduan Baru',opMyJobs:'Kerja Saya',
    opAcceptJob:'Terima Kerja',opCompleteJob:'Kerja Selesai',
    opNoNewJobs:'Tiada aduan baru pada masa ini.',opNoMyJobs:'Tiada kerja yang diterima lagi.',
    opAccepted:'Diterima',opAcceptedBy:'Diterima Oleh',opAcceptedAt:'Masa Terima',
    opCompletedAt:'Masa Selesai',opOperator:'Operator',
    opCompleteWarn:'Sila muat naik sekurang-kurangnya 1 gambar setiap kategori (Sebelum, Semasa, Selepas) sebelum menandakan kerja selesai.',
    opPhotosRequired:'Gambar Sebelum / Semasa / Selepas diperlukan',
    custPhotos:'Gambar Aduan Pelanggan',noCustPhotos:'Tiada gambar dilampirkan.',
    completionGallery:'Gambar Penyelesaian Kerja',noGalleryPhotos:'Gambar belum dimuat naik.',
    trOperator:'Operator',trAccepted:'Kerja Diterima',trCompleted:'Kerja Diselesaikan',
    fbRate:'Beri Penilaian',
    dashTitle:'Papan Pemuka',dashSub:'Selamat datang! Ini ringkasan sistem hari ini.',
    statTotal:'Jumlah Aduan',statPending:'Menunggu',statProgress:'Sedang Berjalan',
    statDone:'Selesai',statJobs:'Kerja Hari Ini',statStaff:'Jumlah Kakitangan',
    recentTitle:'Aduan Terkini',noComplaints:'Tiada aduan dijumpai.',
    schedToday:'Jadual Hari Ini',noSched:'Tiada jadual untuk hari ini.',
    notifTitle:'Pemberitahuan',noNotif:'Tiada pemberitahuan.',
    navDashboard:'Papan Pemuka',navComplaints:'Senarai Aduan',navSchedule:'Jadual Kerja',
    navStaff:'Kakitangan',navReports:'Laporan',navNotif:'Pemberitahuan',
    navFeedback:'Pengurusan Ulasan',navProfile:'Profil Saya',
    btnLogout:'Log Keluar',roleAdmin:'Pentadbir',roleStaff:'Kakitangan',
    scSub:'Lihat jadual kerja harian/mingguan',
    cpSub:'Semua aduan diterima',
    rpThRef:'No. Rujukan',rpThCust:'Pelanggan',rpThProb:'Masalah',rpThDate:'Tarikh',
    sfSub:'Urus senarai kakitangan',
    rpSub:'Statistik dan analisis kerja',
    saLblAssignType:'Jenis Penugasan',saPoolLbl:'(Semua Operator)',saDirectLbl:'👤 Assign Terus',
    saLblDate:'Tarikh',saLblTime:'Masa',
    saLblDesc:'Penerangan Kerja',saDescPlaceholder:'Penerangan tugas...',
    saSave:'Simpan',
    cfLblBkType:'Jenis Tempahan',cfBktKerja:'Pelaksanaan Kerja',cfBktSite:'Pemeriksaan Tapak',
    bkTypeBadgeKerja:'🔧 KERJA',bkTypeBadgeSite:'🔍 SITE VISIT',
    cfNamePh:'Nama penuh anda',
    cfAddrPh:'No. rumah, jalan, taman, poskod, bandar...',
    cfDescPh:'Terangkan masalah anda dengan lebih lanjut... (tidak wajib)',
    cfProbPh:'-- Pilih Masalah --',
  },
  en: {
    tagline:"Johor's Plumbing & Sewerage Expert",
    staffLoginBtn:'Staff Login',
    badge:'Licensed & experienced since 2015',
    heroTitle:'Pipe problem?<br><span class="lp-headline-accent">Lodge a complaint in 1 minute.</span>',
    heroSub:'Our expert team across Johor is ready to help — from leaking pipes to septic tanks. Fast response, guaranteed work.',
    heroTag:'Pasir Gudang, Johor &nbsp;•&nbsp; Since 2015',
    heroCta:'📋 Submit Complaint',
    heroTrack:'🔍 Track Status',
    svTag:'🔧 Our Services',
    svTitle:'What We Offer',
    svSub:'We provide a range of professional plumbing and sewerage services throughout Johor.',
    svc:['Leaking Pipe','Blocked Drain','Blocked Toilet','Septic Tank','New Installation','General Inspection'],
    svcDesc:['Immediate repair and replacement of leaking pipes','Clear blocked drains and gutters','Toilet system upgrade and repair','Emptying and cleaning of septic tanks','Install new pipe systems for homes or factories','Comprehensive inspection of your pipe system'],
    ctaTitle:'Got a Plumbing Problem? We Are Ready to Help!',
    ctaSub:'Submit your complaint now. Our team will contact you promptly for confirmation and scheduling.',
    ctaBtn1:'📋 Submit Complaint Now',ctaBtn2:'🔍 Track Complaint Status',
    qtTag:'📋 Track Complaint',qtTitle:'Check Your Complaint Status',
    qtCardTitle:'Enter Reference Number',
    qtCardSub:'Use the reference number given when you submitted your complaint (e.g. EMUG-2026-0001)',
    qtBtn:'Check',
    cbPhone:'Phone',cbEmail:'Email',cbAddr:'Address',
    cfBack:'Back to Home',
    cfTitle:'Complaint / Booking Form',
    cfSub:'Fill in the form below and our team will contact you.',
    cfCardTitle:'🔧 E Man Utama Group — Complaint Form',
    cfCardSub:'All information is confidential and secure',
    cfName:'Full Name',cfPhone:'Phone Number',cfAddr:'Full Address',
    cfProb:'Problem Type',cfDate:'Preferred Date',cfTime:'Preferred Time',
    cfUrgency:'Priority',cfDesc:'Problem Description',
    cfNote:'After submitting, you will receive a reference number. Save it to track your complaint status.',
    cfSubmit:'Submit Complaint',
    ccTitle:'Complaint Successfully Submitted!',
    ccSub:'Thank you. Our team will contact you for confirmation and job scheduling.',
    ccRefLbl:'Your Complaint Reference No.',
    ccSaveNote:'Please save this reference number to check your complaint status.',
    ccTrackBtn:'🔍 Track Status',ccHomeBtn:'🏠 Back to Home',
    trBack:'Back to Home',
    trTitle:'Track Complaint Status',trSub:'Enter your reference number to check the latest status.',
    trRefLbl:'Complaint Reference No.',trBtn:'Check Status',
    trNotFound:'❌ Reference number not found. Please check again.',
    trStatus:'Current Status',trAssigned:'Technician',trProblem:'Problem',
    trDate:'Appointment Date',trTime:'Time',trSubmitted:'Submitted On',
    trLastUpdate:'Last Updated',trNotes:'Notes',
    trUnassigned:'Not yet assigned — we will contact you shortly.',
    trGoHome:'🏠 Home',trNewComplaint:'📋 New Complaint',
    liTagline:"Johor's Plumbing & Sewerage Expert",
    liTitle:'🔐 Staff Login',
    liUser:'Username',liPass:'Password',
    liBtn:'Login',liDemo:'Demo Accounts — click to fill:',
    liBack:'Back to Home',
    liError:'Incorrect username or password.',
    dashboard:'Dashboard',complaints:'Complaint List',
    schedule:'Work Schedule',staff:'Staff',
    reports:'Reports',notifications:'Notifications',profile:'My Profile',
    mySchedule:'My Schedule',myComplaints:'My Complaints',
    logout:'Logout',
    pending:'Pending',inProgress:'In Progress',completed:'Completed',
    all:'All',today:'Today',week:'Week',day:'Day',
    markAllRead:'Read All',markRead:'Mark All as Read',
    viewAll:'View All',
    totalJobs:'Total Complaints',totalStaff:'Total Staff',
    todayJobs:"Today's Jobs",recentComplaints:'Recent Complaints',
    staffOverview:'Staff Overview',
    noJobs:'No complaints found.',noNotifs:'No notifications.',
    assignTo:'Assign To',adminNotes:'Admin Notes',
    unassigned:'Unassigned',notAssigned:'Not yet assigned',
    schedDate:'Work Date (Schedule)',
    save:'Save',cancel:'Cancel',delete:'Delete',update:'Update',
    editComplaint:'Edit Complaint',deleteComplaint:'Delete Complaint',
    confirmDelete:'Are you sure you want to delete this complaint?',
    deleted:'Complaint deleted.',saved:'Saved successfully.',
    statusUpdated:'Status updated.',
    updateStatus:'Update Status',techNote:'Technician Note',
    noScheduleToday:'No schedule for today.',
    addSchedule:'Add Schedule',schedSaved:'Schedule saved.',
    dsmTitle:'Job List',dsmEmpty:'No jobs on this date.',
    dsmAdd:'Add Schedule',dsmClose:'Close',dsmPool:'Pool (All Staff)',
    unassignedTitle:'Jobs Awaiting Assignment',unassignedEmpty:'No jobs awaiting assignment.',
    assignOperatorBtn:'Accept & Assign Operator',assignOperatorTitle:'Assign Operator',
    assignOperatorPh:'-- Select Operator --',assignConfirmBtn:'Confirm Assignment',
    editStaffBtn:'Edit',editStaffTitle:'Edit Staff',editStaffSaved:'Changes saved successfully.',
    editStaffHardcoded:'Built-in system staff cannot be edited here.',
    editStaffPassPh:'Leave blank to keep unchanged',
    assignedOk:'Job assigned successfully.',pleaseSelectOperator:'Please select an operator.',
    reassignWarn:'This job is already assigned to {old} — change to {new}?',
    completeNeedAfterPhoto:'Please upload at least 1 \'After\' photo before marking the job complete.',
    completeNoAfterConfirm:'No \'After\' photo uploaded — proceed to mark as complete anyway?',
    saLblName:'Name',saLblPhone:'Phone',saLblAddr:'Address / Location',
    saLblProb:'Problem Type',saLblUrgency:'Priority',saProbPh:'-- Select Problem --',
    saTimePh:'-- Select Time --',saNeedProb:'Please select a problem type.',
    monthNames:['January','February','March','April','May','June','July','August','September','October','November','December'],
    dayNames:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    dayNamesShort:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    role_admin:'Admin',role_staff:'Staff',
    urgencyNormal:'Normal',urgencyUrgent:'🚨 Urgent',
    notifNewComplaint:'New Complaint Received',
    notifAssigned:'New Job Assigned',
    notifStatusUpdate:'Status Updated',
    justNow:'Just now',minutesAgo:'minutes ago',hoursAgo:'hours ago',yesterday:'Yesterday',
    daysAgo:'days ago',
    refPrefix:'EMUG',
    searchPlaceholder:'Search complaints...',
    // Media upload
    mediaLabel:'📷 Upload Problem Photos/Videos',
    mediaUploadBtn:'Click to upload photos/videos',
    mediaUploadSub:'JPG, PNG, GIF, MP4, MOV • Max 5 files',
    mediaClear:'🗑️ Clear All',
    mediaMax:'Maximum 5 files allowed.',
    // Location
    locBtn:'Pin My Location',
    locHint:'or type your address above',
    locFound:'Location detected successfully!',
    locFail:'GPS not available. Please type your address.',
    locLoading:'Detecting location...',
    locOpenMaps:'🗺️ Open Google Maps',
    // Testimonials
    tsTag:'⭐ Customer Reviews',tsTitle:'What Our Customers Say',
    tsSub:'Customer satisfaction is our top priority.',
    tsAvgLabel:'Average Rating',tsCountLabel:'Reviews Received',
    tsRecommend:'Recommend Us',
    tsLeave:'Leave Your Review',
    // Feedback form
    fbBack:'Back to Home',fbTitle:'Share Your Experience',
    fbSub:'Your feedback helps us improve our service.',
    fbCardTitle:'⭐ Service Rating Form',fbCardSub:'Give us your honest rating',
    fbLblRef:'Complaint Reference No.',fbLblName:'Your Name (optional)',
    fbLblRatings:'Service Ratings',
    fbLblQuality:'🔧 Work Quality',fbLblTime:'⏱️ Punctuality',fbLblService:'😊 Staff Service',
    fbOverallLbl:'Overall Rating',
    fbLblComment:'Your Review',fbSubmit:'Submit Review',
    fbRefOk:'✅ Job is completed — you may submit a rating.',
    fbRefNotDone:'⚠️ Job is not yet completed. Rating can be given after completion.',
    fbRefNotFound:'❌ Reference number not found.',
    fbCcTitle:'Thank You for Your Review!',
    fbCcSub:'Your review has been received and will be published after moderation.',
    fbCcHome:'🏠 Back to Home',
    fbFeedbackCta:'Your complaint is resolved! How was your experience?',
    fbFeedbackCtaSub:'Take 1 minute to rate our service.',
    fbFeedbackBtn:'⭐ Rate Our Service',
    fbNoRating:'Please give at least 1 star for all categories.',
    fbSubmitted:'Review submitted! Thank you.',
    // Gallery
    galleryTitle:'📷 Job Photo Gallery',
    galleryBefore:'📷 Before',galleryDuring:'🔧 During',galleryAfter:'✅ After',
    galleryUpload:'Add Photo',galleryEmpty:'No photos. Click + to upload.',
    galleryCount:'photos',galleryAdded:'Photo added.',galleryDeleted:'Photo deleted.',
    galleryView:'View Gallery',
    // Admin feedback
    fbaTitle:'Feedback Management',fbaSub:'Review and manage customer feedback',
    fbaListTitle:'All Reviews',fbaPublish:'Publish',fbaUnpublish:'Unpublish',
    fbaPublished:'published',
    fbaQuality:'Quality',fbaTimeliness:'Timeliness',fbaService:'Service',fbaOverall:'Overall',
    fbRate:'Rate Our Service',
    // Operator role
    role_operator:'Field Operator',role_team_leader:'Team Leader',
    opDashTitle:'Operator Dashboard',opDashSub:'Field team job management',
    opSchedTitle:'Work Schedule',opSchedSub:'Team work schedule',
    opNewJobs:'New Jobs',opMyJobs:'My Jobs',
    opAcceptJob:'Accept Job',opCompleteJob:'Mark Complete',
    opNoNewJobs:'No new jobs available.',opNoMyJobs:'No jobs accepted yet.',
    opAccepted:'Accepted',opAcceptedBy:'Accepted By',opAcceptedAt:'Accepted Time',
    opCompletedAt:'Completed Time',opOperator:'Operator',
    opCompleteWarn:'Please upload at least 1 photo each for Before, During and After before marking complete.',
    opPhotosRequired:'Before / During / After photos required',
    // Customer complaint photos
    custPhotos:'Customer Complaint Photos',noCustPhotos:'No photos attached.',
    // Completion photos on track page
    completionGallery:'Work Completion Photos',noGalleryPhotos:'Photos not yet uploaded.',
    trOperator:'Operator',trAccepted:'Job Accepted',trCompleted:'Job Completed',
    // Booking calendar
    cfBooking:'📅 Booking Date & Time',
    bkLegAvail:'Available',bkLegLtd:'Limited',bkLegFull:'Full / Closed',
    bkSlotAvail:'slots available',bkSlotFull:'Full',bkSlotBack:'Change Date',
    bkSummaryLbl:'Selected Booking',bkSummaryDate:'Date',bkSummaryTime:'Time',
    bkPleaseDate:'Please select a date first.',bkPleaseSlot:'Please select a booking date and time.',
    bkFull:'This slot is full. Please choose another slot.',
    bkNeedProb:'Please select a problem type first to view booking slots',
    bkJustBooked:'Sorry, this slot was just booked. Please choose another slot.',
    bkChecking:'Checking available slots...',
    bkOps1:'Operating hours: 8:30 AM – 5:30 PM | Break: 12:30 – 1:30 PM (Friday: 12:30 – 2:30 PM)',
    bkOps2:'Saturday: Administrative office closed, but operation teams work as usual.',
    bkOps3:'We apologize in advance for any slight delay in team arrival due to travel time between job sites or previous jobs taking longer than expected.',
    bkOps4:'Your booking slot may be subject to change due to operational factors such as team leave or prior jobs requiring extended time. We will contact you in advance if any changes are necessary.',
    mileFree:'Your location is within our free coverage area ({km} km from office)',
    mileCharge:'Site visit travel charge: RM {amt} ({km} km from office, RM2.00/km including return trip)',
    mileNote:'Travel charge is an estimate based on road distance and will be confirmed by our team.',
    milePin:'Pin your location for travel charge estimate',
    mileCalc:'Calculating distance from office...',
    mileEst:'estimate',
    mileDist:'Distance',
    mileChargeLbl:'Travel charge',
    mileFreeZone:'Free zone',
    mapBtn:'Choose on Map',
    mapTitle:'🗺️ Choose Location on Map',
    mapConfirm:'✅ Confirm Location',
    mapCancel:'Cancel',
    mapHint:'Tap the map or drag the marker to pick a location.',
    mapLoadFail:'Map failed to load. Please check your connection.',
    shareInfo:'Share Info',
    shareTitle:'📤 Share Complaint Info',
    shareTabText:'Text',
    shareTabPng:'Image (PNG)',
    shareCopy:'Copy',
    shareCopied:'Copied!',
    shareDownload:'Download PNG',
    shareNative:'Share',
    dashTitle:'Dashboard',dashSub:"Welcome! Here is today's system summary.",
    statTotal:'Total Complaints',statPending:'Pending',statProgress:'In Progress',
    statDone:'Completed',statJobs:"Today's Jobs",statStaff:'Total Staff',
    recentTitle:'Recent Complaints',noComplaints:'No complaints found.',
    schedToday:"Today's Schedule",noSched:'No schedule for today.',
    notifTitle:'Notifications',noNotif:'No notifications.',
    navDashboard:'Dashboard',navComplaints:'Complaint List',navSchedule:'Work Schedule',
    navStaff:'Staff',navReports:'Reports',navNotif:'Notifications',
    navFeedback:'Feedback Management',navProfile:'My Profile',
    btnLogout:'Logout',roleAdmin:'Admin',roleStaff:'Staff',
    scSub:'View daily/weekly work schedule',
    cpSub:'All complaints received',
    rpThRef:'Ref. No.',rpThCust:'Customer',rpThProb:'Problem',rpThDate:'Date',
    sfSub:'Manage staff list',
    rpSub:'Work statistics and analysis',
    saLblAssignType:'Assignment Type',saPoolLbl:'(All Operators)',saDirectLbl:'👤 Direct Assign',
    saLblDate:'Date',saLblTime:'Time',
    saLblDesc:'Job Description',saDescPlaceholder:'Task description...',
    saSave:'Save',
    cfLblBkType:'Booking Type',cfBktKerja:'Job Execution',cfBktSite:'Site Inspection',
    bkTypeBadgeKerja:'🔧 JOB',bkTypeBadgeSite:'🔍 SITE VISIT',
    cfNamePh:'Your full name',
    cfAddrPh:'House no, street, area, postcode, city...',
    cfDescPh:'Describe your problem in more detail... (optional)',
    cfProbPh:'-- Select Problem --',
  }
};

// ─── STATE ────────────────────────────────────────────────────────────────────
let lang   = localStorage.getItem('emug_lang') || 'bm';
let user   = null;           // logged-in staff/admin user
let page   = 'dashboard';    // current dashboard page
let schedView = 'day';
let schedDate = new Date();
let schedEditId   = null;
let schedDetailId = null;
let editJobId   = null;
let statusJobId = null;
let cpFilter    = 'all';
let staffDeleteMode = false;
let lastConfirmRef = null;
let notifOpen = false;
let userDDOpen = false;
// Media upload state
let uploadedFiles = [];
// Location state
let pinnedLat = null, pinnedLng = null;
// Admin "Tambah Jadual" has its own separate pin/media state so it never
// interferes with the customer landing-page form sharing the same DOM tree.
let saAdminPinnedLat = null, saAdminPinnedLng = null;
let saUploadedFiles = [];
// Gallery state
let galleryJobId = null;
let galleryTab = 'before';
let fullscreenImages = [], fullscreenIdx = 0;
// Star ratings state
let starRatings = { quality:0, timeliness:0, service:0 };
// Gallery data: { ref: { before:[{src,ts,who}], during:[...], after:[...] } }
let galleryData = {};
// Booking calendar
// Standard slots (Mon–Thu, Sat) — break 12:30–13:30
const BK_SLOTS_STD = ['08:30 - 10:30','10:30 - 12:30','13:30 - 15:30','15:30 - 17:30'];
// Friday slots — long break 12:30–14:30, 3 slots only
const BK_SLOTS_FRI = ['08:30 - 10:30','10:30 - 12:30','14:30 - 17:30'];
function bkSlotsFor(dateStr) {
  var d = new Date(dateStr + 'T00:00:00');
  return d.getDay() === 5 ? BK_SLOTS_FRI : BK_SLOTS_STD;
}
const BK_MAX_PER_SLOT = 1; // max 1 booking per team per slot
// Problem category → team. GENERAL bookings block every team in the slot.
const PROBLEM_TEAM_MAP = {
  'Paip bocor': 'TEAM_E',                // Perpaipan
  'Saliran tersumbat': 'TEAM_B',         // Water Jetting
  'Tandas tersumbat': 'TEAM_B',          // Water Jetting
  'Tangki najis': 'TEAM_B',              // Water Jetting
  'Pemasangan baru': 'TEAM_E',           // Perpaipan
  'Penyelenggaraan bangunan': 'TEAM_A',  // Building maintenance
  'Kerja besi & kimpalan': 'TEAM_C',     // Metal & welding
  'Pemeriksaan am': 'GENERAL',
  'Kerja Dalaman': 'GENERAL',           // Internal work — admin assigns team manually
  'Penyelenggaraan Berjadual': 'GENERAL', // Scheduled maintenance — admin assigns team manually
  'Lain-lain': 'GENERAL'
};
function problemTeam(problem) { return PROBLEM_TEAM_MAP[problem] || 'GENERAL'; }

// Display names for team_key values (used by Team Leader staff records & job routing)
const TEAM_NAMES = {
  TEAM_A: 'Team Sudin', TEAM_B: 'Team Saleh', TEAM_C: 'Team Akin',
  TEAM_D: 'Team Bob', TEAM_E: 'Team Awang',
};

// Mileage charge — site-visit bookings only
const OFFICE_COORDS = { lat: 1.4613238124884376, lng: 103.91106449286333 }; // Office E Man Utama, Pasir Gudang
const MILEAGE_FREE_RADIUS_KM = 10;
const MILEAGE_RATE_PER_KM = 2.00; // RM per km — rate already covers the return trip
let mileageKm = null, mileageCharge = null, mileageIsEstimate = false;
let mileageCalcSeq = 0; // guards against out-of-order OSRM responses
let bkYear = 0, bkMonth = 0, bookingDate = null, bookingSlot = null;
let bkLoading = false;   // true while fetching fresh availability from Supabase
let bkBookings = null;   // lightweight booking rows for availability (null = fall back to complaints)

// ─── DATA ─────────────────────────────────────────────────────────────────────
const USERS = [
  { id:1, username:'sheqal@emanutama', password:'emanutama14', name:'MOHAMMAD SHEQAL BIN SALIMAN', role:'admin',    phone:'', email:'sheqal@emanutama.com',  staffId:'ADM001' },
];

function dAgo(n)  { const d=new Date(); d.setDate(d.getDate()-n); return d.toISOString().slice(0,10); }
function dAhead(n){ const d=new Date(); d.setDate(d.getDate()+n); return d.toISOString().slice(0,10); }
function now()    { return new Date().toISOString().slice(0,10); }

let complaints = [];

let notifs = [];

let refCounter = 1;
let notifCounter = 10;

// ─── FEEDBACK & TESTIMONIALS DATA ─────────────────────────────────────────────
let feedbacks = [];
let feedbackCounter = 0;
let workSchedule = [];
let manualJobs = [];
let dynamicStaff = [];   // staff added via Add Staff form (stored in Supabase `staff` table)

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const t = k => (T[lang]?.[k] ?? T.bm[k] ?? k);

function fmtDate(s) {
  if (!s) return '—';
  const d = new Date(s.slice(0,10) + 'T00:00:00');
  return `${T[lang].dayNames[d.getDay()]}, ${d.getDate()} ${T[lang].monthNames[d.getMonth()]} ${d.getFullYear()}`;
}
function fmtDateShort(s) {
  if (!s) return '—';
  const d = new Date(s.slice(0,10) + 'T00:00:00');
  return `${d.getDate()} ${T[lang].monthNames[d.getMonth()].slice(0,3)} ${d.getFullYear()}`;
}
function fmtTimeAgo(minutesOrISO) {
  if (typeof minutesOrISO === 'string') return fmtDateShort(minutesOrISO);
  const m = minutesOrISO;
  if (m < 2)    return t('justNow');
  if (m < 60)   return `${m} ${t('minutesAgo')}`;
  if (m < 1440) return `${Math.round(m/60)} ${t('hoursAgo')}`;
  if (m < 2880) return t('yesterday');
  return `${Math.round(m/1440)} ${t('daysAgo')}`;
}

function statusClass(s) { return s==='Selesai'?'selesai':s==='Sedang Berjalan'?'berjalan':'menunggu'; }
function statusLabel(s) { return s==='Selesai'?t('completed'):s==='Sedang Berjalan'?t('inProgress'):t('pending'); }
function statusBadge(s) {
  const icon = s==='Selesai'?'✅':s==='Sedang Berjalan'?'🔄':'⏳';
  return `<span class="badge badge-${statusClass(s)}">${icon} ${statusLabel(s)}</span>`;
}

function iniOf(name) { return name.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase(); }

function toast(msg, type='success', dur=3200) {
  const c = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `${type==='success'?'✅':type==='error'?'❌':'ℹ️'} ${msg}`;
  c.appendChild(el);
  setTimeout(() => { el.style.opacity='0'; el.style.transform='translateX(110%)'; el.style.transition='all .3s'; setTimeout(()=>el.remove(),320); }, dur);
}

function setTxt(id, v) { const e=document.getElementById(id); if(e) e.textContent=v; }
function setHTML(id, v) { const e=document.getElementById(id); if(e) e.innerHTML=v; }
function el(id) { return document.getElementById(id); }

// ─── LANGUAGE ─────────────────────────────────────────────────────────────────
function toggleLang() { setLang(lang==='bm'?'en':'bm'); }

function setLang(l) {
  lang = l;
  localStorage.setItem('emug_lang', l);
  const lbl = l==='bm'?'EN':'BM';
  document.querySelectorAll('#pub-lang-btn,#login-lang-btn,#app-lang-btn').forEach(b=>b.textContent=lbl);
  applyAllText();
  if(user) { buildSidebar(); renderPage(page); }
}

function applyAllText() {
  // Public nav
  setTxt('pn-tag', t('tagline'));
  setTxt('pn-login-btn', t('staffLoginBtn'));
  // Hero
  setHTML('h-badge', t('badge'));
  setHTML('h-title', t('heroTitle'));
  setTxt('h-sub', t('heroSub'));
  setHTML('h-tag', t('heroTag'));
  setTxt('h-cta', t('heroCta'));
  setTxt('h-track', t('heroTrack'));
  // Services
  setTxt('sv-tag', t('svTag')); setTxt('sv-title', t('svTitle')); setTxt('sv-sub', t('svSub'));
  const svcs = t('svc'); const svcD = t('svcDesc');
  for(let i=1;i<=6;i++) { setTxt(`svc${i}-name`, svcs[i-1]); setTxt(`svc${i}-desc`, svcD[i-1]); }
  // CTA
  setTxt('cta-title',t('ctaTitle')); setTxt('cta-sub',t('ctaSub'));
  setTxt('cta-btn1',t('ctaBtn1')); setTxt('cta-btn2',t('ctaBtn2'));
  // Quick track
  setTxt('qt-tag',t('qtTag')); setTxt('qt-title',t('qtTitle'));
  setTxt('qt-card-title',t('qtCardTitle')); setTxt('qt-card-sub',t('qtCardSub'));
  setTxt('qt-btn-txt',t('qtBtn'));
  // Contact bar
  setTxt('cb-phone-lbl',t('cbPhone')); setTxt('cb-email-lbl',t('cbEmail')); setTxt('cb-addr-lbl',t('cbAddr'));
  // Complaint form
  setTxt('cf-back-txt',t('cfBack')); setTxt('cf-title',t('cfTitle')); setTxt('cf-sub',t('cfSub'));
  setTxt('cf-card-title',t('cfCardTitle')); setTxt('cf-card-sub',t('cfCardSub'));
  setTxt('cf-lbl-name',t('cfName')); setTxt('cf-lbl-phone',t('cfPhone'));
  setTxt('cf-lbl-addr',t('cfAddr')); setTxt('cf-lbl-prob',t('cfProb'));
  setTxt('cf-lbl-date',t('cfDate')); setTxt('cf-lbl-time',t('cfTime'));
  setTxt('cf-lbl-booking',t('cfBooking'));
  setTxt('cf-lbl-urgency',t('cfUrgency')); setTxt('cf-lbl-desc',t('cfDesc'));
  setTxt('cf-note-txt',t('cfNote')); setTxt('cf-submit-txt',t('cfSubmit'));
  // Confirm
  setTxt('cc-title',t('ccTitle')); setTxt('cc-sub',t('ccSub'));
  setTxt('cc-ref-lbl',t('ccRefLbl')); setTxt('cc-save-note',t('ccSaveNote'));
  setTxt('cc-track-btn',t('ccTrackBtn')); setTxt('cc-home-btn',t('ccHomeBtn'));
  // Track page
  setTxt('tr-back-txt',t('trBack')); setTxt('tr-title',t('trTitle')); setTxt('tr-sub',t('trSub'));
  setTxt('tr-ref-lbl',t('trRefLbl')); setTxt('tr-btn-txt',t('trBtn'));
  // Login
  setTxt('li-tagline',t('liTagline')); setTxt('li-title',t('liTitle'));
  setTxt('li-lbl-user',t('liUser')); setTxt('li-lbl-pass',t('liPass'));
  setTxt('li-btn-txt',t('liBtn')); setTxt('li-demo-lbl',t('liDemo')); setTxt('li-back',t('liBack'));
  // App header
  setTxt('ah-tag',t('tagline')); setTxt('ah-notif',t('notifications'));
  setTxt('ah-mark-all',t('markAllRead')); setTxt('ah-profile',t('profile')); setTxt('ah-logout',t('logout'));
  setTxt('sb-logout',t('logout'));
  // Dashboard page labels
  setTxt('dp-d-title',t('dashboard')); setTxt('dp-d-sub',t('dashSub'));
  setTxt('d-recent-lbl',t('recentComplaints')); setTxt('d-view-all',t('viewAll'));
  setTxt('d-notif-lbl',t('notifications')); setTxt('d-staff-lbl',t('staffOverview'));
  setTxt('d-th-name',t('staff')); setTxt('d-th-today',t('todayJobs'));
  setTxt('d-th-pend',t('pending')); setTxt('d-th-prog',t('inProgress')); setTxt('d-th-done',t('completed'));
  setTxt('cp-title',t('complaints')); setTxt('cp-sub',t('cpSub'));
  setTxt('sc-title',t('schedule')); setTxt('sc-sub',t('scSub'));
  setTxt('sc-tab-day',t('day')); setTxt('sc-tab-week',t('week')); setTxt('sc-today',t('today'));
  setTxt('sf-title',t('staff')); setTxt('sf-sub',t('sfSub'));
  setTxt('rp-title',t('reports')); setTxt('rp-sub',t('rpSub'));
  setTxt('rp-status-lbl', lang==='bm'?'Status Kerja':'Job Status');
  setTxt('rp-type-lbl',   lang==='bm'?'Jenis Masalah':'Problem Type');
  setTxt('rp-all-lbl',    lang==='bm'?'Semua Rekod':'All Records');
  setTxt('rp-th-ref',t('rpThRef')); setTxt('rp-th-cust',t('rpThCust'));
  setTxt('rp-th-prob',t('rpThProb')); setTxt('rp-th-staff',t('staff'));
  setTxt('rp-th-date',t('rpThDate')); setTxt('nt-title',t('notifications'));
  // Schedule add modal
  setTxt('sa-lbl-assign-type',t('saLblAssignType'));
  setTxt('sa-pool-lbl',t('saPoolLbl'));
  setTxt('sa-direct-lbl',t('saDirectLbl'));
  setTxt('sa-lbl-staff',t('staff'));
  setTxt('sa-lbl-date',t('saLblDate')); setTxt('sa-lbl-time',t('saLblTime'));
  setTxt('sa-lbl-addr',t('saLblAddr')); setTxt('sa-lbl-desc',t('saLblDesc'));
  setTxt('dsm-close',t('dsmClose'));
  const dsmAddBtn = document.querySelector('#modal-day-summary button[onclick="addFromDaySummary()"]');
  if(dsmAddBtn) dsmAddBtn.title = t('dsmAdd');
  if(daySummaryDate && el('modal-day-summary')?.classList.contains('open')) openDaySummary(daySummaryDate);
  setTxt('d-unassigned-lbl', t('unassignedTitle'));
  setTxt('aop-title', `🤝 ${t('assignOperatorTitle')}`);
  setTxt('aop-lbl-operator', 'Operator');
  setTxt('aop-cancel', t('cancel'));
  setTxt('aop-confirm', `✓ ${t('assignConfirmBtn')}`);
  setTxt('asf-lbl-team', 'Team');
  setTxt('esf-title', t('editStaffTitle'));
  setTxt('esf-save', `💾 ${lang==='bm'?'Simpan Perubahan':'Save Changes'}`);
  setTxt('esf-cancel', t('cancel'));
  setTxt('esf-lbl-team', 'Team');
  const esfPass = el('esf-password'); if(esfPass) esfPass.placeholder = t('editStaffPassPh');
  setTxt('sa-lbl-name',t('saLblName')); setTxt('sa-lbl-phone',t('saLblPhone'));
  setTxt('sa-lbl-prob',t('saLblProb')); setTxt('sa-lbl-urgency',t('saLblUrgency'));
  setTxt('sa-prob-ph',t('saProbPh'));
  setTxt('sa-save',`💾 ${t('saSave')}`);
  const saDesc = el('sa-desc'); if(saDesc) saDesc.placeholder = t('saDescPlaceholder');
  populateSaTimeOptions(el('sa-date')?.value, el('sa-time')?.value);
  setTxt('nt-mark-all',t('markRead')); setTxt('pr-title',t('profile'));
  // Modal
  setTxt('mj-lbl-assign',t('assignTo')); setTxt('mj-lbl-status','Status');
  setTxt('mj-lbl-sched-date',t('schedDate')); setTxt('mj-lbl-notes',t('adminNotes'));
  setTxt('mj-delete',`🗑️ ${t('delete')}`); setTxt('mj-cancel',t('cancel')); setTxt('mj-save',`💾 ${t('save')}`);
  setTxt('ms-title',t('updateStatus')); setTxt('ms-lbl-status','Status');
  setTxt('ms-lbl-note',t('techNote')); setTxt('ms-cancel',t('cancel'));
  setTxt('ms-confirm',`✓ ${t('update')}`);
  // New feature strings
  setTxt('cf-lbl-media', t('mediaLabel'));
  setTxt('mup-label', t('mediaUploadBtn'));
  setTxt('mup-sub', t('mediaUploadSub'));
  setTxt('mup-clear', t('mediaClear'));
  setTxt('cf-loc-btn-txt', t('locBtn'));
  setTxt('cf-loc-hint', t('locHint'));
  setTxt('ts-tag', t('tsTag')); setTxt('ts-title', t('tsTitle')); setTxt('ts-sub', t('tsSub'));
  setTxt('avg-label', t('tsAvgLabel')); setTxt('avg-count-label', t('tsCountLabel'));
  setTxt('avg-recommend', t('tsRecommend')); setTxt('ts-leave-txt', t('tsLeave'));
  setTxt('fb-back-txt', t('fbBack')); setTxt('fb-title', t('fbTitle')); setTxt('fb-sub', t('fbSub'));
  setTxt('fb-card-title', t('fbCardTitle')); setTxt('fb-card-sub', t('fbCardSub'));
  setTxt('fb-lbl-ref', t('fbLblRef')); setTxt('fb-lbl-name', t('fbLblName'));
  setTxt('fb-lbl-ratings', t('fbLblRatings'));
  setTxt('fb-lbl-quality', t('fbLblQuality')); setTxt('fb-lbl-time', t('fbLblTime')); setTxt('fb-lbl-service', t('fbLblService'));
  setTxt('fb-overall-lbl', t('fbOverallLbl'));
  setTxt('fb-lbl-comment', t('fbLblComment')); setTxt('fb-submit-txt', t('fbSubmit'));
  setTxt('fb-cc-title', t('fbCcTitle')); setTxt('fb-cc-sub', t('fbCcSub'));
  setTxt('fb-cc-home', t('fbCcHome'));
  setTxt('fba-title', t('fbaTitle')); setTxt('fba-sub', t('fbaSub'));
  setTxt('fba-list-title', t('fbaListTitle'));
  setTxt('gtab-before', t('galleryBefore')); setTxt('gtab-during', t('galleryDuring')); setTxt('gtab-after', t('galleryAfter'));
  setTxt('gm-title', t('galleryTitle'));
  // Re-render booking legend labels if visible
  setTxt('bk-leg-avail', t('bkLegAvail'));
  setTxt('bk-leg-ltd', t('bkLegLtd'));
  setTxt('bk-leg-full', t('bkLegFull'));
  setTxt('bk-back-lbl', t('bkSlotBack'));
  setTxt('bk-need-prob-lbl', t('bkNeedProb'));
  setTxt('bk-ops-note-1', t('bkOps1'));
  setTxt('bk-ops-note-2', t('bkOps2'));
  setTxt('bk-ops-note-3', t('bkOps3'));
  setTxt('bk-ops-note-4', t('bkOps4'));
  setTxt('cf-map-btn-txt', t('mapBtn'));
  setTxt('mp-title', t('mapTitle'));
  setTxt('mp-confirm', t('mapConfirm'));
  setTxt('mp-cancel', t('mapCancel'));
  setTxt('mj-share-lbl', t('shareInfo'));
  setTxt('share-title', t('shareTitle'));
  setTxt('share-tab-text-lbl', t('shareTabText'));
  setTxt('share-tab-png-lbl', t('shareTabPng'));
  setTxt('share-copy-lbl', t('shareCopy'));
  setTxt('share-download-lbl', t('shareDownload'));
  setTxt('share-native-lbl', t('shareNative'));
  // Booking type toggle
  setTxt('cf-lbl-bk-type', t('cfLblBkType'));
  setTxt('cf-bkt-kerja-lbl', t('cfBktKerja'));
  setTxt('cf-bkt-site-lbl', t('cfBktSite'));
  setTxt('sa-lbl-bk-type', t('cfLblBkType'));
  setTxt('sa-bkt-kerja-lbl', t('cfBktKerja'));
  setTxt('sa-bkt-site-lbl', t('cfBktSite'));
  const saMapTxt = el('sa-map-btn-txt'); if(saMapTxt && saAdminPinnedLat==null) saMapTxt.textContent = t('mapBtn');
  // Form placeholders
  const _cfn = el('cf-name');  if(_cfn)  _cfn.placeholder  = t('cfNamePh');
  const _cfa = el('cf-addr');  if(_cfa)  _cfa.placeholder  = t('cfAddrPh');
  const _cfd = el('cf-desc');  if(_cfd)  _cfd.placeholder  = t('cfDescPh');
  // Dropdown placeholder options
  setTxt('cf-prob-ph', t('cfProbPh'));
  setTxt('cf-urgency-segera', lang==='bm' ? '🚨 Segera' : '🚨 Urgent');
  if(el('bk-widget') && el('bk-widget').offsetParent !== null) renderBkCalendar();
  renderTestimonials();
  if(user) buildSidebar();
}

// ─── PUBLIC NAVIGATION ────────────────────────────────────────────────────────
function showPubPage(name) {
  document.querySelectorAll('.pub-page').forEach(p=>p.classList.remove('active'));
  const pg = el(`page-${name}`);
  if(pg) { pg.classList.add('active'); window.scrollTo(0,0); }
  el('pub-nav').style.display = 'block';
  el('page-login').style.display = 'none';
  el('page-app').classList.remove('active');
  if(window.location.pathname !== '/') history.replaceState({}, '', '/');
}

function showLoginPage() {
  document.querySelectorAll('.pub-page').forEach(p=>p.classList.remove('active'));
  el('pub-nav').style.display = 'none';
  el('page-login').style.display = 'block';
  el('page-app').classList.remove('active');
  window.scrollTo(0,0);
  if(window.location.pathname !== '/staff') history.pushState({}, '', '/staff');
}

function showPublicSection() {
  el('page-login').style.display = 'none';
  showPubPage('landing');
}

function showAppSection() {
  document.querySelectorAll('.pub-page').forEach(p=>p.classList.remove('active'));
  el('pub-nav').style.display = 'none';
  el('page-login').style.display = 'none';
  el('page-app').classList.add('active');
}

// ─── DB ROW MAPPERS ───────────────────────────────────────────────────────────
// Supabase columns: id, ref, name, phone, address, problem, description,
// urgency, pref_date, pref_time, status, assigned_to, assigned_name,
// sched_date, admin_notes, tech_notes, coords, media, submitted_at,
// updated_at, accepted_by, accepted_by_name, accepted_at, completed_at

// Column list for list/summary views — everything EXCEPT `media`, which can be
// several MB of base64 per row and caused Supabase statement timeouts when
// pulled for every complaint via select('*'). Fetch media on-demand instead
// (see ensureComplaintMedia) only where it's actually displayed.
const COMPLAINT_LIST_COLUMNS = 'ref, name, phone, address, problem, description, urgency, '
  + 'pref_date, pref_time, status, assigned_to, assigned_name, sched_date, admin_notes, tech_notes, '
  + 'coords, submitted_at, updated_at, accepted_by, accepted_by_name, accepted_at, completed_at, '
  + 'photos_before, photos_during, photos_after, booking_type, mileage_km, mileage_charge, source, is_deleted';

// Supabase row → JS complaint object
function rowToComplaint(row) {
  return {
    id:             row.ref,                  // use ref as JS id for gallery keying
    ref:            row.ref            || '',
    name:           row.name           || '',
    phone:          row.phone          || '',
    address:        row.address        || '',
    problem:        row.problem        || '',
    desc:           row.description    || '',  // Supabase: description → JS: desc
    urgency:        row.urgency        || 'Normal',
    prefDate:       row.pref_date      || '',  // Supabase: pref_date → JS: prefDate
    prefTime:       row.pref_time      || '',  // Supabase: pref_time → JS: prefTime
    status:         row.status         || 'Menunggu',
    assignedTo:     row.assigned_to    || '',  // Supabase: assigned_to → JS: assignedTo
    assignedName:   row.assigned_name  || '',  // Supabase: assigned_name → JS: assignedName
    schedDate:      row.sched_date     || '',  // Supabase: sched_date → JS: schedDate
    adminNotes:     row.admin_notes    || '',  // Supabase: admin_notes → JS: adminNotes
    techNotes:      row.tech_notes     || '',  // Supabase: tech_notes → JS: techNotes
    coords:         row.coords         || null,
    // media is a large base64 blob column — many queries deliberately omit it from
    // the SELECT to avoid pulling megabytes per row. Keep it `undefined` (not `[]`)
    // when absent from `row`, so complaintToRow() knows to skip it on updates
    // instead of silently overwriting real stored media with an empty array.
    media:          ('media' in row) ? (row.media || []) : undefined,
    submittedAt:    row.submitted_at   || '',  // Supabase: submitted_at → JS: submittedAt
    updatedAt:      row.updated_at     || '',  // Supabase: updated_at → JS: updatedAt
    acceptedBy:     row.accepted_by    || '',  // Supabase: accepted_by → JS: acceptedBy
    acceptedByName: row.accepted_by_name || '', // Supabase: accepted_by_name → JS: acceptedByName
    acceptedAt:     row.accepted_at    || '',  // Supabase: accepted_at → JS: acceptedAt
    completedAt:    row.completed_at   || '',  // Supabase: completed_at → JS: completedAt
    photosB:        row.photos_before  || [],  // Supabase: photos_before → JS: photosB
    photosD:        row.photos_during  || [],  // Supabase: photos_during → JS: photosD
    photosA:        row.photos_after   || [],  // Supabase: photos_after  → JS: photosA
    bookingType:    row.booking_type   || null, // Supabase: booking_type → JS: bookingType
    mileageKm:      row.mileage_km     != null ? row.mileage_km     : null,
    mileageCharge:  row.mileage_charge != null ? row.mileage_charge : null,
    source:         row.source         || 'customer', // 'customer' or 'manual' (created via + Tambah Jadual)
  };
}

// JS complaint object → Supabase row (for INSERT and UPDATE)
// Note: 'id' is excluded — it is auto-generated by Supabase
function complaintToRow(c) {
  const row = {
    ref:              c.ref,
    name:             c.name,
    phone:            c.phone,
    address:          c.address,
    problem:          c.problem,
    description:      c.desc         || null,  // JS: desc → Supabase: description
    urgency:          c.urgency      || 'Normal',
    pref_date:        c.prefDate     || null,  // JS: prefDate → Supabase: pref_date
    pref_time:        c.prefTime     || null,  // JS: prefTime → Supabase: pref_time
    status:           c.status       || 'Menunggu',
    assigned_to:      c.assignedTo   || null,  // JS: assignedTo → Supabase: assigned_to
    assigned_name:    c.assignedName || null,  // JS: assignedName → Supabase: assigned_name
    sched_date:       c.schedDate    || null,  // JS: schedDate → Supabase: sched_date
    admin_notes:      c.adminNotes   || null,  // JS: adminNotes → Supabase: admin_notes
    tech_notes:       c.techNotes    || null,  // JS: techNotes → Supabase: tech_notes
    coords:           c.coords       || null,
    submitted_at:     c.submittedAt  || new Date().toISOString(), // JS: submittedAt → Supabase: submitted_at
    updated_at:       c.updatedAt    || new Date().toISOString(), // JS: updatedAt → Supabase: updated_at
    accepted_by:      c.acceptedBy   || null,  // JS: acceptedBy → Supabase: accepted_by
    accepted_by_name: c.acceptedByName || null, // JS: acceptedByName → Supabase: accepted_by_name
    accepted_at:      c.acceptedAt   || null,  // JS: acceptedAt → Supabase: accepted_at
    completed_at:     c.completedAt  || null,  // JS: completedAt → Supabase: completed_at
    photos_before:    c.photosB      || [],    // JS: photosB → Supabase: photos_before
    photos_during:    c.photosD      || [],    // JS: photosD → Supabase: photos_during
    photos_after:     c.photosA      || [],    // JS: photosA → Supabase: photos_after
    booking_type:     c.bookingType  || null,  // JS: bookingType → Supabase: booking_type
    mileage_km:       c.mileageKm     != null ? c.mileageKm     : null,
    mileage_charge:   c.mileageCharge != null ? c.mileageCharge : null,
    source:           c.source        || 'customer',
  };
  // media (base64 blob, can be several MB) is only ever loaded on-demand (see
  // ensureComplaintMedia). Omit the key entirely when it hasn't been loaded so
  // an unrelated update (status change, assignment, etc.) never overwrites the
  // real stored media with an empty array.
  if(c.media !== undefined) row.media = c.media;
  return row;
}

function rowToFeedback(row) {
  return {
    id:       row.id,
    ref:      row.ref   || '',
    name:     row.name  || '',
    ratings: {
      quality:    row.rating_quality    || 0,
      timeliness: row.rating_timeliness || 0,
      service:    row.rating_service    || 0,
    },
    overall:  row.overall      || 0,
    comment:  row.comment      || '',
    published:row.is_published || false,
    date:     row.created_at   || '',
  };
}

function feedbackToRow(fb) {
  return {
    ref:               fb.ref,
    name:              fb.name,
    rating_quality:    fb.ratings.quality,
    rating_timeliness: fb.ratings.timeliness,
    rating_service:    fb.ratings.service,
    overall:           fb.overall,
    comment:           fb.comment,
    is_published:      fb.published,
  };
}

// ─── DB LOAD ──────────────────────────────────────────────────────────────────
async function dbLoad() {
  if(!db) {
    console.error('[EMUG] dbLoad aborted: Supabase client is null (CDN not loaded).');
    throw new Error('Supabase client failed to load — check internet connection');
  }

  // ── PREFLIGHT: raw fetch to detect HTML error pages (paused / misconfigured project) ──
  const controller = new AbortController();
  const probeTimer = setTimeout(() => controller.abort(), 6000);
  try {
    const probe = await fetch(
      `${SUPABASE_URL}/rest/v1/complaints?select=id&limit=1`,
      {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
        signal: controller.signal
      }
    );
    clearTimeout(probeTimer);
    const ct = probe.headers.get('content-type') || '';
    if(ct.includes('text/html')) {
      // Supabase returns an HTML error page when the project is paused or the URL is wrong
      console.error('[EMUG] Supabase returned HTML — project is likely paused or URL is invalid. Status:', probe.status);
      throw new Error('Supabase connection failed — check project status at supabase.com');
    }
    console.log('[EMUG] Preflight OK — content-type:', ct, '| status:', probe.status);
  } catch(e) {
    clearTimeout(probeTimer);
    if(e.name === 'AbortError') {
      console.error('[EMUG] Preflight timed out after 6s');
      throw new Error('Supabase connection timed out — server unreachable');
    }
    // Re-throw preflight error (HTML response or network failure)
    throw e;
  }

  // Load complaints
  try {
    console.log('[EMUG] dbLoad: fetching complaints...');
    const { data, error } = await db.from('complaints').select(COMPLAINT_LIST_COLUMNS).eq('is_deleted', false);
    console.log('[EMUG] complaints response → error:', error, '| rows:', data ? data.length : 'null');
    if(error) {
      console.error('[EMUG] dbLoad complaints error:', error.message, error);
      toast('Gagal memuat aduan: ' + error.message, 'error', 7000);
    } else if(data) {
      if(data.length === 0) {
        console.warn('[EMUG] complaints table returned 0 rows. RLS disabled? Table name correct? Schema = public?');
      } else {
        console.log('[EMUG] first complaint row (raw):', data[0]);
      }
      complaints = data.map(rowToComplaint);
      complaints.sort(function(a, b) {
        return (b.submittedAt || '').localeCompare(a.submittedAt || '');
      });
      console.log('[EMUG] complaints loaded:', complaints.length);
    }
  } catch(e) { console.error('[EMUG] dbLoad complaints exception:', e); }

  // Derive refCounter from ALL complaints (including soft-deleted) to avoid duplicate refs
  try {
    const { data: allRefs } = await db.from('complaints').select('ref');
    if(allRefs) {
      allRefs.forEach(function(row) {
        if(!row.ref) return;
        const m = row.ref.match(/(\d+)$/);
        if(m) { const n = parseInt(m[1]); if(n >= refCounter) refCounter = n + 1; }
      });
    }
  } catch(e) { console.warn('[EMUG] refCounter init fallback:', e); }

  // Load gallery (jobs table — optional, skip silently if missing)
  try {
    const { data, error } = await db.from('jobs').select('*');
    if(!error && data) {
      galleryData = {};
      data.forEach(function(row) {
        galleryData[row.complaint_ref] = {
          before: row.photos_before || [],
          during: row.photos_during || [],
          after:  row.photos_after  || [],
        };
      });
      console.log('[EMUG] jobs loaded:', data.length);
    }
  } catch(e) { console.error('[EMUG] dbLoad jobs exception:', e); }

  // Sync completion photos from complaints table into galleryData (takes precedence over jobs table)
  complaints.forEach(function(c) {
    if((c.photosB && c.photosB.length) || (c.photosD && c.photosD.length) || (c.photosA && c.photosA.length)) {
      if(!galleryData[c.id]) galleryData[c.id] = { before:[], during:[], after:[] };
      if(c.photosB && c.photosB.length) galleryData[c.id].before = c.photosB;
      if(c.photosD && c.photosD.length) galleryData[c.id].during = c.photosD;
      if(c.photosA && c.photosA.length) galleryData[c.id].after  = c.photosA;
    }
  });

  // Load feedback
  try {
    const { data, error } = await db.from('feedback').select('*');
    if(error) {
      console.error('[EMUG] dbLoad feedback error:', error.message);
    } else if(data) {
      feedbacks = data.map(rowToFeedback);
      feedbacks.sort(function(a, b) {
        return (b.date || '').localeCompare(a.date || '');
      });
      if(feedbacks.length) feedbackCounter = Math.max.apply(null, feedbacks.map(function(f){ return f.id||0; })) + 1;
      console.log('[EMUG] feedback loaded:', feedbacks.length);
    }
  } catch(e) { console.error('[EMUG] dbLoad feedback exception:', e); }
  await dbLoadWorkSchedule();
  await dbLoadManualJobs();
  await dbLoadDynamicStaff();
  // One-time cleanup of test/demo records (silently skips if none found)
  cleanupTestData();
}

async function cleanupTestData() {
  if(!db || localStorage.getItem('emug_cleanup_v1')) return;
  const testPatterns = ['dvdv','fefe','wwww'];
  try {
    // complaints: delete by name pattern or specific test ref
    for(const p of testPatterns) {
      await db.from('complaints').delete().ilike('name', `%${p}%`);
    }
    await db.from('complaints').delete().eq('ref','EMUG-2026-0002');
    // jobs: delete by description pattern
    for(const p of testPatterns) {
      await db.from('jobs').delete().ilike('job_description', `%${p}%`);
      await db.from('jobs').delete().ilike('job_title', `%${p}%`);
    }
    // work_schedule: delete by description pattern
    for(const p of testPatterns) {
      await db.from('work_schedule').delete().ilike('job_description', `%${p}%`);
    }
    localStorage.setItem('emug_cleanup_v1','done');
    console.log('[EMUG] Test data cleanup complete.');
  } catch(e) { console.error('[EMUG] cleanupTestData:', e); }
}

// ─── DB WRITE HELPERS (fire-and-forget) ───────────────────────────────────────
async function dbInsertComplaint(c) {
  try {
    const { error } = await db.from('complaints').insert(complaintToRow(c));
    if(error) console.error('dbInsertComplaint:', error.message);
  } catch(e) { console.error('dbInsertComplaint:', e); }
}

async function dbUpdateComplaint(c) {
  try {
    const { error } = await db.from('complaints').update(complaintToRow(c)).eq('ref', c.ref);
    if(error) console.error('dbUpdateComplaint:', error.message);
  } catch(e) { console.error('dbUpdateComplaint:', e); }
}

// Fetches a complaint's `media` column on demand (list/summary queries omit it
// to avoid pulling multi-MB base64 blobs for every row). Caches the result on
// the in-memory complaint object so it's only fetched once per session, and so
// dbUpdateComplaint() correctly preserves it afterward instead of wiping it.
async function ensureComplaintMedia(c) {
  if(!c || c.media !== undefined) return c ? c.media : [];
  try {
    const { data, error } = await db.from('complaints').select('media').eq('ref', c.ref).single();
    if(!error && data) { c.media = data.media || []; return c.media; }
  } catch(e) { console.error('[EMUG] ensureComplaintMedia:', e); }
  return [];
}

// soft-delete stub — superseded by the full implementation below

async function dbSaveGallery(jobRef) {
  const gd = galleryData[jobRef] || { before:[], during:[], after:[] };
  try {
    const { error } = await db.from('jobs').upsert({
      complaint_ref: jobRef,
      photos_before: gd.before,
      photos_during: gd.during,
      photos_after:  gd.after,
      updated_at:    new Date().toISOString(),
    }, { onConflict: 'complaint_ref' });
    if(error) console.error('dbSaveGallery:', error.message);
  } catch(e) { console.error('dbSaveGallery:', e); }
}

async function dbSaveJobPhotos(jobRef) {
  const gd = galleryData[jobRef] || { before:[], during:[], after:[] };
  try {
    const { error } = await db.from('complaints').update({
      photos_before: gd.before,
      photos_during: gd.during,
      photos_after:  gd.after,
      updated_at:    new Date().toISOString(),
    }).eq('ref', jobRef);
    if(error) console.error('dbSaveJobPhotos:', error.message);
    else {
      // Keep in-memory complaint in sync
      const c = complaints.find(function(x){ return x.ref === jobRef; });
      if(c) { c.photosB = gd.before.slice(); c.photosD = gd.during.slice(); c.photosA = gd.after.slice(); }
    }
  } catch(e) { console.error('dbSaveJobPhotos:', e); }
}

async function dbInsertFeedback(fb) {
  try {
    const { data, error } = await db.from('feedback').insert(feedbackToRow(fb)).select('id').single();
    if(error) console.error('dbInsertFeedback:', error.message);
    else if(data) fb.id = data.id;
  } catch(e) { console.error('dbInsertFeedback:', e); }
}

async function dbUpdateFeedback(fb) {
  try {
    const { error } = await db.from('feedback').update({ is_published: fb.published }).eq('id', fb.id);
    if(error) console.error('dbUpdateFeedback:', error.message);
  } catch(e) { console.error('dbUpdateFeedback:', e); }
}

async function dbLoadWorkSchedule() {
  try {
    const { data, error } = await db.from('work_schedule').select('*')
      .eq('is_deleted', false).order('job_date').order('job_time');
    if(error) { console.error('dbLoadWorkSchedule:', error.message); return; }
    if(data) workSchedule = data.map(r=>({
      id:            r.id,
      staffUsername: r.staff_username,
      staffName:     r.staff_name,
      date:          r.job_date,
      time:          r.job_time,
      location:      r.location,
      description:   r.job_description,
      status:        r.status || 'Menunggu',
      createdAt:     r.created_at,
    }));
    console.log('[EMUG] work_schedule loaded:', workSchedule.length);
  } catch(e) { console.error('dbLoadWorkSchedule:', e); }
}

async function dbInsertWorkSchedule(entry) {
  try {
    const { data, error } = await db.from('work_schedule').insert({
      staff_username: entry.staffUsername,
      staff_name:     entry.staffName,
      job_date:        entry.date,
      job_time:        entry.time,
      location:        entry.location,
      job_description: entry.description,
      status:         entry.status,
    }).select().single();
    if(error) { console.error('dbInsertWorkSchedule error:', JSON.stringify(error, null, 2)); return null; }
    return data ? { ...entry, id: data.id } : null;
  } catch(e) { console.error('dbInsertWorkSchedule:', e); return null; }
}

// ─── MANUAL JOBS DB ───────────────────────────────────────────────────────────
async function dbLoadManualJobs() {
  try {
    const { data, error } = await db.from('jobs')
      .select('*').eq('job_type','manual')
      .eq('is_deleted', false)
      .order('created_at', { ascending: false });
    if(!error && data) {
      manualJobs = data;
      console.log('[EMUG] manual jobs loaded:', data.length);
    }
  } catch(e) { console.error('dbLoadManualJobs:', e); }
}

async function dbInsertManualJob(job) {
  try {
    const { data, error } = await db.from('jobs').insert(job).select().single();
    if(error) { console.error('dbInsertManualJob:', error.message, JSON.stringify(error, null, 2)); return null; }
    return data;
  } catch(e) { console.error('dbInsertManualJob:', e); return null; }
}

async function dbAcceptManualJob(jobId, opUsername, opName) {
  try {
    const { error } = await db.from('jobs').update({
      operator_id:   opUsername,
      operator_name: opName,
      is_pool:       false,
      status:        'Sedang Berjalan',
    }).eq('id', jobId);
    if(error) console.error('dbAcceptManualJob:', error.message);
    return !error;
  } catch(e) { console.error('dbAcceptManualJob:', e); return false; }
}

async function dbCreateJobFromComplaint(c) {
  const job = {
    complaint_ref:    c.ref,
    operator_id:      c.acceptedBy,
    operator_name:    c.acceptedByName,
    accepted_at:      c.acceptedAt,
    status:           'Sedang Berjalan',
    job_type:         'complaint',
    job_title:        c.problem || 'Aduan',
    job_date:         c.prefDate || c.schedDate || c.acceptedAt?.slice(0,10) || new Date().toISOString().slice(0,10),
    job_time:         c.prefTime || null,
    job_location:     c.address || null,
    job_description:  c.desc || null,
    created_by:       c.acceptedBy,
    is_pool:          false,
  };
  const { error } = await db.from('jobs').insert(job);
  if(error){ console.error('dbCreateJobFromComplaint error', error); }
}

async function dbDeleteComplaint(ref) {
  // Soft delete — sets is_deleted = true on both complaints and related jobs
  try {
    const { error: e1 } = await db.from('jobs').update({ is_deleted: true }).eq('complaint_ref', ref);
    if(e1) { console.error('dbDeleteComplaint jobs:', e1.message); return false; }
    const { error: e2 } = await db.from('complaints').update({ is_deleted: true }).eq('ref', ref);
    if(e2) { console.error('dbDeleteComplaint complaints:', e2.message); return false; }
    return true;
  } catch(e) { console.error('dbDeleteComplaint:', e); return false; }
}

async function dbDeleteJob(jobId, complaintRef, isManual) {
  try {
    if(jobId) {
      const { error: e1 } = await db.from('jobs').delete().eq('id', jobId);
      if(e1) { console.error('dbDeleteJob jobs:', e1.message); return false; }
    }
    if(!isManual && complaintRef) {
      const { error: e2 } = await db.from('complaints').update({
        status: 'Menunggu',
        assigned_to: null,
        assigned_name: null,
        accepted_by: null,
        accepted_by_name: null,
        accepted_at: null,
      }).eq('ref', complaintRef);
      if(e2) { console.error('dbDeleteJob complaint reset:', e2.message); return false; }
    }
    return true;
  } catch(e) { console.error('dbDeleteJob:', e); return false; }
}

// ─── DYNAMIC STAFF DB ─────────────────────────────────────────────────────────
async function dbLoadDynamicStaff() {
  try {
    const { data, error } = await db.from('staff').select('*').order('created_at', { ascending: true });
    if(!error && data) { dynamicStaff = data; console.log('[EMUG] dynamic staff loaded:', data.length); }
    else if(error && error.code === '42P01') { /* table doesn't exist yet — ignore */ }
  } catch(e) { console.warn('[EMUG] dbLoadDynamicStaff (staff table may not exist yet):', e.message); }
}

async function dbInsertStaff(entry) {
  try {
    const { data, error } = await db.from('staff').insert({
      name:       entry.name,
      username:   entry.username,
      email:      entry.email   || null,
      password:   entry.password,          // stored as plain text to match USERS pattern
      phone:      entry.phone   || null,
      role:       entry.role,
      staff_id:   entry.staffId,
      team_key:   entry.teamKey || null,
      status:     'active',
    }).select().single();
    if(error) { console.error('dbInsertStaff:', error.message, JSON.stringify(error, null, 2)); return null; }
    return data;
  } catch(e) { console.error('dbInsertStaff:', e); return null; }
}

async function dbUpdateStaff(id, fields) {
  try {
    const row = {
      name:     fields.name,
      username: fields.username,
      phone:    fields.phone   || null,
      role:     fields.role,
      team_key: fields.teamKey || null,
    };
    if(fields.password) row.password = fields.password; // only overwrite if a new one was entered
    const { error } = await db.from('staff').update(row).eq('id', id);
    if(error) { console.error('dbUpdateStaff:', error.message, JSON.stringify(error, null, 2)); return false; }
    return true;
  } catch(e) { console.error('dbUpdateStaff:', e); return false; }
}

async function dbDeleteDynamicStaff(id) {
  try {
    const { error } = await db.from('staff').delete().eq('id', id);
    if(error) { console.error('dbDeleteDynamicStaff:', error.message); return false; }
    return true;
  } catch(e) { console.error('dbDeleteDynamicStaff:', e); return false; }
}

async function dbUpdateWorkSchedule(entry) {
  try {
    const { error } = await db.from('work_schedule').update({
      staff_username:  entry.staffUsername,
      staff_name:      entry.staffName,
      job_date:        entry.date,
      job_time:        entry.time,
      location:        entry.location,
      job_description: entry.description,
      status:          entry.status,
    }).eq('id', entry.id);
    if(error) { console.error('dbUpdateWorkSchedule:', error.message); return false; }
    return true;
  } catch(e) { console.error('dbUpdateWorkSchedule:', e); return false; }
}

async function dbDeleteWorkSchedule(id) {
  try {
    // Soft delete — consistent with complaints/jobs (is_deleted flag, never hard-delete)
    const { error } = await db.from('work_schedule').update({ is_deleted: true }).eq('id', id);
    if(error) { console.error('dbDeleteWorkSchedule:', error.message); return false; }
    return true;
  } catch(e) { console.error('dbDeleteWorkSchedule:', e); return false; }
}

// ─── COMPLAINT FORM (PUBLIC) ──────────────────────────────────────────────────
function initComplaintForm() {
  el('cf-date').value = '';
  el('cf-time').value = '';
  el('cf-form-view').style.display = 'block';
  el('cf-confirm-view').style.display = 'none';
  clearMedia();
  pinnedLat = null; pinnedLng = null;
  const locResult = el('cf-location-result');
  if(locResult) { locResult.style.display='none'; locResult.innerHTML=''; }
  const locBtn = el('cf-loc-btn-txt');
  if(locBtn) locBtn.textContent = lang==='bm'?'Pin Lokasi Saya':'Pin My Location';
  bookingDate = null; bookingSlot = null;
  mileageKm = null; mileageCharge = null; mileageIsEstimate = false;
  updateMileageEstimate();
  initBookingCalendar();
}

function setMjBookingType(val) {
  el('mj-booking-type').value = val;
  const kerja = el('mj-bkt-kerja');
  const site  = el('mj-bkt-site');
  if(!kerja || !site) return;
  if(val === 'kerja') {
    kerja.style.border = '2px solid var(--lime)'; kerja.style.background = 'rgba(163,230,53,.12)'; kerja.style.color = 'var(--lime)'; kerja.style.fontWeight = '700';
    site.style.border  = '2px solid var(--gray-300)'; site.style.background = 'transparent'; site.style.color = 'var(--gray-600)'; site.style.fontWeight = '600';
  } else {
    site.style.border  = '2px solid #8b5cf6'; site.style.background = 'rgba(139,92,246,.12)'; site.style.color = '#a78bfa'; site.style.fontWeight = '700';
    kerja.style.border = '2px solid var(--gray-300)'; kerja.style.background = 'transparent'; kerja.style.color = 'var(--gray-600)'; kerja.style.fontWeight = '600';
  }
}

function setCfBookingType(val) {
  el('cf-booking-type').value = val;
  const kerja = el('cf-bkt-kerja');
  const site  = el('cf-bkt-site');
  if(!kerja || !site) return;
  if(val === 'kerja') {
    kerja.style.border = '2px solid var(--lime)'; kerja.style.background = 'rgba(163,230,53,.12)'; kerja.style.color = 'var(--lime)';
    site.style.border  = '2px solid var(--gray-300)'; site.style.background = 'transparent'; site.style.color = 'var(--gray-600)';
  } else {
    site.style.border  = '2px solid #8b5cf6'; site.style.background = 'rgba(139,92,246,.12)'; site.style.color = '#a78bfa';
    kerja.style.border = '2px solid var(--gray-300)'; kerja.style.background = 'transparent'; kerja.style.color = 'var(--gray-600)';
  }
  updateMileageEstimate();
}

// Admin "Tambah Jadual" equivalent of setCfBookingType — separate hidden field
// (sa-booking-type) and its own mileage box so it never interferes with the
// customer landing-page form, which shares the same DOM tree.
function setSaBookingType(val) {
  el('sa-booking-type').value = val;
  const kerja = el('sa-bkt-kerja');
  const site  = el('sa-bkt-site');
  if(!kerja || !site) return;
  if(val === 'kerja') {
    kerja.style.border = '2px solid var(--lime)'; kerja.style.background = 'rgba(163,230,53,.12)'; kerja.style.color = 'var(--lime)';
    site.style.border  = '2px solid var(--gray-300)'; site.style.background = 'transparent'; site.style.color = 'var(--gray-600)';
  } else {
    site.style.border  = '2px solid #8b5cf6'; site.style.background = 'rgba(139,92,246,.12)'; site.style.color = '#a78bfa';
    kerja.style.border = '2px solid var(--gray-300)'; kerja.style.background = 'transparent'; kerja.style.color = 'var(--gray-600)';
  }
  updateSaMileageEstimate();
}

async function submitComplaint() {
  const name    = el('cf-name').value.trim();
  const phone   = el('cf-phone').value.trim();
  const address = el('cf-addr').value.trim();
  const problem = el('cf-prob').value;
  const date    = el('cf-date').value;
  const time    = el('cf-time').value;
  const desc    = el('cf-desc').value.trim();
  const urgency     = el('cf-urgency').value;
  const bookingType = el('cf-booking-type')?.value || 'kerja';

  if(!name||!phone||!address||!problem||!date||!time) {
    if(!date||!time) toast(t('bkPleaseSlot'),'error');
    else toast(lang==='bm'?'Sila isi semua maklumat wajib (*)':'Please fill all required fields (*).','error');
    return;
  }
  if(isBkSlotFull(date, time, problemTeam(problem))) {
    toast(t('bkFull'),'error',5000); return;
  }

  // Double-booking protection: re-check with FRESH data right before insert,
  // in case the slot was taken while the customer was filling the form.
  await refreshBkComplaints();
  if(isBkSlotFull(date, time, problemTeam(problem))) {
    toast(t('bkJustBooked'),'error',6000);
    bookingSlot = null;
    el('cf-time').value = '';
    var bs = el('bk-summary');
    if(bs) bs.style.display = 'none';
    renderBkCalendar();
    if(bookingDate) renderBkSlots(bookingDate);
    return;
  }

  const year = new Date().getFullYear();
  const ref  = `EMUG-${year}-${String(refCounter).padStart(4,'0')}`;

  const c = {
    id: ref,
    ref, name, phone, address, problem, desc, urgency, bookingType,
    source: 'customer',
    prefDate:date, prefTime:time||'—',
    status:'Menunggu', assignedTo:'', assignedName:'',
    schedDate:'', adminNotes:'', techNotes:'',
    coords: (pinnedLat&&pinnedLng)?{lat:pinnedLat,lng:pinnedLng}:null,
    mileageKm:     (bookingType==='site_visit' && mileageKm!=null) ? mileageKm : null,
    mileageCharge: (bookingType==='site_visit' && mileageKm!=null) ? mileageCharge : null,
    media: uploadedFiles.slice(),
    submittedAt: new Date().toISOString(),
    updatedAt:   new Date().toISOString(),
  };

  // Disable button to prevent double-submission
  const btn = el('cf-submit-btn');
  if(btn) { btn.disabled = true; btn.textContent = lang==='bm'?'Menghantar...':'Submitting...'; }

  // ── INSERT INTO SUPABASE ──────────────────────────────────────────────────────
  console.log('[EMUG] submitComplaint: inserting into Supabase...', complaintToRow(c));
  try {
    const { data, error } = await db.from('complaints').insert([complaintToRow(c)]).select();
    console.log('[EMUG] submitComplaint: Supabase response → error:', error, '| data:', data);
    if(error) {
      console.error('[EMUG] submitComplaint insert error:', error.message, error);
      toast((lang==='bm'?'Gagal menghantar aduan: ':'Failed to submit: ') + error.message, 'error', 7000);
      if(btn) { btn.disabled = false; btn.innerHTML = '📤 <span id="cf-submit-txt">' + t('cfSubmit') + '</span>'; }
      return;
    }
  } catch(e) {
    console.error('[EMUG] submitComplaint exception:', e);
    toast(lang==='bm'?'Ralat sambungan. Sila cuba lagi.':'Connection error. Please try again.', 'error', 7000);
    if(btn) { btn.disabled = false; btn.innerHTML = '📤 <span id="cf-submit-txt">' + t('cfSubmit') + '</span>'; }
    return;
  }

  // ── SUCCESS ───────────────────────────────────────────────────────────────────
  refCounter++;
  complaints.push(c);
  console.log('[EMUG] submitComplaint: SUCCESS — ref:', ref);

  addNotif('complaint', t('notifNewComplaint'),
    `${ref} — ${name} (${problem}${urgency==='Segera'?' 🚨':''})`, 'admin', null, c.id);

  lastConfirmRef = ref;
  el('cc-ref-num').textContent = ref;
  el('cf-form-view').style.display = 'none';
  el('cf-confirm-view').style.display = 'block';
  toast(t('ccTitle'), 'success');
}

function showTrackWithRef() {
  el('track-ref-input').value = lastConfirmRef||'';
  showPubPage('track');
  if(lastConfirmRef) doTrack();
}

// ─── TRACK STATUS (PUBLIC) ────────────────────────────────────────────────────
function doQuickTrack() {
  const ref = el('quick-track-input').value.trim().toUpperCase();
  if(!ref) return;
  const c = complaints.find(x=>x.ref===ref);
  const area = el('quick-track-result');
  if(!c) {
    area.innerHTML = `<div class="track-error">${t('trNotFound')}</div>`;
    return;
  }
  const sc = statusClass(c.status);
  const sIcon = c.status==='Selesai'?'✅':c.status==='Sedang Berjalan'?'🔄':'⏳';
  area.innerHTML = `
    <div style="background:var(--white);border-radius:var(--r-lg);border:1px solid var(--gray-200);overflow:hidden;animation:fadeIn .3s ease;">
      <div class="track-status-big ${sc}" style="margin:0;border-radius:0;">
        ${sIcon} ${statusLabel(c.status)}
      </div>
      <div style="padding:14px 16px;font-size:.85rem;">
        <div style="margin-bottom:6px;"><span class="text-muted">${t('trProblem')}:</span> <strong>${c.problem}</strong></div>
        <div style="margin-bottom:6px;"><span class="text-muted">${t('trAssigned')}:</span> <strong>${c.assignedName||t('trUnassigned').split('—')[0].trim()}</strong></div>
        <button class="btn btn-sm btn-outline mt-1" onclick="el('track-ref-input').value='${ref}';showPubPage('track');doTrack();">🔍 ${lang==='bm'?'Lihat Penuh':'Full Details'}</button>
      </div>
    </div>`;
}

function doTrack() {
  const ref = el('track-ref-input').value.trim().toUpperCase();
  if(!ref) return;
  el('track-ref-input').value = ref;
  const c = complaints.find(x=>x.ref===ref);
  const area = el('track-result-area');

  if(!c) {
    area.innerHTML = `<div class="track-error">${t('trNotFound')}</div>`;
    return;
  }

  const sc = statusClass(c.status);
  const sIcon = c.status==='Selesai'?'✅':c.status==='Sedang Berjalan'?'🔄':'⏳';
  const namePrivate = c.name.split(' ')[0] + ' ' + (c.name.split(' ').slice(1).map(w=>w[0]+'.')).join(' ');

  area.innerHTML = `
    <div class="track-result-card">
      <div class="track-result-header">
        <div class="track-result-ref">📋 ${c.ref}</div>
        <div class="track-result-name">${namePrivate}</div>
      </div>
      <div class="stripe equal"><div class="s-lime"></div><div class="s-navy"></div></div>
      <div class="track-result-body">
        <div class="track-status-big ${sc}">
          ${sIcon} ${statusLabel(c.status)}
        </div>
        <div class="track-detail-row">
          <span class="track-detail-label">🔧 ${t('trProblem')}</span>
          <span class="track-detail-val">${c.problem}</span>
        </div>
        <div class="track-detail-row">
          <span class="track-detail-label">📅 ${t('trDate')}</span>
          <span class="track-detail-val">${fmtDate(c.prefDate)}</span>
        </div>
        <div class="track-detail-row">
          <span class="track-detail-label">🕐 ${t('trTime')}</span>
          <span class="track-detail-val">${c.prefTime}</span>
        </div>
        <div class="track-detail-row">
          <span class="track-detail-label">👷 ${t('trAssigned')}</span>
          <span class="track-detail-val">${c.assignedName || `<em style="color:var(--gray-400)">${t('trUnassigned')}</em>`}</span>
        </div>
        <div class="track-detail-row">
          <span class="track-detail-label">🗓️ ${t('trSubmitted')}</span>
          <span class="track-detail-val">${fmtDate(c.submittedAt)}</span>
        </div>
        <div class="track-detail-row">
          <span class="track-detail-label">🔄 ${t('trLastUpdate')}</span>
          <span class="track-detail-val">${fmtDate(c.updatedAt)}</span>
        </div>
        ${c.techNotes?`<div class="track-detail-row">
          <span class="track-detail-label">📝 ${t('trNotes')}</span>
          <span class="track-detail-val">${c.techNotes}</span>
        </div>`:''}
        ${c.acceptedByName?`<div class="track-detail-row">
          <span class="track-detail-label">🧰 ${t('trOperator')}</span>
          <span class="track-detail-val">${c.acceptedByName}</span>
        </div>`:''}
        ${c.completedAt?`<div class="track-detail-row">
          <span class="track-detail-label">✅ ${t('trCompleted')}</span>
          <span class="track-detail-val">${fmtDate(c.completedAt)} ${c.completedAt.slice(11,16)}</span>
        </div>`:''}
        ${c.status==='Selesai'?`<div style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);border:1.5px solid #86efac;border-radius:var(--r-lg);padding:14px 16px;margin-top:8px;">
          <div style="font-weight:600;color:#166534;margin-bottom:6px;">⭐ ${lang==='bm'?'Kerja telah selesai! Kongsi pengalaman anda.':'Work completed! Share your experience.'}</div>
          <div style="font-size:.85rem;color:#15803d;margin-bottom:10px;">${lang==='bm'?'Penilaian anda membantu kami meningkatkan perkhidmatan.':'Your feedback helps us improve our service.'}</div>
          <button class="btn btn-lime btn-sm" onclick="showFeedbackPage('${c.ref}')">⭐ ${t('fbRate')}</button>
        </div>`:''}
        ${c.status==='Selesai'?renderTrackGallery(c):''}
      </div>
      <div style="padding:16px 24px;border-top:1px solid var(--gray-200);display:flex;gap:10px;flex-wrap:wrap;">
        <button class="btn btn-outline btn-sm" onclick="showPubPage('landing')">${t('trGoHome')}</button>
        <button class="btn btn-lime btn-sm" onclick="showPubPage('complaint');initComplaintForm()">${t('trNewComplaint')}</button>
      </div>
    </div>`;
}

// ─── STAFF LOGIN ──────────────────────────────────────────────────────────────
function fillDemo(u,p) {
  el('login-user').value = u;
  el('login-pass').value = p;
  el('login-error').classList.remove('show');
}

async function doLogin() {
  const u = el('login-user').value.trim();
  const p = el('login-pass').value;
  // Check hardcoded users first, then dynamic staff loaded from Supabase
  const found = USERS.find(x=>x.username===u && x.password===p)
             || dynamicStaff.find(x=>x.username===u && x.password===p);
  if(!found) {
    el('login-error').classList.add('show');
    setTxt('login-error-msg', t('liError'));
    el('login-pass').value='';
    return;
  }
  user = found;
  // Store name too so session restore can rebuild full user object for dynamic staff
  localStorage.setItem('emug_session', JSON.stringify({ username: found.username, role: found.role, name: found.name, staffId: found.staffId||found.staff_id||'' }));
  el('login-error').classList.remove('show');
  // Always re-fetch fresh data from Supabase on every login
  showLoading(lang==='bm'?'Memuatkan data...':'Loading data...');
  await dbLoad();
  hideLoading();
  initApp();
}

function doLogout() {
  user = null;
  localStorage.removeItem('emug_session');
  closeAllDDs();
  closeSidebar();
  // Hide app and public pages, show login at /staff
  el('page-app').classList.remove('active');
  document.querySelectorAll('.pub-page').forEach(p=>p.classList.remove('active'));
  el('pub-nav').style.display = 'none';
  el('page-login').style.display = 'block';
  history.replaceState({}, '', '/staff');
  el('login-user').value='';
  el('login-pass').value='';
}

document.addEventListener('keydown', e=>{
  if(e.key==='Enter' && el('page-login').style.display==='block') doLogin();
});

// ─── APP INIT ─────────────────────────────────────────────────────────────────
function initApp() {
  showAppSection();
  buildSidebar();
  navigate('dashboard');
  applyAllText();
  renderNotifBadge();
  renderNotifDD();
  el('dp-d-date').textContent = fmtDate(now());
  if(window.location.pathname !== '/staff') history.replaceState({}, '', '/staff');
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function buildSidebar() {
  if(!user) return;
  const ini = iniOf(user.name);
  el('sb-av').textContent = ini;
  el('sb-name').textContent = user.name;
  el('sb-role').textContent = user.role==='admin'?t('role_admin'):user.role==='operator'?t('role_operator'):user.role==='team_leader'?t('role_team_leader'):t('role_staff');
  el('app-user-av').textContent = ini;

  const unread = myNotifs().filter(n=>!n.read).length;
  const pending = myComplaints().filter(c=>c.status==='Menunggu').length;
  const items = user.role==='admin' ? [
    { pg:'dashboard',  icon:'📊', lbl:t('dashboard') },
    { pg:'complaints', icon:'📋', lbl:t('complaints'), badge:pending||null },
    { pg:'schedule',   icon:'🗓️', lbl:t('schedule') },
    { pg:'staff',      icon:'👷', lbl:t('staff') },
    { pg:'reports',    icon:'📈', lbl:t('reports') },
    { pg:'notifications',icon:'🔔',lbl:t('notifications'), badge:unread||null },
    { pg:'feedback',   icon:'⭐', lbl:t('fbaTitle') },
    { pg:'profile',    icon:'👤', lbl:t('profile') },
  ] : isOperatorRole(user.role) ? [
    { pg:'dashboard',    icon:'🏗️', lbl:t('opDashTitle') },
    { pg:'op-schedule',  icon:'🗓️', lbl:t('opSchedTitle') },
    { pg:'notifications',icon:'🔔', lbl:t('notifications'), badge:unread||null },
    { pg:'profile',      icon:'👤', lbl:t('profile') },
  ] : user.role==='team_leader' ? [
    { pg:'dashboard',    icon:'📊', lbl:t('dashboard') },
    { pg:'notifications',icon:'🔔', lbl:t('notifications'), badge:unread||null },
    { pg:'profile',      icon:'👤', lbl:t('profile') },
  ] : [
    { pg:'dashboard',   icon:'📊', lbl:t('dashboard') },
    { pg:'schedule',    icon:'🗓️', lbl:t('mySchedule') },
    { pg:'complaints',  icon:'📋', lbl:t('myComplaints') },
    { pg:'notifications',icon:'🔔',lbl:t('notifications'), badge:unread||null },
    { pg:'profile',     icon:'👤', lbl:t('profile') },
  ];
  el('sidebar-nav').innerHTML = items.map(i=>`
    <div class="nav-item${page===i.pg?' active':''}" id="nav-${i.pg}" onclick="navigate('${i.pg}');closeSidebar()">
      <span class="nav-icon">${i.icon}</span>
      <span>${i.lbl}</span>
      ${i.badge?`<span class="nav-badge">${i.badge}</span>`:''}
    </div>`).join('');
}

function toggleSidebar() {
  el('sidebar').classList.toggle('open');
  el('sidebar-overlay').classList.toggle('open');
}
function closeSidebar() {
  el('sidebar').classList.remove('open');
  el('sidebar-overlay').classList.remove('open');
}

// ─── NAVIGATE (Dashboard pages) ───────────────────────────────────────────────
function navigate(pg) {
  page = pg;
  document.querySelectorAll('.dash-page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  const dp = el(`dp-${pg}`); if(dp) dp.classList.add('active');
  const ni = el(`nav-${pg}`); if(ni) ni.classList.add('active');
  closeAllDDs();
  if(pg !== 'staff') staffDeleteMode = false; // reset delete mode when leaving staff page
  renderPage(pg);
  el('main-content').scrollTop = 0;
}

function renderPage(pg) {
  switch(pg) {
    case 'dashboard':     renderDashboard(); break;
    case 'complaints':    renderComplaints(); break;
    case 'schedule':      renderSchedule(); break;
    case 'staff':         renderStaff(); break;
    case 'reports':       renderReports(); break;
    case 'notifications': renderNotifications(); break;
    case 'profile':       renderProfile(); break;
    case 'feedback':      renderAdminFeedback(); break;
    case 'op-schedule':   renderOpSchedulePage(); break;
  }
}

// ─── DATA HELPERS ─────────────────────────────────────────────────────────────
// Team Leader now has its OWN dashboard/permission model (job-routing feature)
// instead of being treated as an operator — kept as a thin wrapper so existing
// call sites don't need touching.
function isOperatorRole(role) { return role==='operator'; }

function myComplaints() {
  if(!user) return [];
  if(user.role==='admin') return complaints;
  // Everyone else (operator, team_leader, staff) only sees jobs directly
  // assigned to them — the old self-accept-from-pool pattern (acceptedBy) is retired.
  return complaints.filter(c=>c.assignedTo===user.username);
}
function myWorkSchedule() {
  if(!user) return [];
  if(user.role==='admin') return workSchedule;
  return workSchedule.filter(e=>e.staffUsername===user.username);
}
// Jobs awaiting assignment (Team Leader / Admin job-routing feature).
// GENERAL-category jobs (no specific team) only ever show to Admin.
function unassignedJobsForTeam(teamKey) {
  return complaints.filter(c => !c.assignedTo && c.status==='Menunggu' && problemTeam(c.problem)===teamKey);
}
function unassignedJobsAll() {
  return complaints.filter(c => !c.assignedTo && c.status==='Menunggu');
}

// All Field Operators (hardcoded USERS + Supabase dynamicStaff), merged & deduped —
// free pick for Team Leader/Admin assignment, not restricted to any one team.
function allFieldOperators() {
  const hard = USERS.filter(u=>u.role==='operator').map(u=>({ username:u.username, name:u.name }));
  const dyn  = dynamicStaff.filter(u=>u.role==='operator')
    .filter(u=>!hard.find(h=>h.username===u.username))
    .map(u=>({ username:u.username, name:u.name }));
  return [...hard, ...dyn];
}

let assignJobId = null;

function renderUnassignedJobsWidget() {
  const wrap = el('d-unassigned-wrap');
  if(!wrap) return;
  const isAdmin = user.role==='admin';
  const isTL    = user.role==='team_leader';
  if(!isAdmin && !isTL) { wrap.style.display='none'; return; }
  wrap.style.display = '';
  const jobs = isAdmin ? unassignedJobsAll() : unassignedJobsForTeam(user.team_key||'');
  setHTML('d-unassigned-list', jobs.length ? jobs.map(c=>`
    <div class="dsm-item" style="cursor:default;">
      <div class="dsm-item-top">
        <span class="dsm-time">${fmtDateShort(c.prefDate)} ${c.prefTime||''}</span>
        ${c.urgency==='Segera'?'<span style="font-size:.68rem;background:rgba(239,68,68,.15);color:#ef4444;border:1px solid #ef4444;border-radius:6px;padding:2px 7px;font-weight:700;">🚨 '+(lang==='bm'?'Segera':'Urgent')+'</span>':''}
      </div>
      <div class="dsm-item-label">${c.ref} — ${c.problem}</div>
      <div class="dsm-item-sub">👤 ${c.name||'-'}${c.address?' · 📍 '+c.address:''}</div>
      <div style="margin-top:8px;">
        <button class="btn btn-sm btn-lime" onclick="openAssignOperatorModal('${c.id}')">🤝 ${t('assignOperatorBtn')}</button>
      </div>
    </div>`).join('')
    : `<div class="empty-state"><div class="empty-state-icon">🎉</div><p>${t('unassignedEmpty')}</p></div>`);
}

function openAssignOperatorModal(cid) {
  const c = complaints.find(x=>x.id===cid);
  if(!c) return;
  assignJobId = cid;
  setHTML('aop-job-info', `<strong>${c.ref}</strong> — ${c.problem}<br><span class="text-muted">${c.name||'-'}${c.address?' · '+c.address:''}</span>`);
  const ops = allFieldOperators();
  const sel = el('aop-operator');
  sel.innerHTML = `<option value="">${t('assignOperatorPh')}</option>`
    + ops.map(o=>`<option value="${o.username}" data-name="${o.name}">${o.name}</option>`).join('');
  openModal('modal-assign-op');
}

function confirmAssignOperator() {
  const c = complaints.find(x=>x.id===assignJobId);
  if(!c) return;
  const sel = el('aop-operator');
  const username = sel.value;
  if(!username) { toast(t('pleaseSelectOperator'),'error'); return; }
  const name = sel.options[sel.selectedIndex]?.dataset.name || '';
  c.assignedTo   = username;
  c.assignedName = name;
  if(c.status==='Menunggu') c.status = 'Sedang Berjalan';
  c.updatedAt    = new Date().toISOString();
  dbUpdateComplaint(c);
  addNotif('assign', t('notifAssigned'), `${c.ref} — ${c.problem}`, 'operator', username);
  closeModal('modal-assign-op');
  toast(t('assignedOk'), 'success');
  renderDashboard();
  renderComplaintsList();
  buildSidebar();
}
function myNotifs() {
  if(!user) return [];
  return notifs.filter(n=>{
    const roleMatch = n.forRole===user.role || n.forRole==='all' || (user.role==='admin');
    if(!roleMatch) return false;
    if(n.forUser && n.forUser!==user.username && user.role!=='admin') return false;
    return true;
  });
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function renderDashboard() {
  if(isOperatorRole(user.role)) { renderOperatorDashboard(); return; }
  // Restore 2-col layout for admin/staff (operator may have collapsed it)
  var dashCols = document.querySelector('.dash-cols');
  if(dashCols) {
    dashCols.style.gridTemplateColumns = '';
    var notifCol = el('d-notif-preview') ? el('d-notif-preview').parentElement : null;
    if(notifCol) notifCol.style.display = '';
  }
  el('dp-d-date').textContent = fmtDate(now());
  renderUnassignedJobsWidget();
  const mc = myComplaints();
  const todayC = mc.filter(c=>c.schedDate===now()||c.prefDate===now());
  const pend  = mc.filter(c=>c.status==='Menunggu');
  const prog  = mc.filter(c=>c.status==='Sedang Berjalan');
  const done  = mc.filter(c=>c.status==='Selesai');

  const sa_viewAll   = lang==='bm'?'Lihat semua →':'View all →';
  const sa_assign    = lang==='bm'?'Tugaskan →':'Assign →';
  const sa_monitor   = lang==='bm'?'Pantau →':'Monitor →';
  const sa_report    = lang==='bm'?'Lihat laporan →':'View report →';
  const sa_schedule  = lang==='bm'?'Jadual hari ini →':'Today schedule →';
  const sa_update    = lang==='bm'?'Kemaskini →':'Update →';
  const statsAdmin = `
    <div class="stat-card c-danger" style="cursor:pointer;" onclick="openStatModal('all')"><div class="stat-icon-box si-red">📋</div><div class="stat-value">${mc.length}</div><div class="stat-label">${t('totalJobs')}</div><div class="stat-action">${sa_viewAll}</div></div>
    <div class="stat-card c-warn" style="cursor:pointer;" onclick="openStatModal('Menunggu')"><div class="stat-icon-box si-warn">⏳</div><div class="stat-value">${pend.length}</div><div class="stat-label">${t('pending')}</div><div class="stat-action">${sa_assign}</div></div>
    <div class="stat-card c-info" style="cursor:pointer;" onclick="openStatModal('Sedang Berjalan')"><div class="stat-icon-box si-blue">🔄</div><div class="stat-value">${prog.length}</div><div class="stat-label">${t('inProgress')}</div><div class="stat-action">${sa_monitor}</div></div>
    <div class="stat-card c-success" style="cursor:pointer;" onclick="openStatModal('Selesai')"><div class="stat-icon-box si-green">✅</div><div class="stat-value">${done.length}</div><div class="stat-label">${t('completed')}</div><div class="stat-action">${sa_report}</div></div>
    <div class="stat-card c-lime" style="cursor:pointer;" onclick="openStatModal('today')"><div class="stat-icon-box si-lime">📅</div><div class="stat-value">${todayC.length}</div><div class="stat-label">${t('todayJobs')}</div><div class="stat-action">${sa_schedule}</div></div>
    <div class="stat-card c-navy"><div class="stat-icon-box si-navy">👷</div><div class="stat-value">${USERS.filter(u=>u.role==='staff').length}</div><div class="stat-label">${t('totalStaff')}</div></div>`;
  const statsStaff = `
    <div class="stat-card c-danger" style="cursor:pointer;" onclick="openStatModal('all')"><div class="stat-icon-box si-red">📋</div><div class="stat-value">${mc.length}</div><div class="stat-label">${t('myComplaints')}</div><div class="stat-action">${sa_viewAll}</div></div>
    <div class="stat-card c-lime" style="cursor:pointer;" onclick="openStatModal('today')"><div class="stat-icon-box si-lime">📅</div><div class="stat-value">${todayC.length}</div><div class="stat-label">${t('todayJobs')}</div><div class="stat-action">${sa_schedule}</div></div>
    <div class="stat-card c-warn" style="cursor:pointer;" onclick="openStatModal('Menunggu')"><div class="stat-icon-box si-warn">⏳</div><div class="stat-value">${pend.length}</div><div class="stat-label">${t('pending')}</div><div class="stat-action">${sa_update}</div></div>
    <div class="stat-card c-success" style="cursor:pointer;" onclick="openStatModal('Selesai')"><div class="stat-icon-box si-green">✅</div><div class="stat-value">${done.length}</div><div class="stat-label">${t('completed')}</div><div class="stat-action">${sa_report}</div></div>`;
  setHTML('d-stats', user.role==='admin' ? statsAdmin : statsStaff);

  // Recent
  const recent = [...mc].sort((a,b)=>b.submittedAt.localeCompare(a.submittedAt)).slice(0,5);
  setHTML('d-recent-list', recent.length ? `
    <div class="table-wrap">
      <table style="font-size:.85rem;">
        <thead><tr style="background:var(--gray-50);">
          <th style="font-size:.62rem;text-transform:uppercase;letter-spacing:.6px;color:var(--gray-400);font-weight:700;padding:10px 12px;width:120px;">ID / Aduan</th>
          <th style="font-size:.62rem;text-transform:uppercase;letter-spacing:.6px;color:var(--gray-400);font-weight:700;padding:10px 12px;">Masalah</th>
          <th style="font-size:.62rem;text-transform:uppercase;letter-spacing:.6px;color:var(--gray-400);font-weight:700;padding:10px 12px;">Lokasi</th>
          <th style="font-size:.62rem;text-transform:uppercase;letter-spacing:.6px;color:var(--gray-400);font-weight:700;padding:10px 12px;width:90px;">Keutamaan</th>
          <th style="font-size:.62rem;text-transform:uppercase;letter-spacing:.6px;color:var(--gray-400);font-weight:700;padding:10px 12px;width:110px;">Status</th>
          <th style="width:60px;"></th>
        </tr></thead>
        <tbody>${recent.map(c=>`<tr style="transition:background .15s;" onmouseover="this.style.background='var(--gray-50)'" onmouseout="this.style.background=''">
          <td style="padding:11px 12px;">
            <div style="font-size:.72rem;font-weight:700;color:var(--navy);">${c.ref}</div>
            <div style="font-size:.72rem;color:var(--gray-400);margin-top:1px;">${fmtDateShort(c.prefDate)}</div>
          </td>
          <td style="padding:11px 12px;max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:.82rem;">${c.problem}</td>
          <td style="padding:11px 12px;font-size:.75rem;color:var(--gray-500);max-width:130px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">📍 ${(c.address||'').split(',').slice(-2).join(',').trim()}</td>
          <td style="padding:11px 12px;">
            <span style="display:inline-flex;align-items:center;gap:5px;font-size:.72rem;font-weight:600;color:${c.urgency==='Segera'?'var(--danger)':'var(--success)'};">
              <span class="priority-dot priority-${c.urgency==='Segera'?'high':'low'}"></span>${c.urgency==='Segera'?'Segera':'Normal'}
            </span>
          </td>
          <td style="padding:11px 12px;">${statusBadge(c.status)}</td>
          <td style="padding:11px 12px;"><button class="btn btn-sm btn-outline" onclick="openJobModal('${c.id}')" style="padding:4px 10px;font-size:.72rem;font-weight:600;">Buka</button></td>
        </tr>`).join('')}</tbody>
      </table>
    </div>`
    : `<div class="empty-state"><div class="empty-state-icon">📋</div><p>${t('noJobs')}</p></div>`);

  // Notif preview
  const ns = myNotifs().slice(0,5);
  setHTML('d-notif-preview', ns.length ? ns.map(n=>`
    <div style="display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid var(--gray-100);">
      <span style="width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:5px;background:${n.read?'var(--gray-300)':'var(--lime)'}; display:inline-block;"></span>
      <div style="flex:1;min-width:0;">
        <div style="font-size:.82rem;font-weight:${n.read?400:600};color:var(--gray-900);line-height:1.4;">${n.title}</div>
        <div style="font-size:.72rem;color:var(--gray-400);margin-top:2px;">${fmtTimeAgo(n.time)}</div>
      </div>
    </div>`).join('')
    : `<div class="empty-state"><div class="empty-state-icon">🔔</div><p>${t('noNotifs')}</p></div>`);

  // Staff overview (admin)
  const sc = el('d-staff-card');
  if(sc) sc.style.display = user.role==='admin'?'block':'none';
  if(user.role==='admin') {
    const staffList = USERS.filter(u=>u.role==='staff'||u.role==='operator');
    setHTML('d-staff-tbody', staffList.map(su=>{
      const sj = su.role==='operator'
        ? complaints.filter(c=>c.acceptedBy===su.username)
        : complaints.filter(c=>c.assignedTo===su.username);
      const st = sj.filter(c=>(c.schedDate||c.prefDate)===now());
      return `<tr>
        <td><strong>${su.name}</strong></td>
        <td>${st.length}</td>
        <td>${sj.filter(c=>c.status==='Menunggu').length}</td>
        <td>${sj.filter(c=>c.status==='Sedang Berjalan').length}</td>
        <td>${sj.filter(c=>c.status==='Selesai').length}</td>
      </tr>`;}).join(''));
  }
}

// ─── COMPLAINTS ───────────────────────────────────────────────────────────────
function renderComplaints() {
  // chips
  const chips = [
    {k:'all',l:t('all')},{k:'Menunggu',l:t('pending')},
    {k:'Sedang Berjalan',l:t('inProgress')},{k:'Selesai',l:t('completed')}
  ];
  setHTML('cp-chips', chips.map(c=>`<span class="chip${cpFilter===c.k?' active':''}" onclick="setCpFilter('${c.k}')">${c.l}</span>`).join(''));
  renderComplaintsList();
}

function setCpFilter(f) { cpFilter=f; renderComplaints(); }

function renderComplaintsList() {
  const q = (el('cp-search')?.value||'').toLowerCase();
  let list = myComplaints().filter(c=>{
    const mf = cpFilter==='all'||c.status===cpFilter;
    const ms = !q||(c.name||'').toLowerCase().includes(q)||(c.ref||'').toLowerCase().includes(q)||(c.problem||'').toLowerCase().includes(q)||(c.assignedName||'').toLowerCase().includes(q);
    return mf&&ms;
  }).sort((a,b)=>(a.submittedAt||'').localeCompare(b.submittedAt||'')*-1);

  // Manual jobs from jobs table — excludes ones already linked to a real complaint
  // (source='manual' complaints created via the current "+ Tambah Jadual" flow),
  // since those already render as full complaint cards above and would otherwise
  // show up twice.
  const mjVisible = isOperatorRole(user.role)
    ? manualJobs.filter(j=>j.is_pool||j.operator_id===user.username)
    : manualJobs; // admin / staff sees all
  const mjList = mjVisible.filter(j=>{
    if(complaints.some(c=>c.ref===j.complaint_ref)) return false;
    if(cpFilter!=='all'&&j.status!==cpFilter) return false;
    return !q||(j.job_title||'').toLowerCase().includes(q)||(j.complaint_ref||'').toLowerCase().includes(q)||(j.job_description||'').toLowerCase().includes(q);
  });

  if(!list.length && !mjList.length) {
    setHTML('cp-list','<div class="empty-state"><div class="empty-state-icon">📋</div><p>'+t('noJobs')+'</p></div>');
    return;
  }

  const isAdmin = user.role==='admin';

  // Complaint cards (unchanged)
  const complaintCards = list.map(c=>{
    const urgIcon = c.urgency==='Segera'?' 🚨':'';
    const assigned = !!c.assignedName;
    const isManual = c.source==='manual';
    const nameDisp = c.name || (lang==='bm'?'Kerja Dalaman':'Internal Work');
    return `<div class="cp-card ${statusClass(c.status)}">
      <div class="cp-card-top">
        <div class="cp-id-wrap">
          <div class="cp-ref" style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;">
            <span>${c.ref}${urgIcon}</span>
            ${isManual?`<span style="font-size:.64rem;background:#8b5cf6;color:#fff;border-radius:8px;padding:2px 7px;font-weight:700;letter-spacing:.3px;">MANUAL</span>`:''}
          </div>
          <div class="cp-name">${nameDisp}</div>
        </div>
        ${statusBadge(c.status)}
      </div>
      <div class="cp-tags">
        <span class="cp-tag"><span class="cp-tag-ic">🔧</span><span class="cp-tag-txt">${c.problem}</span></span>
        ${c.bookingType==='kerja'?`<span class="cp-tag" style="background:rgba(59,130,246,.12);border-color:#3b82f6;color:#3b82f6;font-weight:700;">${t('bkTypeBadgeKerja')}</span>`:''}
        ${c.bookingType==='site_visit'?`<span class="cp-tag" style="background:rgba(139,92,246,.12);border-color:#8b5cf6;color:#8b5cf6;font-weight:700;">${t('bkTypeBadgeSite')}</span>`:''}
        ${c.desc?`<span class="cp-tag"><span class="cp-tag-ic">💬</span><span class="cp-tag-txt">${c.desc}</span></span>`:''}
        ${c.media&&c.media.length?`<span class="cp-tag"><span class="cp-tag-ic">📷</span><span class="cp-tag-txt">${c.media.length}</span></span>`:''}
      </div>
      <div class="cp-meta">
        <div class="cp-meta-item"><span class="cp-meta-ic">📞</span>${c.phone||'-'}</div>
        ${c.address?`<div class="cp-meta-item" style="grid-column:1/-1;"><span class="cp-meta-ic">📍</span>${c.address}</div>`:''}
        <div class="cp-meta-item"><span class="cp-meta-ic">📅</span>${fmtDateShort(c.prefDate)}</div>
        <div class="cp-meta-item"><span class="cp-meta-ic">🕐</span>${c.prefTime}</div>
        ${c.bookingType==='site_visit'&&c.mileageKm!=null?`<div class="cp-meta-item" style="grid-column:1/-1;"><span class="cp-meta-ic">🚗</span>${t('mileDist')}: ${Number(c.mileageKm).toFixed(1)} km | ${t('mileChargeLbl')}: ${c.mileageCharge>0?'RM '+Number(c.mileageCharge).toFixed(2):t('mileFreeZone')}</div>`:''}
        ${assigned
          ? `<div class="cp-meta-item"><span class="cp-meta-ic">🧑‍🔧</span>${lang==='bm'?'Ditugaskan':'Assigned'}: ${c.assignedName}</div>`
          : `<div class="cp-meta-item cp-warn"><span class="cp-meta-ic">⚠️</span>${t('notAssigned')}</div>`}
        ${c.acceptedByName?`<div class="cp-meta-item"><span class="cp-meta-ic">🧰</span>${c.acceptedByName}</div>`:''}
      </div>
      <div class="cp-actions">
        ${isAdmin?`<button class="cp-btn cp-btn-sec" onclick="openJobModal('${c.id}')">✏️ ${t('editComplaint')}</button>`:''}
        <button class="cp-btn cp-btn-sec" onclick="openGalleryModal('${c.id}')">🖼️ ${t('galleryView')}</button>
        <button class="cp-btn cp-btn-pri" onclick="openStatusModal('${c.id}')">🔄 ${t('updateStatus')}</button>
        <button class="cp-btn cp-btn-sec" onclick="openShareModal('${c.id}')">📤 ${t('shareInfo')}</button>
        ${c.coords?`<a class="cp-btn cp-btn-sec" href="https://www.google.com/maps?q=${c.coords.lat},${c.coords.lng}" target="_blank" rel="noopener" style="text-decoration:none;">🗺️ ${lang==='bm'?'Peta':'Map'}</a>`:''}
        ${isAdmin?`<button class="cp-btn" style="background:#fee2e2;color:#dc2626;border:1px solid #fca5a5;" onclick="adminDeleteComplaint('${c.ref}')">🗑️ Delete</button>`:''}
      </div>
    </div>`;
  }).join('');

  // Manual job cards — purple left border + MANUAL badge
  const manualCards = mjList.map(j=>{
    const sClass = statusClass(j.status);
    return `<div class="cp-card ${sClass}" style="border-left-color:#8b5cf6;">
      <div class="cp-card-top">
        <div class="cp-id-wrap">
          <div class="cp-ref" style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;">
            <span>${j.complaint_ref}</span>
            <span style="font-size:.64rem;background:#8b5cf6;color:#fff;border-radius:8px;padding:2px 7px;font-weight:700;letter-spacing:.3px;">MANUAL</span>
            ${j.is_pool?`<span style="font-size:.64rem;background:#ede9fe;color:#6d28d9;border-radius:8px;padding:2px 7px;font-weight:700;">POOL</span>`:''}
          </div>
          <div class="cp-name">${j.job_title||j.job_description||'—'}</div>
        </div>
        ${statusBadge(j.status)}
      </div>
      <div class="cp-tags">
        <span class="cp-tag"><span class="cp-tag-ic">🔧</span><span class="cp-tag-txt">${lang==='bm'?'Kerja Manual':'Manual Job'}</span></span>
        ${j.job_description&&j.job_description!==j.job_title?`<span class="cp-tag"><span class="cp-tag-ic">💬</span><span class="cp-tag-txt">${j.job_description}</span></span>`:''}
        ${j.job_location?`<span class="cp-tag"><span class="cp-tag-ic">📍</span><span class="cp-tag-txt">${j.job_location}</span></span>`:''}
      </div>
      <div class="cp-meta">
        <div class="cp-meta-item"><span class="cp-meta-ic">📅</span>${fmtDateShort(j.job_date)}</div>
        <div class="cp-meta-item"><span class="cp-meta-ic">🕐</span>${(j.job_time||'').slice(0,5)||'—'}</div>
        ${j.operator_name
          ? `<div class="cp-meta-item"><span class="cp-meta-ic">🧰</span>${j.operator_name}</div>`
          : `<div class="cp-meta-item cp-warn"><span class="cp-meta-ic">⚠️</span>${lang==='bm'?'Menunggu operator':'Awaiting operator'}</div>`}
        <div class="cp-meta-item"><span class="cp-meta-ic">👤</span>${lang==='bm'?'Oleh':'By'}: ${j.created_by||'Admin'}</div>
      </div>
      <div class="cp-actions">
        <span style="font-size:.78rem;color:#8b5cf6;font-style:italic;">🗓️ ${lang==='bm'?'Diurus dari Jadual Kerja':'Managed from Work Schedule'}</span>
      </div>
    </div>`;
  }).join('');

  setHTML('cp-list', complaintCards + manualCards);
}

// ─── STAT DRILL-DOWN MODAL ────────────────────────────────────────────────────
function openStatModal(filter) {
  const mc = myComplaints();
  const labelMap = { all:t('totalJobs'), today:t('todayJobs'), Menunggu:t('pending'), 'Sedang Berjalan':t('inProgress'), Selesai:t('completed') };
  const iconMap  = { all:'📋', today:'📅', Menunggu:'⏳', 'Sedang Berjalan':'🔄', Selesai:'✅' };
  let list;
  if(filter==='all')        list = mc;
  else if(filter==='today') list = mc.filter(c=>(c.schedDate||c.prefDate)===now());
  else                      list = mc.filter(c=>c.status===filter);
  setTxt('sm-title', `${iconMap[filter]||'📋'} ${labelMap[filter]||filter} (${list.length})`);
  setHTML('sm-body', list.length ? list.map(c=>{
    const bkBadge = c.bookingType==='kerja'
      ? `<span style="font-size:.68rem;background:rgba(59,130,246,.15);color:#3b82f6;border:1px solid #3b82f6;border-radius:6px;padding:2px 7px;font-weight:700;">${t('bkTypeBadgeKerja')}</span>`
      : c.bookingType==='site_visit'
      ? `<span style="font-size:.68rem;background:rgba(139,92,246,.15);color:#8b5cf6;border:1px solid #8b5cf6;border-radius:6px;padding:2px 7px;font-weight:700;">${t('bkTypeBadgeSite')}</span>`
      : '';
    const urgBadge = c.urgency==='Segera'
      ? `<span style="font-size:.68rem;background:rgba(239,68,68,.15);color:#ef4444;border:1px solid #ef4444;border-radius:6px;padding:2px 7px;font-weight:700;">🚨 ${lang==='bm'?'Segera':'Urgent'}</span>`
      : '';
    const row = (icon, val, bold=false) => val
      ? `<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:4px;font-size:.8rem;">
           <span style="flex-shrink:0;width:18px;">${icon}</span>
           <span style="${bold?'font-weight:700;':''}color:var(--gray-700);">${val}</span>
         </div>` : '';
    return `<div style="padding:14px 0;border-bottom:1px solid var(--gray-100);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:6px;">
        <span style="font-weight:800;font-size:.92rem;color:var(--navy);">${c.ref}</span>
        <div style="display:flex;gap:5px;flex-wrap:wrap;align-items:center;">
          ${bkBadge}${urgBadge}${statusBadge(c.status)}
        </div>
      </div>
      ${row('👤', c.name, true)}
      ${row('📞', c.phone)}
      ${row('📍', c.address)}
      ${row('🔧', c.problem + (c.desc ? ` — ${c.desc}` : ''))}
      ${row('🕐', c.prefTime)}
      ${c.bookingType==='site_visit'&&c.mileageKm!=null?row('🚗', t('mileDist')+': '+Number(c.mileageKm).toFixed(1)+' km | '+t('mileChargeLbl')+': '+(c.mileageCharge>0?'RM '+Number(c.mileageCharge).toFixed(2):t('mileFreeZone'))):''}
      ${row('👷', c.assignedName || c.acceptedByName || `<span style="color:var(--gray-400);font-style:italic;">${lang==='bm'?'Belum ditugaskan':'Not yet assigned'}</span>`)}
    </div>`;
  }).join('')
    : `<div class="empty-state"><div class="empty-state-icon">${iconMap[filter]||'📋'}</div><p>${t('noJobs')}</p></div>`);
  openModal('modal-stats');
}

function openProbModal(prob) {
  const list = complaints.filter(c=>c.problem===prob);
  setTxt('sm-title', `🔧 ${prob} (${list.length})`);
  setHTML('sm-body', list.length ? list.map(c=>`
    <div style="padding:12px 0;border-bottom:1px solid var(--gray-100);cursor:pointer;" onclick="closeModal('modal-stats')">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
        <span style="font-weight:700;font-size:.9rem;">${c.ref}</span>
        ${statusBadge(c.status)}
      </div>
      <div style="font-size:.82rem;color:var(--gray-700);margin-bottom:2px;">👤 ${c.name} · 📅 ${fmtDateShort(c.prefDate)}</div>
      <div style="font-size:.78rem;color:var(--gray-500);">📍 ${(c.address||'').split(',').slice(-3).join(',').trim()}</div>
    </div>`).join('')
    : `<div class="empty-state"><div class="empty-state-icon">🔧</div><p>${t('noJobs')}</p></div>`);
  openModal('modal-stats');
}

// ─── REPORT DRILL-DOWN MODAL ─────────────────────────────────────────────────
function openRpDrillModal(title, list) {
  setTxt('rp-drill-title', title);
  setHTML('rp-drill-body', list.length ? list.map(c=>`
    <div style="padding:12px 0;border-bottom:1px solid #2a2a2a;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
        <span style="font-weight:700;font-size:.9rem;color:#fff;">${c.ref}</span>
        ${statusBadge(c.status)}
      </div>
      <div style="font-size:.83rem;color:#e0e0e0;margin-bottom:3px;">👤 ${c.name}</div>
      <div style="font-size:.82rem;color:#c0c0c0;margin-bottom:3px;">🔧 ${c.problem}${c.desc?` · <span style="color:#888;">${c.desc}</span>`:''}</div>
      <div style="font-size:.78rem;color:#888;margin-bottom:3px;">📅 ${fmtDateShort(c.prefDate)} · 🕐 ${c.prefTime}</div>
      <div style="font-size:.78rem;color:#888;">🧑‍🔧 ${c.assignedName||c.acceptedByName||(lang==='bm'?'Belum ditugaskan':'Not assigned')}</div>
    </div>`).join('')
    : `<div style="text-align:center;padding:36px 0;color:#666;font-size:.88rem;">Tiada rekod</div>`);
  openModal('modal-rp-drill');
}

async function handleReportBarClick(status) {
  const iconMap  = { Menunggu:'⏳', 'Sedang Berjalan':'🔄', Selesai:'✅' };
  const labelMap = { Menunggu:t('pending'), 'Sedang Berjalan':t('inProgress'), Selesai:t('completed') };
  setTxt('rp-drill-title', `${iconMap[status]||'📋'} Aduan - ${labelMap[status]||status}`);
  setHTML('rp-drill-body', `<div style="text-align:center;padding:36px 0;color:#666;">⏳ Memuatkan...</div>`);
  openModal('modal-rp-drill');
  try {
    const { data, error } = await db.from('complaints').select(COMPLAINT_LIST_COLUMNS).eq('status', status).eq('is_deleted', false).order('submitted_at', { ascending: false });
    if(error) throw error;
    const list = (data||[]).map(rowToComplaint);
    setTxt('rp-drill-title', `${iconMap[status]||'📋'} Aduan - ${labelMap[status]||status} (${list.length})`);
    openRpDrillModal(`${iconMap[status]||'📋'} Aduan - ${labelMap[status]||status} (${list.length})`, list);
  } catch(e) {
    console.error('handleReportBarClick:', e);
    setHTML('rp-drill-body', `<div style="text-align:center;padding:36px 0;color:#f87171;">Ralat memuatkan data.</div>`);
  }
}

async function handleReportTypeClick(el) {
  const prob = el.dataset.prob;
  setTxt('rp-drill-title', `🔧 Aduan - ${prob}`);
  setHTML('rp-drill-body', `<div style="text-align:center;padding:36px 0;color:#666;">⏳ Memuatkan...</div>`);
  openModal('modal-rp-drill');
  try {
    const { data, error } = await db.from('complaints').select(COMPLAINT_LIST_COLUMNS).eq('problem', prob).eq('is_deleted', false).order('submitted_at', { ascending: false });
    if(error) throw error;
    const list = (data||[]).map(rowToComplaint);
    openRpDrillModal(`🔧 Aduan - ${prob} (${list.length})`, list);
  } catch(e) {
    console.error('handleReportTypeClick:', e);
    setHTML('rp-drill-body', `<div style="text-align:center;padding:36px 0;color:#f87171;">Ralat memuatkan data.</div>`);
  }
}

// ─── REPORT STAT CARD CLICK ──────────────────────────────────────────────────
async function handleRpStatCard(filter) {
  const iconMap  = { all:'📋', Menunggu:'⏳', 'Sedang Berjalan':'🔄', Selesai:'✅', urgent:'🚨', staff:'👷' };
  const labelMap = { all:t('totalJobs'), Menunggu:t('pending'), 'Sedang Berjalan':t('inProgress'), Selesai:t('completed'), urgent:lang==='bm'?'Segera':'Urgent', staff:t('totalStaff') };
  const icon  = iconMap[filter]  || '📋';
  const label = labelMap[filter] || filter;

  // Staff card — no Supabase query needed, show from USERS array
  if(filter === 'staff') {
    const staffList = USERS.filter(u=>u.role==='staff'||u.role==='operator');
    setTxt('rp-drill-title', `${icon} ${label} (${staffList.length})`);
    setHTML('rp-drill-body', staffList.length ? staffList.map(u=>`
      <div style="padding:12px 0;border-bottom:1px solid #2a2a2a;display:flex;align-items:center;gap:12px;">
        <div style="width:36px;height:36px;border-radius:50%;background:#2a2a2a;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;">${iniOf(u.name)}</div>
        <div>
          <div style="font-weight:700;font-size:.88rem;color:#fff;">${u.name}</div>
          <div style="font-size:.76rem;color:#888;margin-top:2px;">🆔 ${u.staffId||u.staff_id||'—'} · ${u.role==='admin'?t('role_admin'):u.role==='operator'?t('role_operator'):u.role==='team_leader'?t('role_team_leader'):t('role_staff')}</div>
        </div>
      </div>`).join('')
      : `<div style="text-align:center;padding:36px 0;color:#666;font-size:.88rem;">Tiada rekod</div>`);
    openModal('modal-rp-drill');
    return;
  }

  setTxt('rp-drill-title', `${icon} ${label}`);
  setHTML('rp-drill-body', `<div style="text-align:center;padding:36px 0;color:#666;">⏳ Memuatkan...</div>`);
  openModal('modal-rp-drill');
  try {
    let query = db.from('complaints').select(COMPLAINT_LIST_COLUMNS).eq('is_deleted', false).order('submitted_at', { ascending: false });
    if(filter === 'urgent')              query = query.eq('urgency', 'Segera');
    else if(filter !== 'all')            query = query.eq('status', filter);
    const { data, error } = await query;
    if(error) throw error;
    const list = (data||[]).map(rowToComplaint);
    setTxt('rp-drill-title', `${icon} ${label} (${list.length})`);
    openRpDrillModal(`${icon} ${label} (${list.length})`, list);
  } catch(e) {
    console.error('handleRpStatCard:', e);
    setHTML('rp-drill-body', `<div style="text-align:center;padding:36px 0;color:#f87171;">Ralat memuatkan data.</div>`);
  }
}

// ─── REPORT TABLE ROW CLICK ───────────────────────────────────────────────────
function handleRpRowClick(cid) {
  const c = complaints.find(x=>x.id===cid);
  if(!c) return;
  setTxt('rp-drill-title', `📋 ${c.ref}`);
  setHTML('rp-drill-body', `
    <div style="padding:4px 0 16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="font-weight:800;font-size:1rem;color:#fff;letter-spacing:.3px;">${c.ref}</span>
        ${statusBadge(c.status)}
      </div>
      <div style="display:grid;gap:10px;">
        <div style="display:flex;gap:8px;"><span style="color:#888;font-size:.8rem;width:110px;flex-shrink:0;">👤 ${lang==='bm'?'Nama':'Name'}</span><span style="color:#e0e0e0;font-size:.82rem;font-weight:600;">${c.name}</span></div>
        <div style="display:flex;gap:8px;"><span style="color:#888;font-size:.8rem;width:110px;flex-shrink:0;">📞 ${lang==='bm'?'Telefon':'Phone'}</span><span style="color:#e0e0e0;font-size:.82rem;">${c.phone}</span></div>
        <div style="display:flex;gap:8px;"><span style="color:#888;font-size:.8rem;width:110px;flex-shrink:0;">📍 ${lang==='bm'?'Alamat':'Address'}</span><span style="color:#e0e0e0;font-size:.82rem;">${c.address}</span></div>
        <div style="display:flex;gap:8px;"><span style="color:#888;font-size:.8rem;width:110px;flex-shrink:0;">🔧 ${lang==='bm'?'Masalah':'Problem'}</span><span style="color:#e0e0e0;font-size:.82rem;font-weight:600;">${c.problem}</span></div>
        ${c.desc?`<div style="display:flex;gap:8px;"><span style="color:#888;font-size:.8rem;width:110px;flex-shrink:0;">💬 ${lang==='bm'?'Huraian':'Description'}</span><span style="color:#e0e0e0;font-size:.82rem;">${c.desc}</span></div>`:''}
        <div style="display:flex;gap:8px;"><span style="color:#888;font-size:.8rem;width:110px;flex-shrink:0;">🚨 ${lang==='bm'?'Keutamaan':'Urgency'}</span><span style="color:${c.urgency==='Segera'?'#f87171':'#888'};font-size:.82rem;font-weight:${c.urgency==='Segera'?'700':'400'};">${c.urgency==='Segera'?(lang==='bm'?'Segera':'Urgent'):(lang==='bm'?'Normal':'Normal')}</span></div>
        <div style="display:flex;gap:8px;"><span style="color:#888;font-size:.8rem;width:110px;flex-shrink:0;">📅 ${lang==='bm'?'Tarikh':'Date'}</span><span style="color:#e0e0e0;font-size:.82rem;">${fmtDate(c.prefDate)}</span></div>
        <div style="display:flex;gap:8px;"><span style="color:#888;font-size:.8rem;width:110px;flex-shrink:0;">🕐 ${lang==='bm'?'Masa':'Time'}</span><span style="color:#e0e0e0;font-size:.82rem;">${c.prefTime}</span></div>
        <div style="display:flex;gap:8px;"><span style="color:#888;font-size:.8rem;width:110px;flex-shrink:0;">🧑‍🔧 ${lang==='bm'?'Ditugaskan':'Assigned'}</span><span style="color:#e0e0e0;font-size:.82rem;">${c.assignedName||c.acceptedByName||(lang==='bm'?'Belum ditugaskan':'Not assigned')}</span></div>
        ${c.acceptedByName?`<div style="display:flex;gap:8px;"><span style="color:#888;font-size:.8rem;width:110px;flex-shrink:0;">🤝 ${lang==='bm'?'Diterima':'Accepted'}</span><span style="color:#e0e0e0;font-size:.82rem;">${c.acceptedByName}</span></div>`:''}
      </div>
    </div>`);
  openModal('modal-rp-drill');
}

// ─── JOB MODAL ────────────────────────────────────────────────────────────────
// Renders the "Customer complaint photos" section of the Edit Aduan modal.
// `loading` shows a placeholder while media is still being fetched on-demand.
function renderMjCustPhotos(c, loading) {
  const cpEl = el('mj-cust-photos');
  if(!cpEl) return;
  const hdr = `<div style="background:linear-gradient(135deg,#d97706,#b45309);color:white;padding:9px 14px;font-size:.78rem;font-weight:700;letter-spacing:.4px;text-transform:uppercase;">
    📷 ${lang==='bm'?'Gambar Aduan Pelanggan':'Customer Complaint Photos'}
  </div>`;
  if(loading) {
    cpEl.innerHTML = hdr
      + `<div style="padding:12px;font-size:.82rem;color:var(--gray-400);">⏳ ${lang==='bm'?'Memuatkan gambar...':'Loading photos...'}</div>`;
  } else if(c.media && c.media.length) {
    cpEl.innerHTML = hdr
      + `<div style="padding:12px;display:flex;flex-wrap:wrap;gap:8px;">
          ${c.media.map((f,i)=>{
            const isImg = f.type && f.type.startsWith('image/');
            return `<div style="cursor:pointer;" onclick="openFullscreen(complaints.find(x=>x.id==='${c.id}').media,${i})">
              ${isImg
                ? `<img src="${f.src}" style="width:76px;height:62px;object-fit:cover;border-radius:6px;border:1px solid #fed7aa;">`
                : `<div style="width:76px;height:62px;background:#fff7ed;border-radius:6px;border:1px solid #fed7aa;display:flex;align-items:center;justify-content:center;font-size:1.5rem;">🎬</div>`}
            </div>`;
          }).join('')}
        </div>`;
  } else {
    cpEl.innerHTML = hdr
      + `<div style="padding:12px;font-size:.82rem;color:var(--gray-400);">${lang==='bm'?'Tiada gambar daripada pelanggan.':'No photos from customer.'}</div>`;
  }
}

function openJobModal(cid) {
  editJobId = cid;
  const c = complaints.find(x=>x.id===cid);
  if(!c) return;
  setTxt('mj-title', `📋 ${t('editComplaint')} — ${c.ref}`);
  // Labels (translated)
  setTxt('mj-lbl-cust',       lang==='bm'?'Pelanggan':'Customer');
  setTxt('mj-lbl-phone',      lang==='bm'?'Telefon':'Phone');
  setTxt('mj-lbl-addr',       lang==='bm'?'Alamat':'Address');
  setTxt('mj-lbl-bk-type-edit', t('cfLblBkType'));
  setTxt('mj-bkt-kerja-lbl', t('cfBktKerja'));
  setTxt('mj-bkt-site-lbl',  t('cfBktSite'));
  setTxt('mj-lbl-prob',       lang==='bm'?'Jenis Masalah':'Problem Type');
  setTxt('mj-lbl-urgency-edit', lang==='bm'?'Keutamaan':'Priority');
  setTxt('mj-lbl-desc-edit',  lang==='bm'?'Penerangan':'Description');
  setTxt('mj-lbl-pref-date',  lang==='bm'?'Tarikh Pilihan':'Preferred Date');
  setTxt('mj-lbl-pref-time',  lang==='bm'?'Masa Pilihan':'Preferred Time');
  setTxt('mj-urgency-segera', lang==='bm'?'🚨 Segera':'🚨 Urgent');
  // Populate editable fields
  el('mj-edit-name').value      = c.name;
  el('mj-edit-phone').value     = c.phone;
  el('mj-edit-addr').value      = c.address||'';
  el('mj-edit-prob').value      = c.problem;
  el('mj-edit-urgency').value   = c.urgency||'Normal';
  el('mj-edit-desc').value      = c.desc||'';
  el('mj-edit-pref-date').value = c.prefDate||'';
  populateMjTimeOptions(c.prefDate||'', c.prefTime||'');
  setMjBookingType(c.bookingType||'kerja');
  // Build assign dropdown — merge hardcoded USERS + Supabase dynamicStaff
  const assignEl = el('mj-assign');
  if(assignEl) {
    const hardcodedOps = USERS.filter(u=>u.role==='staff'||u.role==='operator'||u.role==='team_leader')
      .map(u=>({ username: u.username, name: u.name, role: u.role }));
    const dynamicOps = dynamicStaff.filter(u=>u.role==='staff'||u.role==='operator'||u.role==='team_leader')
      .filter(u=>!hardcodedOps.find(h=>h.username===u.username)) // deduplicate
      .map(u=>({ username: u.username, name: u.name, role: u.role }));
    const allOps = [...hardcodedOps, ...dynamicOps];
    assignEl.innerHTML = `<option value="">-- ${t('unassigned')} --</option>`
      + allOps.map(u=>`<option value="${u.username}">${u.name} (${u.role==='operator'?t('role_operator'):u.role==='team_leader'?t('role_team_leader'):t('role_staff')})</option>`).join('');
    assignEl.value = c.assignedTo||'';
  }
  el('mj-status').value    = c.status;
  el('mj-sched-date').value = c.schedDate||c.prefDate;
  el('mj-notes').value     = c.adminNotes||'';
  // ── SECTION 1: Customer complaint photos (amber header) ────────────────────
  // media is fetched on-demand (see ensureComplaintMedia) — show a loading
  // state immediately, then fill in once the fetch resolves.
  renderMjCustPhotos(c, c.media===undefined);
  if(c.media === undefined) {
    ensureComplaintMedia(c).then(() => renderMjCustPhotos(c, false));
  }

  // ── OPERATOR ACCEPT / COMPLETE INFO ─────────────────────────────────────────
  const opEl = el('mj-op-info');
  if(opEl) {
    let opHtml = '';
    if(c.acceptedBy) {
      opHtml += `<div style="display:flex;gap:8px;margin-bottom:4px;">
        <span class="text-muted" style="min-width:120px;">🧰 ${t('opAcceptedBy')}:</span>
        <strong>${c.acceptedByName}</strong>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:4px;">
        <span class="text-muted" style="min-width:120px;">⏰ ${t('opAcceptedAt')}:</span>
        <strong>${fmtDate(c.acceptedAt)}${c.acceptedAt?' '+c.acceptedAt.slice(11,16):''}</strong>
      </div>`;
    }
    if(c.completedAt) {
      opHtml += `<div style="display:flex;gap:8px;">
        <span class="text-muted" style="min-width:120px;">✅ ${t('opCompletedAt')}:</span>
        <strong>${fmtDate(c.completedAt)}${c.completedAt?' '+c.completedAt.slice(11,16):''}</strong>
      </div>`;
    }
    opEl.style.display = opHtml ? 'block' : 'none';
    opEl.innerHTML = opHtml;
  }

  // ── SECTION 2: Operator before/during/after gallery (navy header) ────────────
  const ogEl = el('mj-op-gallery');
  if(ogEl) {
    const gd = galleryData[c.id] || { before:[], during:[], after:[] };
    const cats = [
      { key:'before', icon:'📷', label:lang==='bm'?'Sebelum':'Before' },
      { key:'during', icon:'🔧', label:lang==='bm'?'Semasa':'During' },
      { key:'after',  icon:'✅', label:lang==='bm'?'Selepas':'After'  },
    ];
    const totalPhotos = cats.reduce((n,cat)=> n + (gd[cat.key]?gd[cat.key].length:0), 0);
    const hdrNavy = `<div style="background:linear-gradient(135deg,var(--navy),#2a3a9e);color:white;padding:9px 14px;display:flex;justify-content:space-between;align-items:center;">
      <span style="font-size:.78rem;font-weight:700;letter-spacing:.4px;text-transform:uppercase;">🗂️ ${lang==='bm'?'Galeri Kerja Operator':'Operator Work Gallery'}</span>
      ${totalPhotos?`<span style="font-size:.72rem;background:rgba(255,255,255,.2);border-radius:10px;padding:1px 8px;">${totalPhotos} ${lang==='bm'?'gambar':'photos'}</span>`:''}
    </div>`;
    if(totalPhotos === 0) {
      ogEl.innerHTML = hdrNavy
        + `<div style="padding:12px;font-size:.82rem;color:var(--gray-400);">${lang==='bm'?'Tiada gambar dimuat naik oleh operator.':'No photos uploaded by operator.'}</div>`;
    } else {
      const catRows = cats.map(cat=>{
        const arr = gd[cat.key] || [];
        return `<div style="padding:10px 12px;${cat.key!=='after'?'border-bottom:1px solid var(--gray-100);':''}">
          <div style="font-size:.72rem;font-weight:700;color:var(--navy);text-transform:uppercase;letter-spacing:.3px;margin-bottom:6px;">
            ${cat.icon} ${cat.label} <span style="font-weight:400;color:var(--gray-400);">(${arr.length})</span>
          </div>
          ${arr.length
            ? `<div style="display:flex;flex-wrap:wrap;gap:7px;">
                ${arr.map((p,i)=>{
                  const isImg = p.type && p.type.startsWith('image/');
                  return `<div style="cursor:pointer;" onclick="openFullscreen(galleryData['${c.id}']['${cat.key}'],${i})">
                    ${isImg
                      ? `<img src="${p.src}" style="width:76px;height:62px;object-fit:cover;border-radius:6px;border:1px solid var(--gray-200);">`
                      : `<div style="width:76px;height:62px;background:#1a237e11;border-radius:6px;border:1px solid var(--gray-200);display:flex;align-items:center;justify-content:center;font-size:1.5rem;">🎬</div>`}
                  </div>`;
                }).join('')}
              </div>`
            : `<div style="font-size:.79rem;color:var(--gray-400);">${lang==='bm'?'Tiada gambar.':'No photos.'}</div>`}
        </div>`;
      }).join('');
      ogEl.innerHTML = hdrNavy + catRows;
    }
  }

  openModal('modal-job');
}

function saveJob() {
  const c = complaints.find(x=>x.id===editJobId);
  if(!c) return;
  const prevAssign = c.assignedTo;
  const prevAssignName = c.assignedName;
  const newAssignVal = el('mj-assign').value;
  // Admin/Team-Leader override: warn before silently reassigning an already-assigned job
  if(prevAssign && newAssignVal && newAssignVal!==prevAssign) {
    const newAu = USERS.find(u=>u.username===newAssignVal) || dynamicStaff.find(u=>u.username===newAssignVal);
    const newName = newAu ? newAu.name : newAssignVal;
    const msg = t('reassignWarn').replace('{old}', prevAssignName||prevAssign).replace('{new}', newName);
    if(!confirm(msg)) return;
  }
  // Customer fields
  c.name        = el('mj-edit-name').value.trim()    || c.name;
  c.phone       = el('mj-edit-phone').value.trim()   || c.phone;
  c.address     = el('mj-edit-addr').value.trim()    || c.address;
  c.problem     = el('mj-edit-prob').value           || c.problem;
  c.urgency     = el('mj-edit-urgency').value        || c.urgency;
  c.desc        = el('mj-edit-desc').value.trim();
  c.prefDate    = el('mj-edit-pref-date').value      || c.prefDate;
  c.prefTime    = el('mj-edit-pref-time').value      || c.prefTime;
  c.bookingType = el('mj-booking-type').value        || c.bookingType;
  // Admin fields
  c.assignedTo  = el('mj-assign').value;
  c.status      = el('mj-status').value;
  c.schedDate   = el('mj-sched-date').value;
  c.adminNotes  = el('mj-notes').value;
  c.updatedAt   = new Date().toISOString();
  const au = USERS.find(u=>u.username===c.assignedTo) || dynamicStaff.find(u=>u.username===c.assignedTo);
  c.assignedName = au ? au.name : '';

  if(c.assignedTo && c.assignedTo!==prevAssign) {
    addNotif('assign', t('notifAssigned'), `${c.ref} — ${c.problem} di ${c.address.split(',')[0]}`, 'staff', c.assignedTo);
  }
  dbUpdateComplaint(c);
  closeModal('modal-job');
  toast(lang==='bm'?'Aduan berjaya dikemaskini':'Complaint updated successfully', 'success');
  renderComplaints();
  renderDashboard();
  buildSidebar();
}

async function deleteComplaint() {
  const delRef = (complaints.find(x=>x.id===editJobId)||{}).ref;
  if(!delRef) return;
  if(!confirm('Padam aduan '+delRef+'? Tindakan ini tidak boleh dibatalkan.')) return;
  const ok = await dbDeleteComplaint(delRef);
  if(!ok) { toast(lang==='bm'?'Gagal memadam aduan.':'Failed to delete complaint.', 'error'); return; }
  complaints = complaints.filter(x=>x.id!==editJobId);
  closeModal('modal-job');
  toast('Aduan '+delRef+' telah dipadam', 'success');
  renderComplaints();
  renderDashboard();
  buildSidebar();
}

// ─── STATUS MODAL ─────────────────────────────────────────────────────────────
function openStatusModal(cid) {
  statusJobId = cid;
  const c = complaints.find(x=>x.id===cid);
  if(!c) return;
  setHTML('ms-job-info', `<strong>${c.ref}</strong> — ${c.name}<br><span class="text-muted">${c.problem}</span>`);
  el('ms-status').value = c.status;
  el('ms-note').value   = '';
  openModal('modal-status');
}

function confirmStatusUpdate() {
  const c = complaints.find(x=>x.id===statusJobId);
  if(!c) return;
  const newStatus = el('ms-status').value;
  if(newStatus==='Selesai' && c.status!=='Selesai') {
    const gd = galleryData[c.id] || {};
    const hasAfter = gd.after && gd.after.length > 0;
    if(!hasAfter) {
      if(user.role==='operator') {
        toast(t('completeNeedAfterPhoto'), 'error', 5000);
        return;
      }
      if(!confirm(t('completeNoAfterConfirm'))) return;
    }
  }
  c.status    = newStatus;
  c.updatedAt = new Date().toISOString();
  const note  = el('ms-note').value.trim();
  if(note) c.techNotes = note;
  addNotif('status', t('notifStatusUpdate'),
    `${c.ref} — ${statusLabel(c.status)} · ${user.name}`, 'admin');
  dbUpdateComplaint(c);
  closeModal('modal-status');
  toast(t('statusUpdated'), 'success');
  renderComplaintsList();
  renderDashboard();
  buildSidebar();
}

// ─── SHARE COMPLAINT INFO ─────────────────────────────────────────────────────
let shareComplaint = null;

function buildShareText(c) {
  const priority = c.urgency === 'Segera' ? 'Segera 🚨' : 'Normal';
  return `🔔 *ADUAN BARU* — #${c.ref}
👤 Nama: ${c.name || '-'}
📞 Phone: ${c.phone || '-'}
📍 Alamat: ${c.address || '-'}
🔧 Jenis Kerosakan: ${c.problem}
⚡ Priority: ${priority}
📅 Tarikh: ${fmtDate(c.prefDate)}
🕐 Masa Slot: ${c.prefTime || '-'}
📝 Nota: ${c.desc || '-'}`;
}

function openShareModal(cid) {
  const c = complaints.find(x => x.id === cid);
  if(!c) return;
  shareComplaint = c;
  el('share-text-content').value = buildShareText(c);
  switchShareTab('text');
  openModal('modal-share');
}

function switchShareTab(tab) {
  document.querySelectorAll('.share-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.share-pane').forEach(p => p.classList.remove('active'));
  el('share-tab-' + tab + '-btn').classList.add('active');
  el('share-pane-' + tab).classList.add('active');
  if(tab === 'png' && shareComplaint) renderSharePng(shareComplaint);
}

function copyShareText() {
  const box = el('share-text-content');
  box.select();
  const text = box.value;
  const done = () => toast(t('shareCopied'), 'success');
  if(navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => { document.execCommand('copy'); done(); });
  } else {
    document.execCommand('copy'); done();
  }
}

const SHARE_PNG_W = 800;
const SHARE_FIELDS_START_Y = 230;
const SHARE_FIELD_LABEL_H = 30;   // label line → value start
const SHARE_FIELD_VALUE_LH = 26;  // value line height
const SHARE_FIELD_GAP = 20;       // gap after each field
const SHARE_FOOTER_GAP = 30;      // last field → separator line
const SHARE_FOOTER_TEXT_GAP = 30; // separator line → footer text
const SHARE_BOTTOM_PAD = 40;      // footer text → canvas bottom

function shareFieldsFor(c) {
  return [
    ['👤', 'Nama', c.name],
    ['📞', 'Phone', c.phone],
    ['📍', 'Alamat', c.address],
    ['🔧', 'Jenis Kerosakan', c.problem],
    ['📅', 'Tarikh', fmtDate(c.prefDate)],
    ['🕐', 'Masa Slot', c.prefTime],
    ['📝', 'Nota', c.desc],
  ].filter(([, , value]) => value && value !== '-');
}

function renderSharePng(c) {
  const cv = el('share-png-canvas');
  if(!cv) return;
  cv.width = SHARE_PNG_W;
  let ctx = cv.getContext('2d');
  const W = SHARE_PNG_W;
  const fields = shareFieldsFor(c);

  // Pass 1: measure wrapped line counts to compute the exact canvas height
  ctx.font = '400 20px Arial, sans-serif';
  let contentH = 0;
  const fieldLines = fields.map(([, , value]) => {
    const lines = wrapTextLines(ctx, String(value), W - 80);
    contentH += SHARE_FIELD_LABEL_H + lines.length * SHARE_FIELD_VALUE_LH + SHARE_FIELD_GAP;
    return lines;
  });
  const H = SHARE_FIELDS_START_Y + contentH + SHARE_FOOTER_GAP + SHARE_FOOTER_TEXT_GAP + SHARE_BOTTOM_PAD;

  // Resizing the canvas clears it and resets context state — re-fetch and redraw
  cv.height = Math.round(H);
  ctx = cv.getContext('2d');

  // Background
  ctx.fillStyle = '#0d0d0d';
  ctx.fillRect(0, 0, W, cv.height);

  // Header
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 30px Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('E MAN UTAMA', 40, 70);
  ctx.fillStyle = '#8fc63d';
  ctx.font = '600 15px Arial, sans-serif';
  ctx.fillText('Pakar Paip & Pembetungan · Johor', 40, 96);

  // Lime accent line
  ctx.fillStyle = '#8fc63d';
  ctx.fillRect(40, 118, W - 80, 4);

  // Ref
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 24px Arial, sans-serif';
  ctx.fillText('ADUAN #' + c.ref, 40, 168);

  // Priority badge
  const isUrgent = c.urgency === 'Segera';
  const badgeColor = isUrgent ? '#e24b4a' : '#8fd06a';
  const badgeLabel = isUrgent ? 'SEGERA' : 'NORMAL';
  ctx.font = '700 14px Arial, sans-serif';
  const badgeW = ctx.measureText(badgeLabel).width + 28;
  ctx.fillStyle = badgeColor;
  roundRect(ctx, W - 40 - badgeW, 140, badgeW, 30, 15);
  ctx.fill();
  ctx.fillStyle = '#0d0d0d';
  ctx.textAlign = 'center';
  ctx.fillText(badgeLabel, W - 40 - badgeW / 2, 160);
  ctx.textAlign = 'left';

  // Info fields
  let y = SHARE_FIELDS_START_Y;
  fields.forEach(([icon, label], i) => {
    ctx.fillStyle = '#8fc63d';
    ctx.font = '600 15px Arial, sans-serif';
    ctx.fillText(icon + ' ' + label.toUpperCase(), 40, y);
    y += SHARE_FIELD_LABEL_H;
    ctx.fillStyle = '#f0f0f0';
    ctx.font = '400 20px Arial, sans-serif';
    y = drawLines(ctx, fieldLines[i], 40, y, SHARE_FIELD_VALUE_LH) + SHARE_FIELD_GAP;
  });

  // Footer
  const footerLineY = y + SHARE_FOOTER_GAP;
  ctx.strokeStyle = '#2a2a2a';
  ctx.beginPath();
  ctx.moveTo(40, footerLineY);
  ctx.lineTo(W - 40, footerLineY);
  ctx.stroke();
  ctx.fillStyle = '#6b7280';
  ctx.font = '400 13px Arial, sans-serif';
  ctx.fillText('E Man Utama Group Sdn. Bhd. — Sistem Pengurusan EMUG', 40, footerLineY + SHARE_FOOTER_TEXT_GAP);

  // Native share button — only when the browser truly supports sharing files
  const nativeBtn = el('share-native-btn');
  if(nativeBtn) {
    let canShareFiles = false;
    if(navigator.share && navigator.canShare) {
      try {
        const probe = new File(['x'], 'probe.png', { type: 'image/png' });
        canShareFiles = navigator.canShare({ files: [probe] });
      } catch(e) { canShareFiles = false; }
    }
    nativeBtn.style.display = canShareFiles ? '' : 'none';
  }
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Word-wraps text into an array of lines that fit maxWidth (no drawing)
function wrapTextLines(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  words.forEach(word => {
    const test = line ? line + ' ' + word : word;
    if(ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if(line) lines.push(line);
  return lines;
}

// Draws pre-wrapped lines starting at (x,y); returns the y after the last line
function drawLines(ctx, lines, x, y, lineHeight) {
  lines.forEach(line => { ctx.fillText(line, x, y); y += lineHeight; });
  return y - lineHeight;
}

function downloadSharePng() {
  const cv = el('share-png-canvas');
  if(!cv || !shareComplaint) return;
  const link = document.createElement('a');
  link.download = 'emug-' + shareComplaint.ref + '.png';
  link.href = cv.toDataURL('image/png');
  link.click();
}

function nativeSharePng() {
  const cv = el('share-png-canvas');
  if(!cv || !shareComplaint) return;
  cv.toBlob(blob => {
    if(!blob) return;
    const file = new File([blob], 'emug-' + shareComplaint.ref + '.png', { type: 'image/png' });
    if(navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], title: 'EMUG — ' + shareComplaint.ref }).catch(() => {});
    }
  }, 'image/png');
}

// ─── SCHEDULE (FULL MONTH CALENDAR) ──────────────────────────────────────────
let schedYear, schedMonth;   // currently-viewed month (0-based month)
let opCalYear, opCalMonth;   // operator dashboard calendar state

function switchSchedView() { renderSchedule(); }   // legacy no-op safety

function goToday() {
  const d = new Date();
  schedYear = d.getFullYear(); schedMonth = d.getMonth();
  schedDate = d;
  renderSchedule();
}

async function schedShiftMonth(dir) {
  schedMonth += dir;
  if(schedMonth < 0)  { schedMonth = 11; schedYear--; }
  else if(schedMonth > 11) { schedMonth = 0; schedYear++; }
  await dbLoadWorkSchedule();   // re-fetch entries for the newly visible month
  renderMonthView();
}
function schedPrevMonth() { schedShiftMonth(-1); }
function schedNextMonth() { schedShiftMonth(1); }

// Click empty cell area → open Tambah Jadual prefilled with that date (admin only)
function addSchedOn(ds) {
  if(user?.role !== 'admin') return;
  const p = ds.split('-').map(Number);
  schedDate = new Date(p[0], p[1]-1, p[2]);   // tz-safe local date
  openSchedAddModal();
}

function renderSchedule() {
  const addBtn = el('sc-add-btn');
  if(addBtn) { addBtn.style.display = user?.role==='admin' ? '' : 'none'; addBtn.textContent = `+ ${t('addSchedule')}`; }
  if(schedYear == null || schedMonth == null) {
    schedYear = schedDate.getFullYear(); schedMonth = schedDate.getMonth();
  }
  renderMonthView();
}
function renderSchedContent() { renderMonthView(); }

function renderMonthView() {
  // header month name + day-of-week row
  const nm = el('sc-month-name');
  if(nm) nm.textContent = `${T[lang].monthNames[schedMonth].slice(0,3)} ${schedYear}`;
  const dowEl = el('sc-month-dow');
  if(dowEl) dowEl.innerHTML = T[lang].dayNamesShort.map(d=>`<div class="month-dow">${d}</div>`).join('');

  const pad = n => String(n).padStart(2,'0');
  const firstDow = new Date(schedYear, schedMonth, 1).getDay();
  const dim      = new Date(schedYear, schedMonth+1, 0).getDate();
  const prevDim  = new Date(schedYear, schedMonth, 0).getDate();
  const todayS   = new Date().toLocaleDateString('en-CA');

  // ── group all visible entries by date string ───────────────────────────────
  const byDate = {};

  // Every "+ Tambah Jadual" save now creates BOTH a work_schedule row and a
  // linked complaint (source:'manual', same date/time/staff/description) —
  // build a lookup so the redundant work_schedule chip is skipped wherever a
  // matching complaint chip (labelled with its real ref) will already render.
  // Legacy/orphaned work_schedule rows with no matching complaint (pre-dating
  // that change) still fall back to rendering via the schedule chip below.
  const manualComplaintKeys = new Set();
  complaints.forEach(c => {
    if(c.source==='manual') manualComplaintKeys.add(`${c.prefDate}|${c.prefTime}|${c.assignedTo||''}|${c.desc||''}`);
  });

  // 1) work_schedule entries (skip ones already represented by a linked complaint)
  myWorkSchedule().forEach(e => {
    const key = `${e.date}|${e.time}|${e.staffUsername||''}|${e.description||''}`;
    if(manualComplaintKeys.has(key)) return;
    (byDate[e.date] = byDate[e.date] || []).push({ ...e, _src:'schedule' });
  });
  // 2) complaint jobs — use schedDate or prefDate
  const visComplaint = user.role==='admin' ? complaints
    : complaints.filter(c=>c.assignedTo===user.username||c.acceptedBy===user.username);
  visComplaint.forEach(c=>{
    const d = c.schedDate||c.prefDate;
    if(!d) return;
    const p = d.split('-').map(Number);
    if(p[0]!==schedYear||p[1]-1!==schedMonth) return; // only current month
    (byDate[d]=byDate[d]||[]).push({ _src:'complaint', date:d, time:c.prefTime, description:c.problem, status:c.status, id:c.id, ref:c.ref });
  });

  const totalCells = Math.ceil((firstDow + dim) / 7) * 7;
  let html = '';
  for(let i=0;i<totalCells;i++) {
    const dayNum = i - firstDow + 1;
    let y=schedYear, m=schedMonth, dn=dayNum, other=false;
    if(dayNum < 1)        { other=true; m=schedMonth-1; if(m<0){m=11;y--;} dn=prevDim+dayNum; }
    else if(dayNum > dim) { other=true; m=schedMonth+1; if(m>11){m=0;y++;} dn=dayNum-dim; }
    const ds = `${y}-${pad(m+1)}-${pad(dn)}`;

    if(other) {
      html += `<div class="month-cell other"><div class="month-daynum">${dn}</div></div>`;
      continue;
    }

    const isToday = ds===todayS;
    const list = (byDate[ds] || []).slice().sort((a,b)=>(a.time||'').localeCompare(b.time||''));
    let chips = '';
    list.slice(0,2).forEach(e => {
      const cls = statusClass(e.status);
      const tm  = (e.time||'').slice(0,5);
      const lbl = (e.description||e.location||e.ref||'').trim();
      if(e._src==='schedule') {
        chips += `<div class="job-chip chip-${cls}" onclick="event.stopPropagation();openDaySummary('${ds}')" title="${tm} ${lbl}">`
              +  `<span class="jc-dot"></span><span class="jc-txt">${tm?tm+' ':''}${lbl}</span></div>`;
      } else { // complaint
        chips += `<div class="job-chip chip-${cls}" style="opacity:.85;cursor:pointer;" onclick="event.stopPropagation();openDaySummary('${ds}')" title="${e.ref}: ${lbl}">`
              +  `<span class="jc-dot"></span><span class="jc-txt">${tm?tm+' ':''}${e.ref}</span></div>`;
      }
    });
    const more = list.length>2 ? `<div class="month-more">+${list.length-2} ${lang==='bm'?'lagi':'more'}</div>` : '';

    html += `<div class="month-cell${isToday?' today':''}" onclick="onCalendarCellClick('${ds}',${list.length})">`
         +  `<div class="month-daynum">${dn}</div>${chips}${more}</div>`;
  }
  setHTML('sc-month-grid', html);
}

// Clicking a calendar cell (chip, "+X more", or empty space) opens the Day
// Summary popup when the day already has bookings; an empty day still opens
// "+ Tambah Jadual" prefilled with that date (admin only, per addSchedOn).
function onCalendarCellClick(ds, count) {
  if(count > 0) openDaySummary(ds);
  else addSchedOn(ds);
}

// All schedule + complaint entries for a single date, deduped the same way as
// renderMonthView (a manual job's work_schedule row is skipped when a linked
// complaint already represents it), sorted by time.
function getDayEntries(ds) {
  const manualComplaintKeys = new Set();
  complaints.forEach(c => {
    if(c.source==='manual') manualComplaintKeys.add(`${c.prefDate}|${c.prefTime}|${c.assignedTo||''}|${c.desc||''}`);
  });
  const entries = [];
  myWorkSchedule().forEach(e => {
    if(e.date !== ds) return;
    const key = `${e.date}|${e.time}|${e.staffUsername||''}|${e.description||''}`;
    if(manualComplaintKeys.has(key)) return;
    entries.push({ ...e, _src:'schedule' });
  });
  const visComplaint = user.role==='admin' ? complaints
    : complaints.filter(c=>c.assignedTo===user.username||c.acceptedBy===user.username);
  visComplaint.forEach(c=>{
    const d = c.schedDate||c.prefDate;
    if(d !== ds) return;
    entries.push({ _src:'complaint', date:d, time:c.prefTime, description:c.problem, status:c.status, id:c.id, ref:c.ref, name:c.name, address:c.address });
  });
  return entries.sort((a,b)=>(a.time||'').localeCompare(b.time||''));
}

let daySummaryDate = null;

function openDaySummary(ds) {
  daySummaryDate = ds;
  const d = new Date(ds + 'T00:00:00');
  const dayLabel = `${t('dayNames')[d.getDay()]}, ${d.getDate()} ${t('monthNames')[d.getMonth()]} ${d.getFullYear()}`;
  setTxt('dsm-title', `📋 ${t('dsmTitle')} — ${dayLabel}`);
  const entries = getDayEntries(ds);
  const body = el('dsm-body');
  if(body) {
    if(!entries.length) {
      body.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📋</div><p>${t('dsmEmpty')}</p></div>`;
    } else {
      body.innerHTML = entries.map(e => {
        const tm = (e.time||'').slice(0,5) || '—';
        if(e._src==='schedule') {
          const lbl = (e.description||e.location||'').trim();
          const staffLbl = e.staffName || t('dsmPool');
          return `<div class="dsm-item" onclick="closeModal('modal-day-summary');openSchedDetail('${e.id}')">
            <div class="dsm-item-top"><span class="dsm-time">${tm}</span>${statusBadge(e.status)}</div>
            <div class="dsm-item-label">${lbl}</div>
            <div class="dsm-item-sub">👷 ${staffLbl}</div>
          </div>`;
        }
        const canOpen = user.role==='admin';
        return `<div class="dsm-item" ${canOpen?`onclick="closeModal('modal-day-summary');openJobModal('${e.id}')"`:''} style="${canOpen?'':'cursor:default;'}">
          <div class="dsm-item-top"><span class="dsm-time">${tm}</span>${statusBadge(e.status)}</div>
          <div class="dsm-item-label">${e.ref}</div>
          <div class="dsm-item-sub">👤 ${e.name||'-'}${e.address?' · 📍 '+e.address:''}</div>
        </div>`;
      }).join('');
    }
  }
  openModal('modal-day-summary');
}

function addFromDaySummary() {
  if(!daySummaryDate) return;
  closeModal('modal-day-summary');
  const p = daySummaryDate.split('-').map(Number);
  schedDate = new Date(p[0], p[1]-1, p[2]);
  openSchedAddModal();
}

// ─── SCHEDULE ADD MODAL ───────────────────────────────────────────────────────
// Populates the sa-time <select> with the slot set for the given date
// (Friday special vs standard), re-selecting keepValue if it's still valid.
// Shared source of truth for every "Masa"/time-slot <select> in the system
// (customer booking, Tambah Jadual, Edit Aduan) — always derives options from
// bkSlotsFor() (Friday special vs standard) so nothing drifts out of sync.
// If keepValue is a legacy slot string no longer in today's slot set (e.g. an
// old booking made before slot times changed), it's kept as an extra selected
// option instead of being silently dropped/reset.
function populateTimeSelect(sel, dateStr, keepValue, placeholder) {
  if(!sel) return;
  const slots = dateStr ? bkSlotsFor(dateStr) : BK_SLOTS_STD;
  let opts = slots.map(s=>`<option value="${s}">${s.replace(' - ',' – ')}</option>`).join('');
  if(keepValue && slots.indexOf(keepValue)===-1) {
    opts += `<option value="${keepValue}">${keepValue.replace(' - ',' – ')} (${lang==='bm'?'lama':'legacy'})</option>`;
  }
  sel.innerHTML = `<option value="">${placeholder}</option>${opts}`;
  if(keepValue) sel.value = keepValue;
}

function populateSaTimeOptions(dateStr, keepValue) {
  populateTimeSelect(el('sa-time'), dateStr, keepValue, t('saTimePh'));
}

function onSaDateChange() {
  populateSaTimeOptions(el('sa-date').value, el('sa-time').value);
}

function populateMjTimeOptions(dateStr, keepValue) {
  populateTimeSelect(el('mj-edit-pref-time'), dateStr, keepValue, t('saTimePh'));
}

function onMjPrefDateChange() {
  populateMjTimeOptions(el('mj-edit-pref-date').value, el('mj-edit-pref-time').value);
}

// Direct-assign dropdown for Tambah Jadual — every Field Operator AND Team
// Leader (hardcoded USERS + Supabase dynamicStaff, deduped), each option
// labelled with its role so admin can free-pick across teams/leaders.
function buildSaStaffOptions() {
  const roleLbl = r => r==='team_leader' ? t('role_team_leader') : t('role_operator');
  const hard = USERS.filter(u=>u.role==='operator')
    .map(u=>({ username:u.username, name:u.name, role:u.role }));
  const dyn  = dynamicStaff.filter(u=>u.role==='operator'||u.role==='team_leader')
    .filter(u=>!hard.find(h=>h.username===u.username))
    .map(u=>({ username:u.username, name:u.name, role:u.role }));
  return [...hard, ...dyn]
    .map(u=>`<option value="${u.username}" data-name="${u.name}">${u.name} (${roleLbl(u.role)})</option>`).join('');
}

function openSchedAddModal() {
  schedEditId = null;
  el('sa-staff').innerHTML = `<option value="">-- ${t('staff')} --</option>${buildSaStaffOptions()}`;
  el('sa-date').value = schedDate.toLocaleDateString('en-CA');
  populateSaTimeOptions(el('sa-date').value);
  el('sa-addr').value = '';
  el('sa-desc').value = '';
  el('sa-name').value = '';
  el('sa-phone').value = '';
  el('sa-prob').value = '';
  el('sa-urgency').value = 'Normal';
  el('sa-new-fields-wrap').style.display = '';
  el('sa-bktype-wrap').style.display = '';
  el('sa-media-wrap').style.display = '';
  setTxt('sa-title', `🗓️ ${t('addSchedule')}`);
  setTxt('sa-cancel', t('cancel'));
  // Reset to Pool mode by default
  const poolR = document.querySelector('input[name="sa-assign-type"][value="pool"]');
  if(poolR) { poolR.checked = true; toggleAssignType(); }
  // Reset booking type, map pin, mileage box and media
  setSaBookingType('kerja');
  saAdminPinnedLat = null; saAdminPinnedLng = null;
  const saLocResult = el('sa-location-result'); if(saLocResult) { saLocResult.style.display='none'; saLocResult.innerHTML=''; }
  const saMapBtnTxt = el('sa-map-btn-txt'); if(saMapBtnTxt) saMapBtnTxt.textContent = lang==='bm'?'Pilih di Peta':'Choose on Map';
  const saMileBox = el('sa-mileage-box'); if(saMileBox) { saMileBox.style.display='none'; saMileBox.innerHTML=''; }
  saUploadedFiles = [];
  renderSaMediaPreviews();
  openModal('modal-sched-add');
}

function toggleAssignType() {
  const isDirect = document.querySelector('input[name="sa-assign-type"]:checked')?.value === 'direct';
  const wrap = el('sa-staff-wrap');
  if(wrap) wrap.style.display = isDirect ? '' : 'none';
}

async function saveSchedEntry() {
  const isPool = document.querySelector('input[name="sa-assign-type"]:checked')?.value !== 'direct';
  const staffSel = el('sa-staff');
  const staffUsername = isPool ? '' : (staffSel.value || '');
  const staffName     = isPool ? '' : (staffSel.options[staffSel.selectedIndex]?.dataset.name || '');
  // Read date as plain YYYY-MM-DD string — never pass through new Date() to avoid UTC shift
  const dateVal     = el('sa-date').value.slice(0,10);
  const time        = el('sa-time').value;
  const location    = el('sa-addr').value.trim();
  const description = el('sa-desc').value.trim();
  if(!dateVal||!time||!description) {
    toast(lang==='bm'?'Sila isi semua maklumat.':'Please fill in all fields.', 'error'); return;
  }
  if(!isPool && !staffUsername) {
    toast(lang==='bm'?'Sila pilih kakitangan untuk penugasan terus.':'Please select a staff member for direct assignment.', 'error'); return;
  }

  if(schedEditId) {
    // Edit existing lightweight schedule entry — staff/date/time/location/description only
    const existing = workSchedule.find(x=>x.id===schedEditId);
    if(!existing) return;
    const updUsername = isPool ? (existing.staffUsername || '') : staffUsername;
    const updName     = isPool ? (existing.staffName     || '') : staffName;
    const updated = { ...existing, staffUsername: updUsername, staffName: updName, date: dateVal, time, location, description };
    const ok = await dbUpdateWorkSchedule(updated);
    if(ok) {
      Object.assign(existing, updated);
      schedEditId = null;
      closeModal('modal-sched-add');
      toast(t('schedSaved'), 'success');
      renderSchedule();
    } else {
      toast(lang==='bm'?'Gagal mengemaskini jadual.':'Failed to update schedule.', 'error');
    }
    return;
  }

  // New entry — Problem Type is required; this becomes a full complaint
  // record (source:'manual') so it gets every feature a customer complaint has
  // (edit, gallery, status, share, delete) in the Complaint List.
  const problem = el('sa-prob').value;
  if(!problem) { toast(t('saNeedProb'), 'error'); return; }
  const urgency = el('sa-urgency').value || 'Normal';
  const name  = el('sa-name').value.trim();
  const phone = el('sa-phone').value.trim();

  // Slot availability / double-booking check — consistent with the customer flow
  if(isBkSlotFull(dateVal, time, problemTeam(problem))) {
    toast(t('bkFull'), 'error', 5000); return;
  }
  await refreshBkComplaints();
  if(isBkSlotFull(dateVal, time, problemTeam(problem))) {
    toast(t('bkJustBooked'), 'error', 6000); return;
  }

  const bookingType = el('sa-booking-type')?.value || 'kerja';
  const coords = (saAdminPinnedLat && saAdminPinnedLng) ? { lat: saAdminPinnedLat, lng: saAdminPinnedLng } : null;

  const year = new Date().getFullYear();
  const ref  = `EMUG-${year}-${String(refCounter).padStart(4,'0')}`;
  const c = {
    id: ref, ref,
    name, phone, address: location,
    problem, desc: description, urgency, bookingType, source: 'manual',
    prefDate: dateVal, prefTime: time,
    status: 'Menunggu',
    assignedTo:   isPool ? '' : staffUsername,
    assignedName: isPool ? '' : staffName,
    schedDate: '', adminNotes: '', techNotes: '',
    coords,
    mileageKm:     (bookingType==='site_visit' && saMileageKm!=null) ? saMileageKm : null,
    mileageCharge: (bookingType==='site_visit' && saMileageKm!=null) ? saMileageCharge : null,
    media: saUploadedFiles.slice(),
    submittedAt: new Date().toISOString(),
    updatedAt:   new Date().toISOString(),
  };

  const { error } = await db.from('complaints').insert([complaintToRow(c)]).select();
  if(error) {
    console.error('[EMUG] saveSchedEntry complaint insert error:', error.message, error);
    toast((lang==='bm'?'Gagal menyimpan aduan: ':'Failed to save: ') + error.message, 'error', 7000);
    return;
  }
  refCounter++;
  complaints.push(c);

  // Manual job record (jobs table) — links to the new real complaint ref so
  // the existing operator accept/pool/direct-assign workflow applies unchanged.
  const manualJobRow = {
    job_type:        'manual',
    job_title:       problem,
    job_date:        dateVal,
    job_time:        time,
    job_location:    location || null,
    job_description: description,
    created_by:      user.name,
    is_pool:         isPool,
    operator_id:     isPool ? null : staffUsername,
    operator_name:   isPool ? null : staffName,
    status:          'Menunggu',
    complaint_ref:   ref,
  };
  const savedJob = await dbInsertManualJob(manualJobRow);
  if(savedJob) manualJobs.unshift(savedJob);

  // Work-schedule calendar entry so it shows — and is clickable — on the calendar
  const entry = { staffUsername, staffName, date: dateVal, time, location, description, status:'Menunggu' };
  const saved = await dbInsertWorkSchedule(entry);
  if(saved) workSchedule.push(saved);

  // Notifications
  if(isPool) {
    addNotif('complaint',
      lang==='bm'?'Kerja Manual Baru (Pool)':'New Manual Job (Pool)',
      (lang==='bm'?'Kerja baru tersedia: ':'New job available: ') + description,
      'operator');
  } else {
    addNotif('assign',
      lang==='bm'?'Kerja Manual Ditugaskan':'Manual Job Assigned',
      description + ' → ' + staffName,
      'operator', staffUsername);
    addNotif('assign',
      lang==='bm'?'Kerja Manual Dibuat':'Manual Job Created',
      staffName + ': ' + description,
      'admin');
  }

  closeModal('modal-sched-add');
  toast(t('schedSaved'), 'success');
  renderSchedule();
  if(page==='complaints') renderComplaintsList();
}

// ─── SCHEDULE DETAIL / EDIT / DELETE ─────────────────────────────────────────
function openSchedDetail(id) {
  const e = workSchedule.find(x=>x.id===id);
  if(!e) return;
  schedDetailId = id;
  setHTML('sd-body', `
    <div style="display:grid;gap:12px;padding:4px 0;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span style="background:var(--navy);color:var(--white);font-size:.78rem;font-weight:700;padding:3px 12px;border-radius:10px;">${(e.time||'').slice(0,5)||'—'}</span>
        ${statusBadge(e.status)}
      </div>
      <div style="background:var(--gray-50);border-radius:var(--r);padding:14px;display:grid;gap:10px;font-size:.88rem;">
        <div><div style="font-size:.74rem;color:var(--gray-500);margin-bottom:2px;">👷 ${lang==='bm'?'Kakitangan':'Staff'}</div><strong>${e.staffName || (lang==='bm'?'Pool (Semua Kakitangan)':'Pool (All Staff)')}</strong></div>
        <div><div style="font-size:.74rem;color:var(--gray-500);margin-bottom:2px;">📅 ${lang==='bm'?'Tarikh':'Date'}</div><strong>${fmtDate(e.date)}</strong></div>
        <div><div style="font-size:.74rem;color:var(--gray-500);margin-bottom:2px;">📍 ${lang==='bm'?'Lokasi':'Location'}</div><strong>${e.location}</strong></div>
        <div><div style="font-size:.74rem;color:var(--gray-500);margin-bottom:2px;">🔧 ${lang==='bm'?'Penerangan':'Description'}</div><span>${e.description}</span></div>
      </div>
    </div>`);
  const isAdmin = user?.role==='admin';
  el('sd-edit').style.display   = isAdmin ? '' : 'none';
  el('sd-delete').style.display = isAdmin ? '' : 'none';
  openModal('modal-sched-detail');
}

function editSchedEntry() {
  const e = workSchedule.find(x=>x.id===schedDetailId);
  if(!e) return;
  closeModal('modal-sched-detail');
  schedEditId = schedDetailId;
  el('sa-staff').innerHTML = `<option value="">-- ${t('staff')} --</option>${buildSaStaffOptions()}`;
  el('sa-staff').value   = e.staffUsername || '';
  el('sa-date').value    = e.date;
  populateSaTimeOptions(e.date, e.time);
  el('sa-addr').value    = e.location;
  el('sa-desc').value    = e.description;
  // This lightweight schedule entry has no linked complaint fields to edit here —
  // problem type / priority / customer details are only captured when creating new.
  el('sa-new-fields-wrap').style.display = 'none';
  el('sa-bktype-wrap').style.display = 'none';
  el('sa-media-wrap').style.display = 'none';
  const isDirect = !!e.staffUsername;
  const radio = document.querySelector(`input[name="sa-assign-type"][value="${isDirect?'direct':'pool'}"]`);
  if(radio) radio.checked = true;
  toggleAssignType();
  setTxt('sa-title', `✏️ ${lang==='bm'?'Edit Jadual':'Edit Schedule'}`);
  setTxt('sa-cancel', t('cancel'));
  openModal('modal-sched-add');
}

async function deleteSchedEntry() {
  const e = workSchedule.find(x=>x.id===schedDetailId);
  if(!e) return;
  const staffLbl = e.staffName || (lang==='bm'?'Pool (Semua Kakitangan)':'Pool (All Staff)');
  const msg = lang==='bm'
    ? `Padam jadual untuk ${staffLbl} pada ${fmtDateShort(e.date)}?`
    : `Delete schedule for ${staffLbl} on ${fmtDateShort(e.date)}?`;
  if(!confirm(msg)) return;
  const ok = await dbDeleteWorkSchedule(schedDetailId);
  if(ok) {
    workSchedule = workSchedule.filter(x=>x.id!==schedDetailId);
    closeModal('modal-sched-detail');
    toast(lang==='bm'?'Jadual dipadam.':'Schedule deleted.', 'success');
    renderSchedule();
  } else {
    toast(lang==='bm'?'Gagal memadam jadual.':'Failed to delete schedule.', 'error');
  }
}

// ─── STAFF ────────────────────────────────────────────────────────────────────
function getHiddenStaff() {
  try { return JSON.parse(localStorage.getItem('emug_hidden_staff')||'[]'); } catch{ return []; }
}
function saveHiddenStaff(arr) {
  localStorage.setItem('emug_hidden_staff', JSON.stringify(arr));
}

function toggleStaffDeleteMode() {
  staffDeleteMode = !staffDeleteMode;
  renderStaff();
}

function toggleAsfTeamWrap() {
  const wrap = el('asf-team-wrap');
  if(wrap) wrap.style.display = el('asf-role')?.value==='team_leader' ? '' : 'none';
}

function openAddStaffModal() {
  ['asf-name','asf-username','asf-password','asf-phone'].forEach(id=>{ const e=el(id); if(e) e.value=''; });
  el('asf-role').value = 'operator';
  const teamSel = el('asf-team'); if(teamSel) teamSel.value = '';
  toggleAsfTeamWrap();
  openModal('modal-add-staff');
}

async function saveNewStaff() {
  const name     = (el('asf-name')?.value||'').trim().toUpperCase();
  const username = (el('asf-username')?.value||'').trim().toLowerCase();
  const password = (el('asf-password')?.value||'').trim();
  const phone    = (el('asf-phone')?.value||'').trim();
  const role     = el('asf-role')?.value || 'operator';
  const teamKey  = role==='team_leader' ? (el('asf-team')?.value||'') : '';

  if(!name||!username||!password) {
    toast(lang==='bm'?'Sila isi Nama, Username dan Kata Laluan.':'Please fill in Name, Username and Password.','error'); return;
  }
  if(password.length < 6) {
    toast(lang==='bm'?'Kata laluan mesti sekurang-kurangnya 6 aksara.':'Password must be at least 6 characters.','error'); return;
  }
  if(role==='team_leader' && !teamKey) {
    toast(lang==='bm'?'Sila pilih Team untuk Team Leader.':'Please select a Team for the Team Leader.','error'); return;
  }
  // Check for duplicate username across USERS and dynamicStaff
  const allUsernames = [...USERS.map(u=>u.username), ...dynamicStaff.map(u=>u.username)];
  if(allUsernames.includes(username)) {
    toast(lang==='bm'?'Username sudah digunakan. Sila pilih username lain.':'Username already taken. Please choose another.','error'); return;
  }

  const rolePrefix = role==='admin' ? 'ADM' : role==='team_leader' ? 'TL' : 'OPR';
  const staffIdNum = String(dynamicStaff.filter(s=>s.role===role).length + USERS.filter(u=>u.role===role).length + 1).padStart(3,'0');
  const staffId    = rolePrefix + staffIdNum;

  const btn = document.querySelector('#modal-add-staff .btn-lime');
  if(btn) { btn.disabled=true; btn.textContent='⏳ Menyimpan...'; }

  const saved = await dbInsertStaff({ name, username, email: null, password, phone, role, staffId, teamKey: teamKey||null });

  if(btn) { btn.disabled=false; btn.innerHTML='💾 Simpan Kakitangan'; }

  if(!saved) {
    toast(lang==='bm'?'Gagal menyimpan. Semak konsol untuk butiran.':'Failed to save. Check console for details.','error'); return;
  }

  dynamicStaff.push(saved);
  closeModal('modal-add-staff');
  toast(lang==='bm'?'Kakitangan baru berjaya ditambah! 🎉':'New staff member added successfully! 🎉','success',4000);
  renderStaff();
}

let editStaffId = null;

function toggleEsfTeamWrap() {
  const wrap = el('esf-team-wrap');
  if(wrap) wrap.style.display = el('esf-role')?.value==='team_leader' ? '' : 'none';
}

// Only Supabase-backed (dynamic) staff can be edited here — hardcoded USERS
// (defined directly in app.js) have no DB row to update.
function openEditStaffModal(username) {
  const su = dynamicStaff.find(u=>u.username===username);
  if(!su) { toast(t('editStaffHardcoded'), 'error'); return; }
  editStaffId = su.id;
  el('esf-name').value     = su.name || '';
  el('esf-username').value = su.username || '';
  el('esf-password').value = '';
  el('esf-phone').value    = su.phone || '';
  el('esf-role').value     = su.role || 'operator';
  const teamSel = el('esf-team'); if(teamSel) teamSel.value = su.team_key || '';
  toggleEsfTeamWrap();
  openModal('modal-edit-staff');
}

async function saveEditStaff() {
  if(!editStaffId) return;
  const name     = (el('esf-name')?.value||'').trim().toUpperCase();
  const username = (el('esf-username')?.value||'').trim().toLowerCase();
  const password = (el('esf-password')?.value||'').trim();
  const phone    = (el('esf-phone')?.value||'').trim();
  const role     = el('esf-role')?.value || 'operator';
  const teamKey  = role==='team_leader' ? (el('esf-team')?.value||'') : '';

  if(!name||!username) {
    toast(lang==='bm'?'Sila isi Nama dan Username.':'Please fill in Name and Username.','error'); return;
  }
  if(password && password.length < 6) {
    toast(lang==='bm'?'Kata laluan mesti sekurang-kurangnya 6 aksara.':'Password must be at least 6 characters.','error'); return;
  }
  if(role==='team_leader' && !teamKey) {
    toast(lang==='bm'?'Sila pilih Team untuk Team Leader.':'Please select a Team for the Team Leader.','error'); return;
  }
  // Duplicate-username check, excluding this staff member's own current username
  const allUsernames = [...USERS.map(u=>u.username), ...dynamicStaff.filter(u=>u.id!==editStaffId).map(u=>u.username)];
  if(allUsernames.includes(username)) {
    toast(lang==='bm'?'Username sudah digunakan. Sila pilih username lain.':'Username already taken. Please choose another.','error'); return;
  }

  const btn = el('esf-save');
  if(btn) { btn.disabled=true; btn.textContent='⏳ Menyimpan...'; }

  const fields = { name, username, phone: phone||null, role, teamKey: teamKey||null };
  if(password) fields.password = password;
  const ok = await dbUpdateStaff(editStaffId, fields);

  if(btn) { btn.disabled=false; btn.innerHTML='💾 Simpan Perubahan'; }

  if(!ok) {
    toast(lang==='bm'?'Gagal menyimpan. Semak konsol untuk butiran.':'Failed to save. Check console for details.','error'); return;
  }

  const su = dynamicStaff.find(u=>u.id===editStaffId);
  if(su) { su.name=name; su.username=username; su.phone=phone||null; su.role=role; su.team_key=teamKey||null; }

  closeModal('modal-edit-staff');
  toast(t('editStaffSaved'), 'success');
  renderStaff();
}

function confirmDeleteStaff(username, isDynamic) {
  const su = isDynamic
    ? dynamicStaff.find(u=>u.username===username)
    : USERS.find(u=>u.username===username);
  if(!su) return;
  const name = su.name;
  const sid  = su.staff_id || su.staffId || '';
  const msgEl = el('sfdel-msg');
  const btnEl = el('sfdel-confirm');
  if(msgEl) msgEl.textContent = lang==='bm'
    ? `Padam kakitangan ini? Tindakan ini tidak boleh dibuat alik.\n\n${name}${sid?' ('+sid+')':''}`
    : `Remove this staff member? This action cannot be undone.\n\n${name}${sid?' ('+sid+')':''}`;
  if(btnEl) {
    const newBtn = btnEl.cloneNode(true);
    newBtn.onclick = () => deleteStaff(username, isDynamic, su.id);
    btnEl.parentNode.replaceChild(newBtn, btnEl);
  }
  openModal('modal-staff-del');
}

async function deleteStaff(username, isDynamic, dbId) {
  const confirmBtn = el('sfdel-confirm');
  if(isDynamic) {
    // Dynamic staff → delete from Supabase staff table
    if(confirmBtn) { confirmBtn.disabled=true; confirmBtn.textContent='⏳ Memadam...'; }
    const ok = await dbDeleteDynamicStaff(dbId);
    if(confirmBtn) { confirmBtn.disabled=false; confirmBtn.innerHTML='✓ Padam'; }
    if(!ok) {
      toast(lang==='bm'?'Gagal memadam. Cuba lagi.':'Delete failed. Try again.','error'); return;
    }
    dynamicStaff = dynamicStaff.filter(u=>u.id!==dbId);
  } else {
    // Hardcoded USERS → hide via localStorage (cannot delete from source code at runtime)
    const hidden = getHiddenStaff();
    if(!hidden.includes(username)) { hidden.push(username); saveHiddenStaff(hidden); }
  }
  closeModal('modal-staff-del');
  staffDeleteMode = false;
  toast(lang==='bm'?'Kakitangan berjaya dipadam.':'Staff member removed successfully.','success');
  renderStaff();
}

function renderStaff() {
  // Combine hardcoded USERS (minus any hidden) + Supabase dynamicStaff
  const hidden    = getHiddenStaff();
  const hardcoded = USERS.filter(u=>!hidden.includes(u.username))
                         .map(u=>({ ...u, _source:'hardcoded', staffId: u.staffId, staff_id: u.staffId }));
  const dynamic   = dynamicStaff.map(u=>({ ...u, _source:'dynamic', staffId: u.staff_id||'', username: u.username, name: u.name, role: u.role, email: u.email, phone: u.phone }));
  const slist     = [...hardcoded, ...dynamic];
  const isAdmin   = user.role==='admin';

  const addBtn = isAdmin ? `
    <button class="btn btn-lime btn-sm sf-action-btn" onclick="openAddStaffModal()"
      style="display:inline-flex;align-items:center;gap:6px;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
      ${lang==='bm'?'Tambah Kakitangan':'Add Staff'}
    </button>` : '';

  const removeBtn = isAdmin ? `
    <button class="btn sf-action-btn sf-remove-btn${staffDeleteMode?' active':''}"
      onclick="toggleStaffDeleteMode()"
      style="display:inline-flex;align-items:center;gap:6px;background:${staffDeleteMode?'#e24b4a':'#3a1f24'};color:${staffDeleteMode?'#fff':'#ff7a7a'};border:1px solid #e24b4a;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
      ${staffDeleteMode?(lang==='bm'?'Batal Padam':'Cancel Remove'):(lang==='bm'?'Buang Kakitangan':'Remove Staff')}
    </button>` : '';

  const btnRow = isAdmin ? `<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px;">${addBtn}${removeBtn}</div>` : '';

  const roleColors = { admin:'#1a237e', operator:'#2e7d32', team_leader:'#b45309', staff:'#0277bd' };
  const roleLabels = { admin: lang==='bm'?'Pentadbir':'Admin', operator: lang==='bm'?'Operator':'Operator', team_leader: t('role_team_leader'), staff: lang==='bm'?'Kakitangan':'Staff' };

  const cardHTML = slist.map(su=>{
    const assigned  = complaints.filter(c=>c.assignedTo===su.username);
    const accepted  = complaints.filter(c=>c.acceptedBy===su.username);
    const allJobIds = new Set([...assigned.map(c=>c.id), ...accepted.map(c=>c.id)]);
    const allJobs   = complaints.filter(c=>allJobIds.has(c.id));
    const active    = allJobs.filter(c=>c.status==='Sedang Berjalan').length;
    const done      = allJobs.filter(c=>c.status==='Selesai').length;
    const total     = allJobs.length;
    const rColor    = roleColors[su.role]||'#666';
    const rLabel    = roleLabels[su.role]||su.role;
    const recentJobs = allJobs.slice(-3).reverse();
    const isDynamic = su._source === 'dynamic';

    // All cards show trash in delete mode; isDynamic controls whether we hit Supabase or localStorage
    const trashOverlay = (isAdmin && staffDeleteMode) ? `
      <button class="sf-trash-btn" onclick="event.stopPropagation();confirmDeleteStaff('${su.username}',${isDynamic})" title="${lang==='bm'?'Padam kakitangan ini':'Remove this staff member'}"
        style="position:absolute;top:10px;right:10px;z-index:20;width:34px;height:34px;border-radius:8px;background:#e24b4a;color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(226,75,74,.5);pointer-events:all;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
      </button>` : '';

    const systemBadge = !isDynamic ? `<span style="font-size:.6rem;background:rgba(255,255,255,.15);color:rgba(255,255,255,.7);border-radius:8px;padding:1px 6px;margin-left:4px;font-weight:600;">SISTEM</span>` : '';

    return `<div class="card sf-card${staffDeleteMode?' sf-delmode':''}" style="margin:0;position:relative;overflow:visible;">
      ${trashOverlay}
      <div style="background:linear-gradient(135deg,var(--navy),var(--navy-light));padding:18px 20px;color:white;display:flex;align-items:center;gap:14px;">
        <div style="width:52px;height:52px;background:var(--lime);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;font-weight:800;color:var(--navy);border:3px solid rgba(255,255,255,.25);flex-shrink:0;">
          ${iniOf(su.name)}
        </div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:.92rem;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${su.name}${systemBadge}</div>
          <div style="font-size:.7rem;opacity:.7;margin-bottom:5px;">ID: ${su.staffId||su.staff_id||'—'}</div>
          <span style="font-size:.68rem;background:${rColor};color:#fff;border-radius:10px;padding:2px 9px;font-weight:700;">${rLabel}</span>
          ${su.role==='team_leader'&&su.team_key?`<span style="font-size:.68rem;background:rgba(255,255,255,.2);color:#fff;border-radius:10px;padding:2px 9px;font-weight:700;margin-left:4px;">${TEAM_NAMES[su.team_key]||su.team_key}</span>`:''}
        </div>
      </div>
      <div class="stripe equal"><div class="s-lime"></div><div class="s-navy"></div></div>
      <div class="card-body">
        <div style="font-size:.78rem;color:var(--gray-500);margin-bottom:10px;">
          ${su.email?`📧 ${su.email}`:''}${su.phone&&su.email?' · ':''}${su.phone?`📞 ${su.phone}`:''}
        </div>
        ${(isAdmin&&isDynamic)?`<button class="btn btn-sm btn-outline" style="margin-bottom:12px;width:100%;" onclick="openEditStaffModal('${su.username}')">✏️ ${t('editStaffBtn')}</button>`:''}
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;text-align:center;margin-bottom:14px;">
          <div style="padding:8px 4px;background:var(--gray-50);border-radius:var(--r);">
            <div style="font-size:1.3rem;font-weight:900;color:var(--navy);">${total}</div>
            <div style="font-size:.65rem;color:var(--gray-500);">${lang==='bm'?'Jumlah':'Total'}</div>
          </div>
          <div style="padding:8px 4px;background:var(--info-lt);border-radius:var(--r);">
            <div style="font-size:1.3rem;font-weight:900;color:var(--info);">${active}</div>
            <div style="font-size:.65rem;color:var(--gray-500);">${lang==='bm'?'Aktif':'Active'}</div>
          </div>
          <div style="padding:8px 4px;background:var(--success-lt);border-radius:var(--r);">
            <div style="font-size:1.3rem;font-weight:900;color:var(--success);">${done}</div>
            <div style="font-size:.65rem;color:var(--gray-500);">${t('completed')}</div>
          </div>
        </div>
        ${recentJobs.map(c=>`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid var(--gray-100);font-size:.78rem;">
            <span style="color:var(--gray-600);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:55%;">${c.ref}</span>
            ${statusBadge(c.status)}
          </div>`).join('')||`<div class="text-muted text-sm">${t('noJobs')}</div>`}
      </div>
    </div>`;
  }).join('');

  setHTML('sf-content', btnRow + (slist.length
    ? `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;">${cardHTML}</div>`
    : `<div class="empty-state"><div class="empty-state-icon">👷</div><p>${lang==='bm'?'Tiada kakitangan berdaftar.':'No staff registered.'}</p></div>`));
}

// ─── REPORTS ──────────────────────────────────────────────────────────────────
function renderReports() {
  const all   = complaints;
  const pend  = all.filter(c=>c.status==='Menunggu').length;
  const prog  = all.filter(c=>c.status==='Sedang Berjalan').length;
  const done  = all.filter(c=>c.status==='Selesai').length;
  const urgent= all.filter(c=>c.urgency==='Segera').length;
  const staffCount = USERS.filter(u=>u.role==='staff'||u.role==='operator').length;
  setHTML('rp-stats',`
    <div class="stat-card c-navy" style="cursor:pointer;" onclick="handleRpStatCard('all')" title="${lang==='bm'?'Klik untuk lihat senarai':'Click to view list'}"><div class="stat-icon">📋</div><div class="stat-value">${all.length}</div><div class="stat-label">${t('totalJobs')}</div></div>
    <div class="stat-card c-warn" style="cursor:pointer;" onclick="handleRpStatCard('Menunggu')" title="${lang==='bm'?'Klik untuk lihat senarai':'Click to view list'}"><div class="stat-icon">⏳</div><div class="stat-value">${pend}</div><div class="stat-label">${t('pending')}</div></div>
    <div class="stat-card c-info" style="cursor:pointer;" onclick="handleRpStatCard('Sedang Berjalan')" title="${lang==='bm'?'Klik untuk lihat senarai':'Click to view list'}"><div class="stat-icon">🔄</div><div class="stat-value">${prog}</div><div class="stat-label">${t('inProgress')}</div></div>
    <div class="stat-card c-success" style="cursor:pointer;" onclick="handleRpStatCard('Selesai')" title="${lang==='bm'?'Klik untuk lihat senarai':'Click to view list'}"><div class="stat-icon">✅</div><div class="stat-value">${done}</div><div class="stat-label">${t('completed')}</div></div>
    <div class="stat-card c-danger" style="cursor:pointer;" onclick="handleRpStatCard('urgent')" title="${lang==='bm'?'Klik untuk lihat senarai':'Click to view list'}"><div class="stat-icon">🚨</div><div class="stat-value">${urgent}</div><div class="stat-label">${lang==='bm'?'Segera':'Urgent'}</div></div>
    <div class="stat-card c-lime" style="cursor:pointer;" onclick="handleRpStatCard('staff')" title="${lang==='bm'?'Klik untuk lihat senarai':'Click to view list'}"><div class="stat-icon">👷</div><div class="stat-value">${staffCount}</div><div class="stat-label">${t('totalStaff')}</div></div>`);

  const mx1 = Math.max(pend,prog,done,1);
  const barStyle = 'cursor:pointer;border-radius:6px;transition:background .15s;';
  setHTML('rp-status-chart',`
    <div class="bar-chart-item rp-bar-click" style="${barStyle}" onclick="handleReportBarClick('Menunggu')" title="${lang==='bm'?'Klik untuk lihat senarai':'Click to view list'}"><div class="bar-chart-label"><span>⏳ ${t('pending')}</span><span>${pend}</span></div><div class="bar-track"><div class="bar-fill warning" style="width:${(pend/mx1*100).toFixed(0)}%"></div></div></div>
    <div class="bar-chart-item rp-bar-click" style="${barStyle}" onclick="handleReportBarClick('Sedang Berjalan')" title="${lang==='bm'?'Klik untuk lihat senarai':'Click to view list'}"><div class="bar-chart-label"><span>🔄 ${t('inProgress')}</span><span>${prog}</span></div><div class="bar-track"><div class="bar-fill navy" style="width:${(prog/mx1*100).toFixed(0)}%"></div></div></div>
    <div class="bar-chart-item rp-bar-click" style="${barStyle}" onclick="handleReportBarClick('Selesai')" title="${lang==='bm'?'Klik untuk lihat senarai':'Click to view list'}"><div class="bar-chart-label"><span>✅ ${t('completed')}</span><span>${done}</span></div><div class="bar-track"><div class="bar-fill success" style="width:${(done/mx1*100).toFixed(0)}%"></div></div></div>`);

  const pc = {}; all.forEach(c=>{ pc[c.problem]=(pc[c.problem]||0)+1; });
  const mx2 = Math.max(...Object.values(pc),1);
  const cols = ['navy','lime','warning','success','info'];
  setHTML('rp-type-chart', Object.entries(pc).sort((a,b)=>b[1]-a[1]).map(([k,v],i)=>`
    <div class="bar-chart-item rp-bar-click" style="${barStyle}" onclick="handleReportTypeClick(this)" data-prob="${k.replace(/"/g,'&quot;').replace(/'/g,'&#39;')}" title="${lang==='bm'?'Klik untuk lihat senarai':'Click to view list'}"><div class="bar-chart-label"><span>${k}</span><span>${v}</span></div><div class="bar-track"><div class="bar-fill ${cols[i%cols.length]}" style="width:${(v/mx2*100).toFixed(0)}%"></div></div></div>`).join(''));

  setHTML('rp-tbody', all.map(c=>`<tr style="cursor:pointer;" onclick="handleRpRowClick('${c.id}')" title="${lang==='bm'?'Klik untuk butiran':'Click for details'}">
    <td style="font-weight:700;font-size:.8rem;color:var(--navy);">${c.ref}</td>
    <td>${c.name}</td>
    <td style="font-size:.82rem;">${c.problem}</td>
    <td>${c.assignedName||'<span class="text-muted">—</span>'}</td>
    <td style="font-size:.82rem;white-space:nowrap;">${fmtDateShort(c.prefDate)}</td>
    <td>${statusBadge(c.status)}</td>
  </tr>`).join(''));
}

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
function notifClick(id) {
  const n = notifs.find(x=>x.id===id);
  if(!n) return;
  n.read = true;
  renderNotifBadge(); renderNotifDD(); buildSidebar();
  closeNotifDD();
  // Smart navigation based on notification type and content
  const titleLower = (n.title||'').toLowerCase();
  const isManual   = titleLower.includes('manual');
  if(isManual) {
    navigate('schedule');
  } else if(n.type==='complaint'||n.type==='assign'||n.type==='status') {
    navigate('complaints');
  } else {
    navigate('notifications');
  }
}

function renderNotifications() {
  const ns = myNotifs();
  const icon = {complaint:'📋',assign:'🔧',status:'🔄'};
  setHTML('all-notif-list', ns.length ? ns.map(n=>`
    <div class="notif-item ${n.read?'read':'unread'}">
      <div class="notif-dot"></div>
      <div style="flex:1;min-width:0;cursor:pointer;" onclick="notifClick(${n.id})">
        <div style="font-weight:${n.read?500:700};font-size:.9rem;">${icon[n.type]||'🔔'} ${n.title}</div>
        <div class="notif-text">${n.msg}</div>
        <div class="notif-time">🕐 ${fmtTimeAgo(n.time)}</div>
      </div>
      ${n.cid?`<button type="button" class="notif-share-btn" title="${t('shareInfo')}" onclick="event.stopPropagation();openShareModal('${n.cid}')">📤</button>`:''}
    </div>`).join('')
    : `<div class="empty-state"><div class="empty-state-icon">🔔</div><p>${t('noNotifs')}</p></div>`);
  renderNotifBadge();
}

function renderNotifDD() {
  const ns = myNotifs().slice(0,8);
  const icon = {complaint:'📋',assign:'🔧',status:'🔄'};
  setHTML('notif-dd-list', ns.length ? ns.map(n=>`
    <div class="notif-item ${n.read?'read':'unread'}">
      <div class="notif-dot"></div>
      <div style="flex:1;min-width:0;cursor:pointer;" onclick="notifClick(${n.id})">
        <div class="notif-text" style="font-weight:${n.read?400:600};">${icon[n.type]||'🔔'} ${n.title}</div>
        <div class="notif-text">${n.msg}</div>
        <div class="notif-time">${fmtTimeAgo(n.time)}</div>
      </div>
      ${n.cid?`<button type="button" class="notif-share-btn" title="${t('shareInfo')}" onclick="event.stopPropagation();openShareModal('${n.cid}')">📤</button>`:''}
    </div>`).join('')
    : `<div style="padding:20px;text-align:center;color:var(--gray-400);font-size:.85rem;">${t('noNotifs')}</div>`);
}

function renderNotifBadge() {
  const count = myNotifs().filter(n=>!n.read).length;
  const badge = el('notif-badge');
  if(badge) { badge.textContent=count; badge.style.display=count?'flex':'none'; }
}

function markRead(id) {
  const n = notifs.find(x=>x.id===id); if(n) n.read=true;
  renderNotifBadge(); renderNotifDD();
}

function markAllRead() {
  myNotifs().forEach(n=>n.read=true);
  renderNotifBadge(); renderNotifDD();
  if(page==='notifications') renderNotifications();
  buildSidebar();
  toast(t('markAllRead'),'info');
}

function toggleNotifDD() {
  closeUserDD();
  notifOpen=!notifOpen;
  el('notif-dd').classList.toggle('open', notifOpen);
  if(notifOpen) renderNotifDD();
}

function toggleUserDD() {
  closeNotifDD();
  userDDOpen=!userDDOpen;
  el('user-dd').classList.toggle('open', userDDOpen);
}

function closeNotifDD() { notifOpen=false; el('notif-dd')?.classList.remove('open'); }
function closeUserDD()  { userDDOpen=false; el('user-dd')?.classList.remove('open'); }
function closeAllDDs()  { closeNotifDD(); closeUserDD(); }

document.addEventListener('click', e=>{
  if(!e.target.closest('.notif-wrap')) closeNotifDD();
  if(!e.target.closest('.user-wrap'))  closeUserDD();
});

function addNotif(type, title, msg, forRole, forUser, cid) {
  notifs.unshift({ id:notifCounter++, type, title, msg, time:0, read:false, forRole, forUser:forUser||null, cid:cid||null });
  renderNotifBadge();
  buildSidebar();
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
function renderProfile() {
  if(!user) return;
  setHTML('pr-content',`
    <div style="display:flex;align-items:center;gap:20px;margin-bottom:24px;flex-wrap:wrap;">
      <div style="width:80px;height:80px;background:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:900;color:white;border:4px solid var(--lime);">
        ${iniOf(user.name)}
      </div>
      <div>
        <div style="font-size:1.2rem;font-weight:800;color:var(--navy);">${user.name}</div>
        <span class="badge ${user.role==='admin'?'badge-admin':user.role==='operator'?'badge-operator':'badge-staff'}" style="margin-top:6px;display:inline-flex;">
          ${user.role==='admin'?t('role_admin'):user.role==='operator'?t('role_operator'):user.role==='team_leader'?t('role_team_leader'):t('role_staff')}
        </span>
        ${user.staffId?`<div class="text-muted text-sm mt-1">ID: ${user.staffId}</div>`:''}
      </div>
    </div>
    <div style="display:grid;gap:12px;font-size:.92rem;">
      <div style="display:flex;gap:10px;"><span class="text-muted" style="min-width:100px;">📞 ${lang==='bm'?'Telefon':'Phone'}:</span><strong>${user.phone||'—'}</strong></div>
      <div style="display:flex;gap:10px;"><span class="text-muted" style="min-width:100px;">📧 Email:</span><strong>${user.email||'—'}</strong></div>
      <div style="display:flex;gap:10px;"><span class="text-muted" style="min-width:100px;">👤 Username:</span><strong>${user.username}</strong></div>
    </div>
    <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--gray-200);">
      <button class="btn btn-danger btn-sm" onclick="doLogout()">🚪 ${t('logout')}</button>
    </div>`);
}

// ─── MODAL HELPERS ────────────────────────────────────────────────────────────
function openModal(id)  { el(id)?.classList.add('open'); document.body.style.overflow='hidden'; }
function closeModal(id) { el(id)?.classList.remove('open'); document.body.style.overflow=''; }

document.querySelectorAll('.modal-overlay').forEach(ov=>{
  ov.addEventListener('click', e=>{ if(e.target===ov) closeModal(ov.id); });
});

// ─── PWA ──────────────────────────────────────────────────────────────────────

// --- MEDIA UPLOAD ---
function handleMediaUpload(input) {
  const files = Array.from(input.files);
  if(!files.length) return;
  const remaining = 5 - uploadedFiles.length;
  if(remaining <= 0) { toast(lang==='bm'?'Had maksimum 5 fail dicapai.':'Maximum 5 files reached.','error'); return; }
  const toRead = files.slice(0, remaining);
  let loaded = 0;
  toRead.forEach(file => {
    if(file.size > 10*1024*1024) { toast((lang==='bm'?'Fail terlalu besar: ':'File too large: ')+file.name,'error'); loaded++; if(loaded===toRead.length) renderMediaPreviews(); return; }
    const reader = new FileReader();
    reader.onload = e => {
      uploadedFiles.push({ name:file.name, type:file.type, src:e.target.result });
      loaded++;
      if(loaded===toRead.length) renderMediaPreviews();
    };
    reader.readAsDataURL(file);
  });
  input.value = '';
}

function clearMedia(e) {
  if(e) e.stopPropagation();
  uploadedFiles = [];
  renderMediaPreviews();
}

function removeMediaFile(idx) {
  uploadedFiles.splice(idx, 1);
  renderMediaPreviews();
}

function renderMediaPreviews() {
  const grid = el('media-preview-grid');
  const bar  = el('media-count-bar');
  if(!grid) return;
  if(!uploadedFiles.length) {
    grid.innerHTML = '';
    if(bar) bar.style.display = 'none';
    return;
  }
  if(bar) { bar.style.display='flex'; bar.querySelector('span').textContent = uploadedFiles.length+'/5'; }
  grid.innerHTML = uploadedFiles.map((f,i)=>{
    const isImg = f.type.startsWith('image/');
    const isVid = f.type.startsWith('video/');
    const thumb = isImg
      ? '<img src="'+f.src+'" style="width:100%;height:64px;object-fit:cover;border-radius:6px;">'
      : isVid
        ? '<div style="width:100%;height:64px;display:flex;align-items:center;justify-content:center;background:#1a237e11;border-radius:6px;font-size:1.5rem;">🎬</div>'
        : '<div style="width:100%;height:64px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;">📄</div>';
    return '<div style="position:relative;border:1px solid var(--gray-200);border-radius:8px;overflow:hidden;">'
      +thumb
      +'<button onclick="removeMediaFile('+i+')" style="position:absolute;top:2px;right:2px;background:rgba(0,0,0,.6);color:#fff;border:none;border-radius:50%;width:18px;height:18px;font-size:.7rem;cursor:pointer;line-height:1;">✕</button>'
      +'<div style="font-size:.6rem;padding:2px 4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--gray-500);">'+f.name+'</div>'
      +'</div>';
  }).join('');
}

// --- MEDIA UPLOAD (Admin "Tambah Jadual") — mirrors the customer handlers
// above but operates on saUploadedFiles / sa-media-* DOM, kept fully separate.
function handleSaMediaUpload(input) {
  const files = Array.from(input.files);
  if(!files.length) return;
  const remaining = 5 - saUploadedFiles.length;
  if(remaining <= 0) { toast(lang==='bm'?'Had maksimum 5 fail dicapai.':'Maximum 5 files reached.','error'); return; }
  const toRead = files.slice(0, remaining);
  let loaded = 0;
  toRead.forEach(file => {
    if(file.size > 10*1024*1024) { toast((lang==='bm'?'Fail terlalu besar: ':'File too large: ')+file.name,'error'); loaded++; if(loaded===toRead.length) renderSaMediaPreviews(); return; }
    const reader = new FileReader();
    reader.onload = e => {
      saUploadedFiles.push({ name:file.name, type:file.type, src:e.target.result });
      loaded++;
      if(loaded===toRead.length) renderSaMediaPreviews();
    };
    reader.readAsDataURL(file);
  });
  input.value = '';
}

function clearSaMedia(e) {
  if(e) e.stopPropagation();
  saUploadedFiles = [];
  renderSaMediaPreviews();
}

function removeSaMediaFile(idx) {
  saUploadedFiles.splice(idx, 1);
  renderSaMediaPreviews();
}

function renderSaMediaPreviews() {
  const grid = el('sa-media-preview-grid');
  const bar  = el('sa-media-count-bar');
  if(!grid) return;
  if(!saUploadedFiles.length) {
    grid.innerHTML = '';
    if(bar) bar.style.display = 'none';
    return;
  }
  if(bar) { bar.style.display='flex'; bar.querySelector('span').textContent = saUploadedFiles.length+'/5'; }
  grid.innerHTML = saUploadedFiles.map((f,i)=>{
    const isImg = f.type.startsWith('image/');
    const isVid = f.type.startsWith('video/');
    const thumb = isImg
      ? '<img src="'+f.src+'" style="width:100%;height:64px;object-fit:cover;border-radius:6px;">'
      : isVid
        ? '<div style="width:100%;height:64px;display:flex;align-items:center;justify-content:center;background:#1a237e11;border-radius:6px;font-size:1.5rem;">🎬</div>'
        : '<div style="width:100%;height:64px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;">📄</div>';
    return '<div style="position:relative;border:1px solid var(--gray-200);border-radius:8px;overflow:hidden;">'
      +thumb
      +'<button onclick="removeSaMediaFile('+i+')" style="position:absolute;top:2px;right:2px;background:rgba(0,0,0,.6);color:#fff;border:none;border-radius:50%;width:18px;height:18px;font-size:.7rem;cursor:pointer;line-height:1;">✕</button>'
      +'<div style="font-size:.6rem;padding:2px 4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--gray-500);">'+f.name+'</div>'
      +'</div>';
  }).join('');
}

// --- MILEAGE CHARGE (SITE VISIT) ---
function haversineKm(lat1, lng1, lat2, lng2) {
  var R = 6371, toRad = function(x){ return x * Math.PI / 180; };
  var dLat = toRad(lat2 - lat1), dLng = toRad(lng2 - lng1);
  var a = Math.sin(dLat/2) * Math.sin(dLat/2)
        + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng/2) * Math.sin(dLng/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function mileBox(bg, border, color, inner) {
  return '<div style="margin-top:8px;background:' + bg + ';border:1px solid ' + border
    + ';border-radius:8px;padding:9px 12px;font-size:.8rem;color:' + color + ';line-height:1.5;">'
    + inner + '</div>';
}

// Road distance (OFFICE_COORDS → lat/lng) via OSRM; haversine × 1.3 as fallback
// estimate. Pure calculation, no DOM — shared by the customer and admin mileage
// UIs so the OSRM/fallback logic only lives in one place.
async function fetchDistanceKm(lat, lng) {
  try {
    var ctl = new AbortController();
    var tm = setTimeout(function(){ ctl.abort(); }, 8000);
    var res = await fetch('https://router.project-osrm.org/route/v1/driving/'
      + OFFICE_COORDS.lng + ',' + OFFICE_COORDS.lat + ';' + lng + ',' + lat
      + '?overview=false', { signal: ctl.signal });
    clearTimeout(tm);
    var j = await res.json();
    if(j && j.routes && j.routes[0] && typeof j.routes[0].distance === 'number') {
      return { km: j.routes[0].distance / 1000, isEstimate: false };
    }
  } catch(e) {
    console.warn('[EMUG] OSRM route failed, using haversine estimate:', e);
  }
  return { km: haversineKm(OFFICE_COORDS.lat, OFFICE_COORDS.lng, lat, lng) * 1.3, isEstimate: true };
}

// Road distance via OSRM; haversine × 1.3 as fallback estimate.
// Only active for site_visit bookings with a pinned location.
async function updateMileageEstimate() {
  var box = el('cf-mileage-box');
  mileageKm = null; mileageCharge = null; mileageIsEstimate = false;
  if(!box) return;
  var isSiteVisit = (el('cf-booking-type') ? el('cf-booking-type').value : 'kerja') === 'site_visit';
  if(!isSiteVisit) { box.style.display = 'none'; box.innerHTML = ''; return; }
  box.style.display = 'block';
  if(!(pinnedLat && pinnedLng)) {
    box.innerHTML = mileBox('#fffbeb', '#fcd34d', '#92400e', '📍 ' + t('milePin'));
    return;
  }
  var seq = ++mileageCalcSeq;
  box.innerHTML = mileBox('var(--gray-50)', 'var(--gray-200)', 'var(--gray-500)', '⏳ ' + t('mileCalc'));
  var d = await fetchDistanceKm(pinnedLat, pinnedLng);
  var km = Math.round(d.km * 10) / 10, est = d.isEstimate;
  mileageKm = km;
  mileageIsEstimate = est;
  mileageCharge = km <= MILEAGE_FREE_RADIUS_KM ? 0 : Math.round(km * MILEAGE_RATE_PER_KM * 100) / 100;
  var kmTxt = km.toFixed(1);
  var estTag = est ? ' (' + t('mileEst') + ')' : '';
  if(mileageCharge === 0) {
    box.innerHTML = mileBox('#f0fdf4', '#86efac', '#166534',
      '✅ ' + t('mileFree').replace('{km}', kmTxt) + estTag);
  } else {
    box.innerHTML = mileBox('#eff6ff', '#93c5fd', '#1e40af',
      '🚗 ' + t('mileCharge').replace('{amt}', mileageCharge.toFixed(2)).replace('{km}', kmTxt) + estTag
      + '<div style="margin-top:4px;font-size:.72rem;color:var(--gray-500);">' + t('mileNote') + '</div>');
  }
}

// Admin "Tambah Jadual" equivalent of updateMileageEstimate — separate state
// (saMileageKm/Charge) and DOM (sa-mileage-box), reading the admin pin instead
// of the customer's pinnedLat/pinnedLng.
let saMileageKm = null, saMileageCharge = null, saMileageCalcSeq = 0;
async function updateSaMileageEstimate() {
  var box = el('sa-mileage-box');
  saMileageKm = null; saMileageCharge = null;
  if(!box) return;
  var isSiteVisit = (el('sa-booking-type') ? el('sa-booking-type').value : 'kerja') === 'site_visit';
  if(!isSiteVisit) { box.style.display = 'none'; box.innerHTML = ''; return; }
  box.style.display = 'block';
  if(!(saAdminPinnedLat && saAdminPinnedLng)) {
    box.innerHTML = mileBox('#fffbeb', '#fcd34d', '#92400e', '📍 ' + t('milePin'));
    return;
  }
  var seq = ++saMileageCalcSeq;
  box.innerHTML = mileBox('var(--gray-50)', 'var(--gray-200)', 'var(--gray-500)', '⏳ ' + t('mileCalc'));
  var d = await fetchDistanceKm(saAdminPinnedLat, saAdminPinnedLng);
  if(seq !== saMileageCalcSeq) return; // superseded by a newer pin/toggle
  var km = Math.round(d.km * 10) / 10, est = d.isEstimate;
  saMileageKm = km;
  saMileageCharge = km <= MILEAGE_FREE_RADIUS_KM ? 0 : Math.round(km * MILEAGE_RATE_PER_KM * 100) / 100;
  var kmTxt = km.toFixed(1);
  var estTag = est ? ' (' + t('mileEst') + ')' : '';
  if(saMileageCharge === 0) {
    box.innerHTML = mileBox('#f0fdf4', '#86efac', '#166534',
      '✅ ' + t('mileFree').replace('{km}', kmTxt) + estTag);
  } else {
    box.innerHTML = mileBox('#eff6ff', '#93c5fd', '#1e40af',
      '🚗 ' + t('mileCharge').replace('{amt}', saMileageCharge.toFixed(2)).replace('{km}', kmTxt) + estTag
      + '<div style="margin-top:4px;font-size:.72rem;color:var(--gray-500);">' + t('mileNote') + '</div>');
  }
}

// Shared confirmation UI for a set pin — used by GPS pin and map picker.
// target: 'customer' (cf-* fields, the default) or 'admin' (sa-* fields, Tambah Jadual).
function showPinnedResult(target) {
  const lat = target==='admin' ? saAdminPinnedLat : pinnedLat;
  const lng = target==='admin' ? saAdminPinnedLng : pinnedLng;
  const btnTxt = el(target==='admin' ? 'sa-map-btn-txt' : 'cf-loc-btn-txt');
  if(btnTxt) btnTxt.textContent = lang==='bm'?'Lokasi Dipin ✓':'Location Pinned ✓';
  const result = el(target==='admin' ? 'sa-location-result' : 'cf-location-result');
  if(result) {
    result.style.display = 'block';
    result.innerHTML = '<div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:10px 14px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;">'
      +'<span style="font-size:.85rem;color:#166534;">📍 '+lat.toFixed(6)+', '+lng.toFixed(6)+'</span>'
      +'<a href="https://www.google.com/maps?q='+lat+','+lng+'" target="_blank" rel="noopener" class="maps-btn" style="font-size:.8rem;padding:4px 10px;">'+(lang==='bm'?'Buka Maps':'Open Maps')+'</a>'
      +'</div>';
  }
}

// --- MAP LOCATION PICKER (Leaflet) ---
// Shared by the customer landing-page form AND the admin "Tambah Jadual"
// modal — mapPickerTarget records which one is currently open so Confirm
// writes back to the right pin/DOM without duplicating the whole widget.
let mpMap = null, mpMarker = null, mpLat = null, mpLng = null, mapPickerTarget = 'customer';

function openMapPicker(target) {
  if(typeof L === 'undefined') { toast(t('mapLoadFail'), 'error'); return; }
  mapPickerTarget = target==='admin' ? 'admin' : 'customer';
  openModal('modal-map');
  const curLat = mapPickerTarget==='admin' ? saAdminPinnedLat : pinnedLat;
  const curLng = mapPickerTarget==='admin' ? saAdminPinnedLng : pinnedLng;
  const hasPin = !!(curLat && curLng);
  const startLat = hasPin ? curLat : OFFICE_COORDS.lat;
  const startLng = hasPin ? curLng : OFFICE_COORDS.lng;
  const zoom = hasPin ? 16 : 12;
  if(!mpMap) {
    mpMap = L.map('mp-map').setView([startLat, startLng], zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mpMap);
    mpMap.on('click', e => setMpMarker(e.latlng.lat, e.latlng.lng));
  } else {
    mpMap.setView([startLat, startLng], zoom);
  }
  if(hasPin) { setMpMarker(startLat, startLng); }
  else {
    mpLat = null; mpLng = null;
    if(mpMarker) { mpMarker.remove(); mpMarker = null; }
    updateMpCoordsLbl();
  }
  // Leaflet needs a size recalc after the modal becomes visible
  setTimeout(() => { if(mpMap) mpMap.invalidateSize(); }, 200);
}

function setMpMarker(lat, lng) {
  mpLat = lat; mpLng = lng;
  if(!mpMarker) {
    mpMarker = L.marker([lat, lng], { draggable: true }).addTo(mpMap);
    mpMarker.on('dragend', () => {
      const p = mpMarker.getLatLng();
      mpLat = p.lat; mpLng = p.lng;
      updateMpCoordsLbl();
    });
  } else {
    mpMarker.setLatLng([lat, lng]);
  }
  updateMpCoordsLbl();
}

function updateMpCoordsLbl() {
  const lbl = el('mp-coords');
  if(!lbl) return;
  lbl.textContent = (mpLat != null) ? '📍 ' + mpLat.toFixed(6) + ', ' + mpLng.toFixed(6) : t('mapHint');
}

function confirmMapLocation() {
  if(mpLat == null) { toast(t('mapHint'), 'error'); return; }
  if(mapPickerTarget==='admin') {
    saAdminPinnedLat = mpLat;
    saAdminPinnedLng = mpLng;
    closeModal('modal-map');
    showPinnedResult('admin');
    updateSaMileageEstimate();
    reverseGeocodeFill(mpLat, mpLng, 'admin');
  } else {
    pinnedLat = mpLat;
    pinnedLng = mpLng;
    closeModal('modal-map');
    showPinnedResult('customer');
    updateMileageEstimate();
    reverseGeocodeFill(mpLat, mpLng, 'customer');
  }
}

// Best-effort: auto-fill the address field from the picked coords if empty
async function reverseGeocodeFill(lat, lng, target) {
  const addr = el(target==='admin' ? 'sa-addr' : 'cf-addr');
  if(!addr || addr.value.trim()) return;
  try {
    const res = await fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + lat + '&lon=' + lng);
    const j = await res.json();
    if(j && j.display_name && !addr.value.trim()) addr.value = j.display_name;
  } catch(e) {
    console.warn('[EMUG] reverse geocode skipped:', e);
  }
}

// --- GPS LOCATION PIN ---
function pinLocation() {
  if(!navigator.geolocation) {
    toast(lang==='bm'?'GPS tidak disokong pada peranti ini.':'GPS not supported on this device.','error');
    return;
  }
  const btn = el('cf-location-btn');
  const btnTxt = el('cf-loc-btn-txt');
  const result = el('cf-location-result');
  if(btn) btn.disabled = true;
  if(btnTxt) btnTxt.textContent = lang==='bm'?'Mengesan lokasi…':'Detecting location…';
  navigator.geolocation.getCurrentPosition(
    pos => {
      pinnedLat = pos.coords.latitude;
      pinnedLng = pos.coords.longitude;
      if(btn) btn.disabled = false;
      showPinnedResult();
      updateMileageEstimate();
    },
    err => {
      if(btn) btn.disabled = false;
      if(btnTxt) btnTxt.textContent = lang==='bm'?'Pin Lokasi Saya':'Pin My Location';
      toast(lang==='bm'?'Gagal mendapatkan lokasi. Sila benarkan akses GPS.':'Could not get location. Please allow GPS access.','error');
    },
    { enableHighAccuracy:true, timeout:10000 }
  );
}

// --- GALLERY ---
function openGalleryModal(jobId) {
  galleryJobId = jobId;
  galleryTab   = 'before';
  // Ensure all 3 category arrays exist (guards against legacy localStorage data)
  if(!galleryData[jobId]) galleryData[jobId] = { before:[], during:[], after:[] };
  if(!galleryData[jobId].before) galleryData[jobId].before = [];
  if(!galleryData[jobId].during) galleryData[jobId].during = [];
  if(!galleryData[jobId].after)  galleryData[jobId].after  = [];
  const ttl = el('gallery-modal-title');
  if(ttl) ttl.textContent = (lang==='bm'?'Galeri Kerja — ':'Job Gallery — ') + jobId;
  switchGalleryTab('before');
  updateGalleryTabBadges();
  openModal('modal-gallery');
}

function switchGalleryTab(tab) {
  galleryTab = tab;
  document.querySelectorAll('.gallery-tab-btn').forEach(b=>{
    b.classList.toggle('active', b.dataset.tab===tab);
  });
  renderGalleryGrid();
}

function handleGalleryUpload(input) {
  const files = Array.from(input.files);
  if(!files.length) return;
  // Ensure all 3 category arrays exist before accessing them
  if(!galleryData[galleryJobId]) galleryData[galleryJobId] = { before:[], during:[], after:[] };
  if(!galleryData[galleryJobId].before) galleryData[galleryJobId].before = [];
  if(!galleryData[galleryJobId].during) galleryData[galleryJobId].during = [];
  if(!galleryData[galleryJobId].after)  galleryData[galleryJobId].after  = [];
  const arr = galleryData[galleryJobId][galleryTab];
  const remaining = 20 - arr.length;
  if(remaining <= 0) { toast(lang==='bm'?'Had 20 gambar dicapai.':'20 photo limit reached.','error'); return; }
  let loaded = 0;
  const toRead = files.slice(0, remaining);
  toRead.forEach(file => {
    if(file.size > 15*1024*1024) { loaded++; if(loaded===toRead.length){ saveGallery(); renderGalleryGrid(); updateGalleryTabBadges(); if(user&&isOperatorRole(user.role)) renderOperatorDashboard(); } return; }
    const reader = new FileReader();
    reader.onload = e => {
      arr.push({ src:e.target.result, name:file.name, type:file.type, ts:new Date().toISOString(), who:user?user.name:'Staff' });
      loaded++;
      if(loaded===toRead.length){ saveGallery(); renderGalleryGrid(); updateGalleryTabBadges(); if(user&&isOperatorRole(user.role)) renderOperatorDashboard(); }
    };
    reader.readAsDataURL(file);
  });
  input.value = '';
}

function updateGalleryTabBadges() {
  if(!galleryJobId) return;
  const gd = galleryData[galleryJobId] || {};
  const cats = [
    { tab:'before', label: lang==='bm'?'📷 Sebelum':'📷 Before',  count:(gd.before||[]).length },
    { tab:'during', label: lang==='bm'?'🔧 Semasa':'🔧 During',  count:(gd.during||[]).length },
    { tab:'after',  label: lang==='bm'?'✅ Selepas':'✅ After',  count:(gd.after||[]).length  },
  ];
  document.querySelectorAll('.gallery-tab-btn').forEach(function(b) {
    const cat = cats.find(function(c){ return c.tab === b.dataset.tab; });
    if(!cat) return;
    b.textContent = cat.count > 0 ? cat.label + ' (' + cat.count + ')' : cat.label;
  });
}

function saveGallery() {
  if(galleryJobId) {
    dbSaveGallery(galleryJobId);
    dbSaveJobPhotos(galleryJobId);
  }
}

function renderGalleryGrid() {
  const grid = el('gallery-grid');
  if(!grid) return;
  const arr = (galleryData[galleryJobId] && galleryData[galleryJobId][galleryTab]) ? galleryData[galleryJobId][galleryTab] : [];
  const tabLabel = galleryTab==='before'?(lang==='bm'?'Sebelum':'Before'):galleryTab==='during'?(lang==='bm'?'Semasa':'During'):(lang==='bm'?'Selepas':'After');
  let html = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:10px;padding:4px;">';
  arr.forEach(function(p,i){
    const isImg = p.type && p.type.startsWith('image/');
    html += '<div style="position:relative;cursor:pointer;" onclick="openFullscreen(galleryData[\''+galleryJobId+'\'][\''+galleryTab+'\'],'+i+')">'
      +(isImg
        ? '<img src="'+p.src+'" style="width:100%;height:100px;object-fit:cover;border-radius:8px;">'
        : '<div style="width:100%;height:100px;background:#1a237e22;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:2rem;">🎬</div>')
      +'<button onclick="event.stopPropagation();deleteGalleryPhoto('+i+')" style="position:absolute;top:4px;right:4px;background:rgba(220,38,38,.85);color:#fff;border:none;border-radius:50%;width:22px;height:22px;font-size:.75rem;cursor:pointer;line-height:1;">✕</button>'
      +'<div style="font-size:.65rem;color:var(--gray-500);text-align:center;margin-top:3px;">'+(p.who||'')+' · '+fmtDate(p.ts)+'</div>'
      +'</div>';
  });
  html += '<label style="width:100%;height:100px;border:2px dashed var(--gray-300);border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;font-size:.8rem;color:var(--gray-400);">'
    +'<span style="font-size:1.8rem;">+</span>'+(lang==='bm'?'Tambah Gambar':'Add Photo')
    +'<input type="file" accept="image/*,video/*" multiple style="display:none;" onchange="handleGalleryUpload(this)">'
    +'</label>';
  html += '</div>';
  if(!arr.length) {
    html = '<div style="text-align:center;padding:32px;color:var(--gray-400);">'+(lang==='bm'?'Tiada gambar '+tabLabel+' lagi.':'No '+tabLabel+' photos yet.')+'</div>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:10px;padding:4px;">'
      + '<label style="width:100%;height:100px;border:2px dashed var(--gray-300);border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;font-size:.8rem;color:var(--gray-400);">'
      + '<span style="font-size:1.8rem;">+</span>'+(lang==='bm'?'Tambah Gambar':'Add Photo')
      + '<input type="file" accept="image/*,video/*" multiple style="display:none;" onchange="handleGalleryUpload(this)">'
      + '</label></div>';
  }
  grid.innerHTML = html;
}

function deleteGalleryPhoto(idx) {
  if(!confirm(lang==='bm'?'Padam gambar ini?':'Delete this photo?')) return;
  galleryData[galleryJobId][galleryTab].splice(idx, 1);
  saveGallery();
  renderGalleryGrid();
  updateGalleryTabBadges();
  if(user && isOperatorRole(user.role)) renderOperatorDashboard();
}

// --- FULLSCREEN VIEWER ---
function openFullscreen(images, idx) {
  fullscreenImages = images;
  fullscreenIdx    = idx;
  renderFullscreen();
  el('fullscreen-viewer').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function renderFullscreen() {
  const item = fullscreenImages[fullscreenIdx];
  if(!item) return;
  const img    = el('fullscreen-img');
  const cap    = el('fullscreen-caption');
  const vidEl  = el('fullscreen-video');
  const isImg  = item.type && item.type.startsWith('image/');
  if(img)   { img.src = isImg ? item.src : ''; img.style.display = isImg ? 'block' : 'none'; }
  if(vidEl) { vidEl.src = !isImg ? item.src : ''; vidEl.style.display = !isImg ? 'block' : 'none'; }
  if(cap)   cap.textContent = (item.name||'') + ' · ' + (item.who||'') + ' · ' + fmtDate(item.ts) + ' (' + (fullscreenIdx+1) + '/' + fullscreenImages.length + ')';
  const prevBtn = el('fs-prev');
  const nextBtn = el('fs-next');
  if(prevBtn) prevBtn.style.display = fullscreenIdx > 0 ? 'flex' : 'none';
  if(nextBtn) nextBtn.style.display = fullscreenIdx < fullscreenImages.length-1 ? 'flex' : 'none';
}

function fullscreenNav(dir) {
  fullscreenIdx = Math.max(0, Math.min(fullscreenImages.length-1, fullscreenIdx+dir));
  renderFullscreen();
}

function closeFullscreen(e) {
  if(e && e.target !== el('fullscreen-viewer')) return;
  closeFullscreenBtn();
}

function closeFullscreenBtn() {
  el('fullscreen-viewer').style.display = 'none';
  document.body.style.overflow = '';
}

// --- STAR RATINGS ---
function initStarRatings() {
  document.querySelectorAll('.star-picker').forEach(function(picker) {
    const cat   = picker.dataset.cat;
    const stars = picker.querySelectorAll('.star');
    stars.forEach(function(star, i) {
      star.addEventListener('click', function() {
        starRatings[cat] = i + 1;
        stars.forEach(function(s, j) { s.classList.toggle('active', j <= i); });
        updateOverallRating();
      });
      star.addEventListener('mouseenter', function() {
        stars.forEach(function(s, j) { s.classList.toggle('hover', j <= i); });
      });
      star.addEventListener('mouseleave', function() {
        stars.forEach(function(s) { s.classList.remove('hover'); });
      });
    });
  });
}

function updateOverallRating() {
  const vals = Object.values(starRatings).filter(function(v){ return v > 0; });
  const avg  = vals.length ? (vals.reduce(function(a,b){ return a+b; }, 0) / vals.length).toFixed(1) : '—';
  const disp = el('fb-overall-display');
  if(disp) disp.textContent = avg === '—' ? '—' : avg + ' ⭐';
}

// --- FEEDBACK FORM (PUBLIC) ---
function showFeedbackPage(ref) {
  showPubPage('feedback');
  initFeedbackForm(ref);
}

function initFeedbackForm(ref) {
  starRatings = {};
  document.querySelectorAll('.star-picker .star').forEach(function(s){ s.classList.remove('active','hover'); });
  const disp = el('fb-overall-display'); if(disp) disp.textContent = '—';
  const nameEl    = el('fb-name');    if(nameEl)    nameEl.value    = '';
  const commentEl = el('fb-comment'); if(commentEl) commentEl.value = '';
  const refEl     = el('fb-ref');     if(refEl)     refEl.value     = ref || '';
  const fv  = el('fb-form-view');    if(fv)  fv.style.display  = 'block';
  const cv  = el('fb-confirm-view'); if(cv)  cv.style.display  = 'none';
  const err = el('fb-ref-error');    if(err) err.style.display = 'none';
  initStarRatings();
}

function checkFeedbackRef() {
  const ref    = (el('fb-ref') ? el('fb-ref').value : '').trim().toUpperCase();
  const errEl  = el('fb-ref-error');
  if(!ref) {
    if(errEl){ errEl.textContent = lang==='bm'?'Sila masukkan nombor rujukan.':'Please enter reference number.'; errEl.style.display='block'; }
    return false;
  }
  const c = complaints.find(function(x){ return x.ref===ref; });
  if(!c) {
    if(errEl){ errEl.textContent = lang==='bm'?'Nombor rujukan tidak dijumpai.':'Reference number not found.'; errEl.style.display='block'; }
    return false;
  }
  if(c.status !== 'Selesai') {
    if(errEl){ errEl.textContent = lang==='bm'?'Kerja belum selesai. Penilaian hanya boleh dibuat selepas kerja siap.':'Work not yet completed.'; errEl.style.display='block'; }
    return false;
  }
  const existing = feedbacks.find(function(f){ return f.ref===ref; });
  if(existing) {
    if(errEl){ errEl.textContent = lang==='bm'?'Penilaian untuk aduan ini telah dihantar.':'Feedback for this complaint already submitted.'; errEl.style.display='block'; }
    return false;
  }
  if(errEl) errEl.style.display = 'none';
  return true;
}

function submitFeedback() {
  if(!checkFeedbackRef()) return;
  const name    = (el('fb-name')    ? el('fb-name').value    : '').trim();
  const ref     = (el('fb-ref')     ? el('fb-ref').value     : '').trim().toUpperCase();
  const comment = (el('fb-comment') ? el('fb-comment').value : '').trim();
  if(!name) { toast(lang==='bm'?'Sila masukkan nama anda.':'Please enter your name.','error'); return; }
  const cats = ['quality','timeliness','service'];
  for(let i=0;i<cats.length;i++) {
    if(!starRatings[cats[i]]) { toast(lang==='bm'?'Sila berikan penilaian untuk semua kategori.':'Please rate all categories.','error'); return; }
  }
  const vals    = cats.map(function(c){ return starRatings[c]; });
  const overall = +(vals.reduce(function(a,b){ return a+b; }, 0) / vals.length).toFixed(1);
  feedbackCounter++;
  const newFb = {
    id: feedbackCounter,
    ref: ref,
    name: name,
    ratings: { quality: starRatings.quality, timeliness: starRatings.timeliness, service: starRatings.service },
    overall: overall,
    comment: comment,
    published: false,
    date: new Date().toISOString()
  };
  feedbacks.push(newFb);
  dbInsertFeedback(newFb);
  const confRef  = el('fb-confirm-ref');   if(confRef)   confRef.textContent  = ref;
  const confName = el('fb-confirm-name');  if(confName)  confName.textContent = name;
  const confStar = el('fb-confirm-stars'); if(confStar)  confStar.textContent = '⭐'.repeat(Math.round(overall)) + ' (' + overall + ')';
  const fv = el('fb-form-view');    if(fv) fv.style.display  = 'none';
  const cv = el('fb-confirm-view'); if(cv) cv.style.display  = 'block';
  toast(lang==='bm'?'Terima kasih atas penilaian anda!':'Thank you for your feedback!','success');
  renderTestimonials();
}

// --- TESTIMONIALS (PUBLIC LANDING) ---
function renderTestimonials() {
  // Hidden elements still updated so admin feedback panel works
  const grid   = el('testimonials-grid');
  const banner = el('avg-rating-banner');
  const avgNum = el('avg-rating-num');
  const published = feedbacks.filter(function(f){ return f.published; });

  if(avgNum) {
    if(published.length) {
      const avg = (published.reduce(function(s,f){ return s+f.overall; }, 0) / published.length).toFixed(1);
      avgNum.textContent = avg;
      if(banner) banner.style.display = 'flex';
    } else {
      if(banner) banner.style.display = 'none';
    }
  }
  if(grid) grid.innerHTML = '';  // kept in DOM (hidden) — no content needed

  // ── Landing page review strip ──────────────────────────────────
  const stripEmpty   = el('lp-reviews-empty');
  const stripDisplay = el('lp-reviews-display');
  const summaryEl    = el('lp-reviews-summary');
  const listEl       = el('lp-reviews-list');

  if(!published.length) {
    // No reviews: show the soft prompt, hide the review display
    if(stripEmpty)   stripEmpty.style.display   = 'flex';
    if(stripDisplay) stripDisplay.style.display = 'none';
    return;
  }

  // Has reviews: hide the prompt, show summary + up to 3 mini cards
  if(stripEmpty)   stripEmpty.style.display   = 'none';
  if(stripDisplay) stripDisplay.style.display = 'block';

  if(summaryEl) {
    const avg = (published.reduce(function(s,f){ return s+f.overall; }, 0) / published.length).toFixed(1);
    summaryEl.innerHTML =
      '<span style=”font-size:1.1rem;font-weight:800;color:var(--lp-navy);”>★ '+avg+'</span>'
      +' <span style=”font-size:.8rem;color:var(--lp-text-muted);margin-left:4px;”>'
      +published.length+' '+(lang==='bm'?'ulasan':'reviews')+'</span>';
  }

  if(listEl) {
    listEl.innerHTML = published.slice().reverse().slice(0,3).map(function(f){
      return '<div class=”lp-review-mini-card”>'
        +'<div class=”mini-stars”>'+'★'.repeat(Math.round(f.overall))+'</div>'
        +'<div>”'+(f.comment ? f.comment.slice(0,80)+(f.comment.length>80?'…':'') : '—')+'”</div>'
        +'<div class=”mini-author”>— '+f.name+'</div>'
        +'</div>';
    }).join('');
  }
}

// --- ADMIN FEEDBACK MANAGEMENT ---
function renderAdminFeedback() {
  const summaryEl = el('fba-summary');
  const listEl    = el('fba-list');

  if(summaryEl) {
    const cats   = ['quality','timeliness','service'];
    const labels = {
      quality:    lang==='bm'?'Kualiti Kerja':'Work Quality',
      timeliness: lang==='bm'?'Ketepatan Masa':'Timeliness',
      service:    lang==='bm'?'Perkhidmatan':'Service'
    };
    summaryEl.innerHTML = cats.map(function(cat){
      const vals = feedbacks.map(function(f){ return f.ratings[cat]; }).filter(Boolean);
      const avg  = vals.length ? (vals.reduce(function(a,b){ return a+b; }, 0) / vals.length).toFixed(1) : '—';
      return '<div style="background:var(--gray-50);border:1px solid var(--gray-200);border-radius:var(--r-lg);padding:14px 18px;text-align:center;">'
        +'<div style="font-size:1.6rem;font-weight:700;color:var(--navy);">'+avg+'</div>'
        +'<div style="font-size:.8rem;color:var(--gray-500);">'+labels[cat]+'</div>'
        +'<div style="font-size:.7rem;color:var(--gray-400);">'+vals.length+' '+(lang==='bm'?'ulasan':'reviews')+'</div>'
        +'</div>';
    }).join('');
  }

  if(!listEl) return;
  if(!feedbacks.length) {
    listEl.innerHTML = '<div style="text-align:center;padding:24px;color:var(--gray-400);">'+(lang==='bm'?'Tiada penilaian lagi.':'No feedback yet.')+'</div>';
    return;
  }
  listEl.innerHTML = feedbacks.slice().reverse().map(function(f){
    return '<div style="border:1px solid var(--gray-200);border-radius:var(--r-lg);padding:14px 18px;margin-bottom:10px;background:var(--white);">'
      +'<div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;">'
      +'<div>'
      +'<div style="font-weight:600;">'+f.name+' <span style="font-size:.8rem;color:var(--gray-400);">· '+f.ref+'</span></div>'
      +'<div style="font-size:.8rem;color:var(--gray-500);margin:2px 0;">'+fmtDate(f.date)+'</div>'
      +'<div style="margin:4px 0;">'+'⭐'.repeat(Math.round(f.overall))+' <span style="font-size:.82rem;color:var(--gray-600);">'+f.overall+' / 5</span></div>'
      +'<div style="font-size:.82rem;color:var(--gray-500);">'
      +(lang==='bm'?'Kualiti':'Quality')+': '+f.ratings.quality+'★ &nbsp;|&nbsp;'
      +(lang==='bm'?'Masa':'Time')+': '+f.ratings.timeliness+'★ &nbsp;|&nbsp;'
      +(lang==='bm'?'Servis':'Service')+': '+f.ratings.service+'★'
      +'</div>'
      +(f.comment?'<div style="font-style:italic;color:var(--gray-600);margin-top:6px;font-size:.85rem;">“'+f.comment+'”</div>':'')
      +'</div>'
      +'<div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">'
      +'<div style="display:flex;align-items:center;gap:8px;">'
      +'<span style="font-size:.78rem;color:'+(f.published?'var(--success)':'var(--gray-400)')+';">'+(f.published?(lang==='bm'?'✅ Diterbit':'✅ Published'):(lang==='bm'?'⚪ Tersembunyi':'⚪ Hidden'))+'</span>'
      +'<div class="toggle-track '+(f.published?'on':'')+'" onclick="toggleFeedbackPublish('+f.id+')" style="cursor:pointer;"></div>'
      +'</div>'
      +'</div>'
      +'</div></div>';
  }).join('');
}

function toggleFeedbackPublish(id) {
  const fb = feedbacks.find(function(f){ return f.id===id; });
  if(!fb) return;
  fb.published = !fb.published;
  dbUpdateFeedback(fb);
  renderAdminFeedback();
  renderTestimonials();
  toast(fb.published?(lang==='bm'?'Ulasan diterbitkan.':'Review published.'):(lang==='bm'?'Ulasan disembunyikan.':'Review hidden.'), 'success');
}

// --- TRACK PAGE: COMPLETION GALLERY ---
function renderTrackGallery(c) {
  const gd = galleryData[c.id];
  const tabs = ['before','during','after'];
  const tabLabels = {
    before: lang==='bm'?'Sebelum':'Before',
    during: lang==='bm'?'Semasa':'During',
    after:  lang==='bm'?'Selepas':'After'
  };
  const hasAny = gd && tabs.some(function(tab){ return gd[tab] && gd[tab].length > 0; });

  return '<div style="margin-top:12px;border:1.5px solid var(--gray-200);border-radius:var(--r-lg);overflow:hidden;">'
    +'<div style="background:var(--navy);color:white;padding:10px 16px;font-weight:600;font-size:.88rem;">📷 '+t('completionGallery')+'</div>'
    +(hasAny ? (function(){
      var html = '<div style="display:flex;border-bottom:1px solid var(--gray-200);">';
      tabs.forEach(function(tab){
        var count = (gd && gd[tab]) ? gd[tab].length : 0;
        html += '<button class="track-gallery-tab" data-gtab="'+tab+'" onclick="switchTrackGalleryTab(\''+c.id+'\',\''+tab+'\')" style="flex:1;padding:8px 4px;background:none;border:none;border-bottom:2px solid transparent;font-size:.8rem;cursor:pointer;color:var(--gray-500);">'
          +tabLabels[tab]+(count?' ('+count+')':'')+'</button>';
      });
      html += '</div><div id="track-gallery-content-'+c.id+'" style="padding:12px;">';
      var firstTab = tabs.find(function(t){ return gd[t] && gd[t].length>0; }) || 'before';
      var arr = (gd && gd[firstTab]) ? gd[firstTab] : [];
      html += renderTrackGalleryGrid(arr, c.id, firstTab);
      html += '</div>';
      return html;
    })()
    : '<div style="padding:20px;text-align:center;color:var(--gray-400);font-size:.85rem;">'+t('noGalleryPhotos')+'</div>')
    +'</div>';
}

function switchTrackGalleryTab(jobId, tab) {
  const gd = galleryData[jobId];
  const arr = (gd && gd[tab]) ? gd[tab] : [];
  const contentEl = el('track-gallery-content-'+jobId);
  if(contentEl) contentEl.innerHTML = renderTrackGalleryGrid(arr, jobId, tab);
  document.querySelectorAll('.track-gallery-tab').forEach(function(b){
    b.style.color = b.dataset.gtab === tab ? 'var(--navy)' : 'var(--gray-500)';
    b.style.borderBottomColor = b.dataset.gtab === tab ? 'var(--navy)' : 'transparent';
    b.style.fontWeight = b.dataset.gtab === tab ? '700' : '400';
  });
}

function renderTrackGalleryGrid(arr, jobId, tab) {
  if(!arr || !arr.length) {
    return '<div style="text-align:center;padding:16px;color:var(--gray-400);font-size:.82rem;">'
      +(lang==='bm'?'Tiada gambar dalam kategori ini.':'No photos in this category.')+'</div>';
  }
  return '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:8px;">'
    + arr.map(function(p,i){
      var isImg = p.type && p.type.startsWith('image/');
      return '<div style="cursor:pointer;" onclick="openFullscreen(galleryData[\''+jobId+'\'][\''+tab+'\'],'+i+')">'
        +(isImg?'<img src="'+p.src+'" style="width:100%;height:75px;object-fit:cover;border-radius:6px;">'
               :'<div style="width:100%;height:75px;background:#1a237e22;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;">🎬</div>')
        +'<div style="font-size:.6rem;color:var(--gray-400);text-align:center;margin-top:2px;">'+(p.who||'')+'</div>'
        +'</div>';
    }).join('')+'</div>';
}

// --- OPERATOR DASHBOARD ---
// Self-accept-from-pool is retired: operators now only ever see jobs that a
// Team Leader or Admin has explicitly assigned to them (complaints.assignedTo).
async function renderOperatorDashboard() {
  el('dp-d-date').textContent = fmtDate(now());
  var myJobs  = complaints.filter(function(c){ return c.assignedTo === user.username; });
  var active  = myJobs.filter(function(c){ return c.status === 'Sedang Berjalan'; });
  var done    = myJobs.filter(function(c){ return c.status === 'Selesai'; });
  // Legacy manual/pool jobs (jobs table) accepted directly by this operator —
  // kept for backward compatibility with jobs created before the Team Leader
  // routing feature; new manual jobs are assigned via complaints.assignedTo instead.
  var myManualJobs = manualJobs.filter(function(j) {
    return j.operator_id === user.username && j.status !== 'Menunggu';
  });

  setHTML('d-stats',
    '<div class="stat-card c-info"><div class="stat-icon">🔄</div><div class="stat-value">'+active.length+'</div><div class="stat-label">'+t('inProgress')+'</div></div>'
    +'<div class="stat-card c-success"><div class="stat-icon">✅</div><div class="stat-value">'+done.length+'</div><div class="stat-label">'+t('completed')+'</div></div>'
  );

  var newJobsHTML = '';

  // Customer photos in "Kerja Saya" are shown inline (not behind a click), and
  // this list is bounded to just this operator's own accepted jobs — so fetch
  // media on-demand here rather than pulling it for every complaint globally.
  setHTML('d-recent-list', newJobsHTML + '<div style="text-align:center;padding:20px;color:var(--gray-400);">⏳ '+(lang==='bm'?'Memuatkan kerja saya...':'Loading my jobs...')+'</div>');
  await Promise.all(myJobs.map(function(c){ return ensureComplaintMedia(c); }));

  // ── "KERJA SAYA" section ──────────────────────────────────────────────────
  var myJobsHTML = '<div>'
    +'<div class="card-header" style="padding:0 0 12px 0;">'
    +'<div class="card-title">🧰 '+t('opMyJobs')
    +(active.length?'<span style="margin-left:8px;background:var(--info);color:white;border-radius:12px;padding:1px 9px;font-size:.72rem;font-weight:800;">'+active.length+'</span>':'')
    +'</div></div>'
    +(myJobs.length ? myJobs.slice().reverse().map(function(c){
      var gd = galleryData[c.id] || { before:[], during:[], after:[] };
      var cntB = gd.before ? gd.before.length : 0;
      var cntD = gd.during ? gd.during.length : 0;
      var cntA = gd.after  ? gd.after.length  : 0;
      var hasBefore = cntB > 0;
      var hasDuring = cntD > 0;
      var hasAfter  = cntA > 0;
      var isActive  = c.status !== 'Selesai';
      var canComplete = hasBefore && hasDuring && hasAfter && isActive;

      // Location row
      var locRow = c.coords
        ? '<div style="margin-bottom:8px;"><a class="maps-btn" href="https://www.google.com/maps?q='+c.coords.lat+','+c.coords.lng+'" target="_blank" rel="noopener">📍 '+(lang==='bm'?'Buka Google Maps':'Open Google Maps')+'</a></div>'
        : '<div style="font-size:.82rem;color:var(--gray-600);margin-bottom:8px;">📍 '+c.address+'</div>';

      // Customer complaint photos
      var custPhotosHTML = '';
      if(c.media && c.media.length) {
        custPhotosHTML = '<div class="op-cust-photos">'
          +'<div class="op-section-hd">📷 '+(lang==='bm'?'Gambar Aduan Pelanggan':'Customer Complaint Photos')+'</div>'
          +'<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;">'
          +c.media.map(function(f, i){
            var isImg = f.type && f.type.startsWith('image/');
            return '<div style="cursor:pointer;" onclick="openFullscreen(complaints.find(function(x){return x.id===\''+c.id+'\';}).media,'+i+')">'
              +(isImg
                ?'<img src="'+f.src+'" style="width:64px;height:52px;object-fit:cover;border-radius:6px;border:1px solid var(--gray-200);">'
                :'<div style="width:64px;height:52px;background:#1a237e11;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;">🎬</div>')
              +'</div>';
          }).join('')
          +'</div></div>';
      } else {
        custPhotosHTML = '<div class="op-cust-photos">'
          +'<div class="op-section-hd">📷 '+(lang==='bm'?'Gambar Aduan Pelanggan':'Customer Complaint Photos')+'</div>'
          +'<div style="font-size:.8rem;color:var(--gray-400);padding:4px 0;">'+(lang==='bm'?'Tiada gambar daripada pelanggan.':'No photos from customer.')+'</div>'
          +'</div>';
      }

      // Photo progress + missing-category warning
      var photoSummary = '<div class="op-photo-summary">'
        +'<div class="op-photo-cat '+(hasBefore?'done':'empty')+'">📷 '+(lang==='bm'?'Sebelum':'Before')+' ('+cntB+')</div>'
        +'<div class="op-photo-cat '+(hasDuring?'done':'empty')+'">🔧 '+(lang==='bm'?'Semasa':'During')+' ('+cntD+')</div>'
        +'<div class="op-photo-cat '+(hasAfter?'done':'empty')+'">✅ '+(lang==='bm'?'Selepas':'After')+' ('+cntA+')</div>'
        +'</div>';

      var missingWarn = '';
      if(isActive && !canComplete) {
        var missing = [];
        if(!hasBefore) missing.push(lang==='bm'?'Sebelum':'Before');
        if(!hasDuring) missing.push(lang==='bm'?'Semasa':'During');
        if(!hasAfter)  missing.push(lang==='bm'?'Selepas':'After');
        missingWarn = '<div class="op-missing-warn">'
          +'⚠️ '+(lang==='bm'?'Gambar diperlukan: ':'Photos needed: ')
          +'<strong>'+missing.join(', ')+'</strong>'
          +'</div>';
      }

      // Actions
      var actionsHTML = '<div class="job-actions" style="margin-top:10px;">'
        +'<button class="btn btn-sm btn-outline" onclick="openGalleryModal(\''+c.id+'\')">'
        +'📷 '+(lang==='bm'?'Muat Naik Gambar':'Upload Photos')+'</button>';
      if(isActive) {
        if(canComplete) {
          actionsHTML += '<button class="op-complete-btn" onclick="markJobComplete(\''+c.id+'\')">'
            +'✅ '+(lang==='bm'?'Tandakan Selesai':'Mark as Complete')+'</button>';
        }
      } else {
        actionsHTML += '<span style="font-size:.78rem;color:var(--success);font-weight:700;">✅ '+(lang==='bm'?'Selesai':'Completed')+'</span>';
      }
      actionsHTML += '<button class="btn btn-sm" style="background:#fef3c7;color:#b45309;border:1px solid #fcd34d;margin-left:4px;" onclick="opCancelJob(\''+c.ref+'\')">❌ Cancel Job</button>';
      actionsHTML += '</div>';

      return '<div class="job-card op-mine '+statusClass(c.status)+'">'
        +'<div class="job-card-top"><div>'
        +'<div class="job-ref">'+c.ref+'</div>'
        +'<div class="job-name">'+c.name+'</div>'
        +'</div>'+statusBadge(c.status)+'</div>'
        +'<div class="job-prob">🔧 '+c.problem+'</div>'
        +(c.desc?'<div style="font-size:.8rem;color:var(--gray-500);margin:3px 0 6px;">💬 '+c.desc+'</div>':'')
        +locRow
        +'<div class="job-meta" style="margin-bottom:10px;">'
        +'<div class="job-meta-item">📅 '+fmtDateShort(c.prefDate)+'</div>'
        +'<div class="job-meta-item">🕐 '+c.prefTime+'</div>'
        +(c.acceptedAt?'<div class="job-meta-item">🤝 '+(lang==='bm'?'Diterima':'Accepted')+': '+c.acceptedAt.slice(11,16)+'</div>':'')
        +(c.completedAt?'<div class="job-meta-item" style="color:var(--success);">✅ '+(lang==='bm'?'Selesai':'Done')+': '+c.completedAt.slice(11,16)+'</div>':'')
        +'</div>'
        +custPhotosHTML
        +'<div class="section-divider" style="margin:10px 0 8px;opacity:.5;"></div>'
        +'<div class="op-section-hd">🏗️ '+(lang==='bm'?'Gambar Kerja Anda':'Your Work Photos')+'</div>'
        +photoSummary
        +missingWarn
        +actionsHTML
        +'</div>';
    }).join('') : '<div class="empty-state"><div class="empty-state-icon">🧰</div><p>'+t('opNoMyJobs')+'</p></div>')
    // Accepted manual jobs appended to My Jobs section
    +(myManualJobs.length ? myManualJobs.map(function(j){
      return '<div class="job-card op-mine selesai" style="border-left:3px solid #8b5cf6;">'
        +'<div class="job-card-top"><div>'
        +'<div class="job-ref" style="display:flex;align-items:center;gap:4px;">'
        +'<span>'+j.complaint_ref+'</span>'
        +'<span style="font-size:.68rem;background:#8b5cf6;color:#fff;border-radius:10px;padding:2px 7px;font-weight:700;">MANUAL</span></div>'
        +'<div class="job-name">'+(lang==='bm'?'Kerja Pentadbir':'Admin Assigned Job')+'</div>'
        +'</div>'+statusBadge(j.status)+'</div>'
        +'<div class="job-prob">🔧 '+j.job_title+'</div>'
        +'<div style="font-size:.82rem;color:var(--gray-600);margin:4px 0 8px;">📍 '+j.job_location+'</div>'
        +'<div class="job-meta"><div class="job-meta-item">📅 '+fmtDateShort(j.job_date)+'</div>'
        +'<div class="job-meta-item">🕐 '+(j.job_time||'').slice(0,5)+'</div></div>'
        +'<div class="job-actions" style="margin-top:8px;">'
        +'<button class="btn btn-sm" style="background:#fef3c7;color:#b45309;border:1px solid #fcd34d;" onclick="opCancelJob(\''+j.complaint_ref+'\')">❌ Cancel Job</button>'
        +'</div>'
        +'</div>';
    }).join('') : '')
    +'</div>';

  setHTML('d-recent-list', newJobsHTML + myJobsHTML);

  // Collapse to single-column and hide the notif card (operator doesn't need it here)
  var staffCard = el('d-staff-card');
  if(staffCard) staffCard.style.display = 'none';
  var dashCols = document.querySelector('.dash-cols');
  if(dashCols) {
    dashCols.style.gridTemplateColumns = '1fr';
    var notifCol = el('d-notif-preview') ? el('d-notif-preview').parentElement : null;
    if(notifCol) notifCol.style.display = 'none';
  }
  setHTML('d-notif-preview','');
}

// ─── OPERATOR SCHEDULE PAGE ───────────────────────────────────────────────────
function renderOpSchedulePage() {
  // Ensure calendar state is initialised
  if(typeof opCalYear !== 'number' || typeof opCalMonth !== 'number') {
    opCalYear  = new Date().getFullYear();
    opCalMonth = new Date().getMonth();
  }
  const wrap = el('op-sched-cal');
  if(wrap) {
    try { wrap.innerHTML = buildOpCalHTML(); }
    catch(e) { wrap.innerHTML = '<div style="color:#ff7a7a;padding:16px;">⚠️ ' + e.message + '</div>'; }
  }
}

// ─── OPERATOR CALENDAR (shared builder) ───────────────────────────────────────
function buildOpCalHTML() {
  const pad = n => String(n).padStart(2,'0');
  const todayObj = new Date();
  const todayS = todayObj.toLocaleDateString('en-CA');
  const minYear = todayObj.getFullYear(); const minMonth = todayObj.getMonth() - 12;
  const maxYear = todayObj.getFullYear(); const maxMonth = todayObj.getMonth() + 12;

  // Ensure yr/mo are always valid numbers (guard against undefined from now() misuse)
  let yr = (typeof opCalYear  === 'number') ? opCalYear  : todayObj.getFullYear();
  let mo = (typeof opCalMonth === 'number') ? opCalMonth : todayObj.getMonth();
  opCalYear = yr; opCalMonth = mo; // write back if they were undefined
  const absMonth = yr*12+mo;
  const absMin   = minYear*12+minMonth;
  const absMax   = maxYear*12+maxMonth;
  const canPrev  = absMonth > absMin;
  const canNext  = absMonth < absMax;

  const monthLabel = T[lang].monthNames[mo] + ' ' + yr;
  const dowRow = T[lang].dayNamesShort.map(d=>`<div class="month-dow">${d}</div>`).join('');

  // Build byDate from all 3 sources for this month
  const byDate = {};

  // 1) work_schedule
  workSchedule.filter(e => {
    if(!e.date) return false;
    const p = e.date.split('-').map(Number);
    return p[0]===yr && p[1]-1===mo;
  }).forEach(e => {
    (byDate[e.date]=byDate[e.date]||[]).push({_src:'schedule', date:e.date, time:e.time, description:e.description||e.location, location:e.location, operator:e.staff_name||e.assignedTo, status:e.status||'Menunggu'});
  });

  // 2) complaints (pref_date / sched_date)
  complaints.forEach(c => {
    const d = c.schedDate||c.prefDate;
    if(!d) return;
    const p = d.split('-').map(Number);
    if(p[0]!==yr||p[1]-1!==mo) return;
    (byDate[d]=byDate[d]||[]).push({_src:'complaint', date:d, time:c.prefTime, description:c.problem, location:c.address, operator:c.acceptedBy||c.assignedTo||'', status:c.status, ref:c.ref});
  });

  // 3) manual jobs (job_date)
  manualJobs.forEach(j => {
    const d = j.job_date;
    if(!d) return;
    const p = d.split('-').map(Number);
    if(p[0]!==yr||p[1]-1!==mo) return;
    (byDate[d]=byDate[d]||[]).push({_src:'manual', date:d, time:j.job_time, description:j.job_title||j.job_description, location:j.job_location, operator:j.operator_name||j.operator_id||'', status:j.status});
  });

  const firstDow = new Date(yr, mo, 1).getDay();
  const dim      = new Date(yr, mo+1, 0).getDate();
  const prevDim  = new Date(yr, mo, 0).getDate();
  const totalCells = Math.ceil((firstDow + dim) / 7) * 7;

  let cellsHtml = '';
  for(let i=0;i<totalCells;i++) {
    const dayNum = i - firstDow + 1;
    let cy=yr, cm=mo, dn=dayNum, other=false;
    if(dayNum<1)       { other=true; cm=mo-1; if(cm<0){cm=11;cy--;} dn=prevDim+dayNum; }
    else if(dayNum>dim){ other=true; cm=mo+1; if(cm>11){cm=0;cy++;} dn=dayNum-dim; }
    const ds = `${cy}-${pad(cm+1)}-${pad(dn)}`;
    if(other) { cellsHtml+=`<div class="month-cell other"><div class="month-daynum">${dn}</div></div>`; continue; }

    const isToday = ds===todayS;
    const list = (byDate[ds]||[]).slice().sort((a,b)=>(a.time||'').localeCompare(b.time||''));
    let chips = '';
    list.slice(0,2).forEach(e => {
      const cls = statusClass(e.status);
      const tm  = (e.time||'').slice(0,5);
      const lbl = (e.description||'').trim();
      if(e._src==='manual') {
        chips += `<div class="job-chip" style="background:rgba(139,92,246,.15);border-left:2px solid #8b5cf6;cursor:default;" title="MANUAL: ${lbl}"><span class="jc-dot" style="background:#8b5cf6;"></span><span class="jc-txt">${tm?tm+' ':''}${lbl}</span></div>`;
      } else {
        chips += `<div class="job-chip chip-${cls}" title="${tm} ${lbl}"><span class="jc-dot"></span><span class="jc-txt">${tm?tm+' ':''}${lbl}</span></div>`;
      }
    });
    const more = list.length>2 ? `<div class="month-more">+${list.length-2} ${lang==='bm'?'lagi':'more'}</div>` : '';
    cellsHtml += `<div class="month-cell${isToday?' today':''}" onclick="openOpCalDay('${ds}')" style="cursor:pointer;">`
              +  `<div class="month-daynum">${dn}</div>${chips}${more}</div>`;
  }

  return `<div style="background:#161616;border-radius:12px;padding:16px;border:1px solid #2a2a2a;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <button onclick="opCalPrevMonth()" ${canPrev?'':'disabled'} style="background:${canPrev?'#1a1a1a':'#111'};color:${canPrev?'#e5e5e5':'#555'};border:1px solid #2a2a2a;border-radius:8px;padding:6px 14px;cursor:${canPrev?'pointer':'not-allowed'};font-size:1rem;line-height:1;">‹</button>
        <div style="font-weight:700;font-size:1rem;color:#e5e5e5;">${monthLabel}</div>
        <button onclick="opCalNextMonth()" ${canNext?'':'disabled'} style="background:${canNext?'#1a1a1a':'#111'};color:${canNext?'#e5e5e5':'#555'};border:1px solid #2a2a2a;border-radius:8px;padding:6px 14px;cursor:${canNext?'pointer':'not-allowed'};font-size:1rem;line-height:1;">›</button>
      </div>
      <div class="month-dow-row" style="margin-bottom:4px;">${dowRow}</div>
      <div class="month-grid">${cellsHtml}</div>
      <div style="display:flex;gap:14px;margin-top:14px;flex-wrap:wrap;">
        <div style="display:flex;align-items:center;gap:5px;font-size:.72rem;color:#aaa;"><div style="width:10px;height:10px;border-radius:2px;background:#f5b54a33;border-left:2px solid #f5b54a;"></div>${lang==='bm'?'Menunggu':'Pending'}</div>
        <div style="display:flex;align-items:center;gap:5px;font-size:.72rem;color:#aaa;"><div style="width:10px;height:10px;border-radius:2px;background:#5aa9ff33;border-left:2px solid #5aa9ff;"></div>${lang==='bm'?'Berjalan':'In Progress'}</div>
        <div style="display:flex;align-items:center;gap:5px;font-size:.72rem;color:#aaa;"><div style="width:10px;height:10px;border-radius:2px;background:#8fd06a33;border-left:2px solid #8fd06a;"></div>${lang==='bm'?'Selesai':'Done'}</div>
        <div style="display:flex;align-items:center;gap:5px;font-size:.72rem;color:#aaa;"><div style="width:10px;height:10px;border-radius:2px;background:rgba(139,92,246,.15);border-left:2px solid #8b5cf6;"></div>Manual</div>
      </div>
    </div>`;
}

function opCalPrevMonth() {
  opCalMonth--;
  if(opCalMonth<0){ opCalMonth=11; opCalYear--; }
  renderOpSchedulePage();
}

function opCalNextMonth() {
  opCalMonth++;
  if(opCalMonth>11){ opCalMonth=0; opCalYear++; }
  renderOpSchedulePage();
}

function openOpCalDay(ds) {
  // Gather all events for this day from all 3 sources
  const items = [];
  workSchedule.forEach(e => {
    if((e.date||'')===ds) items.push({_src:'schedule', time:e.time, description:e.description||e.location||'', location:e.location||'', operator:e.staffName||e.staffUsername||'', status:e.status||'Menunggu'});
  });
  complaints.forEach(c => {
    const d = c.schedDate||c.prefDate;
    if(d===ds) items.push({_src:'complaint', time:c.prefTime, description:c.problem+(c.name?' — '+c.name:''), location:c.address||'', operator:c.acceptedByName||c.assignedName||c.acceptedBy||c.assignedTo||'', status:c.status, ref:c.ref});
  });
  manualJobs.forEach(j => {
    if((j.job_date||'')===ds) items.push({_src:'manual', time:j.job_time, description:j.job_title||j.job_description, location:j.job_location, operator:j.operator_name||j.operator_id||'', status:j.status});
  });
  items.sort((a,b)=>(a.time||'').localeCompare(b.time||''));
  console.log('[EMUG] openOpCalDay', ds, '→', items.length, 'items:', items);

  // Format date label
  const [y,m,d] = ds.split('-').map(Number);
  const dateLabel = new Date(y,m-1,d).toLocaleDateString(lang==='bm'?'ms-MY':'en-MY',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  setTxt('sm-title','📅 '+dateLabel);

  let html = '';
  if(!items.length) {
    html = `<div class="empty-state"><div class="empty-state-icon">📭</div><p>${lang==='bm'?'Tiada jadual kerja pada tarikh ini.':'No work scheduled for this date.'}</p></div>`;
  } else {
    items.forEach(e => {
      const cls = statusClass(e.status);
      const tm = (e.time||'').slice(0,5);
      const srcBadge = e._src==='manual'
        ? `<span style="font-size:.65rem;background:#8b5cf6;color:#fff;border-radius:8px;padding:1px 7px;font-weight:700;">MANUAL</span>`
        : e._src==='complaint'
          ? `<span style="font-size:.65rem;background:#334155;color:#94a3b8;border-radius:8px;padding:1px 7px;">${e.ref||'ADUAN'}</span>`
          : `<span style="font-size:.65rem;background:#1e3a5f;color:#60a5fa;border-radius:8px;padding:1px 7px;">JADUAL</span>`;
      const borderColor = cls==='selesai'?'#8fd06a':cls==='berjalan'?'#5aa9ff':'#f5b54a';
      html += `<div style="background:#1a1a1a;border-radius:10px;padding:14px;margin-bottom:10px;border-left:3px solid ${borderColor};">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;flex-wrap:wrap;margin-bottom:8px;">
          <div style="font-weight:700;color:#e5e5e5;font-size:.9rem;">${e.description||''}</div>
          <div style="display:flex;gap:6px;align-items:center;">${srcBadge}${statusBadge(e.status)}</div>
        </div>
        ${tm?`<div style="font-size:.8rem;color:#94a3b8;margin-bottom:5px;">🕐 ${tm}</div>`:''}
        ${e.location?`<div style="font-size:.8rem;color:#94a3b8;margin-bottom:5px;">📍 ${e.location}</div>`:''}
        ${e.operator?`<div style="font-size:.8rem;color:#94a3b8;">👤 ${e.operator}</div>`:''}
      </div>`;
    });
  }
  setHTML('sm-body', html);   // modal body ID is 'sm-body', not 'sm-list'
  openModal('modal-stats');
}

// --- ACCEPT JOB (Operator) ---
function acceptJob(cid) {
  // Manual job? IDs are prefixed with 'mj-'
  if(typeof cid === 'string' && cid.startsWith('mj-')) {
    var mjId = parseInt(cid.slice(3), 10);
    var mj = manualJobs.find(function(j){ return j.id === mjId; });
    if(mj) { acceptManualJob(mj); } else { toast(lang==='bm'?'Kerja tidak dijumpai.':'Job not found.','error'); }
    return;
  }
  // Complaint job (existing logic)
  var c = complaints.find(function(x){ return x.id===cid; });
  if(!c) return;
  if(c.acceptedBy) {
    toast(lang==='bm'?'Aduan ini telah diterima oleh operator lain.':'This job was already accepted by another operator.','error');
    renderDashboard(); return;
  }
  c.acceptedBy     = user.username;
  c.acceptedByName = user.name;
  c.acceptedAt     = new Date().toISOString();
  c.status         = 'Sedang Berjalan';
  c.updatedAt      = new Date().toISOString();
  if(!galleryData[cid]) galleryData[cid] = { before:[], during:[], after:[] };
  dbUpdateComplaint(c);
  dbCreateJobFromComplaint(c);
  addNotif('assign', lang==='bm'?'Aduan Diterima Operator':'Job Accepted by Operator',
    c.ref+' — '+(lang==='bm'?'Diterima oleh ':'Accepted by ')+user.name, 'admin');
  toast(lang==='bm'?'Kerja berjaya diterima! Sila muat naik gambar Sebelum, Semasa dan Selepas.':'Job accepted! Please upload Before, During and After photos.', 'success');
  renderDashboard();
}

async function acceptManualJob(mj) {
  var ok = await dbAcceptManualJob(mj.id, user.username, user.name);
  if(ok) {
    mj.status        = 'Sedang Berjalan';
    mj.operator_id   = user.username;
    mj.operator_name = user.name;
    mj.is_pool       = false;
    addNotif('assign',
      lang==='bm'?'Kerja Manual Diterima':'Manual Job Accepted',
      mj.complaint_ref + ' — ' + (lang==='bm'?'Diterima oleh ':'Accepted by ') + user.name,
      'admin');
    toast(lang==='bm'?'Kerja berjaya diterima!':'Job accepted!', 'success');
    renderDashboard();
  } else {
    toast(lang==='bm'?'Gagal menerima kerja.':'Failed to accept job.', 'error');
  }
}

// --- OPERATOR CANCEL JOB (New Jobs section) ---
async function opCancelJob(ref) {
  if(!confirm('Cancel job ini? Aduan akan dikembalikan ke status Menunggu.')) return;
  try {
    const { error: e1 } = await db.from('complaints').update({
      status: 'Menunggu',
      assigned_to: null,
      assigned_name: null,
      accepted_by: null,
      accepted_by_name: null,
      accepted_at: null,
    }).eq('ref', ref);
    if(e1) { toast(lang==='bm'?'Gagal membatalkan job.':'Failed to cancel job.', 'error'); return; }
    const { error: e2 } = await db.from('jobs').delete().eq('complaint_ref', ref);
    if(e2) console.warn('opCancelJob jobs delete:', e2.message);
    var c = complaints.find(function(x){ return x.ref === ref; });
    if(c) {
      c.status = 'Menunggu'; c.assignedTo = null; c.assignedName = null;
      c.acceptedBy = null; c.acceptedByName = null; c.acceptedAt = null;
    }
    toast(lang==='bm'?'Job telah dibatalkan':'Job has been cancelled', 'success');
    renderOperatorDashboard();
  } catch(e) { console.error('opCancelJob:', e); toast('Error', 'error'); }
}

// --- OPERATOR DELETE COMPLAINT (New Jobs section) ---
async function opDeleteComplaint(ref) {
  if(!confirm('Padam aduan '+ref+'? Tindakan ini tidak boleh dibatalkan.')) return;
  var ok = await dbDeleteComplaint(ref);
  if(ok) {
    complaints = complaints.filter(function(c){ return c.ref !== ref; });
    toast('Aduan '+ref+' telah dipadam', 'success');
    renderOperatorDashboard();
  } else {
    toast(lang==='bm'?'Gagal memadam aduan.':'Failed to delete complaint.', 'error');
  }
}

// --- ADMIN DELETE COMPLAINT ---
async function adminDeleteComplaint(ref) {
  if(!confirm('Padam aduan '+ref+'? Tindakan ini tidak boleh dibatalkan.')) return;
  var ok = await dbDeleteComplaint(ref);
  if(ok) {
    complaints = complaints.filter(function(c){ return c.ref !== ref; });
    toast('Aduan '+ref+' telah dipadam', 'success');
    renderComplaintsList();
  } else {
    toast(lang==='bm'?'Gagal memadam aduan.':'Failed to delete complaint.', 'error');
  }
}

// --- OPERATOR DELETE JOB ---
async function operatorDeleteJob(jobId, complaintRef, isManual) {
  if(!confirm('Padam job ini? Tindakan ini tidak boleh dibatalkan.')) return;
  var id = isManual ? jobId : null;
  // For complaint jobs, find the jobs table id via complaint ref
  if(!isManual) {
    // jobId here is complaint.id (UUID), find the matching job record
    var jobRecord = null;
    try {
      var res = await db.from('jobs').select('id').eq('complaint_ref', complaintRef).eq('operator_id', user.username).single();
      if(res.data) jobRecord = res.data;
    } catch(e){}
    id = jobRecord ? jobRecord.id : null;
  }
  var ok = await dbDeleteJob(id, complaintRef, isManual);
  if(ok) {
    if(isManual) {
      manualJobs = manualJobs.filter(function(j){ return j.id !== jobId; });
    } else {
      var c = complaints.find(function(x){ return x.ref === complaintRef; });
      if(c) {
        c.status = 'Menunggu';
        c.acceptedBy = null;
        c.acceptedByName = null;
        c.acceptedAt = null;
        c.assignedTo = null;
        c.assignedName = null;
      }
    }
    toast(lang==='bm'?'Job berjaya dipadam':'Job deleted successfully', 'success');
    renderOperatorDashboard();
  } else {
    toast(lang==='bm'?'Gagal memadam job.':'Failed to delete job.', 'error');
  }
}

// --- MARK JOB COMPLETE (Operator) ---
function markJobComplete(cid) {
  var c = complaints.find(function(x){ return x.id===cid; });
  if(!c) return;
  var gd = galleryData[cid] || {};
  // Guard: all 3 photo categories required
  if(!gd.before||!gd.before.length||!gd.during||!gd.during.length||!gd.after||!gd.after.length) {
    toast(lang==='bm'
      ?'Sila muat naik gambar Sebelum, Semasa dan Selepas sebelum menandakan selesai.'
      :'Please upload Before, During and After photos before marking complete.',
      'error', 5000);
    return;
  }
  // Confirm dialog
  var confirmMsg = lang==='bm'
    ? 'Sahkan kerja ini telah selesai?\n\n'+c.ref+' — '+c.name
    : 'Confirm this job is completed?\n\n'+c.ref+' — '+c.name;
  if(!confirm(confirmMsg)) return;
  c.status         = 'Selesai';
  c.completedAt    = new Date().toISOString();
  c.updatedAt      = new Date().toISOString();
  c.photosB        = (gd.before || []).slice();
  c.photosD        = (gd.during || []).slice();
  c.photosA        = (gd.after  || []).slice();
  dbUpdateComplaint(c);
  var notifMsg = lang==='bm'
    ? 'Operator '+user.name+' telah menyelesaikan kerja '+c.ref
    : 'Operator '+user.name+' has completed job '+c.ref;
  addNotif('status', lang==='bm'?'Kerja Selesai':'Job Completed', notifMsg, 'admin');
  toast(lang==='bm'
    ?'✅ Kerja '+c.ref+' telah ditandakan selesai. Terima kasih!'
    :'✅ Job '+c.ref+' marked as complete. Thank you!',
    'success', 4000);
  buildSidebar();
  renderDashboard();
}
if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(reg => {
      // Check for a new service worker version on every page load
      reg.update();
    }).catch(() => {});
  });
}

// ─── ANIMATED STATUS CARD ────────────────────────────────────────────────────
(function initStatusCard() {
  // Wait for DOM — card may not exist if user is on /staff
  function boot() {
    const card = document.getElementById('sc-card');
    if (!card) return;

    // ── Element refs ──────────────────────────────────────────────────────
    const steps   = [1,2,3,4].map(function(n){ return document.getElementById('sc-step-'+n); });
    const circle3 = document.getElementById('sc-circle-3');
    const circle4 = document.getElementById('sc-circle-4');
    const conn3   = document.getElementById('sc-conn-3');
    const spinIcon= document.getElementById('sc-spin-icon');
    const step3sub= document.getElementById('sc-step3-sub');
    const fill    = document.getElementById('sc-fill');
    const pct     = document.getElementById('sc-pct');
    const etaVal  = document.getElementById('sc-eta-val');
    const badge   = document.getElementById('sc-badge');
    const badgeTxt= document.getElementById('sc-badge-txt');
    const dot     = document.getElementById('sc-dot');

    // ── State ────────────────────────────────────────────────────────────
    var progressRaf = null;   // rAF handle for counter
    var loopTimer   = null;   // setTimeout handle
    var resetTimer  = null;

    // ── Helpers ──────────────────────────────────────────────────────────
    function setProgress(targetPct, durationMs, onDone) {
      if (progressRaf) cancelAnimationFrame(progressRaf);
      var start = null;
      var from  = parseFloat(fill.style.width) || 0;
      function tick(ts) {
        if (!start) start = ts;
        var elapsed = ts - start;
        var t = Math.min(elapsed / durationMs, 1);
        // ease-out cubic
        var eased = 1 - Math.pow(1 - t, 3);
        var now = from + (targetPct - from) * eased;
        fill.style.width  = now.toFixed(1) + '%';
        pct.textContent   = Math.round(now) + '%';
        if (t < 1) {
          progressRaf = requestAnimationFrame(tick);
        } else {
          progressRaf = null;
          if (onDone) onDone();
        }
      }
      progressRaf = requestAnimationFrame(tick);
    }

    // ── Phase A: INITIAL state (steps 1+2 done, step 3 active, step 4 pending) ──
    function applyInitialState() {
      // Step 3 circle — active
      circle3.className = 'sc-circle sc-circle-active';
      circle3.innerHTML = '<span class="sc-spin-icon" id="sc-spin-icon">⟳</span>';
      // Step 4 circle — pending
      circle4.className = 'sc-circle sc-circle-pending';
      circle4.innerHTML = '';
      // Connector 3 — dim
      conn3.className = 'sc-connector sc-connector-dim';
      // Step 3 text
      var s3title = steps[2].querySelector('.sc-step-title');
      s3title.className = 'sc-step-title sc-step-title-active';
      step3sub.className = 'sc-step-sub sc-step-sub-active';
      step3sub.textContent = 'Pasukan dalam perjalanan...';
      // Step 4 text
      var s4title = steps[3].querySelector('.sc-step-title');
      s4title.className = 'sc-step-title sc-step-title-pending';
      // Badge
      badge.className = 'sc-badge';
      badgeTxt.textContent = 'AKTIF';
      // Progress + ETA
      fill.className = 'sc-progress-fill';
      pct.className  = 'sc-progress-pct';
      etaVal.className = 'sc-eta-val';
      etaVal.textContent = 'Hari ini, 2:30 PM';
    }

    // ── Phase B: COMPLETE state ──────────────────────────────────────────
    function applyCompleteState(onDone) {
      // Step 3 → done
      circle3.className = 'sc-circle sc-circle-done';
      circle3.innerHTML = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"><polyline points="20,6 9,17 4,12"/></svg>';
      conn3.className = 'sc-connector';
      var s3title = steps[2].querySelector('.sc-step-title');
      s3title.className = 'sc-step-title';
      step3sub.className = 'sc-step-sub';
      step3sub.textContent = 'Selesai';

      // 400ms later: step 4 → done
      loopTimer = setTimeout(function() {
        circle4.className = 'sc-circle sc-circle-done';
        circle4.innerHTML = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"><polyline points="20,6 9,17 4,12"/></svg>';
        var s4title = steps[3].querySelector('.sc-step-title');
        s4title.className = 'sc-step-title';

        // Progress to 100%
        setProgress(100, 700, function() {
          fill.className  = 'sc-progress-fill sc-progress-fill-done';
          pct.className   = 'sc-progress-pct sc-progress-pct-done';
          etaVal.className = 'sc-eta-val sc-eta-val-done';
          etaVal.textContent = 'Selesai ✓';
          badge.className = 'sc-badge sc-badge-done';
          badgeTxt.textContent = 'SELESAI';
          if (onDone) onDone();
        });
      }, 400);
    }

    // ── Staggered entrance (steps slide in from left) ─────────────────────
    function entranceAnimation(onDone) {
      steps.forEach(function(step, i) {
        if (!step) return;
        step.classList.remove('sc-visible');
        setTimeout(function() {
          step.classList.add('sc-visible');
          if (i === steps.length - 1 && onDone) {
            setTimeout(onDone, 400);
          }
        }, 120 + i * 200);
      });
    }

    // ── Full cycle ────────────────────────────────────────────────────────
    function runCycle() {
      // 1. Reset to initial state
      applyInitialState();
      fill.style.width = '0%';
      pct.textContent  = '0%';

      // 2. Entrance animation (steps stagger in)
      entranceAnimation(function() {
        // 3. Count progress bar up to 65%
        setProgress(65, 1200, function() {

          // 4. Wait 5s in "active" state
          loopTimer = setTimeout(function() {

            // 5. Trigger completion
            applyCompleteState(function() {

              // 6. Hold completed state 2s then reset
              resetTimer = setTimeout(function() {
                runCycle();
              }, 2000);
            });
          }, 5000);
        });
      });
    }

    // ── Kick off ──────────────────────────────────────────────────────────
    applyInitialState();
    // Small delay so the card CSS entrance animation finishes first
    setTimeout(runCycle, 500);
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}());

// ─── PARALLAX BANDS ──────────────────────────────────────────────────────────
// Uses scroll events + rAF to drive a CSS custom property (--pb-offset) on
// each .lp-parallax-band. This supplements the CSS background-attachment:fixed
// fallback — both can coexist because the pseudo-element uses both transform
// AND background-attachment; on mobile we force transform:none via media query.
//
// Guards: desktop-only (>768px), respects prefers-reduced-motion, no-op if
// IntersectionObserver unavailable (older browsers fall back to CSS only).
(function initParallaxBands() {
  // Bail on mobile or if user prefers reduced motion
  if (window.matchMedia('(max-width: 768px)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const bands = Array.from(document.querySelectorAll('.lp-parallax-band'));
  if (!bands.length) return;

  // Strength: how many px the photo shifts per viewport-height of scroll.
  // 0.18 = subtle. Range 0.1–0.3 feels natural.
  const STRENGTH = 0.18;

  let ticking = false;

  function updateBands() {
    const vh = window.innerHeight;
    bands.forEach(function(band) {
      const rect = band.getBoundingClientRect();
      // Progress: 0 when top of band is at bottom of viewport,
      //           1 when bottom of band is at top of viewport.
      const progress = 1 - (rect.bottom / (vh + rect.height));
      // Map to a pixel offset centred around 0
      const offset = (progress - 0.5) * vh * STRENGTH;
      band.style.setProperty('--pb-offset', offset.toFixed(2) + 'px');
    });
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateBands);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  // Run once immediately to set initial position
  updateBands();

  // Re-check on resize (e.g. window narrowed past 768px breakpoint)
  window.addEventListener('resize', function() {
    if (window.matchMedia('(max-width: 768px)').matches) {
      window.removeEventListener('scroll', onScroll);
      bands.forEach(function(b) { b.style.removeProperty('--pb-offset'); });
    }
  }, { passive: true });
}());

// ─── BOOKING CALENDAR ────────────────────────────────────────────────────────
// Teams already booked in a given date+slot. Uses fresh lightweight rows
// (bkBookings) when available, falling back to the cached complaints array.
function getSlotTeams(dateStr, slot) {
  var teams = [];
  var src = bkBookings || complaints;
  src.forEach(function(c){
    if(c.prefDate === dateStr && c.prefTime === slot) teams.push(problemTeam(c.problem));
  });
  return teams;
}

// Team of the problem type the customer is currently filling in.
// No selection yet → treat as GENERAL (strictest).
function currentBkTeam() {
  var sel = el('cf-prob');
  var p = sel ? sel.value : '';
  return p ? problemTeam(p) : 'GENERAL';
}

// A slot is full for `team` when:
//  - team is GENERAL: any existing booking blocks it (first come first serve)
//  - fixed team: an existing booking of the same team OR a GENERAL booking blocks it
function isBkSlotFull(dateStr, slot, team) {
  var teams = getSlotTeams(dateStr, slot);
  if(teams.length === 0) return false;
  if(team === 'GENERAL') return true;
  return teams.indexOf(team) !== -1 || teams.indexOf('GENERAL') !== -1;
}

function getBkDayAvailability(dateStr) {
  var d = new Date(dateStr + 'T00:00:00');
  if(d.getDay() === 0) return 'closed'; // Sunday
  var team = currentBkTeam();
  var daySlots = bkSlotsFor(dateStr);
  var fullCount = daySlots.reduce(function(acc, s){
    return acc + (isBkSlotFull(dateStr, s, team) ? 1 : 0);
  }, 0);
  if(fullCount >= daySlots.length) return 'full';
  if(fullCount >= daySlots.length * 0.6) return 'limited';
  return 'available';
}

// Fetch fresh (non-deleted) booking rows from Supabase so slot availability
// never relies on stale cached data. Minimal columns only to keep the payload
// small. Silently keeps old data on failure.
async function refreshBkComplaints() {
  try {
    const { data, error } = await db.from('complaints')
      .select('pref_date, pref_time, problem, status, is_deleted')
      .eq('is_deleted', false);
    if(!error && data) {
      bkBookings = data.map(function(r){
        return { prefDate: r.pref_date || '', prefTime: r.pref_time || '', problem: r.problem || '' };
      });
    }
  } catch(e) {
    console.error('[EMUG] refreshBkComplaints failed:', e);
  }
}

// Show/hide the booking widget depending on whether a problem type is chosen
function updateBkVisibility() {
  var hasProb = !!(el('cf-prob') && el('cf-prob').value);
  var ph = el('bk-need-prob');
  var w  = el('bk-widget');
  if(ph) ph.style.display = hasProb ? 'none' : '';
  if(w)  w.style.display  = hasProb ? '' : 'none';
  return hasProb;
}

// Skeleton shown in the slot grid while fresh availability is being fetched.
// Also disables the "Change Date" button to prevent spam clicks mid-fetch.
function renderBkSlotsLoading() {
  var grid = el('bk-slots-grid');
  if(grid) {
    var html = '<div class="bk-slots-loading-note">⏳ ' + t('bkChecking') + '</div>';
    var skelSlots = bookingDate ? bkSlotsFor(bookingDate) : BK_SLOTS_STD;
    skelSlots.forEach(function(){
      html += '<div class="bk-slot bk-slot-skel">'
        + '<span class="bk-skel-bar" style="width:70%;"></span>'
        + '<span class="bk-skel-bar" style="width:45%;"></span>'
        + '</div>';
    });
    grid.innerHTML = html;
  }
  setBkBackDisabled(true);
}

function setBkBackDisabled(disabled) {
  var btn = document.querySelector('.bk-slots-back-btn');
  if(btn) {
    btn.disabled = disabled;
    btn.style.opacity = disabled ? '.5' : '';
    btn.style.pointerEvents = disabled ? 'none' : '';
  }
}

// Refresh slot availability when the customer changes Problem Type
async function onProblemTypeChange() {
  // Category changed → previous slot choice no longer valid; reset it
  bookingSlot = null;
  el('cf-time').value = '';
  var s = el('bk-summary');
  if(s) s.style.display = 'none';
  if(!updateBkVisibility()) return;
  if(bkLoading) return;
  bkLoading = true;
  if(bookingDate) renderBkSlotsLoading();
  await refreshBkComplaints();
  bkLoading = false;
  setBkBackDisabled(false);
  renderBkCalendar();
  if(bookingDate) renderBkSlots(bookingDate);
}

function initBookingCalendar() {
  var today = new Date();
  bkYear = today.getFullYear();
  bkMonth = today.getMonth();
  bookingDate = null;
  bookingSlot = null;
  el('cf-date').value = '';
  el('cf-time').value = '';
  var slotsWrap = el('bk-slots-wrap');
  var calWrap   = el('bk-cal-wrap');
  var summary   = el('bk-summary');
  if(slotsWrap) slotsWrap.style.display = 'none';
  if(calWrap)   calWrap.style.display   = '';
  if(summary)   summary.style.display   = 'none';
  updateBkVisibility();
  renderBkCalendar();
}

function bookingNavMonth(dir) {
  bkMonth += dir;
  if(bkMonth > 11) { bkMonth = 0; bkYear++; }
  if(bkMonth < 0)  { bkMonth = 11; bkYear--; }
  renderBkCalendar();
}

function renderBkCalendar() {
  var monthNames = t('monthNames');
  var dayNamesShort = lang === 'bm'
    ? ['Isn','Sel','Rab','Kha','Jum','Sab','Ahd']
    : ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  var lbl = el('bk-month-label');
  if(lbl) lbl.textContent = monthNames[bkMonth] + ' ' + bkYear;

  // Day headers (Mon–Sun)
  var daysEl = el('bk-cal-days');
  if(daysEl) {
    daysEl.innerHTML = dayNamesShort.map(function(d){
      return '<div class="bk-day-hdr">' + d + '</div>';
    }).join('');
  }

  // Grid
  var gridEl = el('bk-cal-grid');
  if(!gridEl) return;
  var today = new Date();
  today.setHours(0,0,0,0);
  var firstDay = new Date(bkYear, bkMonth, 1);
  var offset = (firstDay.getDay() + 6) % 7; // Monday first
  var daysInMonth = new Date(bkYear, bkMonth + 1, 0).getDate();
  var html = '';
  // Empty cells before first day
  for(var i = 0; i < offset; i++) html += '<div class="bk-day bk-day-empty"></div>';
  for(var d = 1; d <= daysInMonth; d++) {
    var dateStr = bkYear + '-' + String(bkMonth+1).padStart(2,'0') + '-' + String(d).padStart(2,'0');
    var dayObj  = new Date(bkYear, bkMonth, d);
    var isPast  = dayObj < today;
    var isSun   = dayObj.getDay() === 0;
    var isSel   = dateStr === bookingDate;
    var avail   = (!isPast && !isSun) ? getBkDayAvailability(dateStr) : (isSun ? 'closed' : 'past');
    var cls = 'bk-day';
    if(isPast || isSun) cls += ' bk-day-disabled';
    else cls += ' bk-day-active';
    if(isSel) cls += ' bk-day-selected';
    var dotCls = avail === 'available' ? 'bk-dot green' : avail === 'limited' ? 'bk-dot orange' : 'bk-dot grey';
    var onclick = (!isPast && !isSun) ? 'onclick="selectBkDate(\'' + dateStr + '\')"' : '';
    html += '<div class="' + cls + '" ' + onclick + '>'
      + '<span class="bk-day-num">' + d + '</span>'
      + ((!isPast && !isSun) ? '<span class="' + dotCls + '"></span>' : '')
      + '</div>';
  }
  gridEl.innerHTML = html;
}

async function selectBkDate(dateStr) {
  if(bkLoading) return;
  bookingDate = dateStr;
  bookingSlot = null;
  el('cf-date').value = dateStr;
  el('cf-time').value = '';
  el('bk-cal-wrap').style.display = 'none';
  el('bk-slots-wrap').style.display = '';
  el('bk-summary').style.display = 'none';
  // Show skeleton immediately, then swap in real availability once fetched
  var d = new Date(dateStr + 'T00:00:00');
  var dateLbl = el('bk-slots-date-label');
  if(dateLbl) dateLbl.textContent = t('dayNames')[d.getDay()] + ', ' + d.getDate() + ' ' + t('monthNames')[d.getMonth()] + ' ' + d.getFullYear();
  renderBkSlotsLoading();
  bkLoading = true;
  await refreshBkComplaints();
  bkLoading = false;
  setBkBackDisabled(false);
  renderBkCalendar();
  renderBkSlots(dateStr);
}

function renderBkSlots(dateStr) {
  var team    = currentBkTeam();
  var d       = new Date(dateStr + 'T00:00:00');
  var months  = t('monthNames');
  var dayNamesL = t('dayNames');
  var dayLabel = dayNamesL[d.getDay()] + ', ' + d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
  var dateLbl = el('bk-slots-date-label');
  if(dateLbl) dateLbl.textContent = dayLabel;
  var grid = el('bk-slots-grid');
  if(!grid) return;
  var html = '';
  bkSlotsFor(dateStr).forEach(function(slot) {
    var full = isBkSlotFull(dateStr, slot, team);
    var rem  = full ? 0 : BK_MAX_PER_SLOT;
    var isSel = slot === bookingSlot;
    var cls = 'bk-slot' + (full ? ' bk-slot-full' : '') + (isSel ? ' bk-slot-selected' : '');
    var sublbl = full ? t('bkSlotFull') : rem + ' ' + t('bkSlotAvail');
    var onclick = !full ? 'onclick="selectBkSlot(\'' + slot.replace(/'/g,"\\'") + '\')"' : '';
    html += '<div class="' + cls + '" ' + onclick + '>'
      + '<span class="bk-slot-time">' + slot + '</span>'
      + '<span class="bk-slot-avail">' + sublbl + '</span>'
      + '</div>';
  });
  grid.innerHTML = html;
}

function selectBkSlot(slot) {
  if(bkLoading) return;
  if(isBkSlotFull(bookingDate, slot, currentBkTeam())) {
    toast(t('bkFull'), 'error', 4000); return;
  }
  bookingSlot = slot;
  el('cf-time').value = slot;
  renderBkSlots(bookingDate);
  renderBkSummary();
}

function renderBkSummary() {
  var s = el('bk-summary');
  if(!s) return;
  if(!bookingDate || !bookingSlot) { s.style.display='none'; return; }
  var d = new Date(bookingDate + 'T00:00:00');
  var months = t('monthNames');
  var dayNamesL = t('dayNames');
  var dateDisp = dayNamesL[d.getDay()] + ', ' + d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
  s.style.display = '';
  s.innerHTML = '<div class="bk-summary-inner">'
    + '<div class="bk-summary-title">✅ ' + t('bkSummaryLbl') + '</div>'
    + '<div class="bk-summary-row"><span>' + t('bkSummaryDate') + ':</span><strong>' + dateDisp + '</strong></div>'
    + '<div class="bk-summary-row"><span>' + t('bkSummaryTime') + ':</span><strong>' + bookingSlot + '</strong></div>'
    + '</div>';
}

function bookingBackToCalendar() {
  if(bkLoading) return;
  el('bk-slots-wrap').style.display = 'none';
  el('bk-cal-wrap').style.display   = '';
  renderBkCalendar();
}

// ─── BACK/FORWARD BUTTON ─────────────────────────────────────────────────────
window.addEventListener('popstate', function() {
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const isStaff = path === '/staff' || path === '/admin';
  if(isStaff) {
    if(user) { showAppSection(); }
    else { showLoginPage(); }
  } else {
    showPubPage('landing');
  }
});

// ─── INIT ─────────────────────────────────────────────────────────────────────
(async function init() {
  // Apply language immediately so loading overlay text is correct
  const lbl = lang==='bm'?'EN':'BM';
  document.querySelectorAll('#pub-lang-btn,#login-lang-btn,#app-lang-btn').forEach(b=>b.textContent=lbl);

  showLoading(lang==='bm'?'Memuatkan sistem...':'Loading system...');
  try {
    // Race dbLoad() against a hard 8s wall-clock timeout.
    // dbLoad() itself throws immediately if it detects an HTML response (paused project).
    await Promise.race([
      dbLoad(),
      new Promise((_, reject) => setTimeout(() => reject(
        new Error(lang === 'bm'
          ? 'Sambungan tamat masa — sistem dimuat tanpa data pangkalan data'
          : 'Connection timed out — loading without database data')
      ), 8000))
    ]);
    hideLoading();
  } catch(e) {
    console.error('[EMUG] Database connection error:', e.message);
    // Show friendly error on the loading screen; user can dismiss manually
    showLoadingError(e.message);
    // Auto-dismiss after 4s so the page still boots
    await new Promise(resolve => setTimeout(resolve, 4000));
    hideLoading();
  }

  setLang(lang);
  initComplaintForm();

  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const isStaff = path === '/staff' || path === '/admin';

  // Try to restore a saved session (relevant when staff refresh the page)
  try {
    const saved = localStorage.getItem('emug_session');
    if(saved) {
      const u = JSON.parse(saved);
      // Check hardcoded USERS first, then dynamic staff (loaded earlier in dbLoad)
      let found = USERS.find(x=>x.username===u.username && x.role===u.role)
               || dynamicStaff.find(x=>x.username===u.username && x.role===u.role);
      // Fallback: reconstruct minimal user object from stored session data
      // (covers edge case where dynamic staff record changed but session is still valid)
      if(!found && u.username && u.role && u.name) {
        found = { username:u.username, role:u.role, name:u.name, staffId:u.staffId||'', password:'' };
      }
      if(found && isStaff) { user=found; initApp(); return; }
    }
  } catch(e){ console.error('[EMUG] Session restore error:', e); }

  // No valid session — route by URL
  if(isStaff) {
    el('pub-nav').style.display = 'none';
    el('page-login').style.display = 'block';
    el('page-app').classList.remove('active');
    document.querySelectorAll('.pub-page').forEach(p=>p.classList.remove('active'));
  } else {
    showPubPage('landing');
  }
})();
