import { useRouteError } from 'react-router-dom';
import style from './error-page.scss';

console.log('sty', style);
export default function ErrorPage() {
  const error = useRouteError();


  return (
    <div className="error">
      <h1>Упс! {error.status}</h1>
      <p>К сожалению, произошла непредвиденная ошибка.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
