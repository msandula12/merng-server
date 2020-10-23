import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';

function MenuBar() {
  const [activeItem, setActiveItem] = useState('home');

  const handleMenuChange = (_, { name }) => {
    if (name !== activeItem) {
      setActiveItem(name);
    }
  };

  return (
    <Menu pointing secondary>
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={handleMenuChange}
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === 'login'}
          onClick={handleMenuChange}
        />
        <Menu.Item
          name="register"
          active={activeItem === 'register'}
          onClick={handleMenuChange}
        />
      </Menu.Menu>
    </Menu>
  );
}

export default MenuBar;
