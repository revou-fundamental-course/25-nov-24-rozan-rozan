//------------------------------------------------------------------------------NAVBAR

window.addEventListener("scroll", function(){                                   //  navbar dinamis
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
})

//------------------------------------------------------------------------------HITUNGAN

function perhitungan(){

    document.getElementsByName('inputjeniskelamin').forEach(radio => {          //  value jenis kelamin + console log
        if (radio.checked) {
            jeniskelamin = (radio.value);
            console.log("jenis kelamin: ", jeniskelamin);
        }
    })

    let berat = document.getElementById("inputberat").value;                    //  deklarasi & ambil input berat,usia,etc
    let usia = document.getElementById("inputusia").value;
    let tinggi = document.getElementById("inputtinggi").value;
    let penyakit = [
        "Malnutrisi","Osteoporosis","Anemia Defisiensi Zat Besi","Hipotermia",
        "Diabetes","Hipertensi","Sakit jantung","Osteoarthritis",
        "Penyakit Hati","Diabetes tipe 2","Gangguan pernapasan","Kanker"
    ];

    if (!jeniskelamin) {return;}                                                //  jika form belum diisi sepenuhnya tidak akan melanjutkan proses penghitungan
    if (!berat) {return;}
    if (!usia) {return;}
    if (!tinggi) {return;}

    let status;
    let kategori;
    let saran;
    let range;

    let tinggimeter = parseFloat(tinggi) / 100;                                 //  konversi tinggi cm -> meter
    
    let tinggikuadrat = parseFloat(tinggimeter) * parseFloat(tinggimeter);      //  hitung tinggi kuadrat
    let hasilhitung = parseFloat(berat) / parseFloat(tinggikuadrat);            //  hitung berat/tinggi

    if (hasilhitung < 18.5) {                                                   //  menentukan output berdasarkan skor didapat
        status = "Anda mengalami kekurangan berat badan";
        kategori = "Kekurangan berat badan";
        saran = "Berat badan Anda berada di bawah normal. Penting untuk mengonsumsi makanan yang sehat dan bernutrisi untuk mencapai berat badan ideal. Disarankan untuk berkonsultasi dengan ahli gizi untuk menyusun rencana makan yang sesuai kebutuhan tubuh Anda.";
        range = "hasil BMI kurang dari 18.5.";
        document.getElementById("listpenyakit").innerHTML = "Beberapa penyakit yang berasal dari kekurangan berat badan:";
        document.getElementById("outputpenyakit").innerHTML = penyakit.slice(0,4).join(", ");
    } else if ( hasilhitung < 25) {
        status = "Anda memiliki berat badan normal (ideal)";
        kategori = "Normal (ideal)";
        saran = "Berat badan Anda berada dalam kategori normal. Pertahankan pola makan seimbang dan rutin berolahraga untuk menjaga kesehatan tubuh Anda."
        range = "hasil BMI diantara 18.5 dan 24.9.";
        document.getElementById("listpenyakit").innerHTML = "";
        document.getElementById("outputpenyakit").innerHTML = "";
    } else if ( hasilhitung < 30) {
        status = "Anda memiliki berat badan berlebih";
        kategori = "Kelebihan berat badan";
        saran = "Cara terbaik untuk menurunkan berat badan adalah dengan mengatur kalor makanan yang dikonsumsi dan berolahraga. Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk menurunkan berat badan hingga batas normal.";
        range = "hasil BMI diantara 25 dan 29.9.";
        document.getElementById("listpenyakit").innerHTML = "Beberapa penyakit yang berasal dari berat badan berlebih:";
        document.getElementById("outputpenyakit").innerHTML = penyakit.slice(4,8).join(", ");
    } else {
        status = "anda mengalami kegemukan (obesitas)";
        kategori = "Kegemukan (obesitas)";
        saran = "BMI Anda berada dalam kategori obesitas. Anda dianjurkan untuk menurunkan berat badan dengan mengadopsi gaya hidup sehat, seperti mengurangi asupan kalori, meningkatkan aktivitas fisik, dan menghindari makanan tinggi lemak serta gula. Konsultasikan dengan dokter atau ahli gizi untuk mendapatkan panduan yang lebih spesifik.";
        range = "hasil BMI diatas 3.0.";
        document.getElementById("listpenyakit").innerHTML = "Beberapa penyakit yang berasal dari kegemukan:";
        document.getElementById("outputpenyakit").innerHTML = penyakit.slice(8,12).join(", ");
    }
    
    console.log("berat: ", berat);                                              //  console log semua value didapat
    console.log("usia: ", usia);
    console.log("tinggi (cm): ", tinggi);
    console.log("tinggi (m): ", tinggimeter);
    console.log("tinggi (m kuadrat): ", tinggikuadrat);
    console.log("hasil hitung kelebihan bb: ", hasilhitung);
    console.log("status bb: ", status);
    console.log("kategori: ", kategori);

    document.getElementById("outputhasil").innerHTML = hasilhitung.toFixed(1);  //  tampilkan output hitungan & string
    document.getElementById("outputstatus").innerHTML = status;
    document.getElementById("outputkategori").innerHTML = kategori;
    document.getElementById("outputsaran").innerHTML = saran;
    document.getElementById("outputrange").innerHTML = range;
    document.getElementById("outputjeniskelamin").innerHTML = jeniskelamin;
}

const form = document.getElementById('forminput');                              //  mencegah auto refresh saat submit ditekan
form.addEventListener('submit', function(event) {
    event.preventDefault();
})

//------------------------------------------------------------------------------FUNGSI RESET

function resetform() {
    document.getElementById('outputhasil').textContent = '0';                   //  reset skor hasil
    document.getElementById('outputstatus').textContent = '-';                  //  reset status
    document.getElementById('outputrange').textContent = '';                    //  reset range skor
    document.getElementById('outputkategori').textContent = '-';                //  reset kategori
    document.getElementById('outputsaran').textContent = '';                    //  reset saran
    document.getElementById('outputjeniskelamin').textContent = '-'; 
}

/* 
LOGIKA:
1. js tidak akan melakukan penghitungan ketika form belum diisi seluruhnya yaitu jenis kelamin, berat, usia dan tinggi
2. ketika form sudah diisi user dapat melakukan penghitungan dengan menekan button submit yang bertuliskan "Hitung BMI"
3. hasil skor, range skor, status berat badan, kategori berat badan, saran, dan penyakit akan ditampilkan setelah berhasil melakukan penghitungan
4. button reset menghapus isi form dengan fungsi html, juga meghapus hasil menggunakan fungsi javascript
*/
