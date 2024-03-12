import { Container } from '../Container/Container';
import style from './Exchange.module.scss';

export const Exchange = () => {
  console.log();

  return (
    <Container>
      <h2 className={style.title}>Обмен валюты</h2>
      <div className={style.wrap}>
        <div className={style.websocket}>
        Изменение курса в режиме реального времени
        </div>
        <div className={style.wrapForm}>
          <form className={style.form}>
            <fieldset className={style.fieldset}>
              <legend className={style.formTitle}>
              Обмен валюты
              </legend>
              <div className={style.wrapLabel}>
                <label className={style.label}>Откуда</label>
                <select name="" id="" className={style.select}>
                  <option className={style.option} value="">1</option>
                  <option className={style.option} value="">2</option>
                  <option className={style.option} value="">3</option>
                </select>
              </div>
              <div className={style.wrapLabel}>
                <label className={style.label}>Куда</label>
                <select name="" id="" className={style.select}>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
                </select>
              </div>
              <div className={style.wrapLabel}>
                <label className={style.label}>Сумма</label>
                <input
                  className={style.input}
                  type="number"
                  min='1'
                />
              </div>
            </fieldset>

          </form>
          <div className={style.myCurrency}>
            <ul className={style.titleCurrency}>
              <li className={style.itemCurrency}>
                <p className={style.nameCurrency}>BTC
                </p>
                <span className={style.amountCurrency}>2405</span>
              </li>
              <li className={style.itemCurrency}>
                <p className={style.nameCurrency}>ETH
                </p>
                <span className={style.amountCurrency}>3620</span>
              </li>
              <li className={style.itemCurrency}>
                <p className={style.nameCurrency}>ETH
                </p>
                <span className={style.amountCurrency}>3620 ₽</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </Container>
  );
};
