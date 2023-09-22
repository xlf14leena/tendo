import { QuestionType } from '../../types/types';
import './Preview.css';

/**
 * Component that renders the preview screen which lists all the questions and answers
 * @author Leena Shah
 */
const Preview = ({ questions, answers, onBackHandler, onFinishHandler }: PreviewProps) => {

    return (
        <div className="preview_container">
            {questions && questions.map((question: QuestionType, index: number) => (
                <div key={index} className="question_section">
                    <h3 className="question">{question.question}</h3>
                    <p>{answers[index]}</p>
                </div>
            ))}
            <div className='container'>
                <button onClick={() => onBackHandler()}> Back </button>
                <button onClick={() => onFinishHandler()}> Submit </button>
            </div>
        </div>
    );
}

type PreviewProps = {
    questions: QuestionType[],
    answers: string[],
    onFinishHandler: Function,
    onBackHandler: Function,
}

export default Preview;