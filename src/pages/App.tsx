import './App.css';
import { useEffect, useState } from 'react';
import { fetchQuestionsData, fetchAppointmentData } from '../network/services';
import { QuestionType } from '../types/types';
import defaultLogo from '../assets/infinitycare-health-center-logo.png';
import Feedback from '../components/feedback/Feedback';

/**
 * Component that display a patient feedback form.
 * @author Leena Shah
 */
function App() {

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [logo, setLogo] = useState<string>();
  const [color, setColor] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        const appointmentData = await fetchAppointmentData();

        const providerId = appointmentData.providerId;
        const questionsData = await fetchQuestionsData(providerId);

        const myarr: QuestionType[] = questionsData.questions;
        myarr.map((question) => (
          appointmentData.tokenMap?.forEach((value, key) => {
            question.question = question.question.replaceAll(key, value);
          })
        ))
        setQuestions(myarr);
        setLogo(questionsData.logo ? questionsData.logo : defaultLogo);
        if (questionsData.primaryColor) {
          setColor(questionsData.primaryColor);
        }
      } catch (e) {
        setError("There was a problem fetching the data : " + e);
      }
    }
    fetchData();
  }, []);

  //set the primary color for the form
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', color);
  }, [color])

  return (
    <div className="App">
      <header className='header'>
        <img src={logo} alt="" />
      </header>
      <main className="main">
        <h1>Patient Care Experience Feedback</h1>
        <section className="sectioncontainer">
          {!error && questions.length &&
            <Feedback questions={questions} />
          }
          {error &&
            <p>{error}</p>
          }
        </section>
      </main>
      <footer className='footer'>
        <div>
          <img src={logo} alt="" />
        </div>
        <p className="disclaimer">Personal information obtained by this form will be collected, maintained and used by Infinity Health pursuant to our Privacy Policy</p>
      </footer >
    </div >
  );
}

export default App;
