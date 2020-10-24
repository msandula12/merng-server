import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

function MenuBar() {
  const { logout, user } = useContext(AuthContext);

  const getCurrentPath = () => {
    const pathname = window.location.pathname;
    return pathname === '/' ? 'home' : pathname.substr(1);
  };

  const [activeItem, setActiveItem] = useState(getCurrentPath());

  const handleMenuChange = (_, { name }) => {
    if (name !== activeItem) {
      setActiveItem(name);
    }
  };

  return user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user.username} active as={Link} to="/" />
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={handleMenuChange}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === 'login'}
          onClick={handleMenuChange}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === 'register'}
          onClick={handleMenuChange}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );
}

export default MenuBar;
