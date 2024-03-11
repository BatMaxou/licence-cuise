import styles from './Textarea.module.scss'

const Textarea = ({name, placeholder}) => {
    return <textarea
        className={styles.textarea}
        name={name}
        placeholder={placeholder}
    />
}

export default Textarea;
