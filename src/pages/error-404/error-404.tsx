import { Link } from 'react-router-dom';

export default function Error404(): JSX.Element {
  return (
    <main>
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ fontSize: 45, marginTop: 400 }}>Error 404 this page does not exist</h1>
        <Link style={{ fontSize: 35 }} to="/">Вернуться на главную</Link>
      </section>
    </main>
  );
}
