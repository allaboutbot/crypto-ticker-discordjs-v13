const Discord = require('discord.js')
const axios = require('axios')
const { Client, Intents } = require('discord.js');
const moment = require("moment");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//** documents*/
const currency = 'usd'
const coin = 'bitcoin'
const token = ''
const prefix = '$'

/* function */ 
function Prices(){
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coin}`).then(res => {
        if(res.data && 
            res.data[0].market_cap_rank &&
            res.data[0].current_price && 
            res.data[0].price_change_percentage_24h && 
            res.data[0].price_change_24h &&
            res.data[0].high_24h &&
            res.data[0].low_24h &&
            res.data[0].total_volume 
            ){
            let market_cap_rank = res.data[0].market_cap_rank || 0
            let current_price = res.data[0].current_price || 0
            let percentageprice24h = res.data[0].price_change_percentage_24h || 0
            let price_change_24h = res.data[0].price_change_24h || 0
            let high_24h = res.data[0].high_24h || 0
            let low_24h = res.data[0].low_24h || 0
            let total_volume = res.data[0].total_volume || 0
            
            /*
            market_cap_rank || อันดับ
            current_price || ราคา USD
            percentageprice24h || เปอร์เซนขึ้นลง 
            price_change_24h || การเปลี่ยนแปลงราคา ใน 24 ชม
            high_24h || ราคาสูงสุดใน 24 ชม
            low_24h || ราคาต่ำสุใน 24 ชม
            total_volume วอลุ่มทั้งหมด||  
            */
            const arrayOfStatus = [
                `$${current_price} (${percentageprice24h.toFixed(2)})%`,
                `↗High 24h $${high_24h}`,
                `↘Low 24h $${low_24h}`,
                `Volume $${total_volume}`,
            ]
            
            let index = 0;
            setInterval(() => {
                if (index === arrayOfStatus.length) index = 0;
                const status = arrayOfStatus[index];
                client.user.setActivity(status, {type: 3}),
                    index++;
            },14999.75)


            let count = 0;
            count++;
            const date2 = `${moment().format('l')} ${moment().format('LTS')} ${moment.locale('th')}`  
            console.log(`Updatenumber ${count}`)  
            console.log(`Updated ${date2}`)
            console.log('marketcap rank', market_cap_rank)
            console.log('price to', current_price)
            console.log('percentage price 24h',percentageprice24h,'%')
            console.log('price change 24 h', price_change_24h)
            console.log('price high_24h', high_24h)
            console.log('price low_24h', low_24h)
            console.log('total volume', total_volume)
            console.log('==============================================')
        }else console.log('Could not load player count data for API')
    }).catch(err => console.log('Error at api.coingecko.com data:', err))
}

client.on('ready', () => {
	console.log('Logged in as', client.user.tag)
    

    
    Prices()
    setInterval(() => Prices(),  60000) 
})

client.login(`${token}`)
