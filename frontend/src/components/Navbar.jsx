function Navbar({ title, subtitle, onAddClick, userName, onLogout }) {
    return (
        <header>
            <div>
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>

            <div className="navbar-actions">
                <button className="add-btn" onClick={onAddClick}>
                    + Add Application
                </button>

                <div className="navbar-profile">
                    <span className="profile-name">{userName}</span>

                    <button className="logout-btn" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Navbar;