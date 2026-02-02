export const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};
