import { rest } from "msw"
import data from '../../db.json';

export const handlers = [
    rest.get('http://localhost:5000/appointment', (req, res, ctx) => {
        return res(ctx.json(data.appointment))
    }),
    rest.get('http://localhost:5000/questionnaire/1', (req, res, ctx) => {
        return res(ctx.json(data.questionnaire[0]))
    }),
    rest.get('http://localhost:5000/questionnaire/2', (req, res, ctx) => {
        return res(ctx.json(data.questionnaire[1]))
    })
];
