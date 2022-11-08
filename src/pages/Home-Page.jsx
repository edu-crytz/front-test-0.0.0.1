import { Fragment } from 'react'
import { Axios } from 'axios'
import ReactECharts from 'echarts-for-react';

const axios = new Axios({
    baseURL: `https://api.binance.com/api`,
    responseType: "json"
});

export const HomePage = () => {
    const date = new Date();
    const today = date.getDate();
    let bitcoinData = [[1666051200000, "19548.48000000", "19706.66000000", "19091.00000000", "19327.44000000", "260313.07848000", 1666137599999, "5065944973.46434750", 5588482, "129478.25628000", "2520037025.60741570", "0"], [1666137600000, "19327.44000000", "19360.16000000", "19065.97000000", "19123.97000000", "186137.29538000", 1666223999999, "3575041318.44978390", 4545820, "92346.11007000", "1773769908.88775970", "0"], [1666224000000, "19123.35000000", "19347.82000000", "18900.00000000", "19041.92000000", "223530.13068000", 1666310399999, "4276025723.99478240", 5391090, "110662.16001000", "2117089562.36447760", "0"], [1666310400000, "19041.92000000", "19250.00000000", "18650.00000000", "19164.37000000", "269310.75769000", 1666396799999, "5126619487.86902100", 5679281, "133589.01923000", "2543268174.88863470", "0"], [1666396800000, "19164.37000000", "19257.00000000", "19112.72000000", "19204.35000000", "110403.90837000", 1666483199999, "2117395641.12692130", 2887106, "54134.08243000", "1038228038.71095430", "0"], [1666483200000, "19204.29000000", "19695.00000000", "19070.11000000", "19570.40000000", "167057.20184000", 1666569599999, "3233393909.20097670", 3939703, "84465.80483000", "1635057403.33511530", "0"], [1666569600000, "19570.40000000", "19601.15000000", "19157.00000000", "19272.81000000", "194263.43365000", 1666655999999, "3761010967.22884370", 4108075, "95735.77234000", "1853537475.20909820", "0"]];


    async function handingBinanceAPIData() {
        try {

            const res = await axios.get("/v3/klines?symbol=BTCUSDT&interval=1d&limit=7");
            if (res.status === "404") {
                return "ERROR 404";
            } else {
                console.log('array de data bruto î', res.data);
            }
            const data = res.data;

            return data;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    handingBinanceAPIData().then((data) => {
        bitcoinData = data
    });

    const optionsLineAndBar = {
        title: {
            text: "Maior preço e Menor preço",
            left: "center",
            top: "top",
            show: true
        },
        grid: { top: 8, right: 8, bottom: 24, left: 36 },
        xAxis: {
            type: 'category',
            data: [today - 6, today - 5, today - 4, today - 3, today - 2, today - 1, today]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [parseFloat(bitcoinData[6][2]), parseFloat(bitcoinData[5][2]), parseFloat(bitcoinData[4][2]), parseFloat(bitcoinData[3][2]), parseFloat(bitcoinData[2][2]), parseFloat(bitcoinData[1][2]), parseFloat(bitcoinData[0][2])],
                type: 'bar',
                name: 'alta',
                barWidth: "60%",
                smooth: true
            },
            {
                data: [parseFloat(bitcoinData[6][3]), parseFloat(bitcoinData[5][3]), parseFloat(bitcoinData[4][3]), parseFloat(bitcoinData[3][3]), parseFloat(bitcoinData[2][3]), parseFloat(bitcoinData[1][3]), parseFloat(bitcoinData[0][3])],
                type: 'line',
                name: 'baixa',
                barWidth: "60%",
                smooth: true
            }
        ],
        tooltip: {
            trigger: 'axis',
        },
    };

    const optionsPie = {
        legend: {
            orient: "vertical",
            left: "left",
            data: [`Dia ${today}`, `Dia ${today - 1}`, `Dia ${today - 2}`, `Dia ${today - 3}`, `Dia ${today - 4}`, `Dia ${today - 5}`, `Dia ${today - 6}`]
        },
        series: [{
            type: "pie",
            data: [{
                value: bitcoinData[0][8],
                name: `Dia ${today}`
            }, {
                value: bitcoinData[1][8],
                name: `Dia ${today - 1}`
            }, {
                value: bitcoinData[2][8],
                name: `Dia ${today - 2}`
            }, {
                value: bitcoinData[3][8],
                name: `Dia ${today - 3}`
            }, {
                value: bitcoinData[4][8],
                name: `Dia ${today - 4}`
            }, {
                value: bitcoinData[5][8],
                name: `Dia ${today - 5}`
            }, {
                value: bitcoinData[6][8],
                name: `Dia ${today - 6}`
            }]
        }]
    }

    const optionsLine = {
        title: {
            text: "BitCoin",
            left: "center",
            top: "top",
            show: true
        },
        grid: { top: 8, right: 8, bottom: 24, left: 36 },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', `Sun`]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [19820, 19932, 19901, 20080, 19345, 19400, 19200],
                type: 'bar',
                name: 'bitcoin',
                barWidth: "60%",
                smooth: true
            }
        ],
        tooltip: {
            trigger: 'axis',
        },
    };

    return (
        <Fragment>
            <h1>Hello World</h1>
            <h3>BitCoin</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum quibusdam aut pariatur enim officiis, laudantium deleniti atque deserunt eaque numquam consequatur voluptatum doloremque consequuntur expedita rem officia quam. Officiis, mollitia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis molestiae hic libero mollitia saepe atque iusto pariatur, odit minus excepturi magni dolores distinctio ipsum, accusamus dolorem quam. Laudantium, nemo perferendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aliquam excepturi nemo, possimus nihil quod adipisci rerum corporis totam voluptatem eligendi, doloremque alias? Voluptas blanditiis corporis cumque fugiat nihil! Temporibus? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus, est. Illo dignissimos nam delectus, autem libero ab dolor, explicabo possimus architecto eius dolorum suscipit ipsum voluptates inventore. Nihil, ab assumenda?</p>
            <hr />
            <div>
                <h3>Current BitCoin Data and Graph</h3>
                <br />
                <p><strong>US$</strong>19200</p>
            </div>
            <div>
                <ReactECharts option={optionsLineAndBar} />
            </div>
            <br /><br />
            <div>
                <ReactECharts option={optionsPie} />
            </div>
            {/* <br /><br />
            <div>
                <ReactECharts option={optionsLine} />
            </div> */}
        </Fragment>
    )
}