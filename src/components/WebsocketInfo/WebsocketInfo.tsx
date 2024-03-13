/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import style from './WebsocketInfo.module.scss';
// type Props = {}
type currencyInfo = {
  type: string;
  from: string;
  to: string;
  rate: number
  change: number
}

export const WebsocketInfo = () => {
  // const socket = new WebSocket('ws://localhost:3000/currency-feed');

  const [currency, setCurrency] = useState<currencyInfo[]>([]);

  // useEffect(() => {
  //   socket.addEventListener('message', e => {
  //     setCurrency((prevCarrency) => {
  //       if (prevCarrency.length > 7) {
  //         return [...prevCarrency.slice(1), JSON.parse(e.data)];
  //       } else {
  //         return [...prevCarrency, JSON.parse(e.data)];
  //       }
  //     });
  //   });
  // }, []);

  return (
    <div className={style.websocket}>
      <p className={style.websocketTitle}>
        Изменение курса в режиме реального времени
      </p>
      <ul className={style.websocketList}>
        {currency.map(elem => (
          <li
            className={style.websocketItem}
            key={ Math.random().toString(16).slice(2, 10) }>
            <div className={style.nameCarrencies}>
              <span className={style.name1}>{elem.from}/</span>
              <span className={style.name2}>{elem.to}</span>
            </div>
            <div className={style.hr}></div>
            <div className="courseCurrency">
              {
                elem.change === 0 ? (
                <span></span>
                ) : (
                <span >
                  {elem.change > 0 ? (`+`) : (`-`)}
                </span>
                )
              }
              {elem.rate}
            </div>
            <div className={style.temp}>
              {
                elem.change === 0 ? (
                <span></span>
                ) : (
                  elem.change > 0 ? (
                  <span className={style.up}></span>
                  ) : (
                    <span className={style.down}></span>
                  ))
              }
            </div>
          </li>
        ))}
        {/* <li className={style.websocketItem}>
          <div className={style.nameCarrencies}>
            <span className={style.name1}>AUD/</span>
            <span className={style.name2}>BTC</span>
          </div>
          <div className={style.hr}></div>
          <div className="courseCurrency">4,754</div>
        </li>
        <li className={style.websocketItem}>
          <div className={style.nameCarrencies}>
            <span className={style.name1}>BTC/</span>
            <span className={style.name2}>BYR</span>
          </div>
          <div className={style.hr}></div>
          <div className="courseCurrency">23,2383</div>
        </li>
        <li className={style.websocketItem}>
          <div className={style.nameCarrencies}>
            <span className={style.name1}>BYR/</span>
            <span className={style.name2}>AUD</span>
          </div>
          <div className={style.hr}></div>
          <div className="courseCurrency">-7.34</div>
        </li> */}
      </ul>
    </div>
  );
};
