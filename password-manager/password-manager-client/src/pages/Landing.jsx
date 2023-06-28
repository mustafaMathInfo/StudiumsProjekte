import React from 'react';
import passwordLogo from '../assets/images/password-logo.png'
import passwordLanding from '../assets/images/password-landing.jpg'
import {useNavigate} from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate()

    const handleToRegisterPage = () => {
        navigate('/register')
    }
    return (
        <div className='pt-5 ms-20'>
            <div className='flex justify-start items-center'>
                <img src={passwordLogo} alt="Password-Logo" className='w-16 h-16 me-5 rounded-full'/>
                <p className='text-2xl font-medium text-cyan-500'>password manager</p>
            </div>
            <div className='flex justify-between mt-48 me-10'>
                <div>
                    <p className='text-4xl font-bold mb-5 '>password manager App</p>
                    <p className='text-justify me-10 '>PassMaster ist eine innovative Password Manager App, die Ihnen
                        dabei hilft, all Ihre Passwörter sicher zu verwalten und vor unbefugtem Zugriff zu schützen. Mit
                        nur einem Master-Passwort haben Sie Zugriff auf all Ihre Konten und sparen Zeit beim Ausfüllen
                        von Anmeldeformularen. Unsere App bietet fortschrittliche Verschlüsselungstechnologien und
                        zusätzliche Sicherheitsfunktionen, um Ihre sensiblen Informationen zu schützen. Generieren Sie
                        starke Passwörter und teilen Sie Ihre Erfahrungen mit unserer Community. Entdecken Sie mit
                        PassMaster eine neue Dimension der Passwortverwaltung und steigern Sie Ihre
                        Online-Sicherheit.</p>
                    <button onClick={handleToRegisterPage} className='bg-cyan-500 text-white px-4 py-2 mt-5 border-none rounded-md'>Login / Register</button>
                </div>
                <img src={passwordLanding} alt="Recipe-Landing"
                     className='w-80 h-80 me-5 rounded-full object-cover hidden md:block'/>
            </div>
        </div>
    );
};

export default Landing;
