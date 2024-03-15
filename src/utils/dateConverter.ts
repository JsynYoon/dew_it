const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

export const dateConverter = (date: string) => {
    //@ Date Original Format is : YYYY-MM-DD
    //^ Make date string to an array
    const dateArray = date.split("-");
    const year = dateArray[0];
    const month = Number(dateArray[1]);
    const day = dateArray[2];

    return `${months[month - 1]} ${day}, ${year}`

}