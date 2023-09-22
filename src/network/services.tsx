const BASE_URL = "http://localhost:5000";

//utility method to filter the desired resource
const getResource: any = (data: any, resourceName: string) => {
    return data.entry.filter((x: any) => x.resource.resourceType === resourceName)[0];
}

//Makes the call to fetch the appointment data
export const fetchAppointmentData = async () => {
    const response: Response = await fetch(`${BASE_URL}/appointment`);
    if (response.status === 200) {
        const appointmentData = await response.json();
        const providerId = appointmentData.providerId;
        const patientName = getResource(appointmentData, 'Patient').resource.name[0].given[0];
        const doctorLastName = getResource(appointmentData, 'Doctor').resource.name[0].family;
        const diagnosis = getResource(appointmentData, 'Diagnosis').resource.code.coding[0].name;
        const tokenMap = new Map();
        tokenMap.set("\[Patient First Name\]", patientName); /* eslint-disable-line */
        tokenMap.set("\[Doctor Last Name\]", doctorLastName);/* eslint-disable-line */
        tokenMap.set("\[Diagnosis\]", diagnosis);/* eslint-disable-line */
        return { providerId, tokenMap };
    } else {
        throw new Error('Appointment data :' + response.statusText);
    }
}

//Makes the call to fetch the questions data
export const fetchQuestionsData = async (providerId: number) => {
    const response = await fetch(`${BASE_URL}/questionnaire/${providerId}`);
    if (response.status === 200) {
        const questionsData = await response.json();
        return questionsData;
    } else {
        throw new Error('Questions data :' + response.statusText);
    }
}