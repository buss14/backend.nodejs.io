// ฟังก์ชันสำหรับปรับอุณหภูมิและความชื้น
function adjustTemperature(temperature) {
    console.log(`ปรับอุณหภูมิเป็น ${temperature}°C`); // ใช้ backticks (`) แทนเครื่องหมายคำพูดเดี่ยว ('')
}

function adjustHumidity(humidity) {
    console.log(`ปรับความชื้นเป็น ${humidity}%`); // ใช้ backticks (`) แทนเครื่องหมายคำพูดเดี่ยว ('')
}

function adjustClimate(req, res) {
    const { temperature, humidity } = req.body;

    if (temperature == null || humidity == null) {
        return res.status(400).json({ error: "ข้อมูลไม่ครบถ้วน!" });
    }

    // ปรับอุณหภูมิและความชื้น
    adjustTemperature(temperature);
    adjustHumidity(humidity);

    // ส่งคำตอบกลับ
    res.json({
        message: `อุณหภูมิถูกตั้งค่าเป็น ${temperature}°C และความชื้นเป็น ${humidity}%`
    });
}

module.exports = { adjustClimate };
