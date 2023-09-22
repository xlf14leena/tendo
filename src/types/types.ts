export type AppointmentDetails = {
    patientName: string,
    doctorLastName: string,
    diagnosis: string
}

export type Questionnaire = {
    id: number,
    logo: string,
    questions: QuestionType[]
}

export type QuestionType = {
    question: string,
    type: string,
    required: boolean,
    choices: any[],
    followup: boolean
}

export enum QuestionEnum {
    radio = "radio",
    textarea = "textarea",
    text = "text",
    checkbox = "checkbox"
}
