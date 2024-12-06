const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('my-project', 'postgres', '1111', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432
});

// ทดสอบการเชื่อมต่อ
sequelize.authenticate()
  .then(() => {
    console.log('การเชื่อมต่อฐานข้อมูลสำเร็จ');
  })
  .catch((err) => {
    console.error('ไม่สามารถเชื่อมต่อฐานข้อมูลได้:', err);
  });

var sensorData = sequelize.define('sensor_data', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  },
  temperature: {
    type: Sequelize.FLOAT,
    field: 'temperature'
  },
  humidity: {
    type: Sequelize.FLOAT,
    field: 'humidity'
  },
  ec_value: {
    type: Sequelize.FLOAT,
    field: 'ec_value'
  },
  ph_value: {
    type: Sequelize.FLOAT,
    field: 'ph_value'
  },
  water_level: {
    type: Sequelize.FLOAT,
    field: 'water_level'
  },
  timestamp: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    field: 'timestamp'
  }
}, {
  freezeTableName: true,
  timestamps: false  
});

sequelize.sync()
  .then(() => {
    console.log('การซิงค์ฐานข้อมูลสำเร็จ');
  })
  .catch((err) => {
    console.error('เกิดข้อผิดพลาดในการซิงค์ฐานข้อมูล:', err);
  });

module.exports = { sensorData };
