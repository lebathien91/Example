import Link from "next/link";
const Sidebar = () => {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <h3 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Users</span>
          <Link href="#">
            <a className="link-secondary" aria-label="Add a new report">
              <span data-feather="plus-circle" />
            </a>
          </Link>
        </h3>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <Link href="/dashboard/users">
              <a className="nav-link">
                <span data-feather="file-text" />
                Danh sách
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/dashboard/users/new">
              <a className="nav-link">
                <span data-feather="file-text" />
                Tạo mới
              </a>
            </Link>
          </li>
        </ul>

        <h3 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Diseases</span>

          <Link href="#">
            <a className="link-secondary" aria-label="Add a new report">
              <span data-feather="plus-circle" />
            </a>
          </Link>
        </h3>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <Link href="/dashboard/diseases">
              <a className="nav-link">Danh sách</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/dashboard/diseases/new">
              <a className="nav-link">Tạo mới</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
