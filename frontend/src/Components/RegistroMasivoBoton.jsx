import { useState } from 'react';
import Button from '../Utils/Button';
import { useTheme } from '../Contexts/ThemeContext';

const RegistroMasivoBoton = () => {
    const [documento, setDocumento] = useState(null);
    const { theme } = useTheme();

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
        if(documento){
            const leerArchivo = new FileReader();
            leerArchivo.onload = (e) => {
                const texto = e.target.result;
                console.log(texto);
                localStorage.setItem('texto', texto);
            };
            leerArchivo.readAsText(documento);
        }
    }
    return (
        <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
            <input 
            accept=".csv"
            style={{padding: '10px', margin: '20px', border: `1px solid ${theme.secondary}`, backgroundColor: theme.secondary, borderRadius: '15px', fontSize: '0.98rem'}}
            type="file" 
            onChange={manejoDocumentoCambio} 
            />
            <Button onClick={manejoDocumentoSubido}>Procesar CSV</Button>
        </div>
    );
};

export default RegistroMasivoBoton;