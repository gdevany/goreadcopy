import React from 'react';
import { Link } from 'react-router';

const hyperLink = (text, action, isLink, id) => (
  isLink ?
    <Link key={id} to={action}>{text}</Link> :
    <a key={id} href={action}>{text}</a>
);

const FloatingSubMenuColumn = ({ key, title, items, columns, max, more }) => {
  return (
    <div key={key} className="navbar-link-submenu-column col d-flex flex-column">
      {
        title ?
          <div className="navbar-link-submenu-column-title">
            { title }
          </div> : null
      }
      {
        items.map(({ text, action, isLink, id })=>{
          return hyperLink(text, action, isLink, id);
        })
      }
      {
        more ? hyperLink(more.text, more.action, more.isLink, more.id) : null
      }
    </div>
  );
};

const FloatingSubMenuAd = ({ title, image, description, target }) => (
  <div className="navbar-link-submenu-ad col-sm-3 d-flex flex-column justify-content-center align-items-center">
    <span className="navbar-link-submenu-ad-title text-center">
      { title }
    </span>
    <img src={image} alt={title} />
    <p className="navbar-link-submenu-ad-description text-center">{description}</p>
    { hyperLink(target.text, target.action, target.isLink, target.id) }
  </div>
);

const FloatingSubMenu = ({ menu }) => {
  const { title, content, ad } = menu || {};
  return (
    <div className="navbar-link-submenu container">
      <div className="row">
        <div className="navbar-link-submenu-content col-sm-9">
          <div className="row">
            <div className="col">
              <label className="navbar-link-submenu-header">
                { title }
              </label>
            </div>
          </div>
          <div className="row">
            { content.map(el => <FloatingSubMenuColumn {...el} />) }
          </div>
        </div>
        <FloatingSubMenuAd {...ad} />
      </div>
    </div>
  );
};

export default FloatingSubMenu;
