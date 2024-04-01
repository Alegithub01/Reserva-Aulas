import { useState } from 'react';
import Button from '../Utils/Button';

const RegistroMasivoBoton = () => {
    const [documento, setDocumento] = useState(null);

    const manejoDocumentoCambio = (e) => {
        setDocumento(e.target.files[0]);
    }

    const manejoDocumentoSubido = () => {
        const documentos = new FormData();
        documentos.append('file', documento);

        fetch('http://localhost:4000/api/usuarios/masivo', {
            method: 'POST',
            body: documentos
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
    }
    return (
        <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
            <input 
            accept=".csv"
            style={{padding: '20px', margin: '10px'}}
            type="file" 
            onChange={manejoDocumentoCambio} 
            />
            <Button onClick={manejoDocumentoSubido}>Procesar CSV</Button>
        </div>
    );
};

export default RegistroMasivoBoton;