import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function SidePanel() {

    const [isHovered, setIsHovered] = useState(false)
    const location = useLocation() // Hook to get current location

    let role = sessionStorage.getItem('role')

    return <>
        <div
            className={`side-panel ${isHovered ? 'expanded' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {role === 'mentor' && (
                <nav>
                    <ul>
                        <li>
                            <Link className={location.pathname === '/zenClass' ? 'active-link' : ''}>
                                <i className="fa-solid fa-chalkboard-user icon"></i>
                                {isHovered && <span>Zen Class</span>}
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link to="/classes" className={location.pathname === '/classes' ? 'active-link' : ''}>
                                <i className="fa-regular fa-handshake icon"></i>
                                {isHovered && <span>Classes</span>}
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link to="/tickets" className={location.pathname === '/tickets' ? 'active-link' : ''}>
                                <i className="fa-solid fa-chart-line icon"></i>
                                {isHovered && <span>All Tickets</span>}
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link to="/myTickets" className={location.pathname === '/myTickets' ? 'active-link' : ''}>
                                <i className="fa-solid fa-object-ungroup icon"></i>
                                {isHovered && <span>My Tickets</span>}
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link to="/findTicket" className={location.pathname === '/findTicket' ? 'active-link' : ''}>
                                <i className="fa-solid fa-magnifying-glass icon"></i>
                                {isHovered && <span>Search Ticket</span>}
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link to="/studentTickets" className={location.pathname === '/studentTickets' ? 'active-link' : ''}>
                                <i className="fa-solid fa-magnifying-glass icon"></i>
                                {isHovered && <span>Student Tickets</span>}
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link to="/profile" className={location.pathname === '/profile' ? 'active-link' : ''}>
                                <i className="fa-regular fa-user icon"></i>
                                {isHovered && <span>Your Profile</span>}
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link to="/login" className={location.pathname === '/login' ? 'active-link' : ''}>
                                <i className="fa-solid fa-right-from-bracket icon"></i>
                                {isHovered && <span>Logout</span>}
                            </Link>
                        </li>
                        <hr />
                    </ul>
                </nav>
            )}

            {role === 'student' && (
                <nav>
                    <ul>
                        <li>
                            <Link className={location.pathname === '/zenClass' ? 'active-link' : ''}>
                                <i className="fa-solid fa-chalkboard-user icon"></i>
                                {isHovered && <span>Zen Class</span>}
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link to="/class" className={location.pathname === '/class' ? 'active-link' : ''}>
                                <i className="fa-regular fa-handshake icon"></i>
                                {isHovered && <span>Class</span>}
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link to="/myQueries" className={location.pathname === '/myQueries' ? 'active-link' : ''}>
                                <i className="fa-solid fa-chart-line icon"></i>
                                {isHovered && <span>My Queries</span>}
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link to="/createQuery" className={location.pathname === '/createQuery' ? 'active-link' : ''}>
                                <i className="fa-solid fa-plus icon"></i>
                                {isHovered && <span>Create Query</span>}
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link to="/placements" className={location.pathname === '/placements' ? 'active-link' : ''}>
                                <i className="fa-solid fa-check icon"></i>
                                {isHovered && <span>Placements</span>}
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link to="/interviews" className={location.pathname === '/interviews' ? 'active-link' : ''}>
                                <i className="fa-solid fa-globe icon"></i>
                                {isHovered && <span>Interviews</span>}
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link to="/tasks" className={location.pathname === '/tasks' ? 'active-link' : ''}>
                                <i className="fa-solid fa-list-check icon"></i>
                                {isHovered && <span>Tasks</span>}
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link to="/profile" className={location.pathname === '/profile' ? 'active-link' : ''}>
                                <i className="fa-regular fa-user icon"></i>
                                {isHovered && <span>Your Profile</span>}
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link to="/login" className={location.pathname === '/login' ? 'active-link' : ''}>
                                <i className="fa-solid fa-right-from-bracket icon"></i>
                                {isHovered && <span>Logout</span>}
                            </Link>
                        </li>
                        <hr />
                    </ul>
                </nav>
            )}
        </div>
    </>
}

export default SidePanel;