interface BoxberryResult {
    id: string,
    address: string
}
type BoxberryCallbackFunction = (result: BoxberryResult) => void;

interface Window {
    boxberry: {
        open: (callback: BoxberryCallbackFunction) => void;
    }
}