import style from './ErrorModal.module.scss';

type Props = {
  text: string;
};

export const ErrorModal = ({ text }: Props) => {
  console.log();

  return (
    <div className={style.modal}>
      <p className={style.text}>{text}</p>
    </div>

  );
};
