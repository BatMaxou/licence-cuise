import styles from './Cuize.module.scss'
import cn from '../../../utils/classnames'

const Cuize = ({cuize, setResult, onResponse}) => {

    const handlResponse = (cuizeId, responseId) => {
        if (cuize.responded) {
            return
        }

        if (responseId === cuize.anwser) {
            setResult((result) => result + 1)
        }

        onResponse(cuizeId, responseId)
    }

    return <div className={styles.cuize}>
        <h3 className={styles.question}>{cuize.question}</h3>
        <ul className={styles.responses}>
            {cuize.responses.map((response, index) => {
                return <li
                    key={index}
                    className={cn(
                        styles.response,
                        cuize.responded && ((cuize.anwser === response.id) ? styles.correct : styles.incorrect),
                        cuize.responded && ((cuize.responded === response.id) && styles.selected),
                    )}
                    onClick={() => handlResponse(cuize.id, response.id)}
                >
                    {response.label}
                </li>
            })}
        </ul>
    </div >
}

export default Cuize
