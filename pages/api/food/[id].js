import { food } from '/data';

export default function Handler({ query: { id } }, res) {
    const filtered = food.filter((food) => {
        const lowerCase = food.name.toLowerCase();
        const formattedComma = lowerCase.split(',').join('');
        const formattedSpace = formattedComma.split(' ').join('-');
        console.log(formattedSpace)
        console.log(id)
        return formattedSpace === id;
    });
    if (filtered.length > 0) {
      return res.status(200).json(filtered[0]);
    } else {
      return res.status(404).json({message: `Food with name ${id} not found`});
    }
  }