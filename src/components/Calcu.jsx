import { useState } from 'react';
import { useRef } from 'react';

import { Container } from '@/components/Container';
import axios from 'axios';
// import { Button } from '@/components/Button'
// import { TextField } from '@/components/Fields'


const dataStunting = {
  name: 'Stunting',
  description: ['Kondisi  gagal tumbuh pada  balita akibat kekurangan gizi kronis sehingga anak lebih pendek dari usianya. Kekurangan gizi ini terjadi sejak 1000 hari pertama kehidupan (1000 HPK), yaitu sejak bayi dalam kandungan dan pada masa awal kehidupan setelah lahir.',
  'Dalam jangka pendek anak stunting akan terhambat perkembangan kognitif atau kecerdasannya dan dalam jangka panjang stunting berpotensi membuat postur tubuh tumbuh tidak optimal, meningkatkan resiko kegemukan (obesitas), mudah sakit serta penurunan kesehatan reproduksi. Perkembangan kognitif dan tumbuh-kembang fisik yang tidak optimal akan menyebabkan kurang berprestasi di sekolah dan tidak optimal produktivitas kerjanya di masa mendatang.'],
  symptoms: ['Kurangnya asupan gizi', 'Penyakit infeksi pada ibu dan anak', 'Kebutuhan gizi anak yang tidak tercukupi dalam 1000 HPK (Hari Pertama Kehidupan)','Akses pelayanan preventif dan kuratif dalam fasilitas kesehatan kurang '],
  precautions: ['Pemberian ASI eksklusif', 'Pemberian MP-ASI tepat waktu dan adekuat', 'Menjaga kesehatan ibu hamil', 'Sanitasi dan hygiene'],
  doctors: [
    {name: 'Pada Remaja Putri', description: 'Mengonsumsi makanan bergizi serta tablet tambah darah jika dibutuhkan'},
    {name: 'Pada Ibu Hamil Sampai Bersalin', description: 'Mengonsumsi makanan bergizi, Melakukan pemeriksaan kehamilan rutin'},
    {name: 'Pada Ibu Menyusui', description: 'Pemberian ASI eksklusif, Rutin mengunjungi posyandu'},
    {name: 'Pada Bayi usia 6 - 24 bulan', description: 'Pemberian ASI sampai anak mencapai usia 2 tahun dan Memberikan makanan pendukung ASI'},

  ],

}

const dataSeverestunting = {
  name: 'Severely Stunted',
  description: ['Severely Stunted atau sangat pendek adalah masalah pertumbuhan fisik yang sangat terhambat pada anak-anak, terutama pada usia balita. Stunting merupakan istilah yang digunakan untuk menggambarkan tinggi badan anak yang jauh di bawah tinggi badan normal yang seharusnya mereka capai pada usia tertentu.'],
  symptoms: ['Malnutrisi kronis', 'Kurangnya asupan gizi selama 1000 hari pertama kehidupan', 'Infeksi dan penyakit','Gizi buruk selama masa kehamilan','Air bersih dan sanitasi yang buruk'],
  precautions: ['Peningkatan gizi selama kehamilan', 'Pemberian MP-ASI tepat waktu dan adekuat', 'Pemberian ASI eksklusif', 'Pemberian makanan yang seimbang dan bergizi','Pelayanan kesehatan yang berkualitas'],
  doctors: [
    {name: 'Pada Remaja Putri', description: 'Mengonsumsi makanan bergizi serta tablet tambah darah jika dibutuhkan'},
    {name: 'Pada Ibu Hamil Sampai Bersalin', description: 'Mengonsumsi makanan bergizi, Melakukan pemeriksaan kehamilan rutin'},
    {name: 'Pada Ibu Menyusui', description: 'Pemberian ASI eksklusif, Rutin mengunjungi posyandu, Peningkatan gizi ibu selama menyusui'},
    {name: 'Pada Bayi usia 6 - 24 bulan', description: 'Pemberian ASI sampai anak mencapai usia 2 tahun dan Memberikan makanan pendukung ASI'},
  ],
}


