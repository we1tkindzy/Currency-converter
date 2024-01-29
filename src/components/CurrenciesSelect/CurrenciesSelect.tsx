import React, { Dispatch, SetStateAction } from "react";
import Select from "react-select";
import { Coin } from "types";
import findCoinBySymbol from "utils/findCoinBySymbol";

import "./style.scss";

interface OptionType {
  label: string;
  value: string;
}

interface CurrenciesSelectProps {
  currencies: Coin[];
  selectedOption: OptionType;
  setCurrency: Dispatch<SetStateAction<Coin>>;
}

const CurrenciesSelect: React.FC<CurrenciesSelectProps> = ({
  currencies,
  selectedOption,
  setCurrency,
}) => {
  const options = currencies.map((curency: Coin) => {
    return { value: curency.symbol, label: curency.symbol };
  });

  const handleChange = (selectedOption: any) => {
    setCurrency(findCoinBySymbol(currencies, selectedOption.value));
  };

  return (
    <div>
      <Select
        className="currencies-select"
        value={selectedOption}
        onChange={handleChange}
        options={options}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderWidth: 0,
            color: "#101620",
            boxShadow: "inherit",
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
            height: 40,
          }),
        }}
        classNamePrefix="select"
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary25: "#ced6e3",
            primary: "#4e6d9c",
          },
        })}
      />
    </div>
  );
};

export default CurrenciesSelect;
