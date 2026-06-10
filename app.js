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
    // Operator role
    role_operator:'Operator Lapangan',
    opDashTitle:'Papan Pemuka Operator',opDashSub:'Pengurusan kerja pasukan lapangan',
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
    fbRate:'Beri Penilaian',
    // Operator role
    role_operator:'Operator Lapangan',
    opDashTitle:'Papan Pemuka Operator',opDashSub:'Pengurusan kerja pasukan lapangan',
    opNewJobs:'Aduan Baru',opMyJobs:'Kerja Saya',
    opAcceptJob:'Terima Kerja',opCompleteJob:'Kerja Selesai',
    opNoNewJobs:'Tiada aduan baru pada masa ini.',opNoMyJobs:'Tiada kerja yang diterima lagi.',
    opAccepted:'Diterima',opAcceptedBy:'Diterima Oleh',opAcceptedAt:'Masa Terima',
    opCompletedAt:'Masa Selesai',opOperator:'Operator',
    opCompleteWarn:'Sila muat naik sekurang-kurangnya 1 gambar setiap kategori (Sebelum, Semasa, Selepas) sebelum menandakan kerja selesai.',
    opPhotosRequired:'Gambar Sebelum / Semasa / Selepas diperlukan',
    // Customer complaint photos
    custPhotos:'Gambar Aduan Pelanggan',noCustPhotos:'Tiada gambar dilampirkan.',
    // Completion photos on track page
    completionGallery:'Gambar Penyelesaian Kerja',noGalleryPhotos:'Gambar belum dimuat naik.',
    trOperator:'Operator',trAccepted:'Kerja Diterima',trCompleted:'Kerja Diselesaikan',
    fbaTitle:'Feedback Management',fbaSub:'Review and manage customer feedback',
    fbaListTitle:'All Reviews',fbaPublish:'Publish',fbaUnpublish:'Unpublish',
    fbaPublished:'published',
    fbaQuality:'Quality',fbaTimeliness:'Timeliness',fbaService:'Service',fbaOverall:'Overall',
    fbRate:'Rate Our Service',
    // Operator role
    role_operator:'Field Operator',
    opDashTitle:'Operator Dashboard',opDashSub:'Field team job management',
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
let lastConfirmRef = null;
let notifOpen = false;
let userDDOpen = false;
// Media upload state
let uploadedFiles = [];
// Location state
let pinnedLat = null, pinnedLng = null;
// Gallery state
let galleryJobId = null;
let galleryTab = 'before';
let fullscreenImages = [], fullscreenIdx = 0;
// Star ratings state
let starRatings = { quality:0, timeliness:0, service:0 };
// Gallery data: { ref: { before:[{src,ts,who}], during:[...], after:[...] } }
let galleryData = {};
// Booking calendar
const BK_SLOTS = ['08:00 - 09:00','09:00 - 10:00','10:00 - 11:00','11:00 - 12:00','13:00 - 14:00','14:00 - 15:00','15:00 - 16:00','16:00 - 17:00'];
const BK_MAX_PER_SLOT = 3;
let bkYear = 0, bkMonth = 0, bookingDate = null, bookingSlot = null;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const USERS = [
  { id:1, username:'sheqal@emanutama', password:'emanutama14', name:'MOHAMMAD SHEQAL BIN SALIMAN', role:'admin',    phone:'', email:'sheqal@emanutama.com',  staffId:'ADM001' },
  { id:2, username:'awang@emanutama',  password:'emanutama14', name:'AWANG OTHMAN BIN AWANG AHMAD', role:'operator', phone:'', email:'awang@emanutama.com',   staffId:'OPR001' },
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
  setTxt('dp-d-title',t('dashboard')); setTxt('dp-d-sub','Selamat datang! Ini ringkasan sistem hari ini.');
  setTxt('d-recent-lbl',t('recentComplaints')); setTxt('d-view-all',t('viewAll'));
  setTxt('d-notif-lbl',t('notifications')); setTxt('d-staff-lbl',t('staffOverview'));
  setTxt('d-th-name',t('staff')||'Nama'); setTxt('d-th-today',t('todayJobs'));
  setTxt('d-th-pend',t('pending')); setTxt('d-th-prog',t('inProgress')); setTxt('d-th-done',t('completed'));
  setTxt('cp-title',t('complaints')); setTxt('cp-sub',t('noJobs').replace('Tiada','Semua').replace('No complaints found.','All complaints received'));
  setTxt('sc-title',t('schedule')); setTxt('sc-sub','Lihat jadual kerja harian/mingguan');
  setTxt('sc-tab-day',t('day')); setTxt('sc-tab-week',t('week')); setTxt('sc-today',t('today'));
  setTxt('sf-title',t('staff')); setTxt('rp-title',t('reports'));
  setTxt('rp-status-lbl','Status Kerja'); setTxt('rp-type-lbl','Jenis Masalah');
  setTxt('rp-all-lbl','Semua Rekod');
  setTxt('rp-th-ref','No. Rujukan'); setTxt('rp-th-cust',t('recentComplaints').split(' ')[1]||'Pelanggan');
  setTxt('rp-th-prob','Masalah'); setTxt('rp-th-staff',t('staff'));
  setTxt('rp-th-date','Tarikh'); setTxt('nt-title',t('notifications'));
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
    media:          row.media          || [],
    submittedAt:    row.submitted_at   || '',  // Supabase: submitted_at → JS: submittedAt
    updatedAt:      row.updated_at     || '',  // Supabase: updated_at → JS: updatedAt
    acceptedBy:     row.accepted_by    || '',  // Supabase: accepted_by → JS: acceptedBy
    acceptedByName: row.accepted_by_name || '', // Supabase: accepted_by_name → JS: acceptedByName
    acceptedAt:     row.accepted_at    || '',  // Supabase: accepted_at → JS: acceptedAt
    completedAt:    row.completed_at   || '',  // Supabase: completed_at → JS: completedAt
    photosB:        row.photos_before  || [],  // Supabase: photos_before → JS: photosB
    photosD:        row.photos_during  || [],  // Supabase: photos_during → JS: photosD
    photosA:        row.photos_after   || [],  // Supabase: photos_after  → JS: photosA
  };
}

