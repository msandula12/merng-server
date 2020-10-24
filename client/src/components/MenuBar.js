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
      <Menu.Item as={Link} to="/" name={user.username} active />
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        as={Link}
        to="/"
        content="Hi, World!"
        name="home"
        active={activeItem === 'home'}
        onClick={handleMenuChange}
      />
      <Menu.Menu position="right">
        <Menu.Item
          as={Link}
          to="/login"
          name="login"
          active={activeItem === 'login'}
          onClick={handleMenuChange}
        />
        <Menu.Item
          as={Link}
          to="/register"
          name="register"
          active={activeItem === 'register'}
          onClick={handleMenuChange}
        />
      </Menu.Menu>
    </Menu>
  );
}

export default MenuBar;
