export const getJoinStatus = (enterStatus: string) => {
    switch (enterStatus) {
        case "ENTER":
            return "입소 완료";
        case "PRE_ENTER":
            return "입소전";
        case "NON_ENTER":
            return "입소전";
        default:
            return "알수없음";
    }
};