const TronWeb = require('tronweb');

// Настройки
const publicKey = 'TS64QAQEL5GfbB61C86ZSJjfkVi6kPFmEA'; //your tron adress
const threshold = 25;  // Пороговое значение

const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io'
});

async function getTrxBalance(address) {
    const balanceInSun = await tronWeb.trx.getBalance(address);
    return balanceInSun / 1e6;  // Баланс в TRX
}

async function main() {
    while (true) {
        const balance = await getTrxBalance(publicKey);
        if (balance >= threshold) {
            console.log(`Баланс TRX достиг ${balance} монет. Пора выводить USDT.`);
            // Здесь можно добавить код для уведомления
        } else {
            console.log(`Баланс TRX: ${balance} монет. Проверка каждые 60 секунд.`);
        }
        await new Promise(resolve => setTimeout(resolve, 3000));  // Проверка каждые 60 секунд
    }
}

main();
