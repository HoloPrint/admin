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
	var statussupplier = dbRef.ref("status-supplier");

	// Dapatkan referensi table
	var table = document.getElementById("tabel-status-supplier").getElementsByTagName('tbody')[0];

	// Membuang semua isi table	
	$("#tabel-status-supplier").find("tr:gt(0)").remove();

	// Memuat Data
	statussupplier.on("child_added", function (data, prevChildKey) {
		var newstatussupplier = data.val();

		var row = table.insertRow(table.rows.length);

		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);

		cell1.innerHTML = newstatussupplier.id;
		cell2.innerHTML = newstatussupplier.nama_supplier;
		cell3.innerHTML = newstatussupplier.alamat;
		cell4.innerHTML = newstatussupplier.kontak;
		cell5.innerHTML = '<button class="btn btn-success btn-sm">Hubungi</button> <button class="btn btn-primary btn-sm" type="button" id="update_data" onclick="updateData_Tampil(' + newstatussupplier.id + ')" data-toggle="modal" data-target="#ModalUpdate">Update</button><button class="btn btn-danger btn-sm" type="button" id="delete_data" onclick="deleteData_Tampil(' + newstatussupplier.id + ')" data-toggle="modal" data-target="#ModalDel" style="margin-left:10px;">Hapus</button>';
	});

}

// Melakukan proses pencarian data
function CariData() {
	// Ambil isi text pencarian
	var nama_supplier_cari = $('#text_cari').val();

	// Buat referensi database firebase
	var dbRef = firebase.database();
	var statussupplier = dbRef.ref("status-supplier");


	// // Ambil data nama_supplier sama persis isi text cari
	// var query = statussupplier
	// 				.orderByChild('nama_supplier')
	// 				.equalTo(nama_supplier_cari)
	// 				.limitToFirst(1);


	// // Ambil data nama_supplier huruf depan (dan selebihnya) isi text cari dilimit 1 data saja
	// var query = statussupplier
	// 				.orderByChild('nama_supplier')
	// 				.startAt(nama_supplier_cari)
	// 				.endAt(nama_supplier_cari + "\uf8ff")
	// 				.limitToFirst(1);


	// Ambil data nama_supplier huruf depan (dan selebihnya) isi text cari
	var query = statussupplier
		.orderByChild('nama_supplier')
		.startAt(nama_supplier_cari)
		.endAt(nama_supplier_cari + "\uf8ff");


	// Dapatkan referensi table
	var table = document.getElementById("tabel-status-supplier").getElementsByTagName('tbody')[0];

	// Membuang semua isi table	
	$("#tabel-status-supplier").find("tr:gt(0)").remove();

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

		cell1.innerHTML = childData.id;
		cell2.innerHTML = childData.nama_supplier;
		cell3.innerHTML = childData.alamat;
		cell4.innerHTML = childData.kontak;
		cell5.innerHTML = '<button class="btn btn-primary btn-sm" type="button" id="update_data" onclick="updateData_Tampil(' + childData.id + ')" data-toggle="modal" data-target="#ModalUpdate">Update</button><button class="btn btn-danger btn-sm" type="button" id="delete_data" onclick="deleteData_Tampil(' + childData.id + ')" style="margin-left:10px;"data-toggle="modal" data-target="#ModalDel">Hapus</button>';
	});

}

// Menampilkan data yang akan di update kedalam modal update
function updateData_Tampil(id) {
	$('#T4').val(id);

	var dbRef_update_tampil = firebase.database();
	var statussupplierdenganID = dbRef_update_tampil.ref("status-supplier/" + id);

	statussupplierdenganID.on("value", function (snapshot) {
		var childData = snapshot.val();
		$('#t4_nama_supplier').val(childData.nama_supplier);
		$('#t4_alamat').val(childData.alamat);
		$('#t4_kontak').val(childData.kontak);
	});

}

// Melakukan proses update data
function updateData_Proses() {
	var id_update_proses = $('#T4').val();
	var nama_supplier_update_proses = $('#t4_nama_supplier').val();
	var alamat_update_proses = $('#t4_alamat').val();
	var kontak_update_proses = $('#t4_kontak').val();
	var kode_supplier_update_proses = $('#t4_kode_supplier').val();

	var dbRef_update_proses = firebase.database();
	var update_statussupplier = dbRef_update_proses.ref("status-supplier/" + id_update_proses);

	update_statussupplier.update({
		"nama_supplier": nama_supplier_update_proses,
		"alamat": alamat_update_proses,
		"kontak": parseInt(kontak_update_proses),
		"kode_supplier": kode_supplier_update_proses
	});

	$('#ModalUpdate').modal('hide');
	tampilData();
}

// Mengambil id terakhir dan membahkan dengan 1 dan memasukkan kedalam text id di modal tambah
function ambilDataTerakhir() {

	$('#t4_nama_supplier_add').val("");
	$('#t4_alamat_add').val("");
	$('#t4_kontak_add').val("");

	var dbRef_ambilDataTerakhir = firebase.database();
	var cariAkhir = dbRef_ambilDataTerakhir.ref("status-supplier");
	cariAkhir.limitToLast(1).on('child_added', function (dataAkhir) {
		var snap = dataAkhir.val();
		var id_record_terakhir = snap.id + 1;
		document.getElementById("T4_add").value = id_record_terakhir;
	});

}

// Melakukan proses penamsupplier data
function addData_Proses() {
	var id_add_proses = $('#T4_add').val();
	var nama_supplier_add_proses = $('#t4_nama_supplier_add').val();
	var alamat_add_proses = $('#t4_alamat_add').val();
	var kontak_add_proses = $('#t4_kontak_add').val();

	var dbRef_add_proses = firebase.database();

	// Isikan data kedalam firebase
	var statussupplier = dbRef_add_proses.ref("status-supplier/" + id_add_proses);

	statussupplier.set({

		id: parseInt(id_add_proses),
		nama_supplier: nama_supplier_add_proses,
		alamat: alamat_add_proses,
		kontak: kontak_add_proses

	});

	$('#ModalAdd').modal('hide');
	tampilData();
}

// Melakukan proses delete data yang telah dikonfirmasi sebelumnya
function delData_Proses() {
	var id_add_proses = $('#T4_del').val();

	var dbRef_delete = firebase.database();
	var statussupplier = dbRef_delete.ref("status-supplier/" + id_add_proses);
	statussupplier.remove();
	$('#ModalDel').modal('hide');
	tampilData();


}

// Memasukkan id ke textbox di modal konfirmasi delete
function deleteData_Tampil(id) {
	$('#T4_del').val(id);
}