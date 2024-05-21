import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Job Search
      </Link>
      <ul>
        <CustomLink to="/notes">Notes</CustomLink>
        <CustomLink to="/listings">Listings</CustomLink>
        <button className="signOut" onClick={props.signOut}>
          Sign Out
        </button>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
