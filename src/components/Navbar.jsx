import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const userData = useSelector((state) => state.user); 

    return (
        <nav className="bg-orange-700 p-3 text-white flex flex-wrap justify-between">
            <div>Epiblog</div>
            <div>
                <ul className="flex gap-4">
                    <li>link 1</li>
                    {userData ? (
                        <li>
                            <Link to='/me'>Ciao, {userData.firstName}</Link>
                        </li>
                    ) : null}
                    <li>
                        <Link to='/logout'>Esci</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
