import { FaUser, FaBell, FaMoneyBillWave, FaStar, FaUserAlt, FaBook, FaCalendarCheck, FaCheckCircle, FaRegBell, FaBellSlash } from "react-icons/fa";


export default function DashboardStatsWidget({ stats }) {
  // Optionally, you can map icon names to components for flexibility
  const iconMap = {
    users: <FaUser className="text-primary-500 text-2xl" />,
    user: <FaUser className="text-primary-500 text-2xl" />,
    bell: <FaBell className="text-primary-500 text-2xl" />,
    money: <FaMoneyBillWave className="text-primary-500 text-2xl" />,
    ratings: <FaStar className="text-primary-500 text-2xl" />,
    bookings: <FaBook className="text-primary-500 text-2xl" />,
    calendar_check: <FaCalendarCheck className="text-primary-500 text-2xl" />,
    check_circle: <FaCheckCircle className="text-primary-500 text-2xl" />,
    unread_alert: <FaBellSlash className="text-primary-500 text-2xl" />,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div key={stat.label || idx} className="bg-white rounded-xl shadow p-4 flex flex-col items-start">
          <div className="flex items-center gap-2 mb-2">
            {stat.icon && iconMap[stat.icon]}
            <span className="font-semibold text-gray-700">{stat.label}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          <div className="text-xs text-gray-500">{stat.sub}</div>
        </div>
      ))}
    </div>
  );
}
