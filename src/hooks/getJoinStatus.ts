export const getJoinStatus = (enterStatus: string) => {
    switch (enterStatus) {
        case "ENTER":
            return "입소 완료";
        case "ABSENT":
            return "미입소";
        case "NON_ENTER":
            return "입소전";
        default:
            return "입소 완료";
    }
};