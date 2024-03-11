import styles from './Result.module.scss'

const Result = ({result}) => {
    return <div className={styles.result}>
        <h3>{result}</h3>
    </div>
}

export default Result
