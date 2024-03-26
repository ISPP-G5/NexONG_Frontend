import React from 'react';
import '../../styles/styles.css';
import { useFetchSuggestions } from '../../components/useFetchData';
import LayoutProfiles from '../../components/LayoutProfiles';


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

const AdminSuggestions = () => {
    const suggestions = useFetchSuggestions(API_ENDPOINT);
    return (
        <LayoutProfiles profile={'admin'} selected={'Sugerencas'}>
            {suggestions.map((suggestion, index) => (
                <div className='card-info-suggestion' key={index}>
                    {/* <div>
                        <p>{suggestion.subject}</p>
                        <p>{suggestion.description}</p>
                        <p>{suggestion.email || 'Anónimo'}</p>
                    </div> */}
                    <table>
                        <tbody>
                        <tr>
                            <td><strong>Asunto:</strong></td>
                            <td>{suggestion.subject}</td>
                        </tr>
                        <tr>
                            <td><strong>Sugerencia:</strong></td>
                            <td>{suggestion.description}</td>
                        </tr>
                        <tr>
                            <td><strong>Correo:</strong></td>
                            <td>{suggestion.email || 'Anónimo'}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </LayoutProfiles>
    );
}

export default AdminSuggestions;