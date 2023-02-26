import useNavbarView from "./Navbar.hook";

import * as css from './Navbar.styles';

const Navbar = () => {
  const { handleBack } = useNavbarView()

  return (
    <div className={css.navbar}>
      <a className={css.backLink} href="#" onClick={handleBack}>&times;</a>
      <h1 className={css.title}>Cangkulan</h1>
    </div>
  )
}

export default Navbar;
