// Menampilkan data dalam bentuk tabel
function tampilData()
{

// Buat referensi database firebase
    var dbRef = firebase.database().ref();
    var dataPesanan = dbRef.child('daftar_pesanan');

// Dapatkan referensi table
    var table = document.getElementById("tabel-data-pesanan").getElementsByTagName('tbody')[0];

// Membuang semua isi table	
    $("#tabel-data-pesanan").find("tr:gt(0)").remove();

// Memuat Data
    dataPesanan.on("child_added", function(data, prevChildKey) {
        var newdataPesanan = data.val();

        var row = table.insertRow(table.rows.length);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        var cell10 = row.insertCell(9);

        cell1.innerHTML = newstatusAlat.p_id; 
        cell2.innerHTML = newstatusAlat.p_nama;
        cell3.innerHTML = newstatusAlat.p_alamat; 
        cell4.innerHTML = newstatusAlat.p_email;
        cell5.innerHTML = newstatusAlat.p_kontak;
        cell6.innerHTML = newstatusAlat.p_file; 
        cell7.innerHTML = newstatusAlat.p_varian;
        cell8.innerHTML = newstatusAlat.p_jumlah;
        cell9.innerHTML = newstatusAlat.p_nominal;  
        cell10.innerHTML = '<button class="btn btn-primary btn-sm" type="button" id="update_data" onclick="updateData_Tampil(' + newstatusAlat.id + ')" data-toggle="modal" data-target="#ModalUpdate">Update</button><button class="btn btn-danger btn-sm" type="button" id="delete_data" onclick="deleteData_Tampil(' + newstatusAlat.id + ')" data-toggle="modal" data-target="#ModalDel" style="margin-left:10px;">Hapus</button>'; 
    });

}

// Melakukan proses pencarian data
function CariData()
{
// Ambil isi text pencarian
    var nama_alat_cari = $('#text_cari').val();

// Buat referensi database firebase
    var dbRef = firebase.database();
    var statusAlat = dbRef.ref("status-alat");


    // // Ambil data nama_alat sama persis isi text cari
    var query = statusAlat
                    .orderByChild('nama_alat')
                    .equalTo(nama_alat_cari)
                    .limitToFirst(1);


    // // Ambil data nama_alat huruf depan (dan selebihnya) isi text cari dilimit 1 data saja
    var query = statusAlat
                    .orderByChild('nama_alat')
                    .startAt(nama_alat_cari)
                    .endAt(nama_alat_cari + "\uf8ff")
                    .limitToFirst(1);


    // Ambil data nama_alat huruf depan (dan selebihnya) isi text cari
    var query = statusAlat
                    .orderByChild('nama_alat')
                    .startAt(nama_alat_cari)
                    .endAt(nama_alat_cari + "\uf8ff");


// Dapatkan referensi table
    var table = document.getElementById("tabel-status-alat").getElementsByTagName('tbody')[0];

// Membuang semua isi table	
    $("#tabel-status-alat").find("tr:gt(0)").remove();

    // Memuat Data pencarian

    query.on("child_added", function(snapshot) {

        var childData = snapshot.val();
        console.log(childData);
              
        var row = table.insertRow(table.rows.length);

           var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

           cell1.innerHTML = childData.id; 
           cell2.innerHTML = childData.nama_alat;
        cell3.innerHTML = childData.status_alat; 
        cell4.innerHTML = childData.tanggal_alat;
        cell5.innerHTML = childData.jam_alat; 
        cell6.innerHTML = '<button class="btn btn-primary btn-sm" type="button" id="update_data" onclick="updateData_Tampil(' + childData.id + ')" data-toggle="modal" data-target="#ModalUpdate">Update</button><button class="btn btn-danger btn-sm" type="button" id="delete_data" onclick="deleteData_Tampil(' + childData.id + ')" style="margin-left:10px;"data-toggle="modal" data-target="#ModalDel">Hapus</button>'; 
    });

}

// Menampilkan data yang akan di update kedalam modal update
function updateData_Tampil(id)
{
    $('#T4').val(id);
    
    var dbRef_update_tampil = firebase.database();
    var statusAlatdenganID = dbRef_update_tampil.ref("status-alat/" + id);

    statusAlatdenganID.on("value", function(snapshot) {
              var childData = snapshot.val();
              $('#t4_nama_alat').val(childData.nama_alat);
              $('#t4_status_alat').val(childData.status_alat);
              $('#t4_tanggal_alat').val(childData.tanggal_alat);
              $('#t4_jam_alat').val(childData.jam_alat);
    });

}

// Melakukan proses update data
function updateData_Proses()
{
    var id_update_proses = $('#T4').val();
    var nama_alat_update_proses = $('#t4_nama_alat').val();
    var status_alat_update_proses = $('#t4_status_alat').val();
    var tanggal_alat_update_proses = $('#t4_tanggal_alat').val();
    var jam_alat_update_proses = $('#t4_jam_alat').val();

    var dbRef_update_proses = firebase.database();
    var update_statusAlat = dbRef_update_proses.ref("status-alat/" + id_update_proses);

    update_statusAlat.update ({
       "nama_alat": nama_alat_update_proses,
       "status_alat": parseInt(status_alat_update_proses),
       "tanggal_alat": tanggal_alat_update_proses,
       "jam_alat": jam_alat_update_proses
    });

    $('#ModalUpdate').modal('hide');
    tampilData();
}

// Mengambil id terakhir dan membahkan dengan 1 dan memasukkan kedalam text id di modal tambah
function ambilDataTerakhir()
{

    $('#t4_nama_alat_add').val("");
    $('#t4_status_alat_add').val("");
    $('#t4_tanggal_alat_add').val("");
    $('#t4_jam_alat_add').val("");

    var dbRef_ambilDataTerakhir = firebase.database();
    var cariAkhir = dbRef_ambilDataTerakhir.ref("status-alat");
    cariAkhir.limitToLast(1).on('child_added', function(dataAkhir) {
        var snap = dataAkhir.val();
        var id_record_terakhir = snap.id + 1;
        document.getElementById("T4_add").value = id_record_terakhir;
    });

}

// Melakukan proses penambahan data
function addData_Proses()
{
    var id_add_proses = $('#T4_add').val();
    var nama_alat_add_proses = $('#t4_nama_alat_add').val();
    var status_alat_add_proses = $('#t4_status_alat_add').val();
    var tanggal_alat_add_proses = $('#t4_tanggal_alat_add').val();
    var jam_alat_add_proses = $('#t4_jam_alat_add').val();

    var dbRef_add_proses = firebase.database();

    // Isikan data kedalam firebase
    var statusAlat = dbRef_add_proses.ref("status-alat/" + id_add_proses);

      statusAlat.set({
    
        id : parseInt(id_add_proses),
        jam_alat : jam_alat_add_proses,
        nama_alat : nama_alat_add_proses,
        status_alat : parseInt(status_alat_add_proses),
        tanggal_alat : tanggal_alat_add_proses
        
      });

    $('#ModalAdd').modal('hide');
    tampilData();
}

// Melakukan proses delete data yang telah dikonfirmasi sebelumnya
function delData_Proses()
{
    var id_add_proses = $('#T4_del').val();

    var dbRef_delete = firebase.database();
    var statusAlat = dbRef_delete.ref("status-alat/" + id_add_proses);
    statusAlat.remove();
    $('#ModalDel').modal('hide');
    tampilData();
    
    
}

// Memasukkan id ke textbox di modal konfirmasi delete
function deleteData_Tampil(id)
{
    $('#T4_del').val(id);
}