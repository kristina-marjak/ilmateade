import sunset from './icons/sunset.png';
import sunrise from './icons/sunrise.png';
import moment from 'moment-timezone';

const formatDate = (dateString) => {
    const utcTime = moment.utc(dateString);
    const tallinnDate = utcTime.tz('Europe/Tallinn');
    //console.log (tallinnDate);
    return tallinnDate.format('DD.MM.YYYY');
};

const formatDatetoTime = (dateString) => {
    const utcTime = moment.utc(dateString);
    const tallinnTime = utcTime.tz('Europe/Tallinn');
    //console.log (tallinnTime);
    return tallinnTime.format('HH:mm');
};

const Forecast = ({ dailyData, dailyUnits }) => {
    if (!dailyData) {
        return null;
    }

    return (
        <div>
            <table className='table'>
                <thead>
                    <tr className='thead'>
                        <td>Kuupäev</td>
                        <td><img alt="sunrise" width="40" src={sunrise} /></td>
                        <td><img alt="sunset" width="40" src={sunset} /></td>
                        <td>Min/Max ({dailyUnits.temperature_2m_max})</td>
                        <td>Sademed ({dailyUnits.precipitation_sum})</td>
                        <td>Tuul ({dailyUnits.wind_speed_10m_max})</td>
                    </tr>
                </thead>
                <tbody>
                    {dailyData.time.map((day, index) => (
                        <tr key={day}>
                            <td>{formatDate(day)}</td>
                            <td>{formatDatetoTime(dailyData.sunrise[index])}</td>
                            <td>{formatDatetoTime(dailyData.sunset[index])}</td>
                            <td>{dailyData.temperature_2m_min[index]} / {dailyData.temperature_2m_max[index]}</td>
                            <td>{dailyData.precipitation_sum[index]}</td>
                            <td>{dailyData.wind_speed_10m_max[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Forecast;