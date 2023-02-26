import { food } from '/data';

export default function Handler({ query: { id } }, res) {
    const filtered = food.filter((food) => {
        const lowerCase = food.name.toLowerCase();
        const deleteComma = lowerCase.split(',').join('');
        const deletePercent = deleteComma.split('%').join('percent');
        const deleteSlash = deletePercent.split('/').join('per');
        const formattedURL = deleteSlash.split(' ').join('-');
        return formattedURL === id;
    });
    if (filtered.length > 0) {
      return res.status(200).json(filtered[0]);
    } else {
      return res.status(404).json({message: `Food with name ${id} not found`});
    }
  }