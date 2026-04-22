// import "../styles/Home.css";
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import API from "../services/api";
// import Login from "../components/Login";
// import Chat from "../components/Chat";
// import AdminPanel from "../components/AdminPanel";
// import WalkThrough from "../components/WalkThrough";
// import { SkeletonLoader } from "../components/AnimatedComponents";

// export default function Home() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("chat");
//   const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

//   useEffect(() => {
//     API.get("/me")
//       .then((res) => {
//         if (!res.data.error) setUser(res.data);
//       })
//       .catch(() => {})
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
//   };

//   if (loading) {
//     return (
//       <motion.div 
//         className="loading"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         <div className="loading-card">
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
//             className="spinner"
//           />
//           <p>Loading dashboard</p>
//         </div>
//       </motion.div>
//     );
//   }

//   if (!user) return <Login setUser={setUser} theme={theme} toggleTheme={toggleTheme} />;

//   const logout = () => {
//     document.cookie = "session_id=; Max-Age=0";
//     setUser(null);
//   };

//   return (
//     <motion.div 
//       className="dashboard"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//     >
//       <Sidebar 
//         user={user}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         theme={theme}
//         toggleTheme={toggleTheme}
//         onLogout={logout}
//       />

//       <main className="dashboard-main">
//         {activeTab === "chat" && <Chat />}
//         {activeTab === "walkthrough" && <WalkThrough />}
//         {user.role === "admin" && activeTab === "admin" && <AdminPanel />}
//       </main>
//     </motion.div>
//   );
// }

// function Sidebar({ user, activeTab, setActiveTab, theme, toggleTheme, onLogout }) {
//   const tabs = [
//     { id: 'chat', label: 'Chat', icon: '💬', desc: 'Ask and analyze' },
//     { id: 'walkthrough', label: 'Walk Through', icon: '🔄', desc: 'Analytics builder' },
//   ];

//   const adminTab = user.role === "admin" 
//     ? { id: 'admin', label: 'Admin', icon: '⚙️', desc: 'Manage access' }
//     : null;

//   if (adminTab) tabs.push(adminTab);

//   return (
//     <motion.aside 
//       className="sidebar"
//       initial={{ x: -280 }}
//       animate={{ x: 0 }}
//       transition={{ duration: 0.4 }}
//     >
//       <div className="sidebar-header">
//         <div className="logo-block">
//           <span className="logo-icon">AI</span>
//           <div>
//             <h2>Analytics</h2>
//             <p>Data command center</p>
//           </div>
//         </div>
//       </div>

//       <nav className="menu">
//         {tabs.map(tab => (
//           <motion.button
//             key={tab.id}
//             className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
//             onClick={() => setActiveTab(tab.id)}
//             whileHover={{ x: 4 }}
//             whileTap={{ scale: 0.98 }}
//             initial={{ opacity: 0, x: -10 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: tabs.indexOf(tab) * 0.05 }}
//           >
//             <span className="nav-icon">{tab.icon}</span>
//             <div className="nav-content">
//               <span className="nav-label">{tab.label}</span>
//               <small>{tab.desc}</small>
//             </div>
//           </motion.button>
//         ))}
//       </nav>

//       <div className="sidebar-footer">
//         <div className="user-chip">
//           <motion.span
//             whileHover={{ scale: 1.1 }}
//           >
//             {user.username?.slice(0, 1)?.toUpperCase() || "U"}
//           </motion.span>
//           <div>
//             <strong>{user.username}</strong>
//             <small>{user.department || user.role}</small>
//           </div>
//         </div>

//         <motion.button 
//           className="theme-toggle"
//           onClick={toggleTheme}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           {theme === 'dark' ? '☀️' : '🌙'}
//         </motion.button>

//         <motion.button 
//           className="logout-btn"
//           onClick={onLogout}
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           Logout
//         </motion.button>
//       </div>
//     </motion.aside>
//   );
// }
//         </div>
//       </aside>

//       <main className="main">
//         <header className="topbar">
//           <div>
//             <p>
//               {activeTab === "chat" ? "AI Chat Assistant" :
//                activeTab === "walkthrough" ? "Analytics Builder" :
//                "Admin Panel"}
//             </p>
//             <h1>
//               {activeTab === "chat" ? "Analytics Assistant" :
//                activeTab === "walkthrough" ? "Walk Through Analytics" :
//                "User Management"}
//             </h1>
//           </div>
//           <div className="topbar-badges">
//             <button className="theme-toggle" onClick={toggleTheme} type="button">
//               {theme === "dark" ? "Light" : "Dark"}
//             </button>
//             <span>{user.role}</span>
//             {user.department && <span>{user.department}</span>}
//           </div>
//         </header>

//         <section className="content">
//           {activeTab === "chat" && <Chat />}
//           {activeTab === "walkthrough" && <WalkThrough />}
//           {activeTab === "admin" && user.role === "admin" && <AdminPanel />}
//         </section>
//       </main>
//     </div>
//   );
// }


import "../styles/Home.css";
import React, { useEffect, useState } from "react";
import API from "../services/api";
import Login from "../components/Login";
import Chat from "../components/Chat";
import AdminPanel from "../components/AdminPanel";
import WalkThrough from "../components/WalkThrough";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("chat");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    API.get("/me")
      .then((res) => {
        if (!res.data.error) setUser(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-card">
          <span />
          <p>Loading dashboard</p>
        </div>
      </div>
    );
  }

  if (!user) return <Login setUser={setUser} theme={theme} toggleTheme={toggleTheme} />;

  const logout = () => {
    document.cookie = "session_id=; Max-Age=0";
    setUser(null);
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div>
          <div className="logo-block">
            <span>AI</span>
            <div>
              <h2 className="logo">Analytics</h2>
              <p>Data command center</p>
            </div>
          </div>

          <nav className="menu">
            <button
              className={activeTab === "chat" ? "active" : ""}
              onClick={() => setActiveTab("chat")}
            >
              <span>Chat</span>
              <small>Ask and analyze</small>
            </button>

            <button
              className={activeTab === "walkthrough" ? "active" : ""}
              onClick={() => setActiveTab("walkthrough")}
            >
              <span>Walk Through</span>
              <small>Analytics builder</small>
            </button>

            {user.role === "admin" && (
              <button
                className={activeTab === "admin" ? "active" : ""}
                onClick={() => setActiveTab("admin")}
              >
                <span>Admin</span>
                <small>Manage access</small>
              </button>
            )}
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="user-chip">
            <span>{user.username?.slice(0, 1)?.toUpperCase() || "U"}</span>
            <div>
              <strong>{user.username}</strong>
              <small>{user.department || user.role}</small>
            </div>
          </div>
          <button onClick={logout}>Logout</button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p>
              {activeTab === "chat" ? "AI Chat Assistant" :
               activeTab === "walkthrough" ? "Analytics Builder" :
               "Admin Panel"}
            </p>
            <h1>
              {activeTab === "chat" ? "Analytics Assistant" :
               activeTab === "walkthrough" ? "Walk Through Analytics" :
               "User Management"}
            </h1>
          </div>
          <div className="topbar-badges">
            <button className="theme-toggle" onClick={toggleTheme} type="button">
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <span>{user.role}</span>
            {user.department && <span>{user.department}</span>}
          </div>
        </header>

        <section className="content">
          {activeTab === "chat" && <Chat />}
          {activeTab === "walkthrough" && <WalkThrough />}
          {activeTab === "admin" && user.role === "admin" && <AdminPanel />}
        </section>
      </main>
    </div>
  );
}
