const express = require('express');
const cors = require('cors');  // นำเข้า cors package
const app = express();
const { adjustClimate } = require('./climateController');
const { sensorData } = require('./db');

app.use(cors());  // เปิดการใช้งาน CORS ทั่วไป

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ดึงข้อมูลเซ็นเซอร์ล่าสุดจากฐานข้อมูล
// ดึงข้อมูลที่ถูกบันทึกล่าสุดจากฐานข้อมูล
app.get('/sensor-data/latest', (req, res) => {
    sensorData.findOne({
        order: [['id', 'DESC']], // เรียงลำดับตาม ID จากใหม่ไปเก่า
        limit: 1  // เอาข้อมูลแถวล่าสุดแค่ 1 แถว
    })
    .then((data) => {
        res.json(data);  // ส่งข้อมูลแถวล่าสุดกลับไป
    })
    .catch((err) => {
        res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลได้', details: err.message });
    });
});

app.get('/sensor-data/all', (req, res) => {
    sensorData.findAll() // ดึงข้อมูลทั้งหมดจากตาราง sensor_data
    .then((data) => {
        res.json(data);  // ส่งข้อมูลทั้งหมดกลับไป
    })
    .catch((err) => {
        res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลได้', details: err.message });
    });
});



// ใช้ฟังก์ชันใน climateController.js สำหรับการปรับอุณหภูมิและความชื้น
app.post('/adjust-climate', adjustClimate);



app.post('/save-sensor', (req, res) => {
    sensorData.create(req.body)
        .then((data) => res.json({ message: 'บันทึกสำเร็จ', data }))
        .catch((err) => res.status(500).json({ error: 'บันทึกไม่สำเร็จ', details: err.message }));
});


app.listen(9000,() => {
    console.log('start server');
  });
  
