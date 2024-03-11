import {useState} from 'react'
import {v4 as generateUuid} from 'uuid'

import Textarea from "../../ui/atoms/Textarea"
import Input from "../../ui/atoms/Input"
import Button from "../../ui/atoms/Button"
import storage from "../../../utils/localStorage"
import styles from './NewCuizeForm.module.scss'

const NewCuizeForm = ({setCuizez}) => {
    const [answer, setAnswer] = useState(null)
    const [answerError, setAnswerError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const data = new FormData(form)

        if (!data.get('question')) {
            setAnswerError('Veuillez remplir la question')

            return
        }

        if (
            !data.get('response1')
            || !data.get('response2')
            || !data.get('response3')
            || !data.get('response4')
        ) {
            setAnswerError('Veuillez remplir toutes les réponses')

            return
        }

        if (answer === null) {
            setAnswerError('Veuillez sélectionner la réponse')

            return
        }

        const cuize = {
            id: generateUuid(),
            question: data.get('question'),
            responses: [
                {
                    id: 1,
                    label: data.get('response1')
                },
                {
                    id: 2,
                    label: data.get('response2')
                },
                {
                    id: 3,
                    label: data.get('response3')
                },
                {
                    id: 4,
                    label: data.get('response4')
                },
            ],
            anwser: answer,
            responded: false,
        }

        setCuizez((cuizez) => [...cuizez, cuize])
        storage.set('cuizez', [...(storage.get('cuizez') || []), cuize])
        form.reset()
        setAnswer(null)
        setAnswerError(null)
    }

    return <div className={styles.addCuize}>
        <h2>Ajouter un Cuize</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
            <Textarea name={'question'} placeholder={'Question'} />
            <Input id={1} name={'response1'} setAnswer={setAnswer} placeholder={'Réponse 1'} />
            <Input id={2} name={'response2'} setAnswer={setAnswer} placeholder={'Réponse 2'} />
            <Input id={3} name={'response3'} setAnswer={setAnswer} placeholder={'Réponse 3'} />
            <Input id={4} name={'response4'} setAnswer={setAnswer} placeholder={'Réponse 4'} />
            <Button label={'Valider'} type={'submit'} className={styles.submit} />
            {answerError && <div className={styles.error}>{answerError}</div>}
        </form>
    </div>
}

export default NewCuizeForm;