// JS complaint object → Supabase row (for INSERT and UPDATE)
// Note: 'id' is excluded — it is auto-generated by Supabase
function complaintToRow(c) {
  return {
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
    media:            c.media        || [],
    submitted_at:     c.submittedAt  || new Date().toISOString(), // JS: submittedAt → Supabase: submitted_at
    updated_at:       c.updatedAt    || new Date().toISOString(), // JS: updatedAt → Supabase: updated_at
    accepted_by:      c.acceptedBy   || null,  // JS: acceptedBy → Supabase: accepted_by
    accepted_by_name: c.acceptedByName || null, // JS: acceptedByName → Supabase: accepted_by_name
    accepted_at:      c.acceptedAt   || null,  // JS: acceptedAt → Supabase: accepted_at
    completed_at:     c.completedAt  || null,  // JS: completedAt → Supabase: completed_at
    photos_before:    c.photosB      || [],    // JS: photosB → Supabase: photos_before
    photos_during:    c.photosD      || [],    // JS: photosD → Supabase: photos_during
    photos_after:     c.photosA      || [],    // JS: photosA → Supabase: photos_after
  };
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
    const { data, error } = await db.from('complaints').select('*');
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
      complaints.forEach(function(c) {
        if(!c.ref) return;
        const m = c.ref.match(/(\d+)$/);
        if(m) { const n = parseInt(m[1]); if(n >= refCounter) refCounter = n + 1; }
      });
      console.log('[EMUG] complaints loaded:', complaints.length);
    }
  } catch(e) { console.error('[EMUG] dbLoad complaints exception:', e); }

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

async function dbDeleteComplaint(ref) {
  try {
    const { error } = await db.from('complaints').delete().eq('ref', ref);
    if(error) console.error('dbDeleteComplaint:', error.message);
  } catch(e) { console.error('dbDeleteComplaint:', e); }
}

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
    const { data, error } = await db.from('work_schedule').select('*').order('job_date').order('job_time');
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
      .select('*').eq('job_type','manual').order('created_at', { ascending: false });
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
    const { error } = await db.from('work_schedule').delete().eq('id', id);
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
  initBookingCalendar();
}

async function submitComplaint() {
  const name    = el('cf-name').value.trim();
  const phone   = el('cf-phone').value.trim();
  const address = el('cf-addr').value.trim();
  const problem = el('cf-prob').value;
  const date    = el('cf-date').value;
  const time    = el('cf-time').value;
  const desc    = el('cf-desc').value.trim();
  const urgency = el('cf-urgency').value;

  if(!name||!phone||!address||!problem||!date||!time) {
    if(!date||!time) toast(t('bkPleaseSlot'),'error');
    else toast(lang==='bm'?'Sila isi semua maklumat wajib (*)':'Please fill all required fields (*).','error');
    return;
  }
  if(complaints.filter(x=>x.prefDate===date&&x.prefTime===time).length >= BK_MAX_PER_SLOT) {
    toast(t('bkFull'),'error',5000); return;
  }

  const year = new Date().getFullYear();
  const ref  = `EMUG-${year}-${String(refCounter).padStart(4,'0')}`;

  const c = {
    id: ref,
    ref, name, phone, address, problem, desc, urgency,
    prefDate:date, prefTime:time||'—',
    status:'Menunggu', assignedTo:'', assignedName:'',
    schedDate:'', adminNotes:'', techNotes:'',
    coords: (pinnedLat&&pinnedLng)?{lat:pinnedLat,lng:pinnedLng}:null,
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
    `${ref} — ${name} (${problem}${urgency==='Segera'?' 🚨':''})`, 'admin');

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
  const found = USERS.find(x=>x.username===u && x.password===p);
  if(!found) {
    el('login-error').classList.add('show');
    setTxt('login-error-msg', t('liError'));
    el('login-pass').value='';
    return;
  }
  user = found;
  localStorage.setItem('emug_session', JSON.stringify({ username: found.username, role: found.role }));
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
  el('sb-role').textContent = user.role==='admin'?t('role_admin'):user.role==='operator'?t('role_operator'):t('role_staff');
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
  ] : user.role==='operator' ? [
    { pg:'dashboard',    icon:'🏗️', lbl:t('opDashTitle') },
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
  }
}

