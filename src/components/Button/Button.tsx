import classNames from 'classnames';
import style from './Button.module.scss';
type Func = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

type Props = {
  text: string;
  type: 'submit' | 'button';
  cn?: string;
  func?: Func;
}

export const Button = ({ text, type, cn, func }: Props) => {
  console.log();

  return (
    <button
      className={cn ? classNames(style.button, style[cn]) : style.button}
      type={type}
      onClick={func}
    >
      {text}
    </button>
  );
};
