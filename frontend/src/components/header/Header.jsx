import './header.scss';

export default function Header({ title, bgImage }) {
  return (
    <header className="header_page">
      <div
        className="header_page_image"
        style={{ backgroundImage: `url('${bgImage}')` }}
      ></div>
      <h1>{title}</h1>
    </header>
  );
}

