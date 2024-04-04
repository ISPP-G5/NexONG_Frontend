import React from 'react';
import { Link } from 'react-router-dom';

function HomePageDescription() {
    return (
        <div style={{ textAlign: 'center' }}> {/* Align content center */}
            <p>Manos Abiertas surge como iniciativa en 1992. Un grupo de jóvenes voluntarios/as, detecta necesidades socioeducativas en la zona de Polígono Norte, Sevilla, y comienza a impartir clases de apoyo de matemáticas y lengua a los niños y niñas de los centros educativos de la zona: Blas Infante y Josefa Amor y Rico (Actualmente IES Inmaculada Vieira), en locales situados en bloques de la barriada.</p>
            <Link to="/asociacion/historia" style={{ textDecoration: 'none', display: 'inline-block' }}> {/* Inline block link */}
                <div className="button" style={{ padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Leer más</div>
            </Link>
        </div>
    );
}

export default HomePageDescription;
