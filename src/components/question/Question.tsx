import './Question.css'
import { QuestionType, QuestionEnum } from '../../types/types';
import { useEffect, useState } from 'react';

/**
 * Component that renders a single question from a list of questions
 * @author Leena Shah
 */
const Question = ({ question, answer, onNextHandler, onBackHandler, hasBack, hasFinish }: QuestionProps) => {

    const [selectedAnswer, setSelectedAnswer] = useState<string>('');

    //clear the selected answer when a new answer is passed in
    useEffect(() => {
        setSelectedAnswer(answer ?? '');
    }, [question, answer]);

    return (
        <div className="question_container">
            <p className="question">{question.question}
                {question.required && <span className="required">&nbsp;*</span>}
            </p>
            <div role="radiogroup">
                {question.type === QuestionEnum.radio &&
                    question.choices.map((choice, index) => (
                        <div key={index} className="input_container">
                            <input id={`radio-${choice}`} name="choices" type="radio" value={choice} onChange={(e) => setSelectedAnswer(e.target.value)} checked={selectedAnswer == choice} />
                            <label htmlFor={`radio-${choice}`}>{choice}</label>
                        </div>
                    ))
                }
            </div>
            {question.followup && selectedAnswer === 'No' &&
                <p className="notify">A member of our team will contact you.</p>
            }
            {question.type === QuestionEnum.textarea &&
                <textarea value={selectedAnswer} onChange={(e) => setSelectedAnswer(e.target.value)} />
            }
            <div className='container'>
                {hasBack && <button onClick={() => onBackHandler(selectedAnswer)}>Back</button>}
                <button disabled={question.required && !selectedAnswer} onClick={() => onNextHandler(selectedAnswer)} >{hasFinish ? 'Preview' : 'Next'}</button>
            </div>
        </div>
    )
}

type QuestionProps = {
    question: QuestionType,
    answer: string,
    onNextHandler: Function,
    onBackHandler: Function,
    hasBack: boolean,
    hasFinish: boolean
}
export default Question;