// ─── DATA HELPERS ─────────────────────────────────────────────────────────────
function myComplaints() {
  if(!user) return [];
  if(user.role==='admin') return complaints;
  if(user.role==='operator') return complaints.filter(c=>c.acceptedBy===user.username);
  return complaints.filter(c=>c.assignedTo===user.username);
}
function myWorkSchedule() {
  if(!user) return [];
  if(user.role==='admin') return workSchedule;
  return workSchedule.filter(e=>e.staffUsername===user.username);
}
function availableJobs() {
  return complaints.filter(c=>!c.acceptedBy && c.status==='Menunggu');
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
  if(user.role==='operator') { renderOperatorDashboard(); return; }
  // Restore 2-col layout for admin/staff (operator may have collapsed it)
  var dashCols = document.querySelector('.dash-cols');
  if(dashCols) {
    dashCols.style.gridTemplateColumns = '';
    var notifCol = el('d-notif-preview') ? el('d-notif-preview').parentElement : null;
    if(notifCol) notifCol.style.display = '';
  }
  el('dp-d-date').textContent = fmtDate(now());
  const mc = myComplaints();
  const todayC = mc.filter(c=>c.schedDate===now()||c.prefDate===now());
  const pend  = mc.filter(c=>c.status==='Menunggu');
  const prog  = mc.filter(c=>c.status==='Sedang Berjalan');
  const done  = mc.filter(c=>c.status==='Selesai');

  const statsAdmin = `
    <div class="stat-card c-danger" style="cursor:pointer;" onclick="openStatModal('all')"><div class="stat-icon-box si-red">📋</div><div class="stat-value">${mc.length}</div><div class="stat-label">${t('totalJobs')}</div><div class="stat-action">Lihat semua →</div></div>
    <div class="stat-card c-warn" style="cursor:pointer;" onclick="openStatModal('Menunggu')"><div class="stat-icon-box si-warn">⏳</div><div class="stat-value">${pend.length}</div><div class="stat-label">${t('pending')}</div><div class="stat-action">Tugaskan →</div></div>
    <div class="stat-card c-info" style="cursor:pointer;" onclick="openStatModal('Sedang Berjalan')"><div class="stat-icon-box si-blue">🔄</div><div class="stat-value">${prog.length}</div><div class="stat-label">${t('inProgress')}</div><div class="stat-action">Pantau →</div></div>
    <div class="stat-card c-success" style="cursor:pointer;" onclick="openStatModal('Selesai')"><div class="stat-icon-box si-green">✅</div><div class="stat-value">${done.length}</div><div class="stat-label">${t('completed')}</div><div class="stat-action">Lihat laporan →</div></div>
    <div class="stat-card c-lime" style="cursor:pointer;" onclick="openStatModal('today')"><div class="stat-icon-box si-lime">📅</div><div class="stat-value">${todayC.length}</div><div class="stat-label">${t('todayJobs')}</div><div class="stat-action">Jadual hari ini →</div></div>
    <div class="stat-card c-navy"><div class="stat-icon-box si-navy">👷</div><div class="stat-value">${USERS.filter(u=>u.role==='staff').length}</div><div class="stat-label">${t('totalStaff')}</div></div>`;
  const statsStaff = `
    <div class="stat-card c-danger" style="cursor:pointer;" onclick="openStatModal('all')"><div class="stat-icon-box si-red">📋</div><div class="stat-value">${mc.length}</div><div class="stat-label">${t('myComplaints')}</div><div class="stat-action">Lihat semua →</div></div>
    <div class="stat-card c-lime" style="cursor:pointer;" onclick="openStatModal('today')"><div class="stat-icon-box si-lime">📅</div><div class="stat-value">${todayC.length}</div><div class="stat-label">${t('todayJobs')}</div><div class="stat-action">Jadual hari ini →</div></div>
    <div class="stat-card c-warn" style="cursor:pointer;" onclick="openStatModal('Menunggu')"><div class="stat-icon-box si-warn">⏳</div><div class="stat-value">${pend.length}</div><div class="stat-label">${t('pending')}</div><div class="stat-action">Kemaskini →</div></div>
    <div class="stat-card c-success" style="cursor:pointer;" onclick="openStatModal('Selesai')"><div class="stat-icon-box si-green">✅</div><div class="stat-value">${done.length}</div><div class="stat-label">${t('completed')}</div><div class="stat-action">Lihat laporan →</div></div>`;
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

  // Today's schedule
  if(el('d-today-sched')) {
    const todaySched = myWorkSchedule().filter(e=>e.date===new Date().toLocaleDateString('en-CA'))
      .sort((a,b)=>(a.time||'').localeCompare(b.time||''));
    setHTML('d-today-sched', todaySched.length ? todaySched.map(e=>`
      <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--gray-100);">
        <span style="background:var(--navy);color:var(--white);font-size:.68rem;font-weight:700;padding:2px 7px;border-radius:8px;flex-shrink:0;white-space:nowrap;">${(e.time||'').slice(0,5)||'—'}</span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:.82rem;font-weight:600;color:var(--gray-900);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${e.description||''}</div>
          <div style="font-size:.72rem;color:var(--gray-500);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">👷 ${e.staffName||''} · 📍 ${e.location||''}</div>
        </div>
        ${statusBadge(e.status)}
      </div>`).join('')
      : `<div class="empty-state" style="padding:20px 0;"><div class="empty-state-icon">🗓️</div><p style="font-size:.82rem;">Tiada jadual hari ini</p></div>`);
  }

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
    const ms = !q||c.name.toLowerCase().includes(q)||c.ref.toLowerCase().includes(q)||c.problem.toLowerCase().includes(q)||(c.assignedName||'').toLowerCase().includes(q);
    return mf&&ms;
  }).sort((a,b)=>b.submittedAt.localeCompare(a.submittedAt));

  // Manual jobs from jobs table
  const mjVisible = user.role==='operator'
    ? manualJobs.filter(j=>j.is_pool||j.operator_id===user.username)
    : manualJobs; // admin / staff sees all
  const mjList = mjVisible.filter(j=>{
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
    return `<div class="cp-card ${statusClass(c.status)}">
      <div class="cp-card-top">
        <div class="cp-id-wrap">
          <div class="cp-ref">${c.ref}${urgIcon}</div>
          <div class="cp-name">${c.name}</div>
        </div>
        ${statusBadge(c.status)}
      </div>
      <div class="cp-tags">
        <span class="cp-tag"><span class="cp-tag-ic">🔧</span><span class="cp-tag-txt">${c.problem}</span></span>
        ${c.desc?`<span class="cp-tag"><span class="cp-tag-ic">💬</span><span class="cp-tag-txt">${c.desc}</span></span>`:''}
        ${c.media&&c.media.length?`<span class="cp-tag"><span class="cp-tag-ic">📷</span><span class="cp-tag-txt">${c.media.length}</span></span>`:''}
      </div>
      <div class="cp-meta">
        <div class="cp-meta-item"><span class="cp-meta-ic">📞</span>${c.phone}</div>
        <div class="cp-meta-item"><span class="cp-meta-ic">📅</span>${fmtDateShort(c.prefDate)}</div>
        <div class="cp-meta-item"><span class="cp-meta-ic">🕐</span>${c.prefTime}</div>
        ${assigned
          ? `<div class="cp-meta-item"><span class="cp-meta-ic">🧑‍🔧</span>${lang==='bm'?'Ditugaskan':'Assigned'}: ${c.assignedName}</div>`
          : `<div class="cp-meta-item cp-warn"><span class="cp-meta-ic">⚠️</span>${t('notAssigned')}</div>`}
        ${c.acceptedByName?`<div class="cp-meta-item"><span class="cp-meta-ic">🧰</span>${c.acceptedByName}</div>`:''}
      </div>
      <div class="cp-actions">
        ${isAdmin?`<button class="cp-btn cp-btn-sec" onclick="openJobModal('${c.id}')">✏️ ${t('editComplaint')}</button>`:''}
        <button class="cp-btn cp-btn-sec" onclick="openGalleryModal('${c.id}')">🖼️ ${t('galleryView')}</button>
        <button class="cp-btn cp-btn-pri" onclick="openStatusModal('${c.id}')">🔄 ${t('updateStatus')}</button>
        ${c.coords?`<a class="cp-btn cp-btn-sec" href="https://www.google.com/maps?q=${c.coords.lat},${c.coords.lng}" target="_blank" rel="noopener" style="text-decoration:none;">🗺️ ${lang==='bm'?'Peta':'Map'}</a>`:''}
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
  setHTML('sm-body', list.length ? list.map(c=>`
    <div style="padding:12px 0;border-bottom:1px solid var(--gray-100);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
        <span style="font-weight:700;font-size:.9rem;">${c.ref}</span>
        ${statusBadge(c.status)}
      </div>
      <div style="font-size:.82rem;color:var(--gray-700);margin-bottom:2px;">🔧 ${c.problem}${c.desc?` · <span style="color:var(--gray-500);">${c.desc}</span>`:''}</div>
      <div style="font-size:.78rem;color:var(--gray-500);">📍 ${c.address.split(',').slice(-3).join(',').trim()}</div>
    </div>`).join('')
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

// ─── JOB MODAL ────────────────────────────────────────────────────────────────
function openJobModal(cid) {
  editJobId = cid;
  const c = complaints.find(x=>x.id===cid);
  if(!c) return;
  setTxt('mj-title', `📋 ${t('editComplaint')} — ${c.ref}`);
  setTxt('mj-cust-name', c.name);
  setTxt('mj-cust-phone', c.phone);
  setTxt('mj-prob', c.problem + (c.urgency==='Segera'?' 🚨':''));
  setTxt('mj-desc', c.desc||'—');
  setTxt('mj-date', fmtDate(c.prefDate));
  setTxt('mj-time', c.prefTime);
  // Build assign dropdown dynamically
  const assignEl = el('mj-assign');
  if(assignEl) {
    const allStaff = USERS.filter(u=>u.role==='staff'||u.role==='operator');
    assignEl.innerHTML = `<option value="">-- ${t('unassigned')} --</option>`
      + allStaff.map(u=>`<option value="${u.username}">${u.name} (${u.role==='operator'?t('role_operator'):t('role_staff')})</option>`).join('');
    assignEl.value = c.assignedTo||'';
  }
  el('mj-status').value    = c.status;
  el('mj-sched-date').value = c.schedDate||c.prefDate;
  el('mj-notes').value     = c.adminNotes||'';
  // ── SECTION 1: Customer complaint photos (amber header) ────────────────────
  const cpEl = el('mj-cust-photos');
  if(cpEl) {
    const hdr = `<div style="background:linear-gradient(135deg,#d97706,#b45309);color:white;padding:9px 14px;font-size:.78rem;font-weight:700;letter-spacing:.4px;text-transform:uppercase;">
      📷 ${lang==='bm'?'Gambar Aduan Pelanggan':'Customer Complaint Photos'}
    </div>`;
    if(c.media && c.media.length) {
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
  c.assignedTo   = el('mj-assign').value;
  c.status       = el('mj-status').value;
  c.schedDate    = el('mj-sched-date').value;
  c.adminNotes   = el('mj-notes').value;
  c.updatedAt    = new Date().toISOString();
  const au = USERS.find(u=>u.username===c.assignedTo);
  c.assignedName = au ? au.name : '';

  if(c.assignedTo && c.assignedTo!==prevAssign) {
    addNotif('assign', t('notifAssigned'), `${c.ref} — ${c.problem} di ${c.address.split(',')[0]}`, 'staff', c.assignedTo);
  }
  dbUpdateComplaint(c);
  closeModal('modal-job');
  toast(t('saved'), 'success');
  renderComplaints();
  buildSidebar();
}

function deleteComplaint() {
  if(!confirm(t('confirmDelete'))) return;
  const delRef = (complaints.find(x=>x.id===editJobId)||{}).ref;
  complaints = complaints.filter(x=>x.id!==editJobId);
  if(delRef) dbDeleteComplaint(delRef);
  closeModal('modal-job');
  toast(t('deleted'), 'info');
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
  c.status    = el('ms-status').value;
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

// ─── SCHEDULE (FULL MONTH CALENDAR) ──────────────────────────────────────────
let schedYear, schedMonth;   // currently-viewed month (0-based month)

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
  // 1) work_schedule entries
  myWorkSchedule().forEach(e => {
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
  // 3) manual jobs — use job_date
  const visManual = user.role==='admin' ? manualJobs
    : manualJobs.filter(j=>j.is_pool||j.operator_id===user.username);
  visManual.forEach(j=>{
    const d = j.job_date;
    if(!d) return;
    const p = d.split('-').map(Number);
    if(p[0]!==schedYear||p[1]-1!==schedMonth) return;
    (byDate[d]=byDate[d]||[]).push({ _src:'manual', date:d, time:j.job_time, description:j.job_title||j.job_description, status:j.status, id:j.id });
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
        chips += `<div class="job-chip chip-${cls}" onclick="event.stopPropagation();openSchedDetail('${e.id}')" title="${tm} ${lbl}">`
              +  `<span class="jc-dot"></span><span class="jc-txt">${tm?tm+' ':''}${lbl}</span></div>`;
      } else if(e._src==='complaint') {
        const handler = user.role==='admin' ? `openJobModal('${e.id}')` : '';
        chips += `<div class="job-chip chip-${cls}" style="opacity:.85;${handler?'cursor:pointer;':''}" onclick="event.stopPropagation();${handler}" title="${e.ref}: ${lbl}">`
              +  `<span class="jc-dot"></span><span class="jc-txt">${tm?tm+' ':''}${e.ref}</span></div>`;
      } else { // manual
        chips += `<div class="job-chip" style="background:rgba(139,92,246,.15);border-left:2px solid #8b5cf6;" onclick="event.stopPropagation();" title="MANUAL: ${lbl}">`
              +  `<span class="jc-dot" style="background:#8b5cf6;"></span><span class="jc-txt">${tm?tm+' ':''}${lbl}</span></div>`;
      }
    });
    const more = list.length>2 ? `<div class="month-more">+${list.length-2} ${lang==='bm'?'lagi':'more'}</div>` : '';

    html += `<div class="month-cell${isToday?' today':''}" onclick="addSchedOn('${ds}')">`
         +  `<div class="month-daynum">${dn}</div>${chips}${more}</div>`;
  }
  setHTML('sc-month-grid', html);
}

// ─── SCHEDULE ADD MODAL ───────────────────────────────────────────────────────
function openSchedAddModal() {
  schedEditId = null;
  const staffList = USERS.filter(u=>u.role==='staff'||u.role==='operator');
  const staffOpts = staffList.map(u=>`<option value="${u.username}" data-name="${u.name}">${u.name}</option>`).join('');
  el('sa-staff').innerHTML = `<option value="">-- ${t('staff')} --</option>${staffOpts}`;
  el('sa-date').value = schedDate.toLocaleDateString('en-CA');
  el('sa-time').value = '';
  el('sa-location').value = '';
  el('sa-desc').value = '';
  setTxt('sa-title', `🗓️ ${t('addSchedule')}`);
  setTxt('sa-cancel', t('cancel'));
  // Reset to Pool mode by default
  const poolR = document.querySelector('input[name="sa-assign-type"][value="pool"]');
  if(poolR) { poolR.checked = true; toggleAssignType(); }
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
  const location    = el('sa-location').value.trim();
  const description = el('sa-desc').value.trim();
  if(!dateVal||!time||!location||!description) {
    toast(lang==='bm'?'Sila isi semua maklumat.':'Please fill in all fields.', 'error'); return;
  }
  if(!isPool && !staffUsername) {
    toast(lang==='bm'?'Sila pilih kakitangan untuk penugasan terus.':'Please select a staff member for direct assignment.', 'error'); return;
  }

  if(schedEditId) {
    // Edit existing schedule entry — keep original staff if editing a pool entry
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
  } else {
    // New booking — always create a manual job record in the jobs table
    const jobRef = 'MANUAL-' + Date.now();
    const manualJobRow = {
      job_type:        'manual',
      job_title:       description,
      job_date:        dateVal,
      job_time:        time,
      job_location:    location,
      job_description: description,
      created_by:      user.name,
      is_pool:         isPool,
      operator_id:     isPool ? null : staffUsername,
      operator_name:   isPool ? null : staffName,
      status:          'Menunggu',
      complaint_ref:   jobRef,
    };
    const savedJob = await dbInsertManualJob(manualJobRow);
    if(!savedJob) {
      toast(lang==='bm'?'Gagal menyimpan kerja manual.':'Failed to save manual job.', 'error'); return;
    }
    manualJobs.unshift(savedJob);

    // If direct-assign, also create a work_schedule record so the job appears on their calendar
    if(!isPool) {
      const entry = { staffUsername, staffName, date: dateVal, time, location, description, status:'Menunggu' };
      const saved = await dbInsertWorkSchedule(entry);
      if(saved) workSchedule.push(saved);
    }

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
  }
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
        <div><div style="font-size:.74rem;color:var(--gray-500);margin-bottom:2px;">👷 ${lang==='bm'?'Kakitangan':'Staff'}</div><strong>${e.staffName}</strong></div>
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
  const staffList = USERS.filter(u=>u.role==='staff'||u.role==='operator');
  const staffOpts = staffList.map(u=>`<option value="${u.username}" data-name="${u.name}">${u.name}</option>`).join('');
  el('sa-staff').innerHTML = `<option value="">-- ${t('staff')} --</option>${staffOpts}`;
  el('sa-staff').value   = e.staffUsername;
  el('sa-date').value    = e.date;
  el('sa-time').value    = e.time;
  el('sa-location').value = e.location;
  el('sa-desc').value    = e.description;
  setTxt('sa-title', `✏️ ${lang==='bm'?'Edit Jadual':'Edit Schedule'}`);
  setTxt('sa-cancel', t('cancel'));
  openModal('modal-sched-add');
}

async function deleteSchedEntry() {
  const e = workSchedule.find(x=>x.id===schedDetailId);
  if(!e) return;
  const msg = lang==='bm'
    ? `Padam jadual untuk ${e.staffName} pada ${fmtDateShort(e.date)}?`
    : `Delete schedule for ${e.staffName} on ${fmtDateShort(e.date)}?`;
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
function renderStaff() {
  const slist = USERS; // Show every registered user (admin, operator, staff)
  const isAdmin = user.role==='admin';

  const addBtn = isAdmin
    ? `<button class="btn btn-lime btn-sm" onclick="toast(lang==='bm'?'Fungsi tambah kakitangan akan datang.':'Add staff feature coming soon.','info')" style="margin-bottom:18px;">+ ${lang==='bm'?'Tambah Kakitangan':'Add Staff'}</button>`
    : '';

  const roleColors = { admin:'#1a237e', operator:'#2e7d32', staff:'#0277bd' };
  const roleLabels = { admin: lang==='bm'?'Pentadbir':'Admin', operator: lang==='bm'?'Operator':'Operator', staff: lang==='bm'?'Kakitangan':'Staff' };

  setHTML('sf-content', addBtn + `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;">
    ${slist.map(su=>{
      // Jobs: assigned (staff admin path) or accepted (operator path)
      const assigned = complaints.filter(c=>c.assignedTo===su.username);
      const accepted = complaints.filter(c=>c.acceptedBy===su.username);
      const allJobIds = new Set([...assigned.map(c=>c.id), ...accepted.map(c=>c.id)]);
      const allJobs  = complaints.filter(c=>allJobIds.has(c.id));
      const active   = allJobs.filter(c=>c.status==='Sedang Berjalan').length;
      const done     = allJobs.filter(c=>c.status==='Selesai').length;
      const total    = allJobs.length;
      const rColor   = roleColors[su.role]||'#666';
      const rLabel   = roleLabels[su.role]||su.role;
      const recentJobs = allJobs.slice(-3).reverse();
      return `<div class="card" style="margin:0;">
        <div style="background:linear-gradient(135deg,var(--navy),var(--navy-light));padding:18px 20px;color:white;display:flex;align-items:center;gap:14px;">
          <div style="width:52px;height:52px;background:var(--lime);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;font-weight:800;color:var(--navy);border:3px solid rgba(255,255,255,.25);flex-shrink:0;">
            ${iniOf(su.name)}
          </div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:.92rem;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${su.name}</div>
            <div style="font-size:.7rem;opacity:.7;margin-bottom:5px;">ID: ${su.staffId}</div>
            <span style="font-size:.68rem;background:${rColor};color:#fff;border-radius:10px;padding:2px 9px;font-weight:700;">${rLabel}</span>
          </div>
        </div>
        <div class="stripe equal"><div class="s-lime"></div><div class="s-navy"></div></div>
        <div class="card-body">
          <div style="font-size:.78rem;color:var(--gray-500);margin-bottom:10px;">
            ${su.email?`📧 ${su.email}`:''}${su.phone&&su.email?' · ':''}${su.phone?`📞 ${su.phone}`:''}
          </div>
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
      </div>`;}).join('')}
  </div>`);
}

// ─── REPORTS ──────────────────────────────────────────────────────────────────
function renderReports() {
  const all   = complaints;
  const pend  = all.filter(c=>c.status==='Menunggu').length;
  const prog  = all.filter(c=>c.status==='Sedang Berjalan').length;
  const done  = all.filter(c=>c.status==='Selesai').length;
  const urgent= all.filter(c=>c.urgency==='Segera').length;
  setHTML('rp-stats',`
    <div class="stat-card c-navy"><div class="stat-icon">📋</div><div class="stat-value">${all.length}</div><div class="stat-label">${t('totalJobs')}</div></div>
    <div class="stat-card c-warn"><div class="stat-icon">⏳</div><div class="stat-value">${pend}</div><div class="stat-label">${t('pending')}</div></div>
    <div class="stat-card c-info"><div class="stat-icon">🔄</div><div class="stat-value">${prog}</div><div class="stat-label">${t('inProgress')}</div></div>
    <div class="stat-card c-success"><div class="stat-icon">✅</div><div class="stat-value">${done}</div><div class="stat-label">${t('completed')}</div></div>
    <div class="stat-card c-danger"><div class="stat-icon">🚨</div><div class="stat-value">${urgent}</div><div class="stat-label">${lang==='bm'?'Segera':'Urgent'}</div></div>
    <div class="stat-card c-lime"><div class="stat-icon">👷</div><div class="stat-value">${USERS.filter(u=>u.role==='staff').length}</div><div class="stat-label">${t('totalStaff')}</div></div>`);

  const mx1 = Math.max(pend,prog,done,1);
  const barStyle = 'cursor:pointer;border-radius:6px;transition:background .15s;';
  setHTML('rp-status-chart',`
    <div class="bar-chart-item rp-bar-click" style="${barStyle}" onclick="openStatModal('Menunggu')" title="${lang==='bm'?'Klik untuk lihat senarai':'Click to view list'}"><div class="bar-chart-label"><span>⏳ ${t('pending')}</span><span>${pend}</span></div><div class="bar-track"><div class="bar-fill warning" style="width:${(pend/mx1*100).toFixed(0)}%"></div></div></div>
    <div class="bar-chart-item rp-bar-click" style="${barStyle}" onclick="openStatModal('Sedang Berjalan')" title="${lang==='bm'?'Klik untuk lihat senarai':'Click to view list'}"><div class="bar-chart-label"><span>🔄 ${t('inProgress')}</span><span>${prog}</span></div><div class="bar-track"><div class="bar-fill navy" style="width:${(prog/mx1*100).toFixed(0)}%"></div></div></div>
    <div class="bar-chart-item rp-bar-click" style="${barStyle}" onclick="openStatModal('Selesai')" title="${lang==='bm'?'Klik untuk lihat senarai':'Click to view list'}"><div class="bar-chart-label"><span>✅ ${t('completed')}</span><span>${done}</span></div><div class="bar-track"><div class="bar-fill success" style="width:${(done/mx1*100).toFixed(0)}%"></div></div></div>`);

  const pc = {}; all.forEach(c=>{ pc[c.problem]=(pc[c.problem]||0)+1; });
  const mx2 = Math.max(...Object.values(pc),1);
  const cols = ['navy','lime','warning','success','info'];
  setHTML('rp-type-chart', Object.entries(pc).sort((a,b)=>b[1]-a[1]).map(([k,v],i)=>`
    <div class="bar-chart-item rp-bar-click" style="${barStyle}" onclick="openProbModal('${k.replace(/'/g,'\\\'')}')" title="${lang==='bm'?'Klik untuk lihat senarai':'Click to view list'}"><div class="bar-chart-label"><span>${k}</span><span>${v}</span></div><div class="bar-track"><div class="bar-fill ${cols[i%cols.length]}" style="width:${(v/mx2*100).toFixed(0)}%"></div></div></div>`).join(''));

  setHTML('rp-tbody', all.map(c=>`<tr>
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
    <div class="notif-item ${n.read?'read':'unread'}" style="cursor:pointer;" onclick="notifClick(${n.id})">
      <div class="notif-dot"></div>
      <div>
        <div style="font-weight:${n.read?500:700};font-size:.9rem;">${icon[n.type]||'🔔'} ${n.title}</div>
        <div class="notif-text">${n.msg}</div>
        <div class="notif-time">🕐 ${fmtTimeAgo(n.time)}</div>
      </div>
    </div>`).join('')
    : `<div class="empty-state"><div class="empty-state-icon">🔔</div><p>${t('noNotifs')}</p></div>`);
  renderNotifBadge();
}

function renderNotifDD() {
  const ns = myNotifs().slice(0,8);
  const icon = {complaint:'📋',assign:'🔧',status:'🔄'};
  setHTML('notif-dd-list', ns.length ? ns.map(n=>`
    <div class="notif-item ${n.read?'read':'unread'}" style="cursor:pointer;" onclick="notifClick(${n.id})">
      <div class="notif-dot"></div>
      <div>
        <div class="notif-text" style="font-weight:${n.read?400:600};">${icon[n.type]||'🔔'} ${n.title}</div>
        <div class="notif-text">${n.msg}</div>
        <div class="notif-time">${fmtTimeAgo(n.time)}</div>
      </div>
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

function addNotif(type, title, msg, forRole, forUser) {
  notifs.unshift({ id:notifCounter++, type, title, msg, time:0, read:false, forRole, forUser:forUser||null });
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
          ${user.role==='admin'?t('role_admin'):user.role==='operator'?t('role_operator'):t('role_staff')}
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
      if(btnTxt) btnTxt.textContent = lang==='bm'?'Lokasi Dipin ✓':'Location Pinned ✓';
      if(result) {
        result.style.display = 'block';
        result.innerHTML = '<div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:10px 14px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;">'
          +'<span style="font-size:.85rem;color:#166534;">📍 '+pinnedLat.toFixed(6)+', '+pinnedLng.toFixed(6)+'</span>'
          +'<a href="https://www.google.com/maps?q='+pinnedLat+','+pinnedLng+'" target="_blank" rel="noopener" class="maps-btn" style="font-size:.8rem;padding:4px 10px;">'+(lang==='bm'?'Buka Maps':'Open Maps')+'</a>'
          +'</div>';
      }
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
    if(file.size > 15*1024*1024) { loaded++; if(loaded===toRead.length){ saveGallery(); renderGalleryGrid(); updateGalleryTabBadges(); if(user&&user.role==='operator') renderOperatorDashboard(); } return; }
    const reader = new FileReader();
    reader.onload = e => {
      arr.push({ src:e.target.result, name:file.name, type:file.type, ts:new Date().toISOString(), who:user?user.name:'Staff' });
      loaded++;
      if(loaded===toRead.length){ saveGallery(); renderGalleryGrid(); updateGalleryTabBadges(); if(user&&user.role==='operator') renderOperatorDashboard(); }
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
  if(user && user.role === 'operator') renderOperatorDashboard();
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
function renderOperatorDashboard() {
  el('dp-d-date').textContent = fmtDate(now());
  var newComplaintJobs = availableJobs();
  // Manual jobs: pool (visible to all operators) OR directly assigned to me
  var newManualJobs = manualJobs.filter(function(j) {
    if(j.status !== 'Menunggu') return false;
    if(j.is_pool) return true;
    return j.operator_id === user.username;
  });
  var totalNewJobs = newComplaintJobs.length + newManualJobs.length;
  var myJobs  = complaints.filter(function(c){ return c.acceptedBy === user.username; });
  var active  = myJobs.filter(function(c){ return c.status === 'Sedang Berjalan'; });
  var done    = myJobs.filter(function(c){ return c.status === 'Selesai'; });
  // Accepted manual jobs shown in My Jobs section
  var myManualJobs = manualJobs.filter(function(j) {
    return j.operator_id === user.username && j.status !== 'Menunggu';
  });

  setHTML('d-stats',
    '<div class="stat-card c-warn"><div class="stat-icon">📋</div><div class="stat-value">'+totalNewJobs+'</div><div class="stat-label">'+t('opNewJobs')+'</div></div>'
    +'<div class="stat-card c-info"><div class="stat-icon">🔄</div><div class="stat-value">'+active.length+'</div><div class="stat-label">'+t('inProgress')+'</div></div>'
    +'<div class="stat-card c-success"><div class="stat-icon">✅</div><div class="stat-value">'+done.length+'</div><div class="stat-label">'+t('completed')+'</div></div>'
  );

  // ── "ADUAN BARU" section ──────────────────────────────────────────────────
  var newJobsHTML = '<div style="margin-bottom:28px;">'
    +'<div class="card-header" style="padding:0 0 12px 0;">'
    +'<div class="card-title">📋 '+t('opNewJobs')
    +(totalNewJobs?'<span style="margin-left:8px;background:var(--lime);color:var(--navy);border-radius:12px;padding:1px 9px;font-size:.72rem;font-weight:800;">'+totalNewJobs+'</span>':'')
    +'</div></div>';

  if(totalNewJobs === 0) {
    newJobsHTML += '<div class="empty-state"><div class="empty-state-icon">🎉</div><p>'+t('opNoNewJobs')+'</p></div>';
  } else {
    // Complaint jobs (existing)
    newJobsHTML += newComplaintJobs.map(function(c){
      var locRow = c.coords
        ? '<div style="margin-bottom:8px;"><a class="maps-btn" href="https://www.google.com/maps?q='+c.coords.lat+','+c.coords.lng+'" target="_blank" rel="noopener">📍 '+(lang==='bm'?'Buka Google Maps':'Open Google Maps')+'</a></div>'
        : '<div style="font-size:.82rem;color:var(--gray-600);margin-bottom:8px;">📍 '+c.address+'</div>';
      return '<div class="job-card op-new">'
        +'<div class="job-card-top"><div>'
        +'<div class="job-ref">'+c.ref+(c.urgency==='Segera'?' 🚨':'')+'</div>'
        +'<div class="job-name">'+c.name+'</div>'
        +'</div>'+statusBadge(c.status)+'</div>'
        +'<div class="job-prob">🔧 '+c.problem+'</div>'
        +(c.desc?'<div style="font-size:.8rem;color:var(--gray-500);margin:4px 0 8px;">💬 '+c.desc+'</div>':'')
        +locRow
        +'<div class="job-meta" style="margin-bottom:10px;">'
        +'<div class="job-meta-item">📅 '+fmtDateShort(c.prefDate)+'</div>'
        +'<div class="job-meta-item">🕐 '+c.prefTime+'</div>'
        +(c.urgency==='Segera'?'<div class="job-meta-item" style="color:#dc2626;font-weight:700;">🚨 '+(lang==='bm'?'Segera':'Urgent')+'</div>':'')
        +'</div>'
        +'<div class="job-actions">'
        +'<button class="btn btn-lime btn-sm" style="font-weight:700;" onclick="acceptJob(\''+c.id+'\')">🤝 '+t('opAcceptJob')+'</button>'
        +'</div></div>';
    }).join('');

    // Manual jobs — MANUAL badge (purple)
    newJobsHTML += newManualJobs.map(function(j){
      var poolBadge = j.is_pool
        ? '<span style="font-size:.68rem;background:#ede9fe;color:#6d28d9;border-radius:10px;padding:2px 7px;font-weight:700;margin-left:4px;">POOL</span>'
        : '<span style="font-size:.68rem;background:#dbeafe;color:#1d4ed8;border-radius:10px;padding:2px 7px;font-weight:700;margin-left:4px;">'+(lang==='bm'?'UNTUK SAYA':'FOR ME')+'</span>';
      return '<div class="job-card op-new" style="border-left:3px solid #8b5cf6;">'
        +'<div class="job-card-top"><div>'
        +'<div class="job-ref" style="display:flex;align-items:center;flex-wrap:wrap;gap:4px;">'
        +'<span>'+j.complaint_ref+'</span>'
        +'<span style="font-size:.68rem;background:#8b5cf6;color:#fff;border-radius:10px;padding:2px 8px;font-weight:700;">MANUAL</span>'
        +poolBadge+'</div>'
        +'<div class="job-name">'+(lang==='bm'?'Kerja Pentadbir':'Admin Assigned Job')+'</div>'
        +'</div>'+statusBadge(j.status)+'</div>'
        +'<div class="job-prob">🔧 '+j.job_title+'</div>'
        +'<div style="font-size:.82rem;color:var(--gray-600);margin:4px 0 8px;">📍 '+j.job_location+'</div>'
        +'<div class="job-meta" style="margin-bottom:10px;">'
        +'<div class="job-meta-item">📅 '+fmtDateShort(j.job_date)+'</div>'
        +'<div class="job-meta-item">🕐 '+(j.job_time||'').slice(0,5)+'</div>'
        +'<div class="job-meta-item" style="color:var(--gray-500);">👤 '+j.created_by+'</div>'
        +'</div>'
        +'<div class="job-actions">'
        +'<button class="btn btn-lime btn-sm" style="font-weight:700;" onclick="acceptJob(\'mj-'+j.id+'\')">🤝 '+t('opAcceptJob')+'</button>'
        +'</div></div>';
    }).join('');
  }
  newJobsHTML += '</div>';

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
function getBkCounts(dateStr) {
  var counts = {};
  BK_SLOTS.forEach(function(s){ counts[s] = 0; });
  complaints.forEach(function(c){
    if(c.prefDate === dateStr && counts[c.prefTime] !== undefined) counts[c.prefTime]++;
  });
  return counts;
}

function getBkDayAvailability(dateStr) {
  var d = new Date(dateStr + 'T00:00:00');
  if(d.getDay() === 0) return 'closed'; // Sunday
  var counts = getBkCounts(dateStr);
  var totalSlots = BK_SLOTS.length * BK_MAX_PER_SLOT;
  var booked = BK_SLOTS.reduce(function(acc, s){ return acc + counts[s]; }, 0);
  var full = BK_SLOTS.every(function(s){ return counts[s] >= BK_MAX_PER_SLOT; });
  if(full) return 'full';
  if(booked >= totalSlots * 0.6) return 'limited';
  return 'available';
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

function selectBkDate(dateStr) {
  bookingDate = dateStr;
  bookingSlot = null;
  el('cf-date').value = dateStr;
  el('cf-time').value = '';
  renderBkCalendar();
  renderBkSlots(dateStr);
  el('bk-cal-wrap').style.display = 'none';
  el('bk-slots-wrap').style.display = '';
  el('bk-summary').style.display = 'none';
}

function renderBkSlots(dateStr) {
  var counts  = getBkCounts(dateStr);
  var d       = new Date(dateStr + 'T00:00:00');
  var months  = t('monthNames');
  var dayNamesL = t('dayNames');
  var dayLabel = dayNamesL[d.getDay()] + ', ' + d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
  var dateLbl = el('bk-slots-date-label');
  if(dateLbl) dateLbl.textContent = dayLabel;
  var grid = el('bk-slots-grid');
  if(!grid) return;
  var html = '';
  BK_SLOTS.forEach(function(slot) {
    var cnt  = counts[slot];
    var rem  = BK_MAX_PER_SLOT - cnt;
    var full = rem <= 0;
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
  if(complaints.filter(function(x){ return x.prefDate===bookingDate && x.prefTime===slot; }).length >= BK_MAX_PER_SLOT) {
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
      const found = USERS.find(x=>x.username===u.username && x.role===u.role);
      if(found) { user=found; initApp(); return; }
    }
  } catch(e){}

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
