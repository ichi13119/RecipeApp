import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const Header = () => {
  const [login, setLogin] = useState(true);
  const [index, setIndex] = useState(0);
  
  const UnAuth = () => (
    <>
      <ListItem
        button
        selected={index === 3}
        onClick={e => handleChange(e, 3)}
      >
        <Link className="headerItem" to="signin">Singin</Link>
      </ListItem>
      <ListItem
        button
        selected={index === 4}
        onClick={e => handleChange(e, 4)}
      >
        <Link className="headerItem" to="signup">Singup</Link>
      </ListItem>
    </>
  );

  const Auth = () => (
    <>
      <ListItem
        button
        selected={index === 3}
        onClick={e => handleChange(e, 3)}
      >
        <Link className="headerItem" to="addrecipe">Add Recipe</Link>
      </ListItem>
      <ListItem
        button
        selected={index === 4}
        onClick={e => handleChange(e, 3)}
      >
        <Link className="headerItem" to="profile">Profile</Link>
      </ListItem>
      <ListItem
        button
        selected={index === 5}
        onClick={e => handleChange(e, 4)}
      >
        <Link className="headerItem" to="/">Signout</Link>
      </ListItem>
    </>
  );

  const handleChange = (e, index) => {
    setIndex(index);
  };

  return (
    <div className="header">
      <List
        className="headerList"
        component="nav"
        aria-label="ヘッダーメニュー"
      >
        <ListItem
          button
          selected={index === 0}
          onClick={e => handleChange(e, 0)}  
        >
          <Link className="headerItem" to="/">Home</Link>
        </ListItem>
        <ListItem
          button
          selected={index === 1}
          onClick={e => handleChange(e, 1)}
        >
          <Link className="headerItem" to="/search">Search</Link>
        </ListItem>
        <ListItem
          button
          selected={index === 2}
          onClick={e => handleChange(e, 2)}
        >
          <Link className="headerItem" to="/tobuy">ToBuy</Link>
        </ListItem>
          {login ?
            <Auth />
            :
            <UnAuth />
          }
      </List>
    </div>
  );
};

export default Header;