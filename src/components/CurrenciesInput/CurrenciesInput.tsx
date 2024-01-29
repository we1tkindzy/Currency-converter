import { ChangeEvent } from "react";
import priceFormatter from "utils/priceFormatter";

import "./style.scss";

interface CurrenciesInputProps {
  value: string;
  setValue: (value: string) => void;
  isOutput?: boolean;
  setIsOutput: (isOutput: boolean) => void;
  name: string;
  label: string;
  placeholder: string;
}

const CurrenciesInput = ({
  value,
  setValue,
  isOutput,
  setIsOutput,
  name,
  label,
  placeholder,
}: CurrenciesInputProps): JSX.Element => {
  const handlerCurrencyCount = (
    evt: ChangeEvent<HTMLInputElement>,
    setFunction: (value: string) => void,
    isOutput: boolean
  ) => {
    const count = (evt.target as HTMLInputElement).value;
    setFunction(count);

    if (isOutput) {
      setIsOutput(true);
    } else {
      setIsOutput(false);
    }
  };

  return (
    <div>
      <label className="visually-hidden" htmlFor={name}>
        {label}
      </label>
      <input
        className="currencies-input"
        type="number"
        value={priceFormatter(value)}
        placeholder={placeholder}
        min={0}
        id={name}
        name={name}
        onChange={(evt) =>
          handlerCurrencyCount(evt, setValue, isOutput || false)
        }
      />
    </div>
  );
};

export default CurrenciesInput;
