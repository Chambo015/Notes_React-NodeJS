import { NavLink } from 'react-router-dom';
import './navigate.scss';
import { CgNotes, CgHomeAlt } from 'react-icons/cg';


export default function Navigate() {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <h1>Тестовое задание</h1>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className='link' end >
              <CgHomeAlt className='nav-icon'/> Главная
            </NavLink>
          </li>
          <li>
            <NavLink to="notes" className='link'>
              <CgNotes className='nav-icon'/> Записи
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="sidebar_footer">
        <h3>Eралы Айсаханов</h3>
      </div>
    </div>
  );
}
