import './Feedback.css';
import { useState } from 'react'
import { QuestionType } from '../../types/types';
import Question from '../question/Question';
import Preview from '../preview/Preview';

/**
 * Component that either displays the question screen or preview screen and contains navigation logic
 * @author Leena Shah
 */
const Feedback = ({ questions }: FeedbackProps) => {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const [done, setDone] = useState<boolean>(false);

    //onNextHandler
    const onNextHandler = (answer: string) => {
        const myarr = [...answers];
        myarr[currentQuestionIndex] = answer;
        setAnswers(myarr);
        if (currentQuestionIndex === questions.length - 1) {
            setShowPreview(true);
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    }

    //onBackHandler
    const onBackHandler = (answer: string) => {
        if (!showPreview) {
            const myarr = [...answers];
            myarr[currentQuestionIndex] = answer;
            setAnswers(myarr); //save any answer user may have input
            setCurrentQuestionIndex(prev => prev - 1);
        }
        setShowPreview(false);
    }

    //onSubmitHandler
    const onFinishHandler = () => {
        //send answers to the server
        setDone(true);
    }

    return (
        <>
            {questions && !showPreview && !done &&
                <Question question={questions[currentQuestionIndex]} onNextHandler={onNextHandler} answer={answers[currentQuestionIndex]}
                    onBackHandler={onBackHandler} hasBack={currentQuestionIndex !== 0}
                    hasFinish={currentQuestionIndex === questions.length - 1} />
            }
            {showPreview && !done &&
                <Preview questions={questions} answers={answers} onFinishHandler={onFinishHandler} onBackHandler={onBackHandler} />
            }
            {done &&
                <div className='container sectioncontainer'>Your form has been submitted. Thank you.</div>
            }
        </>
    );
}

type FeedbackProps = {
    questions: QuestionType[],
}

export default Feedback;