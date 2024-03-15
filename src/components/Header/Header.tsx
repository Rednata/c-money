import { ReactComponent as LogoSvg } from './logo.svg';
import { ReactComponent as LogoMobileSvg } from './logoMobile.svg';
import style from './Header.module.scss';
import { Container } from '../Container/Container';

import { useLocation } from 'react-router-dom';
import { Nav } from '../Nav/Nav';

export const Header = () => {
  const location = useLocation();

  return (
    <header className={style.header}>
      <Container>
        <div className={style.wrap}>
          <a href="/">
            <LogoMobileSvg className={style.mobileLogo}/>
            <LogoSvg className={style.logo}/>
          </a>
          {(location.pathname !== '/') && <Nav />}
        </div>
      </Container>
    </header>
  );
};