const dataNormal = {
  name: 'Normal',
  description: ['Berdasarkan perhitungan gizi Anak di atas, anak Ibu sudah termasuk ke dalam GIZI NORMAL, yang berarti apa yang Ibu lakukan dan berikan kepada anak terkait pemenuhan gizinya sudah TEPAT.'],
  symptoms: ['Kondisi normal pada pertumbuhan anak merujuk pada pertumbuhan fisik dan perkembangan yang sesuai dengan standar pertumbuhan yang umumnya diterima dan diharapkan pada usia tertentu.'],
  precautions: ['Pertumbuhan tinggi badan', 'Pertumbuhan berat badan', 'Perkembangan motorik', 'Perkembangan kognitif','Perkembangan sosial dan emosional','Kesehatan fisik dan kesejahteraan umum'],
  doctors: [
    {name: 'Pada Kehamilan', description: 'Perhatikan Gizi Selama Kehamilan dan rutin melakukan kunjungan ke dokter'},
    {name: 'Pada Bayi dan Balita', description: 'Nutrisi seimbang (ASI Eksklusif dan MPASI), stimulasi dan interaksi, aktivitas fisik, serta pengecekan TB dan BB rutin di posyandu.'},
  ],
}

const standarTBLaki = {
    0: {
        tb: 49.9,
        sdm1: 48.0,
        sdp1: 51.8,
      },
        1: {
        tb: 54.7,
        sdm1: 52.8,
        sdp1: 56.7,
      },
        2: {
        tb: 58.4,
        sdm1: 56.4,
        sdp1: 60.4,
      },
        3: {
        tb: 61.4,
        sdm1: 59.4,
        sdp1: 63.5,
      },
        4: {
        tb: 63.9,
        sdm1: 61.8,
        sdp1: 66.0,
      },  5: {
        tb: 65.9,
        sdm1: 63.8,
        sdp1: 68.0,
      },
        6: {
        tb: 67.6,
        sdm1: 65.5,
        sdp1: 69.8,
      },
        7: {
        tb: 69.2,
        sdm1: 67.0,
        sdp1: 71.3,
      },
        8: {
        tb: 70.6,
        sdm1: 68.4,
        sdp1: 72.8,
      },
        9: {
        tb: 72.0,
        sdm1: 69.7,
        sdp1: 74.2,
      },  10: {
        tb: 73.3,
        sdm1: 71.0,
        sdp1: 75.6,
      },
          11: {
        tb: 74.5,
        sdm1: 72.2,
        sdp1: 76.9,
      },    12: {
        tb: 75.7,
        sdm1: 73.4,
        sdp1: 78.1,
      },    13: {
        tb: 76.9,
        sdm1: 74.5,
        sdp1: 79.3,
      },    14: {
        tb: 78.0,
        sdm1: 75.6,
        sdp1: 80.5,
      },    15: {
        tb: 79.1,
        sdm1: 76.6,
        sdp1: 81.7,
      },    16: {
        tb: 80.2,
        sdm1: 77.6,
        sdp1: 82.8,
      },    17: {
        tb: 81.2,
        sdm1: 78.6,
        sdp1: 83.9,
      },    18: {
        tb: 82.3,
        sdm1: 79.6,
        sdp1: 85.0,
      },    19: {
        tb: 83.2,
        sdm1: 80.5,
        sdp1: 86.0,
      },    20: {
        tb: 84.2,
        sdm1: 81.4,
        sdp1: 87.0,
      },    21: {
        tb: 85.1,
        sdm1: 82.3,
        sdp1: 88.0,
      },    22: {
        tb: 86.0,
        sdm1: 83.1,
        sdp1: 89.0,
      },    23: {
        tb: 86.9,
        sdm1: 83.9,
        sdp1: 89.9,
      },    24: {
        tb: 87.8,
        sdm1: 84.8,
        sdp1: 90.9,
      },    25: {
        tb: 88.0,
        sdm1: 84.9,
        sdp1: 91.1,
      },    26: {
        tb: 88.8,
        sdm1: 85.6,
        sdp1: 92.0,
      },    27: {
        tb: 89.6,
        sdm1: 86.4,
        sdp1: 92.9,
      },    28: {
        tb: 90.4,
        sdm1: 87.1,
        sdp1: 93.7,
      },    29: {
        tb: 91.2,
        sdm1: 87.8,
        sdp1: 94.5,
      },    30: {
        tb: 91.9,
        sdm1: 88.5,
        sdp1: 95.3,
      },    31: {
        tb: 92.7,
        sdm1: 89.2,
        sdp1: 96.1,
      },    32: {
        tb: 93.4,
        sdm1: 89.9,
        sdp1: 96.9,
      },    33: {
        tb: 94.1,
        sdm1: 90.5,
        sdp1: 97.6,
      },    34: {
        tb: 94.8,
        sdm1: 91.1,
        sdp1: 98.4,
      },    35: {
        tb: 95.4,
        sdm1: 91.8,
        sdp1: 99.1,
      },    36: {
        tb: 96.1,
        sdm1: 92.4,
        sdp1: 99.8,
      },    37: {
        tb: 96.7,
        sdm1: 93.0,
        sdp1: 100.5,
      },    38: {
        tb: 97.4,
        sdm1: 93.6,
        sdp1: 101.2,
      },    39: {
        tb: 98.0,
        sdm1: 94.2,
        sdp1: 101.8,
      },    40: {
        tb: 98.6,
        sdm1: 94.7,
        sdp1: 102.5,
      },    41: {
        tb: 99.2,
        sdm1: 95.3,
        sdp1: 103.2,
      },    42: {
        tb: 99.9,
        sdm1: 95.9,
        sdp1: 103.8,
      },    43: {
        tb: 100.4,
        sdm1: 96.4,
        sdp1: 104.5,
      },    44: {
        tb: 101.0,
        sdm1: 97.0,
        sdp1: 105.1,
      },    45: {
        tb: 101.6,
        sdm1: 97.5,
        sdp1: 105.7,
      },    46: {
        tb: 102.2,
        sdm1: 98.1,
        sdp1: 106.3,
      },    47: {
        tb: 102.8,
        sdm1: 98.6,
        sdp1: 106.9,
      },    48: {
        tb: 103.3,
        sdm1: 99.1,
        sdp1: 107.5,
      },    49: {
        tb: 103.9,
        sdm1: 99.7,
        sdp1: 108.1,
      },    50: {
        tb: 104.4,
        sdm1: 100.2,
        sdp1: 108.7,
      },    51: {
        tb: 105.0,
        sdm1: 100.7,
        sdp1: 109.3,
      },    52: {
        tb: 105.6,
        sdm1: 101.2,
        sdp1: 109.9,
      },    53: {
        tb: 106.1,
        sdm1: 101.7,
        sdp1: 110.5,
      },    54: {
        tb: 106.7,
        sdm1: 102.3,
        sdp1: 111.1,
      },    55: {
        tb: 107.2,
        sdm1: 102.8,
        sdp1: 111.7,
      },    56: {
        tb: 107.8,
        sdm1: 103.3,
        sdp1: 112.3,
      },    57: {
        tb: 108.3,
        sdm1: 103.8,
        sdp1: 112.8,
      },    58: {
        tb: 108.9,
        sdm1: 104.3,
        sdp1: 113.4,
      },    59: {
        tb: 109.4,
        sdm1: 104.8,
        sdp1: 114.0,
      },    60: {
        tb: 110.0,
        sdm1: 105.3,
        sdp1: 114.6,
      }
    };

