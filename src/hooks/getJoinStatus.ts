export const getJoinStatus = (enterStatus: number) => {
    switch (enterStatus) {
        case 1:
            return "입소 완료";
        case 2:
            return "입소전";
        case 3:
            return "미입소";
        default:
            return "";
    }
};