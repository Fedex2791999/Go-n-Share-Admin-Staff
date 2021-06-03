export const compareDate = (a, b) => {
    let dateA = new Date(a?.departureDate);
    let dateB = new Date(b?.departureDate);
    return dateA - dateB;
}