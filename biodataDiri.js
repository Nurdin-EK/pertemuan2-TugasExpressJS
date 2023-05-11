const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data Biodata
let biodata = [];

// GET endpoint untuk mendapatkan data biodata
app.get('/biodata', (req, res) => {
  const { name, tempat_lahir, tanggal_lahir, alamat } = req.query;
  if (name && tempat_lahir && tanggal_lahir && alamat) {
    const data = biodata.find((item) => (
      item.nama === name &&
      item.tempat_lahir === tempat_lahir &&
      item.tanggal_lahir === tanggal_lahir &&
      item.alamat === alamat
    ));
    if (data) {
      const formattedData = JSON.stringify(data, null, 2);
      const preformattedData = `<pre>${formattedData}</pre>`;
      res.status(200).send(preformattedData);
    } else {
      res.status(404).send('Data biodata tidak ditemukan');
    }
  } else {
    const formattedData = JSON.stringify(biodata, null, 2);
    const preformattedData = `<pre>${formattedData}</pre>`;
    res.status(200).send(preformattedData);
  }
});

app.post('/biodata', (req, res) => {
  const { nama, tempat_lahir, tanggal_lahir, alamat } = req.body;
  biodata.push({ nama, tempat_lahir, tanggal_lahir, alamat });
  const message = { message: 'Data biodata berhasil ditambahkan' };
  const formattedMessage = JSON.stringify(message, null, 2);
  const preformattedMessage = `<pre>${formattedMessage}</pre>`;
  res.status(201).send(preformattedMessage);
});

app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