const standarTBPerempuan = {
    0: {
        tb: 49.1,
        sdm1: 47.3,
        sdp1: 51,
      },
      1: {
        tb: 53.7,
        sdm1: 51.7,
        sdp1: 55.6,
      },    2: {
        tb: 57.1,
        sdm1: 55.0,
        sdp1: 59.1,
      },    3: {
        tb: 59.8,
        sdm1: 57.7,
        sdp1: 61.9,
      },    4: {
        tb: 62.1,
        sdm1: 59.9,
        sdp1: 64.3,
      },    5: {
        tb: 64.0,
        sdm1: 61.8,
        sdp1: 66.2,
      },    6: {
        tb: 65.7,
        sdm1: 63.5,
        sdp1: 68.0,
      },    7: {
        tb: 67.3,
        sdm1: 65.0,
        sdp1: 69.6,
      },    8: {
        tb: 68.7,
        sdm1: 66.4,
        sdp1: 71.1,
      },    9: {
        tb: 70.1,
        sdm1: 67.7,
        sdp1: 72.6,
      },    10: {
        tb: 71.5,
        sdm1: 69.0,
        sdp1: 73.9,
      },    11: {
        tb: 72.8,
        sdm1: 70.3,
        sdp1: 75.3,
      },    12: {
        tb: 74.0,
        sdm1: 71.4,
        sdp1: 76.6,
      },    13: {
        tb: 75.2,
        sdm1: 72.6,
        sdp1: 77.8,
      },    14: {
        tb: 76.4,
        sdm1: 73.7,
        sdp1: 79.1,
      },    15: {
        tb: 77.5,
        sdm1: 74.8,
        sdp1: 80.2,
      },    16: {
        tb: 78.6,
        sdm1: 75.8,
        sdp1: 81.4,
      },    17: {
        tb: 79.7,
        sdm1: 76.8,
        sdp1: 82.5,
      },    18: {
        tb: 80.7,
        sdm1: 77.8,
        sdp1: 83.6,
      },    19: {
        tb: 81.7,
        sdm1: 78.8,
        sdp1: 84.7,
      },    20: {
        tb: 82.7,
        sdm1: 79.7,
        sdp1: 85.7,
      },    21: {
        tb: 83.7,
        sdm1: 80.6,
        sdp1: 86.7,
      },    22: {
        tb: 84.6,
        sdm1: 81.5,
        sdp1: 87.7,
      },    23: {
        tb: 85.5,
        sdm1: 82.3,
        sdp1: 88.7,
      },    24: {
        tb: 86.4,
        sdm1: 83.2,
        sdp1: 89.6,
      },    25: {
        tb: 86.6,
        sdm1: 83.3,
        sdp1: 89.9,
      },    26: {
        tb: 87.4,
        sdm1: 84.1,
        sdp1: 90.8,
      },    27: {
        tb: 88.3,
        sdm1: 84.9,
        sdp1: 91.7,
      },    28: {
        tb: 89.1,
        sdm1: 85.7,
        sdp1: 92.5,
      },    29: {
        tb: 89.9,
        sdm1: 86.4,
        sdp1: 93.4,
      },    30: {
        tb: 90.7,
        sdm1: 87.1,
        sdp1: 94.2,
      },    31: {
        tb: 91.4,
        sdm1: 87.9,
        sdp1: 95.0,
      },    32: {
        tb: 92.2,
        sdm1: 88.6,
        sdp1: 95.8,
      },    33: {
        tb: 92.9,
        sdm1: 89.3,
        sdp1: 96.6,
      },    34: {
        tb: 93.6,
        sdm1: 89.9,
        sdp1: 97.4,
      },    35: {
        tb: 94.4,
        sdm1: 90.6,
        sdp1: 98.1,
      },    36: {
        tb: 95.1,
        sdm1: 91.2,
        sdp1: 98.9,
      },    37: {
        tb: 95.7,
        sdm1: 91.9,
        sdp1: 99.6,
      },    38: {
        tb: 96.4,
        sdm1: 92.5,
        sdp1: 100.3,
      },    39: {
        tb: 97.1,
        sdm1: 93.1,
        sdp1: 101.0,
      },    40: {
        tb: 97.7,
        sdm1: 93.8,
        sdp1: 101.7,
      },    41: {
        tb: 98.4,
        sdm1: 94.4,
        sdp1: 102.4,
      },    42: {
        tb: 99.0,
        sdm1: 95.0,
        sdp1: 103.1,
      },    43: {
        tb: 99.7,
        sdm1: 95.6,
        sdp1: 103.8,
      },    44: {
        tb: 100.3,
        sdm1: 96.2,
        sdp1: 104.5,
      },    45: {
        tb: 100.9,
        sdm1: 96.7,
        sdp1: 105.1,
      },    46: {
        tb: 101.5,
        sdm1: 97.3,
        sdp1: 105.8,
      },    47: {
        tb: 102.1,
        sdm1: 97.9,
        sdp1: 106.4,
      },    48: {
        tb: 102.7,
        sdm1: 98.4,
        sdp1: 107.0,
      },    49: {
        tb: 103.3,
        sdm1: 99.0,
        sdp1: 107.7,
      },    50: {
        tb: 103.9,
        sdm1: 99.5,
        sdp1: 108.3,
      },    51: {
        tb: 104.5,
        sdm1: 100.1,
        sdp1: 108.9,
      },    52: {
        tb: 105.0,
        sdm1: 100.6,
        sdp1: 109.5,
      },    53: {
        tb: 105.6,
        sdm1: 101.1,
        sdp1: 110.1,
      },    54: {
        tb: 106.2,
        sdm1: 101.6,
        sdp1: 110.7,
      },    55: {
        tb: 106.7,
        sdm1: 102.2,
        sdp1: 111.3,
      },    56: {
        tb: 107.3,
        sdm1: 102.7,
        sdp1: 111.9,
      },    57: {
        tb: 107.8,
        sdm1: 103.2,
        sdp1: 112.5,
      },    58: {
        tb: 108.4,
        sdm1: 103.7,
        sdp1: 113.0,
      },    59: {
        tb: 108.9,
        sdm1: 104.2,
        sdp1: 113.6,
      },    60: {
        tb: 109.4,
        sdm1: 104.7,
        sdp1: 114.2,
      },
};

