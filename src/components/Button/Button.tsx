import classNames from 'classnames';
import style from './Button.module.scss';

type Props = {
  text: string;
  type: 'submit' | 'button';
  cn?: string;

}

export const Button = ({ text, type, cn }: Props) => {
  console.log();

  return (
    <button
      className={cn ? classNames(style.button, style[cn]) : style.button}
      type={type}
    >
      {text}
    </button>
  );
};
