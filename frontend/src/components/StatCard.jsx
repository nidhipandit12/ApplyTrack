function StatCard({ title, value, percentage, color }) {
    return (
        <div className="stat-card">
            <p>{title}</p>

            <h2>{value}</h2>

            <div className="stat-progress">
                <div
                    className="stat-progress-fill"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: color
                    }}
                ></div>
            </div>

            <span className="stat-percentage">
                {percentage}% of total applications
            </span>
        </div>
    );
}

export default StatCard;