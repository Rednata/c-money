import style from './Modal.module.scss';

type Props = {
  text: string;
};

export const Modal = ({ text }: Props) => {
  console.log();

  return (
    <div className={style.modal}>
      <p className={style.text}>{text}</p>
    </div>

  );
};
