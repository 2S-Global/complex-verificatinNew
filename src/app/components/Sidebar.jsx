import Link from "next/link";

export default function Sidebar() {
  return (
    <aside id="sidebar" className="sidebar">
  <ul className="sidebar-nav" id="sidebar-nav">
    <li className="nav-item">
      <a className="nav-link " href="./dashboard">
        <i className="bi bi-grid" />
        <span>Dashboard</span>
      </a>
    </li>
    {/* End Dashboard Nav */}
    <li className="nav-item">
      <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#" >
        <i className="bi bi-menu-button-wide" /><span>Owners</span><i className="bi bi-chevron-down ms-auto" /></a>
      <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav" >
        <li><Link href="./owners"><i className="bi bi-circle" /><span>List Owners</span></Link></li>
        <li><Link href="./addowners"><i className="bi bi-circle" /><span>Import Owners</span></Link>
        </li>
      </ul>
    </li>

    {/* End Components Nav */}
    <li className="nav-item">
      <a className="nav-link collapsed" data-bs-target="#components-nav3" data-bs-toggle="collapse" href="#" >
        <i className="bi bi-menu-button-wide" /><span>Domestic Helpers</span><i className="bi bi-chevron-down ms-auto" /></a>
      <ul id="components-nav3" className="nav-content collapse " data-bs-parent="#sidebar-nav" >
        <li><Link href="./adddomesticuser"><i className="bi bi-circle" /><span>Add users</span></Link></li>
        <li><Link href="./lisdomesticusers"><i className="bi bi-circle" /><span>List Users</span></Link>
        </li>
      </ul>
    </li>
    {/* End Forms Nav */}
    <li className="nav-item">
      <a className="nav-link collapsed" data-bs-target="#components-nav1" data-bs-toggle="collapse" href="#" >
        <i className="bi bi-menu-button-wide" /><span>Verify Tenants</span><i className="bi bi-chevron-down ms-auto" /></a>
      <ul id="components-nav1" className="nav-content collapse " data-bs-parent="#sidebar-nav" >
        <li><Link href="./addtenant"><i className="bi bi-circle" /><span>Add Tenants</span></Link></li>
        <li><Link href="./listtenant"><i className="bi bi-circle" /><span>List Tenants</span></Link>
        </li>
      </ul>
    </li>
    
    <li className="nav-item">
      <a className="nav-link collapsed" data-bs-target="#components-nav2" data-bs-toggle="collapse" href="#" >
        <i className="bi bi-menu-button-wide" /><span>Settings</span><i className="bi bi-chevron-down ms-auto" /></a>
      <ul id="components-nav2" className="nav-content collapse " data-bs-parent="#sidebar-nav" >
        <li><Link href="./changeusername"><i className="bi bi-circle" /><span>Change Username</span></Link></li>
        <li><Link href="./changepassword"><i className="bi bi-circle" /><span>Change Password</span></Link></li>
        <li><Link href="./changeemail"><i className="bi bi-circle" /><span>Change Email</span></Link></li>
        <li><Link href="./changeprofileimage"><i className="bi bi-circle" /><span>Change Profile Image</span></Link></li>
        <li><Link href="/login"><i className="bi bi-circle" /><span>Logout</span></Link></li>
      </ul>
    </li>    
  </ul>
</aside>

  );
}
