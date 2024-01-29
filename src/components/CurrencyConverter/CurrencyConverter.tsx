import React, { useState, useEffect } from "react";
import SwapIcon from "assets/swap-svgrepo-com.svg";
import { Coin } from "types";
import DateTime from "components/DateTime/DateTime";
import CurrenciesSelect from "components/CurrenciesSelect/CurrenciesSelect";
import CurrenciesInput from "components/CurrenciesInput/CurrenciesInput";
import priceFormatter from "utils/priceFormatter";

import "./style.scss";

interface CurrencyConverterProps {
  apiEndpoint: string;
  currencies: Coin[];
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  apiEndpoint,
  currencies,
}) => {
  const [inputCurrency, setInputCurrency] = useState<Coin>(currencies[0]);
  const [inputValue, setInputValue] = useState<string>("1");

  const [outputCurrency, setOutputCurrency] = useState<Coin>(currencies[1]);
  const [outputValue, setOutputValue] = useState<string>("0");

  const [isOutputCurrency, setIsOutputCurrency] = useState<boolean>(false);

  const fetchCoinPrice = async (id: string): Promise<number> => {
    const response = await fetch(`${apiEndpoint}/api/ticker/?id=${id}`);

    const data = await response.json();

    return parseFloat(data[0].price_usd);
  };

  const handlerSwapCoins = () => {
    const prevInputCurrency = inputCurrency;
    setIsOutputCurrency(false);
    setInputCurrency(outputCurrency);
    setOutputCurrency(prevInputCurrency);
  };

  const handlerConvertedValue = (
    parseMultiplier: string,
    multiplier: number,
    divisor: number,
    setValue: (value: string) => void
  ) => {
    const convertedValue = (parseFloat(parseMultiplier) * multiplier) / divisor;

    if (isNaN(convertedValue)) {
      setValue("");
      return;
    }

    setValue(String(convertedValue));
  };

  useEffect(() => {
    const convertCurrency = async () => {
      if (inputCurrency.symbol === outputCurrency.symbol) {
        setOutputValue(inputValue);
        return;
      }

      const inputPrice = await fetchCoinPrice(inputCurrency.id);
      const outputPrice = await fetchCoinPrice(outputCurrency.id);

      if (isOutputCurrency) {
        handlerConvertedValue(
          outputValue,
          outputPrice,
          inputPrice,
          setInputValue
        );
      } else {
        handlerConvertedValue(
          inputValue,
          inputPrice,
          outputPrice,
          setOutputValue
        );
      }
    };
    convertCurrency();
  }, [inputCurrency, outputCurrency, inputValue, outputValue]);

  return (
    <div className="currency-converter">
      <div className="currency-converter__converter">
        <div className="currency-converter__wrapper">
          <div className="currency-converter__coin">
            <CurrenciesInput
              value={inputValue}
              setValue={setInputValue}
              setIsOutput={setIsOutputCurrency}
              name="value-input"
              label="Цена криптовалюты(Ввод)"
              placeholder="Введите число"
            />

            <CurrenciesSelect
              currencies={currencies}
              selectedOption={{
                value: inputCurrency.symbol,
                label: inputCurrency.symbol,
              }}
              setCurrency={setInputCurrency}
            />
          </div>

          <button
            className="currency-converter__swap-button"
            onClick={handlerSwapCoins}
            type="button">
            <img
              src={SwapIcon}
              width={30}
              height={30}
              alt="Поменять валюты местами"
            />
          </button>

          <div className="currency-converter__coin">
            <CurrenciesInput
              value={outputValue}
              setValue={setOutputValue}
              isOutput={true}
              setIsOutput={setIsOutputCurrency}
              name="value-output"
              label="Цена криптовалюты(Вывод)"
              placeholder="Введите число"
            />

            <CurrenciesSelect
              currencies={currencies}
              selectedOption={{
                value: outputCurrency.symbol,
                label: outputCurrency.symbol,
              }}
              setCurrency={setOutputCurrency}
            />
          </div>
        </div>

        <p className="currency-converter__converter-info">
          {priceFormatter(inputValue)} {inputCurrency.name} ={" "}
          {priceFormatter(outputValue)} {outputCurrency.name}
        </p>
      </div>

      <div className="currency-converter__info">
        <p className="currency-converter__mark">
          Данные носят ознакомительный характер
        </p>
        <DateTime />
      </div>
    </div>
  );
};

export default CurrencyConverter;