function hitungZScoreTB(umur, jenisKelamin, tinggiBadan) {

    // Tentukan standar TB
    let standarTB;
    if (jenisKelamin === 'Laki-laki') {
      standarTB = standarTBLaki;
    } else if (jenisKelamin === 'Perempuan') {
      standarTB = standarTBPerempuan;
    } else {
      return "Jenis kelamin tidak valid!";
    }
  
    // Ambil standar TB sesuai umur
    let stdTB = standarTB[umur].tb;
    // console.log("Nilai stdTB: " + stdTB);
    
    // Ambil nilai standar deviasi berdasarkan umur dan tinggi badan anak
    let deviasi;
    if (tinggiBadan < stdTB) {
      deviasi = standarTB[umur].sdm1;
    } else if (tinggiBadan >= stdTB) {
      deviasi = standarTB[umur].sdp1;
    }
    
    // console.log("Nilai deviasi: " + deviasi);
    // console.log  ("tb:" + tinggiBadan);
  
    // Hitung z-score
    let zScore;
    if (tinggiBadan > stdTB){
        zScore = (tinggiBadan - stdTB) / (deviasi - stdTB);
    }
    else {
        zScore = (tinggiBadan - stdTB) / (stdTB - deviasi);
    }
  
    return zScore;
  }

  export function Calcu() {
    const [anak, setAnak] = useState();
    const [ibu, setIbu] = useState();
    const [umur, setUmur] = useState();
    const [alamat, setAlamat] = useState();
    const [jenisKelamin, setJenisKelamin] = useState('Laki-laki');
    const [tinggiBadan, setTinggiBadan] = useState();
    const [beratBadan, setBeratBadan] = useState();
    const [lingkarLenganAtas, setLingkarLenganAtas] = useState();
    const [hasilPenilaian, setHasilPenilaian] = useState('');
    const [clickTime, setClickTime] = useState('');
    // const [isShowResult, setIsShowResult] = useState(false);
    const resultRef = useRef(null);

    function getClickTime() {
      const currentTime = new Date().toLocaleString();
      setClickTime(currentTime);
    }

    async function handleSubmit(event) {
      event.preventDefault();

      getClickTime();

      
      // Konversi input ke dalam tipe data angka
      const umurNum = parseInt(umur, 10);
      const tinggiBadanNum = parseFloat(tinggiBadan);
    
      // Panggil fungsi untuk menghitung z-score
      let zScore = hitungZScoreTB(umurNum, jenisKelamin, tinggiBadanNum);
    
      // Tentukan status gizi
      let hasilPenilaian;
      if (zScore < -3) {
        hasilPenilaian = 'Sangat Pendek';
      } else if (zScore >= -3 && zScore < -2) {
        hasilPenilaian = 'Stunted';
      } else if (zScore >= -2) {
        hasilPenilaian = 'Normal';
      }
    
      setHasilPenilaian(hasilPenilaian);
          // Set waktu saat tombol ditekan



      const data = {
        No: "INCREMENT",
        
        Umur: umur,
        jenisKelamin: jenisKelamin,
        tinggiBadan: tinggiBadan,
        anak: anak,
        ibu: ibu,
        alamat:alamat,
        hasilPenilaian: hasilPenilaian,
        beratBadan: beratBadan,
        lingkarLenganAtas: lingkarLenganAtas,
        clickTime: clickTime
      };
    


      try {
        const response = await axios.post('https://sheetdb.io/api/v1/j6jufalz1dchy', {
          data: [data] // Wrap the data object inside an array as the 'data' property
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        ;console.log(response.data);
        // Clear input fields if needed
        // setUmur('');
        // setJenisKelamin('');
        // setTinggiBadan('');
        // setHasilPenilaian('');
      } catch (error) {
        // Handle error
        console.error(error);
      }
      resultRef.current.scrollIntoView({ behavior: 'smooth', duration: '0' });
      

    }
    return (
      <section
      id="calcu"
      aria-labelledby="calcu"
      className="border-t border-gray-200 bg-cyan-100 py-10 sm:py-12"
    >
      <Container>
        <div className='bg-cyan-100 m-6 rounded-xl'>
          <div className='text-4xl font-medium text-center text-gray-900'>
        <h1>Kalkulator Gizi</h1>
        <p className="mt-2 mb-4 text-lg text-gray-600 sm:text-center">
            Ketahui Kondisi Gizi Anak Anda        </p>
        </div>
        <form onSubmit={handleSubmit} className=" mx-auto my-2 p-2 bg-white shadow-md rounded-md">
        <div className="mb-4">
    <label htmlFor="anak" className="block font-medium text-gray-700">Nama Anak : </label>
    <input
      type="text"
      id="anak"
      value={anak}
      onChange={(e) => setAnak(e.target.value)}
      required
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-400 focus:ring focus:ring-cyan-200"
    />
  </div>
  
  <div className="mb-4">
    <label htmlFor="umur" className="block font-medium text-gray-700">Umur (bulan):</label>
    <input
      type="number"
      id="umur"
      value={umur}
      onChange={(e) => setUmur(e.target.value)}
      required
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-400 focus:ring focus:ring-cyan-200"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="jenisKelamin" className="block font-medium text-gray-700">Jenis Kelamin:</label>
    <select
      id="jenisKelamin"
      value={jenisKelamin}
      onChange={(e) => setJenisKelamin(e.target.value)}
      required
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-400 focus:ring focus:ring-cyan-200"
    >
      <option value="Laki-laki">Laki-laki</option>
      <option value="Perempuan">Perempuan</option>
    </select>
  </div>

  <div className="mb-4">
    <label htmlFor="alamat" className="block font-medium text-gray-700">Alamat : </label>
    <input
      type="text"
      id="alamat"
      value={alamat}
      onChange={(e) => setAlamat(e.target.value)}
      required
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-400 focus:ring focus:ring-cyan-200"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="ibu" className="block font-medium text-gray-700">Nama Ibu : </label>
    <input
      type="text"
      id="ibu"
      value={ibu}
      onChange={(e) => setIbu(e.target.value)}
      required
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-400 focus:ring focus:ring-cyan-200"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="beratBadan" className="block font-medium text-gray-700">Berat Badan (kg):</label>
    <input
      type="number"
      id="beratBadan"
      value={beratBadan}
      onChange={(e) => setBeratBadan(e.target.value)}
      required
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-400 focus:ring focus:ring-cyan-200"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="tinggiBadan" className="block font-medium text-gray-700">Tinggi Badan (cm):</label>
    <input
      type="number"
      id="tinggiBadan"
      value={tinggiBadan}
      onChange={(e) => setTinggiBadan(e.target.value)}
      required
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-400 focus:ring focus:ring-cyan-200"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="lingkarLenganAtas" className="block font-medium text-gray-700">Lingkar Lengan Atas (cm):</label>
    <input
      type="number"
      id="lingkarLenganAtas"
      value={lingkarLenganAtas}
      onChange={(e) => setLingkarLenganAtas(e.target.value)}
      required
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-400 focus:ring focus:ring-cyan-200"
    />
  </div>

  <button
    type="submit"
    className="w-full py-3 mt-4 bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-200 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
  >
    Hitung
  </button>
</form>
{/* <p>Waktu tombol ditekan: {clickTime}</p> */}
{/* console.log({clickTime}); */}

  
        {/* {hasilPenilaian && <p>Hasil Penilaian Gizi: {hasilPenilaian}</p>} */}
        {/* </>
      </> */}
      <div className="w-11/12 max-w-5xl mx-auto py-12 " ref={resultRef}>
  { hasilPenilaian === 'Stunted' ? (
    <>
    <div classname="bg-gradient-to-r from-indigo-600 to-purple-800 py-4">
      <h1 className="md:text-5xl text-4xl font-bold mb-16 text-center">
        🔎{' '}
        <span className="text-transparent bg-clip-text bg-black capitalize">
          {hasilPenilaian}
        </span>{' '}
        🔍
      </h1>

        <div className="md:text-h1 text-h2 font-bold mb-16 text-center drop-shadow-2xl">
          <h2
            className="text-b-xl font-bold mb-2"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            🤔 Apa Itu Stunting??
          </h2>
          <p
            className="text-b-lg font-thin text-neutral-100"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {dataStunting.description.map((description, idx) => {
              return (
                <span
                  data-aos="flip-right"
                  data-aos-delay={300 + idx * 100}
                  key={description}
                  // className="py-2 px-6 text-b-sm bg-purple-900 rounded-3xl drop-shadow-xl text-neutral-100 font-thin "
                  className="text-b-lg font-medium text-black"
                >
                  {description}
                </span>
              );
            })}
          </p>
        </div>
        <div className="grid grid-cols-5 my-16 gap-16">
        <div className="col-span-5 md:col-span-3">
          <h2
            className="text-b-xl font-bold mb-2"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            😷 Apa Kemungkinan Penyebabnya??
          </h2>
          <div className="flex flex-wrap gap-3">
            {dataStunting.symptoms.map((symptom, idx) => {
              return (
                <span
                  data-aos="flip-right"
                  data-aos-delay={300 + idx * 100}
                  key={symptom}
                  className="py-2 px-6 text-b-sm bg-cyan-200 font-medium rounded-3xl drop-shadow-xl text-black"
                >
                  {symptom}
                </span>
              );
            })}
          </div>
        </div>
        <div className="col-span-5">
          <h2
            className="text-b-xl font-bold mb-2"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            😷 Bagaimana Cara Mencegahnya??
          </h2>
          <div className="flex flex-wrap gap-3">
            {dataStunting.precautions.map((precaution, idx) => {
              return (
                <span
                  data-aos="flip-left"
                  data-aos-delay={300 + idx * 100}
                  key={precaution}
                  className="py-2 px-6 text-b-sm bg-cyan-200 rounded-3xl drop-shadow-xl text-black font-medium"
                >
                  {precaution}
                </span>
              );
            })}
          </div>
        </div>
        <div className="col-span-5">
          <div className="w-full">
            <h2
              className="text-b-xl font-bold mb-2"
              data-aos="fade"
              data-aos-duration="500"
            >
              👨‍⚕️ Apa Yang Seharusnya Dilakukan
            </h2>
            <div className="flex md:flex-row flex-col gap-4">
              {dataStunting.doctors.map((doctor, idx) => {
                return (
                  <div
                    data-aos="fade-up"
                    data-aos-delay={300 + idx * 200}
                    key={doctor.name}
                    className="px-8 py-12 bg-cyan-200 rounded-3xl drop-shadow-2xl"
                  >
                    <h3 className="text-h4 text-slate-900 italic mb-4 text-center font-bold">
                      {doctor.name}
                    </h3>
                    <p className="font-normal text-b-md">{doctor.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div
        data-aos="fade"
        data-aos-duration="1000"
        className="col-span-5 text-b-lg text-center italic text-neutral-50 mt-8 animate-pulse duration-1000"
      >
        Note that this result is not 100% accurate. For further helps, please refer to the nearest health care.
      </div>
      </div>
    </>
  ) 
            
   : hasilPenilaian === 'Normal' ? (
    <>
    <div classname="">
      <h1 className="md:text-5xl text-4xl font-bold mb-16 text-center">
        🔎{' '}
        <span className="text-transparent bg-clip-text bg-black capitalize">
          {hasilPenilaian}
        </span>{' '}
        🔍
      </h1>

        <div className="md:text-h1 text-h2 font-bold mb-16 text-center drop-shadow-2xl">
          <h2
            className="text-b-xl font-bold mb-2"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            🤔 Apa Itu Kondisi Normal??
          </h2>
          <p
            className="text-b-lg font-medium text-neutral-100"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {dataNormal.description.map((description, idx) => {
              return (
                <span
                  data-aos="flip-right"
                  data-aos-delay={300 + idx * 100}
                  key={description}
                  // className="py-2 px-6 text-b-sm bg-purple-900 rounded-3xl drop-shadow-xl text-neutral-100 font-thin "
                  className="text-b-lg text-black"
                >
                  {description}
                </span>
              );
            })}
          </p>
        </div>
        <div className="grid grid-cols-5 my-16 gap-16">
        <div className="col-span-5 md:col-span-3">
          <h2
            className="text-b-xl font-bold mb-2"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            😷 Apa Kemungkinan Penyebabnya??
          </h2>
          <div className="flex flex-wrap gap-3">
            {dataNormal.symptoms.map((symptom, idx) => {
              return (
                <span
                  data-aos="flip-right"
                  data-aos-delay={300 + idx * 100}
                  key={symptom}
                  className="py-2 px-6 text-b-sm bg-cyan-200 rounded-3xl drop-shadow-xl text-black font-normal"
                >
                  {symptom}
                </span>
              );
            })}
          </div>
        </div>
        <div className="col-span-5">
          <h2
            className="text-b-xl font-bold mb-2"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            😷 Bagaimana Cara Mencegahnya??
          </h2>
          <div className="flex flex-wrap gap-3">
            {dataNormal.precautions.map((precaution, idx) => {
              return (
                <span
                  data-aos="flip-left"
                  data-aos-delay={300 + idx * 100}
                  key={precaution}
                  className="py-2 px-6 text-b-sm bg-cyan-200 rounded-3xl drop-shadow-xl text-black font-normal"
                >
                  {precaution}
                </span>
              );
            })}
          </div>
        </div>
        <div className="col-span-5">
          <div className="w-full">
            <h2
              className="text-b-xl font-bold mb-2"
              data-aos="fade"
              data-aos-duration="500"
            >
              👨‍⚕️ Apa Yang Seharusnya Dilakukan??
            </h2>
            <div className="flex md:flex-row flex-col gap-4">
              {dataNormal.doctors.map((doctor, idx) => {
                return (
                  <div
                    data-aos="fade-up"
                    data-aos-delay={300 + idx * 200}
                    key={doctor.name}
                    className="px-8 py-12 bg-cyan-200 rounded-3xl drop-shadow-2xl"
                  >
                    <h3 className="text-h4 text-slate-900 italic mb-4 text-center font-bold">
                      {doctor.name}
                    </h3>
                    <p className="font-light text-b-md">{doctor.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div
        data-aos="fade"
        data-aos-duration="1000"
        className="col-span-5 text-b-lg text-center italic text-neutral-50 mt-8 animate-pulse duration-1000"
      >
        Note that this result is not 100% accurate. For further helps, please refer to the nearest health care.
      </div>
      </div>
    </>
  )
  : hasilPenilaian === 'Sangat Pendek' ? (
    <>
    <div classname="">
      <h1 className="md:text-5xl text-4xl font-bold mb-16 text-center">
        🔎{' '}
        <span className="text-transparent bg-clip-text bg-black capitalize">
          {hasilPenilaian}
        </span>{' '}
        🔍
      </h1>

        <div className="md:text-h1 text-h2 font-bold mb-16 text-center drop-shadow-2xl">
          <h2
            className="text-b-xl font-bold mb-2"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            🤔 Apa Itu Kondisi Sangat Pendek??
          </h2>
          <p
            className="text-b-lg font-thin text-neutral-100"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {dataSeverestunting.description.map((description, idx) => {
              return (
                <span
                  data-aos="flip-right"
                  data-aos-delay={300 + idx * 100}
                  key={description}
                  // className="py-2 px-6 text-b-sm bg-purple-900 rounded-3xl drop-shadow-xl text-neutral-100 font-thin "
                  className="text-b-lg font-medium text-black"
                >
                  {description}
                </span>
              );
            })}
          </p>
        </div>
        <div className="grid grid-cols-5 my-16 gap-16">
        <div className="col-span-5 md:col-span-3">
          <h2
            className="text-b-xl font-bold mb-2"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            😷 Apa Kemungkinan Penyebabnya??
          </h2>
          <div className="flex flex-wrap gap-3">
            {dataSeverestunting.symptoms.map((symptom, idx) => {
              return (
                <span
                  data-aos="flip-right"
                  data-aos-delay={300 + idx * 100}
                  key={symptom}
                  className="py-2 px-6 text-b-sm bg-cyan-200 rounded-3xl drop-shadow-xl text-black font-normal"
                >
                  {symptom}
                </span>
              );
            })}
          </div>
        </div>
        <div className="col-span-5">
          <h2
            className="text-b-xl font-bold mb-2"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            😷 Bagaimana Cara mencegahnya??
          </h2>
          <div className="flex flex-wrap gap-3">
            {dataSeverestunting.precautions.map((precaution, idx) => {
              return (
                <span
                  data-aos="flip-left"
                  data-aos-delay={300 + idx * 100}
                  key={precaution}
                  className="py-2 px-6 text-b-sm bg-cyan-200 rounded-3xl drop-shadow-xl text-black font-normal"
                >
                  {precaution}
                </span>
              );
            })}
          </div>
        </div>
        <div className="col-span-5">
          <div className="w-full">
            <h2
              className="text-b-xl font-bold mb-2"
              data-aos="fade"
              data-aos-duration="500"
            >
              👨‍⚕️ Apa Yang Seharusnya Dilakukan??
            </h2>
            <div className="flex md:flex-row flex-col gap-4">
              {dataSeverestunting.doctors.map((doctor, idx) => {
                return (
                  <div
                    data-aos="fade-up"
                    data-aos-delay={300 + idx * 200}
                    key={doctor.name}
                    className="px-8 py-12 bg-cyan-200 rounded-3xl drop-shadow-2xl"
                  >
                    <h3 className="text-h4 text-slate-900 italic mb-4 text-center font-bold">
                      {doctor.name}
                    </h3>
                    <p className="font-normal text-b-md">{doctor.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div
        data-aos="fade"
        data-aos-duration="1000"
        className="col-span-5 text-b-lg text-center italic text-neutral-50 mt-8 animate-pulse duration-1000"
      >
        Note that this result is not 100% accurate. For further helps, please refer to the nearest health care.
      </div>
      </div>
    </>
  ) : null}
</div>

</div>
      </Container>
    </section>
    )
  
}