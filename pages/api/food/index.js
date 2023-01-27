import { food } from '/data'

export default function Handler(req, res) {
    return res.status(200).json(food);
}