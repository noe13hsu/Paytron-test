import { useState } from 'react';
import DropDown from '../../Components/DropDown';
import ProgressBar from '../../Components/ProgressBar';
import Loader from '../../Components/Loader';
import AmountInput from '../../Components/AmountInput';
import RateStack from '../../Components/RateStack';

import { useAnimationFrame } from '../../Hooks/useAnimationFrame';
import { ReactComponent as Transfer } from '../../Icons/Transfer.svg';

import classes from './Rates.module.css';

import CountryData from '../../Libs/Countries.json';
import countryToCurrency from '../../Libs/CountryCurrency.json';

let countries = CountryData.CountryCodes;

const MARK_UP = 0.005;

const Rates = () => {
  const [fromCurrency, setFromCurrency] = useState('AU');
  const [toCurrency, setToCurrency] = useState('US');
  const [amount, setAmount] = useState(0);
  
  const [exchangeRate, setExchangeRate] = useState(0.7456);
  const [progression, setProgression] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const Flag = ({ code }) => <img alt={code || ''} src={`/img/flags/${code || ''}.svg`} width="20px" className={classes.flag} />;

  const getConversion = (isMarkupIncluded) => {
    const trueConversion = exchangeRate * amount;
    const paytronConversion = trueConversion * (1 - MARK_UP);
    return isMarkupIncluded ? paytronConversion.toFixed(2) : trueConversion.toFixed(2);
  };

  const fetchData = async () => {
    if (!loading) {
      setLoading(true);

      try {
        const sellCurrency = countryToCurrency[fromCurrency];
        const buyCurrency = countryToCurrency[toCurrency];
        const response = await fetch(`https://rates.staging.api.paytron.com/rate/public?sellCurrency=${sellCurrency}&buyCurrency=${buyCurrency}`)
        const data = await response.json();
        setExchangeRate(data.retailRate)
      } catch (error) {
        console.log(error)
      }

      setLoading(false);
    }
  };

  // Demo progress bar moving :)
  useAnimationFrame(!loading, (deltaTime) => {
    setProgression((prevState) => {
      if (prevState > 0.998) {
        fetchData();
        return 0;
      }
      return (prevState + deltaTime * 0.0001) % 1;
    });
  });

  return (
    <div className={classes.container} data-testid="rates">
      <div className={classes.content}>
        <div className={classes.heading}>Currency Conversion</div>

        <div className={classes.rowWrapper}>
          <div>
            <DropDown
              leftIcon={<Flag code={fromCurrency} />}
              label={'From'}
              selected={countryToCurrency[fromCurrency]}
              options={countries.map(({ code }) => ({ option: countryToCurrency[code], key: code, icon: <Flag code={code} /> }))}
              setSelected={(key) => {
                setFromCurrency(key);
              }}
              style={{ marginRight: '20px' }}
            />
          </div>

          <div className={classes.exchangeWrapper}>
            <div className={classes.transferIcon}>
              <Transfer height={'25px'} />
            </div>
            <div className={classes.rate} data-testid={'exchange-rate'}>{exchangeRate}</div>
          </div>

          <div>
            <DropDown
              leftIcon={<Flag code={toCurrency} />}
              label={'To'}
              selected={countryToCurrency[toCurrency]}
              options={countries.map(({ code }) => ({ option: countryToCurrency[code], key: code, icon: <Flag code={code} /> }))}
              setSelected={(key) => {
                setToCurrency(key);
              }}
              style={{ marginLeft: '20px' }}
            />
          </div>
        </div>

        <div className={`${classes.rowWrapper} ${classes.spaceBetween}`}>
          <div>
            <AmountInput
              label='Amount'
              setValue={(e) => {
                setAmount(Number(e.target.value));
              }}
              value={amount}
            />
          </div>

          <div className={classes.columnWrapper}>
              <RateStack
                currency={countryToCurrency[toCurrency]}
                dataTestId={'paytron-rate'}
                label={'Markup included'}
                value={getConversion(true)}
              />
              <RateStack
                currency={countryToCurrency[toCurrency]}
                dataTestId={'true-rate'}
                label={'Markup excluded'}
                value={getConversion(false)}
              />
          </div>
        </div>

        <ProgressBar progress={progression} animationClass={loading ? classes.slow : ''} style={{ marginTop: '20px' }} />

        {loading && (
          <div className={classes.loaderWrapper}>
            <Loader width={'25px'} height={'25px'} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Rates;
