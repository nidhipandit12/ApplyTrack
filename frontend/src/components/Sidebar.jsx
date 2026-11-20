import { useState } from "react";

function Sidebar() {
    const [active, setActive] = useState("dashboard");

    const handleNavigation = (section) => {
        setActive(section);

        document.getElementById(section)?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    return (
        <aside className="sidebar">
            <h2>ApplyTrack.</h2>

            <nav>
                <p
                    className={active === "dashboard" ? "active" : ""}
                    onClick={() => handleNavigation("dashboard")}
                >
                    Dashboard
                </p>

                <p
                    className={active === "applications" ? "active" : ""}
                    onClick={() => handleNavigation("applications")}
                >
                    Applications
                </p>
            </nav>

            <div className="sidebar-bottom">
                Job Search Made Simple.
            </div>
        </aside>
    );
}

export default Sidebar;