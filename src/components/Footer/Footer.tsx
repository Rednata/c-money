/* eslint-disable no-unused-vars */
import { Container } from '../Container/Container';
import { ReactComponent as LogoSvg } from '../Header/logo.svg';
import style from './Footer.module.scss';

export const Footer = () => (
  <>
    <footer className={style.footer}>
      {/* <Container addClass='footerContainer'> */}
      <LogoSvg />
      <p>© C-Money, 2022</p>
      {/* </Container> */}
    </footer>
  </>
);
