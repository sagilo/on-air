require('log-timestamp');
const yeelight = require('yeelight-node').Yeelight;

const RED = [255, 0, 0];
const bulb = new yeelight({ ip: process.env.BULB_IP, port: 55443 });

module.exports = async function updateBulb(power) {
    var currentPower = await isOn(bulb);
    if (power === currentPower) {
        console.log(`Bulb is already in required state (${currentPower}), not setting`);
        return;
    }

    var powerState = power ? 'on' : 'off';
    bulb.set_power(powerState);
    console.log(`New bulb power: ${powerState}`);
    if (power) {
      bulb.set_rgb(RED);
    }
}

async function isOn(bulb) {
    var response = await bulb.get_prop('power');
    response = JSON.parse(response);
    return response.result[0].toUpperCase() === 'on'.toUpperCase();
}
