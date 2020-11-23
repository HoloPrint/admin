// Initialize Firebase
var firebaseConfig = {
	apiKey: "AIzaSyC6FHTUjVomTT9SeXAIBvB6FpFCxBbNo2Q",
	authDomain: "holoprint-myid.firebaseapp.com",
	databaseURL: "https://holoprint-myid.firebaseio.com",
	projectId: "holoprint-myid",
	storageBucket: "holoprint-myid.appspot.com",
	messagingSenderId: "571016780167",
	appId: "1:571016780167:web:458873e07d4cfdfa1e9b22",
	measurementId: "G-JL30S2DLXP"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Menampilkan data dalam bentuk tabel
function tampilData() {

	// Buat referensi database firebase
	var dbRef = firebase.database();
	var statusPesanan = dbRef.ref("status-Pesanan");

	// Dapatkan referensi table
	var table = document.getElementById("tabel-status-Pesanan").getElementsByTagName('tbody')[0];

	// Membuang semua isi table	
	$("#tabel-status-Pesanan").find("tr:gt(0)").remove();

	// Memuat Data
	statusPesanan.on("child_added", function (data, prevChildKey) {
		var newstatusPesanan = data.val();

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

		cell1.innerHTML = newstatusPesanan.id;
		cell2.innerHTML = newstatusPesanan.nama_pemesan;
		cell3.innerHTML = newstatusPesanan.alamat;
		cell4.innerHTML = newstatusPesanan.kontak;
		cell5.innerHTML = newstatusPesanan.file;
		cell6.innerHTML = newstatusPesanan.varian;
		cell7.innerHTML = newstatusPesanan.jumlah;
		cell8.innerHTML = newstatusPesanan.nominal;
		cell9.innerHTML = '<button class="btn btn-primary btn-sm" type="button" id="update_data" onclick="updateData_Tampil(' + newstatusPesanan.id + ')" data-toggle="modal" data-target="#ModalUpdate">Update</button><button class="btn btn-danger btn-sm" type="button" id="delete_data" onclick="deleteData_Tampil(' + newstatusPesanan.id + ')" data-toggle="modal" data-target="#ModalDel" style="margin-left:10px;">Hapus</button>';
	});

}

// Melakukan proses pencarian data
function CariData() {
	// Ambil isi text pencarian
	var nama_pemesan_cari = $('#text_cari').val();

	// Buat referensi database firebase
	var dbRef = firebase.database();
	var statusPesanan = dbRef.ref("status-Pesanan");


	// // Ambil data nama_Pesanan sama persis isi text cari
	// var query = statusPesanan
	// 				.orderByChild('nama_Pesanan')
	// 				.equalTo(nama_Pesanan_cari)
	// 				.limitToFirst(1);


	// // Ambil data nama_Pesanan huruf depan (dan selebihnya) isi text cari dilimit 1 data saja
	// var query = statusPesanan
	// 				.orderByChild('nama_Pesanan')
	// 				.startAt(nama_Pesanan_cari)
	// 				.endAt(nama_Pesanan_cari + "\uf8ff")
	// 				.limitToFirst(1);


	// Ambil data nama_Pesanan huruf depan (dan selebihnya) isi text cari
	var query = statusPesanan
		.orderByChild('nama_pemesan')
		.startAt(nama_pemesan_cari)
		.endAt(nama_pemesan_cari + "\uf8ff");


	// Dapatkan referensi table
	var table = document.getElementById("tabel-status-Pesanan").getElementsByTagName('tbody')[0];

	// Membuang semua isi table	
	$("#tabel-status-Pesanan").find("tr:gt(0)").remove();

	// Memuat Data pencarian

	query.on("child_added", function (snapshot) {

		var childData = snapshot.val();
		console.log(childData);

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

		cell1.innerHTML = newstatusPesanan.id;
		cell2.innerHTML = newstatusPesanan.nama_pemesan;
		cell3.innerHTML = newstatusPesanan.alamat;
		cell4.innerHTML = newstatusPesanan.kontak;
		cell5.innerHTML = newstatusPesanan.file;
		cell6.innerHTML = newstatusPesanan.varian;
		cell7.innerHTML = newstatusPesanan.jumlah;
		cell8.innerHTML = newstatusPesanan.nominal;
		cell9.innerHTML = '<button class="btn btn-primary btn-sm" type="button" id="update_data" onclick="updateData_Tampil(' + newstatusPesanan.id + ')" data-toggle="modal" data-target="#ModalUpdate">Update</button><button class="btn btn-danger btn-sm" type="button" id="delete_data" onclick="deleteData_Tampil(' + newstatusPesanan.id + ')" data-toggle="modal" data-target="#ModalDel" style="margin-left:10px;">Hapus</button>';
	});

}

// Menampilkan data yang akan di update kedalam modal update
function updateData_Tampil(id) {
	$('#T4').val(id);

	var dbRef_update_tampil = firebase.database();
	var statusPesanandenganID = dbRef_update_tampil.ref("status-Pesanan/" + id);

	statusPesanandenganID.on("value", function (snapshot) {
		var childData = snapshot.val();
		$('#t4_nama_pemesan').val(childData.nama_pemesan);
		$('#t4_alamat').val(childData.alamat);
		$('#t4_kontak').val(childData.kontak);
		$('#t4_file').val(childData.file);
		$('#t4_varian').val(childData.varian);
		$('#t4_jumlah').val(childData.jumlah);
	});

}

// Melakukan proses update data
function updateData_Proses() {
	var id_update_proses = $('#T4').val();
	var nama_Pesanan_update_proses = $('#t4_nama_Pesanan').val();
	var jenis_update_proses = $('#t4_jenis').val();
	var stock_update_proses = $('#t4_stock').val();
	var kode_supplier_update_proses = $('#t4_kode_supplier').val();

	var dbRef_update_proses = firebase.database();
	var update_statusPesanan = dbRef_update_proses.ref("status-Pesanan/" + id_update_proses);

	update_statusPesanan.update({
		"nama_Pesanan": nama_Pesanan_update_proses,
		"jenis": jenis_update_proses,
		"stock": parseInt(stock_update_proses),
		"kode_supplier": kode_supplier_update_proses
	});

	$('#ModalUpdate').modal('hide');
	tampilData();
}

// Mengambil id terakhir dan membahkan dengan 1 dan memasukkan kedalam text id di modal tambah
function ambilDataTerakhir() {

	$('#t4_nama_Pesanan_add').val("");
	$('#t4_jenis_add').val("");
	$('#t4_stock_add').val("");
	$('#t4_kode_supplier_add').val("");

	var dbRef_ambilDataTerakhir = firebase.database();
	var cariAkhir = dbRef_ambilDataTerakhir.ref("status-Pesanan");
	cariAkhir.limitToLast(1).on('child_added', function (dataAkhir) {
		var snap = dataAkhir.val();
		var id_record_terakhir = snap.id + 1;
		document.getElementById("T4_add").value = id_record_terakhir;
	});

}

// Melakukan proses penamPesanan data
function addData_Proses() {
	var id_add_proses = $('#T4_add').val();
	var nama_Pesanan_add_proses = $('#t4_nama_Pesanan_add').val();
	var jenis_add_proses = $('#t4_jenis_add').val();
	var stock_add_proses = $('#t4_stock_add').val();
	var kode_supplier_add_proses = $('#t4_kode_supplier_add').val();

	var dbRef_add_proses = firebase.database();

	// Isikan data kedalam firebase
	var statusPesanan = dbRef_add_proses.ref("status-Pesanan/" + id_add_proses);

	statusPesanan.set({

		id: parseInt(id_add_proses),
		kode_supplier: kode_supplier_add_proses,
		nama_Pesanan: nama_Pesanan_add_proses,
		jenis: jenis_add_proses,
		stock: parseInt(stock_add_proses)

	});

	$('#ModalAdd').modal('hide');
	tampilData();
}

// Melakukan proses delete data yang telah dikonfirmasi sebelumnya
function delData_Proses() {
	var id_add_proses = $('#T4_del').val();

	var dbRef_delete = firebase.database();
	var statusPesanan = dbRef_delete.ref("status-Pesanan/" + id_add_proses);
	statusPesanan.remove();
	$('#ModalDel').modal('hide');
	tampilData();


}

// Memasukkan id ke textbox di modal konfirmasi delete
function deleteData_Tampil(id) {
	$('#T4_del').val(id);
}