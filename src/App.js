import {useEffect, useState} from 'react';

import Layout from './components/Layout';
import NewCuizeForm from './components/Form/NewCuizeForm';
import Cuize from './components/Form/Cuize';
import Result from './components/Result';
import storage from './utils/localStorage';
import './styles/index.scss'

function App() {
    const [cuizez, setCuizez] = useState([])
    const [result, setResult] = useState(0)

    useEffect(() => {
        const cuizez = storage.get('cuizez')
        if (cuizez) {
            setCuizez(cuizez)
        }
    }, [])

    return <Layout>
        {cuizez && cuizez.map((cuize, index) => {
            return <Cuize
                key={`${cuize.question}-${index}`}
                cuize={cuize}
                setResult={setResult}
                setCuizez={setCuizez}
                onResponse={(cuizeId, responseId) => {
                    setCuizez((cuizez) => cuizez.map((cuize) => {
                        if (cuize.id === cuizeId) {
                            return {
                                ...cuize,
                                responded: responseId
                            }
                        }
                        return cuize
                    }))
                }}
            />
        })}

        <Result result={result} />

        <NewCuizeForm setCuizez={setCuizez} />
    </Layout>
}

export default App;
