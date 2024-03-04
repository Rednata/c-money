import { ReactComponent as LogoSvg } from './logo.svg';
import style from './HeaderAuth.module.scss';
import { Container } from '../Container/Container';

export const HeaderAuth = () => {
  console.log();
  return (
    <header className={style.header}>
      <Container>
        <LogoSvg className={style.logo}/>
      </Container>
    </header>
  );
};
